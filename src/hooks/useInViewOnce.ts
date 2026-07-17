import { useEffect, useRef, useState, type RefObject } from 'react'

/** 元素进入视口后触发一次，用于入场动效 */
export function useInViewOnce<T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12, ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options, visible])

  return [ref, visible]
}
