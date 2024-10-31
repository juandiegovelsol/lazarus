"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PermissionManager {
    constructor(users, roleManager) {
        this.users = users;
        this.roleManager = roleManager;
    }
    addUser(user) {
        this.users.push(user);
    }
    hasPermission(userName, permission) {
        const user = this.users.find(u => u.name === userName);
        if (!user)
            return false;
        return user.roles.some(role => this.roleManager.hasPermission(role.name, permission));
    }
}
exports.default = PermissionManager;
