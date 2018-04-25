import extend from '@behance/nbd/util/extend';
import Controller from '@behance/beff/Controller';
import View from '@behance/beff/View';
import BeffImage from '@behance/beff/dom/Image';

import UploadArea from './UploadArea';
import CroppingArea from './CroppingArea';
import ZoomSlider from './ZoomSlider';
import RatioLock from './RatioLock';
import SuggestionArea from './SuggestionArea';
import PreviewCrop from './PreviewCrop';

import mustache from 'hgn-loader!../templates/wrapper';

const HelicropterView = View.extend({
  mustache,

  init(...args) {
    this._super(...args);

    this._uploadArea = new UploadArea({
      uploaderOptions: this._model.get('uploaderOptions'),
      backgroundImage: this._model.get('uploadBackgroundImage'),
      width: this._model.get('canvasSize').width,
      height: this._model.get('canvasSize').height,
      titleText: this._model.get('uploadTitle'),
      subtitleText: this._model.get('uploadSubtitle'),
      hasInitialImage: this._model.get('initialImage'),
      loaderStyle: this._model.get('loaderStyle'),
    });

    this._croppingArea = new CroppingArea({
      canvasWidth: this._model.get('canvasSize').width,
      canvasHeight: this._model.get('canvasSize').height,
      cropWidth: this._model.get('cropSize').width,
      cropHeight: this._model.get('cropSize').height,
      displayedWidth: this._model.get('displayedWidth'),
      viewportRatio: this._model.get('viewportRatio'),
      cropRatio: this._model.get('cropRatio'),
      allowTransparency: this._model.get('allowTransparency'),
      previewMode: this._model.get('previewMode'),
      blurryImageWarningText: this._model.get('blurryImageWarningText'),
    });

    this._zoomSlider = new ZoomSlider();

    if (this._model.get('showRatioLock')) {
      this._ratioLock = new RatioLock({
        labelText: this._model.get('ratioLockText'),
        checked: this._model.get('viewportRatio') === 'static',
      });
    }
    if (this._model.get('showSuggestions')) {
      this._suggestionArea = new SuggestionArea({
        suggestions: this._model.get('suggestions'),
        maxSuggestions: this._model.get('maxSuggestions'),
      });
    }

    const config = this._model.get('previewCrop');

    if (config) {
      if (!config.element) {
        throw new Error('previewCrop.element must be supplied in the configuration');
      }

      this._previewCrop = new PreviewCrop({
        cropWidth: this._model.get('cropSize').width,
        cropHeight: this._model.get('cropSize').height,
      });
    }

    this._bindSubsections();
  },

  rendered() {
    this._renderCroppingArea();

    if (this._model.get('previewMode')) {
      if (this._model.get('initialImage')) {
        this._croppingArea.trigger('set-image', this._model.get('initialImage').src, this._model.get('initialImage').coordinates);
      }

      return;
    }

    this._renderUploadArea();
    this._renderSuggestionArea();

    this._renderZoomSlider();
    this._renderRatioLock();
    this._renderPreviewCrop();

    this._setInitialState();
  },

  getCropData() {
    if (!this._url) { return; }

    const coordinates = this._croppingArea.getCropData();

    if (!coordinates) { return; }

    return {
      src: this._src,
      url: this._url,
      dimensions: this._croppingArea.getDimensions(),
      coordinates,
    };
  },

  setCropperAspectRatio(ratio) {
    if (!this._croppingArea) { return; }

    this._croppingArea.trigger('update-ratio', ratio);
  },

  _renderUploadArea() {
    this._uploadArea.render(this.$view.find('.js-upload-container'));
  },

  _renderCroppingArea() {
    this._croppingArea.render(this.$view.find('.js-crop-container'));
  },

  _renderZoomSlider() {
    this._zoomSlider.render(this.$view.find('.js-crop-controls'));
  },

  _renderRatioLock() {
    if (this._model.get('showRatioLock')) {
      this._ratioLock.render(this.$view.find('.js-crop-controls'));
    }
  },

  _renderSuggestionArea() {
    if (this._model.get('showSuggestions')) {
      this._suggestionArea.render(this.$view.find('.js-suggestions'));
    }
  },

  _renderPreviewCrop() {
    if (this._previewCrop) {
      this._previewCrop.render(this._model.get('previewCrop').element);
    }
  },

  _setInitialState() {
    const initialImage = this._model.get('initialImage');

    this._disableImageManipulation();
    if (initialImage) {
      this._src = initialImage.src;
      this._url = initialImage.url;
      this._croppingArea.trigger('set-image', initialImage.src, initialImage.coordinates);
    }
    else {
      if (this._model.get('showRatioLock')) {
        this._ratioLock.disable();
      }
    }
  },

  _hideError() {
    this.$view.find('.js-croploader-errors').text('').addClass('hide');
  },

  _showError({ message = 'There was a problem uploading your image. Please try again.' }) {
    if (this._model.get('displayErrors')) {
      this.$view.find('.js-croploader-errors').text(message).removeClass('hide');
    }
  },

  _handleUploadError(err) {
    this.trigger('remove-image');
    this._showError(err);
    this.trigger('error:upload', err);
  },

  _bindSubsections() {
    this._croppingArea.relay(this._zoomSlider, 'scale');
    this._zoomSlider.relay(this._croppingArea, 'image-loaded set-crop-size');

    this.listenTo(this._croppingArea, {
      'image-loaded'() {
        this.trigger('image:loaded');
        this._enableImageManipulation();
      },

      'upload-error'(err = {}) {
        this._handleUploadError(err);
      },
    });

    this.listenTo(this._uploadArea, {
      'image-uploading'() {
        this._disableImageManipulation();
        this.trigger('image:uploading');
        this._hideError();
      },

      'image-uploaded'({ src, url }) {
        this._enableImageManipulation();

        this._url = url;
        this._src = src;

        this._croppingArea.trigger('set-image', src);
        this.trigger('image:uploaded', url);
      },

      'upload-error'(err) {
        this._handleUploadError(err);
      },
    });

    this.on('remove-image', () => {
      this._uploadArea.trigger('image-upload-complete');
      this._disableImageManipulation();
    });

    if (this._model.get('showRatioLock')) {
      this._croppingArea.relay(this._ratioLock, 'ratio-locked');

      this._uploadArea.on('set-image', () => this._ratioLock.enable());

      this.on('controls:enabled', () => this._ratioLock.enable());
      this.on('remove-image controls:disabled', () => this._ratioLock.disable());

      if (this._model.get('showSuggestions')) {
        this._suggestionArea.on('set-image', () => this._ratioLock.enable());
      }
    }

    if (this._model.get('showSuggestions')) {
      this._uploadArea.relay(this._suggestionArea, 'upload-image');
      this._suggestionArea.relay(this._uploadArea, 'image-uploaded');

      this.on('remove-image', () => this._suggestionArea.reset());
      this._suggestionArea.on('set-image', ({ url, src }) => {
        this._url = url;
        this._src = src;
        this._enableImageManipulation();
        this._hideError();
        this._croppingArea.trigger('set-image', src);
      });
    }

    if (this._model.get('previewCrop')) {
      this._uploadArea.relay(this._previewCrop, 'upload-image');
      this._previewCrop.relay(this._croppingArea, 'moving image-loaded scaling');
      this._previewCrop.relay(this, 'remove-image');
    }
  },

  _enableImageManipulation() {
    this._uploadArea.hide();

    this._croppingArea.show();

    this._zoomSlider.enable();

    this.trigger('controls:enabled');
  },

  _disableImageManipulation() {
    delete this._src;
    delete this._url;

    this._uploadArea.show();

    this._croppingArea.reset();
    this._croppingArea.hide();

    this._zoomSlider.disable();

    this.trigger('controls:disabled');
  },
});

