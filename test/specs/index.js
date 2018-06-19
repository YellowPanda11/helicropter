import $ from 'jquery';
import Helicropter from 'index';
import images from '../fixtures/images';

describe('Helicropter', function() {
  beforeEach(function() {
    setFixtures('<div class="helicropter-container"><div class="droppable"></div></div>');

    setStyleFixtures('.hide { display: none; }');

    $('#jasmine-fixtures').append('<div class="preview-crop-container"></div>');

    this.defaultConfig = {
      uploaderOptions: {
        request: {
          endpoint: 'foo',
          accessKey: 'foo',
        },
        signature: {
          endpoint: '/s3handler',
        },
      },
    };

    this.file = new File(['foo'], '', {
      type: 'image/png',
    });

    this._createWithInitialImage = customConfig => {
      const initialImage = {
        initialImage: {
          src: '/imgs/test-kitten.jpeg',
          url: 'https://foo.com/imgs/test-kitten.jpeg',
        },
      };
      const inst = new Helicropter(Object.assign(this.defaultConfig, initialImage, customConfig));
      inst.render($('.helicropter-container'));
      return inst;
    };

    this._createWithoutInitialImage = customConfig => {
      const inst = new Helicropter(Object.assign(this.defaultConfig, customConfig));
      inst.render($('.helicropter-container'));
      return inst;
    };

    this.triggerImageNonScalable = () => this.helicropter._view._zoomSlider.trigger('image-non-scalable');
  });

  afterEach(function() {
    this.helicropter.destroy();
  });

  describe('#crop', function() {
    beforeEach(function() {
      this.helicropter = this._createWithInitialImage();
    });

    describe('when cropping area does not have crop data', function() {
      it('returns undefined', function() {
        spyOn(this.helicropter._view._croppingArea, 'getCropData').and.returnValue(undefined);
        expect(this.helicropter.crop()).not.toBeDefined();
      });
    });

    describe('when cropping area has crop data', function() {
      beforeEach(function() {
        this.helicropter = this._createWithInitialImage();
      });

      it('returns crop data', function() {
        spyOn(this.helicropter._view._croppingArea, 'getCropData').and.returnValue({
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          scale: 1,
        });
        spyOn(this.helicropter._view._croppingArea, 'getDimensions').and.returnValue({
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        });

        expect(this.helicropter.crop()).toEqual({
          src: '/imgs/test-kitten.jpeg',
          url: 'https://foo.com/imgs/test-kitten.jpeg',
          dimensions: {
            x: 0,
            y: 0,
            width: 10,
            height: 10,
          },
          coordinates: {
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            scale: 1,
          },
        });
      });
    });
  });

  describe('#uploadImage', function() {
    it('returns the result of choose on the uploadArea uploader', function(done) {
      const expectedValue = 'boop';
      this.helicropter = this._createWithInitialImage();
      spyOn(this.helicropter._view._uploadArea._uploader, 'choose').and.returnValue(Promise.resolve(expectedValue));

      this.helicropter.uploadImage().then(value => {
        expect(value).toBe(expectedValue);
        done();
      });
    });
  });

  describe('#uploadThenRender', function() {
    it('does not render until the image is submitted', function() {
      this.helicropter = new Helicropter(this.defaultConfig);

      expect(this.helicropter._view.$view).toBeUndefined();

      this.helicropter.uploadThenRender($('.helicropter-container'));
      this.helicropter._view._uploadArea._uploader.trigger('submit', { file: this.file });

      expect(this.helicropter._view.$view).toBeDefined();
    });

    it('emits `image:uploading` when the image is submitted', function(done) {
      this.helicropter = new Helicropter(this.defaultConfig);

      this.helicropter.uploadThenRender($('.helicropter-container'));
      this.helicropter.on('image:uploading', done);

      this.helicropter._view._uploadArea._uploader.trigger('submit', { file: this.file });
    });

    it('emits `error:upload` when there is an error', function(done) {
      this.helicropter = new Helicropter(this.defaultConfig);

      this.helicropter.on('error:upload', done);

      this.helicropter.uploadThenRender($('.helicropter-container'));
      this.helicropter._view._uploadArea._uploader.trigger('error');
    });

    it('does not render the upload button for uploadArea', function(done) {
      this.helicropter = new Helicropter(this.defaultConfig);

      this.helicropter.uploadThenRender($('.helicropter-container'));
      this.helicropter.on('image:uploading', () => {
        expect($('.js-upload-container .js-upload-button')).not.toExist();
        done();
      });

      this.helicropter._view._uploadArea._uploader.trigger('submit', { file: this.file });
    });

    it('emits `image:cancelled` when the upload is cancelled', function(done) {
      this.helicropter = new Helicropter(this.defaultConfig);

      this.helicropter.on('image:cancelled', done);

      this.helicropter.uploadThenRender($('.helicropter-container'));
      this.helicropter._view._uploadArea._uploader.trigger('cancel');
    });
  });

  describe('#dropFileThenRender', function() {
    beforeEach(function() {
      this.helicropter = new Helicropter(this.defaultConfig);
      spyOn(this.helicropter._view._uploadArea, 'setDropElement').and.callThrough();
      this.helicropter.dropFileThenRender($('.droppable'), $('.helicropter-container'));
    });

    it('emits image:uploading when the uploader is uploading', function(done) {
      this.helicropter.on('image:uploading', done);
      this.helicropter._view._uploadArea._uploader.trigger('submit', { file: this.file });
    });

    it('emits error:upload when the upload results in error', function(done) {
      this.helicropter.on('error:upload', done);
      this.helicropter._view._uploadArea._uploader.trigger('error');
    });

    it('sets the element as a drop zone', function() {
      expect(this.helicropter._view._uploadArea.setDropElement).toHaveBeenCalledWith($('.droppable'));
    });
  });

  describe('#getCroppedImage', function() {
    it('returns cropped image', function(done) {
      this.helicropter = this._createWithInitialImage();

      const x = 1;
      const y = 1;
      const width = 50;
      const height = 50;
      const scaledWidth = 500;
      const scaledHeight = 500;
      const src = images.flower;

      spyOn(this.helicropter, 'crop').and.returnValue({
        dimensions: {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        },
        src,
      });

      this.helicropter.getCroppedImage({ width, height }).then(result => {
        expect(result).toEqual(images.flower50by50);
        done();
      }, done.fail);
    });
  });

  describe('when given an initial image', function() {
    beforeEach(function() {
      this.helicropter = this._createWithInitialImage();
    });

    it('does not show the upload state for the cropper', function() {
      expect($('.js-upload-container .js-upload-button')).not.toBeVisible();
    });

    it('shows the loading state for the cropper', function() {
      expect($('.js-image-upload-wrapper .helicropter-spinner')).toExist();
    });
  });

  describe('when not given an initial image', function() {
    beforeEach(function() {
      this.helicropter = this._createWithoutInitialImage();
    });

    it('shows the upload state for the cropper', function() {
      expect($('.js-upload-container .js-upload-button')).toBeVisible();
    });

    it('does not show the loading state for the cropper', function() {
      expect($('.js-image-upload-wrapper .helicropter-spinner')).not.toExist();
    });
  });

  describe('displayErrors option', function() {
    describe('when true', function() {
      beforeEach(function() {
        this.helicropter = this._createWithoutInitialImage({ displayErrors: true, showSuggestions: true });
      });

      it('does not show an error by default', function() {
        expect($('.js-croploader-errors')).not.toBeVisible();
      });

      it('handles an error the same for either the upload or crop step', function() {
        spyOn(this.helicropter._view, '_handleUploadError');
        this.helicropter._view._uploadArea.trigger('upload-error', {});
        this.helicropter._view._croppingArea.trigger('upload-error', {});
        expect(this.helicropter._view._handleUploadError).toHaveBeenCalledTimes(2);
      });

      it('shows a default error message when not provided by upload-error event', function() {
        this.helicropter._view._uploadArea.trigger('upload-error', {});
        expect($('.js-croploader-errors')).toBeVisible();
        expect($('.js-croploader-errors')).toContainText('There was a problem uploading your image. Please try again.');
      });

      it('shows message when provided by the upload-error event', function() {
        const message = 'bing bing bong';
        this.helicropter._view._uploadArea.trigger('upload-error', { message });
        expect($('.js-croploader-errors')).toBeVisible();
        expect($('.js-croploader-errors')).toContainText(message);
      });

      describe('after an upload-error event', function() {
        beforeEach(function() {
          this.helicropter._view._uploadArea.trigger('upload-error', {});
        });

        it('hides the error when you begin uploading a new image', function() {
          this.helicropter._view._uploadArea.trigger('image-uploading');
          expect($('.js-croploader-errors')).not.toBeVisible();
        });

        it('hides the error when you choose a new image from the suggestion area', function() {
          this.helicropter._view._suggestionArea.trigger('set-image', { url: '', src: '' });
          expect($('.js-croploader-errors')).not.toBeVisible();
        });
      });
    });

    describe('when false', function() {
      beforeEach(function() {
        this.helicropter = this._createWithoutInitialImage({ displayErrors: false });
      });

      it('does not show an error by default', function() {
        expect($('.js-croploader-errors')).not.toBeVisible();
      });

      it('does not show an error message on upload-error', function() {
        this.helicropter._view._uploadArea.trigger('upload-error', {});
        expect($('.js-croploader-errors')).not.toBeVisible();
      });
    });

    describe('when not provided', function() {
      beforeEach(function() {
        this.helicropter = this._createWithoutInitialImage();
      });

      it('does not show an error by default', function() {
        expect($('.js-croploader-errors')).not.toBeVisible();
      });

      it('does not show an error message on upload-error', function() {
        this.helicropter._view._uploadArea.trigger('upload-error', {});
        expect($('.js-croploader-errors')).not.toBeVisible();
      });
    });
  });

  describe('when it is in preview mode', function() {
    it('should just show croppingArea', function(done) {
      this.helicropter = this._createWithInitialImage({
        previewMode: true,
      });

      spyOn(this.helicropter._view._uploadArea, 'show');
      spyOn(this.helicropter._view._zoomSlider, 'enable');

      this.helicropter.on('image:loaded', function() {
        expect(this.helicropter._view._uploadArea.show).not.toHaveBeenCalled();
        expect(this.helicropter._view._zoomSlider.enable).not.toHaveBeenCalled();
        expect(this.helicropter._view._croppingArea.$view).not.toHaveClass('hide');
        done();
      }.bind(this));

      this.helicropter._view._croppingArea.trigger('image-loaded');
    });
  });

  describe('when given preview crop configuration', function() {
    beforeEach(function() {
      this.helicropter = this._createWithInitialImage({
        previewCrop: {
          element: $('.preview-crop-container'),
        },
      });
    });

    it('renders a preview of the rendered image', function() {
      expect($('.js-preview-crop-canvas')).toExist();
    });
  });

  describe('when a user removes the initial image', function() {
    beforeEach(function() {
      this.helicropter = this._createWithInitialImage();
      this.helicropter.removeImage();
    });

    it('shows the upload button on the cropper', function() {
      expect($('.js-upload-container .js-upload-button')).toBeVisible();
    });
  });

  describe('when a user resizes the browser', function() {
    beforeEach(function() {
      this.initialWindowHeight = 600;
      window.innerHeight = this.initialWindowHeight;

      this.waitAFrame = function() {
        return new Promise(resolve => requestAnimationFrame(() => resolve()));
      };

      this.resizeWindowHeightTo = (value) => {
        window.innerHeight = value;
        window.dispatchEvent(new Event('resize'));
      };
    });

    it('resizes cropper to the scaled value', function(done) {
      this.helicropter = this._createWithoutInitialImage({
        resize: {
          offset: 0,
        },
      });

      this.helicropter.render($('#jasmine-fixtures'));
      this.helicropter._view._uploadArea.trigger('image-uploading');

      const $cropper = this.helicropter._view._croppingArea.$canvasContainer;
      const oldHeight = $cropper.height();

      const scale = .5;
      const expectedHeight = oldHeight * scale;

      this.helicropter._view.on('scale-view', () => {
        this.waitAFrame().then(() => {
          const height = $cropper.height();

          expect(height).toEqual(expectedHeight);
          done();
        });
      });

      this.resizeWindowHeightTo(this.initialWindowHeight * scale);
    });

    it('starts resizing when window height is reaching edges of boundEl height', function(done) {
      $('#jasmine-fixtures').append('<div class="bound"></div>');

      const boundElHeight = window.innerHeight / 2;

      $('.bound').height(boundElHeight);

      this.helicropter = this._createWithoutInitialImage({
        resize: {
          boundEl: $('.bound')[0],
          offset: 0,
        },
      });
      this.helicropter._view._uploadArea.trigger('image-uploading');

      this.helicropter._view.on('scale-view', done);

      this.resizeWindowHeightTo(boundElHeight - 1);
    });

    it('stops scaling the cropper when :minHeight is reached', function(done) {
      const minHeight = window.innerHeight * .4;

      this.helicropter = this._createWithoutInitialImage({
        resize: {
          minHeight,
        },
      });

      this.helicropter.render($('#jasmine-fixtures'));
      this.helicropter._view._uploadArea.trigger('image-uploading');

      const $cropper = this.helicropter._view._croppingArea.$canvasContainer;
      let oldHeight;

      this.helicropter._view.on('scale-out-of-bound', () => {
        this.waitAFrame().then(() => {
          const height = $cropper.height();

          expect(height).toEqual(oldHeight);
          done();
        });
      });

      this.helicropter._view.on('scale-view', () => {
        this.waitAFrame().then(() => {
          oldHeight = $cropper.height();

          this.resizeWindowHeightTo(minHeight - 1);
        });
      });

      this.resizeWindowHeightTo(minHeight + 1);
    });
  });

  describe('when a user uploads a min size image', function() {
    beforeEach(function() {
      this.helicropter = this._createWithInitialImage();
    });

    it('disables the slider', function() {
      this.triggerImageNonScalable();
      expect(this.helicropter._view._zoomSlider.$view).toHaveClass('disabled');
      expect(this.helicropter._view._zoomSlider._$slider).toHaveAttr('disabled');
    });

    it('hides .js-crop-controls', function() {
      this.triggerImageNonScalable();
      expect($('.js-crop-controls')).not.toBeVisible();
    });

    it('disables the cropper', function() {
      const cropperCanvas = this.helicropter._view._croppingArea._canvas;

      this.triggerImageNonScalable();

      expect(cropperCanvas.selection).toBe(false);
      cropperCanvas.forEachObject(function(object) {
        expect(object.selectable).toBe(false);
      });
      expect(cropperCanvas.hoverCursor).toEqual('default');
    });

    it('emits controls:paused', function(done) {
      this.helicropter.on('controls:paused', done);

      this.triggerImageNonScalable();
    });
  });

  describe('when a user reuploads with an image bigger than the min size', function() {
    beforeEach(function() {
      this.helicropter = this._createWithInitialImage();

      this.triggerImageScalable = () => this.helicropter._view._zoomSlider.trigger('image-scalable');
    });

    it('enables the slider', function() {
      this.triggerImageNonScalable();
      this.triggerImageScalable();
      expect(this.helicropter._view._zoomSlider.$view).not.toHaveClass('disabled');
      expect(this.helicropter._view._zoomSlider._$slider).not.toHaveAttr('disabled');
    });

    it('shows .js-crop-controls', function() {
      this.triggerImageNonScalable();
      this.triggerImageScalable();
      expect($('.js-crop-controls')).toBeVisible();
    });

    it('enables the cropper', function() {
      const cropperCanvas = this.helicropter._view._croppingArea._canvas;

      this.triggerImageNonScalable();
      this.triggerImageScalable();

      expect(cropperCanvas.selection).toBe(true);
      cropperCanvas.forEachObject(function(object) {
        expect(object.selectable).toBe(true);
      });
      expect(cropperCanvas.hoverCursor).toEqual('move');
    });

    it('emits controls:resumed', function(done) {
      this.helicropter.on('controls:resumed', done);

      this.triggerImageNonScalable();
      this.triggerImageScalable();
    });
  });

  describe('when the image is being processed', function() {
    it('emits "image:processing event"', function(done) {
      this.helicropter = this._createWithoutInitialImage();

      this.helicropter.on('image:processing', done);

      this.helicropter._view._uploadArea.trigger('image-processing');
    });
  });
});
