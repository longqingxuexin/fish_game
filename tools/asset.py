"""Extract one fish from an uploaded image into the local asset cache.

Only edge-connected light/neutral background pixels are removed.  Pixels inside
the remaining connected region are intentionally not color-keyed, so white
highlights inside the fish are preserved.

Usage:
    python tools/asset.py path/to/upload.png
    python tools/asset.py path/to/upload.png --cache-dir .cache/assets
"""

from __future__ import annotations

import argparse
import hashlib
from collections import deque
from pathlib import Path

from PIL import Image


DEFAULT_CACHE = Path(".cache") / "assets"


def is_background_candidate(r: int, g: int, b: int) -> bool:
    """Return whether a pixel looks like a light gray/white checker square."""
    spread = max(r, g, b) - min(r, g, b)
    brightness = (r + g + b) / 3
    # Broad enough for common gray/white checkerboards, but still neutral-only.
    return brightness >= 145 and spread <= 55


def remove_edge_background(image: Image.Image) -> Image.Image:
    """Remove only background-colored pixels connected to the image boundary."""
    result = image.convert("RGBA")
    pixels = result.load()
    width, height = result.size
    queue: deque[tuple[int, int]] = deque()
    visited = bytearray(width * height)

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        index = y * width + x
        if visited[index]:
            continue
        visited[index] = 1
        r, g, b, alpha = pixels[x, y]
        if alpha == 0 or not is_background_candidate(r, g, b):
            continue

        # Fully transparent avoids the semi-transparent white fringe in Canvas.
        pixels[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height:
                queue.append((nx, ny))

    return result


def clean_transparent_fringe(image: Image.Image) -> Image.Image:
    """Clear RGB data and alpha on transparent pixels for clean Canvas edges."""
    result = image.convert("RGBA")
    pixels = result.load()
    for y in range(result.height):
        for x in range(result.width):
            r, g, b, alpha = pixels[x, y]
            if alpha == 0:
                pixels[x, y] = (0, 0, 0, 0)
            elif alpha < 255 and max(r, g, b) >= 180:
                # Remove only pale semi-transparent fringe pixels, never opaque
                # fish pixels or interior highlights.
                pixels[x, y] = (r, g, b, 0)
    return result


def process_asset(source: Path, cache_dir: Path = DEFAULT_CACHE) -> Path:
    if not source.is_file():
        raise FileNotFoundError(f"输入图片不存在: {source}")
    cache_dir.mkdir(parents=True, exist_ok=True)
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    output = cache_dir / f"{source.stem}_{digest}.png"
    with Image.open(source) as image:
        result = clean_transparent_fringe(remove_edge_background(image))
        result.save(output, "PNG", optimize=True)
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description="asset: 单张鱼图边缘背景抠除并缓存")
    parser.add_argument("input", type=Path, help="用户上传的图片路径")
    parser.add_argument("--cache-dir", type=Path, default=DEFAULT_CACHE)
    args = parser.parse_args()
    print(process_asset(args.input, args.cache_dir))


if __name__ == "__main__":
    main()
