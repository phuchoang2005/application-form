'use client'

import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link href={'/'}>HomePage</Link >,
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: <Link href={'/users'}>Manage Users</Link >,
    key: 'user',
    icon: <MailOutlined />,
  },
  {
    label: <Link href={'/blogs'}>Manage Blogs</Link >,
    key: 'app',
    icon: <AppstoreOutlined />,
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default App;
