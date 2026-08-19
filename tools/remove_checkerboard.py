from pathlib import Path
from PIL import Image

def clean(path):
    im=Image.open(path).convert('RGBA'); p=im.load()
    for y in range(im.height):
        for x in range(im.width):
            r,g,b,a=p[x,y]
            # Generated checkerboard/background: white or neutral light gray.
            if a and min(r,g,b)>=145 and max(r,g,b)-min(r,g,b)<=42:
                p[x,y]=(r,g,b,0)
            elif a<255 and max(r,g,b)>180:
                p[x,y]=(r,g,b,0)
    tmp=path.with_name(path.stem+'.tmp.png'); im.save(tmp,optimize=True); tmp.replace(path)

for root in (Path('assets'),Path('public/img')):
    for p in root.glob('*.png'):
        if p.name.startswith('bg') or '背景' in p.name: continue
        clean(p)
print('checkerboard removal complete')
