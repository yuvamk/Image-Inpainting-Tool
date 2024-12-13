import { BrushSize, BrushShape } from '../types';

export const BRUSH_SIZES: Record<BrushSize, number> = {
  small: 10,
  medium: 20,
  large: 30,
};

export const BRUSH_SHAPES: BrushShape[] = ['circle', 'square'];

export const DEFAULT_BRUSH_COLOR = '#ffffff';
export const DEFAULT_ERASER_COLOR = '#000000';