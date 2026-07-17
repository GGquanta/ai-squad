# AGENTS.md — ai-squad

## 项目概述

「中科国光 · AI 研究小组」团队展示单页站点。内容为团队介绍、职责、六大产品、愿景与招聘培养信息；工程目标是可本地开发、可 Cloudflare 部署的静态 SPA。

## 技术栈约定

- Vite 8 + React 19 + TypeScript（strict）
- Tailwind CSS 4（`@tailwindcss/vite`）
- Framer Motion 12：仅用 opacity / transform；**禁止** `layout` / `layoutId` / `popLayout`
- 字体：`@fontsource/dm-sans` + `@fontsource/dm-mono`（索引 / 标签 / 大数字） + `@fontsource/noto-sans-sc`
- 粒子：自研 Canvas 组件，不引入 three.js
- 部署：`wrangler.jsonc` + `npm run deploy`

## 目录索引

| 路径 | 用途 |
| --- | --- |
| `docs/PRD.md` | 需求与验收 |
| `docs/DESIGN.md` | 视觉与动效规范 |
| `docs/ARCHITECTURE.md` | 架构与部署 |
| `src/data/content.ts` | **全部文案与产品数据** |
| `src/styles/tokens.css` | 设计 token |
| `src/components/sections/` | 页面区块 |
| `public/icons/` | 产品图标（可替换占位图） |

## 规范驱动开发（SDD）

1. 新需求 / 改功能：先更新 `docs/PRD.md`（涉及视觉则同步 `docs/DESIGN.md`）
2. 文案变更：只改 `src/data/content.ts`，组件不写死长文案
3. 设计值变更：只改 `src/styles/tokens.css`
4. 实现后：`npm run build` 与 `npm run lint` 通过，并核对文档与实现一致

## 编码约定

- 路径别名：`@/` → `src/`
- Commit message **必须使用中文**
- 中文文案使用「」引号；数字优先 `tabular-nums`
- `prefers-reduced-motion` 下入场与粒子必须降级 / no-op
- 不要把密钥、客户敏感信息写入仓库

## 禁止事项

- 不要整站克隆某一获奖站审美；浅色克制，拒绝紫渐变模板感
- 不要在组件内硬编码大段产品介绍
- 不要为动效引入过重 3D 依赖
- 不要跳过文档直接大改信息架构

## 开发命令

```bash
npm install
npm run dev
npm run build
npm run lint
npm run deploy
```
