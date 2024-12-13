import { fabric } from 'fabric';

export const serializeCanvas = (canvas: fabric.Canvas) => {
  return JSON.stringify(canvas.toJSON(['width', 'height']));
};

export const deserializeCanvas = (
  canvas: fabric.Canvas,
  json: string,
  callback: () => void
) => {
  const backgroundImage = canvas.backgroundImage;
  canvas.loadFromJSON(JSON.parse(json), () => {
    canvas.renderAll();
    if (backgroundImage) {
      canvas.setBackgroundImage(backgroundImage, canvas.renderAll.bind(canvas));
    }
    callback();
  });
};