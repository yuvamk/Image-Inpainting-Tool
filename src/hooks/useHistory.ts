import { useState, useCallback, useEffect } from 'react';
import { fabric } from 'fabric';
import { CanvasHistory } from '../types';
import { serializeCanvas, deserializeCanvas } from '../utils/history';

const MAX_HISTORY_LENGTH = 50;

export function useHistory(canvas: fabric.Canvas | null) {
  const [history, setHistory] = useState<CanvasHistory>({
    past: [],
    present: null,
    future: [],
  });

  useEffect(() => {
    if (!canvas) return;

    const handleObjectModified = () => {
      const json = serializeCanvas(canvas);
      setHistory(prev => ({
        past: [...prev.past, prev.present].filter(Boolean).slice(-MAX_HISTORY_LENGTH),
        present: json,
        future: [],
      }));
    };

    // Listen to all relevant events for history tracking
    const events = [
      'path:created',
      'object:modified',
      'object:added',
      'object:removed',
      'erasing:end'
    ];

    events.forEach(event => {
      canvas.on(event, handleObjectModified);
    });

    return () => {
      events.forEach(event => {
        canvas.off(event, handleObjectModified);
      });
    };
  }, [canvas]);

  const handleUndo = useCallback(() => {
    if (!canvas || !history.past.length) return;

    const newPresent = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);

    deserializeCanvas(canvas, newPresent, () => {
      setHistory({
        past: newPast,
        present: newPresent,
        future: [history.present, ...history.future].filter(Boolean),
      });
    });
  }, [canvas, history]);

  const handleRedo = useCallback(() => {
    if (!canvas || !history.future.length) return;

    const newPresent = history.future[0];
    const newFuture = history.future.slice(1);

    deserializeCanvas(canvas, newPresent, () => {
      setHistory({
        past: [...history.past, history.present].filter(Boolean),
        present: newPresent,
        future: newFuture,
      });
    });
  }, [canvas, history]);

  return {
    handleUndo,
    handleRedo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}