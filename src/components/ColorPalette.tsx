import { motion } from 'framer-motion';
import { Circle, Palette } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface ColorPaletteProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  disabled?: boolean;
}

export function ColorPalette({ selectedColor, onColorChange, disabled }: ColorPaletteProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
      <Palette className="w-6 h-6 text-gray-400" />
      <div className="flex items-center gap-2">
        {COLORS.map(({ name, value }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onColorChange(value)}
            disabled={disabled}
            title={name}
            className={`relative p-1 rounded-full transition-transform ${
              selectedColor === value ? 'ring-2 ring-blue-500' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div
              className="w-6 h-6 rounded-full shadow-lg"
              style={{ backgroundColor: value }}
            />
            {selectedColor === value && (
              <Circle className="absolute inset-0 w-full h-full text-blue-500 opacity-50" />
            )}
          </motion.button>
        ))}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            disabled={disabled}
            title="Custom Color"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          <div className="absolute inset-0 rounded-full shadow-lg pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}