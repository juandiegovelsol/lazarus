import Role from './role';

export interface User {
  name: string;
  roles: Role[];
}