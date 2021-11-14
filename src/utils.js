// Source: https://www.npmjs.com/package/react-image-crop
/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
export function getCroppedImgPercent(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width * crop.width / 100;
  canvas.height = image.height * crop.height / 100;
  const ctx = canvas.getContext('2d');

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = canvas.width * pixelRatio;
  canvas.height = canvas.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * image.width / 100,
    crop.y * image.height / 100,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        resolve(blob);
      },
      'image/png',
      1
    );
  });
}
