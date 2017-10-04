import $ from 'jquery';
import Helicropter from '../src/js/index';

var cropper = new Helicropter({
  uploaderOptions: {
    request: {
      endpoint: 'foo',
      accessKey: 'foo',
    },
    signature: {
      endpoint: '/s3handler',
    },
  },
  canvasSize: {
    width: 576,
    height: 362,
  },
  cropSize: {
    width: 404,
    height: 316,
  },
  displayedWidth: 500,
  previewCrop: {
    element: $('.js-preview-crop-container'),
  },
  cropRatio: {
    width: 4,
    height: 3,
  },
  viewportRatio: 'static',
  allowTransparency: false,
  // uploadTitle: 'Upload a new cover image',
  // uploadSubtitle: 'This will not affect your Behance cover image',
  initialImage: {
    src: '/imgs/test-letters.png',
    url: 'https://foo.com/imgs/test-letters.png',
    coordinates: {
      x: 48,
      y: 65,
      scale: 0.4105,
    },
  },
  // previewMode: true,
  uploadBackgroundImage: '/imgs/test-letters.png',
  showRatioLock: true,
  showSuggestions: true,
  suggestions: [
    { src: '/imgs/test-letters.png', url: 'https://foo.com/imgs/test-letters.png', active: true },
    { src: '/imgs/test-image-0.png', url: 'https://foo.com/imgs/test-image-0.png' },
    { src: '/imgs/test-image-1.png', url: 'https://foo.com/imgs/test-image-1.png' },
    { src: '/imgs/test-image-2.png', url: 'https://foo.com/imgs/test-image-2.png' },
    { src: '/imgs/test-image-3.png', url: 'https://foo.com/imgs/test-image-3.png' },
  ],
});
cropper.render($('.js-cropper'));

cropper.on('error:upload', function(err) {
  console.error('Error:', err.message);
});
window.cropper = cropper;

$('.removeImage').on('click', function() { cropper.removeImage(); });
