# DESIGN — 视觉与动效规范

## 设计原则

- **浅色友好**：纸感暖白 + 雾灰分区，气质接近 Apple / Airbnb 的留白与克制
- **品牌点缀**：延续国光量子 logo 三蓝，不另起一套紫渐变
- **中文友好**：舒适行高、适中段宽、「」引号、数字等宽
- **动效克制**：服务层级与引导，不浮夸；粒子仅作氛围

## 色板

| Token | Hex | 用途 |
| --- | --- | --- |
| `--paper` | `#FAFAF9` | 主背景 |
| `--mist` | `#F4F6F8` | 交替区背景 |
| `--graphite` | `#0B0D12` | 主文字 |
| `--slate` | `#5B6472` | 次级文字 |
| `--ink-navy` | `#170B66` | 深色标题点缀 |
| `--royal` | `#0A3D9C` | 结构色 / 主按钮 |
| `--photon` | `#12B5F5` | 高亮 / 粒子 |

禁止：大面积紫色渐变、过重玻璃拟态、霓虹发光堆叠。

## 字体

- 西文 / 数字：DM Sans
- 中文：Noto Sans SC
- Hero / H2 字重偏半粗，字距微收（约 -0.02em）
- 正文行高约 1.75–1.85

## 布局

- 内容最大宽约 `72rem`（1152px）
- 水平边距 `clamp(1.5rem, 4vw, 2.5rem)`
- 区块垂直间距 `clamp(5.5rem, 12vw, 9rem)`
- 卡片圆角 `1rem`；按钮圆角 `0.625rem`

## 动效

- 签名缓动：`cubic-bezier(0.22, 1, 0.36, 1)`
- 入场：opacity + translateY(16px)，约 560ms，IntersectionObserver 触发一次
- Hover：约 160ms，轻微上移 + 阴影
- **禁止** Framer Motion `layout` / `layoutId`（团队已知坑）
- `prefers-reduced-motion: reduce`：入场直接显示，粒子不渲染

## 粒子

- 仅 Hero、愿景区
- 品牌蓝低透明度光点 + 近距细线
- 移动端与不可见标签页暂停 / 不启用
- DPR 上限 2；密度按面积自适应
