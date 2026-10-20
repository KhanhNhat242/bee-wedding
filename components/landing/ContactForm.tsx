'use client'

import { Button, DatePicker, Form, Input, message } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'

type FormValues = {
  name: string
  phone: string
  weddingDate?: Dayjs
}

// Form demo: chưa có backend (REQUIREMENTS.md mục 9.4).
// TODO(sale): xác nhận nơi nhận thông tin (email / Google Sheet / Zalo OA) rồi nối API thật.
const ContactForm = () => {
  const [form] = Form.useForm<FormValues>()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = () => {
    messageApi.success('Cảm ơn bạn! Bee Wedding sẽ liên hệ lại trong thời gian sớm nhất.')
    form.resetFields()
  }

  return (
    <>
      {contextHolder}
      <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish} size="large">
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
          <Input placeholder="Nguyễn Văn A" autoComplete="name" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            { pattern: /^0\d{9}$/, message: 'Số điện thoại gồm 10 số, bắt đầu bằng 0' },
          ]}
        >
          <Input placeholder="09xx xxx xxx" inputMode="tel" autoComplete="tel" />
        </Form.Item>
        <Form.Item name="weddingDate" label="Ngày dự kiến cưới">
          <DatePicker
            className="w-full"
            format="DD/MM/YYYY"
            placeholder="Chọn ngày"
            disabledDate={(d) => d.isBefore(dayjs(), 'day')}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block className="mt-2 h-13! tracking-[0.2em] uppercase">
          Gửi yêu cầu tư vấn
        </Button>
      </Form>
    </>
  )
}

export default ContactForm