const Helicropter = Controller.extend({
  _defaults: {
    uploaderOptions: {
      request: {
        endpoint: '',
        accessKey: '',
      },
      signature: {
        endpoint: '',
      },
    },
    canvasSize: {
      width: 432,
      height: 300,
    },
    cropSize: {
      width: 320,
      height: 250,
    },
    previewMode: false,
    viewportRatio: 'static',
    ratioLockText: 'Enable aspect ratio for cover image resize',
    allowTransparency: true,
    showRatioLock: false,
    showSuggestions: false,
    suggestions: [],
  },

  init(model) {
    this._super(extend({}, this._defaults, model));
    this.relay(this._view, 'controls:enabled controls:disabled image:uploading image:uploaded image:loaded error:upload');
  },

  crop() {
    return this._view.getCropData();
  },

  getCroppedImage({ width, height }) {
    const { dimensions, src } = this.crop();

    return BeffImage.load(src).then(beffImage => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(
        beffImage.image,
        dimensions.x,
        dimensions.y,
        dimensions.width,
        dimensions.height,
        0,
        0,
        width,
        height,
      );

      return canvas.toDataURL('image/png');
    });
  },

  uploadThenRender($context) {
    if (this._view.$view) {
      return;
    }

    this._view._uploadArea._model.isUploadButtonHidden = true;
    this._view.stopListening(this._view._uploadArea, 'image-uploading');
    this._view.listenOnce(this._view._uploadArea, {
      'image-uploading'() {
        this.trigger('image:uploading');
        this.render($context);
      },
    });

    this.uploadImage();
  },

  changeAspectRatio(ratio) {
    this._view.setCropperAspectRatio(ratio);
  },

  uploadImage() {
    return this._view._uploadArea.uploadImage();
  },

  removeImage() {
    this._view.trigger('remove-image');
  },
}, {
  VIEW_CLASS: HelicropterView,
});

export default Helicropter;
