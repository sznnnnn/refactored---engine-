export default class WxCanvas {
  constructor(ctx, canvasId, isNew, canvasNode) {
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;
    this.isNew = isNew
    if (isNew) {
      this.canvasNode = canvasNode;
    }
  }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent() {
    // noop
  }

  detachEvent() {
    // noop
  }

  getContext(contextType) {
    if (contextType === '2d') {
      return this.ctx;
    }
  }

  createImage() {
    if (this.isNew) {
      const img = this.canvasNode.createImage();
      img.currentSrc = '';
      img.naturalWidth = 0;
      img.naturalHeight = 0;
      img.width = 0;
      img.height = 0;
      return img;
    } else {
      return {};
    }
  }
} 