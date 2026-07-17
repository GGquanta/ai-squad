/**
 * 自绘 line 风格图标集：24 网格、1.5px 描边、currentColor。
 * 不引入通用图标库，保持笔触与品牌线稿一致。
 */

type IconProps = {
  className?: string
}

function base(className?: string) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  } as const
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4.5 12h14" />
      <path d="m13.5 7 5 5-5 5" />
    </svg>
  )
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  )
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

/** 交叉融合：双圆相交 */
export function IconVenn({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="9.25" cy="12" r="5.75" />
      <circle cx="14.75" cy="12" r="5.75" opacity="0.55" />
    </svg>
  )
}

/** 可信可溯：盾形 + 对勾 */
export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3.5 5 6.2v5.2c0 4.4 2.9 7.3 7 9.1 4.1-1.8 7-4.7 7-9.1V6.2L12 3.5Z" />
      <path d="m9 12 2.2 2.2 3.8-4.4" />
    </svg>
  )
}

/** 开放共建：三节点网络 */
export function IconNodes({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="6" cy="7" r="2.1" />
      <circle cx="18" cy="7" r="2.1" />
      <circle cx="12" cy="17.5" r="2.1" />
      <path d="M8.2 7h7.6" />
      <path d="m7.1 8.9 3.9 6.7" />
      <path d="m16.9 8.9-3.9 6.7" />
    </svg>
  )
}

/** GitHub 协作：分支 */
export function IconBranch({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="6.5" cy="6" r="2.4" />
      <circle cx="6.5" cy="18" r="2.4" />
      <circle cx="17.5" cy="7.5" r="2.4" />
      <path d="M6.5 8.4v7.2" />
      <path d="M17.5 9.9a8.6 8.6 0 0 1-8.4 6.6" />
    </svg>
  )
}

/** AI 协同：四角星光 */
export function IconSpark({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M11 5.2c.55 4.1 2.75 6.3 6.85 6.85-4.1.55-6.3 2.75-6.85 6.85-.55-4.1-2.75-6.3-6.85-6.85 4.1-.55 6.3-2.75 6.85-6.85Z" />
      <path d="M18.6 3.4v4" />
      <path d="M16.6 5.4h4" />
    </svg>
  )
}

/** 成果演示：幕布 + 折线 */
export function IconPresent({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M3.5 4.5h17" />
      <path d="M5.5 4.5v9a1.6 1.6 0 0 0 1.6 1.6h9.8a1.6 1.6 0 0 0 1.6-1.6v-9" />
      <path d="m8.5 11.4 2.2-2.3 1.8 1.8 3-3.2" />
      <path d="m8.5 20.5 3.5-4 3.5 4" />
    </svg>
  )
}

/** 开源回馈：OSI 式钥匙圆环 */
export function IconOpenSource({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3.5a8.5 8.5 0 0 1 3.15 16.4l-1.98-5.06a3.1 3.1 0 1 0-2.34 0L8.85 19.9A8.5 8.5 0 0 1 12 3.5Z" />
    </svg>
  )
}

/** 品牌记号：量子轨道 + 光子核 */
export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <ellipse
        cx="14"
        cy="14"
        rx="11"
        ry="4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(-28 14 14)"
        opacity="0.9"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="11"
        ry="4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(62 14 14)"
        opacity="0.38"
      />
      <circle cx="14" cy="14" r="2.7" fill="var(--photon, #12b5f5)" />
      <circle cx="23.6" cy="8.9" r="1.5" fill="currentColor" />
    </svg>
  )
}
