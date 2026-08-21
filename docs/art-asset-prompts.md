# 大鱼吃小鱼：美术素材规格与图片生成提示词

## 一、推荐素材格式

- 鱼类单图：PNG，透明背景，建议 `512 × 512 px`。
- 普通小鱼：`256 × 256 px` 也可以。
- 玩家鱼、大鱼、Boss：建议 `512 × 512 px`。
- 海底背景：建议 `750 × 1334 px`，竖屏。
- 技能图标和技能特效：透明 PNG，建议 `256 × 256 px` 或 `512 × 512 px`。
- 所有鱼最好统一侧面朝右，代码可以自动水平翻转。
- 不要文字、不要水印、不要边框、不要复杂背景。
- 所有鱼尽量使用同一套画风。

## 二、推荐素材清单

1. 玩家鱼：5 个成长阶段，按 `player_1.webp` → `player_2.webp` → `player_3.webp` → `player_4.webp` → `player_0.webp` 使用；其中 `player_0.webp` 为最终进化形态。
2. 普通小鱼：5～8 种。
3. 中型鱼：4～6 种。
4. 大鱼：3～5 种。
5. Boss 鱼：1～2 种。
6. 技能图标：6 个。
7. 技能特效：6 个。
8. 海底背景：2～3 张。

## 三、通用负面提示词

```text
text, logo, watermark, border, frame, cropped, cut off, duplicate fish, multiple subjects, blurry, low quality, noisy background, realistic gore, scary horror, copyrighted character
```

## 四、玩家鱼提示词

```text
精美卡通海洋游戏鱼类角色，侧面朝右，圆润可爱，身体流线型，蓝色和青绿色渐变，大眼睛，清晰的鱼鳍和鱼尾，鲜艳但不刺眼，儿童友好，透明背景，单独角色，无文字，无水印，2D mobile game asset, high quality
```

## 五、玩家鱼成长阶段提示词

```text
同一条卡通海洋游戏玩家鱼的五个成长阶段，从小型到巨大，保持完全一致的角色设计和配色，侧面朝右，体型逐步变大，鱼鳍和鱼尾清晰，透明背景，五个独立角色，无文字，无水印，2D mobile game sprite sheet；文件顺序为 player_1.webp、player_2.webp、player_3.webp、player_4.webp，最终进化形态为 player_0.webp
```

## 六、小鱼群提示词

```text
一组精美卡通热带小鱼，侧面朝右，5种不同鱼类，黄色、橙色、粉色、蓝色、绿色，形态差异明显，适合大鱼吃小鱼微信小游戏，透明背景，单独角色素材，无文字，无水印，2D mobile game sprite asset
```

## 七、大鱼提示词

```text
卡通海洋游戏中的大型掠食鱼，侧面朝右，体型魁梧但不要恐怖，明显的大嘴、鱼鳍和鱼尾，深蓝色和紫色渐变，具有威胁感，透明背景，单独角色，无文字，无水印，2D game asset
```

## 八、Boss 鱼提示词

```text
史诗级卡通深海Boss鱼，侧面朝右，巨大身体，发光眼睛，特殊鳞片，周围有轻微能量光环，适合手机游戏，透明背景，单独角色，无文字，无水印，high quality 2D game character
```

## 九、海底背景提示词

```text
精美卡通海底游戏场景，竖屏构图，蓝绿色海水，阳光穿透海面，珊瑚礁、海草、气泡、沙地，中央区域留出大量空间用于鱼群游动，明亮、清爽、儿童友好，无鱼，无文字，无水印，mobile game background
```

## 十、全屏吞噬特效提示词

```text
卡通游戏技能特效，金黄色漩涡吸力，中心形成巨大鱼嘴形状，周围有旋转水流、星星和粒子，透明背景，适合大鱼吃小鱼游戏，全屏吞噬技能，无文字，无水印，2D VFX sprite
```

## 十一、同类吞噬特效提示词

```text
卡通游戏范围吞噬特效，蓝色水波圆环向外扩散，周围有同色鱼形粒子和气泡，清晰表现范围攻击，透明背景，无文字，无水印，2D mobile game VFX
```

## 十二、加速特效提示词

```text
卡通游戏加速技能特效，黄色和青色速度线，水流尾迹，气泡爆发，向右运动感，透明背景，无文字，无水印，2D game effect sprite
```

## 十三、变大特效提示词

```text
卡通游戏成长技能特效，粉色和紫色能量光环从小到大扩散，闪亮星星和水泡围绕中心，表现鱼体型成长，透明背景，无文字，无水印，2D mobile game VFX
```

## 十四、回血特效提示词

```text
卡通游戏回血技能特效，绿色柔和光圈，爱心、加号、上升气泡和水波纹，明亮友好，透明背景，无文字，无水印，2D game effect sprite
```

## 十五、无敌护盾特效提示词

```text
卡通游戏无敌护盾特效，紫蓝色透明水晶护盾，圆形能量罩，水波纹、闪电和星光粒子，透明背景，无文字，无水印，2D mobile game VFX
```

## 十六、英文搜索关键词

```text
cartoon fish transparent png game asset
underwater mobile game background
fish sprite transparent
2D underwater game VFX
free commercial use fish sprites
cartoon ocean game asset pack
transparent fish character sprite
```

## 十七、文件命名建议

```text
player_fish_01.png
player_fish_02.png
player_fish_03.png
player_fish_04.png
small_fish_yellow.png
small_fish_blue.png
medium_fish_orange.png
big_fish_shark.png
boss_fish_01.png
skill_global_eat.png
skill_type_eat.png
effect_global_eat.png
effect_type_eat.png
effect_speed_up.png
effect_grow.png
effect_heal.png
effect_invincible.png
underwater_background_01.png
```

## 十八、授权检查

优先选择 CC0、Public Domain 或明确允许商业使用的素材。必须确认素材允许用于微信小游戏，不带第三方品牌和角色，不仅限个人非商业使用。不要把 AppSecret、密码、验证码或实名认证资料提供给图片生成工具。
