export type AssetFrame = { dataUrl: string; name: string };

const isLightBackground = (r: number, g: number, b: number) =>
  (r + g + b) / 3 >= 145 && Math.max(r, g, b) - Math.min(r, g, b) <= 55;

export async function asset(file: File): Promise<AssetFrame> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = image, queue: number[] = [], visited = new Uint8Array(width * height);
  const add = (x: number, y: number) => queue.push(y * width + x);
  for (let x = 0; x < width; x++) { add(x, 0); add(x, height - 1); }
  for (let y = 0; y < height; y++) { add(0, y); add(width - 1, y); }
  for (let head = 0; head < queue.length; head++) {
    const index = queue[head]; if (visited[index]) continue; visited[index] = 1;
    const offset = index * 4, r = data[offset], g = data[offset + 1], b = data[offset + 2];
    if (data[offset + 3] === 0 || !isLightBackground(r, g, b)) continue;
    data[offset + 3] = 0; const x = index % width, y = Math.floor(index / width);
    if (x > 0) add(x - 1, y); if (x + 1 < width) add(x + 1, y);
    if (y > 0) add(x, y - 1); if (y + 1 < height) add(x, y + 1);
  }
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) { data[i] = 0; data[i + 1] = 0; data[i + 2] = 0; }
    else if (data[i + 3] < 255 && Math.max(data[i], data[i + 1], data[i + 2]) >= 180) data[i + 3] = 0;
  }
  ctx.putImageData(image, 0, 0); return { dataUrl: canvas.toDataURL('image/png'), name: file.name };
}
