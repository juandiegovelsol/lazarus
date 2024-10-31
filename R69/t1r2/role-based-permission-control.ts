// role-based-permission-control.ts
export type PermissionList = 'read' | 'delete' | 'write';

export interface Role {
  name: string;
  permissions: PermissionList[];
}

export interface User {
  name: string;
  roles: Role[];
}

export class RoleManager {
  private roles: Map<string, Role> = new Map();

  /**
   * Adds a new role with the given name and permissions.
   * @param name The name of the role.
   * @param permissions The permissions of the role.
   */
  addRole(name: string, permissions: PermissionList[]): void {
    this.roles.set(name, { name, permissions });
  }

  /**
   * Retrieves a role by its name.
   * @param name The name of the role.
   * @returns The role if found, otherwise undefined.
   */
  getRole(name: string): Role | undefined {
    return this.roles.get(name);
  }

  /**
   * Checks if a role has a specific permission.
   * @param roleName The name of the role.
   * @param permission The permission to check.
   * @returns True if the role has the permission, otherwise false.
   */
  hasPermission(roleName: string, permission: PermissionList): boolean {
    const role = this.getRole(roleName);
    return role ? role.permissions.includes(permission) : false;
  }
}

export class PermissionManager {
  constructor(private users: User[], private roleManager: RoleManager) {}

  /**
   * Adds a new user.
   * @param user The user to add.
   */
  addUser(user: User): void {
    this.users.push(user);
  }

  /**
   * Checks if a user has a specific permission.
   * @param userName The name of the user.
   * @param permission The permission to check.
   * @returns True if the user has the permission, otherwise false.
   */
  hasPermission(userName: string, permission: PermissionList): boolean {
    const user = this.users.find(u => u.name === userName);
    if (!user) return false;

    return user.roles.some(role =>
      this.roleManager.hasPermission(role.name, permission)
    );
  }
}