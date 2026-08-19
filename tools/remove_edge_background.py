from pathlib import Path
from collections import deque
from PIL import Image

ROOTS = [Path('assets'), Path('public/img')]

def background_pixel(rgb):
    r, g, b = rgb[:3]
    return max(rgb[:3]) - min(rgb[:3]) <= 18 and min(rgb[:3]) >= 170

def remove_edges(path):
    im = Image.open(path).convert('RGBA')
    px = im.load(); w, h = im.size; q = deque(); seen = set()
    for x in range(w): q.extend(((x, 0), (x, h - 1)))
    for y in range(h): q.extend(((0, y), (w - 1, y)))
    while q:
        x, y = q.popleft()
        if (x, y) in seen or not (0 <= x < w and 0 <= y < h): continue
        seen.add((x, y))
        if not background_pixel(px[x, y]): continue
        px[x, y] = (px[x, y][0], px[x, y][1], px[x, y][2], 0)
        q.extend(((x+1,y), (x-1,y), (x,y+1), (x,y-1)))
    im.save(path, optimize=True)

for root in ROOTS:
    for path in root.glob('*.png'):
        if path.name.startswith('bg') or '背景' in path.name: continue
        remove_edges(path)
print('透明背景处理完成')
