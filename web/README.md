# 检茶员 · 第七夜（Web 版）

一款完全本地运行的互动阅读作品，改编自同款微信小程序。
进入一段虚构关系，做出选择，看被检的究竟是谁。

纯静态站点：**零依赖、零构建、零网络请求**，可直接托管到 GitHub Pages / 任意静态空间。

## 技术说明

- 逻辑层（剧情数据 + 评分引擎）与小程序版完全共用同一套算法，仅把 `wx.*` 储存替换为浏览器 `localStorage`，`require` 改为全局 `window.LS` 命名空间。
- 页面层为原生 HTML/CSS/JS（vanilla，无框架），用 hash 路由切换视图。
- 六维雷达图为原生 Canvas 2D 自绘。
- 全部进度与历史保存在浏览器本地 `localStorage`，不上传任何数据。

## 本地预览

```bash
cd web
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

或直接用 VS Code 的 Live Server 打开 `web/index.html`。

> 注意：必须通过 http 服务访问（`http://localhost`），不能用 `file://` 直接打开，否则部分浏览器会限制脚本加载。

## 部署到 GitHub Pages

### 方式 A：以 web 子目录作为 Pages 源（推荐）

1. 把整个仓库推到 GitHub。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选 `Deploy from a branch`。
3. **Branch** 选你的默认分支（如 `main`），**folder** 选 `/web`。
4. 保存后等待构建，访问 `https://<用户名>.github.io/<仓库名>/`。

### 方式 B：把 web 内容放到仓库根目录

若希望域名根路径直接访问，把 `web/` 下的所有文件（`index.html`、`css/`、`js/`、`images/`）移动到仓库根目录，Pages 源选 `/(root)`。

> 仓库根已包含 `.nojekyll`，确保 GitHub 不会用 Jekyll 处理（避免忽略带 `_` 的目录）。

## 目录结构

```
web/
├── index.html          # 单页入口，按顺序加载脚本
├── css/style.css       # 深色主题与全部页面样式
├── js/
│   ├── app.js          # 路由 + 各页面渲染 + 雷达绘制
│   ├── data/           # 剧情 / 角色 / 结局 / 报告模板
│   └── core/           # 条件解析 / 属性 / 模式 / 状态机 / 评分 / 存档
└── images/             # 立绘与场景背景
```

## 合规

本作品为娱乐性互动推演，**非心理测评**，不构成心理学结论。所有人物、情节均为虚构。详见应用内「关于」页。
