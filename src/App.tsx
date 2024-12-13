import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from './components/Canvas';
import { ImageUpload } from './components/ImageUpload';
import { ImagePreview } from './components/ImagePreview';
import { Brush } from 'lucide-react';

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setMaskUrl(null);
  };

  const handleDelete = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    if (maskUrl) {
      URL.revokeObjectURL(maskUrl);
    }
    setImageUrl(null);
    setMaskUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1920px] mx-auto"
      >
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brush className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold">Image Inpainting Tool</h1>
          </div>
          <p className="text-gray-400">
            Upload an image and draw masks to create inpainting regions
          </p>
        </header>

        {!imageUrl ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-8">
            <Canvas
              imageUrl={imageUrl}
              onMaskGenerated={setMaskUrl}
              onDelete={handleDelete}
            />
            
            {maskUrl && (
              <ImagePreview originalUrl={imageUrl} maskUrl={maskUrl} />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}