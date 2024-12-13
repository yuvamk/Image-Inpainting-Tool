import { motion } from 'framer-motion';

interface ImagePreviewProps {
  originalUrl: string;
  maskUrl: string;
}

export function ImagePreview({ originalUrl, maskUrl }: ImagePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 gap-8"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Original Image</h3>
        <img
          src={originalUrl}
          alt="Original"
          className="w-full rounded-lg border-2 border-gray-700"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Generated Mask</h3>
        <img
          src={maskUrl}
          alt="Mask"
          className="w-full rounded-lg border-2 border-gray-700"
        />
      </div>
    </motion.div>
  );
}