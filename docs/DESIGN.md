# DESIGN — 视觉与动效规范

## 设计方向

**纸感编辑部 × 量子蓝图**：浅色纸感底 + 编辑部式版式节奏（mono 索引、发丝线、大留白），品牌三蓝为唯一色彩系统，克制的粒子与渐变提供量子科技氛围。

调研结论（steal / reject）：

- **Steal**：类型即主角（超大标题、极少字号档位）；`01` 编辑式 mono 索引；发丝线代替重阴影承担层级；单色底 + 一个强调色克制使用；柔和错峰的入场节奏；等权重产品网格；约 160ms 微交互。
- **Reject**：紫渐变模板感、重玻璃拟态、WebGL / 3D、marquee 跑马灯、深色优先、散落各处的动效脚本。

## 设计原则

- **浅色友好**：纸感暖白 + 雾灰分区，气质接近 Apple / Airbnb 的留白与克制
- **品牌点缀**：延续国光量子 logo 三蓝，不另起一套紫渐变
- **中文友好**：舒适行高、适中段宽、「」引号、数字等宽
- **动效克制**：服务层级与引导，不浮夸；粒子仅作氛围
- **一处点睛**：全页唯一深色区块为结尾 CTA 横幅（navy → royal 渐变）

## 色板

| Token | Hex | 用途 |
| --- | --- | --- |
| `--paper` | `#FAFAF9` | 主背景 |
| `--mist` | `#F4F6F8` | 交替区背景 |
| `--graphite` | `#0B0D12` | 主文字 |
| `--slate` | `#5B6472` | 次级文字 |
| `--ink-navy` | `#170B66` | 深色标题点缀 / 横幅渐变起点 |
| `--royal` | `#0A3D9C` | 结构色 / 主按钮 |
| `--photon` | `#12B5F5` | 高亮 / 粒子 / 索引 hover |

渐变 token：

- `--grad-ink-text`：navy → royal → 微量浅蓝，仅用于 Hero 第二行标题墨字
- `--grad-deep-band`：深海蓝底（#0A1338 → #0D2F7A，无紫味）+ photon / royal 双侧径向光晕，仅用于结尾 CTA 横幅
- `--grad-hero-glow`：photon 低透明径向光 + paper → mist 纵向过渡

禁止：大面积紫色渐变、过重玻璃拟态、霓虹发光堆叠。

## 层级体系（发丝线优先）

- `--hairline` `rgba(11,13,18,0.08)` / `--hairline-strong` `0.16` / `--hairline-royal` `rgba(10,61,156,0.22)`
- 卡片基底 `.card`：白底 + 1px 发丝线 + `--card-radius`；阴影仅作辅助（`--shadow-soft` / `--shadow-lift`）
- 产品卡 hover 使用 `.gradient-ring`：photon → royal → navy 渐变描边显现
- 全站固定胶片噪点层（feTurbulence data-URI，透明度约 2.6%，静态不随滚动）

## 字体

- 西文 / 数字：DM Sans；中文：Noto Sans SC；索引 / 标签 / 大数字：DM Mono
- 类型档位：`--size-display`（Hero，clamp 2.8–5.25rem）、`--size-h2`（1.9–2.8rem）、`--size-lede`（愿景关键句）、`--size-body`、`--size-mono-label`（0.75rem）
- Display / H2 字距约 -0.025 ~ -0.035em；正文行高约 1.75–1.9
- mono 索引系统：区块头 `01 + eyebrow + 延伸发丝线`；行列表、岗位卡、移动菜单均复用 mono 序号

## 布局

- 内容最大宽约 `72rem`（1152px）；水平边距 `clamp(1.25rem, 4vw, 2.5rem)`
- 区块垂直间距 `clamp(6rem, 12vw, 9.5rem)`
- 区块头部：桌面端标题左 / 导语右的编辑式双栏，移动端顺排
- 卡片圆角 `1rem`；按钮圆角 `0.625rem`；CTA 横幅圆角 `1.25rem`
- 职责区为编辑式索引行列表（非卡片），发丝行分隔
- 团队诙谐段落为白底引言卡：大号「 装饰 + `.hl-note` 荧光笔注记（photon 淡彩下划高亮，不用括号）

## 按钮体系

- 统一 `.btn` 基类（高 2.9rem、圆角 `--btn-radius`），hover 上浮 1.5px、active 回落按压
- `.btn-primary`：royal 纵向渐变 + 顶部内高光 + royal 投影，hover 提亮
- `.btn-secondary`：白 → 雾灰双层渐变 + 发丝线描边，hover 转 royal 边与字色
- `.btn-inverse`：白底反色（文字 navy），仅深色 CTA 横幅使用，hover 带 photon 泛光
- 不使用纯平面单色按钮；主按钮内箭头 hover 右移 0.5

## 图标

- 界面图标：自绘 line 风格（24 网格、1.5px 描边、currentColor），见 `src/components/icons.tsx`
- 产品图标：`public/icons/{id}.png`（256²，卡片内 96×96 展示；中英文名位于图标右侧）
- 小组标志 `LogoMark`：`public/brand/ai-squad.png`（Nav / Footer 品牌行 / favicon）
- 公司标志 `CompanyMark`：`public/brand/ggquanta.svg`（Footer 公司名旁）

## 动效

- 签名缓动：`cubic-bezier(0.22, 1, 0.36, 1)`
- Hero：标题逐行遮罩上升（约 900ms、错峰 100ms），其余元素淡入上移错峰；底部滚动指示线循环提示
- Hero 右侧「量子核」：自研 Canvas 伪 3D（fibonacci 点阵球 + 三轨道环 + 游动光子），缓慢自转 + 指针倾斜视差；lg 以下隐藏，离屏暂停，reduced-motion 呈静态帧；不引入 three.js
- 入场：opacity + translateY(14–16px)，约 560–700ms，IntersectionObserver 触发一次
- Hover：约 160ms；行列表 hover 位移 + 序号变 photon + 行尾箭头浮现；按钮箭头微位移
- Nav：当前区块 photon 下划线（IntersectionObserver），底缘 royal → photon 滚动进度线（rAF 节流）
- 愿景区量子轨道 SVG 缓慢自转（72s 线性循环）
- **禁止** Framer Motion `layout` / `layoutId`（团队已知坑）
- `prefers-reduced-motion: reduce`：入场直接显示，粒子不渲染，呼吸点 / 滚动线 / 轨道自转 / 菜单错峰全部 no-op

## 粒子

- 仅 Hero、愿景区（愿景区密度约为 Hero 一半，透明度更低）
- 品牌蓝光点（photon ↔ royal 逐粒插值）+ 近距细线；画布边缘渐隐
- 空间网格近邻查找连线；指针轻微斥力（仅桌面，扰动后回归基础漂移）
- 移动端与 `prefers-reduced-motion` 不启用；离屏与不可见标签页暂停
- DPR 上限 2；密度按面积自适应

## 深色 CTA 横幅（唯一深色区块）

- 背景 `--grad-deep-band`（深海蓝底 + 双侧光晕）+ 白色微点阵（mask 渐隐）+ 顶缘 1px 白色微光边
- 编辑式布局：左侧 mono 标签 + 标题 + 说明，右侧 `.btn-inverse` 按钮；移动端顺排左对齐
- 文字用 `--band-text` / `--band-text-dim`
- 不得在其他区块复用深色底
