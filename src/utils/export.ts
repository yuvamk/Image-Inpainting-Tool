import { fabric } from 'fabric';

export const downloadCanvas = (canvas: fabric.Canvas) => {
  const dataUrl = canvas.toDataURL({
    format: 'png',
    quality: 1,
  });
  
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'masked-image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return dataUrl;
};