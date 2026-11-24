# ECHO · 乡音有形

独立运行的方言声音可视化网页。此包导出自网站第 9 版，源提交为 84fa68fc60e99331ca75fe93cb68fcf2b3f9c380。

## 包含内容

- 十七类方言的粒子形态、地域配色和运动轨迹。
- 11 段独立方言音频及其对应清单。
- 麦克风录音、当前浏览器历史记录、回听及下载。
- 手掌拖动、食指左滑切换、张掌慢速消散、握拳汇聚。
- 本地手势识别模型、MediaPipe 运行库和 WebAssembly 文件。

## 上传 GitHub 并发布

1. 在 GitHub 新建仓库，例如 echo-dialect。
2. 解压本压缩包，打开 ECHO_GitHub 文件夹。
3. 将文件夹内的所有文件及 audio、vendor 子文件夹上传到仓库根目录。仓库首页应直接出现 index.html。
4. 保留原有子文件夹结构。将 .nojekyll 文件一起上传。
5. 在仓库 Settings → Pages 中，将发布来源设为 Deploy from a branch，分支选择 main，目录选择 /(root)，保存。
6. 发布后使用 Pages 显示的 HTTPS 地址访问网页，按需要允许麦克风和摄像头。

## 本机预览

推荐在 VS Code 安装 Live Server 扩展后，通过 Open with Live Server 打开 index.html。
如果已安装 Python，也可在本文件夹运行：

```sh
python -m http.server 8000
```

随后在浏览器访问 http://localhost:8000。

## 文件说明

| 文件或目录 | 用途 |
| --- | --- |
| index.html | 网页结构与界面 |
| style.css | 字体、配色、布局与适配 |
| app.js | 音频、录音历史及粒子绘制 |
| dialects.js | 十七类方言的文字、配色与地域元素 |
| motion.js | 各类粒子纹样的运动 |
| gesture.js | 摄像头与手势模型加载 |
| gesture-math.js | 手势判断、拖动和消散计算 |
| audio/ | 11 段声音和 manifest.json 对应清单 |
| vendor/ | 手势模型、运行库、WASM 及第三方许可 |
| .nojekyll | GitHub Pages 静态发布标记 |

## 使用说明与验证范围

- 使用现代浏览器，并在 HTTPS 或 localhost 下开启录音与摄像头。
- 手势控制使用单手。伸出食指向左快滑切换下一方言。手掌移动可拖动纹样，张掌停留片刻后消散，握拳汇聚。
- 历史录音存于当前浏览器。更换网站地址或浏览器后，请到原地址下载已有录音。
- 方言类型由用户选择。声音实时驱动粒子，不包含自动方言分类或语音转文字功能。
- 现有样本覆盖部分分类，其他分类可录音体验。
- 第三方运行库许可见 vendor/LICENSE，文档见 vendor/README.md。
- 导出时核对了应用代码、引用文件、音频清单和压缩包完整性。本次未重新进行真实摄像头识别测试。
