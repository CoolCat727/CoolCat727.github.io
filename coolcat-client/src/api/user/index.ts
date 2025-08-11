import api from '@/api';
import type { components } from '@/types/api';

type UserEntity = components['schemas']['UserEntity'];
type CreateUserDto = components['schemas']['CreateUserDto'];
type UpdateUserDto = components['schemas']['UpdateUserDto'];

export const apiUserCreate = async (userData: CreateUserDto): Promise<UserEntity> => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const apiUserGet = async (userId: string | number): Promise<UserEntity> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const apiUserUpdate = async (
  userId: string | number,
  userData: UpdateUserDto
): Promise<UserEntity> => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const apiUserDelete = async (userId: string | number): Promise<UserEntity> => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const apiUserList = async (): Promise<UserEntity[]> => {
  const response = await api.get('/users');
  return response.data;
};
