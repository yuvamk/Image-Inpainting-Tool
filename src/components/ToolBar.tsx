import { motion } from 'framer-motion';
import { Undo2, Redo2, Download, Trash2, X } from 'lucide-react';

interface ToolBarProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onExport: () => void;
  onClear: () => void;
  onDelete: () => void;
}

export function ToolBar({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onExport,
  onClear,
  onDelete,
}: ToolBarProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo"
        className={`p-2 rounded-lg ${
          canUndo ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 cursor-not-allowed'
        }`}
      >
        <Undo2 className={`w-6 h-6 ${canUndo ? 'text-white' : 'text-gray-500'}`} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRedo}
        disabled={!canRedo}
        title="Redo"
        className={`p-2 rounded-lg ${
          canRedo ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 cursor-not-allowed'
        }`}
      >
        <Redo2 className={`w-6 h-6 ${canRedo ? 'text-white' : 'text-gray-500'}`} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onExport}
        title="Download"
        className="p-2 rounded-lg bg-green-600 hover:bg-green-500"
      >
        <Download className="w-6 h-6 text-white" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClear}
        title="Clear Canvas"
        className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-500"
      >
        <Trash2 className="w-6 h-6 text-white" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        title="Delete Image"
        className="p-2 rounded-lg bg-red-600 hover:bg-red-500"
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}