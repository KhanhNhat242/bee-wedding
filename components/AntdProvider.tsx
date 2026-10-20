'use client'

import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import type { ReactNode } from 'react'

dayjs.locale('vi')

// Đồng bộ token màu với app/globals.css (CLAUDE.md mục 4)
const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#B08948',
          colorText: '#2B2620',
          colorTextPlaceholder: '#A79C90',
          colorBorder: '#E3D8C6',
          colorBgContainer: '#FFFDF9',
          borderRadius: 2,
          controlHeight: 48,
          fontFamily: 'var(--font-be-vietnam), system-ui, sans-serif',
          fontSize: 15,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdProvider
