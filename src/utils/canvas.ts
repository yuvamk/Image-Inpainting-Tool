import { fabric } from 'fabric';

export const initializeCanvas = (canvas: fabric.Canvas) => {
  canvas.isDrawingMode = true;
  canvas.selection = true;
  return canvas;
};

export const loadImageToCanvas = (
  canvas: fabric.Canvas,
  imageUrl: string,
  containerWidth: number,
  containerHeight: number
) => {
  return new Promise<void>((resolve) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      const containerAspectRatio = containerWidth / containerHeight;
      const imageAspectRatio = img.width! / img.height!;

      let scaleFactor = 1;
      if (imageAspectRatio > containerAspectRatio) {
        scaleFactor = containerWidth / img.width!;
      } else {
        scaleFactor = containerHeight / img.height!;
      }

      img.scale(scaleFactor);
      
      canvas.setDimensions({
        width: containerWidth,
        height: containerHeight,
      });
      
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        originX: 'center',
        originY: 'center',
        left: containerWidth / 2,
        top: containerHeight / 2,
      });

      resolve();
    });
  });
};