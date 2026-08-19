from pathlib import Path
from collections import deque
from PIL import Image

def is_light(rgb):
    r,g,b=rgb[:3]
    return min(r,g,b)>=150 and max(r,g,b)-min(r,g,b)<=45

def clean(path):
    im=Image.open(path).convert('RGBA'); p=im.load(); w,h=im.size
    q=deque(); seen=set()
    for x in range(w): q.extend(((x,0),(x,h-1)))
    for y in range(h): q.extend(((0,y),(w-1,y)))
    while q:
        x,y=q.popleft()
        if (x,y) in seen or not (0<=x<w and 0<=y<h): continue
        seen.add((x,y))
        if not is_light(p[x,y]): continue
        p[x,y]=(255,255,255,0)
        q.extend(((x+1,y),(x-1,y),(x,y+1),(x,y-1),(x+1,y+1),(x-1,y-1),(x+1,y-1),(x-1,y+1)))
    tmp=path.with_name(path.stem+'.clean.png')
    im.save(tmp,optimize=True)
    tmp.replace(path)

for root in (Path('assets'),Path('public/img')):
    for path in root.glob('*.png'):
        if path.name.startswith('bg') or '背景' in path.name: continue
        clean(path)
print('asset edge cleanup complete')
