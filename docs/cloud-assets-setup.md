# 云存储图片配置

## 1. 创建云环境

在微信开发者工具打开本项目，点击工具栏“云开发”，创建一个云环境并复制顶部的环境 ID。将 `game.js` 的 `CLOUD_ENV_ID` 替换为该值。

## 2. 上传图片

进入云开发控制台的“云存储”，新建目录 `fish-game`，上传 `img` 目录中的全部 PNG。上传完成后逐个复制每张图片的文件 ID，格式类似：

```text
cloud://环境ID.存储桶ID/fish-game/卡通海洋背景0.png
```

## 3. 填写文件 ID

在 `game.js` 的 `CLOUD_ASSET_FILES` 中填入对应 ID。文件 ID 必须是云开发工具复制的完整值：

```js
const CLOUD_ASSET_FILES={
  bg0:'cloud://环境ID.存储桶ID/fish-game/卡通海洋背景0.png',
  bg1:'cloud://环境ID.存储桶ID/fish-game/卡通海洋背景1.png',
  player_0:'cloud://环境ID.存储桶ID/fish-game/卡通海洋鱼类角色生成.png'
};
```

图片名称对应关系见 `ASSET_FILES`。所有实际使用的图片都要填入，否则代码会暂时使用 GitHub 备用地址。

## 4. 验证

在开发者工具中重新编译，观察控制台是否出现“云图片下载失败”。确认图片显示后，再上传小游戏。正式发布前应删除或不使用 GitHub 备用地址，并补齐所有 `CLOUD_ASSET_FILES` 映射。

