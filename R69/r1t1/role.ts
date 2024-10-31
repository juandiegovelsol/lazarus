export type PermissionList = 'read' | 'delete' | 'write';

export interface Role {
  name: string;
  permissions: PermissionList[];
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

export default RoleManager;