import { useState, useCallback, useEffect } from 'react';
import { fabric } from 'fabric';
import { BrushSettings, BrushSize, BrushShape } from '../types';
import { BRUSH_SIZES, DEFAULT_BRUSH_COLOR } from '../constants/brush';
import { createBrush, configureBrush } from '../utils/brush';

export function useBrush(canvas: fabric.Canvas | null) {
  const [settings, setSettings] = useState<BrushSettings>({
    size: 'medium',
    shape: 'circle',
    color: DEFAULT_BRUSH_COLOR,
  });
  const [isEraser, setIsEraser] = useState(false);

  const updateBrush = useCallback(() => {
    if (!canvas) return;
    
    const brush = createBrush(canvas, settings.shape);
    canvas.freeDrawingBrush = brush;
    
    configureBrush(
      brush,
      settings.size,
      settings.color,
      isEraser
    );
  }, [canvas, settings, isEraser]);

  useEffect(() => {
    updateBrush();
  }, [updateBrush]);

  const setBrushSize = useCallback((size: BrushSize) => {
    setSettings(prev => ({ ...prev, size }));
  }, []);

  const setBrushShape = useCallback((shape: BrushShape) => {
    setSettings(prev => ({ ...prev, shape }));
  }, []);

  const setBrushColor = useCallback((color: string) => {
    setSettings(prev => ({ ...prev, color }));
  }, []);

  const toggleEraser = useCallback(() => {
    setIsEraser(prev => !prev);
  }, []);

  return {
    settings,
    isEraser,
    setBrushSize,
    setBrushShape,
    setBrushColor,
    toggleEraser,
  };
}