import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import Header from './components/Header'

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Header />
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
)

export default RootLayout;
