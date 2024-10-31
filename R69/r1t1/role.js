"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoleManager {
    constructor() {
        this.roles = new Map();
    }
    addRole(name, permissions) {
        this.roles.set(name, { name, permissions });
    }
    getRole(name) {
        return this.roles.get(name);
    }
    hasPermission(roleName, permission) {
        const role = this.getRole(roleName);
        return role ? role.permissions.includes(permission) : false;
    }
}
exports.default = RoleManager;
