'use client'

import { useEffect, useState } from 'react';
import { Alert, Button, Space, Typography, message } from 'antd';
import type { IUser } from '../types/backend';
import CreateUserForm from './CreateUserForm';
import UsersList from './UsersList';
import {
  createUser,
  deleteUser,
  getUsers,
  type CreateUserPayload,
} from './user-api';

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export default function UserManager() {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<IUser['id'] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadUsers = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      setUsers(await getUsers());
    } catch (error) {
      setLoadError(getErrorMessage(error, 'Unable to load users. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;

    void getUsers()
      .then((data) => {
        if (isCurrent) {
          setUsers(data);
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setLoadError(getErrorMessage(error, 'Unable to load users. Please try again.'));
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleCreate = async (values: CreateUserPayload) => {
    setIsCreating(true);

    try {
      await createUser(values);
      messageApi.success('User created.');
      await loadUsers();
      return true;
    } catch (error) {
      messageApi.error(getErrorMessage(error, 'Unable to create user. Please try again.'));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (user: IUser) => {
    setDeletingUserId(user.id);

    try {
      await deleteUser(user.id);
      messageApi.success(`${user.name} was deleted.`);
      await loadUsers();
    } catch (error) {
      messageApi.error(getErrorMessage(error, 'Unable to delete user. Please try again.'));
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <>
      {messageContextHolder}
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <section aria-labelledby="create-user-heading">
          <Typography.Title id="create-user-heading" level={2}>
            Create user
          </Typography.Title>
          <CreateUserForm isSubmitting={isCreating} onSubmit={handleCreate} />
        </section>

        <section aria-labelledby="user-list-heading">
          <Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Title id="user-list-heading" level={2} style={{ marginBottom: 0 }}>
              All users
            </Typography.Title>
            <Button onClick={() => void loadUsers()} loading={isLoading}>
              Refresh
            </Button>
          </Space>
          {loadError ? (
            <Alert
              showIcon
              type="error"
              message="Users could not be loaded"
              description={loadError}
              action={<Button size="small" onClick={() => void loadUsers()}>Retry</Button>}
              style={{ marginTop: 16 }}
            />
          ) : (
            <UsersList
              users={users}
              isLoading={isLoading}
              deletingUserId={deletingUserId}
              onDelete={handleDelete}
            />
          )}
        </section>
      </Space>
    </>
  );
}
