export type BrushSize = 'small' | 'medium' | 'large';
export type BrushShape = 'circle' | 'square';

export interface BrushSettings {
  size: BrushSize;
  shape: BrushShape;
  color: string;
}

export interface CanvasHistory {
  past: string[];
  present: string | null;
  future: string[];
}