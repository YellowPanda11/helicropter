(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("nbd/util/extend"), require("beff/Controller"), require("beff/View"), require("jquery"), require("beff/Component/CloudUploader"));
	else if(typeof define === 'function' && define.amd)
		define(["nbd/util/extend", "beff/Controller", "beff/View", "jquery", "beff/Component/CloudUploader"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("nbd/util/extend"), require("beff/Controller"), require("beff/View"), require("jquery"), require("beff/Component/CloudUploader")) : factory(root["nbd/util/extend"], root["beff/Controller"], root["beff/View"], root["jquery"], root["beff/Component/CloudUploader"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _nbdUtilExtend = __webpack_require__(1);
	
	var _nbdUtilExtend2 = _interopRequireDefault(_nbdUtilExtend);
	
	var _beffController = __webpack_require__(2);
	
	var _beffController2 = _interopRequireDefault(_beffController);
	
	var _beffView = __webpack_require__(3);
	
	var _beffView2 = _interopRequireDefault(_beffView);
	
	var _UploadArea = __webpack_require__(4);
	
	var _UploadArea2 = _interopRequireDefault(_UploadArea);
	
	var _CroppingArea = __webpack_require__(11);
	
	var _CroppingArea2 = _interopRequireDefault(_CroppingArea);
	
	var _ZoomSlider = __webpack_require__(56);
	
	var _ZoomSlider2 = _interopRequireDefault(_ZoomSlider);
	
	var _RatioLock = __webpack_require__(58);
	
	var _RatioLock2 = _interopRequireDefault(_RatioLock);
	
	var _SuggestionArea = __webpack_require__(60);
	
	var _SuggestionArea2 = _interopRequireDefault(_SuggestionArea);
	
	var _templatesWrapperMustache = __webpack_require__(62);
	
	var _templatesWrapperMustache2 = _interopRequireDefault(_templatesWrapperMustache);
	
	var HelicropterView = _beffView2['default'].extend({
	  mustache: _templatesWrapperMustache2['default'],
	
	  rendered: function rendered() {
	    this._addUploadArea();
	    this._addCroppingArea();
	    this._addZoomSlider();
	    this._addRatioLock();
	    this._addSuggestionArea();
	
	    this._bindSubsections();
	    this._setInitialState();
	  },
	
	  getCropData: function getCropData() {
	    if (!this._url) {
	      return;
	    }
	
	    return {
	      url: this._url,
	      coordinates: this._croppingArea.getCropData()
	    };
	  },
	
	  _addUploadArea: function _addUploadArea() {
	    this._uploadArea = new _UploadArea2['default']({
	      uploaderOptions: this._model.get('uploaderOptions'),
	      width: this._model.get('canvasSize').width,
	      height: this._model.get('canvasSize').height,
	      titleText: this._model.get('uploadTitle'),
	      subtitleText: this._model.get('uploadSubtitle')
	    });
	    this._uploadArea.render(this.$view.find('.js-upload-container'));
	  },
	
	  _addCroppingArea: function _addCroppingArea() {
	    this._croppingArea = new _CroppingArea2['default']({
	      canvasWidth: this._model.get('canvasSize').width,
	      canvasHeight: this._model.get('canvasSize').height,
	      cropWidth: this._model.get('cropSize').width,
	      cropHeight: this._model.get('cropSize').height
	    });
	    this._croppingArea.render(this.$view.find('.js-crop-container'));
	  },
	
	  _addZoomSlider: function _addZoomSlider() {
	    this._zoomSlider = new _ZoomSlider2['default']({
	      cropWidth: this._model.get('cropSize').width,
	      cropHeight: this._model.get('cropSize').height
	    });
	    this._zoomSlider.render(this.$view.find('.js-crop-controls'));
	  },
	
	  _addRatioLock: function _addRatioLock() {
	    if (this._model.get('showRatioLock')) {
	      this._ratioLock = new _RatioLock2['default']({
	        labelText: this._model.get('ratioLockText')
	      });
	      this._ratioLock.render(this.$view.find('.js-crop-controls'));
	    }
	  },
	
	  _addSuggestionArea: function _addSuggestionArea() {
	    if (this._model.get('showSuggestions')) {
	      this._suggestionArea = new _SuggestionArea2['default']({
	        suggestions: this._model.get('suggestions')
	      });
	      this._suggestionArea.render(this.$view.find('.js-suggestions'));
	    }
	  },
	
	  _setInitialState: function _setInitialState() {
	    var initialImage = this._model.get('initialImage');
	
	    if (initialImage) {
	      this._url = initialImage;
	      this._croppingArea.trigger('set-image', initialImage);
	      this._enableImageManipulation();
	    } else {
	      this._disableImageManipulation();
	
	      if (this._model.get('showRatioLock')) {
	        this._ratioLock.disable();
	      }
	    }
	  },
	
	  _bindSubsections: function _bindSubsections() {
	    var _this = this;
	
	    this._croppingArea.relay(this._zoomSlider, 'scale');
	    this._croppingArea.relay(this._uploadArea, 'set-image');
	    this._zoomSlider.relay(this._croppingArea, 'image-loaded');
	
	    this._uploadArea.on('image-uploaded', function (url) {
	      _this._url = url;
	      _this.trigger('image:uploaded');
	    });
	    this._uploadArea.on('set-image', function () {
	      _this._enableImageManipulation();
	      _this.trigger('image:uploading');
	    });
	
	    this.on('remove-image', function () {
	      return _this._disableImageManipulation();
	    });
	
	    if (this._model.get('showRatioLock')) {
	      this._croppingArea.relay(this._ratioLock, 'ratio-locked');
	
	      this._uploadArea.on('set-image', function () {
	        return _this._ratioLock.enable();
	      });
	      this.on('remove-image', function () {
	        return _this._ratioLock.disable();
	      });
	
	      if (this._model.get('showSuggestions')) {
	        this._suggestionArea.on('set-image', function () {
	          return _this._ratioLock.enable();
	        });
	      }
	    }
	
	    if (this._model.get('showSuggestions')) {
	      this._croppingArea.relay(this._suggestionArea, 'set-image');
	      this._uploadArea.relay(this._suggestionArea, 'upload-image');
	
	      this.on('remove-image', function () {
	        return _this._suggestionArea.reset();
	      });
	      this._uploadArea.on('set-image', function () {
	        return _this._suggestionArea.reset();
	      });
	      this._suggestionArea.on('set-image', function (url) {
	        _this._url = url;
	        _this._enableImageManipulation();
	      });
	    }
	  },
	
	  _enableImageManipulation: function _enableImageManipulation() {
	    this._uploadArea.hide();
	
	    this._croppingArea.show();
	
	    this._zoomSlider.reset();
	    this._zoomSlider.enable();
	
	    this.trigger('controls:enabled');
	  },
	
	  _disableImageManipulation: function _disableImageManipulation() {
	    this._uploadArea.show();
	
	    this._croppingArea.reset();
	    this._croppingArea.hide();
	
	    this._zoomSlider.disable();
	
	    this.trigger('controls:disabled');
	  }
	});
	
	var Helicropter = _beffController2['default'].extend({
	  _defaults: {
	    uploaderOptions: {
	      request: {
	        endpoint: '',
	        accessKey: ''
	      },
	      signature: {
	        endpoint: ''
	      }
	    },
	    canvasSize: {
	      width: 432,
	      height: 300
	    },
	    cropSize: {
	      width: 320,
	      height: 250
	    },
	    showRatioLock: false,
	    showSuggestions: false,
	    suggestions: []
	  },
	
	  init: function init(model) {
	    this._super((0, _nbdUtilExtend2['default'])({}, this._defaults, model));
	
	    this.relay(this._view, 'controls:enabled controls:disabled image:uploading image:uploaded');
	  },
	
	  crop: function crop() {
	    return this._view.getCropData();
	  },
	
	  removeImage: function removeImage() {
	    this._view.trigger('remove-image');
	  }
	}, {
	  VIEW_CLASS: HelicropterView
	});
	
	exports['default'] = Helicropter;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _jquery = __webpack_require__(5);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _beffComponentCloudUploader = __webpack_require__(6);
	
	var _beffComponentCloudUploader2 = _interopRequireDefault(_beffComponentCloudUploader);
	
	var _beffView = __webpack_require__(3);
	
	var _beffView2 = _interopRequireDefault(_beffView);
	
	var _templatesUploadAreaMustache = __webpack_require__(7);
	
	var _templatesUploadAreaMustache2 = _interopRequireDefault(_templatesUploadAreaMustache);
	
	var Uploader = _beffComponentCloudUploader2['default'].extend({
	  init: function init($uploadBtn, options) {
	    var config = {};
	
	    if (!options) {
	      options = $uploadBtn;
	      $uploadBtn = null;
	    } else {
	      config.button = $uploadBtn;
	    }
	
	    _jquery2['default'].extend(config, {
	      drift: 0,
	      cors: {
	        expected: true,
	        sendCredentials: true
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
	
	exports['default'] = _beffView2['default'].extend({
	  _defaults: {
	    titleText: 'Upload Image',
	    subtitleText: ''
	  },
	
	  mustache: _templatesUploadAreaMustache2['default'],
	
	  templateData: function templateData() {
	    this._model.titleText = this._model.titleText || this._defaults.titleText;
	    this._model.subtitleText = this._model.subtitleText || this._defaults.subtitleText;
	
	    return this._model;
	  },
	
	  rendered: function rendered() {
	    var _this = this;
	
	    this._$container = this.$view.parent();
	
	    this._uploader = new Uploader(this.$view[0], this._model.uploaderOptions);
	
	    this._$container.css({
	      width: this._model.width,
	      height: this._model.height
	    });
	
	    this._bindUploader();
	    this.on('upload-image', function () {
	      return _this._uploadImage();
	    });
	  },
	
	  hide: function hide() {
	    this._$container.addClass('hide');
	  },
	
	  show: function show() {
	    this._$container.removeClass('hide');
	  },
	
	  _uploadImage: function _uploadImage() {
	    this._uploader.choose();
	  },
	
	  _bindUploader: function _bindUploader() {
	    this.listenTo(this._uploader, {
	      submit: function submit(_ref) {
	        var file = _ref.file;
	
	        this.hide();
	        this.trigger('set-image', file.readerData.result);
	      },
	
	      complete: function complete(data) {
	        this._url = data.uploadEndpoint + '/' + data.uploadPath;
	        this.trigger('image-uploaded', this._url);
	      },
	
	      error: function error(err) {
	        console.error(err);
	      }
	    });
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(8);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"js-upload-button image-upload\">");t.b("\n" + i);t.b("  <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"");t.b("\n" + i);t.b("     viewBox=\"0 0 48 48\" enable-background=\"new 0 0 48 48\" xml:space=\"preserve\" class=\"icon icon-upload\">");t.b("\n" + i);t.b("  <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M41,21.9c0.1-0.6,0.2-1.2,0.2-1.9c0-6.6-5.4-12-12-12");t.b("\n" + i);t.b("    c-5.6,0-10.3,3.9-11.6,9c-0.9-0.3-1.9-0.5-3-0.5c-5.2,0-9.4,4.2-9.4,9.4c0,0.9,0.1,1.8,0.4,2.6c-0.1,0-0.2,0-0.4,0");t.b("\n" + i);t.b("    c-2.8,0-5.1,2.3-5.1,5.1S2.3,39,5.1,39c0.6,0,1.7,0,1.7,0H24V25l-6.6,7l-2.8-2.5L26,18l11.4,11.5L34.5,32L28,25v14h11.5l1.7-0.3");t.b("\n" + i);t.b("    c3.9-0.8,6.8-4.3,6.8-8.4C48,26.1,45,22.6,41,21.9z\"/>");t.b("\n" + i);t.b("  </svg>");t.b("\n" + i);if(t.s(t.f("titleText",c,p,1),c,p,0,706,764,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"image-upload-text\">");t.b(t.v(t.f("titleText",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}if(t.s(t.f("subtitleText",c,p,1),c,p,0,798,862,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"image-upload-subtext\">");t.b(t.v(t.f("subtitleText",c,p,0)));t.b("</div>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"js-upload-button image-upload\">\n  <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n     viewBox=\"0 0 48 48\" enable-background=\"new 0 0 48 48\" xml:space=\"preserve\" class=\"icon icon-upload\">\n  <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M41,21.9c0.1-0.6,0.2-1.2,0.2-1.9c0-6.6-5.4-12-12-12\n    c-5.6,0-10.3,3.9-11.6,9c-0.9-0.3-1.9-0.5-3-0.5c-5.2,0-9.4,4.2-9.4,9.4c0,0.9,0.1,1.8,0.4,2.6c-0.1,0-0.2,0-0.4,0\n    c-2.8,0-5.1,2.3-5.1,5.1S2.3,39,5.1,39c0.6,0,1.7,0,1.7,0H24V25l-6.6,7l-2.8-2.5L26,18l11.4,11.5L34.5,32L28,25v14h11.5l1.7-0.3\n    c3.9-0.8,6.8-4.3,6.8-8.4C48,26.1,45,22.6,41,21.9z\"/>\n  </svg>\n  {{#titleText}}\n    <div class=\"image-upload-text\">{{titleText}}</div>\n  {{/titleText}}\n  {{#subtitleText}}\n    <div class=\"image-upload-subtext\">{{subtitleText}}</div>\n  {{/subtitleText}}\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	// This file is for use with Node.js. See dist/ for browser files.
	
	var Hogan = __webpack_require__(9);
	Hogan.Template = __webpack_require__(10).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	(function (Hogan) {
	  // Setup regex  assignments
	  // remove whitespace according to Mustache spec
	  var rIsWhitespace = /\S/,
	      rQuot = /\"/g,
	      rNewline =  /\n/g,
	      rCr = /\r/g,
	      rSlash = /\\/g,
	      rLineSep = /\u2028/,
	      rParagraphSep = /\u2029/;
	
	  Hogan.tags = {
	    '#': 1, '^': 2, '<': 3, '$': 4,
	    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
	    '{': 10, '&': 11, '_t': 12
	  };
	
	  Hogan.scan = function scan(text, delimiters) {
	    var len = text.length,
	        IN_TEXT = 0,
	        IN_TAG_TYPE = 1,
	        IN_TAG = 2,
	        state = IN_TEXT,
	        tagType = null,
	        tag = null,
	        buf = '',
	        tokens = [],
	        seenTag = false,
	        i = 0,
	        lineStart = 0,
	        otag = '{{',
	        ctag = '}}';
	
	    function addBuf() {
	      if (buf.length > 0) {
	        tokens.push({tag: '_t', text: new String(buf)});
	        buf = '';
	      }
	    }
	
	    function lineIsWhitespace() {
	      var isAllWhitespace = true;
	      for (var j = lineStart; j < tokens.length; j++) {
	        isAllWhitespace =
	          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
	          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
	        if (!isAllWhitespace) {
	          return false;
	        }
	      }
	
	      return isAllWhitespace;
	    }
	
	    function filterLine(haveSeenTag, noNewLine) {
	      addBuf();
	
	      if (haveSeenTag && lineIsWhitespace()) {
	        for (var j = lineStart, next; j < tokens.length; j++) {
	          if (tokens[j].text) {
	            if ((next = tokens[j+1]) && next.tag == '>') {
	              // set indent to token value
	              next.indent = tokens[j].text.toString()
	            }
	            tokens.splice(j, 1);
	          }
	        }
	      } else if (!noNewLine) {
	        tokens.push({tag:'\n'});
	      }
	
	      seenTag = false;
	      lineStart = tokens.length;
	    }
	
	    function changeDelimiters(text, index) {
	      var close = '=' + ctag,
	          closeIndex = text.indexOf(close, index),
	          delimiters = trim(
	            text.substring(text.indexOf('=', index) + 1, closeIndex)
	          ).split(' ');
	
	      otag = delimiters[0];
	      ctag = delimiters[delimiters.length - 1];
	
	      return closeIndex + close.length - 1;
	    }
	
	    if (delimiters) {
	      delimiters = delimiters.split(' ');
	      otag = delimiters[0];
	      ctag = delimiters[1];
	    }
	
	    for (i = 0; i < len; i++) {
	      if (state == IN_TEXT) {
	        if (tagChange(otag, text, i)) {
	          --i;
	          addBuf();
	          state = IN_TAG_TYPE;
	        } else {
	          if (text.charAt(i) == '\n') {
	            filterLine(seenTag);
	          } else {
	            buf += text.charAt(i);
	          }
	        }
	      } else if (state == IN_TAG_TYPE) {
	        i += otag.length - 1;
	        tag = Hogan.tags[text.charAt(i + 1)];
	        tagType = tag ? text.charAt(i + 1) : '_v';
	        if (tagType == '=') {
	          i = changeDelimiters(text, i);
	          state = IN_TEXT;
	        } else {
	          if (tag) {
	            i++;
	          }
	          state = IN_TAG;
	        }
	        seenTag = i;
	      } else {
	        if (tagChange(ctag, text, i)) {
	          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
	                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
	          buf = '';
	          i += ctag.length - 1;
	          state = IN_TEXT;
	          if (tagType == '{') {
	            if (ctag == '}}') {
	              i++;
	            } else {
	              cleanTripleStache(tokens[tokens.length - 1]);
	            }
	          }
	        } else {
	          buf += text.charAt(i);
	        }
	      }
	    }
	
	    filterLine(seenTag, true);
	
	    return tokens;
	  }
	
	  function cleanTripleStache(token) {
	    if (token.n.substr(token.n.length - 1) === '}') {
	      token.n = token.n.substring(0, token.n.length - 1);
	    }
	  }
	
	  function trim(s) {
	    if (s.trim) {
	      return s.trim();
	    }
	
	    return s.replace(/^\s*|\s*$/g, '');
	  }
	
	  function tagChange(tag, text, index) {
	    if (text.charAt(index) != tag.charAt(0)) {
	      return false;
	    }
	
	    for (var i = 1, l = tag.length; i < l; i++) {
	      if (text.charAt(index + i) != tag.charAt(i)) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  // the tags allowed inside super templates
	  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};
	
	  function buildTree(tokens, kind, stack, customTags) {
	    var instructions = [],
	        opener = null,
	        tail = null,
	        token = null;
	
	    tail = stack[stack.length - 1];
	
	    while (tokens.length > 0) {
	      token = tokens.shift();
	
	      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
	        throw new Error('Illegal content in < super tag.');
	      }
	
	      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
	        stack.push(token);
	        token.nodes = buildTree(tokens, token.tag, stack, customTags);
	      } else if (token.tag == '/') {
	        if (stack.length === 0) {
	          throw new Error('Closing tag without opener: /' + token.n);
	        }
	        opener = stack.pop();
	        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
	          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
	        }
	        opener.end = token.i;
	        return instructions;
	      } else if (token.tag == '\n') {
	        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
	      }
	
	      instructions.push(token);
	    }
	
	    if (stack.length > 0) {
	      throw new Error('missing closing tag: ' + stack.pop().n);
	    }
	
	    return instructions;
	  }
	
	  function isOpener(token, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].o == token.n) {
	        token.tag = '#';
	        return true;
	      }
	    }
	  }
	
	  function isCloser(close, open, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].c == close && tags[i].o == open) {
	        return true;
	      }
	    }
	  }
	
	  function stringifySubstitutions(obj) {
	    var items = [];
	    for (var key in obj) {
	      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
	    }
	    return "{ " + items.join(",") + " }";
	  }
	
	  function stringifyPartials(codeObj) {
	    var partials = [];
	    for (var key in codeObj.partials) {
	      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
	    }
	    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
	  }
	
	  Hogan.stringify = function(codeObj, text, options) {
	    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
	  }
	
	  var serialNo = 0;
	  Hogan.generate = function(tree, text, options) {
	    serialNo = 0;
	    var context = { code: '', subs: {}, partials: {} };
	    Hogan.walk(tree, context);
	
	    if (options.asString) {
	      return this.stringify(context, text, options);
	    }
	
	    return this.makeTemplate(context, text, options);
	  }
	
	  Hogan.wrapMain = function(code) {
	    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
	  }
	
	  Hogan.template = Hogan.Template;
	
	  Hogan.makeTemplate = function(codeObj, text, options) {
	    var template = this.makePartials(codeObj);
	    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
	    return new this.template(template, text, this, options);
	  }
	
	  Hogan.makePartials = function(codeObj) {
	    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
	    for (key in template.partials) {
	      template.partials[key] = this.makePartials(template.partials[key]);
	    }
	    for (key in codeObj.subs) {
	      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
	    }
	    return template;
	  }
	
	  function esc(s) {
	    return s.replace(rSlash, '\\\\')
	            .replace(rQuot, '\\\"')
	            .replace(rNewline, '\\n')
	            .replace(rCr, '\\r')
	            .replace(rLineSep, '\\u2028')
	            .replace(rParagraphSep, '\\u2029');
	  }
	
	  function chooseMethod(s) {
	    return (~s.indexOf('.')) ? 'd' : 'f';
	  }
	
	  function createPartial(node, context) {
	    var prefix = "<" + (context.prefix || "");
	    var sym = prefix + node.n + serialNo++;
	    context.partials[sym] = {name: node.n, partials: {}};
	    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
	    return sym;
	  }
	
	  Hogan.codegen = {
	    '#': function(node, context) {
	      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
	                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
	                      't.rs(c,p,' + 'function(c,p,t){';
	      Hogan.walk(node.nodes, context);
	      context.code += '});c.pop();}';
	    },
	
	    '^': function(node, context) {
	      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
	      Hogan.walk(node.nodes, context);
	      context.code += '};';
	    },
	
	    '>': createPartial,
	    '<': function(node, context) {
	      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
	      Hogan.walk(node.nodes, ctx);
	      var template = context.partials[createPartial(node, context)];
	      template.subs = ctx.subs;
	      template.partials = ctx.partials;
	    },
	
	    '$': function(node, context) {
	      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
	      Hogan.walk(node.nodes, ctx);
	      context.subs[node.n] = ctx.code;
	      if (!context.inPartial) {
	        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
	      }
	    },
	
	    '\n': function(node, context) {
	      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
	    },
	
	    '_v': function(node, context) {
	      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	    },
	
	    '_t': function(node, context) {
	      context.code += write('"' + esc(node.text) + '"');
	    },
	
	    '{': tripleStache,
	
	    '&': tripleStache
	  }
	
	  function tripleStache(node, context) {
	    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	  }
	
	  function write(s) {
	    return 't.b(' + s + ');';
	  }
	
	  Hogan.walk = function(nodelist, context) {
	    var func;
	    for (var i = 0, l = nodelist.length; i < l; i++) {
	      func = Hogan.codegen[nodelist[i].tag];
	      func && func(nodelist[i], context);
	    }
	    return context;
	  }
	
	  Hogan.parse = function(tokens, text, options) {
	    options = options || {};
	    return buildTree(tokens, '', [], options.sectionTags || []);
	  }
	
	  Hogan.cache = {};
	
	  Hogan.cacheKey = function(text, options) {
	    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
	  }
	
	  Hogan.compile = function(text, options) {
	    options = options || {};
	    var key = Hogan.cacheKey(text, options);
	    var template = this.cache[key];
	
	    if (template) {
	      var partials = template.partials;
	      for (var name in partials) {
	        delete partials[name].instance;
	      }
	      return template;
	    }
	
	    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
	    return this.cache[key] = template;
	  }
	})(true ? exports : Hogan);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */
	
	var Hogan = {};
	
	(function (Hogan) {
	  Hogan.Template = function (codeObj, text, compiler, options) {
	    codeObj = codeObj || {};
	    this.r = codeObj.code || this.r;
	    this.c = compiler;
	    this.options = options || {};
	    this.text = text || '';
	    this.partials = codeObj.partials || {};
	    this.subs = codeObj.subs || {};
	    this.buf = '';
	  }
	
	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },
	
	    // variable escaping
	    v: hoganEscape,
	
	    // triple stache
	    t: coerceToString,
	
	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },
	
	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },
	
	    // ensurePartial
	    ep: function(symbol, partials) {
	      var partial = this.partials[symbol];
	
	      // check to see that if we've instantiated this partial before
	      var template = partials[partial.name];
	      if (partial.instance && partial.base == template) {
	        return partial.instance;
	      }
	
	      if (typeof template == 'string') {
	        if (!this.c) {
	          throw new Error("No compiler available.");
	        }
	        template = this.c.compile(template, this.options);
	      }
	
	      if (!template) {
	        return null;
	      }
	
	      // We use this to check whether the partials dictionary has changed
	      this.partials[symbol].base = template;
	
	      if (partial.subs) {
	        // Make sure we consider parent template now
	        if (!partials.stackText) partials.stackText = {};
	        for (key in partial.subs) {
	          if (!partials.stackText[key]) {
	            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
	          }
	        }
	        template = createSpecializedPartial(template, partial.subs, partial.partials,
	          this.stackSubs, this.stackPartials, partials.stackText);
	      }
	      this.partials[symbol].instance = template;
	
	      return template;
	    },
	
	    // tries to find a partial in the current scope and render it
	    rp: function(symbol, context, partials, indent) {
	      var partial = this.ep(symbol, partials);
	      if (!partial) {
	        return '';
	      }
	
	      return partial.ri(context, partials, indent);
	    },
	
	    // render a section
	    rs: function(context, partials, section) {
	      var tail = context[context.length - 1];
	
	      if (!isArray(tail)) {
	        section(context, partials, this);
	        return;
	      }
	
	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        section(context, partials, this);
	        context.pop();
	      }
	    },
	
	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;
	
	      if (isArray(val) && val.length === 0) {
	        return false;
	      }
	
	      if (typeof val == 'function') {
	        val = this.ms(val, ctx, partials, inverted, start, end, tags);
	      }
	
	      pass = !!val;
	
	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }
	
	      return pass;
	    },
	
	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var found,
	          names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          doModelGet = this.options.modelGet,
	          cx = null;
	
	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        val = ctx[ctx.length - 1];
	      } else {
	        for (var i = 1; i < names.length; i++) {
	          found = findInScope(names[i], val, doModelGet);
	          if (found !== undefined) {
	            cx = val;
	            val = found;
	          } else {
	            val = '';
	          }
	        }
	      }
	
	      if (returnFound && !val) {
	        return false;
	      }
	
	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.mv(val, ctx, partials);
	        ctx.pop();
	      }
	
	      return val;
	    },
	
	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false,
	          doModelGet = this.options.modelGet;
	
	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        val = findInScope(key, v, doModelGet);
	        if (val !== undefined) {
	          found = true;
	          break;
	        }
	      }
	
	      if (!found) {
	        return (returnFound) ? false : "";
	      }
	
	      if (!returnFound && typeof val == 'function') {
	        val = this.mv(val, ctx, partials);
	      }
	
	      return val;
	    },
	
	    // higher order templates
	    ls: function(func, cx, partials, text, tags) {
	      var oldTags = this.options.delimiters;
	
	      this.options.delimiters = tags;
	      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
	      this.options.delimiters = oldTags;
	
	      return false;
	    },
	
	    // compile text
	    ct: function(text, cx, partials) {
	      if (this.options.disableLambda) {
	        throw new Error('Lambda features disabled.');
	      }
	      return this.c.compile(text, this.options).render(cx, partials);
	    },
	
	    // template result buffering
	    b: function(s) { this.buf += s; },
	
	    fl: function() { var r = this.buf; this.buf = ''; return r; },
	
	    // method replace section
	    ms: function(func, ctx, partials, inverted, start, end, tags) {
	      var textSource,
	          cx = ctx[ctx.length - 1],
	          result = func.call(cx);
	
	      if (typeof result == 'function') {
	        if (inverted) {
	          return true;
	        } else {
	          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
	          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
	        }
	      }
	
	      return result;
	    },
	
	    // method replace variable
	    mv: function(func, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = func.call(cx);
	
	      if (typeof result == 'function') {
	        return this.ct(coerceToString(result.call(cx)), cx, partials);
	      }
	
	      return result;
	    },
	
	    sub: function(name, context, partials, indent) {
	      var f = this.subs[name];
	      if (f) {
	        this.activeSub = name;
	        f(context, partials, this, indent);
	        this.activeSub = false;
	      }
	    }
	
	  };
	
	  //Find a key in an object
	  function findInScope(key, scope, doModelGet) {
	    var val;
	
	    if (scope && typeof scope == 'object') {
	
	      if (scope[key] !== undefined) {
	        val = scope[key];
	
	      // try lookup with get for backbone or similar model data
	      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
	        val = scope.get(key);
	      }
	    }
	
	    return val;
	  }
	
	  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
	    function PartialTemplate() {};
	    PartialTemplate.prototype = instance;
	    function Substitutions() {};
	    Substitutions.prototype = instance.subs;
	    var key;
	    var partial = new PartialTemplate();
	    partial.subs = new Substitutions();
	    partial.subsText = {};  //hehe. substext.
	    partial.buf = '';
	
	    stackSubs = stackSubs || {};
	    partial.stackSubs = stackSubs;
	    partial.subsText = stackText;
	    for (key in subs) {
	      if (!stackSubs[key]) stackSubs[key] = subs[key];
	    }
	    for (key in stackSubs) {
	      partial.subs[key] = stackSubs[key];
	    }
	
	    stackPartials = stackPartials || {};
	    partial.stackPartials = stackPartials;
	    for (key in partials) {
	      if (!stackPartials[key]) stackPartials[key] = partials[key];
	    }
	    for (key in stackPartials) {
	      partial.partials[key] = stackPartials[key];
	    }
	
	    return partial;
	  }
	
	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;
	
	  function coerceToString(val) {
	    return String((val === null || val === undefined) ? '' : val);
	  }
	
	  function hoganEscape(str) {
	    str = coerceToString(str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }
	
	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };
	
	})(true ? exports : Hogan);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _nbdUtilExtend = __webpack_require__(1);
	
	var _nbdUtilExtend2 = _interopRequireDefault(_nbdUtilExtend);
	
	var _beffView = __webpack_require__(3);
	
	var _beffView2 = _interopRequireDefault(_beffView);
	
	var _fabric = __webpack_require__(12);
	
	var _templatesCropAreaMustache = __webpack_require__(55);
	
	var _templatesCropAreaMustache2 = _interopRequireDefault(_templatesCropAreaMustache);
	
	exports['default'] = _beffView2['default'].extend({
	  mustache: _templatesCropAreaMustache2['default'],
	
	  rendered: function rendered() {
	    var _on,
	        _this = this;
	
	    this._$canvas = this.$view.find('.js-cropper-canvas');
	    this._$canvas.prop({
	      width: this._model.canvasWidth,
	      height: this._model.canvasHeight
	    });
	
	    this._canvas = new _fabric.fabric.Canvas(this._$canvas[0], {
	      selection: false
	    });
	
	    this._canvas.on('mouse:down', function () {
	      return _this._canvas.setActiveObject(_this._cropArea);
	    });
	    this._canvas.on('mouse:move', function () {
	      return _this._canvas.setActiveObject(_this._cropArea);
	    });
	    this._canvas.on('mouse:up', function () {
	      return _this._canvas.setActiveObject(_this._cropArea);
	    });
	
	    this._createImage();
	    this._createStaticCropArea();
	
	    this.on((_on = {
	      scale: function scale(scaleValue) {
	        this._scaleImage(scaleValue);
	      }
	
	    }, _defineProperty(_on, 'set-image', function setImage(imageSrc) {
	      this._model.image = imageSrc;
	      this._createImage();
	    }), _defineProperty(_on, 'ratio-locked', function ratioLocked(_ratioLocked) {
	      this._removeOverlay();
	
	      if (this._cropArea) {
	        this._canvas.remove(this._cropArea);
	      }
	
	      if (_ratioLocked) {
	        this._createStaticCropArea();
	      } else {
	        this._createDynamicCropArea();
	      }
	    }), _on));
	  },
	
	  hide: function hide() {
	    this.$view.addClass('hide');
	  },
	
	  show: function show() {
	    this.$view.removeClass('hide');
	  },
	
	  reset: function reset() {
	    if (this._image) {
	      this._canvas.remove(this._image);
	      this._image = null;
	    }
	  },
	
	  getCropData: function getCropData() {
	    return {
	      x: this._image.get('left') * -1 + this._cropArea.get('left'),
	      y: this._image.get('top') * -1 + this._cropArea.get('top'),
	      width: this._cropArea.getWidth(),
	      height: this._cropArea.getHeight(),
	      scale: this._image.getScaleX()
	    };
	  },
	
	  _createImage: function _createImage() {
	    var _this2 = this;
	
	    if (!this._model.image) {
	      return;
	    }
	
	    var image = new Image();
	    image.onload = function () {
	      if (_this2._image) {
	        _this2._image.remove();
	      }
	
	      _this2._image = new _fabric.fabric.Image(image, {
	        left: 0,
	        top: 0,
	        originX: 'left',
	        originY: 'top',
	        hasBorders: false,
	        hasControls: false
	      });
	
	      _this2._canvas.add(_this2._image);
	      _this2._image.sendToBack();
	      _this2._image.scale(1.0).setCoords();
	      _this2._image.center().setCoords();
	
	      _this2._image.on('moving', function () {
	        _this2._checkImageBounds();
	        _this2._canvas.setActiveObject(_this2._cropArea);
	      });
	
	      _this2.trigger('image-loaded', {
	        width: _this2._image.get('width'),
	        height: _this2._image.get('height')
	      });
	    };
	
	    image.src = this._model.image;
	  },
	
	  _scaleImage: function _scaleImage(scaleValue) {
	    if (!scaleValue) {
	      return;
	    }
	
	    var previousDimensions = {
	      width: this._image.getWidth(),
	      height: this._image.getHeight()
	    };
	    var previousCentroid = {
	      left: this._image.get('left') * -1 + this._cropArea.get('left') + this._cropArea.getWidth() / 2,
	      top: this._image.get('top') * -1 + this._cropArea.get('top') + this._cropArea.getHeight() / 2
	    };
	
	    this._image.scale(scaleValue).setCoords();
	
	    var postDimensions = {
	      width: this._image.getWidth(),
	      height: this._image.getHeight()
	    };
	    var postCentroid = {
	      left: previousCentroid.left * (postDimensions.width / previousDimensions.width),
	      top: previousCentroid.top * (postDimensions.height / previousDimensions.height)
	    };
	
	    this._image.set('left', this._image.get('left') + (previousCentroid.left - postCentroid.left));
	    this._image.set('top', this._image.get('top') + (previousCentroid.top - postCentroid.top));
	    this._image.setCoords();
	
	    this._checkImageBounds();
	    this._canvas.renderAll();
	  },
	
	  _checkImageBounds: function _checkImageBounds() {
	    var leftDelta = this._image.get('left');
	    var topDelta = this._image.get('top');
	
	    var widthBelowScale = this._image.getWidth() < this._cropArea.getWidth();
	    var heightBelowScale = this._image.getHeight() < this._cropArea.getHeight();
	
	    var maxLeftDelta = this._cropArea.get('left');
	    var maxTopDelta = this._cropArea.get('top');
	    var minLeftDelta = -this._image.getWidth() + (this._cropArea.get('left') + this._cropArea.getWidth());
	    var minTopDelta = -this._image.getHeight() + (this._cropArea.get('top') + this._cropArea.getHeight());
	
	    if (widthBelowScale) {
	      if (leftDelta < maxLeftDelta) {
	        this._image.set('left', maxLeftDelta);
	      }
	      if (widthBelowScale && leftDelta > minLeftDelta) {
	        this._image.set('left', minLeftDelta);
	      }
	    } else {
	      if (leftDelta > maxLeftDelta) {
	        this._image.set('left', maxLeftDelta);
	      }
	      if (leftDelta < minLeftDelta) {
	        this._image.set('left', minLeftDelta);
	      }
	    }
	
	    if (heightBelowScale) {
	      if (topDelta < maxTopDelta) {
	        this._image.set('top', maxTopDelta);
	      }
	
	      if (topDelta > minTopDelta) {
	        this._image.set('top', minTopDelta);
	      }
	    } else {
	      if (topDelta > maxTopDelta) {
	        this._image.set('top', maxTopDelta);
	      }
	
	      if (topDelta < minTopDelta) {
	        this._image.set('top', minTopDelta);
	      }
	    }
	  },
	
	  _checkCanvasBounds: function _checkCanvasBounds() {
	    var leftBound = this._cropArea.get('left');
	    var topBound = this._cropArea.get('top');
	    var rightBound = leftBound + this._cropArea.getWidth();
	    var bottomBound = topBound + this._cropArea.getHeight();
	
	    if (leftBound < 0 || rightBound > this._model.canvasWidth) {
	      this._cropArea.setScaleX(this._cropArea.lastScaleX || 1);
	    }
	    if (topBound < 0 || bottomBound > this._model.canvasHeight) {
	      this._cropArea.setScaleY(this._cropArea.lastScaleY || 1);
	    }
	
	    if (leftBound < 0) {
	      this._cropArea.set('left', 0);
	    }
	    if (topBound < 0) {
	      this._cropArea.set('top', 0);
	    }
	
	    this._cropArea.lastScaleX = this._cropArea.getScaleX();
	    this._cropArea.lastScaleY = this._cropArea.getScaleY();
	  },
	
	  _createStaticCropArea: function _createStaticCropArea() {
	    this._cropAreaViewport = new _fabric.fabric.Rect({
	      originX: 'left',
	      originY: 'top',
	      left: 1,
	      top: 1,
	      width: this._model.cropWidth,
	      height: this._model.cropHeight,
	      fill: 'transparent'
	    });
	
	    this._cropAreaBorder = new _fabric.fabric.Rect({
	      originX: 'left',
	      originY: 'top',
	      width: this._model.cropWidth + 2,
	      height: this._model.cropHeight + 2,
	      fill: 'transparent',
	      stroke: 'rgba(37, 38, 42, 1.0)'
	    });
	
	    this._cropArea = new _fabric.fabric.Group([this._cropAreaViewport, this._cropAreaBorder], {
	      originX: 'left',
	      originY: 'top',
	      selectable: false,
	      evented: false,
	      hasBorders: false,
	      hasControls: false
	    });
	
	    this._canvas.add(this._cropArea);
	    this._cropArea.center().setCoords();
	
	    this._createOverlay();
	  },
	
	  _createDynamicCropArea: function _createDynamicCropArea() {
	    var _this3 = this;
	
	    this._cropArea = new _fabric.fabric.Rect({
	      width: this._model.cropWidth + 2,
	      height: this._model.cropHeight + 2,
	      fill: 'transparent',
	      borderColor: 'transparent',
	      strokeDashArray: [5, 5],
	      stroke: '#25262a',
	      lockRotation: true,
	      hasRotatingPoint: false,
	      cornerColor: 'rgba(255, 255, 255, 1.0)',
	      cornerSize: 5,
	      lockMovementX: true,
	      lockMovementY: true
	    });
	
	    this._canvas.add(this._cropArea);
	    this._cropArea.center().setCoords();
	
	    this._createOverlay();
	
	    this._canvas.setActiveObject(this._cropArea);
	    this._cropArea.bringToFront();
	
	    this._cropArea.on('mousedown', function (_ref) {
	      var e = _ref.e;
	
	      if (!_this3._image) {
	        return;
	      }
	
	      _this3._startingTransform = {
	        x: _this3._image.get('left'),
	        y: _this3._image.get('top')
	      };
	
	      _this3._startingPointer = _this3._canvas.getPointer(e);
	    });
	
	    this._cropArea.on('mouseup', function () {
	      _this3._startingTransform = null;
	      _this3._startingPointer = null;
	    });
	
	    this._cropArea.on('moving', function (_ref2) {
	      var e = _ref2.e;
	
	      if (!_this3._image) {
	        return;
	      }
	
	      var currentPointer = _this3._canvas.getPointer(e);
	
	      _this3._image.set('left', _this3._startingTransform.x + (currentPointer.x - _this3._startingPointer.x));
	      _this3._image.set('top', _this3._startingTransform.y + (currentPointer.y - _this3._startingPointer.y));
	    });
	
	    this._cropArea.on('scaling', function () {
	      _this3._checkCanvasBounds();
	
	      _this3._removeOverlay();
	      _this3._createOverlay();
	
	      _this3._cropArea.bringToFront();
	      _this3._canvas.setActiveObject(_this3._cropArea);
	    });
	  },
	
	  _createOverlay: function _createOverlay() {
	    var topOffset = Math.ceil(this._cropArea.get('top'));
	    var leftOffset = Math.ceil(this._cropArea.get('left'));
	    var rightOffset = Math.max(0, this._model.canvasWidth - (leftOffset + this._cropArea.getWidth()));
	    var bottomOffset = Math.max(0, this._model.canvasHeight - (topOffset + this._cropArea.getHeight()));
	
	    var overlayRects = [{ left: 0, top: 0, height: topOffset, width: this._model.canvasWidth }, // Top Bar
	    { left: 0, top: topOffset, height: this._cropArea.getHeight(), width: leftOffset }, // Left Bar
	    { left: this._model.canvasWidth - rightOffset, top: topOffset, height: this._cropArea.getHeight(), width: rightOffset }, // Right Bar
	    { left: 0, top: this._model.canvasHeight - bottomOffset, height: bottomOffset, width: this._model.canvasWidth } // Bottom Bar
	    ].map(function (box) {
	      var data = (0, _nbdUtilExtend2['default'])(box, {
	        fill: 'rgba(37, 38, 42, 0.6)',
	        selectable: false,
	        evented: false
	      });
	
	      return new _fabric.fabric.Rect(data);
	    });
	
	    this._cropOverlay = new _fabric.fabric.Group(overlayRects, {
	      originX: 'left',
	      originY: 'top',
	      selectable: false,
	      evented: false
	    });
	
	    this._canvas.add(this._cropOverlay);
	  },
	
	  _removeOverlay: function _removeOverlay() {
	    if (this._cropOverlay) {
	      this._canvas.remove(this._cropOverlay);
	      this._cropOverlay = null;
	    }
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, process) {'use strict';var fabric=fabric || {version:'1.5.0'};if(true){exports.fabric = fabric;}if(typeof document !== 'undefined' && typeof window !== 'undefined'){fabric.document = document;fabric.window = window;window.fabric = fabric;}else {fabric.document = __webpack_require__(19).jsdom('<!DOCTYPE html><html><head></head><body></body></html>');if(fabric.document.createWindow){fabric.window = fabric.document.createWindow();}else {fabric.window = fabric.document.parentWindow;}}fabric.isTouchSupported = 'ontouchstart' in fabric.document.documentElement;fabric.isLikelyNode = typeof Buffer !== 'undefined' && typeof window === 'undefined';fabric.SHARED_ATTRIBUTES = ['display','transform','fill','fill-opacity','fill-rule','opacity','stroke','stroke-dasharray','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-opacity','stroke-width'];fabric.DPI = 96;fabric.reNum = '(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)';(function(){function _removeEventListener(eventName,handler){if(!this.__eventListeners[eventName]){return;}if(handler){fabric.util.removeFromArray(this.__eventListeners[eventName],handler);}else {this.__eventListeners[eventName].length = 0;}}function observe(eventName,handler){if(!this.__eventListeners){this.__eventListeners = {};}if(arguments.length === 1){for(var prop in eventName) {this.on(prop,eventName[prop]);}}else {if(!this.__eventListeners[eventName]){this.__eventListeners[eventName] = [];}this.__eventListeners[eventName].push(handler);}return this;}function stopObserving(eventName,handler){if(!this.__eventListeners){return;}if(arguments.length === 0){this.__eventListeners = {};}else if(arguments.length === 1 && typeof arguments[0] === 'object'){for(var prop in eventName) {_removeEventListener.call(this,prop,eventName[prop]);}}else {_removeEventListener.call(this,eventName,handler);}return this;}function fire(eventName,options){if(!this.__eventListeners){return;}var listenersForEvent=this.__eventListeners[eventName];if(!listenersForEvent){return;}for(var i=0,len=listenersForEvent.length;i < len;i++) {listenersForEvent[i].call(this,options || {});}return this;}fabric.Observable = {observe:observe,stopObserving:stopObserving,fire:fire,on:observe,off:stopObserving,trigger:fire};})();fabric.Collection = {add:function add(){this._objects.push.apply(this._objects,arguments);for(var i=0,length=arguments.length;i < length;i++) {this._onObjectAdded(arguments[i]);}this.renderOnAddRemove && this.renderAll();return this;},insertAt:function insertAt(object,index,nonSplicing){var objects=this.getObjects();if(nonSplicing){objects[index] = object;}else {objects.splice(index,0,object);}this._onObjectAdded(object);this.renderOnAddRemove && this.renderAll();return this;},remove:function remove(){var objects=this.getObjects(),index;for(var i=0,length=arguments.length;i < length;i++) {index = objects.indexOf(arguments[i]);if(index !== -1){objects.splice(index,1);this._onObjectRemoved(arguments[i]);}}this.renderOnAddRemove && this.renderAll();return this;},forEachObject:function forEachObject(callback,context){var objects=this.getObjects(),i=objects.length;while(i--) {callback.call(context,objects[i],i,objects);}return this;},getObjects:function getObjects(type){if(typeof type === 'undefined'){return this._objects;}return this._objects.filter(function(o){return o.type === type;});},item:function item(index){return this.getObjects()[index];},isEmpty:function isEmpty(){return this.getObjects().length === 0;},size:function size(){return this.getObjects().length;},contains:function contains(object){return this.getObjects().indexOf(object) > -1;},complexity:function complexity(){return this.getObjects().reduce(function(memo,current){memo += current.complexity?current.complexity():0;return memo;},0);}};(function(global){var sqrt=Math.sqrt,atan2=Math.atan2,PiBy180=Math.PI / 180;fabric.util = {removeFromArray:function removeFromArray(array,value){var idx=array.indexOf(value);if(idx !== -1){array.splice(idx,1);}return array;},getRandomInt:function getRandomInt(min,max){return Math.floor(Math.random() * (max - min + 1)) + min;},degreesToRadians:function degreesToRadians(degrees){return degrees * PiBy180;},radiansToDegrees:function radiansToDegrees(radians){return radians / PiBy180;},rotatePoint:function rotatePoint(point,origin,radians){var sin=Math.sin(radians),cos=Math.cos(radians);point.subtractEquals(origin);var rx=point.x * cos - point.y * sin,ry=point.x * sin + point.y * cos;return new fabric.Point(rx,ry).addEquals(origin);},transformPoint:function transformPoint(p,t,ignoreOffset){if(ignoreOffset){return new fabric.Point(t[0] * p.x + t[2] * p.y,t[1] * p.x + t[3] * p.y);}return new fabric.Point(t[0] * p.x + t[2] * p.y + t[4],t[1] * p.x + t[3] * p.y + t[5]);},invertTransform:function invertTransform(t){var r=t.slice(),a=1 / (t[0] * t[3] - t[1] * t[2]);r = [a * t[3],-a * t[1],-a * t[2],a * t[0],0,0];var o=fabric.util.transformPoint({x:t[4],y:t[5]},r);r[4] = -o.x;r[5] = -o.y;return r;},toFixed:function toFixed(number,fractionDigits){return parseFloat(Number(number).toFixed(fractionDigits));},parseUnit:function parseUnit(value,fontSize){var unit=/\D{0,2}$/.exec(value),number=parseFloat(value);if(!fontSize){fontSize = fabric.Text.DEFAULT_SVG_FONT_SIZE;}switch(unit[0]){case 'mm':return number * fabric.DPI / 25.4;case 'cm':return number * fabric.DPI / 2.54;case 'in':return number * fabric.DPI;case 'pt':return number * fabric.DPI / 72;case 'pc':return number * fabric.DPI / 72 * 12;case 'em':return number * fontSize;default:return number;}},falseFunction:function falseFunction(){return false;},getKlass:function getKlass(type,namespace){type = fabric.util.string.camelize(type.charAt(0).toUpperCase() + type.slice(1));return fabric.util.resolveNamespace(namespace)[type];},resolveNamespace:function resolveNamespace(namespace){if(!namespace){return fabric;}var parts=namespace.split('.'),len=parts.length,obj=global || fabric.window;for(var i=0;i < len;++i) {obj = obj[parts[i]];}return obj;},loadImage:function loadImage(url,callback,context,crossOrigin){if(!url){callback && callback.call(context,url);return;}var img=fabric.util.createImage();img.onload = function(){callback && callback.call(context,img);img = img.onload = img.onerror = null;};img.onerror = function(){fabric.log('Error loading ' + img.src);callback && callback.call(context,null,true);img = img.onload = img.onerror = null;};if(url.indexOf('data') !== 0 && typeof crossOrigin !== 'undefined'){img.crossOrigin = crossOrigin;}img.src = url;},enlivenObjects:function enlivenObjects(objects,callback,namespace,reviver){objects = objects || [];function onLoaded(){if(++numLoadedObjects === numTotalObjects){callback && callback(enlivenedObjects);}}var enlivenedObjects=[],numLoadedObjects=0,numTotalObjects=objects.length;if(!numTotalObjects){callback && callback(enlivenedObjects);return;}objects.forEach(function(o,index){if(!o || !o.type){onLoaded();return;}var klass=fabric.util.getKlass(o.type,namespace);if(klass.async){klass.fromObject(o,function(obj,error){if(!error){enlivenedObjects[index] = obj;reviver && reviver(o,enlivenedObjects[index]);}onLoaded();});}else {enlivenedObjects[index] = klass.fromObject(o);reviver && reviver(o,enlivenedObjects[index]);onLoaded();}});},groupSVGElements:function groupSVGElements(elements,options,path){var object;object = new fabric.PathGroup(elements,options);if(typeof path !== 'undefined'){object.setSourcePath(path);}return object;},populateWithProperties:function populateWithProperties(source,destination,properties){if(properties && Object.prototype.toString.call(properties) === '[object Array]'){for(var i=0,len=properties.length;i < len;i++) {if(properties[i] in source){destination[properties[i]] = source[properties[i]];}}}},drawDashedLine:function drawDashedLine(ctx,x,y,x2,y2,da){var dx=x2 - x,dy=y2 - y,len=sqrt(dx * dx + dy * dy),rot=atan2(dy,dx),dc=da.length,di=0,draw=true;ctx.save();ctx.translate(x,y);ctx.moveTo(0,0);ctx.rotate(rot);x = 0;while(len > x) {x += da[di++ % dc];if(x > len){x = len;}ctx[draw?'lineTo':'moveTo'](x,0);draw = !draw;}ctx.restore();},createCanvasElement:function createCanvasElement(canvasEl){canvasEl || (canvasEl = fabric.document.createElement('canvas'));if(!canvasEl.getContext && typeof G_vmlCanvasManager !== 'undefined'){G_vmlCanvasManager.initElement(canvasEl);}return canvasEl;},createImage:function createImage(){return fabric.isLikelyNode?new (__webpack_require__(18).Image)():fabric.document.createElement('img');},createAccessors:function createAccessors(klass){var proto=klass.prototype;for(var i=proto.stateProperties.length;i--;) {var propName=proto.stateProperties[i],capitalizedPropName=propName.charAt(0).toUpperCase() + propName.slice(1),setterName='set' + capitalizedPropName,getterName='get' + capitalizedPropName;if(!proto[getterName]){proto[getterName] = (function(property){return new Function('return this.get("' + property + '")');})(propName);}if(!proto[setterName]){proto[setterName] = (function(property){return new Function('value','return this.set("' + property + '", value)');})(propName);}}},clipContext:function clipContext(receiver,ctx){ctx.save();ctx.beginPath();receiver.clipTo(ctx);ctx.clip();},multiplyTransformMatrices:function multiplyTransformMatrices(a,b){return [a[0] * b[0] + a[2] * b[1],a[1] * b[0] + a[3] * b[1],a[0] * b[2] + a[2] * b[3],a[1] * b[2] + a[3] * b[3],a[0] * b[4] + a[2] * b[5] + a[4],a[1] * b[4] + a[3] * b[5] + a[5]];},getFunctionBody:function getFunctionBody(fn){return (String(fn).match(/function[^{]*\{([\s\S]*)\}/) || {})[1];},isTransparent:function isTransparent(ctx,x,y,tolerance){if(tolerance > 0){if(x > tolerance){x -= tolerance;}else {x = 0;}if(y > tolerance){y -= tolerance;}else {y = 0;}}var _isTransparent=true,imageData=ctx.getImageData(x,y,tolerance * 2 || 1,tolerance * 2 || 1);for(var i=3,l=imageData.data.length;i < l;i += 4) {var temp=imageData.data[i];_isTransparent = temp <= 0;if(_isTransparent === false){break;}}imageData = null;return _isTransparent;}};})(true?exports:undefined);(function(){var arcToSegmentsCache={},segmentToBezierCache={},boundsOfCurveCache={},_join=Array.prototype.join;function arcToSegments(toX,toY,rx,ry,large,sweep,rotateX){var argsString=_join.call(arguments);if(arcToSegmentsCache[argsString]){return arcToSegmentsCache[argsString];}var PI=Math.PI,th=rotateX * PI / 180,sinTh=Math.sin(th),cosTh=Math.cos(th),fromX=0,fromY=0;rx = Math.abs(rx);ry = Math.abs(ry);var px=-cosTh * toX * 0.5 - sinTh * toY * 0.5,py=-cosTh * toY * 0.5 + sinTh * toX * 0.5,rx2=rx * rx,ry2=ry * ry,py2=py * py,px2=px * px,pl=rx2 * ry2 - rx2 * py2 - ry2 * px2,root=0;if(pl < 0){var s=Math.sqrt(1 - pl / (rx2 * ry2));rx *= s;ry *= s;}else {root = (large === sweep?-1.0:1.0) * Math.sqrt(pl / (rx2 * py2 + ry2 * px2));}var cx=root * rx * py / ry,cy=-root * ry * px / rx,cx1=cosTh * cx - sinTh * cy + toX * 0.5,cy1=sinTh * cx + cosTh * cy + toY * 0.5,mTheta=calcVectorAngle(1,0,(px - cx) / rx,(py - cy) / ry),dtheta=calcVectorAngle((px - cx) / rx,(py - cy) / ry,(-px - cx) / rx,(-py - cy) / ry);if(sweep === 0 && dtheta > 0){dtheta -= 2 * PI;}else if(sweep === 1 && dtheta < 0){dtheta += 2 * PI;}var segments=Math.ceil(Math.abs(dtheta / PI * 2)),result=[],mDelta=dtheta / segments,mT=8 / 3 * Math.sin(mDelta / 4) * Math.sin(mDelta / 4) / Math.sin(mDelta / 2),th3=mTheta + mDelta;for(var i=0;i < segments;i++) {result[i] = segmentToBezier(mTheta,th3,cosTh,sinTh,rx,ry,cx1,cy1,mT,fromX,fromY);fromX = result[i][4];fromY = result[i][5];mTheta = th3;th3 += mDelta;}arcToSegmentsCache[argsString] = result;return result;}function segmentToBezier(th2,th3,cosTh,sinTh,rx,ry,cx1,cy1,mT,fromX,fromY){var argsString2=_join.call(arguments);if(segmentToBezierCache[argsString2]){return segmentToBezierCache[argsString2];}var costh2=Math.cos(th2),sinth2=Math.sin(th2),costh3=Math.cos(th3),sinth3=Math.sin(th3),toX=cosTh * rx * costh3 - sinTh * ry * sinth3 + cx1,toY=sinTh * rx * costh3 + cosTh * ry * sinth3 + cy1,cp1X=fromX + mT * (-cosTh * rx * sinth2 - sinTh * ry * costh2),cp1Y=fromY + mT * (-sinTh * rx * sinth2 + cosTh * ry * costh2),cp2X=toX + mT * (cosTh * rx * sinth3 + sinTh * ry * costh3),cp2Y=toY + mT * (sinTh * rx * sinth3 - cosTh * ry * costh3);segmentToBezierCache[argsString2] = [cp1X,cp1Y,cp2X,cp2Y,toX,toY];return segmentToBezierCache[argsString2];}function calcVectorAngle(ux,uy,vx,vy){var ta=Math.atan2(uy,ux),tb=Math.atan2(vy,vx);if(tb >= ta){return tb - ta;}else {return 2 * Math.PI - (ta - tb);}}fabric.util.drawArc = function(ctx,fx,fy,coords){var rx=coords[0],ry=coords[1],rot=coords[2],large=coords[3],sweep=coords[4],tx=coords[5],ty=coords[6],segs=[[],[],[],[]],segsNorm=arcToSegments(tx - fx,ty - fy,rx,ry,large,sweep,rot);for(var i=0,len=segsNorm.length;i < len;i++) {segs[i][0] = segsNorm[i][0] + fx;segs[i][1] = segsNorm[i][1] + fy;segs[i][2] = segsNorm[i][2] + fx;segs[i][3] = segsNorm[i][3] + fy;segs[i][4] = segsNorm[i][4] + fx;segs[i][5] = segsNorm[i][5] + fy;ctx.bezierCurveTo.apply(ctx,segs[i]);}};fabric.util.getBoundsOfArc = function(fx,fy,rx,ry,rot,large,sweep,tx,ty){var fromX=0,fromY=0,bound=[],bounds=[],segs=arcToSegments(tx - fx,ty - fy,rx,ry,large,sweep,rot),boundCopy=[[],[]];for(var i=0,len=segs.length;i < len;i++) {bound = getBoundsOfCurve(fromX,fromY,segs[i][0],segs[i][1],segs[i][2],segs[i][3],segs[i][4],segs[i][5]);boundCopy[0].x = bound[0].x + fx;boundCopy[0].y = bound[0].y + fy;boundCopy[1].x = bound[1].x + fx;boundCopy[1].y = bound[1].y + fy;bounds.push(boundCopy[0]);bounds.push(boundCopy[1]);fromX = segs[i][4];fromY = segs[i][5];}return bounds;};function getBoundsOfCurve(x0,y0,x1,y1,x2,y2,x3,y3){var argsString=_join.call(arguments);if(boundsOfCurveCache[argsString]){return boundsOfCurveCache[argsString];}var sqrt=Math.sqrt,min=Math.min,max=Math.max,abs=Math.abs,tvalues=[],bounds=[[],[]],a,b,c,t,t1,t2,b2ac,sqrtb2ac;b = 6 * x0 - 12 * x1 + 6 * x2;a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;c = 3 * x1 - 3 * x0;for(var i=0;i < 2;++i) {if(i > 0){b = 6 * y0 - 12 * y1 + 6 * y2;a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;c = 3 * y1 - 3 * y0;}if(abs(a) < 1e-12){if(abs(b) < 1e-12){continue;}t = -c / b;if(0 < t && t < 1){tvalues.push(t);}continue;}b2ac = b * b - 4 * c * a;if(b2ac < 0){continue;}sqrtb2ac = sqrt(b2ac);t1 = (-b + sqrtb2ac) / (2 * a);if(0 < t1 && t1 < 1){tvalues.push(t1);}t2 = (-b - sqrtb2ac) / (2 * a);if(0 < t2 && t2 < 1){tvalues.push(t2);}}var x,y,j=tvalues.length,jlen=j,mt;while(j--) {t = tvalues[j];mt = 1 - t;x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;bounds[0][j] = x;y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;bounds[1][j] = y;}bounds[0][jlen] = x0;bounds[1][jlen] = y0;bounds[0][jlen + 1] = x3;bounds[1][jlen + 1] = y3;var result=[{x:min.apply(null,bounds[0]),y:min.apply(null,bounds[1])},{x:max.apply(null,bounds[0]),y:max.apply(null,bounds[1])}];boundsOfCurveCache[argsString] = result;return result;}fabric.util.getBoundsOfCurve = getBoundsOfCurve;})();(function(){var slice=Array.prototype.slice;if(!Array.prototype.indexOf){Array.prototype.indexOf = function(searchElement){if(this === void 0 || this === null){throw new TypeError();}var t=Object(this),len=t.length >>> 0;if(len === 0){return -1;}var n=0;if(arguments.length > 0){n = Number(arguments[1]);if(n !== n){n = 0;}else if(n !== 0 && n !== Number.POSITIVE_INFINITY && n !== Number.NEGATIVE_INFINITY){n = (n > 0 || -1) * Math.floor(Math.abs(n));}}if(n >= len){return -1;}var k=n >= 0?n:Math.max(len - Math.abs(n),0);for(;k < len;k++) {if(k in t && t[k] === searchElement){return k;}}return -1;};}if(!Array.prototype.forEach){Array.prototype.forEach = function(fn,context){for(var i=0,len=this.length >>> 0;i < len;i++) {if(i in this){fn.call(context,this[i],i,this);}}};}if(!Array.prototype.map){Array.prototype.map = function(fn,context){var result=[];for(var i=0,len=this.length >>> 0;i < len;i++) {if(i in this){result[i] = fn.call(context,this[i],i,this);}}return result;};}if(!Array.prototype.every){Array.prototype.every = function(fn,context){for(var i=0,len=this.length >>> 0;i < len;i++) {if(i in this && !fn.call(context,this[i],i,this)){return false;}}return true;};}if(!Array.prototype.some){Array.prototype.some = function(fn,context){for(var i=0,len=this.length >>> 0;i < len;i++) {if(i in this && fn.call(context,this[i],i,this)){return true;}}return false;};}if(!Array.prototype.filter){Array.prototype.filter = function(fn,context){var result=[],val;for(var i=0,len=this.length >>> 0;i < len;i++) {if(i in this){val = this[i];if(fn.call(context,val,i,this)){result.push(val);}}}return result;};}if(!Array.prototype.reduce){Array.prototype.reduce = function(fn){var len=this.length >>> 0,i=0,rv;if(arguments.length > 1){rv = arguments[1];}else {do {if(i in this){rv = this[i++];break;}if(++i >= len){throw new TypeError();}}while(true);}for(;i < len;i++) {if(i in this){rv = fn.call(null,rv,this[i],i,this);}}return rv;};}function invoke(array,method){var args=slice.call(arguments,2),result=[];for(var i=0,len=array.length;i < len;i++) {result[i] = args.length?array[i][method].apply(array[i],args):array[i][method].call(array[i]);}return result;}function max(array,byProperty){return find(array,byProperty,function(value1,value2){return value1 >= value2;});}function min(array,byProperty){return find(array,byProperty,function(value1,value2){return value1 < value2;});}function find(array,byProperty,condition){if(!array || array.length === 0){return;}var i=array.length - 1,result=byProperty?array[i][byProperty]:array[i];if(byProperty){while(i--) {if(condition(array[i][byProperty],result)){result = array[i][byProperty];}}}else {while(i--) {if(condition(array[i],result)){result = array[i];}}}return result;}fabric.util.array = {invoke:invoke,min:min,max:max};})();(function(){function extend(destination,source){for(var property in source) {destination[property] = source[property];}return destination;}function clone(object){return extend({},object);}fabric.util.object = {extend:extend,clone:clone};})();(function(){if(!String.prototype.trim){String.prototype.trim = function(){return this.replace(/^[\s\xA0]+/,'').replace(/[\s\xA0]+$/,'');};}function camelize(string){return string.replace(/-+(.)?/g,function(match,character){return character?character.toUpperCase():'';});}function capitalize(string,firstLetterOnly){return string.charAt(0).toUpperCase() + (firstLetterOnly?string.slice(1):string.slice(1).toLowerCase());}function escapeXml(string){return string.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}fabric.util.string = {camelize:camelize,capitalize:capitalize,escapeXml:escapeXml};})();(function(){var slice=Array.prototype.slice,apply=Function.prototype.apply,Dummy=function Dummy(){};if(!Function.prototype.bind){Function.prototype.bind = function(thisArg){var _this=this,args=slice.call(arguments,1),bound;if(args.length){bound = function(){return apply.call(_this,this instanceof Dummy?this:thisArg,args.concat(slice.call(arguments)));};}else {bound = function(){return apply.call(_this,this instanceof Dummy?this:thisArg,arguments);};}Dummy.prototype = this.prototype;bound.prototype = new Dummy();return bound;};}})();(function(){var slice=Array.prototype.slice,emptyFunction=function emptyFunction(){},IS_DONTENUM_BUGGY=(function(){for(var p in {toString:1}) {if(p === 'toString'){return false;}}return true;})(),addMethods=function addMethods(klass,source,parent){for(var property in source) {if(property in klass.prototype && typeof klass.prototype[property] === 'function' && (source[property] + '').indexOf('callSuper') > -1){klass.prototype[property] = (function(property){return function(){var superclass=this.constructor.superclass;this.constructor.superclass = parent;var returnValue=source[property].apply(this,arguments);this.constructor.superclass = superclass;if(property !== 'initialize'){return returnValue;}};})(property);}else {klass.prototype[property] = source[property];}if(IS_DONTENUM_BUGGY){if(source.toString !== Object.prototype.toString){klass.prototype.toString = source.toString;}if(source.valueOf !== Object.prototype.valueOf){klass.prototype.valueOf = source.valueOf;}}}};function Subclass(){}function callSuper(methodName){var fn=this.constructor.superclass.prototype[methodName];return arguments.length > 1?fn.apply(this,slice.call(arguments,1)):fn.call(this);}function createClass(){var parent=null,properties=slice.call(arguments,0);if(typeof properties[0] === 'function'){parent = properties.shift();}function klass(){this.initialize.apply(this,arguments);}klass.superclass = parent;klass.subclasses = [];if(parent){Subclass.prototype = parent.prototype;klass.prototype = new Subclass();parent.subclasses.push(klass);}for(var i=0,length=properties.length;i < length;i++) {addMethods(klass,properties[i],parent);}if(!klass.prototype.initialize){klass.prototype.initialize = emptyFunction;}klass.prototype.constructor = klass;klass.prototype.callSuper = callSuper;return klass;}fabric.util.createClass = createClass;})();(function(){var unknown='unknown';function areHostMethods(object){var methodNames=Array.prototype.slice.call(arguments,1),t,i,len=methodNames.length;for(i = 0;i < len;i++) {t = typeof object[methodNames[i]];if(!/^(?:function|object|unknown)$/.test(t)){return false;}}return true;}var getElement,setElement,getUniqueId=(function(){var uid=0;return function(element){return element.__uniqueID || (element.__uniqueID = 'uniqueID__' + uid++);};})();(function(){var elements={};getElement = function(uid){return elements[uid];};setElement = function(uid,element){elements[uid] = element;};})();function createListener(uid,handler){return {handler:handler,wrappedHandler:createWrappedHandler(uid,handler)};}function createWrappedHandler(uid,handler){return function(e){handler.call(getElement(uid),e || fabric.window.event);};}function createDispatcher(uid,eventName){return function(e){if(handlers[uid] && handlers[uid][eventName]){var handlersForEvent=handlers[uid][eventName];for(var i=0,len=handlersForEvent.length;i < len;i++) {handlersForEvent[i].call(this,e || fabric.window.event);}}};}var shouldUseAddListenerRemoveListener=areHostMethods(fabric.document.documentElement,'addEventListener','removeEventListener') && areHostMethods(fabric.window,'addEventListener','removeEventListener'),shouldUseAttachEventDetachEvent=areHostMethods(fabric.document.documentElement,'attachEvent','detachEvent') && areHostMethods(fabric.window,'attachEvent','detachEvent'),listeners={},handlers={},addListener,removeListener;if(shouldUseAddListenerRemoveListener){addListener = function(element,eventName,handler){element.addEventListener(eventName,handler,false);};removeListener = function(element,eventName,handler){element.removeEventListener(eventName,handler,false);};}else if(shouldUseAttachEventDetachEvent){addListener = function(element,eventName,handler){var uid=getUniqueId(element);setElement(uid,element);if(!listeners[uid]){listeners[uid] = {};}if(!listeners[uid][eventName]){listeners[uid][eventName] = [];}var listener=createListener(uid,handler);listeners[uid][eventName].push(listener);element.attachEvent('on' + eventName,listener.wrappedHandler);};removeListener = function(element,eventName,handler){var uid=getUniqueId(element),listener;if(listeners[uid] && listeners[uid][eventName]){for(var i=0,len=listeners[uid][eventName].length;i < len;i++) {listener = listeners[uid][eventName][i];if(listener && listener.handler === handler){element.detachEvent('on' + eventName,listener.wrappedHandler);listeners[uid][eventName][i] = null;}}}};}else {addListener = function(element,eventName,handler){var uid=getUniqueId(element);if(!handlers[uid]){handlers[uid] = {};}if(!handlers[uid][eventName]){handlers[uid][eventName] = [];var existingHandler=element['on' + eventName];if(existingHandler){handlers[uid][eventName].push(existingHandler);}element['on' + eventName] = createDispatcher(uid,eventName);}handlers[uid][eventName].push(handler);};removeListener = function(element,eventName,handler){var uid=getUniqueId(element);if(handlers[uid] && handlers[uid][eventName]){var handlersForEvent=handlers[uid][eventName];for(var i=0,len=handlersForEvent.length;i < len;i++) {if(handlersForEvent[i] === handler){handlersForEvent.splice(i,1);}}}};}fabric.util.addListener = addListener;fabric.util.removeListener = removeListener;function getPointer(event,upperCanvasEl){event || (event = fabric.window.event);var element=event.target || (typeof event.srcElement !== unknown?event.srcElement:null),scroll=fabric.util.getScrollLeftTop(element,upperCanvasEl);return {x:pointerX(event) + scroll.left,y:pointerY(event) + scroll.top};}var pointerX=function pointerX(event){return typeof event.clientX !== unknown?event.clientX:0;},pointerY=function pointerY(event){return typeof event.clientY !== unknown?event.clientY:0;};function _getPointer(event,pageProp,clientProp){var touchProp=event.type === 'touchend'?'changedTouches':'touches';return event[touchProp] && event[touchProp][0]?event[touchProp][0][pageProp] - (event[touchProp][0][pageProp] - event[touchProp][0][clientProp]) || event[clientProp]:event[clientProp];}if(fabric.isTouchSupported){pointerX = function(event){return _getPointer(event,'pageX','clientX');};pointerY = function(event){return _getPointer(event,'pageY','clientY');};}fabric.util.getPointer = getPointer;fabric.util.object.extend(fabric.util,fabric.Observable);})();(function(){function setStyle(element,styles){var elementStyle=element.style;if(!elementStyle){return element;}if(typeof styles === 'string'){element.style.cssText += ';' + styles;return styles.indexOf('opacity') > -1?setOpacity(element,styles.match(/opacity:\s*(\d?\.?\d*)/)[1]):element;}for(var property in styles) {if(property === 'opacity'){setOpacity(element,styles[property]);}else {var normalizedProperty=property === 'float' || property === 'cssFloat'?typeof elementStyle.styleFloat === 'undefined'?'cssFloat':'styleFloat':property;elementStyle[normalizedProperty] = styles[property];}}return element;}var parseEl=fabric.document.createElement('div'),supportsOpacity=typeof parseEl.style.opacity === 'string',supportsFilters=typeof parseEl.style.filter === 'string',reOpacity=/alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,setOpacity=function setOpacity(element){return element;};if(supportsOpacity){setOpacity = function(element,value){element.style.opacity = value;return element;};}else if(supportsFilters){setOpacity = function(element,value){var es=element.style;if(element.currentStyle && !element.currentStyle.hasLayout){es.zoom = 1;}if(reOpacity.test(es.filter)){value = value >= 0.9999?'':'alpha(opacity=' + value * 100 + ')';es.filter = es.filter.replace(reOpacity,value);}else {es.filter += ' alpha(opacity=' + value * 100 + ')';}return element;};}fabric.util.setStyle = setStyle;})();(function(){var _slice=Array.prototype.slice;function getById(id){return typeof id === 'string'?fabric.document.getElementById(id):id;}var sliceCanConvertNodelists,toArray=function toArray(arrayLike){return _slice.call(arrayLike,0);};try{sliceCanConvertNodelists = toArray(fabric.document.childNodes) instanceof Array;}catch(err) {}if(!sliceCanConvertNodelists){toArray = function(arrayLike){var arr=new Array(arrayLike.length),i=arrayLike.length;while(i--) {arr[i] = arrayLike[i];}return arr;};}function makeElement(tagName,attributes){var el=fabric.document.createElement(tagName);for(var prop in attributes) {if(prop === 'class'){el.className = attributes[prop];}else if(prop === 'for'){el.htmlFor = attributes[prop];}else {el.setAttribute(prop,attributes[prop]);}}return el;}function addClass(element,className){if(element && (' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1){element.className += (element.className?' ':'') + className;}}function wrapElement(element,wrapper,attributes){if(typeof wrapper === 'string'){wrapper = makeElement(wrapper,attributes);}if(element.parentNode){element.parentNode.replaceChild(wrapper,element);}wrapper.appendChild(element);return wrapper;}function getScrollLeftTop(element,upperCanvasEl){var firstFixedAncestor,origElement,left=0,top=0,docElement=fabric.document.documentElement,body=fabric.document.body || {scrollLeft:0,scrollTop:0};origElement = element;while(element && element.parentNode && !firstFixedAncestor) {element = element.parentNode;if(element.nodeType === 1 && fabric.util.getElementStyle(element,'position') === 'fixed'){firstFixedAncestor = element;}if(element.nodeType === 1 && origElement !== upperCanvasEl && fabric.util.getElementStyle(element,'position') === 'absolute'){left = 0;top = 0;}else if(element === fabric.document){left = body.scrollLeft || docElement.scrollLeft || 0;top = body.scrollTop || docElement.scrollTop || 0;}else {left += element.scrollLeft || 0;top += element.scrollTop || 0;}}return {left:left,top:top};}function getElementOffset(element){var docElem,doc=element && element.ownerDocument,box={left:0,top:0},offset={left:0,top:0},scrollLeftTop,offsetAttributes={borderLeftWidth:'left',borderTopWidth:'top',paddingLeft:'left',paddingTop:'top'};if(!doc){return {left:0,top:0};}for(var attr in offsetAttributes) {offset[offsetAttributes[attr]] += parseInt(getElementStyle(element,attr),10) || 0;}docElem = doc.documentElement;if(typeof element.getBoundingClientRect !== 'undefined'){box = element.getBoundingClientRect();}scrollLeftTop = fabric.util.getScrollLeftTop(element,null);return {left:box.left + scrollLeftTop.left - (docElem.clientLeft || 0) + offset.left,top:box.top + scrollLeftTop.top - (docElem.clientTop || 0) + offset.top};}var getElementStyle;if(fabric.document.defaultView && fabric.document.defaultView.getComputedStyle){getElementStyle = function(element,attr){var style=fabric.document.defaultView.getComputedStyle(element,null);return style?style[attr]:undefined;};}else {getElementStyle = function(element,attr){var value=element.style[attr];if(!value && element.currentStyle){value = element.currentStyle[attr];}return value;};}(function(){var style=fabric.document.documentElement.style,selectProp='userSelect' in style?'userSelect':'MozUserSelect' in style?'MozUserSelect':'WebkitUserSelect' in style?'WebkitUserSelect':'KhtmlUserSelect' in style?'KhtmlUserSelect':'';function makeElementUnselectable(element){if(typeof element.onselectstart !== 'undefined'){element.onselectstart = fabric.util.falseFunction;}if(selectProp){element.style[selectProp] = 'none';}else if(typeof element.unselectable === 'string'){element.unselectable = 'on';}return element;}function makeElementSelectable(element){if(typeof element.onselectstart !== 'undefined'){element.onselectstart = null;}if(selectProp){element.style[selectProp] = '';}else if(typeof element.unselectable === 'string'){element.unselectable = '';}return element;}fabric.util.makeElementUnselectable = makeElementUnselectable;fabric.util.makeElementSelectable = makeElementSelectable;})();(function(){function getScript(url,callback){var headEl=fabric.document.getElementsByTagName('head')[0],scriptEl=fabric.document.createElement('script'),loading=true;scriptEl.onload = scriptEl.onreadystatechange = function(e){if(loading){if(typeof this.readyState === 'string' && this.readyState !== 'loaded' && this.readyState !== 'complete'){return;}loading = false;callback(e || fabric.window.event);scriptEl = scriptEl.onload = scriptEl.onreadystatechange = null;}};scriptEl.src = url;headEl.appendChild(scriptEl);}fabric.util.getScript = getScript;})();fabric.util.getById = getById;fabric.util.toArray = toArray;fabric.util.makeElement = makeElement;fabric.util.addClass = addClass;fabric.util.wrapElement = wrapElement;fabric.util.getScrollLeftTop = getScrollLeftTop;fabric.util.getElementOffset = getElementOffset;fabric.util.getElementStyle = getElementStyle;})();(function(){function addParamToUrl(url,param){return url + (/\?/.test(url)?'&':'?') + param;}var makeXHR=(function(){var factories=[function(){return new ActiveXObject('Microsoft.XMLHTTP');},function(){return new ActiveXObject('Msxml2.XMLHTTP');},function(){return new ActiveXObject('Msxml2.XMLHTTP.3.0');},function(){return new XMLHttpRequest();}];for(var i=factories.length;i--;) {try{var req=factories[i]();if(req){return factories[i];}}catch(err) {}}})();function emptyFn(){}function request(url,options){options || (options = {});var method=options.method?options.method.toUpperCase():'GET',onComplete=options.onComplete || function(){},xhr=makeXHR(),body;xhr.onreadystatechange = function(){if(xhr.readyState === 4){onComplete(xhr);xhr.onreadystatechange = emptyFn;}};if(method === 'GET'){body = null;if(typeof options.parameters === 'string'){url = addParamToUrl(url,options.parameters);}}xhr.open(method,url,true);if(method === 'POST' || method === 'PUT'){xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}xhr.send(body);return xhr;}fabric.util.request = request;})();fabric.log = function(){};fabric.warn = function(){};if(typeof console !== 'undefined'){['log','warn'].forEach(function(methodName){if(typeof console[methodName] !== 'undefined' && typeof console[methodName].apply === 'function'){fabric[methodName] = function(){return console[methodName].apply(console,arguments);};}});}(function(){function animate(options){requestAnimFrame(function(timestamp){options || (options = {});var start=timestamp || +new Date(),duration=options.duration || 500,finish=start + duration,time,onChange=options.onChange || function(){},abort=options.abort || function(){return false;},easing=options.easing || function(t,b,c,d){return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;},startValue='startValue' in options?options.startValue:0,endValue='endValue' in options?options.endValue:100,byValue=options.byValue || endValue - startValue;options.onStart && options.onStart();(function tick(ticktime){time = ticktime || +new Date();var currentTime=time > finish?duration:time - start;if(abort()){options.onComplete && options.onComplete();return;}onChange(easing(currentTime,startValue,byValue,duration));if(time > finish){options.onComplete && options.onComplete();return;}requestAnimFrame(tick);})(start);});}var _requestAnimFrame=fabric.window.requestAnimationFrame || fabric.window.webkitRequestAnimationFrame || fabric.window.mozRequestAnimationFrame || fabric.window.oRequestAnimationFrame || fabric.window.msRequestAnimationFrame || function(callback){fabric.window.setTimeout(callback,1000 / 60);};function requestAnimFrame(){return _requestAnimFrame.apply(fabric.window,arguments);}fabric.util.animate = animate;fabric.util.requestAnimFrame = requestAnimFrame;})();(function(){function normalize(a,c,p,s){if(a < Math.abs(c)){a = c;s = p / 4;}else {s = p / (2 * Math.PI) * Math.asin(c / a);}return {a:a,c:c,p:p,s:s};}function elastic(opts,t,d){return opts.a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p);}function easeOutCubic(t,b,c,d){return c * ((t = t / d - 1) * t * t + 1) + b;}function easeInOutCubic(t,b,c,d){t /= d / 2;if(t < 1){return c / 2 * t * t * t + b;}return c / 2 * ((t -= 2) * t * t + 2) + b;}function easeInQuart(t,b,c,d){return c * (t /= d) * t * t * t + b;}function easeOutQuart(t,b,c,d){return -c * ((t = t / d - 1) * t * t * t - 1) + b;}function easeInOutQuart(t,b,c,d){t /= d / 2;if(t < 1){return c / 2 * t * t * t * t + b;}return -c / 2 * ((t -= 2) * t * t * t - 2) + b;}function easeInQuint(t,b,c,d){return c * (t /= d) * t * t * t * t + b;}function easeOutQuint(t,b,c,d){return c * ((t = t / d - 1) * t * t * t * t + 1) + b;}function easeInOutQuint(t,b,c,d){t /= d / 2;if(t < 1){return c / 2 * t * t * t * t * t + b;}return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;}function easeInSine(t,b,c,d){return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;}function easeOutSine(t,b,c,d){return c * Math.sin(t / d * (Math.PI / 2)) + b;}function easeInOutSine(t,b,c,d){return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;}function easeInExpo(t,b,c,d){return t === 0?b:c * Math.pow(2,10 * (t / d - 1)) + b;}function easeOutExpo(t,b,c,d){return t === d?b + c:c * (-Math.pow(2,-10 * t / d) + 1) + b;}function easeInOutExpo(t,b,c,d){if(t === 0){return b;}if(t === d){return b + c;}t /= d / 2;if(t < 1){return c / 2 * Math.pow(2,10 * (t - 1)) + b;}return c / 2 * (-Math.pow(2,-10 * --t) + 2) + b;}function easeInCirc(t,b,c,d){return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;}function easeOutCirc(t,b,c,d){return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;}function easeInOutCirc(t,b,c,d){t /= d / 2;if(t < 1){return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;}return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;}function easeInElastic(t,b,c,d){var s=1.70158,p=0,a=c;if(t === 0){return b;}t /= d;if(t === 1){return b + c;}if(!p){p = d * 0.3;}var opts=normalize(a,c,p,s);return -elastic(opts,t,d) + b;}function easeOutElastic(t,b,c,d){var s=1.70158,p=0,a=c;if(t === 0){return b;}t /= d;if(t === 1){return b + c;}if(!p){p = d * 0.3;}var opts=normalize(a,c,p,s);return opts.a * Math.pow(2,-10 * t) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p) + opts.c + b;}function easeInOutElastic(t,b,c,d){var s=1.70158,p=0,a=c;if(t === 0){return b;}t /= d / 2;if(t === 2){return b + c;}if(!p){p = d * (0.3 * 1.5);}var opts=normalize(a,c,p,s);if(t < 1){return -0.5 * elastic(opts,t,d) + b;}return opts.a * Math.pow(2,-10 * (t -= 1)) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p) * 0.5 + opts.c + b;}function easeInBack(t,b,c,d,s){if(s === undefined){s = 1.70158;}return c * (t /= d) * t * ((s + 1) * t - s) + b;}function easeOutBack(t,b,c,d,s){if(s === undefined){s = 1.70158;}return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;}function easeInOutBack(t,b,c,d,s){if(s === undefined){s = 1.70158;}t /= d / 2;if(t < 1){return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;}return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;}function easeInBounce(t,b,c,d){return c - easeOutBounce(d - t,0,c,d) + b;}function easeOutBounce(t,b,c,d){if((t /= d) < 1 / 2.75){return c * (7.5625 * t * t) + b;}else if(t < 2 / 2.75){return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;}else if(t < 2.5 / 2.75){return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;}else {return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;}}function easeInOutBounce(t,b,c,d){if(t < d / 2){return easeInBounce(t * 2,0,c,d) * 0.5 + b;}return easeOutBounce(t * 2 - d,0,c,d) * 0.5 + c * 0.5 + b;}fabric.util.ease = {easeInQuad:function easeInQuad(t,b,c,d){return c * (t /= d) * t + b;},easeOutQuad:function easeOutQuad(t,b,c,d){return -c * (t /= d) * (t - 2) + b;},easeInOutQuad:function easeInOutQuad(t,b,c,d){t /= d / 2;if(t < 1){return c / 2 * t * t + b;}return -c / 2 * (--t * (t - 2) - 1) + b;},easeInCubic:function easeInCubic(t,b,c,d){return c * (t /= d) * t * t + b;},easeOutCubic:easeOutCubic,easeInOutCubic:easeInOutCubic,easeInQuart:easeInQuart,easeOutQuart:easeOutQuart,easeInOutQuart:easeInOutQuart,easeInQuint:easeInQuint,easeOutQuint:easeOutQuint,easeInOutQuint:easeInOutQuint,easeInSine:easeInSine,easeOutSine:easeOutSine,easeInOutSine:easeInOutSine,easeInExpo:easeInExpo,easeOutExpo:easeOutExpo,easeInOutExpo:easeInOutExpo,easeInCirc:easeInCirc,easeOutCirc:easeOutCirc,easeInOutCirc:easeInOutCirc,easeInElastic:easeInElastic,easeOutElastic:easeOutElastic,easeInOutElastic:easeInOutElastic,easeInBack:easeInBack,easeOutBack:easeOutBack,easeInOutBack:easeInOutBack,easeInBounce:easeInBounce,easeOutBounce:easeOutBounce,easeInOutBounce:easeInOutBounce};})();(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend,capitalize=fabric.util.string.capitalize,clone=fabric.util.object.clone,toFixed=fabric.util.toFixed,parseUnit=fabric.util.parseUnit,multiplyTransformMatrices=fabric.util.multiplyTransformMatrices,attributesMap={cx:'left',x:'left',r:'radius',cy:'top',y:'top',display:'visible',visibility:'visible',transform:'transformMatrix','fill-opacity':'fillOpacity','fill-rule':'fillRule','font-family':'fontFamily','font-size':'fontSize','font-style':'fontStyle','font-weight':'fontWeight','stroke-dasharray':'strokeDashArray','stroke-linecap':'strokeLineCap','stroke-linejoin':'strokeLineJoin','stroke-miterlimit':'strokeMiterLimit','stroke-opacity':'strokeOpacity','stroke-width':'strokeWidth','text-decoration':'textDecoration','text-anchor':'originX'},colorAttributes={stroke:'strokeOpacity',fill:'fillOpacity'};fabric.cssRules = {};fabric.gradientDefs = {};function normalizeAttr(attr){if(attr in attributesMap){return attributesMap[attr];}return attr;}function normalizeValue(attr,value,parentAttributes,fontSize){var isArray=Object.prototype.toString.call(value) === '[object Array]',parsed;if((attr === 'fill' || attr === 'stroke') && value === 'none'){value = '';}else if(attr === 'strokeDashArray'){value = value.replace(/,/g,' ').split(/\s+/).map(function(n){return parseFloat(n);});}else if(attr === 'transformMatrix'){if(parentAttributes && parentAttributes.transformMatrix){value = multiplyTransformMatrices(parentAttributes.transformMatrix,fabric.parseTransformAttribute(value));}else {value = fabric.parseTransformAttribute(value);}}else if(attr === 'visible'){value = value === 'none' || value === 'hidden'?false:true;if(parentAttributes && parentAttributes.visible === false){value = false;}}else if(attr === 'originX'){value = value === 'start'?'left':value === 'end'?'right':'center';}else {parsed = isArray?value.map(parseUnit):parseUnit(value,fontSize);}return !isArray && isNaN(parsed)?value:parsed;}function _setStrokeFillOpacity(attributes){for(var attr in colorAttributes) {if(!attributes[attr] || typeof attributes[colorAttributes[attr]] === 'undefined'){continue;}if(attributes[attr].indexOf('url(') === 0){continue;}var color=new fabric.Color(attributes[attr]);attributes[attr] = color.setAlpha(toFixed(color.getAlpha() * attributes[colorAttributes[attr]],2)).toRgba();}return attributes;}fabric.parseTransformAttribute = (function(){function rotateMatrix(matrix,args){var angle=args[0];matrix[0] = Math.cos(angle);matrix[1] = Math.sin(angle);matrix[2] = -Math.sin(angle);matrix[3] = Math.cos(angle);}function scaleMatrix(matrix,args){var multiplierX=args[0],multiplierY=args.length === 2?args[1]:args[0];matrix[0] = multiplierX;matrix[3] = multiplierY;}function skewXMatrix(matrix,args){matrix[2] = Math.tan(fabric.util.degreesToRadians(args[0]));}function skewYMatrix(matrix,args){matrix[1] = Math.tan(fabric.util.degreesToRadians(args[0]));}function translateMatrix(matrix,args){matrix[4] = args[0];if(args.length === 2){matrix[5] = args[1];}}var iMatrix=[1,0,0,1,0,0],number=fabric.reNum,commaWsp='(?:\\s+,?\\s*|,\\s*)',skewX='(?:(skewX)\\s*\\(\\s*(' + number + ')\\s*\\))',skewY='(?:(skewY)\\s*\\(\\s*(' + number + ')\\s*\\))',rotate='(?:(rotate)\\s*\\(\\s*(' + number + ')(?:' + commaWsp + '(' + number + ')' + commaWsp + '(' + number + '))?\\s*\\))',scale='(?:(scale)\\s*\\(\\s*(' + number + ')(?:' + commaWsp + '(' + number + '))?\\s*\\))',translate='(?:(translate)\\s*\\(\\s*(' + number + ')(?:' + commaWsp + '(' + number + '))?\\s*\\))',matrix='(?:(matrix)\\s*\\(\\s*' + '(' + number + ')' + commaWsp + '(' + number + ')' + commaWsp + '(' + number + ')' + commaWsp + '(' + number + ')' + commaWsp + '(' + number + ')' + commaWsp + '(' + number + ')' + '\\s*\\))',transform='(?:' + matrix + '|' + translate + '|' + scale + '|' + rotate + '|' + skewX + '|' + skewY + ')',transforms='(?:' + transform + '(?:' + commaWsp + transform + ')*' + ')',transformList='^\\s*(?:' + transforms + '?)\\s*$',reTransformList=new RegExp(transformList),reTransform=new RegExp(transform,'g');return function(attributeValue){var matrix=iMatrix.concat(),matrices=[];if(!attributeValue || attributeValue && !reTransformList.test(attributeValue)){return matrix;}attributeValue.replace(reTransform,function(match){var m=new RegExp(transform).exec(match).filter(function(match){return match !== '' && match != null;}),operation=m[1],args=m.slice(2).map(parseFloat);switch(operation){case 'translate':translateMatrix(matrix,args);break;case 'rotate':args[0] = fabric.util.degreesToRadians(args[0]);rotateMatrix(matrix,args);break;case 'scale':scaleMatrix(matrix,args);break;case 'skewX':skewXMatrix(matrix,args);break;case 'skewY':skewYMatrix(matrix,args);break;case 'matrix':matrix = args;break;}matrices.push(matrix.concat());matrix = iMatrix.concat();});var combinedMatrix=matrices[0];while(matrices.length > 1) {matrices.shift();combinedMatrix = fabric.util.multiplyTransformMatrices(combinedMatrix,matrices[0]);}return combinedMatrix;};})();function parseStyleString(style,oStyle){var attr,value;style.replace(/;$/,'').split(';').forEach(function(chunk){var pair=chunk.split(':');attr = normalizeAttr(pair[0].trim().toLowerCase());value = normalizeValue(attr,pair[1].trim());oStyle[attr] = value;});}function parseStyleObject(style,oStyle){var attr,value;for(var prop in style) {if(typeof style[prop] === 'undefined'){continue;}attr = normalizeAttr(prop.toLowerCase());value = normalizeValue(attr,style[prop]);oStyle[attr] = value;}}function getGlobalStylesForElement(element,svgUid){var styles={};for(var rule in fabric.cssRules[svgUid]) {if(elementMatchesRule(element,rule.split(' '))){for(var property in fabric.cssRules[svgUid][rule]) {styles[property] = fabric.cssRules[svgUid][rule][property];}}}return styles;}function elementMatchesRule(element,selectors){var firstMatching,parentMatching=true;firstMatching = selectorMatches(element,selectors.pop());if(firstMatching && selectors.length){parentMatching = doesSomeParentMatch(element,selectors);}return firstMatching && parentMatching && selectors.length === 0;}function doesSomeParentMatch(element,selectors){var selector,parentMatching=true;while(element.parentNode && element.parentNode.nodeType === 1 && selectors.length) {if(parentMatching){selector = selectors.pop();}element = element.parentNode;parentMatching = selectorMatches(element,selector);}return selectors.length === 0;}function selectorMatches(element,selector){var nodeName=element.nodeName,classNames=element.getAttribute('class'),id=element.getAttribute('id'),matcher;matcher = new RegExp('^' + nodeName,'i');selector = selector.replace(matcher,'');if(id && selector.length){matcher = new RegExp('#' + id + '(?![a-zA-Z\\-]+)','i');selector = selector.replace(matcher,'');}if(classNames && selector.length){classNames = classNames.split(' ');for(var i=classNames.length;i--;) {matcher = new RegExp('\\.' + classNames[i] + '(?![a-zA-Z\\-]+)','i');selector = selector.replace(matcher,'');}}return selector.length === 0;}function parseUseDirectives(doc){var nodelist=doc.getElementsByTagName('use');while(nodelist.length) {var el=nodelist[0],xlink=el.getAttribute('xlink:href').substr(1),x=el.getAttribute('x') || 0,y=el.getAttribute('y') || 0,el2=doc.getElementById(xlink).cloneNode(true),currentTrans=(el2.getAttribute('transform') || '') + ' translate(' + x + ', ' + y + ')',parentNode;for(var j=0,attrs=el.attributes,l=attrs.length;j < l;j++) {var attr=attrs.item(j);if(attr.nodeName === 'x' || attr.nodeName === 'y' || attr.nodeName === 'xlink:href'){continue;}if(attr.nodeName === 'transform'){currentTrans = attr.nodeValue + ' ' + currentTrans;}else {el2.setAttribute(attr.nodeName,attr.nodeValue);}}el2.setAttribute('transform',currentTrans);el2.setAttribute('instantiated_by_use','1');el2.removeAttribute('id');parentNode = el.parentNode;parentNode.replaceChild(el2,el);}}var reViewBoxAttrValue=new RegExp('^' + '\\s*(' + fabric.reNum + '+)\\s*,?' + '\\s*(' + fabric.reNum + '+)\\s*,?' + '\\s*(' + fabric.reNum + '+)\\s*,?' + '\\s*(' + fabric.reNum + '+)\\s*' + '$');function addVBTransform(element,widthAttr,heightAttr){var viewBoxAttr=element.getAttribute('viewBox'),scaleX=1,scaleY=1,minX=0,minY=0,viewBoxWidth,viewBoxHeight,matrix,el;if(viewBoxAttr && (viewBoxAttr = viewBoxAttr.match(reViewBoxAttrValue))){minX = -parseFloat(viewBoxAttr[1]),minY = -parseFloat(viewBoxAttr[2]),viewBoxWidth = parseFloat(viewBoxAttr[3]),viewBoxHeight = parseFloat(viewBoxAttr[4]);}else {return;}if(widthAttr && widthAttr !== viewBoxWidth){scaleX = widthAttr / viewBoxWidth;}if(heightAttr && heightAttr !== viewBoxHeight){scaleY = heightAttr / viewBoxHeight;}scaleY = scaleX = scaleX > scaleY?scaleY:scaleX;if(!(scaleX !== 1 || scaleY !== 1 || minX !== 0 || minY !== 0)){return;}matrix = ' matrix(' + scaleX + ' 0' + ' 0 ' + scaleY + ' ' + minX * scaleX + ' ' + minY * scaleY + ') ';if(element.tagName === 'svg'){el = element.ownerDocument.createElement('g');while(element.firstChild != null) {el.appendChild(element.firstChild);}element.appendChild(el);}else {el = element;matrix = el.getAttribute('transform') + matrix;}el.setAttribute('transform',matrix);}fabric.parseSVGDocument = (function(){var reAllowedSVGTagNames=/^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/,reViewBoxTagNames=/^(symbol|image|marker|pattern|view)$/;function hasAncestorWithNodeName(element,nodeName){while(element && (element = element.parentNode)) {if(nodeName.test(element.nodeName) && !element.getAttribute('instantiated_by_use')){return true;}}return false;}return function(doc,callback,reviver){if(!doc){return;}parseUseDirectives(doc);var startTime=new Date(),svgUid=fabric.Object.__uid++,widthAttr,heightAttr,toBeParsed=false;if(doc.getAttribute('width') && doc.getAttribute('width') !== '100%'){widthAttr = parseUnit(doc.getAttribute('width'));}if(doc.getAttribute('height') && doc.getAttribute('height') !== '100%'){heightAttr = parseUnit(doc.getAttribute('height'));}if(!widthAttr || !heightAttr){var viewBoxAttr=doc.getAttribute('viewBox');if(viewBoxAttr && (viewBoxAttr = viewBoxAttr.match(reViewBoxAttrValue))){widthAttr = parseFloat(viewBoxAttr[3]),heightAttr = parseFloat(viewBoxAttr[4]);}else {toBeParsed = true;}}addVBTransform(doc,widthAttr,heightAttr);var descendants=fabric.util.toArray(doc.getElementsByTagName('*'));if(descendants.length === 0 && fabric.isLikelyNode){descendants = doc.selectNodes('//*[name(.)!="svg"]');var arr=[];for(var i=0,len=descendants.length;i < len;i++) {arr[i] = descendants[i];}descendants = arr;}var elements=descendants.filter(function(el){reViewBoxTagNames.test(el.tagName) && addVBTransform(el,0,0);return reAllowedSVGTagNames.test(el.tagName) && !hasAncestorWithNodeName(el,/^(?:pattern|defs|symbol)$/);});if(!elements || elements && !elements.length){callback && callback([],{});return;}var options={width:widthAttr,height:heightAttr,svgUid:svgUid,toBeParsed:toBeParsed};fabric.gradientDefs[svgUid] = fabric.getGradientDefs(doc);fabric.cssRules[svgUid] = fabric.getCSSRules(doc);fabric.parseElements(elements,function(instances){fabric.documentParsingTime = new Date() - startTime;if(callback){callback(instances,options);}},clone(options),reviver);};})();var svgCache={has:function has(name,callback){callback(false);},get:function get(){},set:function set(){}};function _enlivenCachedObject(cachedObject){var objects=cachedObject.objects,options=cachedObject.options;objects = objects.map(function(o){return fabric[capitalize(o.type)].fromObject(o);});return {objects:objects,options:options};}function _createSVGPattern(markup,canvas,property){if(canvas[property] && canvas[property].toSVG){markup.push('<pattern x="0" y="0" id="',property,'Pattern" ','width="',canvas[property].source.width,'" height="',canvas[property].source.height,'" patternUnits="userSpaceOnUse">','<image x="0" y="0" ','width="',canvas[property].source.width,'" height="',canvas[property].source.height,'" xlink:href="',canvas[property].source.src,'"></image></pattern>');}}var reFontDeclaration=new RegExp('(normal|italic)?\\s*(normal|small-caps)?\\s*' + '(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(' + fabric.reNum + '(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|' + fabric.reNum + '))?\\s+(.*)');extend(fabric,{parseFontDeclaration:function parseFontDeclaration(value,oStyle){var match=value.match(reFontDeclaration);if(!match){return;}var fontStyle=match[1],fontWeight=match[3],fontSize=match[4],lineHeight=match[5],fontFamily=match[6];if(fontStyle){oStyle.fontStyle = fontStyle;}if(fontWeight){oStyle.fontWeight = isNaN(parseFloat(fontWeight))?fontWeight:parseFloat(fontWeight);}if(fontSize){oStyle.fontSize = parseUnit(fontSize);}if(fontFamily){oStyle.fontFamily = fontFamily;}if(lineHeight){oStyle.lineHeight = lineHeight === 'normal'?1:lineHeight;}},getGradientDefs:function getGradientDefs(doc){var linearGradientEls=doc.getElementsByTagName('linearGradient'),radialGradientEls=doc.getElementsByTagName('radialGradient'),el,i,j=0,id,xlink,elList=[],gradientDefs={},idsToXlinkMap={};elList.length = linearGradientEls.length + radialGradientEls.length;i = linearGradientEls.length;while(i--) {elList[j++] = linearGradientEls[i];}i = radialGradientEls.length;while(i--) {elList[j++] = radialGradientEls[i];}while(j--) {el = elList[j];xlink = el.getAttribute('xlink:href');id = el.getAttribute('id');if(xlink){idsToXlinkMap[id] = xlink.substr(1);}gradientDefs[id] = el;}for(id in idsToXlinkMap) {var el2=gradientDefs[idsToXlinkMap[id]].cloneNode(true);el = gradientDefs[id];while(el2.firstChild) {el.appendChild(el2.firstChild);}}return gradientDefs;},parseAttributes:function parseAttributes(element,attributes,svgUid){if(!element){return;}var value,parentAttributes={},fontSize;if(typeof svgUid === 'undefined'){svgUid = element.getAttribute('svgUid');}if(element.parentNode && /^symbol|[g|a]$/i.test(element.parentNode.nodeName)){parentAttributes = fabric.parseAttributes(element.parentNode,attributes,svgUid);}fontSize = parentAttributes && parentAttributes.fontSize || element.getAttribute('font-size') || fabric.Text.DEFAULT_SVG_FONT_SIZE;var ownAttributes=attributes.reduce(function(memo,attr){value = element.getAttribute(attr);if(value){attr = normalizeAttr(attr);value = normalizeValue(attr,value,parentAttributes,fontSize);memo[attr] = value;}return memo;},{});ownAttributes = extend(ownAttributes,extend(getGlobalStylesForElement(element,svgUid),fabric.parseStyleAttribute(element)));if(ownAttributes.font){fabric.parseFontDeclaration(ownAttributes.font,ownAttributes);}return _setStrokeFillOpacity(extend(parentAttributes,ownAttributes));},parseElements:function parseElements(elements,callback,options,reviver){new fabric.ElementsParser(elements,callback,options,reviver).parse();},parseStyleAttribute:function parseStyleAttribute(element){var oStyle={},style=element.getAttribute('style');if(!style){return oStyle;}if(typeof style === 'string'){parseStyleString(style,oStyle);}else {parseStyleObject(style,oStyle);}return oStyle;},parsePointsAttribute:function parsePointsAttribute(points){if(!points){return null;}points = points.replace(/,/g,' ').trim();points = points.split(/\s+/);var parsedPoints=[],i,len;i = 0;len = points.length;for(;i < len;i += 2) {parsedPoints.push({x:parseFloat(points[i]),y:parseFloat(points[i + 1])});}return parsedPoints;},getCSSRules:function getCSSRules(doc){var styles=doc.getElementsByTagName('style'),allRules={},rules;for(var i=0,len=styles.length;i < len;i++) {var styleContents=styles[i].textContent;styleContents = styleContents.replace(/\/\*[\s\S]*?\*\//g,'');if(styleContents.trim() === ''){continue;}rules = styleContents.match(/[^{]*\{[\s\S]*?\}/g);rules = rules.map(function(rule){return rule.trim();});rules.forEach(function(rule){var match=rule.match(/([\s\S]*?)\s*\{([^}]*)\}/),ruleObj={},declaration=match[2].trim(),propertyValuePairs=declaration.replace(/;$/,'').split(/\s*;\s*/);for(var i=0,len=propertyValuePairs.length;i < len;i++) {var pair=propertyValuePairs[i].split(/\s*:\s*/),property=normalizeAttr(pair[0]),value=normalizeValue(property,pair[1],pair[0]);ruleObj[property] = value;}rule = match[1];rule.split(',').forEach(function(_rule){_rule = _rule.replace(/^svg/i,'').trim();if(_rule === ''){return;}allRules[_rule] = fabric.util.object.clone(ruleObj);});});}return allRules;},loadSVGFromURL:function loadSVGFromURL(url,callback,reviver){url = url.replace(/^\n\s*/,'').trim();svgCache.has(url,function(hasUrl){if(hasUrl){svgCache.get(url,function(value){var enlivedRecord=_enlivenCachedObject(value);callback(enlivedRecord.objects,enlivedRecord.options);});}else {new fabric.util.request(url,{method:'get',onComplete:onComplete});}});function onComplete(r){var xml=r.responseXML;if(xml && !xml.documentElement && fabric.window.ActiveXObject && r.responseText){xml = new ActiveXObject('Microsoft.XMLDOM');xml.async = 'false';xml.loadXML(r.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,''));}if(!xml || !xml.documentElement){return;}fabric.parseSVGDocument(xml.documentElement,function(results,options){svgCache.set(url,{objects:fabric.util.array.invoke(results,'toObject'),options:options});callback(results,options);},reviver);}},loadSVGFromString:function loadSVGFromString(string,callback,reviver){string = string.trim();var doc;if(typeof DOMParser !== 'undefined'){var parser=new DOMParser();if(parser && parser.parseFromString){doc = parser.parseFromString(string,'text/xml');}}else if(fabric.window.ActiveXObject){doc = new ActiveXObject('Microsoft.XMLDOM');doc.async = 'false';doc.loadXML(string.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,''));}fabric.parseSVGDocument(doc.documentElement,function(results,options){callback(results,options);},reviver);},createSVGFontFacesMarkup:function createSVGFontFacesMarkup(objects){var markup='';for(var i=0,len=objects.length;i < len;i++) {if(objects[i].type !== 'text' || !objects[i].path){continue;}markup += ['@font-face {','font-family: ',objects[i].fontFamily,'; ','src: url(\'',objects[i].path,'\')','}'].join('');}if(markup){markup = ['<style type="text/css">','<![CDATA[',markup,']]>','</style>'].join('');}return markup;},createSVGRefElementsMarkup:function createSVGRefElementsMarkup(canvas){var markup=[];_createSVGPattern(markup,canvas,'backgroundColor');_createSVGPattern(markup,canvas,'overlayColor');return markup.join('');}});})(true?exports:undefined);fabric.ElementsParser = function(elements,callback,options,reviver){this.elements = elements;this.callback = callback;this.options = options;this.reviver = reviver;this.svgUid = options && options.svgUid || 0;};fabric.ElementsParser.prototype.parse = function(){this.instances = new Array(this.elements.length);this.numElements = this.elements.length;this.createObjects();};fabric.ElementsParser.prototype.createObjects = function(){for(var i=0,len=this.elements.length;i < len;i++) {this.elements[i].setAttribute('svgUid',this.svgUid);(function(_this,i){setTimeout(function(){_this.createObject(_this.elements[i],i);},0);})(this,i);}};fabric.ElementsParser.prototype.createObject = function(el,index){var klass=fabric[fabric.util.string.capitalize(el.tagName)];if(klass && klass.fromElement){try{this._createObject(klass,el,index);}catch(err) {fabric.log(err);}}else {this.checkIfDone();}};fabric.ElementsParser.prototype._createObject = function(klass,el,index){if(klass.async){klass.fromElement(el,this.createCallback(index,el),this.options);}else {var obj=klass.fromElement(el,this.options);this.resolveGradient(obj,'fill');this.resolveGradient(obj,'stroke');this.reviver && this.reviver(el,obj);this.instances[index] = obj;this.checkIfDone();}};fabric.ElementsParser.prototype.createCallback = function(index,el){var _this=this;return function(obj){_this.resolveGradient(obj,'fill');_this.resolveGradient(obj,'stroke');_this.reviver && _this.reviver(el,obj);_this.instances[index] = obj;_this.checkIfDone();};};fabric.ElementsParser.prototype.resolveGradient = function(obj,property){var instanceFillValue=obj.get(property);if(!/^url\(/.test(instanceFillValue)){return;}var gradientId=instanceFillValue.slice(5,instanceFillValue.length - 1);if(fabric.gradientDefs[this.svgUid][gradientId]){obj.set(property,fabric.Gradient.fromElement(fabric.gradientDefs[this.svgUid][gradientId],obj));}};fabric.ElementsParser.prototype.checkIfDone = function(){if(--this.numElements === 0){this.instances = this.instances.filter(function(el){return el != null;});this.callback(this.instances);}};(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});if(fabric.Point){fabric.warn('fabric.Point is already defined');return;}fabric.Point = Point;function Point(x,y){this.x = x;this.y = y;}Point.prototype = {constructor:Point,add:function add(that){return new Point(this.x + that.x,this.y + that.y);},addEquals:function addEquals(that){this.x += that.x;this.y += that.y;return this;},scalarAdd:function scalarAdd(scalar){return new Point(this.x + scalar,this.y + scalar);},scalarAddEquals:function scalarAddEquals(scalar){this.x += scalar;this.y += scalar;return this;},subtract:function subtract(that){return new Point(this.x - that.x,this.y - that.y);},subtractEquals:function subtractEquals(that){this.x -= that.x;this.y -= that.y;return this;},scalarSubtract:function scalarSubtract(scalar){return new Point(this.x - scalar,this.y - scalar);},scalarSubtractEquals:function scalarSubtractEquals(scalar){this.x -= scalar;this.y -= scalar;return this;},multiply:function multiply(scalar){return new Point(this.x * scalar,this.y * scalar);},multiplyEquals:function multiplyEquals(scalar){this.x *= scalar;this.y *= scalar;return this;},divide:function divide(scalar){return new Point(this.x / scalar,this.y / scalar);},divideEquals:function divideEquals(scalar){this.x /= scalar;this.y /= scalar;return this;},eq:function eq(that){return this.x === that.x && this.y === that.y;},lt:function lt(that){return this.x < that.x && this.y < that.y;},lte:function lte(that){return this.x <= that.x && this.y <= that.y;},gt:function gt(that){return this.x > that.x && this.y > that.y;},gte:function gte(that){return this.x >= that.x && this.y >= that.y;},lerp:function lerp(that,t){return new Point(this.x + (that.x - this.x) * t,this.y + (that.y - this.y) * t);},distanceFrom:function distanceFrom(that){var dx=this.x - that.x,dy=this.y - that.y;return Math.sqrt(dx * dx + dy * dy);},midPointFrom:function midPointFrom(that){return new Point(this.x + (that.x - this.x) / 2,this.y + (that.y - this.y) / 2);},min:function min(that){return new Point(Math.min(this.x,that.x),Math.min(this.y,that.y));},max:function max(that){return new Point(Math.max(this.x,that.x),Math.max(this.y,that.y));},toString:function toString(){return this.x + ',' + this.y;},setXY:function setXY(x,y){this.x = x;this.y = y;},setFromPoint:function setFromPoint(that){this.x = that.x;this.y = that.y;},swap:function swap(that){var x=this.x,y=this.y;this.x = that.x;this.y = that.y;that.x = x;that.y = y;}};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});if(fabric.Intersection){fabric.warn('fabric.Intersection is already defined');return;}function Intersection(status){this.status = status;this.points = [];}fabric.Intersection = Intersection;fabric.Intersection.prototype = {appendPoint:function appendPoint(point){this.points.push(point);},appendPoints:function appendPoints(points){this.points = this.points.concat(points);}};fabric.Intersection.intersectLineLine = function(a1,a2,b1,b2){var result,uaT=(b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),ubT=(a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),uB=(b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);if(uB !== 0){var ua=uaT / uB,ub=ubT / uB;if(0 <= ua && ua <= 1 && 0 <= ub && ub <= 1){result = new Intersection('Intersection');result.points.push(new fabric.Point(a1.x + ua * (a2.x - a1.x),a1.y + ua * (a2.y - a1.y)));}else {result = new Intersection();}}else {if(uaT === 0 || ubT === 0){result = new Intersection('Coincident');}else {result = new Intersection('Parallel');}}return result;};fabric.Intersection.intersectLinePolygon = function(a1,a2,points){var result=new Intersection(),length=points.length;for(var i=0;i < length;i++) {var b1=points[i],b2=points[(i + 1) % length],inter=Intersection.intersectLineLine(a1,a2,b1,b2);result.appendPoints(inter.points);}if(result.points.length > 0){result.status = 'Intersection';}return result;};fabric.Intersection.intersectPolygonPolygon = function(points1,points2){var result=new Intersection(),length=points1.length;for(var i=0;i < length;i++) {var a1=points1[i],a2=points1[(i + 1) % length],inter=Intersection.intersectLinePolygon(a1,a2,points2);result.appendPoints(inter.points);}if(result.points.length > 0){result.status = 'Intersection';}return result;};fabric.Intersection.intersectPolygonRectangle = function(points,r1,r2){var min=r1.min(r2),max=r1.max(r2),topRight=new fabric.Point(max.x,min.y),bottomLeft=new fabric.Point(min.x,max.y),inter1=Intersection.intersectLinePolygon(min,topRight,points),inter2=Intersection.intersectLinePolygon(topRight,max,points),inter3=Intersection.intersectLinePolygon(max,bottomLeft,points),inter4=Intersection.intersectLinePolygon(bottomLeft,min,points),result=new Intersection();result.appendPoints(inter1.points);result.appendPoints(inter2.points);result.appendPoints(inter3.points);result.appendPoints(inter4.points);if(result.points.length > 0){result.status = 'Intersection';}return result;};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});if(fabric.Color){fabric.warn('fabric.Color is already defined.');return;}function Color(color){if(!color){this.setSource([0,0,0,1]);}else {this._tryParsingColor(color);}}fabric.Color = Color;fabric.Color.prototype = {_tryParsingColor:function _tryParsingColor(color){var source;if(color in Color.colorNameMap){color = Color.colorNameMap[color];}if(color === 'transparent'){this.setSource([255,255,255,0]);return;}source = Color.sourceFromHex(color);if(!source){source = Color.sourceFromRgb(color);}if(!source){source = Color.sourceFromHsl(color);}if(source){this.setSource(source);}},_rgbToHsl:function _rgbToHsl(r,g,b){r /= 255,g /= 255,b /= 255;var h,s,l,max=fabric.util.array.max([r,g,b]),min=fabric.util.array.min([r,g,b]);l = (max + min) / 2;if(max === min){h = s = 0;}else {var d=max - min;s = l > 0.5?d / (2 - max - min):d / (max + min);switch(max){case r:h = (g - b) / d + (g < b?6:0);break;case g:h = (b - r) / d + 2;break;case b:h = (r - g) / d + 4;break;}h /= 6;}return [Math.round(h * 360),Math.round(s * 100),Math.round(l * 100)];},getSource:function getSource(){return this._source;},setSource:function setSource(source){this._source = source;},toRgb:function toRgb(){var source=this.getSource();return 'rgb(' + source[0] + ',' + source[1] + ',' + source[2] + ')';},toRgba:function toRgba(){var source=this.getSource();return 'rgba(' + source[0] + ',' + source[1] + ',' + source[2] + ',' + source[3] + ')';},toHsl:function toHsl(){var source=this.getSource(),hsl=this._rgbToHsl(source[0],source[1],source[2]);return 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)';},toHsla:function toHsla(){var source=this.getSource(),hsl=this._rgbToHsl(source[0],source[1],source[2]);return 'hsla(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%,' + source[3] + ')';},toHex:function toHex(){var source=this.getSource(),r,g,b;r = source[0].toString(16);r = r.length === 1?'0' + r:r;g = source[1].toString(16);g = g.length === 1?'0' + g:g;b = source[2].toString(16);b = b.length === 1?'0' + b:b;return r.toUpperCase() + g.toUpperCase() + b.toUpperCase();},getAlpha:function getAlpha(){return this.getSource()[3];},setAlpha:function setAlpha(alpha){var source=this.getSource();source[3] = alpha;this.setSource(source);return this;},toGrayscale:function toGrayscale(){var source=this.getSource(),average=parseInt((source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0),10),currentAlpha=source[3];this.setSource([average,average,average,currentAlpha]);return this;},toBlackWhite:function toBlackWhite(threshold){var source=this.getSource(),average=(source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0),currentAlpha=source[3];threshold = threshold || 127;average = Number(average) < Number(threshold)?0:255;this.setSource([average,average,average,currentAlpha]);return this;},overlayWith:function overlayWith(otherColor){if(!(otherColor instanceof Color)){otherColor = new Color(otherColor);}var result=[],alpha=this.getAlpha(),otherAlpha=0.5,source=this.getSource(),otherSource=otherColor.getSource();for(var i=0;i < 3;i++) {result.push(Math.round(source[i] * (1 - otherAlpha) + otherSource[i] * otherAlpha));}result[3] = alpha;this.setSource(result);return this;}};fabric.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/;fabric.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/;fabric.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;fabric.Color.colorNameMap = {aqua:'#00FFFF',black:'#000000',blue:'#0000FF',fuchsia:'#FF00FF',gray:'#808080',green:'#008000',lime:'#00FF00',maroon:'#800000',navy:'#000080',olive:'#808000',orange:'#FFA500',purple:'#800080',red:'#FF0000',silver:'#C0C0C0',teal:'#008080',white:'#FFFFFF',yellow:'#FFFF00'};function hue2rgb(p,q,t){if(t < 0){t += 1;}if(t > 1){t -= 1;}if(t < 1 / 6){return p + (q - p) * 6 * t;}if(t < 1 / 2){return q;}if(t < 2 / 3){return p + (q - p) * (2 / 3 - t) * 6;}return p;}fabric.Color.fromRgb = function(color){return Color.fromSource(Color.sourceFromRgb(color));};fabric.Color.sourceFromRgb = function(color){var match=color.match(Color.reRGBa);if(match){var r=parseInt(match[1],10) / (/%$/.test(match[1])?100:1) * (/%$/.test(match[1])?255:1),g=parseInt(match[2],10) / (/%$/.test(match[2])?100:1) * (/%$/.test(match[2])?255:1),b=parseInt(match[3],10) / (/%$/.test(match[3])?100:1) * (/%$/.test(match[3])?255:1);return [parseInt(r,10),parseInt(g,10),parseInt(b,10),match[4]?parseFloat(match[4]):1];}};fabric.Color.fromRgba = Color.fromRgb;fabric.Color.fromHsl = function(color){return Color.fromSource(Color.sourceFromHsl(color));};fabric.Color.sourceFromHsl = function(color){var match=color.match(Color.reHSLa);if(!match){return;}var h=(parseFloat(match[1]) % 360 + 360) % 360 / 360,s=parseFloat(match[2]) / (/%$/.test(match[2])?100:1),l=parseFloat(match[3]) / (/%$/.test(match[3])?100:1),r,g,b;if(s === 0){r = g = b = l;}else {var q=l <= 0.5?l * (s + 1):l + s - l * s,p=l * 2 - q;r = hue2rgb(p,q,h + 1 / 3);g = hue2rgb(p,q,h);b = hue2rgb(p,q,h - 1 / 3);}return [Math.round(r * 255),Math.round(g * 255),Math.round(b * 255),match[4]?parseFloat(match[4]):1];};fabric.Color.fromHsla = Color.fromHsl;fabric.Color.fromHex = function(color){return Color.fromSource(Color.sourceFromHex(color));};fabric.Color.sourceFromHex = function(color){if(color.match(Color.reHex)){var value=color.slice(color.indexOf('#') + 1),isShortNotation=value.length === 3,r=isShortNotation?value.charAt(0) + value.charAt(0):value.substring(0,2),g=isShortNotation?value.charAt(1) + value.charAt(1):value.substring(2,4),b=isShortNotation?value.charAt(2) + value.charAt(2):value.substring(4,6);return [parseInt(r,16),parseInt(g,16),parseInt(b,16),1];}};fabric.Color.fromSource = function(source){var oColor=new Color();oColor.setSource(source);return oColor;};})(true?exports:undefined);(function(){function getColorStop(el){var style=el.getAttribute('style'),offset=el.getAttribute('offset'),color,colorAlpha,opacity;offset = parseFloat(offset) / (/%$/.test(offset)?100:1);offset = offset < 0?0:offset > 1?1:offset;if(style){var keyValuePairs=style.split(/\s*;\s*/);if(keyValuePairs[keyValuePairs.length - 1] === ''){keyValuePairs.pop();}for(var i=keyValuePairs.length;i--;) {var split=keyValuePairs[i].split(/\s*:\s*/),key=split[0].trim(),value=split[1].trim();if(key === 'stop-color'){color = value;}else if(key === 'stop-opacity'){opacity = value;}}}if(!color){color = el.getAttribute('stop-color') || 'rgb(0,0,0)';}if(!opacity){opacity = el.getAttribute('stop-opacity');}color = new fabric.Color(color);colorAlpha = color.getAlpha();opacity = isNaN(parseFloat(opacity))?1:parseFloat(opacity);opacity *= colorAlpha;return {offset:offset,color:color.toRgb(),opacity:opacity};}function getLinearCoords(el){return {x1:el.getAttribute('x1') || 0,y1:el.getAttribute('y1') || 0,x2:el.getAttribute('x2') || '100%',y2:el.getAttribute('y2') || 0};}function getRadialCoords(el){return {x1:el.getAttribute('fx') || el.getAttribute('cx') || '50%',y1:el.getAttribute('fy') || el.getAttribute('cy') || '50%',r1:0,x2:el.getAttribute('cx') || '50%',y2:el.getAttribute('cy') || '50%',r2:el.getAttribute('r') || '50%'};}fabric.Gradient = fabric.util.createClass({offsetX:0,offsetY:0,initialize:function initialize(options){options || (options = {});var coords={};this.id = fabric.Object.__uid++;this.type = options.type || 'linear';coords = {x1:options.coords.x1 || 0,y1:options.coords.y1 || 0,x2:options.coords.x2 || 0,y2:options.coords.y2 || 0};if(this.type === 'radial'){coords.r1 = options.coords.r1 || 0;coords.r2 = options.coords.r2 || 0;}this.coords = coords;this.colorStops = options.colorStops.slice();if(options.gradientTransform){this.gradientTransform = options.gradientTransform;}this.offsetX = options.offsetX || this.offsetX;this.offsetY = options.offsetY || this.offsetY;},addColorStop:function addColorStop(colorStop){for(var position in colorStop) {var color=new fabric.Color(colorStop[position]);this.colorStops.push({offset:position,color:color.toRgb(),opacity:color.getAlpha()});}return this;},toObject:function toObject(){return {type:this.type,coords:this.coords,colorStops:this.colorStops,offsetX:this.offsetX,offsetY:this.offsetY};},toSVG:function toSVG(object){var coords=fabric.util.object.clone(this.coords),markup,commonAttributes;this.colorStops.sort(function(a,b){return a.offset - b.offset;});if(!(object.group && object.group.type === 'path-group')){for(var prop in coords) {if(prop === 'x1' || prop === 'x2' || prop === 'r2'){coords[prop] += this.offsetX - object.width / 2;}else if(prop === 'y1' || prop === 'y2'){coords[prop] += this.offsetY - object.height / 2;}}}commonAttributes = 'id="SVGID_' + this.id + '" gradientUnits="userSpaceOnUse"';if(this.gradientTransform){commonAttributes += ' gradientTransform="matrix(' + this.gradientTransform.join(' ') + ')" ';}if(this.type === 'linear'){markup = ['<linearGradient ',commonAttributes,' x1="',coords.x1,'" y1="',coords.y1,'" x2="',coords.x2,'" y2="',coords.y2,'">\n'];}else if(this.type === 'radial'){markup = ['<radialGradient ',commonAttributes,' cx="',coords.x2,'" cy="',coords.y2,'" r="',coords.r2,'" fx="',coords.x1,'" fy="',coords.y1,'">\n'];}for(var i=0;i < this.colorStops.length;i++) {markup.push('<stop ','offset="',this.colorStops[i].offset * 100 + '%','" style="stop-color:',this.colorStops[i].color,this.colorStops[i].opacity != null?';stop-opacity: ' + this.colorStops[i].opacity:';','"/>\n');}markup.push(this.type === 'linear'?'</linearGradient>\n':'</radialGradient>\n');return markup.join('');},toLive:function toLive(ctx,object){var gradient,prop,coords=fabric.util.object.clone(this.coords);if(!this.type){return;}if(object.group && object.group.type === 'path-group'){for(prop in coords) {if(prop === 'x1' || prop === 'x2'){coords[prop] += -this.offsetX + object.width / 2;}else if(prop === 'y1' || prop === 'y2'){coords[prop] += -this.offsetY + object.height / 2;}}}if(object.type === 'text' || object.type === 'i-text'){for(prop in coords) {if(prop === 'x1' || prop === 'x2'){coords[prop] -= object.width / 2;}else if(prop === 'y1' || prop === 'y2'){coords[prop] -= object.height / 2;}}}if(this.type === 'linear'){gradient = ctx.createLinearGradient(coords.x1,coords.y1,coords.x2,coords.y2);}else if(this.type === 'radial'){gradient = ctx.createRadialGradient(coords.x1,coords.y1,coords.r1,coords.x2,coords.y2,coords.r2);}for(var i=0,len=this.colorStops.length;i < len;i++) {var color=this.colorStops[i].color,opacity=this.colorStops[i].opacity,offset=this.colorStops[i].offset;if(typeof opacity !== 'undefined'){color = new fabric.Color(color).setAlpha(opacity).toRgba();}gradient.addColorStop(parseFloat(offset),color);}return gradient;}});fabric.util.object.extend(fabric.Gradient,{fromElement:function fromElement(el,instance){var colorStopEls=el.getElementsByTagName('stop'),type=el.nodeName === 'linearGradient'?'linear':'radial',gradientUnits=el.getAttribute('gradientUnits') || 'objectBoundingBox',gradientTransform=el.getAttribute('gradientTransform'),colorStops=[],coords={},ellipseMatrix;if(type === 'linear'){coords = getLinearCoords(el);}else if(type === 'radial'){coords = getRadialCoords(el);}for(var i=colorStopEls.length;i--;) {colorStops.push(getColorStop(colorStopEls[i]));}ellipseMatrix = _convertPercentUnitsToValues(instance,coords,gradientUnits);var gradient=new fabric.Gradient({type:type,coords:coords,colorStops:colorStops,offsetX:-instance.left,offsetY:-instance.top});if(gradientTransform || ellipseMatrix !== ''){gradient.gradientTransform = fabric.parseTransformAttribute((gradientTransform || '') + ellipseMatrix);}return gradient;},forObject:function forObject(obj,options){options || (options = {});_convertPercentUnitsToValues(obj,options.coords,'userSpaceOnUse');return new fabric.Gradient(options);}});function _convertPercentUnitsToValues(object,options,gradientUnits){var propValue,addFactor=0,multFactor=1,ellipseMatrix='';for(var prop in options) {propValue = parseFloat(options[prop],10);if(typeof options[prop] === 'string' && /^\d+%$/.test(options[prop])){multFactor = 0.01;}else {multFactor = 1;}if(prop === 'x1' || prop === 'x2' || prop === 'r2'){multFactor *= gradientUnits === 'objectBoundingBox'?object.width:1;addFactor = gradientUnits === 'objectBoundingBox'?object.left || 0:0;}else if(prop === 'y1' || prop === 'y2'){multFactor *= gradientUnits === 'objectBoundingBox'?object.height:1;addFactor = gradientUnits === 'objectBoundingBox'?object.top || 0:0;}options[prop] = propValue * multFactor + addFactor;}if(object.type === 'ellipse' && options.r2 !== null && gradientUnits === 'objectBoundingBox' && object.rx !== object.ry){var scaleFactor=object.ry / object.rx;ellipseMatrix = ' scale(1, ' + scaleFactor + ')';if(options.y1){options.y1 /= scaleFactor;}if(options.y2){options.y2 /= scaleFactor;}}return ellipseMatrix;}})();fabric.Pattern = fabric.util.createClass({repeat:'repeat',offsetX:0,offsetY:0,initialize:function initialize(options){options || (options = {});this.id = fabric.Object.__uid++;if(options.source){if(typeof options.source === 'string'){if(typeof fabric.util.getFunctionBody(options.source) !== 'undefined'){this.source = new Function(fabric.util.getFunctionBody(options.source));}else {var _this=this;this.source = fabric.util.createImage();fabric.util.loadImage(options.source,function(img){_this.source = img;});}}else {this.source = options.source;}}if(options.repeat){this.repeat = options.repeat;}if(options.offsetX){this.offsetX = options.offsetX;}if(options.offsetY){this.offsetY = options.offsetY;}},toObject:function toObject(){var source;if(typeof this.source === 'function'){source = String(this.source);}else if(typeof this.source.src === 'string'){source = this.source.src;}return {source:source,repeat:this.repeat,offsetX:this.offsetX,offsetY:this.offsetY};},toSVG:function toSVG(object){var patternSource=typeof this.source === 'function'?this.source():this.source,patternWidth=patternSource.width / object.getWidth(),patternHeight=patternSource.height / object.getHeight(),patternOffsetX=this.offsetX / object.getWidth(),patternOffsetY=this.offsetY / object.getHeight(),patternImgSrc='';if(this.repeat === 'repeat-x' || this.repeat === 'no-repeat'){patternHeight = 1;}if(this.repeat === 'repeat-y' || this.repeat === 'no-repeat'){patternWidth = 1;}if(patternSource.src){patternImgSrc = patternSource.src;}else if(patternSource.toDataURL){patternImgSrc = patternSource.toDataURL();}return '<pattern id="SVGID_' + this.id + '" x="' + patternOffsetX + '" y="' + patternOffsetY + '" width="' + patternWidth + '" height="' + patternHeight + '">\n' + '<image x="0" y="0"' + ' width="' + patternSource.width + '" height="' + patternSource.height + '" xlink:href="' + patternImgSrc + '"></image>\n' + '</pattern>\n';},toLive:function toLive(ctx){var source=typeof this.source === 'function'?this.source():this.source;if(!source){return '';}if(typeof source.src !== 'undefined'){if(!source.complete){return '';}if(source.naturalWidth === 0 || source.naturalHeight === 0){return '';}}return ctx.createPattern(source,this.repeat);}});(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),toFixed=fabric.util.toFixed;if(fabric.Shadow){fabric.warn('fabric.Shadow is already defined.');return;}fabric.Shadow = fabric.util.createClass({color:'rgb(0,0,0)',blur:0,offsetX:0,offsetY:0,affectStroke:false,includeDefaultValues:true,initialize:function initialize(options){if(typeof options === 'string'){options = this._parseShadow(options);}for(var prop in options) {this[prop] = options[prop];}this.id = fabric.Object.__uid++;},_parseShadow:function _parseShadow(shadow){var shadowStr=shadow.trim(),offsetsAndBlur=fabric.Shadow.reOffsetsAndBlur.exec(shadowStr) || [],color=shadowStr.replace(fabric.Shadow.reOffsetsAndBlur,'') || 'rgb(0,0,0)';return {color:color.trim(),offsetX:parseInt(offsetsAndBlur[1],10) || 0,offsetY:parseInt(offsetsAndBlur[2],10) || 0,blur:parseInt(offsetsAndBlur[3],10) || 0};},toString:function toString(){return [this.offsetX,this.offsetY,this.blur,this.color].join('px ');},toSVG:function toSVG(object){var mode='SourceAlpha',fBoxX=40,fBoxY=40;if(object && (object.fill === this.color || object.stroke === this.color)){mode = 'SourceGraphic';}if(object.width && object.height){fBoxX = toFixed(Math.abs(this.offsetX / object.getWidth()),2) * 100 + 20;fBoxY = toFixed(Math.abs(this.offsetY / object.getHeight()),2) * 100 + 20;}return '<filter id="SVGID_' + this.id + '" y="-' + fBoxY + '%" height="' + (100 + 2 * fBoxY) + '%" ' + 'x="-' + fBoxX + '%" width="' + (100 + 2 * fBoxX) + '%" ' + '>\n' + '\t<feGaussianBlur in="' + mode + '" stdDeviation="' + toFixed(this.blur?this.blur / 2:0,3) + '" result="blurOut"></feGaussianBlur>\n' + '\t<feColorMatrix result="matrixOut" in="blurOut" type="matrix" ' + 'values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.30 0" ></feColorMatrix >\n' + '\t<feOffset dx="' + this.offsetX + '" dy="' + this.offsetY + '"></feOffset>\n' + '\t<feMerge>\n' + '\t\t<feMergeNode></feMergeNode>\n' + '\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n' + '\t</feMerge>\n' + '</filter>\n';},toObject:function toObject(){if(this.includeDefaultValues){return {color:this.color,blur:this.blur,offsetX:this.offsetX,offsetY:this.offsetY};}var obj={},proto=fabric.Shadow.prototype;if(this.color !== proto.color){obj.color = this.color;}if(this.blur !== proto.blur){obj.blur = this.blur;}if(this.offsetX !== proto.offsetX){obj.offsetX = this.offsetX;}if(this.offsetY !== proto.offsetY){obj.offsetY = this.offsetY;}return obj;}});fabric.Shadow.reOffsetsAndBlur = /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/;})(true?exports:undefined);(function(){'use strict';if(fabric.StaticCanvas){fabric.warn('fabric.StaticCanvas is already defined.');return;}var extend=fabric.util.object.extend,getElementOffset=fabric.util.getElementOffset,removeFromArray=fabric.util.removeFromArray,CANVAS_INIT_ERROR=new Error('Could not initialize `canvas` element');fabric.StaticCanvas = fabric.util.createClass({initialize:function initialize(el,options){options || (options = {});this._initStatic(el,options);fabric.StaticCanvas.activeInstance = this;},backgroundColor:'',backgroundImage:null,overlayColor:'',overlayImage:null,includeDefaultValues:true,stateful:true,renderOnAddRemove:true,clipTo:null,controlsAboveOverlay:false,allowTouchScrolling:false,imageSmoothingEnabled:true,preserveObjectStacking:false,viewportTransform:[1,0,0,1,0,0],onBeforeScaleRotate:function onBeforeScaleRotate(){},_initStatic:function _initStatic(el,options){this._objects = [];this._createLowerCanvas(el);this._initOptions(options);this._setImageSmoothing();if(options.overlayImage){this.setOverlayImage(options.overlayImage,this.renderAll.bind(this));}if(options.backgroundImage){this.setBackgroundImage(options.backgroundImage,this.renderAll.bind(this));}if(options.backgroundColor){this.setBackgroundColor(options.backgroundColor,this.renderAll.bind(this));}if(options.overlayColor){this.setOverlayColor(options.overlayColor,this.renderAll.bind(this));}this.calcOffset();},calcOffset:function calcOffset(){this._offset = getElementOffset(this.lowerCanvasEl);return this;},setOverlayImage:function setOverlayImage(image,callback,options){return this.__setBgOverlayImage('overlayImage',image,callback,options);},setBackgroundImage:function setBackgroundImage(image,callback,options){return this.__setBgOverlayImage('backgroundImage',image,callback,options);},setOverlayColor:function setOverlayColor(overlayColor,callback){return this.__setBgOverlayColor('overlayColor',overlayColor,callback);},setBackgroundColor:function setBackgroundColor(backgroundColor,callback){return this.__setBgOverlayColor('backgroundColor',backgroundColor,callback);},_setImageSmoothing:function _setImageSmoothing(){var ctx=this.getContext();ctx.imageSmoothingEnabled = this.imageSmoothingEnabled;ctx.webkitImageSmoothingEnabled = this.imageSmoothingEnabled;ctx.mozImageSmoothingEnabled = this.imageSmoothingEnabled;ctx.msImageSmoothingEnabled = this.imageSmoothingEnabled;ctx.oImageSmoothingEnabled = this.imageSmoothingEnabled;},__setBgOverlayImage:function __setBgOverlayImage(property,image,callback,options){if(typeof image === 'string'){fabric.util.loadImage(image,function(img){this[property] = new fabric.Image(img,options);callback && callback();},this,options && options.crossOrigin);}else {options && image.setOptions(options);this[property] = image;callback && callback();}return this;},__setBgOverlayColor:function __setBgOverlayColor(property,color,callback){if(color && color.source){var _this=this;fabric.util.loadImage(color.source,function(img){_this[property] = new fabric.Pattern({source:img,repeat:color.repeat,offsetX:color.offsetX,offsetY:color.offsetY});callback && callback();});}else {this[property] = color;callback && callback();}return this;},_createCanvasElement:function _createCanvasElement(){var element=fabric.document.createElement('canvas');if(!element.style){element.style = {};}if(!element){throw CANVAS_INIT_ERROR;}this._initCanvasElement(element);return element;},_initCanvasElement:function _initCanvasElement(element){fabric.util.createCanvasElement(element);if(typeof element.getContext === 'undefined'){throw CANVAS_INIT_ERROR;}},_initOptions:function _initOptions(options){for(var prop in options) {this[prop] = options[prop];}this.width = this.width || parseInt(this.lowerCanvasEl.width,10) || 0;this.height = this.height || parseInt(this.lowerCanvasEl.height,10) || 0;if(!this.lowerCanvasEl.style){return;}this.lowerCanvasEl.width = this.width;this.lowerCanvasEl.height = this.height;this.lowerCanvasEl.style.width = this.width + 'px';this.lowerCanvasEl.style.height = this.height + 'px';this.viewportTransform = this.viewportTransform.slice();},_createLowerCanvas:function _createLowerCanvas(canvasEl){this.lowerCanvasEl = fabric.util.getById(canvasEl) || this._createCanvasElement();this._initCanvasElement(this.lowerCanvasEl);fabric.util.addClass(this.lowerCanvasEl,'lower-canvas');if(this.interactive){this._applyCanvasStyle(this.lowerCanvasEl);}this.contextContainer = this.lowerCanvasEl.getContext('2d');},getWidth:function getWidth(){return this.width;},getHeight:function getHeight(){return this.height;},setWidth:function setWidth(value,options){return this.setDimensions({width:value},options);},setHeight:function setHeight(value,options){return this.setDimensions({height:value},options);},setDimensions:function setDimensions(dimensions,options){var cssValue;options = options || {};for(var prop in dimensions) {cssValue = dimensions[prop];if(!options.cssOnly){this._setBackstoreDimension(prop,dimensions[prop]);cssValue += 'px';}if(!options.backstoreOnly){this._setCssDimension(prop,cssValue);}}if(!options.cssOnly){this.renderAll();}this.calcOffset();return this;},_setBackstoreDimension:function _setBackstoreDimension(prop,value){this.lowerCanvasEl[prop] = value;if(this.upperCanvasEl){this.upperCanvasEl[prop] = value;}if(this.cacheCanvasEl){this.cacheCanvasEl[prop] = value;}this[prop] = value;return this;},_setCssDimension:function _setCssDimension(prop,value){this.lowerCanvasEl.style[prop] = value;if(this.upperCanvasEl){this.upperCanvasEl.style[prop] = value;}if(this.wrapperEl){this.wrapperEl.style[prop] = value;}return this;},getZoom:function getZoom(){return Math.sqrt(this.viewportTransform[0] * this.viewportTransform[3]);},setViewportTransform:function setViewportTransform(vpt){var activeGroup=this.getActiveGroup();this.viewportTransform = vpt;this.renderAll();for(var i=0,len=this._objects.length;i < len;i++) {this._objects[i].setCoords();}if(activeGroup){activeGroup.setCoords();}return this;},zoomToPoint:function zoomToPoint(point,value){var before=point;point = fabric.util.transformPoint(point,fabric.util.invertTransform(this.viewportTransform));this.viewportTransform[0] = value;this.viewportTransform[3] = value;var after=fabric.util.transformPoint(point,this.viewportTransform);this.viewportTransform[4] += before.x - after.x;this.viewportTransform[5] += before.y - after.y;this.renderAll();for(var i=0,len=this._objects.length;i < len;i++) {this._objects[i].setCoords();}return this;},setZoom:function setZoom(value){this.zoomToPoint(new fabric.Point(0,0),value);return this;},absolutePan:function absolutePan(point){this.viewportTransform[4] = -point.x;this.viewportTransform[5] = -point.y;this.renderAll();for(var i=0,len=this._objects.length;i < len;i++) {this._objects[i].setCoords();}return this;},relativePan:function relativePan(point){return this.absolutePan(new fabric.Point(-point.x - this.viewportTransform[4],-point.y - this.viewportTransform[5]));},getElement:function getElement(){return this.lowerCanvasEl;},getActiveObject:function getActiveObject(){return null;},getActiveGroup:function getActiveGroup(){return null;},_draw:function _draw(ctx,object){if(!object){return;}ctx.save();var v=this.viewportTransform;ctx.transform(v[0],v[1],v[2],v[3],v[4],v[5]);if(this._shouldRenderObject(object)){object.render(ctx);}ctx.restore();if(!this.controlsAboveOverlay){object._renderControls(ctx);}},_shouldRenderObject:function _shouldRenderObject(object){if(!object){return false;}return object !== this.getActiveGroup() || !this.preserveObjectStacking;},_onObjectAdded:function _onObjectAdded(obj){this.stateful && obj.setupState();obj.canvas = this;obj.setCoords();this.fire('object:added',{target:obj});obj.fire('added');},_onObjectRemoved:function _onObjectRemoved(obj){if(this.getActiveObject() === obj){this.fire('before:selection:cleared',{target:obj});this._discardActiveObject();this.fire('selection:cleared');}this.fire('object:removed',{target:obj});obj.fire('removed');},clearContext:function clearContext(ctx){ctx.clearRect(0,0,this.width,this.height);return this;},getContext:function getContext(){return this.contextContainer;},clear:function clear(){this._objects.length = 0;if(this.discardActiveGroup){this.discardActiveGroup();}if(this.discardActiveObject){this.discardActiveObject();}this.clearContext(this.contextContainer);if(this.contextTop){this.clearContext(this.contextTop);}this.fire('canvas:cleared');this.renderAll();return this;},renderAll:function renderAll(allOnTop){var canvasToDrawOn=this[allOnTop === true && this.interactive?'contextTop':'contextContainer'],activeGroup=this.getActiveGroup();if(this.contextTop && this.selection && !this._groupSelector){this.clearContext(this.contextTop);}if(!allOnTop){this.clearContext(canvasToDrawOn);}this.fire('before:render');if(this.clipTo){fabric.util.clipContext(this,canvasToDrawOn);}this._renderBackground(canvasToDrawOn);this._renderObjects(canvasToDrawOn,activeGroup);this._renderActiveGroup(canvasToDrawOn,activeGroup);if(this.clipTo){canvasToDrawOn.restore();}this._renderOverlay(canvasToDrawOn);if(this.controlsAboveOverlay && this.interactive){this.drawControls(canvasToDrawOn);}this.fire('after:render');return this;},_renderObjects:function _renderObjects(ctx,activeGroup){var i,length;if(!activeGroup || this.preserveObjectStacking){for(i = 0,length = this._objects.length;i < length;++i) {this._draw(ctx,this._objects[i]);}}else {for(i = 0,length = this._objects.length;i < length;++i) {if(this._objects[i] && !activeGroup.contains(this._objects[i])){this._draw(ctx,this._objects[i]);}}}},_renderActiveGroup:function _renderActiveGroup(ctx,activeGroup){if(activeGroup){var sortedObjects=[];this.forEachObject(function(object){if(activeGroup.contains(object)){sortedObjects.push(object);}});activeGroup._set('objects',sortedObjects);this._draw(ctx,activeGroup);}},_renderBackground:function _renderBackground(ctx){if(this.backgroundColor){ctx.fillStyle = this.backgroundColor.toLive?this.backgroundColor.toLive(ctx):this.backgroundColor;ctx.fillRect(this.backgroundColor.offsetX || 0,this.backgroundColor.offsetY || 0,this.width,this.height);}if(this.backgroundImage){this._draw(ctx,this.backgroundImage);}},_renderOverlay:function _renderOverlay(ctx){if(this.overlayColor){ctx.fillStyle = this.overlayColor.toLive?this.overlayColor.toLive(ctx):this.overlayColor;ctx.fillRect(this.overlayColor.offsetX || 0,this.overlayColor.offsetY || 0,this.width,this.height);}if(this.overlayImage){this._draw(ctx,this.overlayImage);}},renderTop:function renderTop(){var ctx=this.contextTop || this.contextContainer;this.clearContext(ctx);if(this.selection && this._groupSelector){this._drawSelection();}var activeGroup=this.getActiveGroup();if(activeGroup){activeGroup.render(ctx);}this._renderOverlay(ctx);this.fire('after:render');return this;},getCenter:function getCenter(){return {top:this.getHeight() / 2,left:this.getWidth() / 2};},centerObjectH:function centerObjectH(object){this._centerObject(object,new fabric.Point(this.getCenter().left,object.getCenterPoint().y));this.renderAll();return this;},centerObjectV:function centerObjectV(object){this._centerObject(object,new fabric.Point(object.getCenterPoint().x,this.getCenter().top));this.renderAll();return this;},centerObject:function centerObject(object){var center=this.getCenter();this._centerObject(object,new fabric.Point(center.left,center.top));this.renderAll();return this;},_centerObject:function _centerObject(object,center){object.setPositionByOrigin(center,'center','center');return this;},toDatalessJSON:function toDatalessJSON(propertiesToInclude){return this.toDatalessObject(propertiesToInclude);},toObject:function toObject(propertiesToInclude){return this._toObjectMethod('toObject',propertiesToInclude);},toDatalessObject:function toDatalessObject(propertiesToInclude){return this._toObjectMethod('toDatalessObject',propertiesToInclude);},_toObjectMethod:function _toObjectMethod(methodName,propertiesToInclude){var data={objects:this._toObjects(methodName,propertiesToInclude)};extend(data,this.__serializeBgOverlay());fabric.util.populateWithProperties(this,data,propertiesToInclude);return data;},_toObjects:function _toObjects(methodName,propertiesToInclude){return this.getObjects().map(function(instance){return this._toObject(instance,methodName,propertiesToInclude);},this);},_toObject:function _toObject(instance,methodName,propertiesToInclude){var originalValue;if(!this.includeDefaultValues){originalValue = instance.includeDefaultValues;instance.includeDefaultValues = false;}var originalProperties=this._realizeGroupTransformOnObject(instance),object=instance[methodName](propertiesToInclude);if(!this.includeDefaultValues){instance.includeDefaultValues = originalValue;}this._unwindGroupTransformOnObject(instance,originalProperties);return object;},_realizeGroupTransformOnObject:function _realizeGroupTransformOnObject(instance){var layoutProps=['angle','flipX','flipY','height','left','scaleX','scaleY','top','width'];if(instance.group && instance.group === this.getActiveGroup()){var originalValues={};layoutProps.forEach(function(prop){originalValues[prop] = instance[prop];});this.getActiveGroup().realizeTransform(instance);return originalValues;}else {return null;}},_unwindGroupTransformOnObject:function _unwindGroupTransformOnObject(instance,originalValues){if(originalValues){instance.set(originalValues);}},__serializeBgOverlay:function __serializeBgOverlay(){var data={background:this.backgroundColor && this.backgroundColor.toObject?this.backgroundColor.toObject():this.backgroundColor};if(this.overlayColor){data.overlay = this.overlayColor.toObject?this.overlayColor.toObject():this.overlayColor;}if(this.backgroundImage){data.backgroundImage = this.backgroundImage.toObject();}if(this.overlayImage){data.overlayImage = this.overlayImage.toObject();}return data;},svgViewportTransformation:true,toSVG:function toSVG(options,reviver){options || (options = {});var markup=[];this._setSVGPreamble(markup,options);this._setSVGHeader(markup,options);this._setSVGBgOverlayColor(markup,'backgroundColor');this._setSVGBgOverlayImage(markup,'backgroundImage');this._setSVGObjects(markup,reviver);this._setSVGBgOverlayColor(markup,'overlayColor');this._setSVGBgOverlayImage(markup,'overlayImage');markup.push('</svg>');return markup.join('');},_setSVGPreamble:function _setSVGPreamble(markup,options){if(!options.suppressPreamble){markup.push('<?xml version="1.0" encoding="',options.encoding || 'UTF-8','" standalone="no" ?>','<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ','"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n');}},_setSVGHeader:function _setSVGHeader(markup,options){var width,height,vpt;if(options.viewBox){width = options.viewBox.width;height = options.viewBox.height;}else {width = this.width;height = this.height;if(!this.svgViewportTransformation){vpt = this.viewportTransform;width /= vpt[0];height /= vpt[3];}}markup.push('<svg ','xmlns="http://www.w3.org/2000/svg" ','xmlns:xlink="http://www.w3.org/1999/xlink" ','version="1.1" ','width="',width,'" ','height="',height,'" ',this.backgroundColor && !this.backgroundColor.toLive?'style="background-color: ' + this.backgroundColor + '" ':null,options.viewBox?'viewBox="' + options.viewBox.x + ' ' + options.viewBox.y + ' ' + options.viewBox.width + ' ' + options.viewBox.height + '" ':null,'xml:space="preserve">','<desc>Created with Fabric.js ',fabric.version,'</desc>','<defs>',fabric.createSVGFontFacesMarkup(this.getObjects()),fabric.createSVGRefElementsMarkup(this),'</defs>');},_setSVGObjects:function _setSVGObjects(markup,reviver){for(var i=0,objects=this.getObjects(),len=objects.length;i < len;i++) {var instance=objects[i],originalProperties=this._realizeGroupTransformOnObject(instance);markup.push(instance.toSVG(reviver));this._unwindGroupTransformOnObject(instance,originalProperties);}},_setSVGBgOverlayImage:function _setSVGBgOverlayImage(markup,property){if(this[property] && this[property].toSVG){markup.push(this[property].toSVG());}},_setSVGBgOverlayColor:function _setSVGBgOverlayColor(markup,property){if(this[property] && this[property].source){markup.push('<rect x="',this[property].offsetX,'" y="',this[property].offsetY,'" ','width="',this[property].repeat === 'repeat-y' || this[property].repeat === 'no-repeat'?this[property].source.width:this.width,'" height="',this[property].repeat === 'repeat-x' || this[property].repeat === 'no-repeat'?this[property].source.height:this.height,'" fill="url(#' + property + 'Pattern)"','></rect>');}else if(this[property] && property === 'overlayColor'){markup.push('<rect x="0" y="0" ','width="',this.width,'" height="',this.height,'" fill="',this[property],'"','></rect>');}},sendToBack:function sendToBack(object){removeFromArray(this._objects,object);this._objects.unshift(object);return this.renderAll && this.renderAll();},bringToFront:function bringToFront(object){removeFromArray(this._objects,object);this._objects.push(object);return this.renderAll && this.renderAll();},sendBackwards:function sendBackwards(object,intersecting){var idx=this._objects.indexOf(object);if(idx !== 0){var newIdx=this._findNewLowerIndex(object,idx,intersecting);removeFromArray(this._objects,object);this._objects.splice(newIdx,0,object);this.renderAll && this.renderAll();}return this;},_findNewLowerIndex:function _findNewLowerIndex(object,idx,intersecting){var newIdx;if(intersecting){newIdx = idx;for(var i=idx - 1;i >= 0;--i) {var isIntersecting=object.intersectsWithObject(this._objects[i]) || object.isContainedWithinObject(this._objects[i]) || this._objects[i].isContainedWithinObject(object);if(isIntersecting){newIdx = i;break;}}}else {newIdx = idx - 1;}return newIdx;},bringForward:function bringForward(object,intersecting){var idx=this._objects.indexOf(object);if(idx !== this._objects.length - 1){var newIdx=this._findNewUpperIndex(object,idx,intersecting);removeFromArray(this._objects,object);this._objects.splice(newIdx,0,object);this.renderAll && this.renderAll();}return this;},_findNewUpperIndex:function _findNewUpperIndex(object,idx,intersecting){var newIdx;if(intersecting){newIdx = idx;for(var i=idx + 1;i < this._objects.length;++i) {var isIntersecting=object.intersectsWithObject(this._objects[i]) || object.isContainedWithinObject(this._objects[i]) || this._objects[i].isContainedWithinObject(object);if(isIntersecting){newIdx = i;break;}}}else {newIdx = idx + 1;}return newIdx;},moveTo:function moveTo(object,index){removeFromArray(this._objects,object);this._objects.splice(index,0,object);return this.renderAll && this.renderAll();},dispose:function dispose(){this.clear();this.interactive && this.removeListeners();return this;},toString:function toString(){return '#<fabric.Canvas (' + this.complexity() + '): ' + '{ objects: ' + this.getObjects().length + ' }>';}});extend(fabric.StaticCanvas.prototype,fabric.Observable);extend(fabric.StaticCanvas.prototype,fabric.Collection);extend(fabric.StaticCanvas.prototype,fabric.DataURLExporter);extend(fabric.StaticCanvas,{EMPTY_JSON:'{"objects": [], "background": "white"}',supports:function supports(methodName){var el=fabric.util.createCanvasElement();if(!el || !el.getContext){return null;}var ctx=el.getContext('2d');if(!ctx){return null;}switch(methodName){case 'getImageData':return typeof ctx.getImageData !== 'undefined';case 'setLineDash':return typeof ctx.setLineDash !== 'undefined';case 'toDataURL':return typeof el.toDataURL !== 'undefined';case 'toDataURLWithQuality':try{el.toDataURL('image/jpeg',0);return true;}catch(e) {}return false;default:return null;}}});fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject;})();fabric.BaseBrush = fabric.util.createClass({color:'rgb(0, 0, 0)',width:1,shadow:null,strokeLineCap:'round',strokeLineJoin:'round',strokeDashArray:null,setShadow:function setShadow(options){this.shadow = new fabric.Shadow(options);return this;},_setBrushStyles:function _setBrushStyles(){var ctx=this.canvas.contextTop;ctx.strokeStyle = this.color;ctx.lineWidth = this.width;ctx.lineCap = this.strokeLineCap;ctx.lineJoin = this.strokeLineJoin;if(this.strokeDashArray && fabric.StaticCanvas.supports('setLineDash')){ctx.setLineDash(this.strokeDashArray);}},_setShadow:function _setShadow(){if(!this.shadow){return;}var ctx=this.canvas.contextTop;ctx.shadowColor = this.shadow.color;ctx.shadowBlur = this.shadow.blur;ctx.shadowOffsetX = this.shadow.offsetX;ctx.shadowOffsetY = this.shadow.offsetY;},_resetShadow:function _resetShadow(){var ctx=this.canvas.contextTop;ctx.shadowColor = '';ctx.shadowBlur = ctx.shadowOffsetX = ctx.shadowOffsetY = 0;}});(function(){fabric.PencilBrush = fabric.util.createClass(fabric.BaseBrush,{initialize:function initialize(canvas){this.canvas = canvas;this._points = [];},onMouseDown:function onMouseDown(pointer){this._prepareForDrawing(pointer);this._captureDrawingPath(pointer);this._render();},onMouseMove:function onMouseMove(pointer){this._captureDrawingPath(pointer);this.canvas.clearContext(this.canvas.contextTop);this._render();},onMouseUp:function onMouseUp(){this._finalizeAndAddPath();},_prepareForDrawing:function _prepareForDrawing(pointer){var p=new fabric.Point(pointer.x,pointer.y);this._reset();this._addPoint(p);this.canvas.contextTop.moveTo(p.x,p.y);},_addPoint:function _addPoint(point){this._points.push(point);},_reset:function _reset(){this._points.length = 0;this._setBrushStyles();this._setShadow();},_captureDrawingPath:function _captureDrawingPath(pointer){var pointerPoint=new fabric.Point(pointer.x,pointer.y);this._addPoint(pointerPoint);},_render:function _render(){var ctx=this.canvas.contextTop,v=this.canvas.viewportTransform,p1=this._points[0],p2=this._points[1];ctx.save();ctx.transform(v[0],v[1],v[2],v[3],v[4],v[5]);ctx.beginPath();if(this._points.length === 2 && p1.x === p2.x && p1.y === p2.y){p1.x -= 0.5;p2.x += 0.5;}ctx.moveTo(p1.x,p1.y);for(var i=1,len=this._points.length;i < len;i++) {var midPoint=p1.midPointFrom(p2);ctx.quadraticCurveTo(p1.x,p1.y,midPoint.x,midPoint.y);p1 = this._points[i];p2 = this._points[i + 1];}ctx.lineTo(p1.x,p1.y);ctx.stroke();ctx.restore();},convertPointsToSVGPath:function convertPointsToSVGPath(points){var path=[],p1=new fabric.Point(points[0].x,points[0].y),p2=new fabric.Point(points[1].x,points[1].y);path.push('M ',points[0].x,' ',points[0].y,' ');for(var i=1,len=points.length;i < len;i++) {var midPoint=p1.midPointFrom(p2);path.push('Q ',p1.x,' ',p1.y,' ',midPoint.x,' ',midPoint.y,' ');p1 = new fabric.Point(points[i].x,points[i].y);if(i + 1 < points.length){p2 = new fabric.Point(points[i + 1].x,points[i + 1].y);}}path.push('L ',p1.x,' ',p1.y,' ');return path;},createPath:function createPath(pathData){var path=new fabric.Path(pathData,{fill:null,stroke:this.color,strokeWidth:this.width,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeDashArray:this.strokeDashArray,originX:'center',originY:'center'});if(this.shadow){this.shadow.affectStroke = true;path.setShadow(this.shadow);}return path;},_finalizeAndAddPath:function _finalizeAndAddPath(){var ctx=this.canvas.contextTop;ctx.closePath();var pathData=this.convertPointsToSVGPath(this._points).join('');if(pathData === 'M 0 0 Q 0 0 0 0 L 0 0'){this.canvas.renderAll();return;}var path=this.createPath(pathData);this.canvas.add(path);path.setCoords();this.canvas.clearContext(this.canvas.contextTop);this._resetShadow();this.canvas.renderAll();this.canvas.fire('path:created',{path:path});}});})();fabric.CircleBrush = fabric.util.createClass(fabric.BaseBrush,{width:10,initialize:function initialize(canvas){this.canvas = canvas;this.points = [];},drawDot:function drawDot(pointer){var point=this.addPoint(pointer),ctx=this.canvas.contextTop,v=this.canvas.viewportTransform;ctx.save();ctx.transform(v[0],v[1],v[2],v[3],v[4],v[5]);ctx.fillStyle = point.fill;ctx.beginPath();ctx.arc(point.x,point.y,point.radius,0,Math.PI * 2,false);ctx.closePath();ctx.fill();ctx.restore();},onMouseDown:function onMouseDown(pointer){this.points.length = 0;this.canvas.clearContext(this.canvas.contextTop);this._setShadow();this.drawDot(pointer);},onMouseMove:function onMouseMove(pointer){this.drawDot(pointer);},onMouseUp:function onMouseUp(){var originalRenderOnAddRemove=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove = false;var circles=[];for(var i=0,len=this.points.length;i < len;i++) {var point=this.points[i],circle=new fabric.Circle({radius:point.radius,left:point.x,top:point.y,originX:'center',originY:'center',fill:point.fill});this.shadow && circle.setShadow(this.shadow);circles.push(circle);}var group=new fabric.Group(circles,{originX:'center',originY:'center'});group.canvas = this.canvas;this.canvas.add(group);this.canvas.fire('path:created',{path:group});this.canvas.clearContext(this.canvas.contextTop);this._resetShadow();this.canvas.renderOnAddRemove = originalRenderOnAddRemove;this.canvas.renderAll();},addPoint:function addPoint(pointer){var pointerPoint=new fabric.Point(pointer.x,pointer.y),circleRadius=fabric.util.getRandomInt(Math.max(0,this.width - 20),this.width + 20) / 2,circleColor=new fabric.Color(this.color).setAlpha(fabric.util.getRandomInt(0,100) / 100).toRgba();pointerPoint.radius = circleRadius;pointerPoint.fill = circleColor;this.points.push(pointerPoint);return pointerPoint;}});fabric.SprayBrush = fabric.util.createClass(fabric.BaseBrush,{width:10,density:20,dotWidth:1,dotWidthVariance:1,randomOpacity:false,optimizeOverlapping:true,initialize:function initialize(canvas){this.canvas = canvas;this.sprayChunks = [];},onMouseDown:function onMouseDown(pointer){this.sprayChunks.length = 0;this.canvas.clearContext(this.canvas.contextTop);this._setShadow();this.addSprayChunk(pointer);this.render();},onMouseMove:function onMouseMove(pointer){this.addSprayChunk(pointer);this.render();},onMouseUp:function onMouseUp(){var originalRenderOnAddRemove=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove = false;var rects=[];for(var i=0,ilen=this.sprayChunks.length;i < ilen;i++) {var sprayChunk=this.sprayChunks[i];for(var j=0,jlen=sprayChunk.length;j < jlen;j++) {var rect=new fabric.Rect({width:sprayChunk[j].width,height:sprayChunk[j].width,left:sprayChunk[j].x + 1,top:sprayChunk[j].y + 1,originX:'center',originY:'center',fill:this.color});this.shadow && rect.setShadow(this.shadow);rects.push(rect);}}if(this.optimizeOverlapping){rects = this._getOptimizedRects(rects);}var group=new fabric.Group(rects,{originX:'center',originY:'center'});group.canvas = this.canvas;this.canvas.add(group);this.canvas.fire('path:created',{path:group});this.canvas.clearContext(this.canvas.contextTop);this._resetShadow();this.canvas.renderOnAddRemove = originalRenderOnAddRemove;this.canvas.renderAll();},_getOptimizedRects:function _getOptimizedRects(rects){var uniqueRects={},key;for(var i=0,len=rects.length;i < len;i++) {key = rects[i].left + '' + rects[i].top;if(!uniqueRects[key]){uniqueRects[key] = rects[i];}}var uniqueRectsArray=[];for(key in uniqueRects) {uniqueRectsArray.push(uniqueRects[key]);}return uniqueRectsArray;},render:function render(){var ctx=this.canvas.contextTop;ctx.fillStyle = this.color;var v=this.canvas.viewportTransform;ctx.save();ctx.transform(v[0],v[1],v[2],v[3],v[4],v[5]);for(var i=0,len=this.sprayChunkPoints.length;i < len;i++) {var point=this.sprayChunkPoints[i];if(typeof point.opacity !== 'undefined'){ctx.globalAlpha = point.opacity;}ctx.fillRect(point.x,point.y,point.width,point.width);}ctx.restore();},addSprayChunk:function addSprayChunk(pointer){this.sprayChunkPoints = [];var x,y,width,radius=this.width / 2;for(var i=0;i < this.density;i++) {x = fabric.util.getRandomInt(pointer.x - radius,pointer.x + radius);y = fabric.util.getRandomInt(pointer.y - radius,pointer.y + radius);if(this.dotWidthVariance){width = fabric.util.getRandomInt(Math.max(1,this.dotWidth - this.dotWidthVariance),this.dotWidth + this.dotWidthVariance);}else {width = this.dotWidth;}var point=new fabric.Point(x,y);point.width = width;if(this.randomOpacity){point.opacity = fabric.util.getRandomInt(0,100) / 100;}this.sprayChunkPoints.push(point);}this.sprayChunks.push(this.sprayChunkPoints);}});fabric.PatternBrush = fabric.util.createClass(fabric.PencilBrush,{getPatternSrc:function getPatternSrc(){var dotWidth=20,dotDistance=5,patternCanvas=fabric.document.createElement('canvas'),patternCtx=patternCanvas.getContext('2d');patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;patternCtx.fillStyle = this.color;patternCtx.beginPath();patternCtx.arc(dotWidth / 2,dotWidth / 2,dotWidth / 2,0,Math.PI * 2,false);patternCtx.closePath();patternCtx.fill();return patternCanvas;},getPatternSrcFunction:function getPatternSrcFunction(){return String(this.getPatternSrc).replace('this.color','"' + this.color + '"');},getPattern:function getPattern(){return this.canvas.contextTop.createPattern(this.source || this.getPatternSrc(),'repeat');},_setBrushStyles:function _setBrushStyles(){this.callSuper('_setBrushStyles');this.canvas.contextTop.strokeStyle = this.getPattern();},createPath:function createPath(pathData){var path=this.callSuper('createPath',pathData);path.stroke = new fabric.Pattern({source:this.source || this.getPatternSrcFunction()});return path;}});(function(){var _getPointer2=fabric.util.getPointer,degreesToRadians=fabric.util.degreesToRadians,radiansToDegrees=fabric.util.radiansToDegrees,atan2=Math.atan2,abs=Math.abs,STROKE_OFFSET=0.5;fabric.Canvas = fabric.util.createClass(fabric.StaticCanvas,{initialize:function initialize(el,options){options || (options = {});this._initStatic(el,options);this._initInteractive();this._createCacheCanvas();fabric.Canvas.activeInstance = this;},uniScaleTransform:false,centeredScaling:false,centeredRotation:false,interactive:true,selection:true,selectionColor:'rgba(100, 100, 255, 0.3)',selectionDashArray:[],selectionBorderColor:'rgba(255, 255, 255, 0.3)',selectionLineWidth:1,hoverCursor:'move',moveCursor:'move',defaultCursor:'default',freeDrawingCursor:'crosshair',rotationCursor:'crosshair',containerClass:'canvas-container',perPixelTargetFind:false,targetFindTolerance:0,skipTargetFind:false,_initInteractive:function _initInteractive(){this._currentTransform = null;this._groupSelector = null;this._initWrapperElement();this._createUpperCanvas();this._initEventListeners();this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this);this.calcOffset();},_resetCurrentTransform:function _resetCurrentTransform(e){var t=this._currentTransform;t.target.set({scaleX:t.original.scaleX,scaleY:t.original.scaleY,left:t.original.left,top:t.original.top});if(this._shouldCenterTransform(e,t.target)){if(t.action === 'rotate'){this._setOriginToCenter(t.target);}else {if(t.originX !== 'center'){if(t.originX === 'right'){t.mouseXSign = -1;}else {t.mouseXSign = 1;}}if(t.originY !== 'center'){if(t.originY === 'bottom'){t.mouseYSign = -1;}else {t.mouseYSign = 1;}}t.originX = 'center';t.originY = 'center';}}else {t.originX = t.original.originX;t.originY = t.original.originY;}},containsPoint:function containsPoint(e,target){var pointer=this.getPointer(e,true),xy=this._normalizePointer(target,pointer);return target.containsPoint(xy) || target._findTargetCorner(pointer);},_normalizePointer:function _normalizePointer(object,pointer){var activeGroup=this.getActiveGroup(),x=pointer.x,y=pointer.y,isObjectInGroup=activeGroup && object.type !== 'group' && activeGroup.contains(object),lt;if(isObjectInGroup){lt = new fabric.Point(activeGroup.left,activeGroup.top);lt = fabric.util.transformPoint(lt,this.viewportTransform,true);x -= lt.x;y -= lt.y;}return {x:x,y:y};},isTargetTransparent:function isTargetTransparent(target,x,y){var hasBorders=target.hasBorders,transparentCorners=target.transparentCorners;target.hasBorders = target.transparentCorners = false;this._draw(this.contextCache,target);target.hasBorders = hasBorders;target.transparentCorners = transparentCorners;var isTransparent=fabric.util.isTransparent(this.contextCache,x,y,this.targetFindTolerance);this.clearContext(this.contextCache);return isTransparent;},_shouldClearSelection:function _shouldClearSelection(e,target){var activeGroup=this.getActiveGroup(),activeObject=this.getActiveObject();return !target || target && activeGroup && !activeGroup.contains(target) && activeGroup !== target && !e.shiftKey || target && !target.evented || target && !target.selectable && activeObject && activeObject !== target;},_shouldCenterTransform:function _shouldCenterTransform(e,target){if(!target){return;}var t=this._currentTransform,centerTransform;if(t.action === 'scale' || t.action === 'scaleX' || t.action === 'scaleY'){centerTransform = this.centeredScaling || target.centeredScaling;}else if(t.action === 'rotate'){centerTransform = this.centeredRotation || target.centeredRotation;}return centerTransform?!e.altKey:e.altKey;},_getOriginFromCorner:function _getOriginFromCorner(target,corner){var origin={x:target.originX,y:target.originY};if(corner === 'ml' || corner === 'tl' || corner === 'bl'){origin.x = 'right';}else if(corner === 'mr' || corner === 'tr' || corner === 'br'){origin.x = 'left';}if(corner === 'tl' || corner === 'mt' || corner === 'tr'){origin.y = 'bottom';}else if(corner === 'bl' || corner === 'mb' || corner === 'br'){origin.y = 'top';}return origin;},_getActionFromCorner:function _getActionFromCorner(target,corner){var action='drag';if(corner){action = corner === 'ml' || corner === 'mr'?'scaleX':corner === 'mt' || corner === 'mb'?'scaleY':corner === 'mtr'?'rotate':'scale';}return action;},_setupCurrentTransform:function _setupCurrentTransform(e,target){if(!target){return;}var pointer=this.getPointer(e),corner=target._findTargetCorner(this.getPointer(e,true)),action=this._getActionFromCorner(target,corner),origin=this._getOriginFromCorner(target,corner);this._currentTransform = {target:target,action:action,scaleX:target.scaleX,scaleY:target.scaleY,offsetX:pointer.x - target.left,offsetY:pointer.y - target.top,originX:origin.x,originY:origin.y,ex:pointer.x,ey:pointer.y,left:target.left,top:target.top,theta:degreesToRadians(target.angle),width:target.width * target.scaleX,mouseXSign:1,mouseYSign:1};this._currentTransform.original = {left:target.left,top:target.top,scaleX:target.scaleX,scaleY:target.scaleY,originX:origin.x,originY:origin.y};this._resetCurrentTransform(e);},_translateObject:function _translateObject(x,y){var target=this._currentTransform.target;if(!target.get('lockMovementX')){target.set('left',x - this._currentTransform.offsetX);}if(!target.get('lockMovementY')){target.set('top',y - this._currentTransform.offsetY);}},_scaleObject:function _scaleObject(x,y,by){var t=this._currentTransform,target=t.target,lockScalingX=target.get('lockScalingX'),lockScalingY=target.get('lockScalingY'),lockScalingFlip=target.get('lockScalingFlip');if(lockScalingX && lockScalingY){return;}var constraintPosition=target.translateToOriginPoint(target.getCenterPoint(),t.originX,t.originY),localMouse=target.toLocalPoint(new fabric.Point(x,y),t.originX,t.originY);this._setLocalMouse(localMouse,t);this._setObjectScale(localMouse,t,lockScalingX,lockScalingY,by,lockScalingFlip);target.setPositionByOrigin(constraintPosition,t.originX,t.originY);},_setObjectScale:function _setObjectScale(localMouse,transform,lockScalingX,lockScalingY,by,lockScalingFlip){var target=transform.target,forbidScalingX=false,forbidScalingY=false,strokeWidth=target.stroke?target.strokeWidth:0;transform.newScaleX = localMouse.x / (target.width + strokeWidth / 2);transform.newScaleY = localMouse.y / (target.height + strokeWidth / 2);if(lockScalingFlip && transform.newScaleX <= 0 && transform.newScaleX < target.scaleX){forbidScalingX = true;}if(lockScalingFlip && transform.newScaleY <= 0 && transform.newScaleY < target.scaleY){forbidScalingY = true;}if(by === 'equally' && !lockScalingX && !lockScalingY){forbidScalingX || forbidScalingY || this._scaleObjectEqually(localMouse,target,transform);}else if(!by){forbidScalingX || lockScalingX || target.set('scaleX',transform.newScaleX);forbidScalingY || lockScalingY || target.set('scaleY',transform.newScaleY);}else if(by === 'x' && !target.get('lockUniScaling')){forbidScalingX || lockScalingX || target.set('scaleX',transform.newScaleX);}else if(by === 'y' && !target.get('lockUniScaling')){forbidScalingY || lockScalingY || target.set('scaleY',transform.newScaleY);}forbidScalingX || forbidScalingY || this._flipObject(transform,by);},_scaleObjectEqually:function _scaleObjectEqually(localMouse,target,transform){var dist=localMouse.y + localMouse.x,strokeWidth=target.stroke?target.strokeWidth:0,lastDist=(target.height + strokeWidth / 2) * transform.original.scaleY + (target.width + strokeWidth / 2) * transform.original.scaleX;transform.newScaleX = transform.original.scaleX * dist / lastDist;transform.newScaleY = transform.original.scaleY * dist / lastDist;target.set('scaleX',transform.newScaleX);target.set('scaleY',transform.newScaleY);},_flipObject:function _flipObject(transform,by){if(transform.newScaleX < 0 && by !== 'y'){if(transform.originX === 'left'){transform.originX = 'right';}else if(transform.originX === 'right'){transform.originX = 'left';}}if(transform.newScaleY < 0 && by !== 'x'){if(transform.originY === 'top'){transform.originY = 'bottom';}else if(transform.originY === 'bottom'){transform.originY = 'top';}}},_setLocalMouse:function _setLocalMouse(localMouse,t){var target=t.target;if(t.originX === 'right'){localMouse.x *= -1;}else if(t.originX === 'center'){localMouse.x *= t.mouseXSign * 2;if(localMouse.x < 0){t.mouseXSign = -t.mouseXSign;}}if(t.originY === 'bottom'){localMouse.y *= -1;}else if(t.originY === 'center'){localMouse.y *= t.mouseYSign * 2;if(localMouse.y < 0){t.mouseYSign = -t.mouseYSign;}}if(abs(localMouse.x) > target.padding){if(localMouse.x < 0){localMouse.x += target.padding;}else {localMouse.x -= target.padding;}}else {localMouse.x = 0;}if(abs(localMouse.y) > target.padding){if(localMouse.y < 0){localMouse.y += target.padding;}else {localMouse.y -= target.padding;}}else {localMouse.y = 0;}},_rotateObject:function _rotateObject(x,y){var t=this._currentTransform;if(t.target.get('lockRotation')){return;}var lastAngle=atan2(t.ey - t.top,t.ex - t.left),curAngle=atan2(y - t.top,x - t.left),angle=radiansToDegrees(curAngle - lastAngle + t.theta);if(angle < 0){angle = 360 + angle;}t.target.angle = angle % 360;},setCursor:function setCursor(value){this.upperCanvasEl.style.cursor = value;},_resetObjectTransform:function _resetObjectTransform(target){target.scaleX = 1;target.scaleY = 1;target.setAngle(0);},_drawSelection:function _drawSelection(){var ctx=this.contextTop,groupSelector=this._groupSelector,left=groupSelector.left,top=groupSelector.top,aleft=abs(left),atop=abs(top);ctx.fillStyle = this.selectionColor;ctx.fillRect(groupSelector.ex - (left > 0?0:-left),groupSelector.ey - (top > 0?0:-top),aleft,atop);ctx.lineWidth = this.selectionLineWidth;ctx.strokeStyle = this.selectionBorderColor;if(this.selectionDashArray.length > 1){var px=groupSelector.ex + STROKE_OFFSET - (left > 0?0:aleft),py=groupSelector.ey + STROKE_OFFSET - (top > 0?0:atop);ctx.beginPath();fabric.util.drawDashedLine(ctx,px,py,px + aleft,py,this.selectionDashArray);fabric.util.drawDashedLine(ctx,px,py + atop - 1,px + aleft,py + atop - 1,this.selectionDashArray);fabric.util.drawDashedLine(ctx,px,py,px,py + atop,this.selectionDashArray);fabric.util.drawDashedLine(ctx,px + aleft - 1,py,px + aleft - 1,py + atop,this.selectionDashArray);ctx.closePath();ctx.stroke();}else {ctx.strokeRect(groupSelector.ex + STROKE_OFFSET - (left > 0?0:aleft),groupSelector.ey + STROKE_OFFSET - (top > 0?0:atop),aleft,atop);}},_isLastRenderedObject:function _isLastRenderedObject(e){return this.controlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay.visible && this.containsPoint(e,this.lastRenderedObjectWithControlsAboveOverlay) && this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(this.getPointer(e,true));},findTarget:function findTarget(e,skipGroup){if(this.skipTargetFind){return;}if(this._isLastRenderedObject(e)){return this.lastRenderedObjectWithControlsAboveOverlay;}var activeGroup=this.getActiveGroup();if(activeGroup && !skipGroup && this.containsPoint(e,activeGroup)){return activeGroup;}var target=this._searchPossibleTargets(e);this._fireOverOutEvents(target);return target;},_fireOverOutEvents:function _fireOverOutEvents(target){if(target){if(this._hoveredTarget !== target){this.fire('mouse:over',{target:target});target.fire('mouseover');if(this._hoveredTarget){this.fire('mouse:out',{target:this._hoveredTarget});this._hoveredTarget.fire('mouseout');}this._hoveredTarget = target;}}else if(this._hoveredTarget){this.fire('mouse:out',{target:this._hoveredTarget});this._hoveredTarget.fire('mouseout');this._hoveredTarget = null;}},_checkTarget:function _checkTarget(e,obj,pointer){if(obj && obj.visible && obj.evented && this.containsPoint(e,obj)){if((this.perPixelTargetFind || obj.perPixelTargetFind) && !obj.isEditing){var isTransparent=this.isTargetTransparent(obj,pointer.x,pointer.y);if(!isTransparent){return true;}}else {return true;}}},_searchPossibleTargets:function _searchPossibleTargets(e){var target,pointer=this.getPointer(e,true),i=this._objects.length;while(i--) {if(!this._objects[i].group && this._checkTarget(e,this._objects[i],pointer)){this.relatedTarget = this._objects[i];target = this._objects[i];break;}}return target;},getPointer:function getPointer(e,ignoreZoom,upperCanvasEl){if(!upperCanvasEl){upperCanvasEl = this.upperCanvasEl;}var pointer=_getPointer2(e,upperCanvasEl),bounds=upperCanvasEl.getBoundingClientRect(),boundsWidth=bounds.width || 0,boundsHeight=bounds.height || 0,cssScale;if(!boundsWidth || !boundsHeight){if('top' in bounds && 'bottom' in bounds){boundsHeight = Math.abs(bounds.top - bounds.bottom);}if('right' in bounds && 'left' in bounds){boundsWidth = Math.abs(bounds.right - bounds.left);}}this.calcOffset();pointer.x = pointer.x - this._offset.left;pointer.y = pointer.y - this._offset.top;if(!ignoreZoom){pointer = fabric.util.transformPoint(pointer,fabric.util.invertTransform(this.viewportTransform));}if(boundsWidth === 0 || boundsHeight === 0){cssScale = {width:1,height:1};}else {cssScale = {width:upperCanvasEl.width / boundsWidth,height:upperCanvasEl.height / boundsHeight};}return {x:pointer.x * cssScale.width,y:pointer.y * cssScale.height};},_createUpperCanvas:function _createUpperCanvas(){var lowerCanvasClass=this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/,'');this.upperCanvasEl = this._createCanvasElement();fabric.util.addClass(this.upperCanvasEl,'upper-canvas ' + lowerCanvasClass);this.wrapperEl.appendChild(this.upperCanvasEl);this._copyCanvasStyle(this.lowerCanvasEl,this.upperCanvasEl);this._applyCanvasStyle(this.upperCanvasEl);this.contextTop = this.upperCanvasEl.getContext('2d');},_createCacheCanvas:function _createCacheCanvas(){this.cacheCanvasEl = this._createCanvasElement();this.cacheCanvasEl.setAttribute('width',this.width);this.cacheCanvasEl.setAttribute('height',this.height);this.contextCache = this.cacheCanvasEl.getContext('2d');},_initWrapperElement:function _initWrapperElement(){this.wrapperEl = fabric.util.wrapElement(this.lowerCanvasEl,'div',{'class':this.containerClass});fabric.util.setStyle(this.wrapperEl,{width:this.getWidth() + 'px',height:this.getHeight() + 'px',position:'relative'});fabric.util.makeElementUnselectable(this.wrapperEl);},_applyCanvasStyle:function _applyCanvasStyle(element){var width=this.getWidth() || element.width,height=this.getHeight() || element.height;fabric.util.setStyle(element,{position:'absolute',width:width + 'px',height:height + 'px',left:0,top:0});element.width = width;element.height = height;fabric.util.makeElementUnselectable(element);},_copyCanvasStyle:function _copyCanvasStyle(fromEl,toEl){toEl.style.cssText = fromEl.style.cssText;},getSelectionContext:function getSelectionContext(){return this.contextTop;},getSelectionElement:function getSelectionElement(){return this.upperCanvasEl;},_setActiveObject:function _setActiveObject(object){if(this._activeObject){this._activeObject.set('active',false);}this._activeObject = object;object.set('active',true);},setActiveObject:function setActiveObject(object,e){this._setActiveObject(object);this.renderAll();this.fire('object:selected',{target:object,e:e});object.fire('selected',{e:e});return this;},getActiveObject:function getActiveObject(){return this._activeObject;},_discardActiveObject:function _discardActiveObject(){if(this._activeObject){this._activeObject.set('active',false);}this._activeObject = null;},discardActiveObject:function discardActiveObject(e){this._discardActiveObject();this.renderAll();this.fire('selection:cleared',{e:e});return this;},_setActiveGroup:function _setActiveGroup(group){this._activeGroup = group;if(group){group.set('active',true);}},setActiveGroup:function setActiveGroup(group,e){this._setActiveGroup(group);if(group){this.fire('object:selected',{target:group,e:e});group.fire('selected',{e:e});}return this;},getActiveGroup:function getActiveGroup(){return this._activeGroup;},_discardActiveGroup:function _discardActiveGroup(){var g=this.getActiveGroup();if(g){g.destroy();}this.setActiveGroup(null);},discardActiveGroup:function discardActiveGroup(e){this._discardActiveGroup();this.fire('selection:cleared',{e:e});return this;},deactivateAll:function deactivateAll(){var allObjects=this.getObjects(),i=0,len=allObjects.length;for(;i < len;i++) {allObjects[i].set('active',false);}this._discardActiveGroup();this._discardActiveObject();return this;},deactivateAllWithDispatch:function deactivateAllWithDispatch(e){var activeObject=this.getActiveGroup() || this.getActiveObject();if(activeObject){this.fire('before:selection:cleared',{target:activeObject,e:e});}this.deactivateAll();if(activeObject){this.fire('selection:cleared',{e:e});}return this;},drawControls:function drawControls(ctx){var activeGroup=this.getActiveGroup();if(activeGroup){this._drawGroupControls(ctx,activeGroup);}else {this._drawObjectsControls(ctx);}},_drawGroupControls:function _drawGroupControls(ctx,activeGroup){activeGroup._renderControls(ctx);},_drawObjectsControls:function _drawObjectsControls(ctx){for(var i=0,len=this._objects.length;i < len;++i) {if(!this._objects[i] || !this._objects[i].active){continue;}this._objects[i]._renderControls(ctx);this.lastRenderedObjectWithControlsAboveOverlay = this._objects[i];}}});for(var prop in fabric.StaticCanvas) {if(prop !== 'prototype'){fabric.Canvas[prop] = fabric.StaticCanvas[prop];}}if(fabric.isTouchSupported){fabric.Canvas.prototype._setCursorFromEvent = function(){};}fabric.Element = fabric.Canvas;})();(function(){var cursorOffset={mt:0,tr:1,mr:2,br:3,mb:4,bl:5,ml:6,tl:7},addListener=fabric.util.addListener,removeListener=fabric.util.removeListener;fabric.util.object.extend(fabric.Canvas.prototype,{cursorMap:['n-resize','ne-resize','e-resize','se-resize','s-resize','sw-resize','w-resize','nw-resize'],_initEventListeners:function _initEventListeners(){this._bindEvents();addListener(fabric.window,'resize',this._onResize);addListener(this.upperCanvasEl,'mousedown',this._onMouseDown);addListener(this.upperCanvasEl,'mousemove',this._onMouseMove);addListener(this.upperCanvasEl,'mousewheel',this._onMouseWheel);addListener(this.upperCanvasEl,'touchstart',this._onMouseDown);addListener(this.upperCanvasEl,'touchmove',this._onMouseMove);if(typeof eventjs !== 'undefined' && 'add' in eventjs){eventjs.add(this.upperCanvasEl,'gesture',this._onGesture);eventjs.add(this.upperCanvasEl,'drag',this._onDrag);eventjs.add(this.upperCanvasEl,'orientation',this._onOrientationChange);eventjs.add(this.upperCanvasEl,'shake',this._onShake);eventjs.add(this.upperCanvasEl,'longpress',this._onLongPress);}},_bindEvents:function _bindEvents(){this._onMouseDown = this._onMouseDown.bind(this);this._onMouseMove = this._onMouseMove.bind(this);this._onMouseUp = this._onMouseUp.bind(this);this._onResize = this._onResize.bind(this);this._onGesture = this._onGesture.bind(this);this._onDrag = this._onDrag.bind(this);this._onShake = this._onShake.bind(this);this._onLongPress = this._onLongPress.bind(this);this._onOrientationChange = this._onOrientationChange.bind(this);this._onMouseWheel = this._onMouseWheel.bind(this);},removeListeners:function removeListeners(){removeListener(fabric.window,'resize',this._onResize);removeListener(this.upperCanvasEl,'mousedown',this._onMouseDown);removeListener(this.upperCanvasEl,'mousemove',this._onMouseMove);removeListener(this.upperCanvasEl,'mousewheel',this._onMouseWheel);removeListener(this.upperCanvasEl,'touchstart',this._onMouseDown);removeListener(this.upperCanvasEl,'touchmove',this._onMouseMove);if(typeof eventjs !== 'undefined' && 'remove' in eventjs){eventjs.remove(this.upperCanvasEl,'gesture',this._onGesture);eventjs.remove(this.upperCanvasEl,'drag',this._onDrag);eventjs.remove(this.upperCanvasEl,'orientation',this._onOrientationChange);eventjs.remove(this.upperCanvasEl,'shake',this._onShake);eventjs.remove(this.upperCanvasEl,'longpress',this._onLongPress);}},_onGesture:function _onGesture(e,self){this.__onTransformGesture && this.__onTransformGesture(e,self);},_onDrag:function _onDrag(e,self){this.__onDrag && this.__onDrag(e,self);},_onMouseWheel:function _onMouseWheel(e,self){this.__onMouseWheel && this.__onMouseWheel(e,self);},_onOrientationChange:function _onOrientationChange(e,self){this.__onOrientationChange && this.__onOrientationChange(e,self);},_onShake:function _onShake(e,self){this.__onShake && this.__onShake(e,self);},_onLongPress:function _onLongPress(e,self){this.__onLongPress && this.__onLongPress(e,self);},_onMouseDown:function _onMouseDown(e){this.__onMouseDown(e);addListener(fabric.document,'touchend',this._onMouseUp);addListener(fabric.document,'touchmove',this._onMouseMove);removeListener(this.upperCanvasEl,'mousemove',this._onMouseMove);removeListener(this.upperCanvasEl,'touchmove',this._onMouseMove);if(e.type === 'touchstart'){removeListener(this.upperCanvasEl,'mousedown',this._onMouseDown);}else {addListener(fabric.document,'mouseup',this._onMouseUp);addListener(fabric.document,'mousemove',this._onMouseMove);}},_onMouseUp:function _onMouseUp(e){this.__onMouseUp(e);removeListener(fabric.document,'mouseup',this._onMouseUp);removeListener(fabric.document,'touchend',this._onMouseUp);removeListener(fabric.document,'mousemove',this._onMouseMove);removeListener(fabric.document,'touchmove',this._onMouseMove);addListener(this.upperCanvasEl,'mousemove',this._onMouseMove);addListener(this.upperCanvasEl,'touchmove',this._onMouseMove);if(e.type === 'touchend'){var _this=this;setTimeout(function(){addListener(_this.upperCanvasEl,'mousedown',_this._onMouseDown);},400);}},_onMouseMove:function _onMouseMove(e){!this.allowTouchScrolling && e.preventDefault && e.preventDefault();this.__onMouseMove(e);},_onResize:function _onResize(){this.calcOffset();},_shouldRender:function _shouldRender(target,pointer){var activeObject=this.getActiveGroup() || this.getActiveObject();return !!(target && (target.isMoving || target !== activeObject) || !target && !!activeObject || !target && !activeObject && !this._groupSelector || pointer && this._previousPointer && this.selection && (pointer.x !== this._previousPointer.x || pointer.y !== this._previousPointer.y));},__onMouseUp:function __onMouseUp(e){var target;if(this.isDrawingMode && this._isCurrentlyDrawing){this._onMouseUpInDrawingMode(e);return;}if(this._currentTransform){this._finalizeCurrentTransform();target = this._currentTransform.target;}else {target = this.findTarget(e,true);}var shouldRender=this._shouldRender(target,this.getPointer(e));this._maybeGroupObjects(e);if(target){target.isMoving = false;}shouldRender && this.renderAll();this._handleCursorAndEvent(e,target);},_handleCursorAndEvent:function _handleCursorAndEvent(e,target){this._setCursorFromEvent(e,target);var _this=this;setTimeout(function(){_this._setCursorFromEvent(e,target);},50);this.fire('mouse:up',{target:target,e:e});target && target.fire('mouseup',{e:e});},_finalizeCurrentTransform:function _finalizeCurrentTransform(){var transform=this._currentTransform,target=transform.target;if(target._scaling){target._scaling = false;}target.setCoords();if(this.stateful && target.hasStateChanged()){this.fire('object:modified',{target:target});target.fire('modified');}this._restoreOriginXY(target);},_restoreOriginXY:function _restoreOriginXY(target){if(this._previousOriginX && this._previousOriginY){var originPoint=target.translateToOriginPoint(target.getCenterPoint(),this._previousOriginX,this._previousOriginY);target.originX = this._previousOriginX;target.originY = this._previousOriginY;target.left = originPoint.x;target.top = originPoint.y;this._previousOriginX = null;this._previousOriginY = null;}},_onMouseDownInDrawingMode:function _onMouseDownInDrawingMode(e){this._isCurrentlyDrawing = true;this.discardActiveObject(e).renderAll();if(this.clipTo){fabric.util.clipContext(this,this.contextTop);}var ivt=fabric.util.invertTransform(this.viewportTransform),pointer=fabric.util.transformPoint(this.getPointer(e,true),ivt);this.freeDrawingBrush.onMouseDown(pointer);this.fire('mouse:down',{e:e});var target=this.findTarget(e);if(typeof target !== 'undefined'){target.fire('mousedown',{e:e,target:target});}},_onMouseMoveInDrawingMode:function _onMouseMoveInDrawingMode(e){if(this._isCurrentlyDrawing){var ivt=fabric.util.invertTransform(this.viewportTransform),pointer=fabric.util.transformPoint(this.getPointer(e,true),ivt);this.freeDrawingBrush.onMouseMove(pointer);}this.setCursor(this.freeDrawingCursor);this.fire('mouse:move',{e:e});var target=this.findTarget(e);if(typeof target !== 'undefined'){target.fire('mousemove',{e:e,target:target});}},_onMouseUpInDrawingMode:function _onMouseUpInDrawingMode(e){this._isCurrentlyDrawing = false;if(this.clipTo){this.contextTop.restore();}this.freeDrawingBrush.onMouseUp();this.fire('mouse:up',{e:e});var target=this.findTarget(e);if(typeof target !== 'undefined'){target.fire('mouseup',{e:e,target:target});}},__onMouseDown:function __onMouseDown(e){var isLeftClick='which' in e?e.which === 1:e.button === 1;if(!isLeftClick && !fabric.isTouchSupported){return;}if(this.isDrawingMode){this._onMouseDownInDrawingMode(e);return;}if(this._currentTransform){return;}var target=this.findTarget(e),pointer=this.getPointer(e,true);this._previousPointer = pointer;var shouldRender=this._shouldRender(target,pointer),shouldGroup=this._shouldGroup(e,target);if(this._shouldClearSelection(e,target)){this._clearSelection(e,target,pointer);}else if(shouldGroup){this._handleGrouping(e,target);target = this.getActiveGroup();}if(target && target.selectable && !shouldGroup){this._beforeTransform(e,target);this._setupCurrentTransform(e,target);}shouldRender && this.renderAll();this.fire('mouse:down',{target:target,e:e});target && target.fire('mousedown',{e:e});},_beforeTransform:function _beforeTransform(e,target){this.stateful && target.saveState();if(target._findTargetCorner(this.getPointer(e))){this.onBeforeScaleRotate(target);}if(target !== this.getActiveGroup() && target !== this.getActiveObject()){this.deactivateAll();this.setActiveObject(target,e);}},_clearSelection:function _clearSelection(e,target,pointer){this.deactivateAllWithDispatch(e);if(target && target.selectable){this.setActiveObject(target,e);}else if(this.selection){this._groupSelector = {ex:pointer.x,ey:pointer.y,top:0,left:0};}},_setOriginToCenter:function _setOriginToCenter(target){this._previousOriginX = this._currentTransform.target.originX;this._previousOriginY = this._currentTransform.target.originY;var center=target.getCenterPoint();target.originX = 'center';target.originY = 'center';target.left = center.x;target.top = center.y;this._currentTransform.left = target.left;this._currentTransform.top = target.top;},_setCenterToOrigin:function _setCenterToOrigin(target){var originPoint=target.translateToOriginPoint(target.getCenterPoint(),this._previousOriginX,this._previousOriginY);target.originX = this._previousOriginX;target.originY = this._previousOriginY;target.left = originPoint.x;target.top = originPoint.y;this._previousOriginX = null;this._previousOriginY = null;},__onMouseMove:function __onMouseMove(e){var target,pointer;if(this.isDrawingMode){this._onMouseMoveInDrawingMode(e);return;}if(typeof e.touches !== 'undefined' && e.touches.length > 1){return;}var groupSelector=this._groupSelector;if(groupSelector){pointer = this.getPointer(e,true);groupSelector.left = pointer.x - groupSelector.ex;groupSelector.top = pointer.y - groupSelector.ey;this.renderTop();}else if(!this._currentTransform){target = this.findTarget(e);if(!target || target && !target.selectable){this.setCursor(this.defaultCursor);}else {this._setCursorFromEvent(e,target);}}else {this._transformObject(e);}this.fire('mouse:move',{target:target,e:e});target && target.fire('mousemove',{e:e});},_transformObject:function _transformObject(e){var pointer=this.getPointer(e),transform=this._currentTransform;transform.reset = false,transform.target.isMoving = true;this._beforeScaleTransform(e,transform);this._performTransformAction(e,transform,pointer);this.renderAll();},_performTransformAction:function _performTransformAction(e,transform,pointer){var x=pointer.x,y=pointer.y,target=transform.target,action=transform.action;if(action === 'rotate'){this._rotateObject(x,y);this._fire('rotating',target,e);}else if(action === 'scale'){this._onScale(e,transform,x,y);this._fire('scaling',target,e);}else if(action === 'scaleX'){this._scaleObject(x,y,'x');this._fire('scaling',target,e);}else if(action === 'scaleY'){this._scaleObject(x,y,'y');this._fire('scaling',target,e);}else {this._translateObject(x,y);this._fire('moving',target,e);this.setCursor(this.moveCursor);}},_fire:function _fire(eventName,target,e){this.fire('object:' + eventName,{target:target,e:e});target.fire(eventName,{e:e});},_beforeScaleTransform:function _beforeScaleTransform(e,transform){if(transform.action === 'scale' || transform.action === 'scaleX' || transform.action === 'scaleY'){var centerTransform=this._shouldCenterTransform(e,transform.target);if(centerTransform && (transform.originX !== 'center' || transform.originY !== 'center') || !centerTransform && transform.originX === 'center' && transform.originY === 'center'){this._resetCurrentTransform(e);transform.reset = true;}}},_onScale:function _onScale(e,transform,x,y){if((e.shiftKey || this.uniScaleTransform) && !transform.target.get('lockUniScaling')){transform.currentAction = 'scale';this._scaleObject(x,y);}else {if(!transform.reset && transform.currentAction === 'scale'){this._resetCurrentTransform(e,transform.target);}transform.currentAction = 'scaleEqually';this._scaleObject(x,y,'equally');}},_setCursorFromEvent:function _setCursorFromEvent(e,target){if(!target || !target.selectable){this.setCursor(this.defaultCursor);return false;}else {var activeGroup=this.getActiveGroup(),corner=target._findTargetCorner && (!activeGroup || !activeGroup.contains(target)) && target._findTargetCorner(this.getPointer(e,true));if(!corner){this.setCursor(target.hoverCursor || this.hoverCursor);}else {this._setCornerCursor(corner,target);}}return true;},_setCornerCursor:function _setCornerCursor(corner,target){if(corner in cursorOffset){this.setCursor(this._getRotatedCornerCursor(corner,target));}else if(corner === 'mtr' && target.hasRotatingPoint){this.setCursor(this.rotationCursor);}else {this.setCursor(this.defaultCursor);return false;}},_getRotatedCornerCursor:function _getRotatedCornerCursor(corner,target){var n=Math.round(target.getAngle() % 360 / 45);if(n < 0){n += 8;}n += cursorOffset[corner];n %= 8;return this.cursorMap[n];}});})();(function(){var min=Math.min,max=Math.max;fabric.util.object.extend(fabric.Canvas.prototype,{_shouldGroup:function _shouldGroup(e,target){var activeObject=this.getActiveObject();return e.shiftKey && (this.getActiveGroup() || activeObject && activeObject !== target) && this.selection;},_handleGrouping:function _handleGrouping(e,target){if(target === this.getActiveGroup()){target = this.findTarget(e,true);if(!target || target.isType('group')){return;}}if(this.getActiveGroup()){this._updateActiveGroup(target,e);}else {this._createActiveGroup(target,e);}if(this._activeGroup){this._activeGroup.saveCoords();}},_updateActiveGroup:function _updateActiveGroup(target,e){var activeGroup=this.getActiveGroup();if(activeGroup.contains(target)){activeGroup.removeWithUpdate(target);this._resetObjectTransform(activeGroup);target.set('active',false);if(activeGroup.size() === 1){this.discardActiveGroup(e);this.setActiveObject(activeGroup.item(0));return;}}else {activeGroup.addWithUpdate(target);this._resetObjectTransform(activeGroup);}this.fire('selection:created',{target:activeGroup,e:e});activeGroup.set('active',true);},_createActiveGroup:function _createActiveGroup(target,e){if(this._activeObject && target !== this._activeObject){var group=this._createGroup(target);group.addWithUpdate();this.setActiveGroup(group);this._activeObject = null;this.fire('selection:created',{target:group,e:e});}target.set('active',true);},_createGroup:function _createGroup(target){var objects=this.getObjects(),isActiveLower=objects.indexOf(this._activeObject) < objects.indexOf(target),groupObjects=isActiveLower?[this._activeObject,target]:[target,this._activeObject];return new fabric.Group(groupObjects,{canvas:this});},_groupSelectedObjects:function _groupSelectedObjects(e){var group=this._collectObjects();if(group.length === 1){this.setActiveObject(group[0],e);}else if(group.length > 1){group = new fabric.Group(group.reverse(),{canvas:this});group.addWithUpdate();this.setActiveGroup(group,e);group.saveCoords();this.fire('selection:created',{target:group});this.renderAll();}},_collectObjects:function _collectObjects(){var group=[],currentObject,x1=this._groupSelector.ex,y1=this._groupSelector.ey,x2=x1 + this._groupSelector.left,y2=y1 + this._groupSelector.top,selectionX1Y1=new fabric.Point(min(x1,x2),min(y1,y2)),selectionX2Y2=new fabric.Point(max(x1,x2),max(y1,y2)),isClick=x1 === x2 && y1 === y2;for(var i=this._objects.length;i--;) {currentObject = this._objects[i];if(!currentObject || !currentObject.selectable || !currentObject.visible){continue;}if(currentObject.intersectsWithRect(selectionX1Y1,selectionX2Y2) || currentObject.isContainedWithinRect(selectionX1Y1,selectionX2Y2) || currentObject.containsPoint(selectionX1Y1) || currentObject.containsPoint(selectionX2Y2)){currentObject.set('active',true);group.push(currentObject);if(isClick){break;}}}return group;},_maybeGroupObjects:function _maybeGroupObjects(e){if(this.selection && this._groupSelector){this._groupSelectedObjects(e);}var activeGroup=this.getActiveGroup();if(activeGroup){activeGroup.setObjectsCoords().setCoords();activeGroup.isMoving = false;this.setCursor(this.defaultCursor);}this._groupSelector = null;this._currentTransform = null;}});})();fabric.util.object.extend(fabric.StaticCanvas.prototype,{toDataURL:function toDataURL(options){options || (options = {});var format=options.format || 'png',quality=options.quality || 1,multiplier=options.multiplier || 1,cropping={left:options.left,top:options.top,width:options.width,height:options.height};if(multiplier !== 1){return this.__toDataURLWithMultiplier(format,quality,cropping,multiplier);}else {return this.__toDataURL(format,quality,cropping);}},__toDataURL:function __toDataURL(format,quality,cropping){this.renderAll(true);var canvasEl=this.upperCanvasEl || this.lowerCanvasEl,croppedCanvasEl=this.__getCroppedCanvas(canvasEl,cropping);if(format === 'jpg'){format = 'jpeg';}var data=fabric.StaticCanvas.supports('toDataURLWithQuality')?(croppedCanvasEl || canvasEl).toDataURL('image/' + format,quality):(croppedCanvasEl || canvasEl).toDataURL('image/' + format);this.contextTop && this.clearContext(this.contextTop);this.renderAll();if(croppedCanvasEl){croppedCanvasEl = null;}return data;},__getCroppedCanvas:function __getCroppedCanvas(canvasEl,cropping){var croppedCanvasEl,croppedCtx,shouldCrop='left' in cropping || 'top' in cropping || 'width' in cropping || 'height' in cropping;if(shouldCrop){croppedCanvasEl = fabric.util.createCanvasElement();croppedCtx = croppedCanvasEl.getContext('2d');croppedCanvasEl.width = cropping.width || this.width;croppedCanvasEl.height = cropping.height || this.height;croppedCtx.drawImage(canvasEl,-cropping.left || 0,-cropping.top || 0);}return croppedCanvasEl;},__toDataURLWithMultiplier:function __toDataURLWithMultiplier(format,quality,cropping,multiplier){var origWidth=this.getWidth(),origHeight=this.getHeight(),scaledWidth=origWidth * multiplier,scaledHeight=origHeight * multiplier,activeObject=this.getActiveObject(),activeGroup=this.getActiveGroup(),ctx=this.contextTop || this.contextContainer;if(multiplier > 1){this.setWidth(scaledWidth).setHeight(scaledHeight);}ctx.scale(multiplier,multiplier);if(cropping.left){cropping.left *= multiplier;}if(cropping.top){cropping.top *= multiplier;}if(cropping.width){cropping.width *= multiplier;}else if(multiplier < 1){cropping.width = scaledWidth;}if(cropping.height){cropping.height *= multiplier;}else if(multiplier < 1){cropping.height = scaledHeight;}if(activeGroup){this._tempRemoveBordersControlsFromGroup(activeGroup);}else if(activeObject && this.deactivateAll){this.deactivateAll();}this.renderAll(true);var data=this.__toDataURL(format,quality,cropping);this.width = origWidth;this.height = origHeight;ctx.scale(1 / multiplier,1 / multiplier);this.setWidth(origWidth).setHeight(origHeight);if(activeGroup){this._restoreBordersControlsOnGroup(activeGroup);}else if(activeObject && this.setActiveObject){this.setActiveObject(activeObject);}this.contextTop && this.clearContext(this.contextTop);this.renderAll();return data;},toDataURLWithMultiplier:function toDataURLWithMultiplier(format,multiplier,quality){return this.toDataURL({format:format,multiplier:multiplier,quality:quality});},_tempRemoveBordersControlsFromGroup:function _tempRemoveBordersControlsFromGroup(group){group.origHasControls = group.hasControls;group.origBorderColor = group.borderColor;group.hasControls = true;group.borderColor = 'rgba(0,0,0,0)';group.forEachObject(function(o){o.origBorderColor = o.borderColor;o.borderColor = 'rgba(0,0,0,0)';});},_restoreBordersControlsOnGroup:function _restoreBordersControlsOnGroup(group){group.hideControls = group.origHideControls;group.borderColor = group.origBorderColor;group.forEachObject(function(o){o.borderColor = o.origBorderColor;delete o.origBorderColor;});}});fabric.util.object.extend(fabric.StaticCanvas.prototype,{loadFromDatalessJSON:function loadFromDatalessJSON(json,callback,reviver){return this.loadFromJSON(json,callback,reviver);},loadFromJSON:function loadFromJSON(json,callback,reviver){if(!json){return;}var serialized=typeof json === 'string'?JSON.parse(json):json;this.clear();var _this=this;this._enlivenObjects(serialized.objects,function(){_this._setBgOverlay(serialized,callback);},reviver);return this;},_setBgOverlay:function _setBgOverlay(serialized,callback){var _this=this,loaded={backgroundColor:false,overlayColor:false,backgroundImage:false,overlayImage:false};if(!serialized.backgroundImage && !serialized.overlayImage && !serialized.background && !serialized.overlay){callback && callback();return;}var cbIfLoaded=function cbIfLoaded(){if(loaded.backgroundImage && loaded.overlayImage && loaded.backgroundColor && loaded.overlayColor){_this.renderAll();callback && callback();}};this.__setBgOverlay('backgroundImage',serialized.backgroundImage,loaded,cbIfLoaded);this.__setBgOverlay('overlayImage',serialized.overlayImage,loaded,cbIfLoaded);this.__setBgOverlay('backgroundColor',serialized.background,loaded,cbIfLoaded);this.__setBgOverlay('overlayColor',serialized.overlay,loaded,cbIfLoaded);cbIfLoaded();},__setBgOverlay:function __setBgOverlay(property,value,loaded,callback){var _this=this;if(!value){loaded[property] = true;return;}if(property === 'backgroundImage' || property === 'overlayImage'){fabric.Image.fromObject(value,function(img){_this[property] = img;loaded[property] = true;callback && callback();});}else {this['set' + fabric.util.string.capitalize(property,true)](value,function(){loaded[property] = true;callback && callback();});}},_enlivenObjects:function _enlivenObjects(objects,callback,reviver){var _this=this;if(!objects || objects.length === 0){callback && callback();return;}var renderOnAddRemove=this.renderOnAddRemove;this.renderOnAddRemove = false;fabric.util.enlivenObjects(objects,function(enlivenedObjects){enlivenedObjects.forEach(function(obj,index){_this.insertAt(obj,index,true);});_this.renderOnAddRemove = renderOnAddRemove;callback && callback();},null,reviver);},_toDataURL:function _toDataURL(format,callback){this.clone(function(clone){callback(clone.toDataURL(format));});},_toDataURLWithMultiplier:function _toDataURLWithMultiplier(format,multiplier,callback){this.clone(function(clone){callback(clone.toDataURLWithMultiplier(format,multiplier));});},clone:function clone(callback,properties){var data=JSON.stringify(this.toJSON(properties));this.cloneWithoutData(function(clone){clone.loadFromJSON(data,function(){callback && callback(clone);});});},cloneWithoutData:function cloneWithoutData(callback){var el=fabric.document.createElement('canvas');el.width = this.getWidth();el.height = this.getHeight();var clone=new fabric.Canvas(el);clone.clipTo = this.clipTo;if(this.backgroundImage){clone.setBackgroundImage(this.backgroundImage.src,function(){clone.renderAll();callback && callback(clone);});clone.backgroundImageOpacity = this.backgroundImageOpacity;clone.backgroundImageStretch = this.backgroundImageStretch;}else {callback && callback(clone);}}});(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend,toFixed=fabric.util.toFixed,capitalize=fabric.util.string.capitalize,degreesToRadians=fabric.util.degreesToRadians,supportsLineDash=fabric.StaticCanvas.supports('setLineDash');if(fabric.Object){return;}fabric.Object = fabric.util.createClass({type:'object',originX:'left',originY:'top',top:0,left:0,width:0,height:0,scaleX:1,scaleY:1,flipX:false,flipY:false,opacity:1,angle:0,cornerSize:12,transparentCorners:true,hoverCursor:null,padding:0,borderColor:'rgba(102,153,255,0.75)',cornerColor:'rgba(102,153,255,0.5)',centeredScaling:false,centeredRotation:true,fill:'rgb(0,0,0)',fillRule:'nonzero',globalCompositeOperation:'source-over',backgroundColor:'',stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:'butt',strokeLineJoin:'miter',strokeMiterLimit:10,shadow:null,borderOpacityWhenMoving:0.4,borderScaleFactor:1,transformMatrix:null,minScaleLimit:0.01,selectable:true,evented:true,visible:true,hasControls:true,hasBorders:true,hasRotatingPoint:true,rotatingPointOffset:40,perPixelTargetFind:false,includeDefaultValues:true,clipTo:null,lockMovementX:false,lockMovementY:false,lockRotation:false,lockScalingX:false,lockScalingY:false,lockUniScaling:false,lockScalingFlip:false,stateProperties:('top left width height scaleX scaleY flipX flipY originX originY transformMatrix ' + 'stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit ' + 'angle opacity fill fillRule globalCompositeOperation shadow clipTo visible backgroundColor').split(' '),initialize:function initialize(options){if(options){this.setOptions(options);}},_initGradient:function _initGradient(options){if(options.fill && options.fill.colorStops && !(options.fill instanceof fabric.Gradient)){this.set('fill',new fabric.Gradient(options.fill));}},_initPattern:function _initPattern(options){if(options.fill && options.fill.source && !(options.fill instanceof fabric.Pattern)){this.set('fill',new fabric.Pattern(options.fill));}if(options.stroke && options.stroke.source && !(options.stroke instanceof fabric.Pattern)){this.set('stroke',new fabric.Pattern(options.stroke));}},_initClipping:function _initClipping(options){if(!options.clipTo || typeof options.clipTo !== 'string'){return;}var functionBody=fabric.util.getFunctionBody(options.clipTo);if(typeof functionBody !== 'undefined'){this.clipTo = new Function('ctx',functionBody);}},setOptions:function setOptions(options){for(var prop in options) {this.set(prop,options[prop]);}this._initGradient(options);this._initPattern(options);this._initClipping(options);},transform:function transform(ctx,fromLeft){var center=fromLeft?this._getLeftTopCoords():this.getCenterPoint();ctx.translate(center.x,center.y);ctx.rotate(degreesToRadians(this.angle));ctx.scale(this.scaleX * (this.flipX?-1:1),this.scaleY * (this.flipY?-1:1));},toObject:function toObject(propertiesToInclude){var NUM_FRACTION_DIGITS=fabric.Object.NUM_FRACTION_DIGITS,object={type:this.type,originX:this.originX,originY:this.originY,left:toFixed(this.left,NUM_FRACTION_DIGITS),top:toFixed(this.top,NUM_FRACTION_DIGITS),width:toFixed(this.width,NUM_FRACTION_DIGITS),height:toFixed(this.height,NUM_FRACTION_DIGITS),fill:this.fill && this.fill.toObject?this.fill.toObject():this.fill,stroke:this.stroke && this.stroke.toObject?this.stroke.toObject():this.stroke,strokeWidth:toFixed(this.strokeWidth,NUM_FRACTION_DIGITS),strokeDashArray:this.strokeDashArray,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeMiterLimit:toFixed(this.strokeMiterLimit,NUM_FRACTION_DIGITS),scaleX:toFixed(this.scaleX,NUM_FRACTION_DIGITS),scaleY:toFixed(this.scaleY,NUM_FRACTION_DIGITS),angle:toFixed(this.getAngle(),NUM_FRACTION_DIGITS),flipX:this.flipX,flipY:this.flipY,opacity:toFixed(this.opacity,NUM_FRACTION_DIGITS),shadow:this.shadow && this.shadow.toObject?this.shadow.toObject():this.shadow,visible:this.visible,clipTo:this.clipTo && String(this.clipTo),backgroundColor:this.backgroundColor,fillRule:this.fillRule,globalCompositeOperation:this.globalCompositeOperation};if(!this.includeDefaultValues){object = this._removeDefaultValues(object);}fabric.util.populateWithProperties(this,object,propertiesToInclude);return object;},toDatalessObject:function toDatalessObject(propertiesToInclude){return this.toObject(propertiesToInclude);},_removeDefaultValues:function _removeDefaultValues(object){var prototype=fabric.util.getKlass(object.type).prototype,stateProperties=prototype.stateProperties;stateProperties.forEach(function(prop){if(object[prop] === prototype[prop]){delete object[prop];}});return object;},toString:function toString(){return '#<fabric.' + capitalize(this.type) + '>';},get:function get(property){return this[property];},_setObject:function _setObject(obj){for(var prop in obj) {this._set(prop,obj[prop]);}},set:function set(key,value){if(typeof key === 'object'){this._setObject(key);}else {if(typeof value === 'function' && key !== 'clipTo'){this._set(key,value(this.get(key)));}else {this._set(key,value);}}return this;},_set:function _set(key,value){var shouldConstrainValue=key === 'scaleX' || key === 'scaleY';if(shouldConstrainValue){value = this._constrainScale(value);}if(key === 'scaleX' && value < 0){this.flipX = !this.flipX;value *= -1;}else if(key === 'scaleY' && value < 0){this.flipY = !this.flipY;value *= -1;}else if(key === 'width' || key === 'height'){this.minScaleLimit = toFixed(Math.min(0.1,1 / Math.max(this.width,this.height)),2);}else if(key === 'shadow' && value && !(value instanceof fabric.Shadow)){value = new fabric.Shadow(value);}this[key] = value;return this;},toggle:function toggle(property){var value=this.get(property);if(typeof value === 'boolean'){this.set(property,!value);}return this;},setSourcePath:function setSourcePath(value){this.sourcePath = value;return this;},getViewportTransform:function getViewportTransform(){if(this.canvas && this.canvas.viewportTransform){return this.canvas.viewportTransform;}return [1,0,0,1,0,0];},render:function render(ctx,noTransform){if(this.width === 0 && this.height === 0 || !this.visible){return;}ctx.save();this._setupCompositeOperation(ctx);if(!noTransform){this.transform(ctx);}this._setStrokeStyles(ctx);this._setFillStyles(ctx);if(this.transformMatrix){ctx.transform.apply(ctx,this.transformMatrix);}this._setOpacity(ctx);this._setShadow(ctx);this.clipTo && fabric.util.clipContext(this,ctx);this._render(ctx,noTransform);this.clipTo && ctx.restore();this._removeShadow(ctx);this._restoreCompositeOperation(ctx);ctx.restore();},_setOpacity:function _setOpacity(ctx){if(this.group){this.group._setOpacity(ctx);}ctx.globalAlpha *= this.opacity;},_setStrokeStyles:function _setStrokeStyles(ctx){if(this.stroke){ctx.lineWidth = this.strokeWidth;ctx.lineCap = this.strokeLineCap;ctx.lineJoin = this.strokeLineJoin;ctx.miterLimit = this.strokeMiterLimit;ctx.strokeStyle = this.stroke.toLive?this.stroke.toLive(ctx,this):this.stroke;}},_setFillStyles:function _setFillStyles(ctx){if(this.fill){ctx.fillStyle = this.fill.toLive?this.fill.toLive(ctx,this):this.fill;}},_renderControls:function _renderControls(ctx,noTransform){if(!this.active || noTransform){return;}var vpt=this.getViewportTransform();ctx.save();var center;if(this.group){center = fabric.util.transformPoint(this.group.getCenterPoint(),vpt);ctx.translate(center.x,center.y);ctx.rotate(degreesToRadians(this.group.angle));}center = fabric.util.transformPoint(this.getCenterPoint(),vpt,null != this.group);if(this.group){center.x *= this.group.scaleX;center.y *= this.group.scaleY;}ctx.translate(center.x,center.y);ctx.rotate(degreesToRadians(this.angle));this.drawBorders(ctx);this.drawControls(ctx);ctx.restore();},_setShadow:function _setShadow(ctx){if(!this.shadow){return;}var multX=this.canvas && this.canvas.viewportTransform[0] || 1,multY=this.canvas && this.canvas.viewportTransform[3] || 1;ctx.shadowColor = this.shadow.color;ctx.shadowBlur = this.shadow.blur * (multX + multY) * (this.scaleX + this.scaleY) / 4;ctx.shadowOffsetX = this.shadow.offsetX * multX * this.scaleX;ctx.shadowOffsetY = this.shadow.offsetY * multY * this.scaleY;},_removeShadow:function _removeShadow(ctx){if(!this.shadow){return;}ctx.shadowColor = '';ctx.shadowBlur = ctx.shadowOffsetX = ctx.shadowOffsetY = 0;},_renderFill:function _renderFill(ctx){if(!this.fill){return;}ctx.save();if(this.fill.gradientTransform){var g=this.fill.gradientTransform;ctx.transform.apply(ctx,g);}if(this.fill.toLive){ctx.translate(-this.width / 2 + this.fill.offsetX || 0,-this.height / 2 + this.fill.offsetY || 0);}if(this.fillRule === 'evenodd'){ctx.fill('evenodd');}else {ctx.fill();}ctx.restore();if(this.shadow && !this.shadow.affectStroke){this._removeShadow(ctx);}},_renderStroke:function _renderStroke(ctx){if(!this.stroke || this.strokeWidth === 0){return;}ctx.save();if(this.strokeDashArray){if(1 & this.strokeDashArray.length){this.strokeDashArray.push.apply(this.strokeDashArray,this.strokeDashArray);}if(supportsLineDash){ctx.setLineDash(this.strokeDashArray);this._stroke && this._stroke(ctx);}else {this._renderDashedStroke && this._renderDashedStroke(ctx);}ctx.stroke();}else {if(this.stroke.gradientTransform){var g=this.stroke.gradientTransform;ctx.transform.apply(ctx,g);}this._stroke?this._stroke(ctx):ctx.stroke();}this._removeShadow(ctx);ctx.restore();},clone:function clone(callback,propertiesToInclude){if(this.constructor.fromObject){return this.constructor.fromObject(this.toObject(propertiesToInclude),callback);}return new fabric.Object(this.toObject(propertiesToInclude));},cloneAsImage:function cloneAsImage(callback){var dataUrl=this.toDataURL();fabric.util.loadImage(dataUrl,function(img){if(callback){callback(new fabric.Image(img));}});return this;},toDataURL:function toDataURL(options){options || (options = {});var el=fabric.util.createCanvasElement(),boundingRect=this.getBoundingRect();el.width = boundingRect.width;el.height = boundingRect.height;fabric.util.wrapElement(el,'div');var canvas=new fabric.StaticCanvas(el);if(options.format === 'jpg'){options.format = 'jpeg';}if(options.format === 'jpeg'){canvas.backgroundColor = '#fff';}var origParams={active:this.get('active'),left:this.getLeft(),top:this.getTop()};this.set('active',false);this.setPositionByOrigin(new fabric.Point(el.width / 2,el.height / 2),'center','center');var originalCanvas=this.canvas;canvas.add(this);var data=canvas.toDataURL(options);this.set(origParams).setCoords();this.canvas = originalCanvas;canvas.dispose();canvas = null;return data;},isType:function isType(type){return this.type === type;},complexity:function complexity(){return 0;},toJSON:function toJSON(propertiesToInclude){return this.toObject(propertiesToInclude);},setGradient:function setGradient(property,options){options || (options = {});var gradient={colorStops:[]};gradient.type = options.type || (options.r1 || options.r2?'radial':'linear');gradient.coords = {x1:options.x1,y1:options.y1,x2:options.x2,y2:options.y2};if(options.r1 || options.r2){gradient.coords.r1 = options.r1;gradient.coords.r2 = options.r2;}for(var position in options.colorStops) {var color=new fabric.Color(options.colorStops[position]);gradient.colorStops.push({offset:position,color:color.toRgb(),opacity:color.getAlpha()});}return this.set(property,fabric.Gradient.forObject(this,gradient));},setPatternFill:function setPatternFill(options){return this.set('fill',new fabric.Pattern(options));},setShadow:function setShadow(options){return this.set('shadow',options?new fabric.Shadow(options):null);},setColor:function setColor(color){this.set('fill',color);return this;},setAngle:function setAngle(angle){var shouldCenterOrigin=(this.originX !== 'center' || this.originY !== 'center') && this.centeredRotation;if(shouldCenterOrigin){this._setOriginToCenter();}this.set('angle',angle);if(shouldCenterOrigin){this._resetOrigin();}return this;},centerH:function centerH(){this.canvas.centerObjectH(this);return this;},centerV:function centerV(){this.canvas.centerObjectV(this);return this;},center:function center(){this.canvas.centerObject(this);return this;},remove:function remove(){this.canvas.remove(this);return this;},getLocalPointer:function getLocalPointer(e,pointer){pointer = pointer || this.canvas.getPointer(e);var objectLeftTop=this.translateToOriginPoint(this.getCenterPoint(),'left','top');return {x:pointer.x - objectLeftTop.x,y:pointer.y - objectLeftTop.y};},_setupCompositeOperation:function _setupCompositeOperation(ctx){if(this.globalCompositeOperation){this._prevGlobalCompositeOperation = ctx.globalCompositeOperation;ctx.globalCompositeOperation = this.globalCompositeOperation;}},_restoreCompositeOperation:function _restoreCompositeOperation(ctx){if(this.globalCompositeOperation && this._prevGlobalCompositeOperation){ctx.globalCompositeOperation = this._prevGlobalCompositeOperation;}}});fabric.util.createAccessors(fabric.Object);fabric.Object.prototype.rotate = fabric.Object.prototype.setAngle;extend(fabric.Object.prototype,fabric.Observable);fabric.Object.NUM_FRACTION_DIGITS = 2;fabric.Object.__uid = 0;})(true?exports:undefined);(function(){var degreesToRadians=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{translateToCenterPoint:function translateToCenterPoint(point,originX,originY){var cx=point.x,cy=point.y,strokeWidth=this.stroke?this.strokeWidth:0;if(originX === 'left'){cx = point.x + (this.getWidth() + strokeWidth * this.scaleX) / 2;}else if(originX === 'right'){cx = point.x - (this.getWidth() + strokeWidth * this.scaleX) / 2;}if(originY === 'top'){cy = point.y + (this.getHeight() + strokeWidth * this.scaleY) / 2;}else if(originY === 'bottom'){cy = point.y - (this.getHeight() + strokeWidth * this.scaleY) / 2;}return fabric.util.rotatePoint(new fabric.Point(cx,cy),point,degreesToRadians(this.angle));},translateToOriginPoint:function translateToOriginPoint(center,originX,originY){var x=center.x,y=center.y,strokeWidth=this.stroke?this.strokeWidth:0;if(originX === 'left'){x = center.x - (this.getWidth() + strokeWidth * this.scaleX) / 2;}else if(originX === 'right'){x = center.x + (this.getWidth() + strokeWidth * this.scaleX) / 2;}if(originY === 'top'){y = center.y - (this.getHeight() + strokeWidth * this.scaleY) / 2;}else if(originY === 'bottom'){y = center.y + (this.getHeight() + strokeWidth * this.scaleY) / 2;}return fabric.util.rotatePoint(new fabric.Point(x,y),center,degreesToRadians(this.angle));},getCenterPoint:function getCenterPoint(){var leftTop=new fabric.Point(this.left,this.top);return this.translateToCenterPoint(leftTop,this.originX,this.originY);},getPointByOrigin:function getPointByOrigin(originX,originY){var center=this.getCenterPoint();return this.translateToOriginPoint(center,originX,originY);},toLocalPoint:function toLocalPoint(point,originX,originY){var center=this.getCenterPoint(),strokeWidth=this.stroke?this.strokeWidth:0,x,y;if(originX && originY){if(originX === 'left'){x = center.x - (this.getWidth() + strokeWidth * this.scaleX) / 2;}else if(originX === 'right'){x = center.x + (this.getWidth() + strokeWidth * this.scaleX) / 2;}else {x = center.x;}if(originY === 'top'){y = center.y - (this.getHeight() + strokeWidth * this.scaleY) / 2;}else if(originY === 'bottom'){y = center.y + (this.getHeight() + strokeWidth * this.scaleY) / 2;}else {y = center.y;}}else {x = this.left;y = this.top;}return fabric.util.rotatePoint(new fabric.Point(point.x,point.y),center,-degreesToRadians(this.angle)).subtractEquals(new fabric.Point(x,y));},setPositionByOrigin:function setPositionByOrigin(pos,originX,originY){var center=this.translateToCenterPoint(pos,originX,originY),position=this.translateToOriginPoint(center,this.originX,this.originY);this.set('left',position.x);this.set('top',position.y);},adjustPosition:function adjustPosition(to){var angle=degreesToRadians(this.angle),hypotHalf=this.getWidth() / 2,xHalf=Math.cos(angle) * hypotHalf,yHalf=Math.sin(angle) * hypotHalf,hypotFull=this.getWidth(),xFull=Math.cos(angle) * hypotFull,yFull=Math.sin(angle) * hypotFull;if(this.originX === 'center' && to === 'left' || this.originX === 'right' && to === 'center'){this.left -= xHalf;this.top -= yHalf;}else if(this.originX === 'left' && to === 'center' || this.originX === 'center' && to === 'right'){this.left += xHalf;this.top += yHalf;}else if(this.originX === 'left' && to === 'right'){this.left += xFull;this.top += yFull;}else if(this.originX === 'right' && to === 'left'){this.left -= xFull;this.top -= yFull;}this.setCoords();this.originX = to;},_setOriginToCenter:function _setOriginToCenter(){this._originalOriginX = this.originX;this._originalOriginY = this.originY;var center=this.getCenterPoint();this.originX = 'center';this.originY = 'center';this.left = center.x;this.top = center.y;},_resetOrigin:function _resetOrigin(){var originPoint=this.translateToOriginPoint(this.getCenterPoint(),this._originalOriginX,this._originalOriginY);this.originX = this._originalOriginX;this.originY = this._originalOriginY;this.left = originPoint.x;this.top = originPoint.y;this._originalOriginX = null;this._originalOriginY = null;},_getLeftTopCoords:function _getLeftTopCoords(){return this.translateToOriginPoint(this.getCenterPoint(),'left','center');}});})();(function(){var degreesToRadians=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{oCoords:null,intersectsWithRect:function intersectsWithRect(pointTL,pointBR){var oCoords=this.oCoords,tl=new fabric.Point(oCoords.tl.x,oCoords.tl.y),tr=new fabric.Point(oCoords.tr.x,oCoords.tr.y),bl=new fabric.Point(oCoords.bl.x,oCoords.bl.y),br=new fabric.Point(oCoords.br.x,oCoords.br.y),intersection=fabric.Intersection.intersectPolygonRectangle([tl,tr,br,bl],pointTL,pointBR);return intersection.status === 'Intersection';},intersectsWithObject:function intersectsWithObject(other){function getCoords(oCoords){return {tl:new fabric.Point(oCoords.tl.x,oCoords.tl.y),tr:new fabric.Point(oCoords.tr.x,oCoords.tr.y),bl:new fabric.Point(oCoords.bl.x,oCoords.bl.y),br:new fabric.Point(oCoords.br.x,oCoords.br.y)};}var thisCoords=getCoords(this.oCoords),otherCoords=getCoords(other.oCoords),intersection=fabric.Intersection.intersectPolygonPolygon([thisCoords.tl,thisCoords.tr,thisCoords.br,thisCoords.bl],[otherCoords.tl,otherCoords.tr,otherCoords.br,otherCoords.bl]);return intersection.status === 'Intersection';},isContainedWithinObject:function isContainedWithinObject(other){var boundingRect=other.getBoundingRect(),point1=new fabric.Point(boundingRect.left,boundingRect.top),point2=new fabric.Point(boundingRect.left + boundingRect.width,boundingRect.top + boundingRect.height);return this.isContainedWithinRect(point1,point2);},isContainedWithinRect:function isContainedWithinRect(pointTL,pointBR){var boundingRect=this.getBoundingRect();return boundingRect.left >= pointTL.x && boundingRect.left + boundingRect.width <= pointBR.x && boundingRect.top >= pointTL.y && boundingRect.top + boundingRect.height <= pointBR.y;},containsPoint:function containsPoint(point){var lines=this._getImageLines(this.oCoords),xPoints=this._findCrossPoints(point,lines);return xPoints !== 0 && xPoints % 2 === 1;},_getImageLines:function _getImageLines(oCoords){return {topline:{o:oCoords.tl,d:oCoords.tr},rightline:{o:oCoords.tr,d:oCoords.br},bottomline:{o:oCoords.br,d:oCoords.bl},leftline:{o:oCoords.bl,d:oCoords.tl}};},_findCrossPoints:function _findCrossPoints(point,oCoords){var b1,b2,a1,a2,xi,yi,xcount=0,iLine;for(var lineKey in oCoords) {iLine = oCoords[lineKey];if(iLine.o.y < point.y && iLine.d.y < point.y){continue;}if(iLine.o.y >= point.y && iLine.d.y >= point.y){continue;}if(iLine.o.x === iLine.d.x && iLine.o.x >= point.x){xi = iLine.o.x;yi = point.y;}else {b1 = 0;b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);a1 = point.y - b1 * point.x;a2 = iLine.o.y - b2 * iLine.o.x;xi = -(a1 - a2) / (b1 - b2);yi = a1 + b1 * xi;}if(xi >= point.x){xcount += 1;}if(xcount === 2){break;}}return xcount;},getBoundingRectWidth:function getBoundingRectWidth(){return this.getBoundingRect().width;},getBoundingRectHeight:function getBoundingRectHeight(){return this.getBoundingRect().height;},getBoundingRect:function getBoundingRect(){this.oCoords || this.setCoords();var xCoords=[this.oCoords.tl.x,this.oCoords.tr.x,this.oCoords.br.x,this.oCoords.bl.x],minX=fabric.util.array.min(xCoords),maxX=fabric.util.array.max(xCoords),width=Math.abs(minX - maxX),yCoords=[this.oCoords.tl.y,this.oCoords.tr.y,this.oCoords.br.y,this.oCoords.bl.y],minY=fabric.util.array.min(yCoords),maxY=fabric.util.array.max(yCoords),height=Math.abs(minY - maxY);return {left:minX,top:minY,width:width,height:height};},getWidth:function getWidth(){return this.width * this.scaleX;},getHeight:function getHeight(){return this.height * this.scaleY;},_constrainScale:function _constrainScale(value){if(Math.abs(value) < this.minScaleLimit){if(value < 0){return -this.minScaleLimit;}else {return this.minScaleLimit;}}return value;},scale:function scale(value){value = this._constrainScale(value);if(value < 0){this.flipX = !this.flipX;this.flipY = !this.flipY;value *= -1;}this.scaleX = value;this.scaleY = value;this.setCoords();return this;},scaleToWidth:function scaleToWidth(value){var boundingRectFactor=this.getBoundingRectWidth() / this.getWidth();return this.scale(value / this.width / boundingRectFactor);},scaleToHeight:function scaleToHeight(value){var boundingRectFactor=this.getBoundingRectHeight() / this.getHeight();return this.scale(value / this.height / boundingRectFactor);},setCoords:function setCoords(){var theta=degreesToRadians(this.angle),vpt=this.getViewportTransform(),f=function f(p){return fabric.util.transformPoint(p,vpt);},p=this._calculateCurrentDimensions(false),currentWidth=p.x,currentHeight=p.y;if(currentWidth < 0){currentWidth = Math.abs(currentWidth);}var _hypotenuse=Math.sqrt(Math.pow(currentWidth / 2,2) + Math.pow(currentHeight / 2,2)),_angle=Math.atan(isFinite(currentHeight / currentWidth)?currentHeight / currentWidth:0),offsetX=Math.cos(_angle + theta) * _hypotenuse,offsetY=Math.sin(_angle + theta) * _hypotenuse,sinTh=Math.sin(theta),cosTh=Math.cos(theta),coords=this.getCenterPoint(),wh=new fabric.Point(currentWidth,currentHeight),_tl=new fabric.Point(coords.x - offsetX,coords.y - offsetY),_tr=new fabric.Point(_tl.x + wh.x * cosTh,_tl.y + wh.x * sinTh),bl=f(new fabric.Point(_tl.x - wh.y * sinTh,_tl.y + wh.y * cosTh)),br=f(new fabric.Point(_tr.x - wh.y * sinTh,_tr.y + wh.y * cosTh)),tl=f(_tl),tr=f(_tr),ml=new fabric.Point((tl.x + bl.x) / 2,(tl.y + bl.y) / 2),mt=new fabric.Point((tr.x + tl.x) / 2,(tr.y + tl.y) / 2),mr=new fabric.Point((br.x + tr.x) / 2,(br.y + tr.y) / 2),mb=new fabric.Point((br.x + bl.x) / 2,(br.y + bl.y) / 2),mtr=new fabric.Point(mt.x + sinTh * this.rotatingPointOffset,mt.y - cosTh * this.rotatingPointOffset);this.oCoords = {tl:tl,tr:tr,br:br,bl:bl,ml:ml,mt:mt,mr:mr,mb:mb,mtr:mtr};this._setCornerCoords && this._setCornerCoords();return this;}});})();fabric.util.object.extend(fabric.Object.prototype,{sendToBack:function sendToBack(){if(this.group){fabric.StaticCanvas.prototype.sendToBack.call(this.group,this);}else {this.canvas.sendToBack(this);}return this;},bringToFront:function bringToFront(){if(this.group){fabric.StaticCanvas.prototype.bringToFront.call(this.group,this);}else {this.canvas.bringToFront(this);}return this;},sendBackwards:function sendBackwards(intersecting){if(this.group){fabric.StaticCanvas.prototype.sendBackwards.call(this.group,this,intersecting);}else {this.canvas.sendBackwards(this,intersecting);}return this;},bringForward:function bringForward(intersecting){if(this.group){fabric.StaticCanvas.prototype.bringForward.call(this.group,this,intersecting);}else {this.canvas.bringForward(this,intersecting);}return this;},moveTo:function moveTo(index){if(this.group){fabric.StaticCanvas.prototype.moveTo.call(this.group,this,index);}else {this.canvas.moveTo(this,index);}return this;}});fabric.util.object.extend(fabric.Object.prototype,{getSvgStyles:function getSvgStyles(){var fill=this.fill?this.fill.toLive?'url(#SVGID_' + this.fill.id + ')':this.fill:'none',fillRule=this.fillRule,stroke=this.stroke?this.stroke.toLive?'url(#SVGID_' + this.stroke.id + ')':this.stroke:'none',strokeWidth=this.strokeWidth?this.strokeWidth:'0',strokeDashArray=this.strokeDashArray?this.strokeDashArray.join(' '):'',strokeLineCap=this.strokeLineCap?this.strokeLineCap:'butt',strokeLineJoin=this.strokeLineJoin?this.strokeLineJoin:'miter',strokeMiterLimit=this.strokeMiterLimit?this.strokeMiterLimit:'4',opacity=typeof this.opacity !== 'undefined'?this.opacity:'1',visibility=this.visible?'':' visibility: hidden;',filter=this.shadow?'filter: url(#SVGID_' + this.shadow.id + ');':'';return ['stroke: ',stroke,'; ','stroke-width: ',strokeWidth,'; ','stroke-dasharray: ',strokeDashArray,'; ','stroke-linecap: ',strokeLineCap,'; ','stroke-linejoin: ',strokeLineJoin,'; ','stroke-miterlimit: ',strokeMiterLimit,'; ','fill: ',fill,'; ','fill-rule: ',fillRule,'; ','opacity: ',opacity,';',filter,visibility].join('');},getSvgTransform:function getSvgTransform(){if(this.group && this.group.type === 'path-group'){return '';}var toFixed=fabric.util.toFixed,angle=this.getAngle(),vpt=!this.canvas || this.canvas.svgViewportTransformation?this.getViewportTransform():[1,0,0,1,0,0],center=fabric.util.transformPoint(this.getCenterPoint(),vpt),NUM_FRACTION_DIGITS=fabric.Object.NUM_FRACTION_DIGITS,translatePart=this.type === 'path-group'?'':'translate(' + toFixed(center.x,NUM_FRACTION_DIGITS) + ' ' + toFixed(center.y,NUM_FRACTION_DIGITS) + ')',anglePart=angle !== 0?' rotate(' + toFixed(angle,NUM_FRACTION_DIGITS) + ')':'',scalePart=this.scaleX === 1 && this.scaleY === 1 && vpt[0] === 1 && vpt[3] === 1?'':' scale(' + toFixed(this.scaleX * vpt[0],NUM_FRACTION_DIGITS) + ' ' + toFixed(this.scaleY * vpt[3],NUM_FRACTION_DIGITS) + ')',addTranslateX=this.type === 'path-group'?this.width * vpt[0]:0,flipXPart=this.flipX?' matrix(-1 0 0 1 ' + addTranslateX + ' 0) ':'',addTranslateY=this.type === 'path-group'?this.height * vpt[3]:0,flipYPart=this.flipY?' matrix(1 0 0 -1 0 ' + addTranslateY + ')':'';return [translatePart,anglePart,scalePart,flipXPart,flipYPart].join('');},getSvgTransformMatrix:function getSvgTransformMatrix(){return this.transformMatrix?' matrix(' + this.transformMatrix.join(' ') + ') ':'';},_createBaseSVGMarkup:function _createBaseSVGMarkup(){var markup=[];if(this.fill && this.fill.toLive){markup.push(this.fill.toSVG(this,false));}if(this.stroke && this.stroke.toLive){markup.push(this.stroke.toSVG(this,false));}if(this.shadow){markup.push(this.shadow.toSVG(this));}return markup;}});fabric.util.object.extend(fabric.Object.prototype,{hasStateChanged:function hasStateChanged(){return this.stateProperties.some(function(prop){return this.get(prop) !== this.originalState[prop];},this);},saveState:function saveState(options){this.stateProperties.forEach(function(prop){this.originalState[prop] = this.get(prop);},this);if(options && options.stateProperties){options.stateProperties.forEach(function(prop){this.originalState[prop] = this.get(prop);},this);}return this;},setupState:function setupState(){this.originalState = {};this.saveState();return this;}});(function(){var degreesToRadians=fabric.util.degreesToRadians,isVML=function isVML(){return typeof G_vmlCanvasManager !== 'undefined';};fabric.util.object.extend(fabric.Object.prototype,{_controlsVisibility:null,_findTargetCorner:function _findTargetCorner(pointer){if(!this.hasControls || !this.active){return false;}var ex=pointer.x,ey=pointer.y,xPoints,lines;for(var i in this.oCoords) {if(!this.isControlVisible(i)){continue;}if(i === 'mtr' && !this.hasRotatingPoint){continue;}if(this.get('lockUniScaling') && (i === 'mt' || i === 'mr' || i === 'mb' || i === 'ml')){continue;}lines = this._getImageLines(this.oCoords[i].corner);xPoints = this._findCrossPoints({x:ex,y:ey},lines);if(xPoints !== 0 && xPoints % 2 === 1){this.__corner = i;return i;}}return false;},_setCornerCoords:function _setCornerCoords(){var coords=this.oCoords,newTheta=degreesToRadians(45 - this.angle),cornerHypotenuse=Math.sqrt(2 * Math.pow(this.cornerSize,2)) / 2,cosHalfOffset=cornerHypotenuse * Math.cos(newTheta),sinHalfOffset=cornerHypotenuse * Math.sin(newTheta),x,y;for(var point in coords) {x = coords[point].x;y = coords[point].y;coords[point].corner = {tl:{x:x - sinHalfOffset,y:y - cosHalfOffset},tr:{x:x + cosHalfOffset,y:y - sinHalfOffset},bl:{x:x - cosHalfOffset,y:y + sinHalfOffset},br:{x:x + sinHalfOffset,y:y + cosHalfOffset}};}},_calculateCurrentDimensions:function _calculateCurrentDimensions(shouldTransform){var vpt=this.getViewportTransform(),strokeWidth=this.strokeWidth,w=this.width,h=this.height,capped=this.strokeLineCap === 'round' || this.strokeLineCap === 'square',vLine=this.type === 'line' && this.width === 0,hLine=this.type === 'line' && this.height === 0,sLine=vLine || hLine,strokeW=capped && hLine || !sLine,strokeH=capped && vLine || !sLine;if(vLine){w = strokeWidth;}else if(hLine){h = strokeWidth;}if(strokeW){w += w < 0?-strokeWidth:strokeWidth;}if(strokeH){h += h < 0?-strokeWidth:strokeWidth;}w = w * this.scaleX + 2 * this.padding;h = h * this.scaleY + 2 * this.padding;if(shouldTransform){return fabric.util.transformPoint(new fabric.Point(w,h),vpt,true);}return {x:w,y:h};},drawBorders:function drawBorders(ctx){if(!this.hasBorders){return this;}ctx.save();ctx.globalAlpha = this.isMoving?this.borderOpacityWhenMoving:1;ctx.strokeStyle = this.borderColor;ctx.lineWidth = 1 / this.borderScaleFactor;var wh=this._calculateCurrentDimensions(true),width=wh.x,height=wh.y;if(this.group){width = width * this.group.scaleX;height = height * this.group.scaleY;}ctx.strokeRect(~ ~ -(width / 2) - 0.5,~ ~ -(height / 2) - 0.5,~ ~width + 1,~ ~height + 1);if(this.hasRotatingPoint && this.isControlVisible('mtr') && !this.get('lockRotation') && this.hasControls){var rotateHeight=-height / 2;ctx.beginPath();ctx.moveTo(0,rotateHeight);ctx.lineTo(0,rotateHeight - this.rotatingPointOffset);ctx.closePath();ctx.stroke();}ctx.restore();return this;},drawControls:function drawControls(ctx){if(!this.hasControls){return this;}var wh=this._calculateCurrentDimensions(true),width=wh.x,height=wh.y,left=-(width / 2),top=-(height / 2),scaleOffset=this.cornerSize / 2,methodName=this.transparentCorners?'strokeRect':'fillRect';ctx.save();ctx.lineWidth = 1;ctx.globalAlpha = this.isMoving?this.borderOpacityWhenMoving:1;ctx.strokeStyle = ctx.fillStyle = this.cornerColor;this._drawControl('tl',ctx,methodName,left - scaleOffset,top - scaleOffset);this._drawControl('tr',ctx,methodName,left + width - scaleOffset,top - scaleOffset);this._drawControl('bl',ctx,methodName,left - scaleOffset,top + height - scaleOffset);this._drawControl('br',ctx,methodName,left + width - scaleOffset,top + height - scaleOffset);if(!this.get('lockUniScaling')){this._drawControl('mt',ctx,methodName,left + width / 2 - scaleOffset,top - scaleOffset);this._drawControl('mb',ctx,methodName,left + width / 2 - scaleOffset,top + height - scaleOffset);this._drawControl('mr',ctx,methodName,left + width - scaleOffset,top + height / 2 - scaleOffset);this._drawControl('ml',ctx,methodName,left - scaleOffset,top + height / 2 - scaleOffset);}if(this.hasRotatingPoint){this._drawControl('mtr',ctx,methodName,left + width / 2 - scaleOffset,top - this.rotatingPointOffset - scaleOffset);}ctx.restore();return this;},_drawControl:function _drawControl(control,ctx,methodName,left,top){if(!this.isControlVisible(control)){return;}var size=this.cornerSize;isVML() || this.transparentCorners || ctx.clearRect(left,top,size,size);ctx[methodName](left,top,size,size);},isControlVisible:function isControlVisible(controlName){return this._getControlsVisibility()[controlName];},setControlVisible:function setControlVisible(controlName,visible){this._getControlsVisibility()[controlName] = visible;return this;},setControlsVisibility:function setControlsVisibility(options){options || (options = {});for(var p in options) {this.setControlVisible(p,options[p]);}return this;},_getControlsVisibility:function _getControlsVisibility(){if(!this._controlsVisibility){this._controlsVisibility = {tl:true,tr:true,br:true,bl:true,ml:true,mt:true,mr:true,mb:true,mtr:true};}return this._controlsVisibility;}});})();fabric.util.object.extend(fabric.StaticCanvas.prototype,{FX_DURATION:500,fxCenterObjectH:function fxCenterObjectH(object,callbacks){callbacks = callbacks || {};var empty=function empty(){},_onComplete=callbacks.onComplete || empty,_onChange=callbacks.onChange || empty,_this=this;fabric.util.animate({startValue:object.get('left'),endValue:this.getCenter().left,duration:this.FX_DURATION,onChange:function onChange(value){object.set('left',value);_this.renderAll();_onChange();},onComplete:function onComplete(){object.setCoords();_onComplete();}});return this;},fxCenterObjectV:function fxCenterObjectV(object,callbacks){callbacks = callbacks || {};var empty=function empty(){},_onComplete2=callbacks.onComplete || empty,_onChange2=callbacks.onChange || empty,_this=this;fabric.util.animate({startValue:object.get('top'),endValue:this.getCenter().top,duration:this.FX_DURATION,onChange:function onChange(value){object.set('top',value);_this.renderAll();_onChange2();},onComplete:function onComplete(){object.setCoords();_onComplete2();}});return this;},fxRemove:function fxRemove(object,callbacks){callbacks = callbacks || {};var empty=function empty(){},_onComplete3=callbacks.onComplete || empty,_onChange3=callbacks.onChange || empty,_this=this;fabric.util.animate({startValue:object.get('opacity'),endValue:0,duration:this.FX_DURATION,onStart:function onStart(){object.set('active',false);},onChange:function onChange(value){object.set('opacity',value);_this.renderAll();_onChange3();},onComplete:function onComplete(){_this.remove(object);_onComplete3();}});return this;}});fabric.util.object.extend(fabric.Object.prototype,{animate:function animate(){if(arguments[0] && typeof arguments[0] === 'object'){var propsToAnimate=[],prop,skipCallbacks;for(prop in arguments[0]) {propsToAnimate.push(prop);}for(var i=0,len=propsToAnimate.length;i < len;i++) {prop = propsToAnimate[i];skipCallbacks = i !== len - 1;this._animate(prop,arguments[0][prop],arguments[1],skipCallbacks);}}else {this._animate.apply(this,arguments);}return this;},_animate:function _animate(property,to,options,skipCallbacks){var _this=this,propPair;to = to.toString();if(!options){options = {};}else {options = fabric.util.object.clone(options);}if(~property.indexOf('.')){propPair = property.split('.');}var currentValue=propPair?this.get(propPair[0])[propPair[1]]:this.get(property);if(!('from' in options)){options.from = currentValue;}if(~to.indexOf('=')){to = currentValue + parseFloat(to.replace('=',''));}else {to = parseFloat(to);}fabric.util.animate({startValue:options.from,endValue:to,byValue:options.by,easing:options.easing,duration:options.duration,abort:options.abort && function(){return options.abort.call(_this);},onChange:function onChange(value){if(propPair){_this[propPair[0]][propPair[1]] = value;}else {_this.set(property,value);}if(skipCallbacks){return;}options.onChange && options.onChange();},onComplete:function onComplete(){if(skipCallbacks){return;}_this.setCoords();options.onComplete && options.onComplete();}});}});(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend,coordProps={x1:1,x2:1,y1:1,y2:1},supportsLineDash=fabric.StaticCanvas.supports('setLineDash');if(fabric.Line){fabric.warn('fabric.Line is already defined');return;}fabric.Line = fabric.util.createClass(fabric.Object,{type:'line',x1:0,y1:0,x2:0,y2:0,initialize:function initialize(points,options){options = options || {};if(!points){points = [0,0,0,0];}this.callSuper('initialize',options);this.set('x1',points[0]);this.set('y1',points[1]);this.set('x2',points[2]);this.set('y2',points[3]);this._setWidthHeight(options);},_setWidthHeight:function _setWidthHeight(options){options || (options = {});this.width = Math.abs(this.x2 - this.x1);this.height = Math.abs(this.y2 - this.y1);this.left = 'left' in options?options.left:this._getLeftToOriginX();this.top = 'top' in options?options.top:this._getTopToOriginY();},_set:function _set(key,value){this.callSuper('_set',key,value);if(typeof coordProps[key] !== 'undefined'){this._setWidthHeight();}return this;},_getLeftToOriginX:makeEdgeToOriginGetter({origin:'originX',axis1:'x1',axis2:'x2',dimension:'width'},{nearest:'left',center:'center',farthest:'right'}),_getTopToOriginY:makeEdgeToOriginGetter({origin:'originY',axis1:'y1',axis2:'y2',dimension:'height'},{nearest:'top',center:'center',farthest:'bottom'}),_render:function _render(ctx,noTransform){ctx.beginPath();if(noTransform){var cp=this.getCenterPoint();ctx.translate(cp.x - this.strokeWidth / 2,cp.y - this.strokeWidth / 2);}if(!this.strokeDashArray || this.strokeDashArray && supportsLineDash){var p=this.calcLinePoints();ctx.moveTo(p.x1,p.y1);ctx.lineTo(p.x2,p.y2);}ctx.lineWidth = this.strokeWidth;var origStrokeStyle=ctx.strokeStyle;ctx.strokeStyle = this.stroke || ctx.fillStyle;this.stroke && this._renderStroke(ctx);ctx.strokeStyle = origStrokeStyle;},_renderDashedStroke:function _renderDashedStroke(ctx){var p=this.calcLinePoints();ctx.beginPath();fabric.util.drawDashedLine(ctx,p.x1,p.y1,p.x2,p.y2,this.strokeDashArray);ctx.closePath();},toObject:function toObject(propertiesToInclude){return extend(this.callSuper('toObject',propertiesToInclude),this.calcLinePoints());},calcLinePoints:function calcLinePoints(){var xMult=this.x1 <= this.x2?-1:1,yMult=this.y1 <= this.y2?-1:1,x1=xMult * this.width * 0.5,y1=yMult * this.height * 0.5,x2=xMult * this.width * -0.5,y2=yMult * this.height * -0.5;return {x1:x1,x2:x2,y1:y1,y2:y2};},toSVG:function toSVG(reviver){var markup=this._createBaseSVGMarkup(),p={x1:this.x1,x2:this.x2,y1:this.y1,y2:this.y2};if(!(this.group && this.group.type === 'path-group')){p = this.calcLinePoints();}markup.push('<line ','x1="',p.x1,'" y1="',p.y1,'" x2="',p.x2,'" y2="',p.y2,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n');return reviver?reviver(markup.join('')):markup.join('');},complexity:function complexity(){return 1;}});fabric.Line.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat('x1 y1 x2 y2'.split(' '));fabric.Line.fromElement = function(element,options){var parsedAttributes=fabric.parseAttributes(element,fabric.Line.ATTRIBUTE_NAMES),points=[parsedAttributes.x1 || 0,parsedAttributes.y1 || 0,parsedAttributes.x2 || 0,parsedAttributes.y2 || 0];return new fabric.Line(points,extend(parsedAttributes,options));};fabric.Line.fromObject = function(object){var points=[object.x1,object.y1,object.x2,object.y2];return new fabric.Line(points,object);};function makeEdgeToOriginGetter(propertyNames,originValues){var origin=propertyNames.origin,axis1=propertyNames.axis1,axis2=propertyNames.axis2,dimension=propertyNames.dimension,nearest=originValues.nearest,center=originValues.center,farthest=originValues.farthest;return function(){switch(this.get(origin)){case nearest:return Math.min(this.get(axis1),this.get(axis2));case center:return Math.min(this.get(axis1),this.get(axis2)) + 0.5 * this.get(dimension);case farthest:return Math.max(this.get(axis1),this.get(axis2));}};}})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),pi=Math.PI,extend=fabric.util.object.extend;if(fabric.Circle){fabric.warn('fabric.Circle is already defined.');return;}fabric.Circle = fabric.util.createClass(fabric.Object,{type:'circle',radius:0,startAngle:0,endAngle:pi * 2,initialize:function initialize(options){options = options || {};this.callSuper('initialize',options);this.set('radius',options.radius || 0);this.startAngle = options.startAngle || this.startAngle;this.endAngle = options.endAngle || this.endAngle;},_set:function _set(key,value){this.callSuper('_set',key,value);if(key === 'radius'){this.setRadius(value);}return this;},toObject:function toObject(propertiesToInclude){return extend(this.callSuper('toObject',propertiesToInclude),{radius:this.get('radius'),startAngle:this.startAngle,endAngle:this.endAngle});},toSVG:function toSVG(reviver){var markup=this._createBaseSVGMarkup(),x=0,y=0,angle=(this.endAngle - this.startAngle) % (2 * pi);if(angle === 0){if(this.group && this.group.type === 'path-group'){x = this.left + this.radius;y = this.top + this.radius;}markup.push('<circle ','cx="' + x + '" cy="' + y + '" ','r="',this.radius,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),' ',this.getSvgTransformMatrix(),'"/>\n');}else {var startX=Math.cos(this.startAngle) * this.radius,startY=Math.sin(this.startAngle) * this.radius,endX=Math.cos(this.endAngle) * this.radius,endY=Math.sin(this.endAngle) * this.radius,largeFlag=angle > pi?'1':'0';markup.push('<path d="M ' + startX + ' ' + startY,' A ' + this.radius + ' ' + this.radius,' 0 ',+largeFlag + ' 1',' ' + endX + ' ' + endY,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),' ',this.getSvgTransformMatrix(),'"/>\n');}return reviver?reviver(markup.join('')):markup.join('');},_render:function _render(ctx,noTransform){ctx.beginPath();ctx.arc(noTransform?this.left + this.radius:0,noTransform?this.top + this.radius:0,this.radius,this.startAngle,this.endAngle,false);this._renderFill(ctx);this._renderStroke(ctx);},getRadiusX:function getRadiusX(){return this.get('radius') * this.get('scaleX');},getRadiusY:function getRadiusY(){return this.get('radius') * this.get('scaleY');},setRadius:function setRadius(value){this.radius = value;this.set('width',value * 2).set('height',value * 2);},complexity:function complexity(){return 1;}});fabric.Circle.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat('cx cy r'.split(' '));fabric.Circle.fromElement = function(element,options){options || (options = {});var parsedAttributes=fabric.parseAttributes(element,fabric.Circle.ATTRIBUTE_NAMES);if(!isValidRadius(parsedAttributes)){throw new Error('value of `r` attribute is required and can not be negative');}parsedAttributes.left = parsedAttributes.left || 0;parsedAttributes.top = parsedAttributes.top || 0;var obj=new fabric.Circle(extend(parsedAttributes,options));obj.left -= obj.radius;obj.top -= obj.radius;return obj;};function isValidRadius(attributes){return 'radius' in attributes && attributes.radius >= 0;}fabric.Circle.fromObject = function(object){return new fabric.Circle(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});if(fabric.Triangle){fabric.warn('fabric.Triangle is already defined');return;}fabric.Triangle = fabric.util.createClass(fabric.Object,{type:'triangle',initialize:function initialize(options){options = options || {};this.callSuper('initialize',options);this.set('width',options.width || 100).set('height',options.height || 100);},_render:function _render(ctx){var widthBy2=this.width / 2,heightBy2=this.height / 2;ctx.beginPath();ctx.moveTo(-widthBy2,heightBy2);ctx.lineTo(0,-heightBy2);ctx.lineTo(widthBy2,heightBy2);ctx.closePath();this._renderFill(ctx);this._renderStroke(ctx);},_renderDashedStroke:function _renderDashedStroke(ctx){var widthBy2=this.width / 2,heightBy2=this.height / 2;ctx.beginPath();fabric.util.drawDashedLine(ctx,-widthBy2,heightBy2,0,-heightBy2,this.strokeDashArray);fabric.util.drawDashedLine(ctx,0,-heightBy2,widthBy2,heightBy2,this.strokeDashArray);fabric.util.drawDashedLine(ctx,widthBy2,heightBy2,-widthBy2,heightBy2,this.strokeDashArray);ctx.closePath();},toSVG:function toSVG(reviver){var markup=this._createBaseSVGMarkup(),widthBy2=this.width / 2,heightBy2=this.height / 2,points=[-widthBy2 + ' ' + heightBy2,'0 ' + -heightBy2,widthBy2 + ' ' + heightBy2].join(',');markup.push('<polygon ','points="',points,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>');return reviver?reviver(markup.join('')):markup.join('');},complexity:function complexity(){return 1;}});fabric.Triangle.fromObject = function(object){return new fabric.Triangle(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),piBy2=Math.PI * 2,extend=fabric.util.object.extend;if(fabric.Ellipse){fabric.warn('fabric.Ellipse is already defined.');return;}fabric.Ellipse = fabric.util.createClass(fabric.Object,{type:'ellipse',rx:0,ry:0,initialize:function initialize(options){options = options || {};this.callSuper('initialize',options);this.set('rx',options.rx || 0);this.set('ry',options.ry || 0);},_set:function _set(key,value){this.callSuper('_set',key,value);switch(key){case 'rx':this.rx = value;this.set('width',value * 2);break;case 'ry':this.ry = value;this.set('height',value * 2);break;}return this;},getRx:function getRx(){return this.get('rx') * this.get('scaleX');},getRy:function getRy(){return this.get('ry') * this.get('scaleY');},toObject:function toObject(propertiesToInclude){return extend(this.callSuper('toObject',propertiesToInclude),{rx:this.get('rx'),ry:this.get('ry')});},toSVG:function toSVG(reviver){var markup=this._createBaseSVGMarkup(),x=0,y=0;if(this.group && this.group.type === 'path-group'){x = this.left + this.rx;y = this.top + this.ry;}markup.push('<ellipse ','cx="',x,'" cy="',y,'" ','rx="',this.rx,'" ry="',this.ry,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n');return reviver?reviver(markup.join('')):markup.join('');},_render:function _render(ctx,noTransform){ctx.beginPath();ctx.save();ctx.transform(1,0,0,this.ry / this.rx,0,0);ctx.arc(noTransform?this.left + this.rx:0,noTransform?(this.top + this.ry) * this.rx / this.ry:0,this.rx,0,piBy2,false);ctx.restore();this._renderFill(ctx);this._renderStroke(ctx);},complexity:function complexity(){return 1;}});fabric.Ellipse.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat('cx cy rx ry'.split(' '));fabric.Ellipse.fromElement = function(element,options){options || (options = {});var parsedAttributes=fabric.parseAttributes(element,fabric.Ellipse.ATTRIBUTE_NAMES);parsedAttributes.left = parsedAttributes.left || 0;parsedAttributes.top = parsedAttributes.top || 0;var ellipse=new fabric.Ellipse(extend(parsedAttributes,options));ellipse.top -= ellipse.ry;ellipse.left -= ellipse.rx;return ellipse;};fabric.Ellipse.fromObject = function(object){return new fabric.Ellipse(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;if(fabric.Rect){console.warn('fabric.Rect is already defined');return;}var stateProperties=fabric.Object.prototype.stateProperties.concat();stateProperties.push('rx','ry','x','y');fabric.Rect = fabric.util.createClass(fabric.Object,{stateProperties:stateProperties,type:'rect',rx:0,ry:0,strokeDashArray:null,initialize:function initialize(options){options = options || {};this.callSuper('initialize',options);this._initRxRy();},_initRxRy:function _initRxRy(){if(this.rx && !this.ry){this.ry = this.rx;}else if(this.ry && !this.rx){this.rx = this.ry;}},_render:function _render(ctx,noTransform){if(this.width === 1 && this.height === 1){ctx.fillRect(0,0,1,1);return;}var rx=this.rx?Math.min(this.rx,this.width / 2):0,ry=this.ry?Math.min(this.ry,this.height / 2):0,w=this.width,h=this.height,x=noTransform?this.left:-this.width / 2,y=noTransform?this.top:-this.height / 2,isRounded=rx !== 0 || ry !== 0,k=1 - 0.5522847498;ctx.beginPath();ctx.moveTo(x + rx,y);ctx.lineTo(x + w - rx,y);isRounded && ctx.bezierCurveTo(x + w - k * rx,y,x + w,y + k * ry,x + w,y + ry);ctx.lineTo(x + w,y + h - ry);isRounded && ctx.bezierCurveTo(x + w,y + h - k * ry,x + w - k * rx,y + h,x + w - rx,y + h);ctx.lineTo(x + rx,y + h);isRounded && ctx.bezierCurveTo(x + k * rx,y + h,x,y + h - k * ry,x,y + h - ry);ctx.lineTo(x,y + ry);isRounded && ctx.bezierCurveTo(x,y + k * ry,x + k * rx,y,x + rx,y);ctx.closePath();this._renderFill(ctx);this._renderStroke(ctx);},_renderDashedStroke:function _renderDashedStroke(ctx){var x=-this.width / 2,y=-this.height / 2,w=this.width,h=this.height;ctx.beginPath();fabric.util.drawDashedLine(ctx,x,y,x + w,y,this.strokeDashArray);fabric.util.drawDashedLine(ctx,x + w,y,x + w,y + h,this.strokeDashArray);fabric.util.drawDashedLine(ctx,x + w,y + h,x,y + h,this.strokeDashArray);fabric.util.drawDashedLine(ctx,x,y + h,x,y,this.strokeDashArray);ctx.closePath();},toObject:function toObject(propertiesToInclude){var object=extend(this.callSuper('toObject',propertiesToInclude),{rx:this.get('rx') || 0,ry:this.get('ry') || 0});if(!this.includeDefaultValues){this._removeDefaultValues(object);}return object;},toSVG:function toSVG(reviver){var markup=this._createBaseSVGMarkup(),x=this.left,y=this.top;if(!(this.group && this.group.type === 'path-group')){x = -this.width / 2;y = -this.height / 2;}markup.push('<rect ','x="',x,'" y="',y,'" rx="',this.get('rx'),'" ry="',this.get('ry'),'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'"/>\n');return reviver?reviver(markup.join('')):markup.join('');},complexity:function complexity(){return 1;}});fabric.Rect.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat('x y rx ry width height'.split(' '));fabric.Rect.fromElement = function(element,options){if(!element){return null;}options = options || {};var parsedAttributes=fabric.parseAttributes(element,fabric.Rect.ATTRIBUTE_NAMES);parsedAttributes.left = parsedAttributes.left || 0;parsedAttributes.top = parsedAttributes.top || 0;var rect=new fabric.Rect(extend(options?fabric.util.object.clone(options):{},parsedAttributes));rect.visible = rect.width > 0 && rect.height > 0;return rect;};fabric.Rect.fromObject = function(object){return new fabric.Rect(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});if(fabric.Polyline){fabric.warn('fabric.Polyline is already defined');return;}fabric.Polyline = fabric.util.createClass(fabric.Object,{type:'polyline',points:null,minX:0,minY:0,initialize:function initialize(points,options){return fabric.Polygon.prototype.initialize.call(this,points,options);},_calcDimensions:function _calcDimensions(){return fabric.Polygon.prototype._calcDimensions.call(this);},_applyPointOffset:function _applyPointOffset(){return fabric.Polygon.prototype._applyPointOffset.call(this);},toObject:function toObject(propertiesToInclude){return fabric.Polygon.prototype.toObject.call(this,propertiesToInclude);},toSVG:function toSVG(reviver){return fabric.Polygon.prototype.toSVG.call(this,reviver);},_render:function _render(ctx){if(!fabric.Polygon.prototype.commonRender.call(this,ctx)){return;}this._renderFill(ctx);this._renderStroke(ctx);},_renderDashedStroke:function _renderDashedStroke(ctx){var p1,p2;ctx.beginPath();for(var i=0,len=this.points.length;i < len;i++) {p1 = this.points[i];p2 = this.points[i + 1] || p1;fabric.util.drawDashedLine(ctx,p1.x,p1.y,p2.x,p2.y,this.strokeDashArray);}},complexity:function complexity(){return this.get('points').length;}});fabric.Polyline.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat();fabric.Polyline.fromElement = function(element,options){if(!element){return null;}options || (options = {});var points=fabric.parsePointsAttribute(element.getAttribute('points')),parsedAttributes=fabric.parseAttributes(element,fabric.Polyline.ATTRIBUTE_NAMES);return new fabric.Polyline(points,fabric.util.object.extend(parsedAttributes,options));};fabric.Polyline.fromObject = function(object){var points=object.points;return new fabric.Polyline(points,object,true);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend,min=fabric.util.array.min,max=fabric.util.array.max,toFixed=fabric.util.toFixed;if(fabric.Polygon){fabric.warn('fabric.Polygon is already defined');return;}fabric.Polygon = fabric.util.createClass(fabric.Object,{type:'polygon',points:null,minX:0,minY:0,initialize:function initialize(points,options){options = options || {};this.points = points || [];this.callSuper('initialize',options);this._calcDimensions();if(!('top' in options)){this.top = this.minY;}if(!('left' in options)){this.left = this.minX;}},_calcDimensions:function _calcDimensions(){var points=this.points,minX=min(points,'x'),minY=min(points,'y'),maxX=max(points,'x'),maxY=max(points,'y');this.width = maxX - minX || 0;this.height = maxY - minY || 0;this.minX = minX || 0,this.minY = minY || 0;},_applyPointOffset:function _applyPointOffset(){this.points.forEach(function(p){p.x -= this.minX + this.width / 2;p.y -= this.minY + this.height / 2;},this);},toObject:function toObject(propertiesToInclude){return extend(this.callSuper('toObject',propertiesToInclude),{points:this.points.concat()});},toSVG:function toSVG(reviver){var points=[],markup=this._createBaseSVGMarkup();for(var i=0,len=this.points.length;i < len;i++) {points.push(toFixed(this.points[i].x,2),',',toFixed(this.points[i].y,2),' ');}markup.push('<',this.type,' ','points="',points.join(''),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),' ',this.getSvgTransformMatrix(),'"/>\n');return reviver?reviver(markup.join('')):markup.join('');},_render:function _render(ctx){if(!this.commonRender(ctx)){return;}this._renderFill(ctx);if(this.stroke || this.strokeDashArray){ctx.closePath();this._renderStroke(ctx);}},commonRender:function commonRender(ctx){var point,len=this.points.length;if(!len || isNaN(this.points[len - 1].y)){return false;}ctx.beginPath();if(this._applyPointOffset){if(!(this.group && this.group.type === 'path-group')){this._applyPointOffset();}this._applyPointOffset = null;}ctx.moveTo(this.points[0].x,this.points[0].y);for(var i=0;i < len;i++) {point = this.points[i];ctx.lineTo(point.x,point.y);}return true;},_renderDashedStroke:function _renderDashedStroke(ctx){fabric.Polyline.prototype._renderDashedStroke.call(this,ctx);ctx.closePath();},complexity:function complexity(){return this.points.length;}});fabric.Polygon.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat();fabric.Polygon.fromElement = function(element,options){if(!element){return null;}options || (options = {});var points=fabric.parsePointsAttribute(element.getAttribute('points')),parsedAttributes=fabric.parseAttributes(element,fabric.Polygon.ATTRIBUTE_NAMES);return new fabric.Polygon(points,extend(parsedAttributes,options));};fabric.Polygon.fromObject = function(object){return new fabric.Polygon(object.points,object,true);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),min=fabric.util.array.min,max=fabric.util.array.max,extend=fabric.util.object.extend,_toString=Object.prototype.toString,drawArc=fabric.util.drawArc,commandLengths={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},repeatedCommands={m:'l',M:'L'};if(fabric.Path){fabric.warn('fabric.Path is already defined');return;}fabric.Path = fabric.util.createClass(fabric.Object,{type:'path',path:null,minX:0,minY:0,initialize:function initialize(path,options){options = options || {};this.setOptions(options);if(!path){throw new Error('`path` argument is required');}var fromArray=_toString.call(path) === '[object Array]';this.path = fromArray?path:path.match && path.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);if(!this.path){return;}if(!fromArray){this.path = this._parsePath();}this._setPositionDimensions();if(options.sourcePath){this.setSourcePath(options.sourcePath);}},_setPositionDimensions:function _setPositionDimensions(){var calcDim=this._parseDimensions();this.minX = calcDim.left;this.minY = calcDim.top;this.width = calcDim.width;this.height = calcDim.height;calcDim.left += this.originX === 'center'?this.width / 2:this.originX === 'right'?this.width:0;calcDim.top += this.originY === 'center'?this.height / 2:this.originY === 'bottom'?this.height:0;this.top = this.top || calcDim.top;this.left = this.left || calcDim.left;this.pathOffset = this.pathOffset || {x:this.minX + this.width / 2,y:this.minY + this.height / 2};},_render:function _render(ctx){var current,previous=null,subpathStartX=0,subpathStartY=0,x=0,y=0,controlX=0,controlY=0,tempX,tempY,l=-this.pathOffset.x,t=-this.pathOffset.y;if(this.group && this.group.type === 'path-group'){l = 0;t = 0;}ctx.beginPath();for(var i=0,len=this.path.length;i < len;++i) {current = this.path[i];switch(current[0]){case 'l':x += current[1];y += current[2];ctx.lineTo(x + l,y + t);break;case 'L':x = current[1];y = current[2];ctx.lineTo(x + l,y + t);break;case 'h':x += current[1];ctx.lineTo(x + l,y + t);break;case 'H':x = current[1];ctx.lineTo(x + l,y + t);break;case 'v':y += current[1];ctx.lineTo(x + l,y + t);break;case 'V':y = current[1];ctx.lineTo(x + l,y + t);break;case 'm':x += current[1];y += current[2];subpathStartX = x;subpathStartY = y;ctx.moveTo(x + l,y + t);break;case 'M':x = current[1];y = current[2];subpathStartX = x;subpathStartY = y;ctx.moveTo(x + l,y + t);break;case 'c':tempX = x + current[5];tempY = y + current[6];controlX = x + current[3];controlY = y + current[4];ctx.bezierCurveTo(x + current[1] + l,y + current[2] + t,controlX + l,controlY + t,tempX + l,tempY + t);x = tempX;y = tempY;break;case 'C':x = current[5];y = current[6];controlX = current[3];controlY = current[4];ctx.bezierCurveTo(current[1] + l,current[2] + t,controlX + l,controlY + t,x + l,y + t);break;case 's':tempX = x + current[3];tempY = y + current[4];if(previous[0].match(/[CcSs]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}ctx.bezierCurveTo(controlX + l,controlY + t,x + current[1] + l,y + current[2] + t,tempX + l,tempY + t);controlX = x + current[1];controlY = y + current[2];x = tempX;y = tempY;break;case 'S':tempX = current[3];tempY = current[4];if(previous[0].match(/[CcSs]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}ctx.bezierCurveTo(controlX + l,controlY + t,current[1] + l,current[2] + t,tempX + l,tempY + t);x = tempX;y = tempY;controlX = current[1];controlY = current[2];break;case 'q':tempX = x + current[3];tempY = y + current[4];controlX = x + current[1];controlY = y + current[2];ctx.quadraticCurveTo(controlX + l,controlY + t,tempX + l,tempY + t);x = tempX;y = tempY;break;case 'Q':tempX = current[3];tempY = current[4];ctx.quadraticCurveTo(current[1] + l,current[2] + t,tempX + l,tempY + t);x = tempX;y = tempY;controlX = current[1];controlY = current[2];break;case 't':tempX = x + current[1];tempY = y + current[2];if(previous[0].match(/[QqTt]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}ctx.quadraticCurveTo(controlX + l,controlY + t,tempX + l,tempY + t);x = tempX;y = tempY;break;case 'T':tempX = current[1];tempY = current[2];if(previous[0].match(/[QqTt]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}ctx.quadraticCurveTo(controlX + l,controlY + t,tempX + l,tempY + t);x = tempX;y = tempY;break;case 'a':drawArc(ctx,x + l,y + t,[current[1],current[2],current[3],current[4],current[5],current[6] + x + l,current[7] + y + t]);x += current[6];y += current[7];break;case 'A':drawArc(ctx,x + l,y + t,[current[1],current[2],current[3],current[4],current[5],current[6] + l,current[7] + t]);x = current[6];y = current[7];break;case 'z':case 'Z':x = subpathStartX;y = subpathStartY;ctx.closePath();break;}previous = current;}this._renderFill(ctx);this._renderStroke(ctx);},toString:function toString(){return '#<fabric.Path (' + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + ' }>';},toObject:function toObject(propertiesToInclude){var o=extend(this.callSuper('toObject',propertiesToInclude),{path:this.path.map(function(item){return item.slice();}),pathOffset:this.pathOffset});if(this.sourcePath){o.sourcePath = this.sourcePath;}if(this.transformMatrix){o.transformMatrix = this.transformMatrix;}return o;},toDatalessObject:function toDatalessObject(propertiesToInclude){var o=this.toObject(propertiesToInclude);if(this.sourcePath){o.path = this.sourcePath;}delete o.sourcePath;return o;},toSVG:function toSVG(reviver){var chunks=[],markup=this._createBaseSVGMarkup(),addTransform='';for(var i=0,len=this.path.length;i < len;i++) {chunks.push(this.path[i].join(' '));}var path=chunks.join(' ');if(!(this.group && this.group.type === 'path-group')){addTransform = ' translate(' + -this.pathOffset.x + ', ' + -this.pathOffset.y + ') ';}markup.push('<path ','d="',path,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),addTransform,this.getSvgTransformMatrix(),'" stroke-linecap="round" ','/>\n');return reviver?reviver(markup.join('')):markup.join('');},complexity:function complexity(){return this.path.length;},_parsePath:function _parsePath(){var result=[],coords=[],currentPath,parsed,re=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/ig,match,coordsStr;for(var i=0,coordsParsed,len=this.path.length;i < len;i++) {currentPath = this.path[i];coordsStr = currentPath.slice(1).trim();coords.length = 0;while(match = re.exec(coordsStr)) {coords.push(match[0]);}coordsParsed = [currentPath.charAt(0)];for(var j=0,jlen=coords.length;j < jlen;j++) {parsed = parseFloat(coords[j]);if(!isNaN(parsed)){coordsParsed.push(parsed);}}var command=coordsParsed[0],commandLength=commandLengths[command.toLowerCase()],repeatedCommand=repeatedCommands[command] || command;if(coordsParsed.length - 1 > commandLength){for(var k=1,klen=coordsParsed.length;k < klen;k += commandLength) {result.push([command].concat(coordsParsed.slice(k,k + commandLength)));command = repeatedCommand;}}else {result.push(coordsParsed);}}return result;},_parseDimensions:function _parseDimensions(){var aX=[],aY=[],current,previous=null,subpathStartX=0,subpathStartY=0,x=0,y=0,controlX=0,controlY=0,tempX,tempY,bounds;for(var i=0,len=this.path.length;i < len;++i) {current = this.path[i];switch(current[0]){case 'l':x += current[1];y += current[2];bounds = [];break;case 'L':x = current[1];y = current[2];bounds = [];break;case 'h':x += current[1];bounds = [];break;case 'H':x = current[1];bounds = [];break;case 'v':y += current[1];bounds = [];break;case 'V':y = current[1];bounds = [];break;case 'm':x += current[1];y += current[2];subpathStartX = x;subpathStartY = y;bounds = [];break;case 'M':x = current[1];y = current[2];subpathStartX = x;subpathStartY = y;bounds = [];break;case 'c':tempX = x + current[5];tempY = y + current[6];controlX = x + current[3];controlY = y + current[4];bounds = fabric.util.getBoundsOfCurve(x,y,x + current[1],y + current[2],controlX,controlY,tempX,tempY);x = tempX;y = tempY;break;case 'C':x = current[5];y = current[6];controlX = current[3];controlY = current[4];bounds = fabric.util.getBoundsOfCurve(x,y,current[1],current[2],controlX,controlY,x,y);break;case 's':tempX = x + current[3];tempY = y + current[4];if(previous[0].match(/[CcSs]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}bounds = fabric.util.getBoundsOfCurve(x,y,controlX,controlY,x + current[1],y + current[2],tempX,tempY);controlX = x + current[1];controlY = y + current[2];x = tempX;y = tempY;break;case 'S':tempX = current[3];tempY = current[4];if(previous[0].match(/[CcSs]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}bounds = fabric.util.getBoundsOfCurve(x,y,controlX,controlY,current[1],current[2],tempX,tempY);x = tempX;y = tempY;controlX = current[1];controlY = current[2];break;case 'q':tempX = x + current[3];tempY = y + current[4];controlX = x + current[1];controlY = y + current[2];bounds = fabric.util.getBoundsOfCurve(x,y,controlX,controlY,controlX,controlY,tempX,tempY);x = tempX;y = tempY;break;case 'Q':controlX = current[1];controlY = current[2];bounds = fabric.util.getBoundsOfCurve(x,y,controlX,controlY,controlX,controlY,current[3],current[4]);x = current[3];y = current[4];break;case 't':tempX = x + current[1];tempY = y + current[2];if(previous[0].match(/[QqTt]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}bounds = fabric.util.getBoundsOfCurve(x,y,controlX,controlY,controlX,controlY,tempX,tempY);x = tempX;y = tempY;break;case 'T':tempX = current[1];tempY = current[2];if(previous[0].match(/[QqTt]/) === null){controlX = x;controlY = y;}else {controlX = 2 * x - controlX;controlY = 2 * y - controlY;}bounds = fabric.util.getBoundsOfCurve(x,y,controlX,controlY,controlX,controlY,tempX,tempY);x = tempX;y = tempY;break;case 'a':bounds = fabric.util.getBoundsOfArc(x,y,current[1],current[2],current[3],current[4],current[5],current[6] + x,current[7] + y);x += current[6];y += current[7];break;case 'A':bounds = fabric.util.getBoundsOfArc(x,y,current[1],current[2],current[3],current[4],current[5],current[6],current[7]);x = current[6];y = current[7];break;case 'z':case 'Z':x = subpathStartX;y = subpathStartY;break;}previous = current;bounds.forEach(function(point){aX.push(point.x);aY.push(point.y);});aX.push(x);aY.push(y);}var minX=min(aX),minY=min(aY),maxX=max(aX),maxY=max(aY),deltaX=maxX - minX,deltaY=maxY - minY,o={left:minX,top:minY,width:deltaX,height:deltaY};return o;}});fabric.Path.fromObject = function(object,callback){if(typeof object.path === 'string'){fabric.loadSVGFromURL(object.path,function(elements){var path=elements[0],pathUrl=object.path;delete object.path;fabric.util.object.extend(path,object);path.setSourcePath(pathUrl);callback(path);});}else {callback(new fabric.Path(object.path,object));}};fabric.Path.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat(['d']);fabric.Path.fromElement = function(element,callback,options){var parsedAttributes=fabric.parseAttributes(element,fabric.Path.ATTRIBUTE_NAMES);callback && callback(new fabric.Path(parsedAttributes.d,extend(parsedAttributes,options)));};fabric.Path.async = true;})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend,invoke=fabric.util.array.invoke,parentToObject=fabric.Object.prototype.toObject;if(fabric.PathGroup){fabric.warn('fabric.PathGroup is already defined');return;}fabric.PathGroup = fabric.util.createClass(fabric.Path,{type:'path-group',fill:'',initialize:function initialize(paths,options){options = options || {};this.paths = paths || [];for(var i=this.paths.length;i--;) {this.paths[i].group = this;}if(options.toBeParsed){this.parseDimensionsFromPaths(options);delete options.toBeParsed;}this.setOptions(options);this.setCoords();if(options.sourcePath){this.setSourcePath(options.sourcePath);}},parseDimensionsFromPaths:function parseDimensionsFromPaths(options){var points,p,xC=[],yC=[],path,height,width,m=this.transformMatrix;for(var j=this.paths.length;j--;) {path = this.paths[j];height = path.height + path.strokeWidth;width = path.width + path.strokeWidth;points = [{x:path.left,y:path.top},{x:path.left + width,y:path.top},{x:path.left,y:path.top + height},{x:path.left + width,y:path.top + height}];for(var i=0;i < points.length;i++) {p = points[i];if(m){p = fabric.util.transformPoint(p,m,false);}xC.push(p.x);yC.push(p.y);}}options.width = Math.max.apply(null,xC);options.height = Math.max.apply(null,yC);},render:function render(ctx){if(!this.visible){return;}ctx.save();if(this.transformMatrix){ctx.transform.apply(ctx,this.transformMatrix);}this.transform(ctx);this._setShadow(ctx);this.clipTo && fabric.util.clipContext(this,ctx);ctx.translate(-this.width / 2,-this.height / 2);for(var i=0,l=this.paths.length;i < l;++i) {this.paths[i].render(ctx,true);}this.clipTo && ctx.restore();this._removeShadow(ctx);ctx.restore();},_set:function _set(prop,value){if(prop === 'fill' && value && this.isSameColor()){var i=this.paths.length;while(i--) {this.paths[i]._set(prop,value);}}return this.callSuper('_set',prop,value);},toObject:function toObject(propertiesToInclude){var o=extend(parentToObject.call(this,propertiesToInclude),{paths:invoke(this.getObjects(),'toObject',propertiesToInclude)});if(this.sourcePath){o.sourcePath = this.sourcePath;}return o;},toDatalessObject:function toDatalessObject(propertiesToInclude){var o=this.toObject(propertiesToInclude);if(this.sourcePath){o.paths = this.sourcePath;}return o;},toSVG:function toSVG(reviver){var objects=this.getObjects(),p=this.getPointByOrigin('left','top'),translatePart='translate(' + p.x + ' ' + p.y + ')',markup=['<g ','style="',this.getSvgStyles(),'" ','transform="',this.getSvgTransformMatrix(),translatePart,this.getSvgTransform(),'" ','>\n'];for(var i=0,len=objects.length;i < len;i++) {markup.push(objects[i].toSVG(reviver));}markup.push('</g>\n');return reviver?reviver(markup.join('')):markup.join('');},toString:function toString(){return '#<fabric.PathGroup (' + this.complexity() + '): { top: ' + this.top + ', left: ' + this.left + ' }>';},isSameColor:function isSameColor(){var firstPathFill=(this.getObjects()[0].get('fill') || '').toLowerCase();return this.getObjects().every(function(path){return (path.get('fill') || '').toLowerCase() === firstPathFill;});},complexity:function complexity(){return this.paths.reduce(function(total,path){return total + (path && path.complexity?path.complexity():0);},0);},getObjects:function getObjects(){return this.paths;}});fabric.PathGroup.fromObject = function(object,callback){if(typeof object.paths === 'string'){fabric.loadSVGFromURL(object.paths,function(elements){var pathUrl=object.paths;delete object.paths;var pathGroup=fabric.util.groupSVGElements(elements,object,pathUrl);callback(pathGroup);});}else {fabric.util.enlivenObjects(object.paths,function(enlivenedObjects){delete object.paths;callback(new fabric.PathGroup(enlivenedObjects,object));});}};fabric.PathGroup.async = true;})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend,min=fabric.util.array.min,max=fabric.util.array.max,invoke=fabric.util.array.invoke;if(fabric.Group){return;}var _lockProperties={lockMovementX:true,lockMovementY:true,lockRotation:true,lockScalingX:true,lockScalingY:true,lockUniScaling:true};fabric.Group = fabric.util.createClass(fabric.Object,fabric.Collection,{type:'group',initialize:function initialize(objects,options){options = options || {};this._objects = objects || [];for(var i=this._objects.length;i--;) {this._objects[i].group = this;}this.originalState = {};this.callSuper('initialize');if(options.originX){this.originX = options.originX;}if(options.originY){this.originY = options.originY;}this._calcBounds();this._updateObjectsCoords();this.callSuper('initialize',options);this.setCoords();this.saveCoords();},_updateObjectsCoords:function _updateObjectsCoords(){this.forEachObject(this._updateObjectCoords,this);},_updateObjectCoords:function _updateObjectCoords(object){var objectLeft=object.getLeft(),objectTop=object.getTop(),center=this.getCenterPoint();object.set({originalLeft:objectLeft,originalTop:objectTop,left:objectLeft - center.x,top:objectTop - center.y});object.setCoords();object.__origHasControls = object.hasControls;object.hasControls = false;},toString:function toString(){return '#<fabric.Group: (' + this.complexity() + ')>';},addWithUpdate:function addWithUpdate(object){this._restoreObjectsState();if(object){this._objects.push(object);object.group = this;}this.forEachObject(this._setObjectActive,this);this._calcBounds();this._updateObjectsCoords();return this;},_setObjectActive:function _setObjectActive(object){object.set('active',true);object.group = this;},removeWithUpdate:function removeWithUpdate(object){this._moveFlippedObject(object);this._restoreObjectsState();this.forEachObject(this._setObjectActive,this);this.remove(object);this._calcBounds();this._updateObjectsCoords();return this;},_onObjectAdded:function _onObjectAdded(object){object.group = this;},_onObjectRemoved:function _onObjectRemoved(object){delete object.group;object.set('active',false);},delegatedProperties:{fill:true,opacity:true,fontFamily:true,fontWeight:true,fontSize:true,fontStyle:true,lineHeight:true,textDecoration:true,textAlign:true,backgroundColor:true},_set:function _set(key,value){if(key in this.delegatedProperties){var i=this._objects.length;while(i--) {this._objects[i].set(key,value);}}this.callSuper('_set',key,value);},toObject:function toObject(propertiesToInclude){return extend(this.callSuper('toObject',propertiesToInclude),{objects:invoke(this._objects,'toObject',propertiesToInclude)});},render:function render(ctx){if(!this.visible){return;}ctx.save();this.clipTo && fabric.util.clipContext(this,ctx);this.transform(ctx);for(var i=0,len=this._objects.length;i < len;i++) {this._renderObject(this._objects[i],ctx);}this.clipTo && ctx.restore();ctx.restore();},_renderControls:function _renderControls(ctx,noTransform){this.callSuper('_renderControls',ctx,noTransform);for(var i=0,len=this._objects.length;i < len;i++) {this._objects[i]._renderControls(ctx);}},_renderObject:function _renderObject(object,ctx){var originalHasRotatingPoint=object.hasRotatingPoint;if(!object.visible){return;}object.hasRotatingPoint = false;object.render(ctx);object.hasRotatingPoint = originalHasRotatingPoint;},_restoreObjectsState:function _restoreObjectsState(){this._objects.forEach(this._restoreObjectState,this);return this;},realizeTransform:function realizeTransform(object){this._moveFlippedObject(object);this._setObjectPosition(object);return object;},_moveFlippedObject:function _moveFlippedObject(object){var oldOriginX=object.get('originX'),oldOriginY=object.get('originY'),center=object.getCenterPoint();object.set({originX:'center',originY:'center',left:center.x,top:center.y});this._toggleFlipping(object);var newOrigin=object.getPointByOrigin(oldOriginX,oldOriginY);object.set({originX:oldOriginX,originY:oldOriginY,left:newOrigin.x,top:newOrigin.y});return this;},_toggleFlipping:function _toggleFlipping(object){if(this.flipX){object.toggle('flipX');object.set('left',-object.get('left'));object.setAngle(-object.getAngle());}if(this.flipY){object.toggle('flipY');object.set('top',-object.get('top'));object.setAngle(-object.getAngle());}},_restoreObjectState:function _restoreObjectState(object){this._setObjectPosition(object);object.setCoords();object.hasControls = object.__origHasControls;delete object.__origHasControls;object.set('active',false);object.setCoords();delete object.group;return this;},_setObjectPosition:function _setObjectPosition(object){var center=this.getCenterPoint(),rotated=this._getRotatedLeftTop(object);object.set({angle:object.getAngle() + this.getAngle(),left:center.x + rotated.left,top:center.y + rotated.top,scaleX:object.get('scaleX') * this.get('scaleX'),scaleY:object.get('scaleY') * this.get('scaleY')});},_getRotatedLeftTop:function _getRotatedLeftTop(object){var groupAngle=this.getAngle() * (Math.PI / 180);return {left:-Math.sin(groupAngle) * object.getTop() * this.get('scaleY') + Math.cos(groupAngle) * object.getLeft() * this.get('scaleX'),top:Math.cos(groupAngle) * object.getTop() * this.get('scaleY') + Math.sin(groupAngle) * object.getLeft() * this.get('scaleX')};},destroy:function destroy(){this._objects.forEach(this._moveFlippedObject,this);return this._restoreObjectsState();},saveCoords:function saveCoords(){this._originalLeft = this.get('left');this._originalTop = this.get('top');return this;},hasMoved:function hasMoved(){return this._originalLeft !== this.get('left') || this._originalTop !== this.get('top');},setObjectsCoords:function setObjectsCoords(){this.forEachObject(function(object){object.setCoords();});return this;},_calcBounds:function _calcBounds(onlyWidthHeight){var aX=[],aY=[],o,prop,props=['tr','br','bl','tl'];for(var i=0,len=this._objects.length;i < len;++i) {o = this._objects[i];o.setCoords();for(var j=0;j < props.length;j++) {prop = props[j];aX.push(o.oCoords[prop].x);aY.push(o.oCoords[prop].y);}}this.set(this._getBounds(aX,aY,onlyWidthHeight));},_getBounds:function _getBounds(aX,aY,onlyWidthHeight){var ivt=fabric.util.invertTransform(this.getViewportTransform()),minXY=fabric.util.transformPoint(new fabric.Point(min(aX),min(aY)),ivt),maxXY=fabric.util.transformPoint(new fabric.Point(max(aX),max(aY)),ivt),obj={width:maxXY.x - minXY.x || 0,height:maxXY.y - minXY.y || 0};if(!onlyWidthHeight){obj.left = minXY.x || 0;obj.top = minXY.y || 0;if(this.originX === 'center'){obj.left += obj.width / 2;}if(this.originX === 'right'){obj.left += obj.width;}if(this.originY === 'center'){obj.top += obj.height / 2;}if(this.originY === 'bottom'){obj.top += obj.height;}}return obj;},toSVG:function toSVG(reviver){var markup=['<g ','transform="',this.getSvgTransform(),'">\n'];for(var i=0,len=this._objects.length;i < len;i++) {markup.push(this._objects[i].toSVG(reviver));}markup.push('</g>\n');return reviver?reviver(markup.join('')):markup.join('');},get:function get(prop){if(prop in _lockProperties){if(this[prop]){return this[prop];}else {for(var i=0,len=this._objects.length;i < len;i++) {if(this._objects[i][prop]){return true;}}return false;}}else {if(prop in this.delegatedProperties){return this._objects[0] && this._objects[0].get(prop);}return this[prop];}}});fabric.Group.fromObject = function(object,callback){fabric.util.enlivenObjects(object.objects,function(enlivenedObjects){delete object.objects;callback && callback(new fabric.Group(enlivenedObjects,object));});};fabric.Group.async = true;})(true?exports:undefined);(function(global){'use strict';var extend=fabric.util.object.extend;if(!global.fabric){global.fabric = {};}if(global.fabric.Image){fabric.warn('fabric.Image is already defined.');return;}fabric.Image = fabric.util.createClass(fabric.Object,{type:'image',crossOrigin:'',alignX:'none',alignY:'none',meetOrSlice:'meet',_lastScaleX:1,_lastScaleY:1,initialize:function initialize(element,options){options || (options = {});this.filters = [];this.resizeFilters = [];this.callSuper('initialize',options);this._initElement(element,options);this._initConfig(options);if(options.filters){this.filters = options.filters;this.applyFilters();}},getElement:function getElement(){return this._element;},setElement:function setElement(element,callback,options){this._element = element;this._originalElement = element;this._initConfig(options);if(this.filters.length !== 0){this.applyFilters(callback);}else if(callback){callback();}return this;},setCrossOrigin:function setCrossOrigin(value){this.crossOrigin = value;this._element.crossOrigin = value;return this;},getOriginalSize:function getOriginalSize(){var element=this.getElement();return {width:element.width,height:element.height};},_stroke:function _stroke(ctx){ctx.save();this._setStrokeStyles(ctx);ctx.beginPath();ctx.strokeRect(-this.width / 2,-this.height / 2,this.width,this.height);ctx.closePath();ctx.restore();},_renderDashedStroke:function _renderDashedStroke(ctx){var x=-this.width / 2,y=-this.height / 2,w=this.width,h=this.height;ctx.save();this._setStrokeStyles(ctx);ctx.beginPath();fabric.util.drawDashedLine(ctx,x,y,x + w,y,this.strokeDashArray);fabric.util.drawDashedLine(ctx,x + w,y,x + w,y + h,this.strokeDashArray);fabric.util.drawDashedLine(ctx,x + w,y + h,x,y + h,this.strokeDashArray);fabric.util.drawDashedLine(ctx,x,y + h,x,y,this.strokeDashArray);ctx.closePath();ctx.restore();},toObject:function toObject(propertiesToInclude){return extend(this.callSuper('toObject',propertiesToInclude),{src:this._originalElement.src || this._originalElement._src,filters:this.filters.map(function(filterObj){return filterObj && filterObj.toObject();}),crossOrigin:this.crossOrigin,alignX:this.alignX,alignY:this.alignY,meetOrSlice:this.meetOrSlice});},toSVG:function toSVG(reviver){var markup=[],x=-this.width / 2,y=-this.height / 2,preserveAspectRatio='none';if(this.group && this.group.type === 'path-group'){x = this.left;y = this.top;}if(this.alignX !== 'none' && this.alignY !== 'none'){preserveAspectRatio = 'x' + this.alignX + 'Y' + this.alignY + ' ' + this.meetOrSlice;}markup.push('<g transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'">\n','<image xlink:href="',this.getSvgSrc(),'" x="',x,'" y="',y,'" style="',this.getSvgStyles(),'" width="',this.width,'" height="',this.height,'" preserveAspectRatio="',preserveAspectRatio,'"','></image>\n');if(this.stroke || this.strokeDashArray){var origFill=this.fill;this.fill = null;markup.push('<rect ','x="',x,'" y="',y,'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'"/>\n');this.fill = origFill;}markup.push('</g>\n');return reviver?reviver(markup.join('')):markup.join('');},getSrc:function getSrc(){if(this.getElement()){return this.getElement().src || this.getElement()._src;}},setSrc:function setSrc(src,callback,options){fabric.util.loadImage(src,function(img){return this.setElement(img,callback,options);},this,options && options.crossOrigin);},toString:function toString(){return '#<fabric.Image: { src: "' + this.getSrc() + '" }>';},clone:function clone(callback,propertiesToInclude){this.constructor.fromObject(this.toObject(propertiesToInclude),callback);},applyFilters:function applyFilters(callback,filters,imgElement,forResizing){filters = filters || this.filters;imgElement = imgElement || this._originalElement;if(!imgElement){return;}var imgEl=imgElement,canvasEl=fabric.util.createCanvasElement(),replacement=fabric.util.createImage(),_this=this;canvasEl.width = imgEl.width;canvasEl.height = imgEl.height;canvasEl.getContext('2d').drawImage(imgEl,0,0,imgEl.width,imgEl.height);if(filters.length === 0){this._element = imgElement;callback && callback();return canvasEl;}filters.forEach(function(filter){filter && filter.applyTo(canvasEl,filter.scaleX || _this.scaleX,filter.scaleY || _this.scaleY);if(!forResizing && filter && filter.type === 'Resize'){_this.width *= filter.scaleX;_this.height *= filter.scaleY;}});replacement.width = canvasEl.width;replacement.height = canvasEl.height;if(fabric.isLikelyNode){replacement.src = canvasEl.toBuffer(undefined,fabric.Image.pngCompression);_this._element = replacement;!forResizing && (_this._filteredEl = replacement);callback && callback();}else {replacement.onload = function(){_this._element = replacement;!forResizing && (_this._filteredEl = replacement);callback && callback();replacement.onload = canvasEl = imgEl = null;};replacement.src = canvasEl.toDataURL('image/png');}return canvasEl;},_render:function _render(ctx,noTransform){var x,y,imageMargins=this._findMargins(),elementToDraw;x = noTransform?this.left:-this.width / 2;y = noTransform?this.top:-this.height / 2;if(this.meetOrSlice === 'slice'){ctx.beginPath();ctx.rect(x,y,this.width,this.height);ctx.clip();}if(this.isMoving === false && this.resizeFilters.length && this._needsResize()){this._lastScaleX = this.scaleX;this._lastScaleY = this.scaleY;elementToDraw = this.applyFilters(null,this.resizeFilters,this._filteredEl || this._originalElement,true);}else {elementToDraw = this._element;}elementToDraw && ctx.drawImage(elementToDraw,x + imageMargins.marginX,y + imageMargins.marginY,imageMargins.width,imageMargins.height);this._renderStroke(ctx);},_needsResize:function _needsResize(){return this.scaleX !== this._lastScaleX || this.scaleY !== this._lastScaleY;},_findMargins:function _findMargins(){var width=this.width,height=this.height,scales,scale,marginX=0,marginY=0;if(this.alignX !== 'none' || this.alignY !== 'none'){scales = [this.width / this._element.width,this.height / this._element.height];scale = this.meetOrSlice === 'meet'?Math.min.apply(null,scales):Math.max.apply(null,scales);width = this._element.width * scale;height = this._element.height * scale;if(this.alignX === 'Mid'){marginX = (this.width - width) / 2;}if(this.alignX === 'Max'){marginX = this.width - width;}if(this.alignY === 'Mid'){marginY = (this.height - height) / 2;}if(this.alignY === 'Max'){marginY = this.height - height;}}return {width:width,height:height,marginX:marginX,marginY:marginY};},_resetWidthHeight:function _resetWidthHeight(){var element=this.getElement();this.set('width',element.width);this.set('height',element.height);},_initElement:function _initElement(element){this.setElement(fabric.util.getById(element));fabric.util.addClass(this.getElement(),fabric.Image.CSS_CANVAS);},_initConfig:function _initConfig(options){options || (options = {});this.setOptions(options);this._setWidthHeight(options);if(this._element && this.crossOrigin){this._element.crossOrigin = this.crossOrigin;}},_initFilters:function _initFilters(object,callback){if(object.filters && object.filters.length){fabric.util.enlivenObjects(object.filters,function(enlivenedObjects){callback && callback(enlivenedObjects);},'fabric.Image.filters');}else {callback && callback();}},_setWidthHeight:function _setWidthHeight(options){this.width = 'width' in options?options.width:this.getElement()?this.getElement().width || 0:0;this.height = 'height' in options?options.height:this.getElement()?this.getElement().height || 0:0;},complexity:function complexity(){return 1;}});fabric.Image.CSS_CANVAS = 'canvas-img';fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc;fabric.Image.fromObject = function(object,callback){fabric.util.loadImage(object.src,function(img){fabric.Image.prototype._initFilters.call(object,object,function(filters){object.filters = filters || [];var instance=new fabric.Image(img,object);callback && callback(instance);});},null,object.crossOrigin);};fabric.Image.fromURL = function(url,callback,imgOptions){fabric.util.loadImage(url,function(img){callback && callback(new fabric.Image(img,imgOptions));},null,imgOptions && imgOptions.crossOrigin);};fabric.Image.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat('x y width height preserveAspectRatio xlink:href'.split(' '));fabric.Image.fromElement = function(element,callback,options){var parsedAttributes=fabric.parseAttributes(element,fabric.Image.ATTRIBUTE_NAMES),align='xMidYMid',meetOrSlice='meet',alignX,alignY,aspectRatioAttrs;if(parsedAttributes.preserveAspectRatio){aspectRatioAttrs = parsedAttributes.preserveAspectRatio.split(' ');}if(aspectRatioAttrs && aspectRatioAttrs.length){meetOrSlice = aspectRatioAttrs.pop();if(meetOrSlice !== 'meet' && meetOrSlice !== 'slice'){align = meetOrSlice;meetOrSlice = 'meet';}else if(aspectRatioAttrs.length){align = aspectRatioAttrs.pop();}}alignX = align !== 'none'?align.slice(1,4):'none';alignY = align !== 'none'?align.slice(5,8):'none';parsedAttributes.alignX = alignX;parsedAttributes.alignY = alignY;parsedAttributes.meetOrSlice = meetOrSlice;fabric.Image.fromURL(parsedAttributes['xlink:href'],callback,extend(options?fabric.util.object.clone(options):{},parsedAttributes));};fabric.Image.async = true;fabric.Image.pngCompression = 1;})(true?exports:undefined);fabric.util.object.extend(fabric.Object.prototype,{_getAngleValueForStraighten:function _getAngleValueForStraighten(){var angle=this.getAngle() % 360;if(angle > 0){return Math.round((angle - 1) / 90) * 90;}return Math.round(angle / 90) * 90;},straighten:function straighten(){this.setAngle(this._getAngleValueForStraighten());return this;},fxStraighten:function fxStraighten(callbacks){callbacks = callbacks || {};var empty=function empty(){},_onComplete4=callbacks.onComplete || empty,_onChange4=callbacks.onChange || empty,_this=this;fabric.util.animate({startValue:this.get('angle'),endValue:this._getAngleValueForStraighten(),duration:this.FX_DURATION,onChange:function onChange(value){_this.setAngle(value);_onChange4();},onComplete:function onComplete(){_this.setCoords();_onComplete4();},onStart:function onStart(){_this.set('active',false);}});return this;}});fabric.util.object.extend(fabric.StaticCanvas.prototype,{straightenObject:function straightenObject(object){object.straighten();this.renderAll();return this;},fxStraightenObject:function fxStraightenObject(object){object.fxStraighten({onChange:this.renderAll.bind(this)});return this;}});fabric.Image.filters = fabric.Image.filters || {};fabric.Image.filters.BaseFilter = fabric.util.createClass({type:'BaseFilter',initialize:function initialize(options){if(options){this.setOptions(options);}},setOptions:function setOptions(options){for(var prop in options) {this[prop] = options[prop];}},toObject:function toObject(){return {type:this.type};},toJSON:function toJSON(){return this.toObject();}});(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.Brightness = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Brightness',initialize:function initialize(options){options = options || {};this.brightness = options.brightness || 0;},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,brightness=this.brightness;for(var i=0,len=data.length;i < len;i += 4) {data[i] += brightness;data[i + 1] += brightness;data[i + 2] += brightness;}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{brightness:this.brightness});}});fabric.Image.filters.Brightness.fromObject = function(object){return new fabric.Image.filters.Brightness(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.Convolute = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Convolute',initialize:function initialize(options){options = options || {};this.opaque = options.opaque;this.matrix = options.matrix || [0,0,0,0,1,0,0,0,0];var canvasEl=fabric.util.createCanvasElement();this.tmpCtx = canvasEl.getContext('2d');},_createImageData:function _createImageData(w,h){return this.tmpCtx.createImageData(w,h);},applyTo:function applyTo(canvasEl){var weights=this.matrix,context=canvasEl.getContext('2d'),pixels=context.getImageData(0,0,canvasEl.width,canvasEl.height),side=Math.round(Math.sqrt(weights.length)),halfSide=Math.floor(side / 2),src=pixels.data,sw=pixels.width,sh=pixels.height,w=sw,h=sh,output=this._createImageData(w,h),dst=output.data,alphaFac=this.opaque?1:0;for(var y=0;y < h;y++) {for(var x=0;x < w;x++) {var sy=y,sx=x,dstOff=(y * w + x) * 4,r=0,g=0,b=0,a=0;for(var cy=0;cy < side;cy++) {for(var cx=0;cx < side;cx++) {var scy=sy + cy - halfSide,scx=sx + cx - halfSide;if(scy < 0 || scy > sh || scx < 0 || scx > sw){continue;}var srcOff=(scy * sw + scx) * 4,wt=weights[cy * side + cx];r += src[srcOff] * wt;g += src[srcOff + 1] * wt;b += src[srcOff + 2] * wt;a += src[srcOff + 3] * wt;}}dst[dstOff] = r;dst[dstOff + 1] = g;dst[dstOff + 2] = b;dst[dstOff + 3] = a + alphaFac * (255 - a);}}context.putImageData(output,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{opaque:this.opaque,matrix:this.matrix});}});fabric.Image.filters.Convolute.fromObject = function(object){return new fabric.Image.filters.Convolute(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.GradientTransparency = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'GradientTransparency',initialize:function initialize(options){options = options || {};this.threshold = options.threshold || 100;},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,threshold=this.threshold,total=data.length;for(var i=0,len=data.length;i < len;i += 4) {data[i + 3] = threshold + 255 * (total - i) / total;}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{threshold:this.threshold});}});fabric.Image.filters.GradientTransparency.fromObject = function(object){return new fabric.Image.filters.GradientTransparency(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});fabric.Image.filters.Grayscale = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Grayscale',applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,len=imageData.width * imageData.height * 4,index=0,average;while(index < len) {average = (data[index] + data[index + 1] + data[index + 2]) / 3;data[index] = average;data[index + 1] = average;data[index + 2] = average;index += 4;}context.putImageData(imageData,0,0);}});fabric.Image.filters.Grayscale.fromObject = function(){return new fabric.Image.filters.Grayscale();};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});fabric.Image.filters.Invert = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Invert',applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,iLen=data.length,i;for(i = 0;i < iLen;i += 4) {data[i] = 255 - data[i];data[i + 1] = 255 - data[i + 1];data[i + 2] = 255 - data[i + 2];}context.putImageData(imageData,0,0);}});fabric.Image.filters.Invert.fromObject = function(){return new fabric.Image.filters.Invert();};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.Mask = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Mask',initialize:function initialize(options){options = options || {};this.mask = options.mask;this.channel = [0,1,2,3].indexOf(options.channel) > -1?options.channel:0;},applyTo:function applyTo(canvasEl){if(!this.mask){return;}var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,maskEl=this.mask.getElement(),maskCanvasEl=fabric.util.createCanvasElement(),channel=this.channel,i,iLen=imageData.width * imageData.height * 4;maskCanvasEl.width = maskEl.width;maskCanvasEl.height = maskEl.height;maskCanvasEl.getContext('2d').drawImage(maskEl,0,0,maskEl.width,maskEl.height);var maskImageData=maskCanvasEl.getContext('2d').getImageData(0,0,maskEl.width,maskEl.height),maskData=maskImageData.data;for(i = 0;i < iLen;i += 4) {data[i + 3] = maskData[i + channel];}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{mask:this.mask.toObject(),channel:this.channel});}});fabric.Image.filters.Mask.fromObject = function(object,callback){fabric.util.loadImage(object.mask.src,function(img){object.mask = new fabric.Image(img,object.mask);callback && callback(new fabric.Image.filters.Mask(object));});};fabric.Image.filters.Mask.async = true;})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.Noise = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Noise',initialize:function initialize(options){options = options || {};this.noise = options.noise || 0;},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,noise=this.noise,rand;for(var i=0,len=data.length;i < len;i += 4) {rand = (0.5 - Math.random()) * noise;data[i] += rand;data[i + 1] += rand;data[i + 2] += rand;}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{noise:this.noise});}});fabric.Image.filters.Noise.fromObject = function(object){return new fabric.Image.filters.Noise(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.Pixelate = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Pixelate',initialize:function initialize(options){options = options || {};this.blocksize = options.blocksize || 4;},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,iLen=imageData.height,jLen=imageData.width,index,i,j,r,g,b,a;for(i = 0;i < iLen;i += this.blocksize) {for(j = 0;j < jLen;j += this.blocksize) {index = i * 4 * jLen + j * 4;r = data[index];g = data[index + 1];b = data[index + 2];a = data[index + 3];for(var _i=i,_ilen=i + this.blocksize;_i < _ilen;_i++) {for(var _j=j,_jlen=j + this.blocksize;_j < _jlen;_j++) {index = _i * 4 * jLen + _j * 4;data[index] = r;data[index + 1] = g;data[index + 2] = b;data[index + 3] = a;}}}}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{blocksize:this.blocksize});}});fabric.Image.filters.Pixelate.fromObject = function(object){return new fabric.Image.filters.Pixelate(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.RemoveWhite = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'RemoveWhite',initialize:function initialize(options){options = options || {};this.threshold = options.threshold || 30;this.distance = options.distance || 20;},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,threshold=this.threshold,distance=this.distance,limit=255 - threshold,abs=Math.abs,r,g,b;for(var i=0,len=data.length;i < len;i += 4) {r = data[i];g = data[i + 1];b = data[i + 2];if(r > limit && g > limit && b > limit && abs(r - g) < distance && abs(r - b) < distance && abs(g - b) < distance){data[i + 3] = 1;}}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{threshold:this.threshold,distance:this.distance});}});fabric.Image.filters.RemoveWhite.fromObject = function(object){return new fabric.Image.filters.RemoveWhite(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});fabric.Image.filters.Sepia = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Sepia',applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,iLen=data.length,i,avg;for(i = 0;i < iLen;i += 4) {avg = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];data[i] = avg + 100;data[i + 1] = avg + 50;data[i + 2] = avg + 255;}context.putImageData(imageData,0,0);}});fabric.Image.filters.Sepia.fromObject = function(){return new fabric.Image.filters.Sepia();};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {});fabric.Image.filters.Sepia2 = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Sepia2',applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,iLen=data.length,i,r,g,b;for(i = 0;i < iLen;i += 4) {r = data[i];g = data[i + 1];b = data[i + 2];data[i] = (r * 0.393 + g * 0.769 + b * 0.189) / 1.351;data[i + 1] = (r * 0.349 + g * 0.686 + b * 0.168) / 1.203;data[i + 2] = (r * 0.272 + g * 0.534 + b * 0.131) / 2.140;}context.putImageData(imageData,0,0);}});fabric.Image.filters.Sepia2.fromObject = function(){return new fabric.Image.filters.Sepia2();};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.Tint = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Tint',initialize:function initialize(options){options = options || {};this.color = options.color || '#000000';this.opacity = typeof options.opacity !== 'undefined'?options.opacity:new fabric.Color(this.color).getAlpha();},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,iLen=data.length,i,tintR,tintG,tintB,r,g,b,alpha1,source;source = new fabric.Color(this.color).getSource();tintR = source[0] * this.opacity;tintG = source[1] * this.opacity;tintB = source[2] * this.opacity;alpha1 = 1 - this.opacity;for(i = 0;i < iLen;i += 4) {r = data[i];g = data[i + 1];b = data[i + 2];data[i] = tintR + r * alpha1;data[i + 1] = tintG + g * alpha1;data[i + 2] = tintB + b * alpha1;}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{color:this.color,opacity:this.opacity});}});fabric.Image.filters.Tint.fromObject = function(object){return new fabric.Image.filters.Tint(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend;fabric.Image.filters.Multiply = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Multiply',initialize:function initialize(options){options = options || {};this.color = options.color || '#000000';},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,iLen=data.length,i,source;source = new fabric.Color(this.color).getSource();for(i = 0;i < iLen;i += 4) {data[i] *= source[0] / 255;data[i + 1] *= source[1] / 255;data[i + 2] *= source[2] / 255;}context.putImageData(imageData,0,0);},toObject:function toObject(){return extend(this.callSuper('toObject'),{color:this.color});}});fabric.Image.filters.Multiply.fromObject = function(object){return new fabric.Image.filters.Multiply(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric;fabric.Image.filters.Blend = fabric.util.createClass({type:'Blend',initialize:function initialize(options){options = options || {};this.color = options.color || '#000';this.image = options.image || false;this.mode = options.mode || 'multiply';this.alpha = options.alpha || 1;},applyTo:function applyTo(canvasEl){var context=canvasEl.getContext('2d'),imageData=context.getImageData(0,0,canvasEl.width,canvasEl.height),data=imageData.data,tr,tg,tb,r,g,b,_r,_g,_b,source,isImage=false;if(this.image){isImage = true;var _el=fabric.util.createCanvasElement();_el.width = this.image.width;_el.height = this.image.height;var tmpCanvas=new fabric.StaticCanvas(_el);tmpCanvas.add(this.image);var context2=tmpCanvas.getContext('2d');source = context2.getImageData(0,0,tmpCanvas.width,tmpCanvas.height).data;}else {source = new fabric.Color(this.color).getSource();tr = source[0] * this.alpha;tg = source[1] * this.alpha;tb = source[2] * this.alpha;}for(var i=0,len=data.length;i < len;i += 4) {r = data[i];g = data[i + 1];b = data[i + 2];if(isImage){tr = source[i] * this.alpha;tg = source[i + 1] * this.alpha;tb = source[i + 2] * this.alpha;}switch(this.mode){case 'multiply':data[i] = r * tr / 255;data[i + 1] = g * tg / 255;data[i + 2] = b * tb / 255;break;case 'screen':data[i] = 1 - (1 - r) * (1 - tr);data[i + 1] = 1 - (1 - g) * (1 - tg);data[i + 2] = 1 - (1 - b) * (1 - tb);break;case 'add':data[i] = Math.min(255,r + tr);data[i + 1] = Math.min(255,g + tg);data[i + 2] = Math.min(255,b + tb);break;case 'diff':case 'difference':data[i] = Math.abs(r - tr);data[i + 1] = Math.abs(g - tg);data[i + 2] = Math.abs(b - tb);break;case 'subtract':_r = r - tr;_g = g - tg;_b = b - tb;data[i] = _r < 0?0:_r;data[i + 1] = _g < 0?0:_g;data[i + 2] = _b < 0?0:_b;break;case 'darken':data[i] = Math.min(r,tr);data[i + 1] = Math.min(g,tg);data[i + 2] = Math.min(b,tb);break;case 'lighten':data[i] = Math.max(r,tr);data[i + 1] = Math.max(g,tg);data[i + 2] = Math.max(b,tb);break;}}context.putImageData(imageData,0,0);},toObject:function toObject(){return {color:this.color,image:this.image,mode:this.mode,alpha:this.alpha};}});fabric.Image.filters.Blend.fromObject = function(object){return new fabric.Image.filters.Blend(object);};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),pow=Math.pow,floor=Math.floor,sqrt=Math.sqrt,abs=Math.abs,max=Math.max,round=Math.round,sin=Math.sin,ceil=Math.ceil;fabric.Image.filters.Resize = fabric.util.createClass(fabric.Image.filters.BaseFilter,{type:'Resize',resizeType:'hermite',scaleX:0,scaleY:0,lanczosLobes:3,applyTo:function applyTo(canvasEl,scaleX,scaleY){this.rcpScaleX = 1 / scaleX;this.rcpScaleY = 1 / scaleY;var oW=canvasEl.width,oH=canvasEl.height,dW=round(oW * scaleX),dH=round(oH * scaleY),imageData;if(this.resizeType === 'sliceHack'){imageData = this.sliceByTwo(canvasEl,oW,oH,dW,dH);}if(this.resizeType === 'hermite'){imageData = this.hermiteFastResize(canvasEl,oW,oH,dW,dH);}if(this.resizeType === 'bilinear'){imageData = this.bilinearFiltering(canvasEl,oW,oH,dW,dH);}if(this.resizeType === 'lanczos'){imageData = this.lanczosResize(canvasEl,oW,oH,dW,dH);}canvasEl.width = dW;canvasEl.height = dH;canvasEl.getContext('2d').putImageData(imageData,0,0);},sliceByTwo:function sliceByTwo(canvasEl,width,height,newWidth,newHeight){var context=canvasEl.getContext('2d'),imageData,multW=0.5,multH=0.5,signW=1,signH=1,doneW=false,doneH=false,stepW=width,stepH=height,tmpCanvas=fabric.util.createCanvasElement(),tmpCtx=tmpCanvas.getContext('2d');newWidth = floor(newWidth);newHeight = floor(newHeight);tmpCanvas.width = max(newWidth,width);tmpCanvas.height = max(newHeight,height);if(newWidth > width){multW = 2;signW = -1;}if(newHeight > height){multH = 2;signH = -1;}imageData = context.getImageData(0,0,width,height);canvasEl.width = max(newWidth,width);canvasEl.height = max(newHeight,height);context.putImageData(imageData,0,0);while(!doneW || !doneH) {width = stepW;height = stepH;if(newWidth * signW < floor(stepW * multW * signW)){stepW = floor(stepW * multW);}else {stepW = newWidth;doneW = true;}if(newHeight * signH < floor(stepH * multH * signH)){stepH = floor(stepH * multH);}else {stepH = newHeight;doneH = true;}imageData = context.getImageData(0,0,width,height);tmpCtx.putImageData(imageData,0,0);context.clearRect(0,0,stepW,stepH);context.drawImage(tmpCanvas,0,0,width,height,0,0,stepW,stepH);}return context.getImageData(0,0,newWidth,newHeight);},lanczosResize:function lanczosResize(canvasEl,oW,oH,dW,dH){function lanczosCreate(lobes){return function(x){if(x > lobes){return 0;}x *= Math.PI;if(abs(x) < 1e-16){return 1;}var xx=x / lobes;return sin(x) * sin(xx) / x / xx;};}function process(_x){var _again=true;_function: while(_again) {var u=_x;v = i = weight = idx = a = red = green = blue = alpha = fX = fY = j = undefined;_again = false;var v,i,weight,idx,a,red,green,blue,alpha,fX,fY;center.x = (u + 0.5) * ratioX;icenter.x = floor(center.x);for(v = 0;v < dH;v++) {center.y = (v + 0.5) * ratioY;icenter.y = floor(center.y);a = 0,red = 0,green = 0,blue = 0,alpha = 0;for(i = icenter.x - range2X;i <= icenter.x + range2X;i++) {if(i < 0 || i >= oW){continue;}fX = floor(1000 * abs(i - center.x));if(!cacheLanc[fX]){cacheLanc[fX] = {};}for(var j=icenter.y - range2Y;j <= icenter.y + range2Y;j++) {if(j < 0 || j >= oH){continue;}fY = floor(1000 * abs(j - center.y));if(!cacheLanc[fX][fY]){cacheLanc[fX][fY] = lanczos(sqrt(pow(fX * rcpRatioX,2) + pow(fY * rcpRatioY,2)) / 1000);}weight = cacheLanc[fX][fY];if(weight > 0){idx = (j * oW + i) * 4;a += weight;red += weight * srcData[idx];green += weight * srcData[idx + 1];blue += weight * srcData[idx + 2];alpha += weight * srcData[idx + 3];}}}idx = (v * dW + u) * 4;destData[idx] = red / a;destData[idx + 1] = green / a;destData[idx + 2] = blue / a;destData[idx + 3] = alpha / a;}if(++u < dW){_x = u;_again = true;continue _function;}else {return destImg;}}}var context=canvasEl.getContext('2d'),srcImg=context.getImageData(0,0,oW,oH),destImg=context.getImageData(0,0,dW,dH),srcData=srcImg.data,destData=destImg.data,lanczos=lanczosCreate(this.lanczosLobes),ratioX=this.rcpScaleX,ratioY=this.rcpScaleY,rcpRatioX=2 / this.rcpScaleX,rcpRatioY=2 / this.rcpScaleY,range2X=ceil(ratioX * this.lanczosLobes / 2),range2Y=ceil(ratioY * this.lanczosLobes / 2),cacheLanc={},center={},icenter={};return process(0);},bilinearFiltering:function bilinearFiltering(canvasEl,w,h,w2,h2){var a,b,c,d,x,y,i,j,xDiff,yDiff,chnl,color,offset=0,origPix,ratioX=this.rcpScaleX,ratioY=this.rcpScaleY,context=canvasEl.getContext('2d'),w4=4 * (w - 1),img=context.getImageData(0,0,w,h),pixels=img.data,destImage=context.getImageData(0,0,w2,h2),destPixels=destImage.data;for(i = 0;i < h2;i++) {for(j = 0;j < w2;j++) {x = floor(ratioX * j);y = floor(ratioY * i);xDiff = ratioX * j - x;yDiff = ratioY * i - y;origPix = 4 * (y * w + x);for(chnl = 0;chnl < 4;chnl++) {a = pixels[origPix + chnl];b = pixels[origPix + 4 + chnl];c = pixels[origPix + w4 + chnl];d = pixels[origPix + w4 + 4 + chnl];color = a * (1 - xDiff) * (1 - yDiff) + b * xDiff * (1 - yDiff) + c * yDiff * (1 - xDiff) + d * xDiff * yDiff;destPixels[offset++] = color;}}}return destImage;},hermiteFastResize:function hermiteFastResize(canvasEl,oW,oH,dW,dH){var ratioW=this.rcpScaleX,ratioH=this.rcpScaleY,ratioWHalf=ceil(ratioW / 2),ratioHHalf=ceil(ratioH / 2),context=canvasEl.getContext('2d'),img=context.getImageData(0,0,oW,oH),data=img.data,img2=context.getImageData(0,0,dW,dH),data2=img2.data;for(var j=0;j < dH;j++) {for(var i=0;i < dW;i++) {var x2=(i + j * dW) * 4,weight=0,weights=0,weightsAlpha=0,gxR=0,gxG=0,gxB=0,gxA=0,centerY=(j + 0.5) * ratioH;for(var yy=floor(j * ratioH);yy < (j + 1) * ratioH;yy++) {var dy=abs(centerY - (yy + 0.5)) / ratioHHalf,centerX=(i + 0.5) * ratioW,w0=dy * dy;for(var xx=floor(i * ratioW);xx < (i + 1) * ratioW;xx++) {var dx=abs(centerX - (xx + 0.5)) / ratioWHalf,w=sqrt(w0 + dx * dx);if(w > 1 && w < -1){continue;}weight = 2 * w * w * w - 3 * w * w + 1;if(weight > 0){dx = 4 * (xx + yy * oW);gxA += weight * data[dx + 3];weightsAlpha += weight;if(data[dx + 3] < 255){weight = weight * data[dx + 3] / 250;}gxR += weight * data[dx];gxG += weight * data[dx + 1];gxB += weight * data[dx + 2];weights += weight;}}}data2[x2] = gxR / weights;data2[x2 + 1] = gxG / weights;data2[x2 + 2] = gxB / weights;data2[x2 + 3] = gxA / weightsAlpha;}}return img2;},toObject:function toObject(){return {type:this.type,scaleX:this.scaleX,scaley:this.scaleY,resizeType:this.resizeType,lanczosLobes:this.lanczosLobes};}});fabric.Image.filters.Resize.fromObject = function(){return new fabric.Image.filters.Resize();};})(true?exports:undefined);(function(global){'use strict';var fabric=global.fabric || (global.fabric = {}),extend=fabric.util.object.extend,clone=fabric.util.object.clone,toFixed=fabric.util.toFixed,supportsLineDash=fabric.StaticCanvas.supports('setLineDash');if(fabric.Text){fabric.warn('fabric.Text is already defined');return;}var stateProperties=fabric.Object.prototype.stateProperties.concat();stateProperties.push('fontFamily','fontWeight','fontSize','text','textDecoration','textAlign','fontStyle','lineHeight','textBackgroundColor');fabric.Text = fabric.util.createClass(fabric.Object,{_dimensionAffectingProps:{fontSize:true,fontWeight:true,fontFamily:true,fontStyle:true,lineHeight:true,stroke:true,strokeWidth:true,text:true,textAlign:true},_reNewline:/\r?\n/,type:'text',fontSize:40,fontWeight:'normal',fontFamily:'Times New Roman',textDecoration:'',textAlign:'left',fontStyle:'',lineHeight:1.16,textBackgroundColor:'',stateProperties:stateProperties,stroke:null,shadow:null,_fontSizeFraction:0.25,_fontSizeMult:1.13,initialize:function initialize(text,options){options = options || {};this.text = text;this.__skipDimension = true;this.setOptions(options);this.__skipDimension = false;this._initDimensions();},_initDimensions:function _initDimensions(ctx){if(this.__skipDimension){return;}if(!ctx){ctx = fabric.util.createCanvasElement().getContext('2d');this._setTextStyles(ctx);}this._textLines = this.text.split(this._reNewline);this._clearCache();var currentTextAlign=this.textAlign;this.textAlign = 'left';this.width = this._getTextWidth(ctx);this.textAlign = currentTextAlign;this.height = this._getTextHeight(ctx);},toString:function toString(){return '#<fabric.Text (' + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>';},_render:function _render(ctx){this.clipTo && fabric.util.clipContext(this,ctx);this._renderTextBackground(ctx);this._renderText(ctx);this._renderTextDecoration(ctx);this.clipTo && ctx.restore();},_renderText:function _renderText(ctx){ctx.save();this._translateForTextAlign(ctx);this._setOpacity(ctx);this._setShadow(ctx);this._setupCompositeOperation(ctx);this._renderTextFill(ctx);this._renderTextStroke(ctx);this._restoreCompositeOperation(ctx);this._removeShadow(ctx);ctx.restore();},_translateForTextAlign:function _translateForTextAlign(ctx){if(this.textAlign !== 'left' && this.textAlign !== 'justify'){ctx.translate(this.textAlign === 'center'?this.width / 2:this.width,0);}},_setTextStyles:function _setTextStyles(ctx){ctx.textBaseline = 'alphabetic';if(!this.skipTextAlign){ctx.textAlign = this.textAlign;}ctx.font = this._getFontDeclaration();},_getTextHeight:function _getTextHeight(){return this._textLines.length * this._getHeightOfLine();},_getTextWidth:function _getTextWidth(ctx){var maxWidth=this._getLineWidth(ctx,0);for(var i=1,len=this._textLines.length;i < len;i++) {var currentLineWidth=this._getLineWidth(ctx,i);if(currentLineWidth > maxWidth){maxWidth = currentLineWidth;}}return maxWidth;},_renderChars:function _renderChars(method,ctx,chars,left,top){ctx[method](chars,left,top);},_renderTextLine:function _renderTextLine(method,ctx,line,left,top,lineIndex){top -= this.fontSize * this._fontSizeFraction;if(this.textAlign !== 'justify'){this._renderChars(method,ctx,line,left,top,lineIndex);return;}var lineWidth=this._getLineWidth(ctx,lineIndex),totalWidth=this.width;if(totalWidth >= lineWidth){var words=line.split(/\s+/),wordsWidth=this._getWidthOfWords(ctx,line,lineIndex),widthDiff=totalWidth - wordsWidth,numSpaces=words.length - 1,spaceWidth=widthDiff / numSpaces,leftOffset=0;for(var i=0,len=words.length;i < len;i++) {this._renderChars(method,ctx,words[i],left + leftOffset,top,lineIndex);leftOffset += ctx.measureText(words[i]).width + spaceWidth;}}else {this._renderChars(method,ctx,line,left,top,lineIndex);}},_getWidthOfWords:function _getWidthOfWords(ctx,line){return ctx.measureText(line.replace(/\s+/g,'')).width;},_getLeftOffset:function _getLeftOffset(){return -this.width / 2;},_getTopOffset:function _getTopOffset(){return -this.height / 2;},_renderTextFill:function _renderTextFill(ctx){if(!this.fill && !this._skipFillStrokeCheck){return;}var lineHeights=0;for(var i=0,len=this._textLines.length;i < len;i++) {var heightOfLine=this._getHeightOfLine(ctx,i),maxHeight=heightOfLine / this.lineHeight;this._renderTextLine('fillText',ctx,this._textLines[i],this._getLeftOffset(),this._getTopOffset() + lineHeights + maxHeight,i);lineHeights += heightOfLine;}if(this.shadow && !this.shadow.affectStroke){this._removeShadow(ctx);}},_renderTextStroke:function _renderTextStroke(ctx){if((!this.stroke || this.strokeWidth === 0) && !this._skipFillStrokeCheck){return;}var lineHeights=0;ctx.save();if(this.strokeDashArray){if(1 & this.strokeDashArray.length){this.strokeDashArray.push.apply(this.strokeDashArray,this.strokeDashArray);}supportsLineDash && ctx.setLineDash(this.strokeDashArray);}ctx.beginPath();for(var i=0,len=this._textLines.length;i < len;i++) {var heightOfLine=this._getHeightOfLine(ctx,i),maxHeight=heightOfLine / this.lineHeight;this._renderTextLine('strokeText',ctx,this._textLines[i],this._getLeftOffset(),this._getTopOffset() + lineHeights + maxHeight,i);lineHeights += heightOfLine;}ctx.closePath();ctx.restore();},_getHeightOfLine:function _getHeightOfLine(){return this.fontSize * this._fontSizeMult * this.lineHeight;},_renderTextBackground:function _renderTextBackground(ctx){this._renderTextBoxBackground(ctx);this._renderTextLinesBackground(ctx);},_renderTextBoxBackground:function _renderTextBoxBackground(ctx){if(!this.backgroundColor){return;}ctx.save();ctx.fillStyle = this.backgroundColor;ctx.fillRect(this._getLeftOffset(),this._getTopOffset(),this.width,this.height);ctx.restore();},_renderTextLinesBackground:function _renderTextLinesBackground(ctx){var lineTopOffset=0,heightOfLine=this._getHeightOfLine();if(!this.textBackgroundColor){return;}ctx.save();ctx.fillStyle = this.textBackgroundColor;for(var i=0,len=this._textLines.length;i < len;i++) {if(this._textLines[i] !== ''){var lineWidth=this._getLineWidth(ctx,i),lineLeftOffset=this._getLineLeftOffset(lineWidth);ctx.fillRect(this._getLeftOffset() + lineLeftOffset,this._getTopOffset() + lineTopOffset,lineWidth,this.fontSize * this._fontSizeMult);}lineTopOffset += heightOfLine;}ctx.restore();},_getLineLeftOffset:function _getLineLeftOffset(lineWidth){if(this.textAlign === 'center'){return (this.width - lineWidth) / 2;}if(this.textAlign === 'right'){return this.width - lineWidth;}return 0;},_clearCache:function _clearCache(){this.__lineWidths = [];this.__lineHeights = [];this.__lineOffsets = [];},_shouldClearCache:function _shouldClearCache(){var shouldClear=false;for(var prop in this._dimensionAffectingProps) {if(this['__' + prop] !== this[prop]){this['__' + prop] = this[prop];shouldClear = true;}}return shouldClear;},_getLineWidth:function _getLineWidth(ctx,lineIndex){if(this.__lineWidths[lineIndex]){return this.__lineWidths[lineIndex];}this.__lineWidths[lineIndex] = ctx.measureText(this._textLines[lineIndex]).width;return this.__lineWidths[lineIndex];},_renderTextDecoration:function _renderTextDecoration(ctx){if(!this.textDecoration){return;}var halfOfVerticalBox=this.height / 2,_this=this,offsets=[];function renderLinesAtOffset(offsets){var i,lineHeight=0,len,j,oLen;for(i = 0,len = _this._textLines.length;i < len;i++) {var lineWidth=_this._getLineWidth(ctx,i),lineLeftOffset=_this._getLineLeftOffset(lineWidth),heightOfLine=_this._getHeightOfLine(ctx,i);for(j = 0,oLen = offsets.length;j < oLen;j++) {ctx.fillRect(_this._getLeftOffset() + lineLeftOffset,lineHeight + (_this._fontSizeMult - 1 + offsets[j]) * _this.fontSize - halfOfVerticalBox,lineWidth,_this.fontSize / 15);}lineHeight += heightOfLine;}}if(this.textDecoration.indexOf('underline') > -1){offsets.push(0.85);}if(this.textDecoration.indexOf('line-through') > -1){offsets.push(0.43);}if(this.textDecoration.indexOf('overline') > -1){offsets.push(-0.12);}if(offsets.length > 0){renderLinesAtOffset(offsets);}},_getFontDeclaration:function _getFontDeclaration(){return [fabric.isLikelyNode?this.fontWeight:this.fontStyle,fabric.isLikelyNode?this.fontStyle:this.fontWeight,this.fontSize + 'px',fabric.isLikelyNode?'"' + this.fontFamily + '"':this.fontFamily].join(' ');},render:function render(ctx,noTransform){if(!this.visible){return;}ctx.save();this._setTextStyles(ctx);if(this._shouldClearCache()){this._initDimensions(ctx);}if(!noTransform){this.transform(ctx);}this._setStrokeStyles(ctx);this._setFillStyles(ctx);if(this.transformMatrix){ctx.transform.apply(ctx,this.transformMatrix);}if(this.group && this.group.type === 'path-group'){ctx.translate(this.left,this.top);}this._render(ctx);ctx.restore();},toObject:function toObject(propertiesToInclude){var object=extend(this.callSuper('toObject',propertiesToInclude),{text:this.text,fontSize:this.fontSize,fontWeight:this.fontWeight,fontFamily:this.fontFamily,fontStyle:this.fontStyle,lineHeight:this.lineHeight,textDecoration:this.textDecoration,textAlign:this.textAlign,textBackgroundColor:this.textBackgroundColor});if(!this.includeDefaultValues){this._removeDefaultValues(object);}return object;},toSVG:function toSVG(reviver){var markup=this._createBaseSVGMarkup(),offsets=this._getSVGLeftTopOffsets(this.ctx),textAndBg=this._getSVGTextAndBg(offsets.textTop,offsets.textLeft);this._wrapSVGTextAndBg(markup,textAndBg);return reviver?reviver(markup.join('')):markup.join('');},_getSVGLeftTopOffsets:function _getSVGLeftTopOffsets(ctx){var lineTop=this._getHeightOfLine(ctx,0),textLeft=-this.width / 2,textTop=0;return {textLeft:textLeft + (this.group && this.group.type === 'path-group'?this.left:0),textTop:textTop + (this.group && this.group.type === 'path-group'?-this.top:0),lineTop:lineTop};},_wrapSVGTextAndBg:function _wrapSVGTextAndBg(markup,textAndBg){markup.push('\t<g transform="',this.getSvgTransform(),this.getSvgTransformMatrix(),'">\n',textAndBg.textBgRects.join(''),'\t\t<text ',this.fontFamily?'font-family="' + this.fontFamily.replace(/"/g,'\'') + '" ':'',this.fontSize?'font-size="' + this.fontSize + '" ':'',this.fontStyle?'font-style="' + this.fontStyle + '" ':'',this.fontWeight?'font-weight="' + this.fontWeight + '" ':'',this.textDecoration?'text-decoration="' + this.textDecoration + '" ':'','style="',this.getSvgStyles(),'" >',textAndBg.textSpans.join(''),'</text>\n','\t</g>\n');},_getSVGTextAndBg:function _getSVGTextAndBg(textTopOffset,textLeftOffset){var textSpans=[],textBgRects=[],height=0;this._setSVGBg(textBgRects);for(var i=0,len=this._textLines.length;i < len;i++) {if(this.textBackgroundColor){this._setSVGTextLineBg(textBgRects,i,textLeftOffset,textTopOffset,height);}this._setSVGTextLineText(i,textSpans,height,textLeftOffset,textTopOffset,textBgRects);height += this._getHeightOfLine(this.ctx,i);}return {textSpans:textSpans,textBgRects:textBgRects};},_setSVGTextLineText:function _setSVGTextLineText(i,textSpans,height,textLeftOffset,textTopOffset){var yPos=this.fontSize * (this._fontSizeMult - this._fontSizeFraction) - textTopOffset + height - this.height / 2;textSpans.push('<tspan x="',toFixed(textLeftOffset + this._getLineLeftOffset(this.__lineWidths[i]),4),'" ','y="',toFixed(yPos,4),'" ',this._getFillAttributes(this.fill),'>',fabric.util.string.escapeXml(this._textLines[i]),'</tspan>');},_setSVGTextLineBg:function _setSVGTextLineBg(textBgRects,i,textLeftOffset,textTopOffset,height){textBgRects.push('\t\t<rect ',this._getFillAttributes(this.textBackgroundColor),' x="',toFixed(textLeftOffset + this._getLineLeftOffset(this.__lineWidths[i]),4),'" y="',toFixed(height - this.height / 2,4),'" width="',toFixed(this.__lineWidths[i],4),'" height="',toFixed(this._getHeightOfLine(this.ctx,i) / this.lineHeight,4),'"></rect>\n');},_setSVGBg:function _setSVGBg(textBgRects){if(this.backgroundColor){textBgRects.push('\t\t<rect ',this._getFillAttributes(this.backgroundColor),' x="',toFixed(-this.width / 2,4),'" y="',toFixed(-this.height / 2,4),'" width="',toFixed(this.width,4),'" height="',toFixed(this.height,4),'"></rect>\n');}},_getFillAttributes:function _getFillAttributes(value){var fillColor=value && typeof value === 'string'?new fabric.Color(value):'';if(!fillColor || !fillColor.getSource() || fillColor.getAlpha() === 1){return 'fill="' + value + '"';}return 'opacity="' + fillColor.getAlpha() + '" fill="' + fillColor.setAlpha(1).toRgb() + '"';},_set:function _set(key,value){this.callSuper('_set',key,value);if(key in this._dimensionAffectingProps){this._initDimensions();this.setCoords();}},complexity:function complexity(){return 1;}});fabric.Text.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat('x y dx dy font-family font-style font-weight font-size text-decoration text-anchor'.split(' '));fabric.Text.DEFAULT_SVG_FONT_SIZE = 16;fabric.Text.fromElement = function(element,options){if(!element){return null;}var parsedAttributes=fabric.parseAttributes(element,fabric.Text.ATTRIBUTE_NAMES);options = fabric.util.object.extend(options?fabric.util.object.clone(options):{},parsedAttributes);options.top = options.top || 0;options.left = options.left || 0;if('dx' in parsedAttributes){options.left += parsedAttributes.dx;}if('dy' in parsedAttributes){options.top += parsedAttributes.dy;}if(!('fontSize' in options)){options.fontSize = fabric.Text.DEFAULT_SVG_FONT_SIZE;}if(!options.originX){options.originX = 'left';}var textContent=element.textContent.replace(/^\s+|\s+$|\n+/g,'').replace(/\s+/g,' '),text=new fabric.Text(textContent,options),offX=0;if(text.originX === 'left'){offX = text.getWidth() / 2;}if(text.originX === 'right'){offX = -text.getWidth() / 2;}text.set({left:text.getLeft() + offX,top:text.getTop() - text.getHeight() / 2 + text.fontSize * (0.18 + text._fontSizeFraction)});return text;};fabric.Text.fromObject = function(object){return new fabric.Text(object.text,clone(object));};fabric.util.createAccessors(fabric.Text);})(true?exports:undefined);(function(){var clone=fabric.util.object.clone;fabric.IText = fabric.util.createClass(fabric.Text,fabric.Observable,{type:'i-text',selectionStart:0,selectionEnd:0,selectionColor:'rgba(17,119,255,0.3)',isEditing:false,editable:true,editingBorderColor:'rgba(102,153,255,0.25)',cursorWidth:2,cursorColor:'#333',cursorDelay:1000,cursorDuration:600,styles:null,caching:true,_skipFillStrokeCheck:false,_reSpace:/\s|\n/,_currentCursorOpacity:0,_selectionDirection:null,_abortCursorAnimation:false,_charWidthsCache:{},initialize:function initialize(text,options){this.styles = options?options.styles || {}:{};this.callSuper('initialize',text,options);this.initBehavior();},_clearCache:function _clearCache(){this.callSuper('_clearCache');this.__maxFontHeights = [];this.__widthOfSpace = [];},isEmptyStyles:function isEmptyStyles(){if(!this.styles){return true;}var obj=this.styles;for(var p1 in obj) {for(var p2 in obj[p1]) {for(var p3 in obj[p1][p2]) {return false;}}}return true;},setSelectionStart:function setSelectionStart(index){index = Math.max(index,0);if(this.selectionStart !== index){this.fire('selection:changed');this.canvas && this.canvas.fire('text:selection:changed',{target:this});this.selectionStart = index;}this._updateTextarea();},setSelectionEnd:function setSelectionEnd(index){index = Math.min(index,this.text.length);if(this.selectionEnd !== index){this.fire('selection:changed');this.canvas && this.canvas.fire('text:selection:changed',{target:this});this.selectionEnd = index;}this._updateTextarea();},getSelectionStyles:function getSelectionStyles(startIndex,endIndex){if(arguments.length === 2){var styles=[];for(var i=startIndex;i < endIndex;i++) {styles.push(this.getSelectionStyles(i));}return styles;}var loc=this.get2DCursorLocation(startIndex);if(this.styles[loc.lineIndex]){return this.styles[loc.lineIndex][loc.charIndex] || {};}return {};},setSelectionStyles:function setSelectionStyles(styles){if(this.selectionStart === this.selectionEnd){this._extendStyles(this.selectionStart,styles);}else {for(var i=this.selectionStart;i < this.selectionEnd;i++) {this._extendStyles(i,styles);}}this._clearCache();return this;},_extendStyles:function _extendStyles(index,styles){var loc=this.get2DCursorLocation(index);if(!this.styles[loc.lineIndex]){this.styles[loc.lineIndex] = {};}if(!this.styles[loc.lineIndex][loc.charIndex]){this.styles[loc.lineIndex][loc.charIndex] = {};}fabric.util.object.extend(this.styles[loc.lineIndex][loc.charIndex],styles);},_render:function _render(ctx){this.callSuper('_render',ctx);this.ctx = ctx;this.isEditing && this.renderCursorOrSelection();},renderCursorOrSelection:function renderCursorOrSelection(){if(!this.active){return;}var chars=this.text.split(''),boundaries,ctx;if(this.canvas.contextTop){ctx = this.canvas.contextTop;ctx.save();ctx.transform.apply(ctx,this.canvas.viewportTransform);this.transform(ctx);}else {ctx = this.ctx;ctx.save();}if(this.selectionStart === this.selectionEnd){boundaries = this._getCursorBoundaries(chars,'cursor');this.renderCursor(boundaries,ctx);}else {boundaries = this._getCursorBoundaries(chars,'selection');this.renderSelection(chars,boundaries,ctx);}ctx.restore();},get2DCursorLocation:function get2DCursorLocation(selectionStart){if(typeof selectionStart === 'undefined'){selectionStart = this.selectionStart;}var textBeforeCursor=this.text.slice(0,selectionStart),linesBeforeCursor=textBeforeCursor.split(this._reNewline);return {lineIndex:linesBeforeCursor.length - 1,charIndex:linesBeforeCursor[linesBeforeCursor.length - 1].length};},getCurrentCharStyle:function getCurrentCharStyle(lineIndex,charIndex){var style=this.styles[lineIndex] && this.styles[lineIndex][charIndex === 0?0:charIndex - 1];return {fontSize:style && style.fontSize || this.fontSize,fill:style && style.fill || this.fill,textBackgroundColor:style && style.textBackgroundColor || this.textBackgroundColor,textDecoration:style && style.textDecoration || this.textDecoration,fontFamily:style && style.fontFamily || this.fontFamily,fontWeight:style && style.fontWeight || this.fontWeight,fontStyle:style && style.fontStyle || this.fontStyle,stroke:style && style.stroke || this.stroke,strokeWidth:style && style.strokeWidth || this.strokeWidth};},getCurrentCharFontSize:function getCurrentCharFontSize(lineIndex,charIndex){return this.styles[lineIndex] && this.styles[lineIndex][charIndex === 0?0:charIndex - 1] && this.styles[lineIndex][charIndex === 0?0:charIndex - 1].fontSize || this.fontSize;},getCurrentCharColor:function getCurrentCharColor(lineIndex,charIndex){return this.styles[lineIndex] && this.styles[lineIndex][charIndex === 0?0:charIndex - 1] && this.styles[lineIndex][charIndex === 0?0:charIndex - 1].fill || this.cursorColor;},_getCursorBoundaries:function _getCursorBoundaries(chars,typeOfBoundaries){var left=Math.round(this._getLeftOffset()),top=this._getTopOffset(),offsets=this._getCursorBoundariesOffsets(chars,typeOfBoundaries);return {left:left,top:top,leftOffset:offsets.left + offsets.lineLeft,topOffset:offsets.top};},_getCursorBoundariesOffsets:function _getCursorBoundariesOffsets(chars,typeOfBoundaries){var lineLeftOffset=0,lineIndex=0,charIndex=0,topOffset=0,leftOffset=0;for(var i=0;i < this.selectionStart;i++) {if(chars[i] === '\n'){leftOffset = 0;topOffset += this._getHeightOfLine(this.ctx,lineIndex);lineIndex++;charIndex = 0;}else {leftOffset += this._getWidthOfChar(this.ctx,chars[i],lineIndex,charIndex);charIndex++;}lineLeftOffset = this._getCachedLineOffset(lineIndex);}if(typeOfBoundaries === 'cursor'){topOffset += (1 - this._fontSizeFraction) * this._getHeightOfLine(this.ctx,lineIndex) / this.lineHeight - this.getCurrentCharFontSize(lineIndex,charIndex) * (1 - this._fontSizeFraction);}return {top:topOffset,left:leftOffset,lineLeft:lineLeftOffset};},_getCachedLineOffset:function _getCachedLineOffset(lineIndex){var widthOfLine=this._getLineWidth(this.ctx,lineIndex);return this.__lineOffsets[lineIndex] || (this.__lineOffsets[lineIndex] = this._getLineLeftOffset(widthOfLine));},renderCursor:function renderCursor(boundaries,ctx){var cursorLocation=this.get2DCursorLocation(),lineIndex=cursorLocation.lineIndex,charIndex=cursorLocation.charIndex,charHeight=this.getCurrentCharFontSize(lineIndex,charIndex),leftOffset=lineIndex === 0 && charIndex === 0?this._getCachedLineOffset(lineIndex):boundaries.leftOffset;ctx.fillStyle = this.getCurrentCharColor(lineIndex,charIndex);ctx.globalAlpha = this.__isMousedown?1:this._currentCursorOpacity;ctx.fillRect(boundaries.left + leftOffset,boundaries.top + boundaries.topOffset,this.cursorWidth / this.scaleX,charHeight);},renderSelection:function renderSelection(chars,boundaries,ctx){ctx.fillStyle = this.selectionColor;var start=this.get2DCursorLocation(this.selectionStart),end=this.get2DCursorLocation(this.selectionEnd),startLine=start.lineIndex,endLine=end.lineIndex;for(var i=startLine;i <= endLine;i++) {var lineOffset=this._getCachedLineOffset(i) || 0,lineHeight=this._getHeightOfLine(this.ctx,i),boxWidth=0,line=this._textLines[i];if(i === startLine){for(var j=0,len=line.length;j < len;j++) {if(j >= start.charIndex && (i !== endLine || j < end.charIndex)){boxWidth += this._getWidthOfChar(ctx,line[j],i,j);}if(j < start.charIndex){lineOffset += this._getWidthOfChar(ctx,line[j],i,j);}}}else if(i > startLine && i < endLine){boxWidth += this._getLineWidth(ctx,i) || 5;}else if(i === endLine){for(var j2=0,j2len=end.charIndex;j2 < j2len;j2++) {boxWidth += this._getWidthOfChar(ctx,line[j2],i,j2);}}ctx.fillRect(boundaries.left + lineOffset,boundaries.top + boundaries.topOffset,boxWidth,lineHeight);boundaries.topOffset += lineHeight;}},_renderChars:function _renderChars(method,ctx,line,left,top,lineIndex){if(this.isEmptyStyles()){return this._renderCharsFast(method,ctx,line,left,top);}this.skipTextAlign = true;left -= this.textAlign === 'center'?this.width / 2:this.textAlign === 'right'?this.width:0;var lineHeight=this._getHeightOfLine(ctx,lineIndex),lineLeftOffset=this._getCachedLineOffset(lineIndex),chars=line.split(''),prevStyle,charsToRender='';left += lineLeftOffset || 0;ctx.save();top -= lineHeight / this.lineHeight * this._fontSizeFraction;for(var i=0,len=chars.length;i <= len;i++) {prevStyle = prevStyle || this.getCurrentCharStyle(lineIndex,i);var thisStyle=this.getCurrentCharStyle(lineIndex,i + 1);if(this._hasStyleChanged(prevStyle,thisStyle) || i === len){this._renderChar(method,ctx,lineIndex,i - 1,charsToRender,left,top,lineHeight);charsToRender = '';prevStyle = thisStyle;}charsToRender += chars[i];}ctx.restore();},_renderCharsFast:function _renderCharsFast(method,ctx,line,left,top){this.skipTextAlign = false;if(method === 'fillText' && this.fill){this.callSuper('_renderChars',method,ctx,line,left,top);}if(method === 'strokeText' && (this.stroke && this.strokeWidth > 0 || this.skipFillStrokeCheck)){this.callSuper('_renderChars',method,ctx,line,left,top);}},_renderChar:function _renderChar(method,ctx,lineIndex,i,_char,left,top,lineHeight){var decl,charWidth,charHeight,offset=this._fontSizeFraction * lineHeight / this.lineHeight;if(this.styles && this.styles[lineIndex] && (decl = this.styles[lineIndex][i])){var shouldStroke=decl.stroke || this.stroke,shouldFill=decl.fill || this.fill;ctx.save();charWidth = this._applyCharStylesGetWidth(ctx,_char,lineIndex,i,decl);charHeight = this._getHeightOfChar(ctx,_char,lineIndex,i);if(shouldFill){ctx.fillText(_char,left,top);}if(shouldStroke){ctx.strokeText(_char,left,top);}this._renderCharDecoration(ctx,decl,left,top,offset,charWidth,charHeight);ctx.restore();ctx.translate(charWidth,0);}else {if(method === 'strokeText' && this.stroke){ctx[method](_char,left,top);}if(method === 'fillText' && this.fill){ctx[method](_char,left,top);}charWidth = this._applyCharStylesGetWidth(ctx,_char,lineIndex,i);this._renderCharDecoration(ctx,null,left,top,offset,charWidth,this.fontSize);ctx.translate(ctx.measureText(_char).width,0);}},_hasStyleChanged:function _hasStyleChanged(prevStyle,thisStyle){return prevStyle.fill !== thisStyle.fill || prevStyle.fontSize !== thisStyle.fontSize || prevStyle.textBackgroundColor !== thisStyle.textBackgroundColor || prevStyle.textDecoration !== thisStyle.textDecoration || prevStyle.fontFamily !== thisStyle.fontFamily || prevStyle.fontWeight !== thisStyle.fontWeight || prevStyle.fontStyle !== thisStyle.fontStyle || prevStyle.stroke !== thisStyle.stroke || prevStyle.strokeWidth !== thisStyle.strokeWidth;},_renderCharDecoration:function _renderCharDecoration(ctx,styleDeclaration,left,top,offset,charWidth,charHeight){var textDecoration=styleDeclaration?styleDeclaration.textDecoration || this.textDecoration:this.textDecoration;if(!textDecoration){return;}if(textDecoration.indexOf('underline') > -1){ctx.fillRect(left,top + charHeight / 10,charWidth,charHeight / 15);}if(textDecoration.indexOf('line-through') > -1){ctx.fillRect(left,top - charHeight * (this._fontSizeFraction + this._fontSizeMult - 1) + charHeight / 15,charWidth,charHeight / 15);}if(textDecoration.indexOf('overline') > -1){ctx.fillRect(left,top - (this._fontSizeMult - this._fontSizeFraction) * charHeight,charWidth,charHeight / 15);}},_renderTextLine:function _renderTextLine(method,ctx,line,left,top,lineIndex){if(!this.isEmptyStyles()){top += this.fontSize * (this._fontSizeFraction + 0.03);}this.callSuper('_renderTextLine',method,ctx,line,left,top,lineIndex);},_renderTextDecoration:function _renderTextDecoration(ctx){if(this.isEmptyStyles()){return this.callSuper('_renderTextDecoration',ctx);}},_renderTextLinesBackground:function _renderTextLinesBackground(ctx){if(!this.textBackgroundColor && !this.styles){return;}ctx.save();if(this.textBackgroundColor){ctx.fillStyle = this.textBackgroundColor;}var lineHeights=0;for(var i=0,len=this._textLines.length;i < len;i++) {var heightOfLine=this._getHeightOfLine(ctx,i);if(this._textLines[i] === ''){lineHeights += heightOfLine;continue;}var lineWidth=this._getLineWidth(ctx,i),lineLeftOffset=this._getCachedLineOffset(i);if(this.textBackgroundColor){ctx.fillStyle = this.textBackgroundColor;ctx.fillRect(this._getLeftOffset() + lineLeftOffset,this._getTopOffset() + lineHeights,lineWidth,heightOfLine / this.lineHeight);}if(this.styles[i]){for(var j=0,jlen=this._textLines[i].length;j < jlen;j++) {if(this.styles[i] && this.styles[i][j] && this.styles[i][j].textBackgroundColor){var _char=this._textLines[i][j];ctx.fillStyle = this.styles[i][j].textBackgroundColor;ctx.fillRect(this._getLeftOffset() + lineLeftOffset + this._getWidthOfCharsAt(ctx,i,j),this._getTopOffset() + lineHeights,this._getWidthOfChar(ctx,_char,i,j) + 1,heightOfLine / this.lineHeight);}}}lineHeights += heightOfLine;}ctx.restore();},_getCacheProp:function _getCacheProp(_char,styleDeclaration){return _char + styleDeclaration.fontFamily + styleDeclaration.fontSize + styleDeclaration.fontWeight + styleDeclaration.fontStyle + styleDeclaration.shadow;},_applyCharStylesGetWidth:function _applyCharStylesGetWidth(ctx,_char,lineIndex,charIndex,decl){var styleDeclaration=decl || this.styles[lineIndex] && this.styles[lineIndex][charIndex];if(styleDeclaration){styleDeclaration = clone(styleDeclaration);}else {styleDeclaration = {};}this._applyFontStyles(styleDeclaration);var cacheProp=this._getCacheProp(_char,styleDeclaration);if(this.isEmptyStyles() && this._charWidthsCache[cacheProp] && this.caching){return this._charWidthsCache[cacheProp];}if(typeof styleDeclaration.shadow === 'string'){styleDeclaration.shadow = new fabric.Shadow(styleDeclaration.shadow);}var fill=styleDeclaration.fill || this.fill;ctx.fillStyle = fill.toLive?fill.toLive(ctx,this):fill;if(styleDeclaration.stroke){ctx.strokeStyle = styleDeclaration.stroke && styleDeclaration.stroke.toLive?styleDeclaration.stroke.toLive(ctx,this):styleDeclaration.stroke;}ctx.lineWidth = styleDeclaration.strokeWidth || this.strokeWidth;ctx.font = this._getFontDeclaration.call(styleDeclaration);this._setShadow.call(styleDeclaration,ctx);if(!this.caching){return ctx.measureText(_char).width;}if(!this._charWidthsCache[cacheProp]){this._charWidthsCache[cacheProp] = ctx.measureText(_char).width;}return this._charWidthsCache[cacheProp];},_applyFontStyles:function _applyFontStyles(styleDeclaration){if(!styleDeclaration.fontFamily){styleDeclaration.fontFamily = this.fontFamily;}if(!styleDeclaration.fontSize){styleDeclaration.fontSize = this.fontSize;}if(!styleDeclaration.fontWeight){styleDeclaration.fontWeight = this.fontWeight;}if(!styleDeclaration.fontStyle){styleDeclaration.fontStyle = this.fontStyle;}},_getStyleDeclaration:function _getStyleDeclaration(lineIndex,charIndex){return this.styles[lineIndex] && this.styles[lineIndex][charIndex]?clone(this.styles[lineIndex][charIndex]):{};},_getWidthOfChar:function _getWidthOfChar(ctx,_char,lineIndex,charIndex){if(this.textAlign === 'justify' && /\s/.test(_char)){return this._getWidthOfSpace(ctx,lineIndex);}var styleDeclaration=this._getStyleDeclaration(lineIndex,charIndex);this._applyFontStyles(styleDeclaration);var cacheProp=this._getCacheProp(_char,styleDeclaration);if(this._charWidthsCache[cacheProp] && this.caching){return this._charWidthsCache[cacheProp];}else if(ctx){ctx.save();var width=this._applyCharStylesGetWidth(ctx,_char,lineIndex,charIndex);ctx.restore();return width;}},_getHeightOfChar:function _getHeightOfChar(ctx,_char,lineIndex,charIndex){if(this.styles[lineIndex] && this.styles[lineIndex][charIndex]){return this.styles[lineIndex][charIndex].fontSize || this.fontSize;}return this.fontSize;},_getHeightOfCharAt:function _getHeightOfCharAt(ctx,lineIndex,charIndex){var _char=this._textLines[lineIndex][charIndex];return this._getHeightOfChar(ctx,_char,lineIndex,charIndex);},_getWidthOfCharsAt:function _getWidthOfCharsAt(ctx,lineIndex,charIndex){var width=0,i,_char;for(i = 0;i < charIndex;i++) {_char = this._textLines[lineIndex][i];width += this._getWidthOfChar(ctx,_char,lineIndex,i);}return width;},_getLineWidth:function _getLineWidth(ctx,lineIndex){if(this.__lineWidths[lineIndex]){return this.__lineWidths[lineIndex];}this.__lineWidths[lineIndex] = this._getWidthOfCharsAt(ctx,lineIndex,this._textLines[lineIndex].length);return this.__lineWidths[lineIndex];},_getWidthOfSpace:function _getWidthOfSpace(ctx,lineIndex){if(this.__widthOfSpace[lineIndex]){return this.__widthOfSpace[lineIndex];}var line=this._textLines[lineIndex],wordsWidth=this._getWidthOfWords(ctx,line,lineIndex),widthDiff=this.width - wordsWidth,numSpaces=line.length - line.replace(/\s+/g,'').length,width=widthDiff / numSpaces;this.__widthOfSpace[lineIndex] = width;return width;},_getWidthOfWords:function _getWidthOfWords(ctx,line,lineIndex){var width=0;for(var charIndex=0;charIndex < line.length;charIndex++) {var _char=line[charIndex];if(!_char.match(/\s/)){width += this._getWidthOfChar(ctx,_char,lineIndex,charIndex);}}return width;},_getHeightOfLine:function _getHeightOfLine(ctx,lineIndex){if(this.__lineHeights[lineIndex]){return this.__lineHeights[lineIndex];}var line=this._textLines[lineIndex],maxHeight=this._getHeightOfChar(ctx,line[0],lineIndex,0);for(var i=1,len=line.length;i < len;i++) {var currentCharHeight=this._getHeightOfChar(ctx,line[i],lineIndex,i);if(currentCharHeight > maxHeight){maxHeight = currentCharHeight;}}this.__maxFontHeights[lineIndex] = maxHeight;this.__lineHeights[lineIndex] = maxHeight * this.lineHeight * this._fontSizeMult;return this.__lineHeights[lineIndex];},_getTextHeight:function _getTextHeight(ctx){var height=0;for(var i=0,len=this._textLines.length;i < len;i++) {height += this._getHeightOfLine(ctx,i);}return height;},_renderTextBoxBackground:function _renderTextBoxBackground(ctx){if(!this.backgroundColor){return;}ctx.save();ctx.fillStyle = this.backgroundColor;ctx.fillRect(this._getLeftOffset(),this._getTopOffset(),this.width,this.height);ctx.restore();},toObject:function toObject(propertiesToInclude){return fabric.util.object.extend(this.callSuper('toObject',propertiesToInclude),{styles:clone(this.styles)});}});fabric.IText.fromObject = function(object){return new fabric.IText(object.text,clone(object));};})();(function(){var clone=fabric.util.object.clone;fabric.util.object.extend(fabric.IText.prototype,{initBehavior:function initBehavior(){this.initAddedHandler();this.initRemovedHandler();this.initCursorSelectionHandlers();this.initDoubleClickSimulation();},initSelectedHandler:function initSelectedHandler(){this.on('selected',function(){var _this=this;setTimeout(function(){_this.selected = true;},100);});},initAddedHandler:function initAddedHandler(){var _this=this;this.on('added',function(){if(this.canvas && !this.canvas._hasITextHandlers){this.canvas._hasITextHandlers = true;this._initCanvasHandlers();}if(_this.canvas){_this.canvas._iTextInstances = _this.canvas._iTextInstances || [];_this.canvas._iTextInstances.push(_this);}});},initRemovedHandler:function initRemovedHandler(){var _this=this;this.on('removed',function(){if(_this.canvas){_this.canvas._iTextInstances = _this.canvas._iTextInstances || [];fabric.util.removeFromArray(_this.canvas._iTextInstances,_this);}});},_initCanvasHandlers:function _initCanvasHandlers(){var _this=this;this.canvas.on('selection:cleared',function(){fabric.IText.prototype.exitEditingOnOthers(_this.canvas);});this.canvas.on('mouse:up',function(){if(_this.canvas._iTextInstances){_this.canvas._iTextInstances.forEach(function(obj){obj.__isMousedown = false;});}});this.canvas.on('object:selected',function(){fabric.IText.prototype.exitEditingOnOthers(_this.canvas);});},_tick:function _tick(){this._currentTickState = this._animateCursor(this,1,this.cursorDuration,'_onTickComplete');},_animateCursor:function _animateCursor(obj,targetOpacity,duration,completeMethod){var tickState;tickState = {isAborted:false,abort:function abort(){this.isAborted = true;}};obj.animate('_currentCursorOpacity',targetOpacity,{duration:duration,onComplete:function onComplete(){if(!tickState.isAborted){obj[completeMethod]();}},onChange:function onChange(){if(obj.canvas){obj.canvas.clearContext(obj.canvas.contextTop || obj.ctx);obj.renderCursorOrSelection();}},abort:function abort(){return tickState.isAborted;}});return tickState;},_onTickComplete:function _onTickComplete(){var _this=this;if(this._cursorTimeout1){clearTimeout(this._cursorTimeout1);}this._cursorTimeout1 = setTimeout(function(){_this._currentTickCompleteState = _this._animateCursor(_this,0,this.cursorDuration / 2,'_tick');},100);},initDelayedCursor:function initDelayedCursor(restart){var _this=this,delay=restart?0:this.cursorDelay;this._currentTickState && this._currentTickState.abort();this._currentTickCompleteState && this._currentTickCompleteState.abort();clearTimeout(this._cursorTimeout1);this._currentCursorOpacity = 1;if(this.canvas){this.canvas.clearContext(this.canvas.contextTop || this.ctx);this.renderCursorOrSelection();}if(this._cursorTimeout2){clearTimeout(this._cursorTimeout2);}this._cursorTimeout2 = setTimeout(function(){_this._tick();},delay);},abortCursorAnimation:function abortCursorAnimation(){this._currentTickState && this._currentTickState.abort();this._currentTickCompleteState && this._currentTickCompleteState.abort();clearTimeout(this._cursorTimeout1);clearTimeout(this._cursorTimeout2);this._currentCursorOpacity = 0;this.canvas && this.canvas.clearContext(this.canvas.contextTop || this.ctx);},selectAll:function selectAll(){this.setSelectionStart(0);this.setSelectionEnd(this.text.length);},getSelectedText:function getSelectedText(){return this.text.slice(this.selectionStart,this.selectionEnd);},findWordBoundaryLeft:function findWordBoundaryLeft(startFrom){var offset=0,index=startFrom - 1;if(this._reSpace.test(this.text.charAt(index))){while(this._reSpace.test(this.text.charAt(index))) {offset++;index--;}}while(/\S/.test(this.text.charAt(index)) && index > -1) {offset++;index--;}return startFrom - offset;},findWordBoundaryRight:function findWordBoundaryRight(startFrom){var offset=0,index=startFrom;if(this._reSpace.test(this.text.charAt(index))){while(this._reSpace.test(this.text.charAt(index))) {offset++;index++;}}while(/\S/.test(this.text.charAt(index)) && index < this.text.length) {offset++;index++;}return startFrom + offset;},findLineBoundaryLeft:function findLineBoundaryLeft(startFrom){var offset=0,index=startFrom - 1;while(!/\n/.test(this.text.charAt(index)) && index > -1) {offset++;index--;}return startFrom - offset;},findLineBoundaryRight:function findLineBoundaryRight(startFrom){var offset=0,index=startFrom;while(!/\n/.test(this.text.charAt(index)) && index < this.text.length) {offset++;index++;}return startFrom + offset;},getNumNewLinesInSelectedText:function getNumNewLinesInSelectedText(){var selectedText=this.getSelectedText(),numNewLines=0;for(var i=0,chars=selectedText.split(''),len=chars.length;i < len;i++) {if(chars[i] === '\n'){numNewLines++;}}return numNewLines;},searchWordBoundary:function searchWordBoundary(selectionStart,direction){var index=this._reSpace.test(this.text.charAt(selectionStart))?selectionStart - 1:selectionStart,_char=this.text.charAt(index),reNonWord=/[ \n\.,;!\?\-]/;while(!reNonWord.test(_char) && index > 0 && index < this.text.length) {index += direction;_char = this.text.charAt(index);}if(reNonWord.test(_char) && _char !== '\n'){index += direction === 1?0:1;}return index;},selectWord:function selectWord(selectionStart){var newSelectionStart=this.searchWordBoundary(selectionStart,-1),newSelectionEnd=this.searchWordBoundary(selectionStart,1);this.setSelectionStart(newSelectionStart);this.setSelectionEnd(newSelectionEnd);},selectLine:function selectLine(selectionStart){var newSelectionStart=this.findLineBoundaryLeft(selectionStart),newSelectionEnd=this.findLineBoundaryRight(selectionStart);this.setSelectionStart(newSelectionStart);this.setSelectionEnd(newSelectionEnd);},enterEditing:function enterEditing(){if(this.isEditing || !this.editable){return;}if(this.canvas){this.exitEditingOnOthers(this.canvas);}this.isEditing = true;this.initHiddenTextarea();this.hiddenTextarea.focus();this._updateTextarea();this._saveEditingProps();this._setEditingProps();this._tick();this.fire('editing:entered');if(!this.canvas){return this;}this.canvas.renderAll();this.canvas.fire('text:editing:entered',{target:this});this.initMouseMoveHandler();return this;},exitEditingOnOthers:function exitEditingOnOthers(canvas){if(canvas._iTextInstances){canvas._iTextInstances.forEach(function(obj){obj.selected = false;if(obj.isEditing){obj.exitEditing();}});}},initMouseMoveHandler:function initMouseMoveHandler(){var _this=this;this.canvas.on('mouse:move',function(options){if(!_this.__isMousedown || !_this.isEditing){return;}var newSelectionStart=_this.getSelectionStartFromPointer(options.e);if(newSelectionStart >= _this.__selectionStartOnMouseDown){_this.setSelectionStart(_this.__selectionStartOnMouseDown);_this.setSelectionEnd(newSelectionStart);}else {_this.setSelectionStart(newSelectionStart);_this.setSelectionEnd(_this.__selectionStartOnMouseDown);}});},_setEditingProps:function _setEditingProps(){this.hoverCursor = 'text';if(this.canvas){this.canvas.defaultCursor = this.canvas.moveCursor = 'text';}this.borderColor = this.editingBorderColor;this.hasControls = this.selectable = false;this.lockMovementX = this.lockMovementY = true;},_updateTextarea:function _updateTextarea(){if(!this.hiddenTextarea){return;}this.hiddenTextarea.value = this.text;this.hiddenTextarea.selectionStart = this.selectionStart;this.hiddenTextarea.selectionEnd = this.selectionEnd;},_saveEditingProps:function _saveEditingProps(){this._savedProps = {hasControls:this.hasControls,borderColor:this.borderColor,lockMovementX:this.lockMovementX,lockMovementY:this.lockMovementY,hoverCursor:this.hoverCursor,defaultCursor:this.canvas && this.canvas.defaultCursor,moveCursor:this.canvas && this.canvas.moveCursor};},_restoreEditingProps:function _restoreEditingProps(){if(!this._savedProps){return;}this.hoverCursor = this._savedProps.overCursor;this.hasControls = this._savedProps.hasControls;this.borderColor = this._savedProps.borderColor;this.lockMovementX = this._savedProps.lockMovementX;this.lockMovementY = this._savedProps.lockMovementY;if(this.canvas){this.canvas.defaultCursor = this._savedProps.defaultCursor;this.canvas.moveCursor = this._savedProps.moveCursor;}},exitEditing:function exitEditing(){this.selected = false;this.isEditing = false;this.selectable = true;this.selectionEnd = this.selectionStart;this.hiddenTextarea && this.canvas && this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea);this.hiddenTextarea = null;this.abortCursorAnimation();this._restoreEditingProps();this._currentCursorOpacity = 0;this.fire('editing:exited');this.canvas && this.canvas.fire('text:editing:exited',{target:this});return this;},_removeExtraneousStyles:function _removeExtraneousStyles(){for(var prop in this.styles) {if(!this._textLines[prop]){delete this.styles[prop];}}},_removeCharsFromTo:function _removeCharsFromTo(start,end){var i=end;while(i !== start) {var prevIndex=this.get2DCursorLocation(i).charIndex;i--;var index=this.get2DCursorLocation(i).charIndex,isNewline=index > prevIndex;if(isNewline){this.removeStyleObject(isNewline,i + 1);}else {this.removeStyleObject(this.get2DCursorLocation(i).charIndex === 0,i);}}this.text = this.text.slice(0,start) + this.text.slice(end);this._clearCache();},insertChars:function insertChars(_chars,useCopiedStyle){var isEndOfLine=this.text.slice(this.selectionStart,this.selectionStart + 1) === '\n';this.text = this.text.slice(0,this.selectionStart) + _chars + this.text.slice(this.selectionEnd);if(this.selectionStart === this.selectionEnd){this.insertStyleObjects(_chars,isEndOfLine,useCopiedStyle);}this.setSelectionStart(this.selectionStart + _chars.length);this.setSelectionEnd(this.selectionStart);this._clearCache();this.canvas && this.canvas.renderAll();this.setCoords();this.fire('changed');this.canvas && this.canvas.fire('text:changed',{target:this});},insertNewlineStyleObject:function insertNewlineStyleObject(lineIndex,charIndex,isEndOfLine){this.shiftLineStyles(lineIndex,+1);if(!this.styles[lineIndex + 1]){this.styles[lineIndex + 1] = {};}var currentCharStyle=this.styles[lineIndex][charIndex - 1],newLineStyles={};if(isEndOfLine){newLineStyles[0] = clone(currentCharStyle);this.styles[lineIndex + 1] = newLineStyles;}else {for(var index in this.styles[lineIndex]) {if(parseInt(index,10) >= charIndex){newLineStyles[parseInt(index,10) - charIndex] = this.styles[lineIndex][index];delete this.styles[lineIndex][index];}}this.styles[lineIndex + 1] = newLineStyles;}this._clearCache();},insertCharStyleObject:function insertCharStyleObject(lineIndex,charIndex,style){var currentLineStyles=this.styles[lineIndex],currentLineStylesCloned=clone(currentLineStyles);if(charIndex === 0 && !style){charIndex = 1;}for(var index in currentLineStylesCloned) {var numericIndex=parseInt(index,10);if(numericIndex >= charIndex){currentLineStyles[numericIndex + 1] = currentLineStylesCloned[numericIndex];}}this.styles[lineIndex][charIndex] = style || clone(currentLineStyles[charIndex - 1]);this._clearCache();},insertStyleObjects:function insertStyleObjects(_chars,isEndOfLine,useCopiedStyle){var cursorLocation=this.get2DCursorLocation(),lineIndex=cursorLocation.lineIndex,charIndex=cursorLocation.charIndex;if(!this.styles[lineIndex]){this.styles[lineIndex] = {};}if(_chars === '\n'){this.insertNewlineStyleObject(lineIndex,charIndex,isEndOfLine);}else {if(useCopiedStyle){this._insertStyles(this.copiedStyles);}else {this.insertCharStyleObject(lineIndex,charIndex);}}},_insertStyles:function _insertStyles(styles){for(var i=0,len=styles.length;i < len;i++) {var cursorLocation=this.get2DCursorLocation(this.selectionStart + i),lineIndex=cursorLocation.lineIndex,charIndex=cursorLocation.charIndex;this.insertCharStyleObject(lineIndex,charIndex,styles[i]);}},shiftLineStyles:function shiftLineStyles(lineIndex,offset){var clonedStyles=clone(this.styles);for(var line in this.styles) {var numericLine=parseInt(line,10);if(numericLine > lineIndex){this.styles[numericLine + offset] = clonedStyles[numericLine];}}},removeStyleObject:function removeStyleObject(isBeginningOfLine,index){var cursorLocation=this.get2DCursorLocation(index),lineIndex=cursorLocation.lineIndex,charIndex=cursorLocation.charIndex;if(isBeginningOfLine){var textOnPreviousLine=this._textLines[lineIndex - 1],newCharIndexOnPrevLine=textOnPreviousLine?textOnPreviousLine.length:0;if(!this.styles[lineIndex - 1]){this.styles[lineIndex - 1] = {};}for(charIndex in this.styles[lineIndex]) {this.styles[lineIndex - 1][parseInt(charIndex,10) + newCharIndexOnPrevLine] = this.styles[lineIndex][charIndex];}this.shiftLineStyles(lineIndex,-1);}else {var currentLineStyles=this.styles[lineIndex];if(currentLineStyles){var offset=this.selectionStart === this.selectionEnd?-1:0;delete currentLineStyles[charIndex + offset];}var currentLineStylesCloned=clone(currentLineStyles);for(var i in currentLineStylesCloned) {var numericIndex=parseInt(i,10);if(numericIndex >= charIndex && numericIndex !== 0){currentLineStyles[numericIndex - 1] = currentLineStylesCloned[numericIndex];delete currentLineStyles[numericIndex];}}}},insertNewline:function insertNewline(){this.insertChars('\n');}});})();fabric.util.object.extend(fabric.IText.prototype,{initDoubleClickSimulation:function initDoubleClickSimulation(){this.__lastClickTime = +new Date();this.__lastLastClickTime = +new Date();this.__lastPointer = {};this.on('mousedown',this.onMouseDown.bind(this));},onMouseDown:function onMouseDown(options){this.__newClickTime = +new Date();var newPointer=this.canvas.getPointer(options.e);if(this.isTripleClick(newPointer)){this.fire('tripleclick',options);this._stopEvent(options.e);}else if(this.isDoubleClick(newPointer)){this.fire('dblclick',options);this._stopEvent(options.e);}this.__lastLastClickTime = this.__lastClickTime;this.__lastClickTime = this.__newClickTime;this.__lastPointer = newPointer;this.__lastIsEditing = this.isEditing;this.__lastSelected = this.selected;},isDoubleClick:function isDoubleClick(newPointer){return this.__newClickTime - this.__lastClickTime < 500 && this.__lastPointer.x === newPointer.x && this.__lastPointer.y === newPointer.y && this.__lastIsEditing;},isTripleClick:function isTripleClick(newPointer){return this.__newClickTime - this.__lastClickTime < 500 && this.__lastClickTime - this.__lastLastClickTime < 500 && this.__lastPointer.x === newPointer.x && this.__lastPointer.y === newPointer.y;},_stopEvent:function _stopEvent(e){e.preventDefault && e.preventDefault();e.stopPropagation && e.stopPropagation();},initCursorSelectionHandlers:function initCursorSelectionHandlers(){this.initSelectedHandler();this.initMousedownHandler();this.initMouseupHandler();this.initClicks();},initClicks:function initClicks(){this.on('dblclick',function(options){this.selectWord(this.getSelectionStartFromPointer(options.e));});this.on('tripleclick',function(options){this.selectLine(this.getSelectionStartFromPointer(options.e));});},initMousedownHandler:function initMousedownHandler(){this.on('mousedown',function(options){var pointer=this.canvas.getPointer(options.e);this.__mousedownX = pointer.x;this.__mousedownY = pointer.y;this.__isMousedown = true;if(this.hiddenTextarea && this.canvas){this.canvas.wrapperEl.appendChild(this.hiddenTextarea);}if(this.selected){this.setCursorByClick(options.e);}if(this.isEditing){this.__selectionStartOnMouseDown = this.selectionStart;this.initDelayedCursor(true);}});},_isObjectMoved:function _isObjectMoved(e){var pointer=this.canvas.getPointer(e);return this.__mousedownX !== pointer.x || this.__mousedownY !== pointer.y;},initMouseupHandler:function initMouseupHandler(){this.on('mouseup',function(options){this.__isMousedown = false;if(this._isObjectMoved(options.e)){return;}if(this.__lastSelected){this.enterEditing();this.initDelayedCursor(true);}this.selected = true;});},setCursorByClick:function setCursorByClick(e){var newSelectionStart=this.getSelectionStartFromPointer(e);if(e.shiftKey){if(newSelectionStart < this.selectionStart){this.setSelectionEnd(this.selectionStart);this.setSelectionStart(newSelectionStart);}else {this.setSelectionEnd(newSelectionStart);}}else {this.setSelectionStart(newSelectionStart);this.setSelectionEnd(newSelectionStart);}},_getLocalRotatedPointer:function _getLocalRotatedPointer(e){var pointer=this.canvas.getPointer(e),pClicked=new fabric.Point(pointer.x,pointer.y),pLeftTop=new fabric.Point(this.left,this.top),rotated=fabric.util.rotatePoint(pClicked,pLeftTop,fabric.util.degreesToRadians(-this.angle));return this.getLocalPointer(e,rotated);},getSelectionStartFromPointer:function getSelectionStartFromPointer(e){var mouseOffset=this._getLocalRotatedPointer(e),prevWidth=0,width=0,height=0,charIndex=0,newSelectionStart,line;for(var i=0,len=this._textLines.length;i < len;i++) {line = this._textLines[i].split('');height += this._getHeightOfLine(this.ctx,i) * this.scaleY;var widthOfLine=this._getLineWidth(this.ctx,i),lineLeftOffset=this._getLineLeftOffset(widthOfLine);width = lineLeftOffset * this.scaleX;if(this.flipX){this._textLines[i] = line.reverse().join('');}for(var j=0,jlen=line.length;j < jlen;j++) {var _char=line[j];prevWidth = width;width += this._getWidthOfChar(this.ctx,_char,i,this.flipX?jlen - j:j) * this.scaleX;if(height <= mouseOffset.y || width <= mouseOffset.x){charIndex++;continue;}return this._getNewSelectionStartFromOffset(mouseOffset,prevWidth,width,charIndex + i,jlen);}if(mouseOffset.y < height){return this._getNewSelectionStartFromOffset(mouseOffset,prevWidth,width,charIndex + i,jlen);}}if(typeof newSelectionStart === 'undefined'){return this.text.length;}},_getNewSelectionStartFromOffset:function _getNewSelectionStartFromOffset(mouseOffset,prevWidth,width,index,jlen){var distanceBtwLastCharAndCursor=mouseOffset.x - prevWidth,distanceBtwNextCharAndCursor=width - mouseOffset.x,offset=distanceBtwNextCharAndCursor > distanceBtwLastCharAndCursor?0:1,newSelectionStart=index + offset;if(this.flipX){newSelectionStart = jlen - newSelectionStart;}if(newSelectionStart > this.text.length){newSelectionStart = this.text.length;}return newSelectionStart;}});fabric.util.object.extend(fabric.IText.prototype,{initHiddenTextarea:function initHiddenTextarea(){this.hiddenTextarea = fabric.document.createElement('textarea');this.hiddenTextarea.setAttribute('autocapitalize','off');this.hiddenTextarea.style.cssText = 'position: fixed; bottom: 20px; left: 0px; opacity: 0;' + ' width: 0px; height: 0px; z-index: -999;';fabric.document.body.appendChild(this.hiddenTextarea);fabric.util.addListener(this.hiddenTextarea,'keydown',this.onKeyDown.bind(this));fabric.util.addListener(this.hiddenTextarea,'keypress',this.onKeyPress.bind(this));fabric.util.addListener(this.hiddenTextarea,'copy',this.copy.bind(this));fabric.util.addListener(this.hiddenTextarea,'paste',this.paste.bind(this));if(!this._clickHandlerInitialized && this.canvas){fabric.util.addListener(this.canvas.upperCanvasEl,'click',this.onClick.bind(this));this._clickHandlerInitialized = true;}},_keysMap:{8:'removeChars',9:'exitEditing',27:'exitEditing',13:'insertNewline',33:'moveCursorUp',34:'moveCursorDown',35:'moveCursorRight',36:'moveCursorLeft',37:'moveCursorLeft',38:'moveCursorUp',39:'moveCursorRight',40:'moveCursorDown',46:'forwardDelete'},_ctrlKeysMap:{65:'selectAll',88:'cut'},onClick:function onClick(){this.hiddenTextarea && this.hiddenTextarea.focus();},onKeyDown:function onKeyDown(e){if(!this.isEditing){return;}if(e.keyCode in this._keysMap){this[this._keysMap[e.keyCode]](e);}else if(e.keyCode in this._ctrlKeysMap && (e.ctrlKey || e.metaKey)){this[this._ctrlKeysMap[e.keyCode]](e);}else {return;}e.stopImmediatePropagation();e.preventDefault();this.canvas && this.canvas.renderAll();},forwardDelete:function forwardDelete(e){if(this.selectionStart === this.selectionEnd){this.moveCursorRight(e);}this.removeChars(e);},copy:function copy(e){var selectedText=this.getSelectedText(),clipboardData=this._getClipboardData(e);if(clipboardData){clipboardData.setData('text',selectedText);}this.copiedText = selectedText;this.copiedStyles = this.getSelectionStyles(this.selectionStart,this.selectionEnd);},paste:function paste(e){var copiedText=null,clipboardData=this._getClipboardData(e);if(clipboardData){copiedText = clipboardData.getData('text');}else {copiedText = this.copiedText;}if(copiedText){this.insertChars(copiedText,true);}},cut:function cut(e){if(this.selectionStart === this.selectionEnd){return;}this.copy();this.removeChars(e);},_getClipboardData:function _getClipboardData(e){return e && (e.clipboardData || fabric.window.clipboardData);},onKeyPress:function onKeyPress(e){if(!this.isEditing || e.metaKey || e.ctrlKey){return;}if(e.which !== 0){this.insertChars(String.fromCharCode(e.which));}e.stopPropagation();},getDownCursorOffset:function getDownCursorOffset(e,isRight){var selectionProp=isRight?this.selectionEnd:this.selectionStart,_char,lineLeftOffset,textBeforeCursor=this.text.slice(0,selectionProp),textAfterCursor=this.text.slice(selectionProp),textOnSameLineBeforeCursor=textBeforeCursor.slice(textBeforeCursor.lastIndexOf('\n') + 1),textOnSameLineAfterCursor=textAfterCursor.match(/(.*)\n?/)[1],textOnNextLine=(textAfterCursor.match(/.*\n(.*)\n?/) || {})[1] || '',cursorLocation=this.get2DCursorLocation(selectionProp);if(cursorLocation.lineIndex === this._textLines.length - 1 || e.metaKey || e.keyCode === 34){return this.text.length - selectionProp;}var widthOfSameLineBeforeCursor=this._getLineWidth(this.ctx,cursorLocation.lineIndex);lineLeftOffset = this._getLineLeftOffset(widthOfSameLineBeforeCursor);var widthOfCharsOnSameLineBeforeCursor=lineLeftOffset,lineIndex=cursorLocation.lineIndex;for(var i=0,len=textOnSameLineBeforeCursor.length;i < len;i++) {_char = textOnSameLineBeforeCursor[i];widthOfCharsOnSameLineBeforeCursor += this._getWidthOfChar(this.ctx,_char,lineIndex,i);}var indexOnNextLine=this._getIndexOnNextLine(cursorLocation,textOnNextLine,widthOfCharsOnSameLineBeforeCursor);return textOnSameLineAfterCursor.length + 1 + indexOnNextLine;},_getIndexOnNextLine:function _getIndexOnNextLine(cursorLocation,textOnNextLine,widthOfCharsOnSameLineBeforeCursor){var lineIndex=cursorLocation.lineIndex + 1,widthOfNextLine=this._getLineWidth(this.ctx,lineIndex),lineLeftOffset=this._getLineLeftOffset(widthOfNextLine),widthOfCharsOnNextLine=lineLeftOffset,indexOnNextLine=0,foundMatch;for(var j=0,jlen=textOnNextLine.length;j < jlen;j++) {var _char=textOnNextLine[j],widthOfChar=this._getWidthOfChar(this.ctx,_char,lineIndex,j);widthOfCharsOnNextLine += widthOfChar;if(widthOfCharsOnNextLine > widthOfCharsOnSameLineBeforeCursor){foundMatch = true;var leftEdge=widthOfCharsOnNextLine - widthOfChar,rightEdge=widthOfCharsOnNextLine,offsetFromLeftEdge=Math.abs(leftEdge - widthOfCharsOnSameLineBeforeCursor),offsetFromRightEdge=Math.abs(rightEdge - widthOfCharsOnSameLineBeforeCursor);indexOnNextLine = offsetFromRightEdge < offsetFromLeftEdge?j + 1:j;break;}}if(!foundMatch){indexOnNextLine = textOnNextLine.length;}return indexOnNextLine;},moveCursorDown:function moveCursorDown(e){this.abortCursorAnimation();this._currentCursorOpacity = 1;var offset=this.getDownCursorOffset(e,this._selectionDirection === 'right');if(e.shiftKey){this.moveCursorDownWithShift(offset);}else {this.moveCursorDownWithoutShift(offset);}this.initDelayedCursor();},moveCursorDownWithoutShift:function moveCursorDownWithoutShift(offset){this._selectionDirection = 'right';this.setSelectionStart(this.selectionStart + offset);this.setSelectionEnd(this.selectionStart);},swapSelectionPoints:function swapSelectionPoints(){var swapSel=this.selectionEnd;this.setSelectionEnd(this.selectionStart);this.setSelectionStart(swapSel);},moveCursorDownWithShift:function moveCursorDownWithShift(offset){if(this.selectionEnd === this.selectionStart){this._selectionDirection = 'right';}if(this._selectionDirection === 'right'){this.setSelectionEnd(this.selectionEnd + offset);}else {this.setSelectionStart(this.selectionStart + offset);}if(this.selectionEnd < this.selectionStart && this._selectionDirection === 'left'){this.swapSelectionPoints();this._selectionDirection = 'right';}if(this.selectionEnd > this.text.length){this.setSelectionEnd(this.text.length);}},getUpCursorOffset:function getUpCursorOffset(e,isRight){var selectionProp=isRight?this.selectionEnd:this.selectionStart,cursorLocation=this.get2DCursorLocation(selectionProp);if(cursorLocation.lineIndex === 0 || e.metaKey || e.keyCode === 33){return selectionProp;}var textBeforeCursor=this.text.slice(0,selectionProp),textOnSameLineBeforeCursor=textBeforeCursor.slice(textBeforeCursor.lastIndexOf('\n') + 1),textOnPreviousLine=(textBeforeCursor.match(/\n?(.*)\n.*$/) || {})[1] || '',_char,widthOfSameLineBeforeCursor=this._getLineWidth(this.ctx,cursorLocation.lineIndex),lineLeftOffset=this._getLineLeftOffset(widthOfSameLineBeforeCursor),widthOfCharsOnSameLineBeforeCursor=lineLeftOffset,lineIndex=cursorLocation.lineIndex;for(var i=0,len=textOnSameLineBeforeCursor.length;i < len;i++) {_char = textOnSameLineBeforeCursor[i];widthOfCharsOnSameLineBeforeCursor += this._getWidthOfChar(this.ctx,_char,lineIndex,i);}var indexOnPrevLine=this._getIndexOnPrevLine(cursorLocation,textOnPreviousLine,widthOfCharsOnSameLineBeforeCursor);return textOnPreviousLine.length - indexOnPrevLine + textOnSameLineBeforeCursor.length;},_getIndexOnPrevLine:function _getIndexOnPrevLine(cursorLocation,textOnPreviousLine,widthOfCharsOnSameLineBeforeCursor){var lineIndex=cursorLocation.lineIndex - 1,widthOfPreviousLine=this._getLineWidth(this.ctx,lineIndex),lineLeftOffset=this._getLineLeftOffset(widthOfPreviousLine),widthOfCharsOnPreviousLine=lineLeftOffset,indexOnPrevLine=0,foundMatch;for(var j=0,jlen=textOnPreviousLine.length;j < jlen;j++) {var _char=textOnPreviousLine[j],widthOfChar=this._getWidthOfChar(this.ctx,_char,lineIndex,j);widthOfCharsOnPreviousLine += widthOfChar;if(widthOfCharsOnPreviousLine > widthOfCharsOnSameLineBeforeCursor){foundMatch = true;var leftEdge=widthOfCharsOnPreviousLine - widthOfChar,rightEdge=widthOfCharsOnPreviousLine,offsetFromLeftEdge=Math.abs(leftEdge - widthOfCharsOnSameLineBeforeCursor),offsetFromRightEdge=Math.abs(rightEdge - widthOfCharsOnSameLineBeforeCursor);indexOnPrevLine = offsetFromRightEdge < offsetFromLeftEdge?j:j - 1;break;}}if(!foundMatch){indexOnPrevLine = textOnPreviousLine.length - 1;}return indexOnPrevLine;},moveCursorUp:function moveCursorUp(e){this.abortCursorAnimation();this._currentCursorOpacity = 1;var offset=this.getUpCursorOffset(e,this._selectionDirection === 'right');if(e.shiftKey){this.moveCursorUpWithShift(offset);}else {this.moveCursorUpWithoutShift(offset);}this.initDelayedCursor();},moveCursorUpWithShift:function moveCursorUpWithShift(offset){if(this.selectionEnd === this.selectionStart){this._selectionDirection = 'left';}if(this._selectionDirection === 'right'){this.setSelectionEnd(this.selectionEnd - offset);}else {this.setSelectionStart(this.selectionStart - offset);}if(this.selectionEnd < this.selectionStart && this._selectionDirection === 'right'){this.swapSelectionPoints();this._selectionDirection = 'left';}},moveCursorUpWithoutShift:function moveCursorUpWithoutShift(offset){if(this.selectionStart === this.selectionEnd){this.setSelectionStart(this.selectionStart - offset);}this.setSelectionEnd(this.selectionStart);this._selectionDirection = 'left';},moveCursorLeft:function moveCursorLeft(e){if(this.selectionStart === 0 && this.selectionEnd === 0){return;}this.abortCursorAnimation();this._currentCursorOpacity = 1;if(e.shiftKey){this.moveCursorLeftWithShift(e);}else {this.moveCursorLeftWithoutShift(e);}this.initDelayedCursor();},_move:function _move(e,prop,direction){var propMethod=prop === 'selectionStart'?'setSelectionStart':'setSelectionEnd';if(e.altKey){this[propMethod](this['findWordBoundary' + direction](this[prop]));}else if(e.metaKey || e.keyCode === 35 || e.keyCode === 36){this[propMethod](this['findLineBoundary' + direction](this[prop]));}else {this[propMethod](this[prop] + (direction === 'Left'?-1:1));}},_moveLeft:function _moveLeft(e,prop){this._move(e,prop,'Left');},_moveRight:function _moveRight(e,prop){this._move(e,prop,'Right');},moveCursorLeftWithoutShift:function moveCursorLeftWithoutShift(e){this._selectionDirection = 'left';if(this.selectionEnd === this.selectionStart){this._moveLeft(e,'selectionStart');}this.setSelectionEnd(this.selectionStart);},moveCursorLeftWithShift:function moveCursorLeftWithShift(e){if(this._selectionDirection === 'right' && this.selectionStart !== this.selectionEnd){this._moveLeft(e,'selectionEnd');}else {this._selectionDirection = 'left';this._moveLeft(e,'selectionStart');if(this.text.charAt(this.selectionStart) === '\n'){this.setSelectionStart(this.selectionStart - 1);}}},moveCursorRight:function moveCursorRight(e){if(this.selectionStart >= this.text.length && this.selectionEnd >= this.text.length){return;}this.abortCursorAnimation();this._currentCursorOpacity = 1;if(e.shiftKey){this.moveCursorRightWithShift(e);}else {this.moveCursorRightWithoutShift(e);}this.initDelayedCursor();},moveCursorRightWithShift:function moveCursorRightWithShift(e){if(this._selectionDirection === 'left' && this.selectionStart !== this.selectionEnd){this._moveRight(e,'selectionStart');}else {this._selectionDirection = 'right';this._moveRight(e,'selectionEnd');if(this.text.charAt(this.selectionEnd - 1) === '\n'){this.setSelectionEnd(this.selectionEnd + 1);}}},moveCursorRightWithoutShift:function moveCursorRightWithoutShift(e){this._selectionDirection = 'right';if(this.selectionStart === this.selectionEnd){this._moveRight(e,'selectionStart');this.setSelectionEnd(this.selectionStart);}else {this.setSelectionEnd(this.selectionEnd + this.getNumNewLinesInSelectedText());this.setSelectionStart(this.selectionEnd);}},removeChars:function removeChars(e){if(this.selectionStart === this.selectionEnd){this._removeCharsNearCursor(e);}else {this._removeCharsFromTo(this.selectionStart,this.selectionEnd);}this.setSelectionEnd(this.selectionStart);this._removeExtraneousStyles();this._clearCache();this.canvas && this.canvas.renderAll();this.setCoords();this.fire('changed');this.canvas && this.canvas.fire('text:changed',{target:this});},_removeCharsNearCursor:function _removeCharsNearCursor(e){if(this.selectionStart !== 0){if(e.metaKey){var leftLineBoundary=this.findLineBoundaryLeft(this.selectionStart);this._removeCharsFromTo(leftLineBoundary,this.selectionStart);this.setSelectionStart(leftLineBoundary);}else if(e.altKey){var leftWordBoundary=this.findWordBoundaryLeft(this.selectionStart);this._removeCharsFromTo(leftWordBoundary,this.selectionStart);this.setSelectionStart(leftWordBoundary);}else {var isBeginningOfLine=this.text.slice(this.selectionStart - 1,this.selectionStart) === '\n';this.removeStyleObject(isBeginningOfLine);this.setSelectionStart(this.selectionStart - 1);this.text = this.text.slice(0,this.selectionStart) + this.text.slice(this.selectionStart + 1);}}}});fabric.util.object.extend(fabric.IText.prototype,{_setSVGTextLineText:function _setSVGTextLineText(lineIndex,textSpans,height,textLeftOffset,textTopOffset,textBgRects){if(!this.styles[lineIndex]){this.callSuper('_setSVGTextLineText',lineIndex,textSpans,height,textLeftOffset,textTopOffset);}else {this._setSVGTextLineChars(lineIndex,textSpans,height,textLeftOffset,textBgRects);}},_setSVGTextLineChars:function _setSVGTextLineChars(lineIndex,textSpans,height,textLeftOffset,textBgRects){var chars=this._textLines[lineIndex].split(''),charOffset=0,lineLeftOffset=this._getSVGLineLeftOffset(lineIndex) - this.width / 2,lineOffset=this._getSVGLineTopOffset(lineIndex),heightOfLine=this._getHeightOfLine(this.ctx,lineIndex);for(var i=0,len=chars.length;i < len;i++) {var styleDecl=this.styles[lineIndex][i] || {};textSpans.push(this._createTextCharSpan(chars[i],styleDecl,lineLeftOffset,lineOffset.lineTop + lineOffset.offset,charOffset));var charWidth=this._getWidthOfChar(this.ctx,chars[i],lineIndex,i);if(styleDecl.textBackgroundColor){textBgRects.push(this._createTextCharBg(styleDecl,lineLeftOffset,lineOffset.lineTop,heightOfLine,charWidth,charOffset));}charOffset += charWidth;}},_getSVGLineLeftOffset:function _getSVGLineLeftOffset(lineIndex){return fabric.util.toFixed(this._getLineLeftOffset(this.__lineWidths[lineIndex]),2);},_getSVGLineTopOffset:function _getSVGLineTopOffset(lineIndex){var lineTopOffset=0,lastHeight=0;for(var j=0;j < lineIndex;j++) {lineTopOffset += this._getHeightOfLine(this.ctx,j);}lastHeight = this._getHeightOfLine(this.ctx,j);return {lineTop:lineTopOffset,offset:(this._fontSizeMult - this._fontSizeFraction) * lastHeight / (this.lineHeight * this._fontSizeMult)};},_createTextCharBg:function _createTextCharBg(styleDecl,lineLeftOffset,lineTopOffset,heightOfLine,charWidth,charOffset){return ['<rect fill="',styleDecl.textBackgroundColor,'" x="',lineLeftOffset + charOffset,'" y="',lineTopOffset - this.height / 2,'" width="',charWidth,'" height="',heightOfLine / this.lineHeight,'"></rect>'].join('');},_createTextCharSpan:function _createTextCharSpan(_char,styleDecl,lineLeftOffset,lineTopOffset,charOffset){var fillStyles=this.getSvgStyles.call(fabric.util.object.extend({visible:true,fill:this.fill,stroke:this.stroke,type:'text'},styleDecl));return ['<tspan x="',lineLeftOffset + charOffset,'" y="',lineTopOffset - this.height / 2,'" ',styleDecl.fontFamily?'font-family="' + styleDecl.fontFamily.replace(/"/g,'\'') + '" ':'',styleDecl.fontSize?'font-size="' + styleDecl.fontSize + '" ':'',styleDecl.fontStyle?'font-style="' + styleDecl.fontStyle + '" ':'',styleDecl.fontWeight?'font-weight="' + styleDecl.fontWeight + '" ':'',styleDecl.textDecoration?'text-decoration="' + styleDecl.textDecoration + '" ':'','style="',fillStyles,'">',fabric.util.string.escapeXml(_char),'</tspan>'].join('');}});(function(){if(typeof document !== 'undefined' && typeof window !== 'undefined'){return;}var DOMParser=__webpack_require__(20).DOMParser,URL=__webpack_require__(21),HTTP=__webpack_require__(27),HTTPS=__webpack_require__(53),Canvas=__webpack_require__(18),Image=__webpack_require__(18).Image;function request(url,encoding,callback){var oURL=URL.parse(url);if(!oURL.port){oURL.port = oURL.protocol.indexOf('https:') === 0?443:80;}var reqHandler=oURL.protocol.indexOf('https:') === 0?HTTPS:HTTP,req=reqHandler.request({hostname:oURL.hostname,port:oURL.port,path:oURL.path,method:'GET'},function(response){var body='';if(encoding){response.setEncoding(encoding);}response.on('end',function(){callback(body);});response.on('data',function(chunk){if(response.statusCode === 200){body += chunk;}});});req.on('error',function(err){if(err.errno === process.ECONNREFUSED){fabric.log('ECONNREFUSED: connection refused to ' + oURL.hostname + ':' + oURL.port);}else {fabric.log(err.message);}});req.end();}function requestFs(path,callback){var fs=__webpack_require__(54);fs.readFile(path,function(err,data){if(err){fabric.log(err);throw err;}else {callback(data);}});}fabric.util.loadImage = function(url,callback,context){function createImageAndCallBack(data){img.src = new Buffer(data,'binary');img._src = url;callback && callback.call(context,img);}var img=new Image();if(url && (url instanceof Buffer || url.indexOf('data') === 0)){img.src = img._src = url;callback && callback.call(context,img);}else if(url && url.indexOf('http') !== 0){requestFs(url,createImageAndCallBack);}else if(url){request(url,'binary',createImageAndCallBack);}else {callback && callback.call(context,url);}};fabric.loadSVGFromURL = function(url,callback,reviver){url = url.replace(/^\n\s*/,'').replace(/\?.*$/,'').trim();if(url.indexOf('http') !== 0){requestFs(url,function(body){fabric.loadSVGFromString(body.toString(),callback,reviver);});}else {request(url,'',function(body){fabric.loadSVGFromString(body,callback,reviver);});}};fabric.loadSVGFromString = function(string,callback,reviver){var doc=new DOMParser().parseFromString(string);fabric.parseSVGDocument(doc.documentElement,function(results,options){callback && callback(results,options);},reviver);};fabric.util.getScript = function(url,callback){request(url,'',function(body){eval(body);callback && callback();});};fabric.Image.fromObject = function(object,callback){fabric.util.loadImage(object.src,function(img){var oImg=new fabric.Image(img);oImg._initConfig(object);oImg._initFilters(object,function(filters){oImg.filters = filters || [];callback && callback(oImg);});});};fabric.createCanvasForNode = function(width,height,options,nodeCanvasOptions){nodeCanvasOptions = nodeCanvasOptions || options;var canvasEl=fabric.document.createElement('canvas'),nodeCanvas=new Canvas(width || 600,height || 600,nodeCanvasOptions);canvasEl.style = {};canvasEl.width = nodeCanvas.width;canvasEl.height = nodeCanvas.height;var FabricCanvas=fabric.Canvas || fabric.StaticCanvas,fabricCanvas=new FabricCanvas(canvasEl,options);fabricCanvas.contextContainer = nodeCanvas.getContext('2d');fabricCanvas.nodeCanvas = nodeCanvas;fabricCanvas.Font = Canvas.Font;return fabricCanvas;};fabric.StaticCanvas.prototype.createPNGStream = function(){return this.nodeCanvas.createPNGStream();};fabric.StaticCanvas.prototype.createJPEGStream = function(opts){return this.nodeCanvas.createJPEGStream(opts);};var origSetWidth=fabric.StaticCanvas.prototype.setWidth;fabric.StaticCanvas.prototype.setWidth = function(width,options){origSetWidth.call(this,width,options);this.nodeCanvas.width = width;return this;};if(fabric.Canvas){fabric.Canvas.prototype.setWidth = fabric.StaticCanvas.prototype.setWidth;}var origSetHeight=fabric.StaticCanvas.prototype.setHeight;fabric.StaticCanvas.prototype.setHeight = function(height,options){origSetHeight.call(this,height,options);this.nodeCanvas.height = height;return this;};if(fabric.Canvas){fabric.Canvas.prototype.setHeight = fabric.StaticCanvas.prototype.setHeight;}})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer, __webpack_require__(17)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	var base64 = __webpack_require__(14)
	var ieee754 = __webpack_require__(15)
	var isArray = __webpack_require__(16)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var rootParent = {}
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  function Foo () {}
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    arr.constructor = Foo
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Foo && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }
	
	  this.length = 0
	  this.parent = undefined
	
	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }
	
	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }
	
	  // Unusual.
	  return fromObject(this, arg)
	}
	
	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'
	
	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)
	
	  that.write(string, encoding)
	  return that
	}
	
	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)
	
	  if (isArray(object)) return fromArray(that, object)
	
	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }
	
	  if (object.length) return fromArrayLike(that, object)
	
	  return fromJsonObject(that, object)
	}
	
	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}
	
	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0
	
	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)
	
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }
	
	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent
	
	  return that
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)
	
	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break
	
	    ++i
	  }
	
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }
	
	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0
	
	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1
	
	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)
	
	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }
	
	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'binary':
	        return binaryWrite(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }
	
	  return res + decodeUtf8Char(tmp)
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  if (newBuf.length) newBuf.parent = this.parent || this
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	
	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }
	
	  return len
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new RangeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set
	
	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0
	
	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet
	
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 15 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * toString
	 */
	
	var str = Object.prototype.toString;
	
	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */
	
	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 18 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 19 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 20 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(22);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(24);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module), (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(25);
	exports.encode = exports.stringify = __webpack_require__(26);


/***/ },
/* 25 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var http = module.exports;
	var EventEmitter = __webpack_require__(28).EventEmitter;
	var Request = __webpack_require__(29);
	var url = __webpack_require__(21)
	
	http.request = function (params, cb) {
	    if (typeof params === 'string') {
	        params = url.parse(params)
	    }
	    if (!params) params = {};
	    if (!params.host && !params.port) {
	        params.port = parseInt(window.location.port, 10);
	    }
	    if (!params.host && params.hostname) {
	        params.host = params.hostname;
	    }
	
	    if (!params.protocol) {
	        if (params.scheme) {
	            params.protocol = params.scheme + ':';
	        } else {
	            params.protocol = window.location.protocol;
	        }
	    }
	
	    if (!params.host) {
	        params.host = window.location.hostname || window.location.host;
	    }
	    if (/:/.test(params.host)) {
	        if (!params.port) {
	            params.port = params.host.split(':')[1];
	        }
	        params.host = params.host.split(':')[0];
	    }
	    if (!params.port) params.port = params.protocol == 'https:' ? 443 : 80;
	    
	    var req = new Request(new xhrHttp, params);
	    if (cb) req.on('response', cb);
	    return req;
	};
	
	http.get = function (params, cb) {
	    params.method = 'GET';
	    var req = http.request(params, cb);
	    req.end();
	    return req;
	};
	
	http.Agent = function () {};
	http.Agent.defaultMaxSockets = 4;
	
	var xhrHttp = (function () {
	    if (typeof window === 'undefined') {
	        throw new Error('no window object present');
	    }
	    else if (window.XMLHttpRequest) {
	        return window.XMLHttpRequest;
	    }
	    else if (window.ActiveXObject) {
	        var axs = [
	            'Msxml2.XMLHTTP.6.0',
	            'Msxml2.XMLHTTP.3.0',
	            'Microsoft.XMLHTTP'
	        ];
	        for (var i = 0; i < axs.length; i++) {
	            try {
	                var ax = new(window.ActiveXObject)(axs[i]);
	                return function () {
	                    if (ax) {
	                        var ax_ = ax;
	                        ax = null;
	                        return ax_;
	                    }
	                    else {
	                        return new(window.ActiveXObject)(axs[i]);
	                    }
	                };
	            }
	            catch (e) {}
	        }
	        throw new Error('ajax not supported in this browser')
	    }
	    else {
	        throw new Error('ajax not supported in this browser');
	    }
	})();
	
	http.STATUS_CODES = {
	    100 : 'Continue',
	    101 : 'Switching Protocols',
	    102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
	    200 : 'OK',
	    201 : 'Created',
	    202 : 'Accepted',
	    203 : 'Non-Authoritative Information',
	    204 : 'No Content',
	    205 : 'Reset Content',
	    206 : 'Partial Content',
	    207 : 'Multi-Status',               // RFC 4918
	    300 : 'Multiple Choices',
	    301 : 'Moved Permanently',
	    302 : 'Moved Temporarily',
	    303 : 'See Other',
	    304 : 'Not Modified',
	    305 : 'Use Proxy',
	    307 : 'Temporary Redirect',
	    400 : 'Bad Request',
	    401 : 'Unauthorized',
	    402 : 'Payment Required',
	    403 : 'Forbidden',
	    404 : 'Not Found',
	    405 : 'Method Not Allowed',
	    406 : 'Not Acceptable',
	    407 : 'Proxy Authentication Required',
	    408 : 'Request Time-out',
	    409 : 'Conflict',
	    410 : 'Gone',
	    411 : 'Length Required',
	    412 : 'Precondition Failed',
	    413 : 'Request Entity Too Large',
	    414 : 'Request-URI Too Large',
	    415 : 'Unsupported Media Type',
	    416 : 'Requested Range Not Satisfiable',
	    417 : 'Expectation Failed',
	    418 : 'I\'m a teapot',              // RFC 2324
	    422 : 'Unprocessable Entity',       // RFC 4918
	    423 : 'Locked',                     // RFC 4918
	    424 : 'Failed Dependency',          // RFC 4918
	    425 : 'Unordered Collection',       // RFC 4918
	    426 : 'Upgrade Required',           // RFC 2817
	    428 : 'Precondition Required',      // RFC 6585
	    429 : 'Too Many Requests',          // RFC 6585
	    431 : 'Request Header Fields Too Large',// RFC 6585
	    500 : 'Internal Server Error',
	    501 : 'Not Implemented',
	    502 : 'Bad Gateway',
	    503 : 'Service Unavailable',
	    504 : 'Gateway Time-out',
	    505 : 'HTTP Version Not Supported',
	    506 : 'Variant Also Negotiates',    // RFC 2295
	    507 : 'Insufficient Storage',       // RFC 4918
	    509 : 'Bandwidth Limit Exceeded',
	    510 : 'Not Extended',               // RFC 2774
	    511 : 'Network Authentication Required' // RFC 6585
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(30);
	var Response = __webpack_require__(47);
	var Base64 = __webpack_require__(51);
	var inherits = __webpack_require__(52);
	
	var Request = module.exports = function (xhr, params) {
	    var self = this;
	    self.writable = true;
	    self.xhr = xhr;
	    self.body = [];
	    
	    self.uri = (params.protocol || 'http:') + '//'
	        + params.host
	        + (params.port ? ':' + params.port : '')
	        + (params.path || '/')
	    ;
	    
	    if (typeof params.withCredentials === 'undefined') {
	        params.withCredentials = true;
	    }
	
	    try { xhr.withCredentials = params.withCredentials }
	    catch (e) {}
	    
	    if (params.responseType) try { xhr.responseType = params.responseType }
	    catch (e) {}
	    
	    xhr.open(
	        params.method || 'GET',
	        self.uri,
	        true
	    );
	
	    xhr.onerror = function(event) {
	        self.emit('error', new Error('Network error'));
	    };
	
	    self._headers = {};
	    
	    if (params.headers) {
	        var keys = objectKeys(params.headers);
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (!self.isSafeRequestHeader(key)) continue;
	            var value = params.headers[key];
	            self.setHeader(key, value);
	        }
	    }
	    
	    if (params.auth) {
	        //basic auth
	        this.setHeader('Authorization', 'Basic ' + Base64.btoa(params.auth));
	    }
	
	    var res = new Response;
	    res.on('close', function () {
	        self.emit('close');
	    });
	    
	    res.on('ready', function () {
	        self.emit('response', res);
	    });
	
	    res.on('error', function (err) {
	        self.emit('error', err);
	    });
	    
	    xhr.onreadystatechange = function () {
	        // Fix for IE9 bug
	        // SCRIPT575: Could not complete the operation due to error c00c023f
	        // It happens when a request is aborted, calling the success callback anyway with readyState === 4
	        if (xhr.__aborted) return;
	        res.handle(xhr);
	    };
	};
	
	inherits(Request, Stream);
	
	Request.prototype.setHeader = function (key, value) {
	    this._headers[key.toLowerCase()] = value
	};
	
	Request.prototype.getHeader = function (key) {
	    return this._headers[key.toLowerCase()]
	};
	
	Request.prototype.removeHeader = function (key) {
	    delete this._headers[key.toLowerCase()]
	};
	
	Request.prototype.write = function (s) {
	    this.body.push(s);
	};
	
	Request.prototype.destroy = function (s) {
	    this.xhr.__aborted = true;
	    this.xhr.abort();
	    this.emit('close');
	};
	
	Request.prototype.end = function (s) {
	    if (s !== undefined) this.body.push(s);
	
	    var keys = objectKeys(this._headers);
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = this._headers[key];
	        if (isArray(value)) {
	            for (var j = 0; j < value.length; j++) {
	                this.xhr.setRequestHeader(key, value[j]);
	            }
	        }
	        else this.xhr.setRequestHeader(key, value)
	    }
	
	    if (this.body.length === 0) {
	        this.xhr.send('');
	    }
	    else if (typeof this.body[0] === 'string') {
	        this.xhr.send(this.body.join(''));
	    }
	    else if (isArray(this.body[0])) {
	        var body = [];
	        for (var i = 0; i < this.body.length; i++) {
	            body.push.apply(body, this.body[i]);
	        }
	        this.xhr.send(body);
	    }
	    else if (/Array/.test(Object.prototype.toString.call(this.body[0]))) {
	        var len = 0;
	        for (var i = 0; i < this.body.length; i++) {
	            len += this.body[i].length;
	        }
	        var body = new(this.body[0].constructor)(len);
	        var k = 0;
	        
	        for (var i = 0; i < this.body.length; i++) {
	            var b = this.body[i];
	            for (var j = 0; j < b.length; j++) {
	                body[k++] = b[j];
	            }
	        }
	        this.xhr.send(body);
	    }
	    else if (isXHR2Compatible(this.body[0])) {
	        this.xhr.send(this.body[0]);
	    }
	    else {
	        var body = '';
	        for (var i = 0; i < this.body.length; i++) {
	            body += this.body[i].toString();
	        }
	        this.xhr.send(body);
	    }
	};
	
	// Taken from http://dxr.mozilla.org/mozilla/mozilla-central/content/base/src/nsXMLHttpRequest.cpp.html
	Request.unsafeHeaders = [
	    "accept-charset",
	    "accept-encoding",
	    "access-control-request-headers",
	    "access-control-request-method",
	    "connection",
	    "content-length",
	    "cookie",
	    "cookie2",
	    "content-transfer-encoding",
	    "date",
	    "expect",
	    "host",
	    "keep-alive",
	    "origin",
	    "referer",
	    "te",
	    "trailer",
	    "transfer-encoding",
	    "upgrade",
	    "user-agent",
	    "via"
	];
	
	Request.prototype.isSafeRequestHeader = function (headerName) {
	    if (!headerName) return false;
	    return indexOf(Request.unsafeHeaders, headerName.toLowerCase()) === -1;
	};
	
	var objectKeys = Object.keys || function (obj) {
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    return keys;
	};
	
	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};
	
	var indexOf = function (xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0; i < xs.length; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	};
	
	var isXHR2Compatible = function (obj) {
	    if (typeof Blob !== 'undefined' && obj instanceof Blob) return true;
	    if (typeof ArrayBuffer !== 'undefined' && obj instanceof ArrayBuffer) return true;
	    if (typeof FormData !== 'undefined' && obj instanceof FormData) return true;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Stream;
	
	var EE = __webpack_require__(28).EventEmitter;
	var inherits = __webpack_require__(31);
	
	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(32);
	Stream.Writable = __webpack_require__(43);
	Stream.Duplex = __webpack_require__(44);
	Stream.Transform = __webpack_require__(45);
	Stream.PassThrough = __webpack_require__(46);
	
	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;
	
	
	
	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.
	
	function Stream() {
	  EE.call(this);
	}
	
	Stream.prototype.pipe = function(dest, options) {
	  var source = this;
	
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	
	  source.on('data', ondata);
	
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	
	  dest.on('drain', ondrain);
	
	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    dest.end();
	  }
	
	
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }
	
	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }
	
	  source.on('error', onerror);
	  dest.on('error', onerror);
	
	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	
	    dest.removeListener('close', cleanup);
	  }
	
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	
	  dest.on('close', cleanup);
	
	  dest.emit('pipe', source);
	
	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(36);
	exports.Stream = __webpack_require__(30);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(40);
	exports.Duplex = __webpack_require__(33);
	exports.Transform = __webpack_require__(41);
	exports.PassThrough = __webpack_require__(42);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/
	
	
	/*<replacement>*/
	var util = __webpack_require__(34);
	util.inherits = __webpack_require__(35);
	/*</replacement>*/
	
	var Readable = __webpack_require__(36);
	var Writable = __webpack_require__(40);
	
	util.inherits(Duplex, Readable);
	
	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});
	
	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false)
	    this.readable = false;
	
	  if (options && options.writable === false)
	    this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).Buffer))

/***/ },
/* 35 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Readable;
	
	/*<replacement>*/
	var isArray = __webpack_require__(37);
	/*</replacement>*/
	
	
	/*<replacement>*/
	var Buffer = __webpack_require__(13).Buffer;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	var EE = __webpack_require__(28).EventEmitter;
	
	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	var Stream = __webpack_require__(30);
	
	/*<replacement>*/
	var util = __webpack_require__(34);
	util.inherits = __webpack_require__(35);
	/*</replacement>*/
	
	var StringDecoder;
	
	
	/*<replacement>*/
	var debug = __webpack_require__(38);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	
	util.inherits(Readable, Stream);
	
	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(33);
	
	  options = options || {};
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(39).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  var Duplex = __webpack_require__(33);
	
	  if (!(this instanceof Readable))
	    return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  Stream.call(this);
	}
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;
	
	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }
	
	  return readableAddChunk(this, state, chunk, encoding, false);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};
	
	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);
	
	      if (!addToFront)
	        state.reading = false;
	
	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);
	
	        if (state.needReadable)
	          emitReadable(stream);
	      }
	
	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }
	
	  return needMoreData(state);
	}
	
	
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(39).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}
	
	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;
	
	  if (state.objectMode)
	    return n === 0 ? 0 : 1;
	
	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }
	
	  if (n <= 0)
	    return 0;
	
	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);
	
	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }
	
	  return n;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }
	
	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }
	
	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);
	
	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;
	
	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }
	
	  state.length -= n;
	
	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;
	
	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);
	
	  if (!util.isNull(ret))
	    this.emit('data', ret);
	
	  return ret;
	};
	
	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	
	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};
	
	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;
	
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }
	
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];
	
	
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	
	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;
	
	    if (!dest)
	      dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }
	
	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;
	
	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }
	
	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}
	
	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}
	
	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }
	
	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;
	
	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;
	
	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);
	
	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);
	
	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);
	
	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();
	
	        c += cpy;
	      }
	    }
	  }
	
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var Buffer = __webpack_require__(13).Buffer;
	
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }
	
	
	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }
	
	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};
	
	
	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;
	
	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;
	
	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }
	
	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);
	
	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
	
	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;
	
	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }
	
	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);
	
	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }
	
	  charStr += buffer.toString(this.encoding, 0, end);
	
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }
	
	  // or just emit the charStr
	  return charStr;
	};
	
	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;
	
	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];
	
	    // See http://en.wikipedia.org/wiki/UTF-8#Description
	
	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }
	
	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }
	
	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};
	
	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);
	
	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }
	
	  return res;
	};
	
	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}
	
	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}
	
	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.
	
	module.exports = Writable;
	
	/*<replacement>*/
	var Buffer = __webpack_require__(13).Buffer;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	
	/*<replacement>*/
	var util = __webpack_require__(34);
	util.inherits = __webpack_require__(35);
	/*</replacement>*/
	
	var Stream = __webpack_require__(30);
	
	util.inherits(Writable, Stream);
	
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}
	
	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(33);
	
	  options = options || {};
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.buffer = [];
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}
	
	function Writable(options) {
	  var Duplex = __webpack_require__(33);
	
	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};
	
	
	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}
	
	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	
	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;
	
	  if (!util.isFunction(cb))
	    cb = function() {};
	
	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function() {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function() {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;
	
	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }
	
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);
	
	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	
	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);
	
	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });
	
	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }
	
	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }
	
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};
	
	
	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}
	
	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	
	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(33);
	
	/*<replacement>*/
	var util = __webpack_require__(34);
	util.inherits = __webpack_require__(35);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	
	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (!util.isNullOrUndefined(data))
	    stream.push(data);
	
	  if (cb)
	    cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	
	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(options, this);
	
	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}
	
	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};
	
	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;
	
	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	
	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');
	
	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');
	
	  return stream.push(null);
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(41);
	
	/*<replacement>*/
	var util = __webpack_require__(34);
	util.inherits = __webpack_require__(35);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40)


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33)


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41)


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(30);
	var util = __webpack_require__(48);
	
	var Response = module.exports = function (res) {
	    this.offset = 0;
	    this.readable = true;
	};
	
	util.inherits(Response, Stream);
	
	var capable = {
	    streaming : true,
	    status2 : true
	};
	
	function parseHeaders (res) {
	    var lines = res.getAllResponseHeaders().split(/\r?\n/);
	    var headers = {};
	    for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        if (line === '') continue;
	        
	        var m = line.match(/^([^:]+):\s*(.*)/);
	        if (m) {
	            var key = m[1].toLowerCase(), value = m[2];
	            
	            if (headers[key] !== undefined) {
	            
	                if (isArray(headers[key])) {
	                    headers[key].push(value);
	                }
	                else {
	                    headers[key] = [ headers[key], value ];
	                }
	            }
	            else {
	                headers[key] = value;
	            }
	        }
	        else {
	            headers[line] = true;
	        }
	    }
	    return headers;
	}
	
	Response.prototype.getResponse = function (xhr) {
	    var respType = String(xhr.responseType).toLowerCase();
	    if (respType === 'blob') return xhr.responseBlob || xhr.response;
	    if (respType === 'arraybuffer') return xhr.response;
	    return xhr.responseText;
	}
	
	Response.prototype.getHeader = function (key) {
	    return this.headers[key.toLowerCase()];
	};
	
	Response.prototype.handle = function (res) {
	    if (res.readyState === 2 && capable.status2) {
	        try {
	            this.statusCode = res.status;
	            this.headers = parseHeaders(res);
	        }
	        catch (err) {
	            capable.status2 = false;
	        }
	        
	        if (capable.status2) {
	            this.emit('ready');
	        }
	    }
	    else if (capable.streaming && res.readyState === 3) {
	        try {
	            if (!this.statusCode) {
	                this.statusCode = res.status;
	                this.headers = parseHeaders(res);
	                this.emit('ready');
	            }
	        }
	        catch (err) {}
	        
	        try {
	            this._emitData(res);
	        }
	        catch (err) {
	            capable.streaming = false;
	        }
	    }
	    else if (res.readyState === 4) {
	        if (!this.statusCode) {
	            this.statusCode = res.status;
	            this.emit('ready');
	        }
	        this._emitData(res);
	        
	        if (res.error) {
	            this.emit('error', this.getResponse(res));
	        }
	        else this.emit('end');
	        
	        this.emit('close');
	    }
	};
	
	Response.prototype._emitData = function (res) {
	    var respBody = this.getResponse(res);
	    if (respBody.toString().match(/ArrayBuffer/)) {
	        this.emit('data', new Uint8Array(respBody, this.offset));
	        this.offset = respBody.byteLength;
	        return;
	    }
	    if (respBody.length > this.offset) {
	        this.emit('data', respBody.slice(this.offset));
	        this.offset = respBody.length;
	    }
	};
	
	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(49);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(50);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(17)))

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 50 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	;(function () {
	
	  var object = true ? exports : this; // #8: web workers
	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	  function InvalidCharacterError(message) {
	    this.message = message;
	  }
	  InvalidCharacterError.prototype = new Error;
	  InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (
	  object.btoa = function (input) {
	    for (
	      // initialize result and counter
	      var block, charCode, idx = 0, map = chars, output = '';
	      // if the next input index does not exist:
	      //   change the mapping table to "="
	      //   check if d has no fractional digits
	      input.charAt(idx | 0) || (map = '=', idx % 1);
	      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	    ) {
	      charCode = input.charCodeAt(idx += 3/4);
	      if (charCode > 0xFF) {
	        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
	      }
	      block = block << 8 | charCode;
	    }
	    return output;
	  });
	
	  // decoder
	  // [https://gist.github.com/1020396] by [https://github.com/atk]
	  object.atob || (
	  object.atob = function (input) {
	    input = input.replace(/=+$/, '');
	    if (input.length % 4 == 1) {
	      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	    }
	    for (
	      // initialize result and counters
	      var bc = 0, bs, buffer, idx = 0, output = '';
	      // get next character
	      buffer = input.charAt(idx++);
	      // character found in table? initialize bit storage and add its ascii value;
	      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	        // and if not first of each 4 characters,
	        // convert the first 8 bits to one ascii character
	        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	    ) {
	      // try to find character in table (0-63, not found => -1)
	      buffer = chars.indexOf(buffer);
	    }
	    return output;
	  });
	
	}());


/***/ },
/* 52 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var http = __webpack_require__(27);
	
	var https = module.exports;
	
	for (var key in http) {
	    if (http.hasOwnProperty(key)) https[key] = http[key];
	};
	
	https.request = function (params, cb) {
	    if (!params) params = {};
	    params.scheme = 'https';
	    return http.request.call(this, params, cb);
	}


/***/ },
/* 54 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(8);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div>");t.b("\n" + i);t.b("  <canvas class=\"js-cropper-canvas\"></canvas>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div>\n  <canvas class=\"js-cropper-canvas\"></canvas>\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _beffView = __webpack_require__(3);
	
	var _beffView2 = _interopRequireDefault(_beffView);
	
	var _templatesZoomSliderMustache = __webpack_require__(57);
	
	var _templatesZoomSliderMustache2 = _interopRequireDefault(_templatesZoomSliderMustache);
	
	exports['default'] = _beffView2['default'].extend({
	  mustache: _templatesZoomSliderMustache2['default'],
	
	  init: function init(_ref) {
	    var _this = this;
	
	    var cropWidth = _ref.cropWidth;
	    var cropHeight = _ref.cropHeight;
	
	    this._cropWidth = cropWidth;
	    this._cropHeight = cropHeight;
	
	    this._super();
	
	    this.on('image-loaded', function (imageDimensions) {
	      return _this._calculateScaleAttrs(imageDimensions);
	    });
	  },
	
	  rendered: function rendered() {
	    var _this2 = this;
	
	    this._$slider = this.$view.find('.js-scale-slider');
	    this._$slider.on('input', function () {
	      return _this2.trigger('scale', _this2._currentScale());
	    });
	  },
	
	  reset: function reset() {
	    this._$slider.val(100).trigger('change');
	  },
	
	  disable: function disable() {
	    this.$view.addClass('disabled');
	    this._$slider.prop('disabled', true);
	  },
	
	  enable: function enable() {
	    this.$view.removeClass('disabled');
	    this._$slider.prop('disabled', false);
	  },
	
	  _calculateScaleAttrs: function _calculateScaleAttrs(imageDimensions) {
	    var widthScaleMin = this._cropWidth / imageDimensions.width;
	    var heightScaleMin = this._cropHeight / imageDimensions.height;
	
	    this._scaleMin = Math.min(widthScaleMin, heightScaleMin);
	    this._scaleStep = (1.0 - this._scaleMin) / 100;
	  },
	
	  _currentScale: function _currentScale() {
	    if (!this._scaleMin || !this._scaleStep) {
	      return;
	    }
	
	    var value = this._$slider.val();
	
	    if (value === 100) {
	      return 1.0;
	    }
	
	    return this._scaleMin + value * this._scaleStep;
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(8);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"slider-container\">");t.b("\n" + i);t.b("  <svg version=\"1.1\" id=\"scaleImageSmall_x5F_16_x5F_lt-ou\"");t.b("\n" + i);t.b("     xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"  width=\"16\" height=\"16\"");t.b("\n" + i);t.b("     viewBox=\"0 0 16 16\"");t.b("\n" + i);t.b("     style=\"enable-background:new 0 0 16 16;\" xml:space=\"preserve\" class=\"icon icon-image-resize-small\">");t.b("\n" + i);t.b("  <path class=\"st0\" d=\"M3,12h10v-0.7287c-0.303-0.1903-1.8182-1.7054-2.3126-1.6865c-0.375,0.0266-1.7292,1.2729-2.1907,1.2729");t.b("\n" + i);t.b("    c-0.4133,0-2.3334-2.2994-2.7927-2.2994C5.2446,8.5584,3,10.7291,3,11.0811V12z\"/>");t.b("\n" + i);t.b("  <circle class=\"st0\" cx=\"11.6425\" cy=\"5.8247\" r=\"1.1251\"/>");t.b("\n" + i);t.b("  <path class=\"st0\" d=\"M1,2v12h14V2H1z M14,13H2V3h12V13z\"/>");t.b("\n" + i);t.b("  </svg>");t.b("\n");t.b("\n" + i);t.b("  <input class=\"js-scale-slider\" type=\"range\" min=0 max=100 value=100 />");t.b("\n");t.b("\n" + i);t.b("  <svg version=\"1.1\" id=\"scaleImageLarge_x5F_24_x5F_lt-ou\"");t.b("\n" + i);t.b("     xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"  width=\"24\" height=\"24\"");t.b("\n" + i);t.b("     viewBox=\"0 0 24 24\"");t.b("\n" + i);t.b("     style=\"enable-background:new 0 0 24 24;\" xml:space=\"preserve\" class=\"icon icon-image-resize-large\">");t.b("\n" + i);t.b("  <path class=\"st0\" d=\"M3,19l18-0.0509v-1.8566c-0.5625-0.4153-2.8125-3.7224-3.7303-3.6811");t.b("\n" + i);t.b("    c-0.6961,0.0581-3.2098,2.7783-4.0665,2.7783c-0.7671,0-4.3314-5.0188-5.184-5.0188C7.1666,11.1709,3,15.909,3,16.6772V19z\"/>");t.b("\n" + i);t.b("  <circle class=\"st0\" cx=\"16.0085\" cy=\"8.0088\" r=\"1.75\"/>");t.b("\n" + i);t.b("  <path class=\"st0\" d=\"M1,3v18h22V3H1z M22,20H2V4h20V20z\"/>");t.b("\n" + i);t.b("  </svg>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"slider-container\">\n  <svg version=\"1.1\" id=\"scaleImageSmall_x5F_16_x5F_lt-ou\"\n     xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"  width=\"16\" height=\"16\"\n     viewBox=\"0 0 16 16\"\n     style=\"enable-background:new 0 0 16 16;\" xml:space=\"preserve\" class=\"icon icon-image-resize-small\">\n  <path class=\"st0\" d=\"M3,12h10v-0.7287c-0.303-0.1903-1.8182-1.7054-2.3126-1.6865c-0.375,0.0266-1.7292,1.2729-2.1907,1.2729\n    c-0.4133,0-2.3334-2.2994-2.7927-2.2994C5.2446,8.5584,3,10.7291,3,11.0811V12z\"/>\n  <circle class=\"st0\" cx=\"11.6425\" cy=\"5.8247\" r=\"1.1251\"/>\n  <path class=\"st0\" d=\"M1,2v12h14V2H1z M14,13H2V3h12V13z\"/>\n  </svg>\n\n  <input class=\"js-scale-slider\" type=\"range\" min=0 max=100 value=100 />\n\n  <svg version=\"1.1\" id=\"scaleImageLarge_x5F_24_x5F_lt-ou\"\n     xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"  width=\"24\" height=\"24\"\n     viewBox=\"0 0 24 24\"\n     style=\"enable-background:new 0 0 24 24;\" xml:space=\"preserve\" class=\"icon icon-image-resize-large\">\n  <path class=\"st0\" d=\"M3,19l18-0.0509v-1.8566c-0.5625-0.4153-2.8125-3.7224-3.7303-3.6811\n    c-0.6961,0.0581-3.2098,2.7783-4.0665,2.7783c-0.7671,0-4.3314-5.0188-5.184-5.0188C7.1666,11.1709,3,15.909,3,16.6772V19z\"/>\n  <circle class=\"st0\" cx=\"16.0085\" cy=\"8.0088\" r=\"1.75\"/>\n  <path class=\"st0\" d=\"M1,3v18h22V3H1z M22,20H2V4h20V20z\"/>\n  </svg>\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _nbdUtilExtend = __webpack_require__(1);
	
	var _nbdUtilExtend2 = _interopRequireDefault(_nbdUtilExtend);
	
	var _beffView = __webpack_require__(3);
	
	var _beffView2 = _interopRequireDefault(_beffView);
	
	var _templatesRatioLockMustache = __webpack_require__(59);
	
	var _templatesRatioLockMustache2 = _interopRequireDefault(_templatesRatioLockMustache);
	
	exports['default'] = _beffView2['default'].extend({
	  mustache: _templatesRatioLockMustache2['default'],
	
	  events: {
	    change: {
	      '.js-ratio-lock': '_toggleRatioLock'
	    }
	  },
	
	  rendered: function rendered() {
	    this._$ratioCheckbox = this.$view.find('.js-ratio-lock');
	  },
	
	  templateData: function templateData() {
	    return (0, _nbdUtilExtend2['default'])({
	      checked: true,
	      labelText: 'Enable aspect ratio for cover image resize'
	    });
	  },
	
	  disable: function disable() {
	    this.$view.addClass('disabled');
	    this._$ratioCheckbox.prop('disabled', true);
	  },
	
	  enable: function enable() {
	    this.$view.removeClass('disabled');
	    this._$ratioCheckbox.prop('disabled', false);
	  },
	
	  _toggleRatioLock: function _toggleRatioLock() {
	    this.trigger('ratio-locked', this._$ratioCheckbox.prop('checked'));
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(8);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"ratio-contols\">");t.b("\n" + i);t.b("  <input type=\"checkbox\" class=\"js-ratio-lock\"");if(t.s(t.f("checked",c,p,1),c,p,0,86,94,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" checked");});c.pop();}t.b(">");t.b("\n" + i);t.b("  <span class=>");t.b(t.v(t.f("labelText",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"ratio-contols\">\n  <input type=\"checkbox\" class=\"js-ratio-lock\"{{#checked}} checked{{/checked}}>\n  <span class=>{{labelText}}</span>\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _beffView = __webpack_require__(3);
	
	var _beffView2 = _interopRequireDefault(_beffView);
	
	var _templatesSuggesstionAreaMustache = __webpack_require__(61);
	
	var _templatesSuggesstionAreaMustache2 = _interopRequireDefault(_templatesSuggesstionAreaMustache);
	
	exports['default'] = _beffView2['default'].extend({
	  _maxSuggestions: 7,
	
	  mustache: _templatesSuggesstionAreaMustache2['default'],
	
	  init: function init(model) {
	    this._super(this._padOrTruncateSuggestions(model));
	
	    this._$activeElement = null;
	  },
	
	  events: {
	    click: {
	      '.js-upload-btn': ':upload-image',
	      '.js-suggestion-item': '_setImage'
	    }
	  },
	
	  reset: function reset() {
	    if (!this._$activeElement) {
	      return;
	    }
	
	    this._$activeElement.removeClass('active');
	    this._$activeElement = null;
	  },
	
	  _padOrTruncateSuggestions: function _padOrTruncateSuggestions(model) {
	    model.suggestions = model.suggestions || [];
	
	    if (model.suggestions.length < this._maxSuggestions) {
	      while (model.suggestions.length < this._maxSuggestions) {
	        model.suggestions.push({ src: '', empty: true });
	      }
	    } else {
	      model.suggestions = model.suggestions.slice(0, 7);
	    }
	
	    return model;
	  },
	
	  _setImage: function _setImage(_ref) {
	    var target = _ref.currentTarget;
	
	    if (!target.dataset.src) {
	      return;
	    }
	
	    if (this._$activeElement) {
	      this.reset();
	    }
	
	    this._$activeElement = $(target);
	    this._$activeElement.addClass('active');
	
	    this.trigger('set-image', target.dataset.src);
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(8);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"suggestion-list\">");t.b("\n" + i);t.b("  <ul>");t.b("\n" + i);if(t.s(t.f("suggestions",c,p,1),c,p,0,57,324,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <li class=\"js-suggestion-item suggestion-item");if(t.s(t.f("active",c,p,1),c,p,0,118,125,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" active");});c.pop();}if(t.s(t.f("empty",c,p,1),c,p,0,146,152,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(" empty");});c.pop();}t.b("\" data-src=\"");t.b(t.v(t.f("src",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <div class=\"suggestion-item-img\">");t.b("\n" + i);t.b("          <img src=\"");t.b(t.v(t.f("src",c,p,0)));t.b("\" style=\"height:100%;overflow:hidden\"/>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </li>");t.b("\n" + i);});c.pop();}t.b("    <li class=\"upload-btn suggestion-item js-upload-btn\">");t.b("\n" + i);t.b("      <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"");t.b("\n" + i);t.b("        viewBox=\"0 0 48 48\" enable-background=\"new 0 0 48 48\" xml:space=\"preserve\" class=\"icon icon-upload\">");t.b("\n" + i);t.b("        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M41,21.9c0.1-0.6,0.2-1.2,0.2-1.9c0-6.6-5.4-12-12-12");t.b("\n" + i);t.b("        c-5.6,0-10.3,3.9-11.6,9c-0.9-0.3-1.9-0.5-3-0.5c-5.2,0-9.4,4.2-9.4,9.4c0,0.9,0.1,1.8,0.4,2.6c-0.1,0-0.2,0-0.4,0");t.b("\n" + i);t.b("        c-2.8,0-5.1,2.3-5.1,5.1S2.3,39,5.1,39c0.6,0,1.7,0,1.7,0H24V25l-6.6,7l-2.8-2.5L26,18l11.4,11.5L34.5,32L28,25v14h11.5l1.7-0.3");t.b("\n" + i);t.b("        c3.9-0.8,6.8-4.3,6.8-8.4C48,26.1,45,22.6,41,21.9z\"/>");t.b("\n" + i);t.b("      </svg>");t.b("\n" + i);t.b("    </li>");t.b("\n" + i);t.b("  </ul>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"suggestion-list\">\n  <ul>\n    {{#suggestions}}\n    <li class=\"js-suggestion-item suggestion-item{{#active}} active{{/active}}{{#empty}} empty{{/empty}}\" data-src=\"{{src}}\">\n        <div class=\"suggestion-item-img\">\n          <img src=\"{{src}}\" style=\"height:100%;overflow:hidden\"/>\n        </div>\n      </li>\n    {{/suggestions}}\n    <li class=\"upload-btn suggestion-item js-upload-btn\">\n      <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n        viewBox=\"0 0 48 48\" enable-background=\"new 0 0 48 48\" xml:space=\"preserve\" class=\"icon icon-upload\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M41,21.9c0.1-0.6,0.2-1.2,0.2-1.9c0-6.6-5.4-12-12-12\n        c-5.6,0-10.3,3.9-11.6,9c-0.9-0.3-1.9-0.5-3-0.5c-5.2,0-9.4,4.2-9.4,9.4c0,0.9,0.1,1.8,0.4,2.6c-0.1,0-0.2,0-0.4,0\n        c-2.8,0-5.1,2.3-5.1,5.1S2.3,39,5.1,39c0.6,0,1.7,0,1.7,0H24V25l-6.6,7l-2.8-2.5L26,18l11.4,11.5L34.5,32L28,25v14h11.5l1.7-0.3\n        c3.9-0.8,6.8-4.3,6.8-8.4C48,26.1,45,22.6,41,21.9z\"/>\n      </svg>\n    </li>\n  </ul>\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(8);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"js-croploader image-upload-content\">");t.b("\n" + i);t.b("  <div class=\"js-upload-container image-upload-container\"></div>");t.b("\n" + i);t.b("  <div class=\"js-crop-container image-crop-area\"></div>");t.b("\n");t.b("\n" + i);t.b("  <div class=\"js-crop-controls image-crop-controls\"></div>");t.b("\n" + i);t.b("  <div class=\"js-suggestions\"></div>");t.b("\n" + i);t.b("</div>");t.b("\n");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"js-croploader image-upload-content\">\n  <div class=\"js-upload-container image-upload-container\"></div>\n  <div class=\"js-crop-container image-crop-area\"></div>\n\n  <div class=\"js-crop-controls image-crop-controls\"></div>\n  <div class=\"js-suggestions\"></div>\n</div>\n\n", H);return T.render.apply(T, arguments); };

/***/ }
/******/ ])
});
;