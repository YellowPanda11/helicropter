import CroppingArea from 'CroppingArea';

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
    this.croppingArea._scaleView({ scale });

    this.waitAFrame().then(() => {
      expect(this.croppingArea.$canvasContainer.width()).toEqual(width * scale);
      expect(this.croppingArea.$canvasContainer.height()).toEqual(height * scale);
      done();
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
    it('returns undefined if no image is defined', function() {
      expect(this.croppingArea.getCropData()).not.toBeDefined();
    });

    it('does not allow x/y coordinates less than 0', function() {
      spyOn(this.croppingArea, '_getImageProp').and.returnValue(1);
      spyOn(this.croppingArea, '_getCropAreaProp').and.returnValue(0);

      this.croppingArea._cropArea = {
        getWidth: () => 100,
        getHeight: () => 50,
      };

      this.croppingArea._image = { getScaleX: () => 1.0 };

      expect(this.croppingArea.getCropData()).toEqual({
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        scale: 1.0,
      });
    });

    it('does not allow height/width less than 1', function() {
      spyOn(this.croppingArea, '_getImageProp').and.returnValue(1);
      spyOn(this.croppingArea, '_getCropAreaProp').and.returnValue(0);

      this.croppingArea._cropArea = {
        getWidth: () => 0,
        getHeight: () => 0,
      };

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
      spyOn(this.croppingArea, '_getImageProp').and.callFake((prop) => {
        return {
          left: -5,
          top: -10,
          width: 300,
          height: 300,
        }[prop];
      });
      spyOn(this.croppingArea, '_getCropAreaProp').and.returnValue(0);

      this.croppingArea._image = { getScaleX: () => 0.5 };
    });

    it('returns undefined if no image is defined', function() {
      this.croppingArea._image = null;
      expect(this.croppingArea.getDimensions()).not.toBeDefined();
    });

    it('returns scaled coordinates', function() {
      this.croppingArea._cropArea = {
        getWidth: () => 100,
        getHeight: () => 50,
      };

      expect(this.croppingArea.getDimensions()).toEqual({
        x: 10,
        y: 20,
        width: 200,
        height: 100,
      });
    });

    it('clamps coordinates to native width if scaled width is greater than native width', function() {
      this.croppingArea._cropArea = {
        getWidth: () => 400,
        getHeight: () => 100,
      };

      expect(this.croppingArea.getDimensions()).toEqual({
        x: 3,
        y: 7,
        width: 300,
        height: 75,
      });
    });

    it('clamps coordinates to native height if scaled height is greater than native height', function() {
      this.croppingArea._cropArea = {
        getWidth: () => 100,
        getHeight: () => 400,
      };

      expect(this.croppingArea.getDimensions()).toEqual({
        x: 3,
        y: 7,
        width: 75,
        height: 300,
      });
    });
  });
});
