import CroppingArea from 'CroppingArea';
import images from '../fixtures/images';

function createCroppingArea($el, data = {}) {
  const croppingArea = new CroppingArea(data);
  croppingArea.render($el);
  return croppingArea;
}

describe('CroppingArea', function() {
  beforeEach(function() {
    this.$el = affix('.js-cropping-area-parent');
    this.croppingArea = createCroppingArea(this.$el);

    this.waitAFrame = function() {
      return new Promise(resolve => requestAnimationFrame(() => resolve()));
    };

    this.loadImage = (model) => {
      return new Promise(resolve => {
        this.croppingArea = createCroppingArea(this.$el, {
          viewportRatio: 'static',
          cropWidth: 500,
          cropHeight: 500,
          image: images.flower,
          ...model,
        });

        this.croppingArea.on('image-loaded', resolve);
      });
    };
  });

  afterEach(function() {
    this.croppingArea.destroy();
  });

  it('renders', function() {
    expect(this.$el.find('.js-cropper-canvas')).toExist();
  });

  it('triggers an error event when the image fails to load', function(done) {
    const croppingArea = new CroppingArea({});
    spyOn(croppingArea, '_loadImage').and.returnValue(Promise.reject());
    croppingArea.on('upload-error', function() {
      croppingArea.destroy();
      done();
    });
    croppingArea.render(this.$el);
    croppingArea.trigger('set-image', { url: '', src: '' });
  });

  it('shows the default blurry warning test if it is not set', function() {
    this.croppingArea = createCroppingArea(this.$el, {
      viewportRatio: 'static',
      displayedWidth: 100,
    });

    expect(this.croppingArea._warningBox.item(1).text).toEqual('This zoom level will blur your cover image');
  });

  it('overrides the default blurry warning test if it is set', function() {
    const blurryImageWarningText = 'image will get blurry';

    this.croppingArea = createCroppingArea(this.$el, {
      viewportRatio: 'static',
      displayedWidth: 100,
      blurryImageWarningText,
    });

    expect(this.croppingArea._warningBox.item(1).text).toEqual(blurryImageWarningText);
  });

  it('scales view to the value', function(done) {
    const width = this.croppingArea.$canvasContainer.width();
    const height = this.croppingArea.$canvasContainer.height();
    const scale = .5;
    this.croppingArea._scaleView({ $el: this.croppingArea.$canvasContainer, scale });

    this.waitAFrame().then(() => {
      expect(this.croppingArea.$canvasContainer.width()).toEqual(width * scale);
      expect(this.croppingArea.$canvasContainer.height()).toEqual(height * scale);
      done();
    });
  });

  describe('allowLetterboxing', function() {
    it('locks vertical pan when it is true and there is no room to pan vertically', function(done) {
      this.loadImage({ allowLetterboxing: true }).then(() => {
        spyOn(this.croppingArea._cropArea, 'get').and.callFake((arg) => {
          return {
            top: 100,
          }[arg];
        });

        this.croppingArea.trigger('scale', .5);

        expect(this.croppingArea._image.lockMovementY).toEqual(true);

        done();
      });
    });

    it('unlocks vertical pan when it is true and there is room to pan vertically', function(done) {
      this.loadImage({ allowLetterboxing: true }).then(() => {
        spyOn(this.croppingArea._cropArea, 'get').and.callFake((arg) => {
          return {
            top: -100,
          }[arg];
        });

        this.croppingArea.trigger('scale', .5);

        expect(this.croppingArea._image.lockMovementY).toEqual(false);

        done();
      });
    });

    it('locks horizontal pan when it is true and there is no room to pan horizontally', function(done) {
      this.loadImage({ allowLetterboxing: true }).then(() => {
        spyOn(this.croppingArea._cropArea, 'get').and.callFake((arg) => {
          return {
            left: 500,
          }[arg];
        });

        this.croppingArea.trigger('scale', .5);

        expect(this.croppingArea._image.lockMovementX).toEqual(true);

        done();
      });
    });

    it('unlocks horizontal pan when it is true and there is room to pan horizontally', function(done) {
      this.loadImage({ allowLetterboxing: true }).then(() => {
        spyOn(this.croppingArea._cropArea, 'get').and.callFake((arg) => {
          return {
            left: -500,
          }[arg];
        });

        this.croppingArea.trigger('scale', .5);

        expect(this.croppingArea._image.lockMovementX).toEqual(false);

        done();
      });
    });
  });

  describe('backgroundType', function() {
    beforeEach(function() {
      this.createCroppingAreaWithBackground = (backgroundType, data = {}) => {
        return new Promise(resolve => {
          this.croppingArea = createCroppingArea(this.$el, {
            backgroundType,
            ...data,
          });

          spyOn(this.croppingArea, '_createSolidBackground').and.callThrough();
          spyOn(this.croppingArea, '_createTransparencyBackground').and.callThrough();

          this.croppingArea.trigger('set-image', images.flower, {});

          this.croppingArea.on('background-loaded', resolve);
        });
      };
    });

    it('generates image background when it is "image"', function(done) {
      this.createCroppingAreaWithBackground('image').then(() => {
        expect(this.croppingArea._backgroundCanvas).toExist();
        expect(this.croppingArea._backgroundCanvas.contextContainer.filter).toEqual('blur(70px) brightness(.8)');
        done();
      });
    });

    it('generates solid color background when it is "solid"', function(done) {
      const backgroundHex = '#000000';

      this.createCroppingAreaWithBackground('solid', {
        backgroundHex,
        canvasWidth: 100,
        canvasHeight: 100,
      }).then(() => {
        expect(this.croppingArea._createSolidBackground).toHaveBeenCalled();
        done();
      });
    });

    it('generates transparency background when it is not set', function(done) {
      this.createCroppingAreaWithBackground(null).then(() => {
        expect(this.croppingArea._createTransparencyBackground).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('#disable', function() {
    beforeEach(function() {
      this.croppingArea.disable();
    });

    it('makes canvas unselectable', function() {
      expect(this.croppingArea._canvas.selection).toBe(false);
    });

    it('makes objects inside canvas el unselectable', function() {
      this.croppingArea._canvas.forEachObject(function(object) {
        expect(object.selectable).toBe(false);
      });
    });

    it('sets canvas hover cursor to default', function() {
      expect(this.croppingArea._canvas.hoverCursor).toEqual('default');
    });
  });

  describe('#enable', function() {
    beforeEach(function() {
      this.croppingArea.enable();
    });

    it('makes canvas selectable', function() {
      expect(this.croppingArea._canvas.selection).toBe(true);
    });

    it('makes objects inside canvas el selectable', function() {
      this.croppingArea._canvas.forEachObject(function(object) {
        expect(object.selectable).toBe(true);
      });
    });

    it('sets canvas hover cursor to move', function() {
      expect(this.croppingArea._canvas.hoverCursor).toEqual('move');
    });
  });

  describe('#getCropData', function() {
    beforeEach(function() {
      this.cropWidth = 50;
      this.cropHeight = 30;

      this.croppingArea = createCroppingArea(this.$el, {
        viewportRatio: 'static',
        cropWidth: this.cropWidth,
        cropHeight: this.cropHeight,
      });
    });

    it('returns undefined if no image is defined', function() {
      expect(this.croppingArea.getCropData()).not.toBeDefined();
    });

    it('returns the original value of width and height', function() {
      spyOn(this.croppingArea, '_getImageProp').and.returnValue(1);
      spyOn(this.croppingArea, '_getCropAreaProp').and.returnValue(0);

      this.croppingArea._image = { getScaleX: () => 1.0 };

      const data = this.croppingArea.getCropData();

      expect(this.croppingArea._cropArea.getStrokeWidth()).toBeGreaterThan(0);
      expect(data.width).toEqual(this.cropWidth);
      expect(data.height).toEqual(this.cropHeight);
    });

    it('does not allow x/y coordinates less than 0', function() {
      spyOn(this.croppingArea, '_getImageProp').and.returnValue(1);
      spyOn(this.croppingArea, '_getCropAreaProp').and.returnValue(0);

      this.croppingArea._cropArea.width = 100;
      this.croppingArea._cropArea.height = 50;

      this.croppingArea._image = { getScaleX: () => 1.0 };

      expect(this.croppingArea.getCropData()).toEqual({
        x: 0,
        y: 0,
        width: this.croppingArea._cropArea.width,
        height: this.croppingArea._cropArea.height,
        scale: 1.0,
      });
    });

    it('does not allow height/width less than 1', function() {
      spyOn(this.croppingArea, '_getImageProp').and.returnValue(1);
      spyOn(this.croppingArea, '_getCropAreaProp').and.returnValue(0);

      this.croppingArea._cropArea.width = 0;
      this.croppingArea._cropArea.height = 0;

      this.croppingArea._image = { getScaleX: () => 1.0 };

      expect(this.croppingArea.getCropData()).toEqual({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        scale: 1.0,
      });
    });
  });

  describe('#getDimensions', function() {
    beforeEach(function() {
      this.croppingArea = createCroppingArea(this.$el, {
        viewportRatio: 'static',
      });

      spyOn(this.croppingArea, '_getImageProp').and.callFake((prop) => {
        return {
          left: -5,
          top: -10,
          width: 300,
          height: 300,
        }[prop];
      });
      spyOn(this.croppingArea, '_getCropAreaProp').and.returnValue(0);

      this.cropWidth = 900;
      this.cropHeight = 1000;

      this.expectDimensionsToNotReduceForImage = ({ width, height }) => {
        return new Promise(resolve => {
          this.croppingArea = createCroppingArea(this.$el, {
            viewportRatio: 'static',
            cropWidth: this.cropWidth,
            cropHeight: this.cropHeight,
            allowLetterboxing: true,
            image: images.flower,
          });

          spyOn(this.croppingArea, '_getImageProp').and.callFake((prop) => {
            return {
              left: 0,
              top: 0,
              width,
              height,
            }[prop];
          });

          this.croppingArea.on('image-loaded', () => {
            const crop = this.croppingArea.getCropData();
            const expected = {
              x: Math.floor(crop.x / crop.scale),
              y: Math.floor(crop.y / crop.scale),
              width: Math.floor(crop.width / crop.scale),
              height: Math.floor(crop.height / crop.scale),
            };

            const dimensions = this.croppingArea.getDimensions();

            expect(dimensions).toEqual(expected);

            resolve();
          });
        });
      };

      this.croppingArea._image = { getScaleX: () => 0.5 };
    });

    it('returns non-reduces values for wide images when allowLetterboxing is true', function(done) {
      this.expectDimensionsToNotReduceForImage({
        width: this.cropWidth * 5,
        height: this.cropHeight / 5,
      }).then(done);
    });

    it('returns non-reduces values for tall images when allowLetterboxing is true', function(done) {
      this.expectDimensionsToNotReduceForImage({
        width: this.cropWidth / 5,
        height: this.cropHeight * 5,
      }).then(done);
    });

    it('returns undefined if no image is defined', function() {
      this.croppingArea._image = null;
      expect(this.croppingArea.getDimensions()).not.toBeDefined();
    });

    it('returns scaled coordinates', function() {
      this.croppingArea._cropArea.width = 100;
      this.croppingArea._cropArea.height = 50;

      expect(this.croppingArea.getDimensions()).toEqual({
        x: 10,
        y: 20,
        width: 200,
        height: 100,
      });
    });

    it('clamps coordinates to native width if scaled width is greater than native width', function() {
      this.croppingArea._cropArea.width = 400;
      this.croppingArea._cropArea.height = 100;

      expect(this.croppingArea.getDimensions()).toEqual({
        x: 3,
        y: 7,
        width: 300,
        height: 75,
      });
    });

    it('clamps coordinates to native height if scaled height is greater than native height', function() {
      this.croppingArea._cropArea.width = 100;
      this.croppingArea._cropArea.height = 400;

      expect(this.croppingArea.getDimensions()).toEqual({
        x: 3,
        y: 7,
        width: 75,
        height: 300,
      });
    });
  });
});
