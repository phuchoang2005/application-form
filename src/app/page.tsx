'use client'

import { Typography } from 'antd';
import UserManager from './components/UserManager';

export default function Home() {
  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px' }}>
      <section aria-labelledby="users-heading">
        <Typography.Title id="users-heading" level={1} style={{ marginBottom: 4 }}>
          Users
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          Create and manage the users in your application.
        </Typography.Paragraph>
      </section>
      <UserManager />
    </main>
  );
}
