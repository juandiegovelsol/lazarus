"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = exports.RoleManager = void 0;
// role-based-permission-control.ts
var PermissionList;
(function (PermissionList) {
    PermissionList["READ"] = "read";
    PermissionList["DELETE"] = "delete";
    PermissionList["WRITE"] = "write";
})(PermissionList || (PermissionList = {}));
class RoleManager {
    constructor() {
        this.roles = new Map();
        this.log = [];
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
     * @returns The role if found, otherwise throws an error.
     */
    getRole(name) {
        const role = this.roles.get(name);
        if (!role) {
            throw new Error(`Role '${name}' not found`);
        }
        return role;
    }
    /**
     * Deletes a role by its name.
     * @param name The name of the role.
     */
    deleteRole(name) {
        if (!this.roles.has(name)) {
            throw new Error(`Role '${name}' not found`);
        }
        this.roles.delete(name);
        this.log.push(`Role '${name}' deleted`);
    }
    /**
     * Checks if a role has a specific permission.
     * @param roleName The name of the role.
     * @param permission The permission to check.
     * @returns True if the role has the permission, otherwise false.
     */
    hasPermission(roleName, permission) {
        const role = this.getRole(roleName);
        return role.permissions.includes(permission);
    }
    getLog() {
        return this.log;
    }
}
exports.RoleManager = RoleManager;
class UserManager {
    constructor(roleManager) {
        this.users = new Map();
        this.groups = new Map();
        this.log = [];
        this.roleManager = roleManager;
    }
    /**
     * Adds a new user.
     * @param name The name of the user.
     * @param roles The roles of the user.
     */
    addUser(name, roles) {
        const userRoles = roles.map(roleName => this.roleManager.getRole(roleName));
        this.users.set(name, { name, roles: userRoles, groups: [] });
    }
    /**
     * Retrieves a user by its name.
     * @param name The name of the user.
     * @returns The user if found, otherwise throws an error.
     */
    getUser(name) {
        const user = this.users.get(name);
        if (!user) {
            throw new Error(`User '${name}' not found`);
        }
        return user;
    }
    /**
     * Deletes a user by its name.
     * @param name The name of the user.
     */
    deleteUser(name) {
        if (!this.users.has(name)) {
            throw new Error(`User '${name}' not found`);
        }
        this.users.delete(name);
        this.log.push(`User '${name}' deleted`);
    }
    /**
     * Adds a user to a group.
     * @param userName The name of the user.
     * @param groupName The name of the group.
     */
    addUserToGroup(userName, groupName) {
        const user = this.getUser(userName);
        if (!this.groups.has(groupName)) {
            this.groups.set(groupName, { name: groupName, users: [] });
        }
        this.groups.get(groupName).users.push(userName);
        user.groups.push(groupName);
    }
    /**
     * Deletes a group by its name.
     * @param name The name of the group.
     */
    deleteGroup(name) {
        if (!this.groups.has(name)) {
            throw new Error(`Group '${name}' not found`);
        }
        for (const userName of this.groups.get(name).users) {
            this.deleteUser(userName);
        }
        this.groups.delete(name);
        this.log.push(`Group '${name}' deleted`);
    }
    /**
     * Checks if a user has a specific permission.
     * @param userName The name of the user.
     * @param permission The permission to check.
     * @returns True if the user has the permission, otherwise false.
     */
    hasPermission(userName, permission) {
        const user = this.getUser(userName);
        return user.roles.some(role => this.roleManager.hasPermission(role.name, permission));
    }
    getLog() {
        return [...this.log, ...this.roleManager.getLog()];
    }
}
exports.UserManager = UserManager;
