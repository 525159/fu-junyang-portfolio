# 付俊阳 · 个人作品集

**在线访问：[https://525159.github.io/fu-junyang-portfolio/](https://525159.github.io/fu-junyang-portfolio/)**

源码仓库：[525159/fu-junyang-portfolio](https://github.com/525159/fu-junyang-portfolio)。提交到默认分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

第一次维护网站，可以先看 [网站维护演示](网站维护演示.md)：以添加手机号为例，说明怎样在 GitHub 修改联系方式和新增项目，无需安装软件。

基于 [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio) 改造的中文个人作品集。沿用 Astro、Tailwind CSS、组件划分与个人信息集中配置，重新设计视觉和项目展示，并增加 Markdown 项目详情、搜索、分类、草稿、样例自动隐藏等功能。

## 先看网站

需要 Node.js 22.12 或更新版本，推荐 Node.js 24 LTS。

Windows 下可以直接双击 `start-preview.cmd`。首次运行会安装依赖，然后打开浏览器。预览时保留终端窗口，关闭后本地地址会停止服务。也可以使用下面的命令：

```powershell
npm install
npm run dev
```

打开终端显示的本地地址，通常为 `http://localhost:4321/`。停止预览时在终端按 `Ctrl+C`。

首次开发可用 `npm install`；后续在干净机器上安装推荐使用 `npm ci`，按锁文件获取相同版本。

## 最常用：新增一个项目

1. 复制 `templates/project.md` 到 `src/content/projects/`。
2. 改名为英文小写名称，例如 `my-first-app.md`。文件名决定链接 `/projects/my-first-app/`，发布后尽量不要改名。
3. 修改文件顶部的标题、介绍、分类、日期和技术标签。
4. 填写真实项目的 `demoUrl`。它会成为卡片上的 **“立即体验”** 按钮，点击封面也会直接打开该地址。`repoUrl` 对应源码入口；项目介绍始终保留。
5. 把截图放到 `public/images/my-first-app/cover.png`，填写 `cover: "/images/my-first-app/cover.png"`。推荐横图，约 1200 × 760，尽量小于 500 KB。未换截图时可先使用默认封面。
6. 在 `---` 后用普通文字或 Markdown 写详细介绍。
7. 改成 `draft: false` 并保存。开发预览会自动更新；公开网站需要提交并重新部署。

**第一篇真实项目发布后，三个布局样例会自动隐藏**，它们的详情页也不会进入正式构建。不需要自己去首页删卡片。`sample: true` 只用于样例，真实项目保留 `sample: false`。

### 可以直接参考的文件开头

```yaml
---
title: "我的记账工具"
summary: "帮助个人快速记录日常开销，按月查看支出构成。"
category: "效率工具"
date: "2026-10-11"
tags: ["填写真实技术"]
cover: "/images/project-placeholder.svg"
coverAlt: "记账工具的首页"
featured: true
order: 1
draft: false
sample: false
status: "已上线"
# demoUrl: "https://填写真实的在线地址"
# repoUrl: "https://github.com/你的账号/仓库"
---
```

`#` 开头的是注释。有在线地址时删除该行开头的 `#`，填入 **http:// 或 https:// 完整网址**。

### 排序、草稿与分类

| 字段 | 作用 |
| --- | --- |
| `featured: true` | 排在前面。排第一的精选项目使用大图横向布局，建议只设 1～3 个。 |
| `order: 1` | 同为精选或普通项目时，数字越小越靠前。相同数字再按日期从新到旧。 |
| `draft: true` | 隐藏项目，详情页也不会发布。 |
| `sample: false` | 标记为真实作品，让演示内容自动退出。 |
| `category` | 自动生成分类筛选，不需要修改页面代码。 |
| `status` | 可填 `已上线`、`开发中`、`已归档`。 |
| `demoUrl` | 在线使用入口，没有则整行省略；不会生成空按钮。 |
| `repoUrl` | 源码入口，没有则整行省略。 |
| `role` | 真实的个人贡献角色，可选。 |

网站会自动按名称、介绍和标签搜索项目。按键 `/` 可聚焦搜索框。

## “点击就使用”怎样实现

作品集负责展示项目和提供入口。**项目本身需要先部署成一个可访问的应用**，再把地址写到 `demoUrl`。

- 纯前端应用：可独立部署到静态托管服务，再填入地址。
- 有后端、数据库的应用：前后端按其技术要求部署，填入用户能打开的应用地址。
- 只有 GitHub 仓库的项目：先使用 `repoUrl`；仓库源码不等于在线应用。
- 原生桌面程序：不能仅凭网页链接直接在浏览器运行，可链接到发布或下载页，并在介绍里说明。

有 `demoUrl` 时，卡片主按钮和封面直接打开应用，另保留“项目介绍”与源码。当前三个样例没有编造可用地址，也不是实际可运行的应用。

## 修改个人资料与简历

编辑 `src/config.ts`：

- 名字、首页文字和个人介绍。
- `social.phone`：填写手机号后，底部显示电话联系按钮；手机点击会打开拨号界面。清空为 `""` 可隐藏。
- `social.email`：填写真实邮箱后，底部会出现发邮件按钮。
- `social.github`：填写完整的个人 GitHub 地址后，显示 GitHub 入口。
- `resume`：将简历 PDF 放到 `public/resume.pdf`，再填 `"/resume.pdf"`，导航和关于区域自动显示简历入口。

未知信息保持空字符串，网站会隐藏对应按钮，不展示虚假的邮箱、经历或技能。上线前请把个人介绍与技能描述核对成真实情况。

配色、字号与页面间距统一在 `src/styles/global.css`。样例封面是本地 SVG 概念图，不依赖外部图片或在线字体。

## 检查与构建

```powershell
npm run build
npm run preview
```

构建先运行 TypeScript/Astro 检查，再验证已发布项目的封面路径和日期。报错时按照文件名修正再发布。构建产物在 `dist/`，可直接部署为静态网站。

## 公开上线

本项目使用 GitHub Pages 公开托管，自动发布配置在 `.github/workflows/deploy.yml`。也可以按下面的方式迁移到其他托管服务。

### 推荐：GitHub + Cloudflare Pages / Netlify / Vercel

1. 将 **当前 portfolio 文件夹里的内容** 放入你的 GitHub 仓库，保留 `LICENSE.md`、`NOTICE.md` 和锁文件，不提交 `node_modules/`。
2. 在托管服务中连接该仓库。
3. 构建命令：`npm run build`。输出目录：`dist`。Node.js 版本：24。
4. 设置环境变量 `SITE_URL` 为最终站点网址，例如 `https://你的域名`，用于规范链接和分享信息。
5. 根域名部署时不设置 `BASE_PATH`。网站上线后，每次在 GitHub 新增项目文件并提交，就会触发重新构建与发布。

个人静态网站通常可使用这些服务的免费额度，具体以服务商当时的方案为准；自定义域名需另行购买。

### GitHub Pages

已提供 `.github/workflows/deploy.yml`。仓库上传后，在 GitHub 的 Settings → Pages → Build and deployment 中选择 **GitHub Actions**，然后运行 **Deploy portfolio** 工作流。工作流会判断用户主页仓库或项目仓库，自动设置站点地址和子目录。

如果使用自定义域名，请同时修改工作流内 `SITE_URL` 为最终域名、`BASE_PATH` 为 `/`，并在 `public/CNAME` 中写入域名。正文图片优先用模板里的相对地址，避免子目录部署时丢失。

### 常用文件

```text
src/config.ts                    你的个人信息
src/content/projects/*.md        每个项目一个 Markdown 文件
templates/project.md             可复制的项目模板
public/images/                   项目封面和截图
public/resume.pdf                你的简历，需自行放入
src/components/                  页面组件
src/pages/projects/[...id].astro  自动生成项目详情
src/styles/global.css            页面风格
```

## 开源来源

基于 Ryan Fitzgerald 的 DevPortfolio，MIT License。具体版本和改动说明见 `NOTICE.md`，原始许可保留在 `LICENSE.md`。项目大图与展示入口的组织方式参考 Simplefolio 的公开演示，未复制其代码或图片。
