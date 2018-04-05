import $ from 'jquery';
import Helicropter from 'index';

describe('Helicropter', function() {
  beforeEach(function() {
    setFixtures('<div class="helicropter-container"></div>');

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
      this.helicropter._view._uploadArea._uploader.trigger('submit');

      expect(this.helicropter._view.$view).toBeDefined();
    });

    it('emits `image:uploading` when the image is submitted', function(done) {
      this.helicropter = new Helicropter(this.defaultConfig);

      this.helicropter.uploadThenRender($('.helicropter-container'));
      this.helicropter.on('image:uploading', done);

      this.helicropter._view._uploadArea._uploader.trigger('submit');
    });
  });

  describe('#getCroppedImage', function() {
    it('returns cropped image', function(done) {
      this.helicropter = this._createWithInitialImage();

      const width = 1;
      const height = 1;
      const src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

      spyOn(this.helicropter, 'crop').and.returnValue({
        dimensions: {
          x: 1,
          y: 1,
        },
        src,
      });

      this.helicropter.getCroppedImage({ width, height }).then(result => {
        expect(result).not.toEqual(src);
        expect(result).toContain('data:image/png;base64');
        done();
      });
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
});
