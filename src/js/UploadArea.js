import Spinner from 'spin.js';
import CloudUploader from '@behance/beff/Component/CloudUploader';
import View from '@behance/beff/View';

import template from 'hgn-loader!../templates/upload-area';
import uploadIcon from 'hgn-loader!../templates/icons/upload';

const SPINNER_OPTIONS = {
  lines: 40,
  length: 1,
  width: 2,
  radius: 10,
  scale: 1,
  corners: 1,
  color: '#fff',
  opacity: 0.1,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 46,
  fps: 20,
  zIndex: 1,
  // Namespace the spinner class to prevent css collisions with more generic
  // application specific spinners.
  className: 'helicropter-spinner',
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: true,
  position: 'absolute',
};

export default View.extend({
  _defaults: {
    titleText: 'Upload Image',
    subtitleText: '',
  },

  mustache: template,

  partials: {
    uploadIcon: uploadIcon.template,
  },

  init(...args) {
    this._super(...args);

    const config = Object.assign({
      drift: 0,
      cors: {
        expected: true,
      },
      validation: {
        sizeLimit: 8388608,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        image: {
          minHeight: 316,
          minWidth: 404,
        },
        acceptFiles: 'image/*',
      },
    }, this._model.uploaderOptions);

    this._uploader = new CloudUploader(config);
    this._bind();
  },

  templateData() {
    this._model.titleText = this._model.titleText == null ? this._defaults.titleText : this._model.titleText;
    this._model.subtitleText = this._model.subtitleText || this._defaults.subtitleText;

    return this._model;
  },

  rendered() {
    this._$container = this.$view.parent();
    this._$btnArea = this.$view.find('.js-image-upload-wrapper');
    this._$btn = this.$view.find('.js-upload-button');
    this._$progressBar = this.$view.find('.js-progress-bar');
    this._$progress = this.$view.find('.js-progress');

    this._$container.css({
      width: this._model.width,
      height: this._model.height,
    });

    this._bindUploadButton();
    this._bindLoaderStyle(this._model.loaderStyle)();

    if (this._model.hasInitialImage) {
      return this.trigger('show-loading-state');
    }

    this.trigger('show-upload-state');
  },

  hide() {
    this._$container.addClass('hide');
  },

  show() {
    this._$container.removeClass('hide');
  },

  uploadImage() {
    return this._uploader.choose();
  },

  _URL() {
    return window.URL || window.webkitURL;
  },

  _bindUploadButton() {
    if (!this._model.isUploadButtonHidden) {
      this._$btn.on('click', () => this._uploader.choose());
      this.on('image-uploading show-loading-state', () => this._$btn.addClass('hide'));
      this.on('image-upload-complete upload-error show-upload-state', () => this._$btn.removeClass('hide'));
    }

    this.on('upload-image', () => this.uploadImage());
    this.on('image-uploaded', () => this.hide());
  },

  _bindLoaderStyle(type = 'spinner') {
    const types = {
      spinner: () => this._bindSpinner(),
      progressbar: () => this._bindProgressBar(),
    };

    if (!types[type]) {
      throw new Error(`loaderStyle must be 1 of ${Object.keys(types).toString()}`);
    }

    return types[type];
  },

  _bindSpinner() {
    this._$progressBar.hide();

    this.spinner = new Spinner(SPINNER_OPTIONS);
    const btnArea = this.$view.find('.js-image-upload-wrapper');

    this.on('image-uploading show-loading-state', () => this.spinner.spin(btnArea[0]));
    this.on('image-upload-complete upload-error show-upload-state', () => this.spinner.stop());
  },

  _bindProgressBar() {
    this._$progressBar.show();

    if (!this._$progressBar) {
      throw new Error('There is no instance of progress bar');
    }

    this.on('image-progress', ({ loaded, total }) => this._updateProgressBar({ loaded, total }));
  },

  _updateProgressBar({ loaded, total }) {
    const perc = loaded / total * 100;

    this._$progress.css('width', `${perc}%`);
  },

  _bind() {
    this.listenTo(this._uploader, {
      submit({ file }) {
        this._model.backgroundImage = this._URL().createObjectURL(file);

        this.trigger('image-uploading');
      },

      progress({ loaded, total }) {
        this.trigger('image-progress', { loaded, total });
      },

      complete({ file, uploadPath, uploadEndpoint, response }) {
        this.trigger('image-upload-complete');

        if (response && response.success) {
          this._url = `${uploadEndpoint}/${uploadPath}`;

          const src = this._URL().createObjectURL(file);

          this.trigger('image-uploaded', { src, url: this._url });
        }
      },

      error(err) {
        console.error(err);
        this.trigger('upload-error', err);
      },
    });
  },
});
