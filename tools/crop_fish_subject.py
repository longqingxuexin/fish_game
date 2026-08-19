from pathlib import Path
from collections import deque
from PIL import Image

def crop(path):
    im = Image.open(path).convert('RGBA'); a = im.getchannel('A'); w,h=im.size
    mask=a.load(); seen=set(); best=[]
    for y in range(h):
        for x in range(w):
            if (x,y) in seen or mask[x,y] < 20: continue
            q=[(x,y)]; seen.add((x,y)); comp=[]
            while q:
                cx,cy=q.pop(); comp.append((cx,cy))
                for nx,ny in ((cx+1,cy),(cx-1,cy),(cx,cy+1),(cx,cy-1)):
                    if 0<=nx<w and 0<=ny<h and (nx,ny) not in seen and mask[nx,ny]>=20:
                        seen.add((nx,ny)); q.append((nx,ny))
            if len(comp)>len(best): best=comp
    if not best: return
    xs=[p[0] for p in best]; ys=[p[1] for p in best]
    box=(max(0,min(xs)-8),max(0,min(ys)-8),min(w,max(xs)+9),min(h,max(ys)+9))
    im.crop(box).save(path,optimize=True)

for root in (Path('assets'),Path('public/img')):
    for p in root.glob('fish_*.png'):
        crop(p)
    for p in root.glob('player_*.png'):
        crop(p)
