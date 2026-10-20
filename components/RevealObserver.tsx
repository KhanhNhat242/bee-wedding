'use client'

import { useEffect } from 'react'

// Gắn class .is-revealed cho mọi phần tử [data-reveal] khi cuộn tới (CSS trong globals.css).
// Theo dõi cả phần tử được thêm sau (vd. lưới ảnh đổi tab) qua MutationObserver.
// Đặt ở CUỐI mỗi page (không đặt ở layout): effect chỉ chạy sau khi nội dung trang hydrate xong,
// nếu không class .is-revealed thêm sớm sẽ gây hydration mismatch.
const RevealObserver = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
          } else if (entry.boundingClientRect.top > 0) {
            // Chỉ ẩn lại khi phần tử rơi xuống dưới màn hình, để cuộn xuống lần nữa vẫn có hiệu ứng
            el.classList.remove('is-revealed')
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => io.observe(el))
    }
    observe(document)

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.hasAttribute('data-reveal')) io.observe(node)
          observe(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}

export default RevealObserver
