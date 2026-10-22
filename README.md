# ArchiWood Help

ArchiWood 的英文帮助站，面向国外用户。每一篇帮助是一个 Markdown 文件，正文用英文。推送到 GitHub 的 `main` 分支后，会自动发布到 GitHub Pages。

## 本地预览

需要 Node.js 18 或更新版本。

```bash
npm install
npm run dev
```

浏览器打开 http://127.0.0.1:5173 。改完文章保存即可刷新。如果新文章没有出现在左侧目录，停掉后再运行一次 `npm run dev`。

发布前可以先构建一次，死链会直接报错：

```bash
npm run build
```

## 加一篇文章

1. 复制模板到对应分类文件夹。文件名用英文短横线，标题和正文都用英文。

```bash
cp templates/article.md docs/getting-started/install.md
```

2. 改文件开头：

```yaml
---
title: Install ArchiWood
description: Install ArchiWood in SketchUp and open it for the first time
order: 10
---
```

`order` 越小越靠前。不写时按标题排序。还没写完、先不想出现在目录里时，加上 `draft: true`。草稿仍会被构建出来，知道网址的人可以打开，所以正式发布前要删掉这一行。

3. 截图放在 `docs/public/images/install/`，文章里这样引用：

```md
![Install folder](/images/install/folder.png)
```

路径以 `/images/` 开头，不要带仓库名，也不要写成本机绝对路径。

4. 确认左侧目录和页面内容后，提交并推送到 `main`。

| 文件夹 | 导航 | 放什么 |
| --- | --- | --- |
| `docs/getting-started/` | Getting Started | 安装、首次打开、更新 |
| `docs/design/` | Design | 场景、柜体、板件、五金、参数 |
| `docs/production/` | Production | 拆单、排版、标签、报表、数控 |
| `docs/faq/` | FAQ | 报错和异常现象，标题用用户会搜索的英文说法 |

文章之间用站内路径互相链接，例如 `[Install ArchiWood](/getting-started/install)`。不要加 `.md`，也不要加 `.html`。

## 加一个分类

1. 新建文件夹和概览页，例如 `docs/hardware/index.md`。概览页写这一类文章在讲什么。
2. 打开 `docs/.vitepress/sidebar.ts`，在 `sections` 里加一行。分类名称会成为左侧目录的标题，并链到这个 `index.md`。下面的文章会自动列出来：

```ts
{ text: 'Hardware', link: '/hardware/', dir: 'hardware' },
```

顶部导航会跟着这个列表变化。首页上的四个入口写在 `docs/index.md`，需要的话一并加上。

## 部署

1. 把仓库推到 GitHub。仓库可以叫 `ArchiWoodHelp`，叫别的名字也可以。
2. 打开仓库的 **Settings → Pages → Build and deployment**，Source 选 **GitHub Actions**。
3. 之后每次推送到 `main`，Actions 会构建并发布。
4. 站点地址是 `https://<用户名>.github.io/<仓库名>/`。

私有仓库需要账号本身支持 GitHub Pages。公开仓库可以直接用。

线上页面的资源路径会自动带上仓库名。本地预览不要设置 `VITEPRESS_BASE`。如果以后绑定了自定义域名，并且网站开在域名根路径，把 `.github/workflows/deploy.yml` 里的 `VITEPRESS_BASE` 改成 `/`。
