'use client'

import { Button, Form, Input } from 'antd';
import type { CreateUserPayload } from './user-api';

interface CreateUserFormProps {
  isSubmitting: boolean;
  onSubmit: (values: CreateUserPayload) => Promise<boolean>;
}

export default function CreateUserForm({ isSubmitting, onSubmit }: CreateUserFormProps) {
  const [form] = Form.useForm<CreateUserPayload>();

  const handleSubmit = async (values: CreateUserPayload) => {
    if (await onSubmit(values)) {
      form.resetFields();
    }
  };

  return (
    <Form<CreateUserPayload>
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 640 }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, whitespace: true, message: 'Enter a user name.' }]}
      >
        <Input autoComplete="name" placeholder="e.g. Ada Lovelace" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Enter an email address.' },
          { type: 'email', message: 'Enter a valid email address.' },
        ]}
      >
        <Input autoComplete="email" inputMode="email" placeholder="ada@example.com" />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Create user
        </Button>
      </Form.Item>
    </Form>
  );
}
