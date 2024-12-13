import { fabric } from 'fabric';
import { BrushShape, BrushSize } from '../types';
import { BRUSH_SIZES } from '../constants/brush';

class SquareBrush extends fabric.BaseBrush {
  private lastPoint: { x: number; y: number } | null = null;

  constructor(canvas: fabric.Canvas) {
    super(canvas);
  }

  onMouseDown(pointer: fabric.Point) {
    this.lastPoint = pointer;
  }

  onMouseMove(pointer: fabric.Point) {
    if (this.lastPoint) {
      const ctx = this.canvas.contextTop;
      const size = this.width;
      
      ctx.fillStyle = this.color;
      ctx.globalCompositeOperation = (this as any).globalCompositeOperation || 'source-over';
      
      // Draw a square at the current position
      ctx.fillRect(
        pointer.x - size / 2,
        pointer.y - size / 2,
        size,
        size
      );
      
      this.lastPoint = pointer;
    }
  }

  onMouseUp() {
    const path = new fabric.Path(this._getSVGPath(), {
      fill: this.color,
      stroke: this.color,
      strokeWidth: this.width,
      strokeLineCap: 'square',
      strokeLineJoin: 'miter',
      globalCompositeOperation: (this as any).globalCompositeOperation,
    });

    this.canvas.add(path);
    this.canvas.clearContext(this.canvas.contextTop);
    this.lastPoint = null;
    this.canvas.renderAll();
  }

  private _getSVGPath(): string {
    const path = this.canvas.contextTop.getImageData(
      0,
      0,
      this.canvas.width!,
      this.canvas.height!
    );
    return `M 0 0 L ${this.canvas.width} 0 L ${this.canvas.width} ${this.canvas.height} L 0 ${this.canvas.height} Z`;
  }
}

export const createBrush = (canvas: fabric.Canvas, shape: BrushShape) => {
  if (shape === 'square') {
    return new SquareBrush(canvas);
  }
  return new fabric.PencilBrush(canvas);
};

export const configureBrush = (
  brush: fabric.BaseBrush,
  size: BrushSize,
  color: string,
  isEraser: boolean = false
) => {
  brush.width = BRUSH_SIZES[size];
  
  if (isEraser) {
    // For eraser mode
    (brush as any).globalCompositeOperation = 'destination-out';
    brush.color = '#000000';
    (brush as any).erasable = true;
  } else {
    // For normal drawing mode
    (brush as any).globalCompositeOperation = 'source-over';
    brush.color = color;
    (brush as any).erasable = false;
  }
};