"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionManager = exports.RoleManager = void 0;
class RoleManager {
    constructor() {
        this.roles = new Map();
    }
    /**
     * Adds a new role with the given name and permissions.
     * @param name The name of the role.
     * @param permissions The permissions of the role.
     */
    addRole(name, permissions) {
        this.roles.set(name, { name, permissions });
    }
    /**
     * Retrieves a role by its name.
     * @param name The name of the role.
     * @returns The role if found, otherwise undefined.
     */
    getRole(name) {
        return this.roles.get(name);
    }
    /**
     * Checks if a role has a specific permission.
     * @param roleName The name of the role.
     * @param permission The permission to check.
     * @returns True if the role has the permission, otherwise false.
     */
    hasPermission(roleName, permission) {
        const role = this.getRole(roleName);
        return role ? role.permissions.includes(permission) : false;
    }
}
exports.RoleManager = RoleManager;
class PermissionManager {
    constructor(users, roleManager) {
        this.users = users;
        this.roleManager = roleManager;
    }
    /**
     * Adds a new user.
     * @param user The user to add.
     */
    addUser(user) {
        this.users.push(user);
    }
    /**
     * Checks if a user has a specific permission.
     * @param userName The name of the user.
     * @param permission The permission to check.
     * @returns True if the user has the permission, otherwise false.
     */
    hasPermission(userName, permission) {
        const user = this.users.find(u => u.name === userName);
        if (!user)
            return false;
        return user.roles.some(role => this.roleManager.hasPermission(role.name, permission));
    }
}
exports.PermissionManager = PermissionManager;
