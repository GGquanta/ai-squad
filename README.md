# 中科国光 · AI 研究小组展示页

「中科国光 · AI 研究小组」团队介绍站点：团队介绍、职责、核心产品、发展愿景与加入我们。

技术栈：Vite 8 + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion，部署至 Cloudflare。

## 快速开始

```bash
npm install
npm run dev
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | ESLint |
| `npm run deploy` | 构建并部署到 Cloudflare |

## 文档驱动（SDD）

本项目采用规范驱动开发：改需求或功能时**优先修改 `docs/`**，再改代码。

| 文档 | 用途 |
| --- | --- |
| [docs/PRD.md](docs/PRD.md) | 需求、板块结构、内容口径 |
| [docs/DESIGN.md](docs/DESIGN.md) | 配色、字体、间距、动效 |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | 目录、组件、部署 |
| [AGENTS.md](AGENTS.md) | AI 协作约定 |

文案与产品数据统一放在 [`src/data/content.ts`](src/data/content.ts)；产品图标放在 `public/icons/`（当前为占位 SVG，可直接替换同名文件）。

## 部署

### Wrangler 一键部署

```bash
npm run deploy
```

配置见 [`wrangler.jsonc`](wrangler.jsonc)：静态资源目录为 `./dist`，启用 SPA `not_found_handling`。

### Cloudflare Pages（接 Git）

1. 连接本仓库
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Node.js 版本建议 20+

## 许可

内部项目，版权归北京中科国光量子科技有限公司。
