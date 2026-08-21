from pathlib import Path
from PIL import Image, ImageOps

source_dir = Path(r"E:\工作设计文件\作品集\作品集")
output_dir = Path("public/works")
output_dir.mkdir(parents=True, exist_ok=True)

selected = [
    ("work-products.jpg", "4.png"),
    ("work-skin-library.jpg", "23-0606肌肤图书馆1.jpg"),
    ("work-packaging-scene.jpg", "场景.jpg"),
    ("work-kitchen-product.jpg", "微信图片_20260227214337_14_60.jpg"),
    ("work-pink-product.jpg", "微信图片_20260227214343_21_60.jpg"),
    ("work-ai-sport.jpg", "微信图片_20260227214347_26_60.jpg"),
    ("work-ai-robot.jpg", "微信图片_20260314224957_4_2.jpg"),
    ("work-winter-packaging.jpg", "冬至3.jpg"),
]

for output_name, source_name in selected:
    source_path = source_dir / source_name
    if not source_path.exists():
        print(f"MISSING {source_path}")
        continue
    with Image.open(source_path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image = ImageOps.fit(image, (1600, 1067), method=Image.Resampling.LANCZOS, centering=(0.5, 0.45))
        image.save(output_dir / output_name, quality=86, optimize=True, progressive=True)
        print(f"IMPORTED {source_name} -> {output_name}")
