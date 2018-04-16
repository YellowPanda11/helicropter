import $ from 'jquery';
import UploadArea from 'UploadArea';
import config from '../fixtures/config';

describe('UploadArea', function() {
  beforeEach(function() {
    setFixtures('');

    this.options = {
      uploaderOptions: config.uploaderOptions,
      backgroundImage: config.uploadBackgroundImage,
      width: config.canvasSize.width,
      height: config.canvasSize.height,
      titleText: config.uploadTitle,
      subtitleText: config.uploadSubtitle,
    };

    this.create = (customOptions) => {
      const inst = new UploadArea(Object.assign(this.options, customOptions));
      inst.render($('#jasmine-fixtures'));
      return inst;
    };
  });

  afterEach(function() {
    this.uploadArea.destroy();
  });

  it('supplies a default title', function() {
    expect(this.options.titleText).not.toBeDefined();

    this.uploadArea = this.create();

    expect($('.image-upload-text')).toHaveText('Upload Image');
  });

  it('allows for a custom title', function() {
    this.uploadArea = this.create({
      titleText: 'foobar',
    });

    expect($('.js-image-upload-text')).toHaveText('foobar');
  });

  it('allows for a nullified title', function() {
    this.uploadArea = this.create({
      titleText: '',
    });

    expect($('.js-image-upload-text')).toHaveText('');
  });

  it('does not supply a default subtitle', function() {
    expect(this.options.subtitleText).not.toBeDefined();

    this.uploadArea = this.create();

    expect($('.js-image-upload-subtext')).toHaveText('');
  });

  it('allows for a custom subtitle', function() {
    this.uploadArea = this.create({
      subtitleText: 'foobar',
    });

    expect($('.js-image-upload-subtext')).toHaveText('foobar');
  });

  describe('loaderStyle', function() {
    describe('progressbar', function() {
      beforeEach(function() {
        this.uploadArea = this.create({
          loaderStyle: 'progressbar',
        });
      });

      it('displays .js-progress-bar when it is progressbar', function() {
        expect($('.js-progress-bar')).toExist();
      });

      it('updates the value as it loads the image', function() {
        this.uploadArea._uploader.trigger('progress', { loaded: 1, total: 2 });
        expect($('.js-progress').attr('style')).toEqual('width: 50%;');
        this.uploadArea._uploader.trigger('progress', { loaded: 2, total: 2 });
        expect($('.js-progress').attr('style')).toEqual('width: 100%;');
      });
    });

    describe('spinner', function() {
      beforeEach(function() {
        this.uploadArea = this.create();

        this.file = new File(['foo'], '', {
          type: 'image/png',
        });

        spyOn(this.uploadArea.spinner, 'spin');
        spyOn(this.uploadArea.spinner, 'stop');
      });

      it('hides .js-progress-bar when it is progressbar', function() {
        expect($('.js-progress-bar')).not.toBeVisible();
      });

      it('displays the spinner when it is uploading the image', function() {
        this.uploadArea._uploader.trigger('submit', { file: this.file });

        expect(this.uploadArea.spinner.spin).toHaveBeenCalled();
      });

      it('stops the spinner when it is done uploading the image', function() {
        this.uploadArea._uploader.trigger('complete', { file: this.file });

        expect(this.uploadArea.spinner.stop).toHaveBeenCalled();
      });

      it('stops the spinner when the upload causes an error', function() {
        this.uploadArea._uploader.trigger('error', 'foo');

        expect(this.uploadArea.spinner.stop).toHaveBeenCalled();
      });
    });
  });

  describe('isUploadButtonHidden', function() {
    it('hides .js-upload-button when it is true', function() {
      this.uploadArea = this.create({
        isUploadButtonHidden: true,
      });

      expect($('.js-upload-button')).not.toExist();
    });

    it('renders .js-upload-button when it is false', function() {
      this.uploadArea = this.create({
        isUploadButtonHidden: false,
      });

      expect($('.js-upload-button')).toExist();
    });
  });

  describe('hasInitialImage', function() {
    it('adds "hide" class to ._$btn when it is set and :isUploadButtonHidden is false', function() {
      this.uploadArea = this.create({
        isUploadButtonHidden: false,
        hasInitialImage: true,
      });

      expect(this.uploadArea._$btn).toHaveClass('hide');
    });

    it('should not add "hide" class to ._$btn when it is set and :isUploadButtonHidden is false', function() {
      this.uploadArea = this.create({
        isUploadButtonHidden: false,
        hasInitialImage: false,
      });

      expect(this.uploadArea._$btn).not.toHaveClass('hide');
    });
  });

  describe('upload completion', function() {
    it('creates a blob URL for the uploaded image', function(done) {
      this.uploadArea = this.create();

      spyOn(this.uploadArea, '_URL').and.returnValue({
        createObjectURL: () => 'acoolblob',
      });

      this.uploadArea.on('image-uploaded', function({ src, url }) {
        expect(src).toEqual('acoolblob');
        expect(url).toEqual('endpoint/path');
        done();
      });

      this.uploadArea._uploader.trigger('complete', {
        file: 'foo',
        uploadEndpoint: 'endpoint',
        uploadPath: 'path',
        response: {
          success: true,
        },
      });
    });
  });
});
