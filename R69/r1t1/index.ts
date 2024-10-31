import RoleManager from './role';
import PermissionManager from './permission-manager';
import { User } from './user';
import { PermissionList } from './role';

const roleManager = new RoleManager();

roleManager.addRole('admin', ['read', 'write', 'delete']);
roleManager.addRole('editor', ['read', 'write']);
roleManager.addRole('viewer', ['read']);

const users: User[] = [
  { 
    name: 'User1', 
    roles: [roleManager.getRole('admin') ?? { name: 'unknown', permissions: [] }] 
  },
  { 
    name: 'User3', 
    roles: [roleManager.getRole('viewer') ?? { name: 'unknown', permissions: [] }] 
  },
  { 
    name: 'User2', 
    roles: [roleManager.getRole('editor') ?? { name: 'unknown', permissions: [] }] 
  },
];

const permissionManager = new PermissionManager(users, roleManager);

console.log(permissionManager.hasPermission('User1', 'delete')); // true
console.log(permissionManager.hasPermission('User2', 'delete')); // false
console.log(permissionManager.hasPermission('User3', 'delete')); // true