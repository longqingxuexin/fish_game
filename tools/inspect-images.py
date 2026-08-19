from pathlib import Path
from PIL import Image

root = Path('public/img')
preview = Path('tmp-image-previews')
preview.mkdir(exist_ok=True)
for path in sorted(root.glob('*.png')):
    with Image.open(path) as im:
        rgba = im.convert('RGBA')
        alpha = rgba.getchannel('A')
        extrema = alpha.getextrema()
        print(path.name, im.size, im.mode, 'alpha=', extrema)
        if path.name in ('bg0.png', 'fish_small_2.png', 'player_0.png'):
            rgba.thumbnail((352, 640))
            rgba.save(preview / path.name)
