'use client'

import { Button, Popconfirm, Table } from 'antd';
import type { TableProps } from 'antd';
import type { IUser } from '../types/backend';

interface UsersListProps {
  users: IUser[];
  isLoading: boolean;
  deletingUserId: IUser['id'] | null;
  onDelete: (user: IUser) => Promise<void>;
}

export default function UsersList({
  users,
  isLoading,
  deletingUserId,
  onDelete,
}: UsersListProps) {
  const columns: TableProps<IUser>['columns'] = [
    { title: 'ID', dataIndex: 'id', width: 90 },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, user) => (
        <Popconfirm
          title={`Delete ${user.name}?`}
          description="This action cannot be undone."
          okText="Delete user"
          okButtonProps={{ danger: true, loading: deletingUserId === user.id }}
          cancelText="Cancel"
          onConfirm={() => onDelete(user)}
        >
          <Button
            danger
            loading={deletingUserId === user.id}
            disabled={deletingUserId !== null && deletingUserId !== user.id}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table<IUser>
      bordered
      columns={columns}
      dataSource={users}
      loading={isLoading}
      pagination={false}
      rowKey="id"
      style={{ marginTop: 16 }}
    />
  );
}
