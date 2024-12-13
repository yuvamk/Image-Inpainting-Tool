import { motion } from 'framer-motion';
import { useCanvas } from '../hooks/useCanvas';
import { useHistory } from '../hooks/useHistory';
import { useBrush } from '../hooks/useBrush';
import { ToolBar } from './ToolBar';
import { BrushControls } from './BrushControls';
import { useEffect } from 'react';
import { fabric } from 'fabric';

interface CanvasProps {
  imageUrl: string | null;
  onMaskGenerated: (maskUrl: string) => void;
  onDelete: () => void;
}

export function Canvas({ imageUrl, onMaskGenerated, onDelete }: CanvasProps) {
  const { canvas, canvasRef, containerRef } = useCanvas(imageUrl);
  const { handleUndo, handleRedo, canUndo, canRedo } = useHistory(canvas);
  const {
    settings: brushSettings,
    isEraser,
    setBrushSize,
    setBrushShape,
    setBrushColor,
    toggleEraser,
  } = useBrush(canvas);

  // Update preview in real-time
  useEffect(() => {
    if (canvas) {
      canvas.on('object:added', () => {
        const dataUrl = canvas.toDataURL({
          format: 'png',
          quality: 1,
        });
        onMaskGenerated(dataUrl);
      });

      canvas.on('object:modified', () => {
        const dataUrl = canvas.toDataURL({
          format: 'png',
          quality: 1,
        });
        onMaskGenerated(dataUrl);
      });
    }
  }, [canvas, onMaskGenerated]);

  const handleExport = () => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'masked-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearCanvas = () => {
    if (canvas && imageUrl) {
      // Keep the background image but remove all drawn objects
      const objects = canvas.getObjects();
      objects.forEach(obj => canvas.remove(obj));
      canvas.renderAll();
      
      // Generate new preview
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      onMaskGenerated(dataUrl);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div className="flex flex-wrap items-center justify-between w-full gap-4 bg-gray-800 p-4 rounded-lg">
        <BrushControls
          settings={brushSettings}
          isEraser={isEraser}
          onSizeChange={setBrushSize}
          onShapeChange={setBrushShape}
          onColorChange={setBrushColor}
          onToggleEraser={toggleEraser}
        />
        <ToolBar
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          onExport={handleExport}
          onClear={clearCanvas}
          onDelete={onDelete}
        />
      </div>

      <div 
        ref={containerRef}
        className="relative bg-gray-800 rounded-lg overflow-hidden w-full max-w-[90vw] max-h-[70vh]"
        style={{ aspectRatio: '16/9' }}
      >
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
      </div>
    </motion.div>
  );
}