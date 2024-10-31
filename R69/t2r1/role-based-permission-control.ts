// role-based-permission-control.ts
export enum PermissionList {
  READ = 'read',
  DELETE = 'delete',
  WRITE = 'write',
}

/**
 * Represents a role with a name and its associated permissions.
 */
export interface Role {
  name: string;
  permissions: PermissionList[];
}

/**
 * Represents a user with a name and their associated roles.
 */
export interface User {
  name: string;
  roles: Role[];
  groups: string[];
}

/**
 * Represents a group with a name and its associated users.
 */
export interface Group {
  name: string;
  users: User[];
}

export class RoleManager {
  private roles: Map<string, Role> = new Map();
  private deleteLog: string[] = [];

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
   * @returns The role if found.
   * @throws Error if the role is not found.
   */
  getRole(name: string): Role {
    const role = this.roles.get(name);
    if (!role) {
      throw new Error(`Role '${name}' not found.`);
    }
    return role;
  }

  /**
   * Checks if a role has a specific permission.
   * @param roleName The name of the role.
   * @param permission The permission to check.
   * @returns True if the role has the permission, otherwise false.
   * @throws Error if the role is not found.
   */
  hasPermission(roleName: string, permission: PermissionList): boolean {
    const role = this.getRole(roleName);
    return role.permissions.includes(permission);
  }

  /**
   * Deletes a role by its name.
   * @param name The name of the role.
   * @throws Error if the role is not found.
   */
  deleteRole(name: string, permissionManager: PermissionManager): void {
    if (!this.roles.has(name)) {
      throw new Error(`Role '${name}' not found.`);
    }
    this.roles.delete(name);
    this.deleteLog.push(`Role '${name}' deleted.`);

    // Remove this role from all users in PermissionManager.
    permissionManager.removeRoleFromUsers(name);
  }

  /**
   * Retrieves the delete log.
   * @returns An array of deletion log entries.
   */
  getDeleteLog(): string[] {
    return this.deleteLog;
  }
}

export class PermissionManager {
  private users: Map<string, User> = new Map();
  private groups: Map<string, Group> = new Map();
  private deleteLog: string[] = [];

  constructor(private roleManager: RoleManager) { }

  /**
   * Adds a new user.
   * @param user The user to add.
   */
  addUser(user: User): void {
    this.users.set(user.name, user);
  }

  /**
   * Retrieves a user by their name.
   * @param name The name of the user.
   * @returns The user if found.
   * @throws Error if the user is not found.
   */
  getUser(name: string): User {
    const user = this.users.get(name);
    if (!user) {
      throw new Error(`User '${name}' not found.`);
    }
    return user;
  }

  /**
   * Checks if a user has a specific permission.
   * @param userName The name of the user.
   * @param permission The permission to check.
   * @returns True if the user has the permission, otherwise false.
   * @throws Error if the user is not found.
   */
  hasPermission(userName: string, permission: PermissionList): boolean {
    const user = this.getUser(userName);
    return user.roles.some(role =>
      this.roleManager.hasPermission(role.name, permission)
    );
  }

  /**
   * Deletes a user by their name.
   * @param name The name of the user.
   * @throws Error if the user is not found.
   */
  deleteUser(name: string): void {
    if (!this.users.has(name)) {
      throw new Error(`User '${name}' not found.`);
    }
    this.users.delete(name);
    this.groups.forEach(group => {
      const index = group.users.findIndex(user => user.name === name);
      if (index !== -1) {
        group.users.splice(index, 1);
      }
    });
    this.deleteLog.push(`User '${name}' deleted.`);
  }

  /**
   * Adds a new group.
   * @param name The name of the group.
   */
  addGroup(name: string): void {
    this.groups.set(name, { name, users: [] });
  }

  /**
   * Retrieves a group by its name.
   * @param name The name of the group.
   * @returns The group if found.
   * @throws Error if the group is not found.
   */
  getGroup(name: string): Group {
    const group = this.groups.get(name);
    if (!group) {
      throw new Error(`Group '${name}' not found.`);
    }
    return group;
  }

  /**
   * Adds a user to a group.
   * @param groupName The name of the group.
   * @param userName The name of the user.
   * @throws Error if the user or group is not found.
   */
  addUserToGroup(groupName: string, userName: string): void {
    const group = this.getGroup(groupName);
    const user = this.getUser(userName);
    group.users.push(user);
    user.groups.push(groupName);
  }

  /**
   * Deletes a group by its name.
   * @param name The name of the group.
   * @throws Error if the group is not found.
   */
  deleteGroup(name: string): void {
    if (!this.groups.has(name)) {
      throw new Error(`Group '${name}' not found.`);
    }
    const group = this.getGroup(name);
    group.users.forEach(user => {
      const index = user.groups.findIndex(groupName => groupName === name);
      if (index !== -1) {
        user.groups.splice(index, 1);
      }
      this.deleteUser(user.name);
    });
    this.groups.delete(name);
    this.deleteLog.push(`Group '${name}' deleted.`);
  }

  /**
   * Removes a role from all users.
   * @param roleName The name of the role to remove.
   */
  removeRoleFromUsers(roleName: string): void {
    this.users.forEach(user => {
      user.roles = user.roles.filter(role => role.name !== roleName);
    });
  }

  /**
   * Retrieves the delete log.
   * @returns An array of deletion log entries.
   */
  getDeleteLog(): string[] {
    return this.deleteLog;
  }
}

