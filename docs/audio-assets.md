# 音频资源

`public/audio/generated/` 是第一版轻量占位音频，使用程序合成，无外部版权依赖。

- `music-menu-01.wav`、`music-menu-02.wav`：首页循环音乐
- `music-game-01.wav`、`music-game-02.wav`：游戏循环音乐
- `eat-01.wav`～`eat-03.wav`：吃鱼变体
- `skill-*.wav`：六种技能激活音效与技能拾取音效
- `hit.wav`、`game-over.wav`：受伤和结束音效

这些 WAV 文件需要转换为微信小游戏兼容的低码率 MP3 后再打包。生成命令会自动完成转换；最终 MP3 资源应优先使用，WAV 仅作为可编辑源文件保留，不要一起上传到小游戏包。
