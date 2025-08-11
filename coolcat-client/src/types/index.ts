import type { components } from '@/types/api';

type schemas = components['schemas']

// users
export type UserEntity = schemas['UserEntity'];
export type CreateUserDto = schemas['CreateUserDto'];
export type UpdateUserDto = schemas['UpdateUserDto'];
