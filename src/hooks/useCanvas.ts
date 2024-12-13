import { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';
import { initializeCanvas, loadImageToCanvas } from '../utils/canvas';

export function useCanvas(imageUrl: string | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const container = containerRef.current;
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        preserveObjectStacking: true,
      });
      
      // Enable object erasing
      fabricCanvas.set('erasable', true);
      
      initializeCanvas(fabricCanvas);
      setCanvas(fabricCanvas);

      const handleResize = () => {
        if (imageUrl) {
          loadImageToCanvas(
            fabricCanvas,
            imageUrl,
            container.clientWidth,
            container.clientHeight
          );
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        fabricCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvas && containerRef.current && imageUrl) {
      const container = containerRef.current;
      loadImageToCanvas(
        canvas,
        imageUrl,
        container.clientWidth,
        container.clientHeight
      );
    }
  }, [canvas, imageUrl]);

  return { canvas, canvasRef, containerRef };
}