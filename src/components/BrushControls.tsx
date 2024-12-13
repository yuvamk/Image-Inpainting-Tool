import { motion } from 'framer-motion';
import { Circle, Square, Eraser } from 'lucide-react';
import { BrushSettings, BrushSize, BrushShape } from '../types';
import { BRUSH_SIZES, BRUSH_SHAPES } from '../constants/brush';
import { ColorPalette } from './ColorPalette';

interface BrushControlsProps {
  settings: BrushSettings;
  isEraser: boolean;
  onSizeChange: (size: BrushSize) => void;
  onShapeChange: (shape: BrushShape) => void;
  onColorChange: (color: string) => void;
  onToggleEraser: () => void;
}

export function BrushControls({
  settings,
  isEraser,
  onSizeChange,
  onShapeChange,
  onColorChange,
  onToggleEraser,
}: BrushControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
        {Object.entries(BRUSH_SIZES).map(([size, value]) => (
          <motion.button
            key={size}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSizeChange(size as BrushSize)}
            title={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
            className={`p-2 rounded-lg transition-colors ${
              settings.size === size ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <div
              className="rounded-full bg-white"
              style={{ width: value / 2, height: value / 2 }}
            />
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
        {BRUSH_SHAPES.map((shape) => (
          <motion.button
            key={shape}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onShapeChange(shape)}
            title={`${shape.charAt(0).toUpperCase() + shape.slice(1)} Shape`}
            className={`p-2 rounded-lg transition-colors ${
              settings.shape === shape ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {shape === 'circle' ? (
              <Circle className="w-6 h-6 text-white" />
            ) : (
              <Square className="w-6 h-6 text-white" />
            )}
          </motion.button>
        ))}
      </div>

      <ColorPalette
        selectedColor={settings.color}
        onColorChange={onColorChange}
        disabled={isEraser}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleEraser}
        title="Eraser Tool"
        className={`p-2 rounded-lg transition-colors ${
          isEraser ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        <Eraser className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}