import { useState } from 'react';
import ReactCrop from 'react-image-crop';

export function ImageWithCrop({ src, onCrop }) {
  const [crop, setCrop] = useState({ unit: '%' });

  const completeHandler = (_, newCropInPercent) => {
    onCrop(newCropInPercent.width > 0 && newCropInPercent.height > 0 ? newCropInPercent : null);
  };

  return <ReactCrop src={src} crop={crop} onChange={(_, newCropInPercent) => setCrop(newCropInPercent)} onComplete={completeHandler} />;
}
