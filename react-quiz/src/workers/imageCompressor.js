self.onmessage = async (e) => {
  const file = e.data;
  const bitmap = await createImageBitmap(file);

  const width = 300; 
  const ratio = bitmap.height / bitmap.width;
  const height = width * ratio;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.8 });

  self.postMessage(blob);
};
