from collections import deque
from pathlib import Path
import sys
from shutil import copy2
from PIL import Image, ImageFilter

SOURCE = Path('assets')
ROOT = Path('public/img')
BACKUP = Path('tmp-image-originals')
BACKUP.mkdir(exist_ok=True)

def is_checker(pixel):
    r, g, b = pixel[:3]
    return max(r, g, b) - min(r, g, b) <= 18 and min(r, g, b) >= 185

def remove_checkerboard(im):
    rgba = im.convert('RGBA')
    px = rgba.load(); w, h = rgba.size
    seen = bytearray(w * h); q = deque()
    for x in range(w): q.extend(((x, 0), (x, h - 1)))
    for y in range(h): q.extend(((0, y), (w - 1, y)))
    while q:
        x, y = q.popleft(); idx = y * w + x
        if seen[idx] or not is_checker(px[x, y]): continue
        seen[idx] = 1; px[x, y] = (*px[x, y][:3], 0)
        if x: q.append((x - 1, y))
        if x + 1 < w: q.append((x + 1, y))
        if y: q.append((x, y - 1))
        if y + 1 < h: q.append((x, y + 1))
    return rgba

def remove_watermark(im):
    # The source watermark is consistently in the lower-right corner.
    im = im.convert('RGB')
    w, h = im.size
    mask = Image.new('L', (w, h), 0)
    mask.paste(255, (int(w * .82), int(h * .91), w, h))
    # Diffuse surrounding pixels into the masked rectangle, preserving the scene.
    work = im.filter(ImageFilter.GaussianBlur(max(2, int(w * .008))))
    return Image.composite(work, im, mask).convert('RGBA')

files = sorted(SOURCE.glob('*.png'))
start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
end = int(sys.argv[2]) if len(sys.argv) > 2 else len(files)
for source_path in files[start:end]:
    path = ROOT / source_path.name
    copy2(source_path, BACKUP / path.name)
    with Image.open(source_path) as source:
        if path.name.startswith('bg'):
            result = remove_watermark(source)
        else:
            result = remove_checkerboard(source)
        output = path.with_name(path.stem + '.clean.png')
        result.save(str(output), 'PNG', optimize=False)
        output.replace(path)
        print(path.name, source.size, '->', result.mode)
