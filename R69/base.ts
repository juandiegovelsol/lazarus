export type PermissionList = 'read' | 'delete' | 'write';

export interface Role {
  name: string;
  permissions: PermissionList[];

}

export interface User {
  name: string;
  roles: Role[];


}

class RoleManager {
  private roles: Map<string, Role> = new Map();
  addRole(name: string, permissions: PermissionList[]): void {
    this.roles.set(name, { name, permissions });
  }
  getRole(name: string): Role | undefined {
    return this.roles.get(name);
  }
  hasPermission(roleName: string, permission: PermissionList): boolean {
    const role = this.getRole(roleName);
    return role ? role.permissions.includes(permission) : false;
  }
}

class PermissionManager {
  constructor(private users: User[], private roleManager: RoleManager) {}

  addUser(user: User): void {
    this.users.push(user);
  }

  hasPermission(userName: string, permission: PermissionList): boolean {
    const user = this.users.find(u => u.name === userName);
    if (!user) return false;

    return user.roles.some(role => 
      this.roleManager.hasPermission(role.name, permission)
    );
  }
}

const roleManager = new RoleManager();




roleManager.addRole('admin', ['read', 'write', 'delete']);


roleManager.addRole('editor', ['read', 'write']);
roleManager.addRole('viewer', ['read']);
const users: User[] = [
  { name: 'User1', roles: [roleManager.getRole('admin')!] },
  { name: 'User3', roles: [roleManager.getRole('viewer')!] },
  { name: 'User2', roles: [roleManager.getRole('editor')!] },
];






const permissionManager = new PermissionManager(users, roleManager);
console.log(permissionManager.hasPermission('User1', 'delete'));
console.log(permissionManager.hasPermission('User2', 'delete'));




console.log(permissionManager.hasPermission('User3', 'read'));
