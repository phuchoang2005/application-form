import type { IUser } from '../types/backend';

const USERS_API_URL = 'http://localhost:8000/users';

export interface CreateUserPayload {
  name: string;
  email: string;
}

const request = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('The request could not be completed. Please try again.');
  }

  return response;
};

export const getUsers = async () => {
  const response = await request(USERS_API_URL);

  return (await response.json()) as IUser[];
};

export const createUser = (user: CreateUserPayload) =>
  request(USERS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

export const deleteUser = (id: IUser['id']) =>
  request(`${USERS_API_URL}/${id}`, { method: 'DELETE' });
