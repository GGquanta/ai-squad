# ARCHITECTURE — 技术架构

## 总览

单页 SPA：Vite 打包静态资源 → Cloudflare Workers/Pages Assets 托管。

```
浏览器
  └─ React App
       ├─ Nav / Footer
       ├─ Sections（Hero…JoinUs）
       ├─ TokenStreamField（Hero Canvas 文本流）
       ├─ ParticleField（愿景区 Canvas 粒子）
       └─ content.ts（数据）
```

## 目录

```
ai-squad/
├── AGENTS.md / README.md
├── docs/
├── public/brand/          # 公司/小组标志（ggquanta、ai-squad）
├── public/icons/          # 产品占位图标
├── src/
│   ├── App.tsx / main.tsx
│   ├── data/content.ts
│   ├── hooks/
│   ├── styles/tokens.css / global.css
│   └── components/
│       ├── effects/TokenStreamField.tsx
│       ├── effects/ParticleField.tsx
│       ├── layout/
│       └── sections/
├── vite.config.ts
└── wrangler.jsonc
```

## 关键约定

- 路径别名 `@` → `src`
- 内容与呈现分离：组件只消费 `content.ts`
- 设计变量集中在 `tokens.css`，Tailwind `@theme` 暴露常用色

## 构建与部署

| 步骤 | 命令 / 配置 |
| --- | --- |
| 开发 | `npm run dev` |
| 构建 | `tsc --noEmit && vite build` → `dist/` |
| 部署 | `wrangler deploy`（`assets.directory: ./dist`，SPA fallback） |

`compatibility_date`: `2026-07-17`

## 性能与可达性注意点

- 字体子集由 `@fontsource` 按字重引入，避免全量中文包膨胀过大（可后续再优化子集）
- 图片目前为 SVG 图标；替换位图时建议提供 2x 并写死宽高
- 锚点导航保留 `scroll-mt` / `scroll-padding-top` 以避开顶栏
- 顶栏：页顶全宽透明；滚动后悬浮药丸；窄屏菜单用同一 `site-nav__shell` 内 `grid-template-rows` 展开（非独立第二卡片）
