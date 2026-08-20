export type AssetFrame = { dataUrl: string; name: string; bytes?: number; width?: number; height?: number };

const isLightBackground = (r: number, g: number, b: number) =>
  (r + g + b) / 3 >= 145 && Math.max(r, g, b) - Math.min(r, g, b) <= 55;

export async function asset(file: File, options: { maxDimension?: number; targetBytes?: number } = {}): Promise<AssetFrame> {
  const bitmap = await createImageBitmap(file);
  const targetBytes = options.targetBytes ?? 30 * 1024;
  let maxDimension = options.maxDimension ?? 512;
  const originalMax = Math.max(bitmap.width, bitmap.height);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  const draw = (dimension: number) => { const scale = Math.min(1, dimension / originalMax); canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale)); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height); };
  draw(maxDimension);
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
  ctx.putImageData(image, 0, 0);
  const encode = (quality: number) => new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('图片编码失败')), 'image/webp', quality));
  let blob: Blob | null = null;
  for (let pass = 0; pass < 6; pass++) {
    for (const quality of [0.82, 0.7, 0.58, 0.46, 0.34]) { blob = await encode(quality); if (blob.size <= targetBytes) break; }
    if (blob && blob.size <= targetBytes) break;
    maxDimension = Math.max(128, Math.round(maxDimension * 0.82));
    const source = document.createElement('canvas'); source.width = canvas.width; source.height = canvas.height;
    source.getContext('2d')!.drawImage(canvas, 0, 0);
    const scale = Math.min(1, maxDimension / Math.max(source.width, source.height));
    canvas.width = Math.max(1, Math.round(source.width * scale)); canvas.height = Math.max(1, Math.round(source.height * scale));
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  }
  if (!blob) throw new Error('图片压缩失败');
  const dataUrl = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(reader.error); reader.readAsDataURL(blob!); });
  bitmap.close();
  return { dataUrl, name: file.name, bytes: blob.size, width: canvas.width, height: canvas.height };
}
