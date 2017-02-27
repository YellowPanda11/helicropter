import $ from 'jquery';
import Spinner from 'spin.js';
import CloudUploader from 'beff/Component/CloudUploader';
import View from 'beff/View';

import template from 'hgn!../templates/upload-area';
import uploadIcon from 'hgn!../templates/icons/upload';

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
  position: 'absolute'
};

const Uploader = CloudUploader.extend({
  init($uploadBtn, options) {
    let config = {};

    if (!options) {
      options = $uploadBtn;
      $uploadBtn = null;
    }
    else {
      config.button = $uploadBtn;
    }

    $.extend(config, {
      drift: 0,
      cors: {
        expected: true
      },
      validation: {
        sizeLimit: 8388608,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        image: {
          minHeight: 316,
          minWidth: 404
        },
        acceptFiles: 'image/*'
      }
    }, options);

    return this._super(config);
  }
});

export default View.extend({
  _defaults: {
    titleText: 'Upload Image',
    subtitleText: ''
  },

  mustache: template,

  partials: {
    uploadIcon: uploadIcon.template
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

    this._uploader = new Uploader(this._$btn[0], this._model.uploaderOptions);
    this._spinner = new Spinner(SPINNER_OPTIONS);

    this._$container.css({
      width: this._model.width,
      height: this._model.height
    });

    this._model.hasInitialImage ?
      this._showLoadingState() :
      this.showUploadState();

    this._bindUploader();
    this.on('upload-image', () => this.uploadImage());

    if (this._model.uploadImmediately) {
      this.uploadImage();
    }
  },

  hide() {
    this._$container.addClass('hide');
  },

  show() {
    this._$container.removeClass('hide');
  },

  showUploadState() {
    this._spinner.stop();
    this._$btn.removeClass('hide');
  },

  _showLoadingState() {
    this._$btn.addClass('hide');
    this._spinner.spin(this._$btnArea[0]);
  },

  uploadImage() {
    return this._uploader.choose();
  },

  _URL() {
    return window.URL || window.webkitURL;
  },

  _bindUploader() {
    this.listenTo(this._uploader, {
      submit() {
        this._showLoadingState();

        this.trigger('image-uploading');
      },

      complete({ file, uploadPath, uploadEndpoint, response }) {
        this.showUploadState();

        if (response && response.success) {
          this.hide();
          this._url = `${uploadEndpoint}/${uploadPath}`;

          const src = this._URL().createObjectURL(file);

          this.trigger('image-uploaded', { src, url: this._url });
        }
      },

      error(err) {
        this.showUploadState();

        console.error(err);
        this.trigger('upload-error', err);
      }
    });
  }
}, {
  Uploader
});
