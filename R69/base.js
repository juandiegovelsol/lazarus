"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleManager = /** @class */ (function () {
    function RoleManager() {
        this.roles = new Map();
    }
    RoleManager.prototype.addRole = function (name, permissions) {
        this.roles.set(name, { name: name, permissions: permissions });
    };
    RoleManager.prototype.getRole = function (name) {
        return this.roles.get(name);
    };
    RoleManager.prototype.hasPermission = function (roleName, permission) {
        var role = this.getRole(roleName);
        return role ? role.permissions.includes(permission) : false;
    };
    return RoleManager;
}());
var PermissionManager = /** @class */ (function () {
    function PermissionManager(users, roleManager) {
        this.users = users;
        this.roleManager = roleManager;
    }
    PermissionManager.prototype.addUser = function (user) {
        this.users.push(user);
    };
    PermissionManager.prototype.hasPermission = function (userName, permission) {
        var _this = this;
        var user = this.users.find(function (u) { return u.name === userName; });
        if (!user)
            return false;
        return user.roles.some(function (role) {
            return _this.roleManager.hasPermission(role.name, permission);
        });
    };
    return PermissionManager;
}());
var roleManager = new RoleManager();
roleManager.addRole('admin', ['read', 'write', 'delete']);
roleManager.addRole('editor', ['read', 'write']);
roleManager.addRole('viewer', ['read']);
var users = [
    { name: 'User1', roles: [roleManager.getRole('admin')] },
    { name: 'User3', roles: [roleManager.getRole('viewer')] },
    { name: 'User2', roles: [roleManager.getRole('editor')] },
];
var permissionManager = new PermissionManager(users, roleManager);
console.log(permissionManager.hasPermission('User1', 'delete'));
console.log(permissionManager.hasPermission('User2', 'delete'));
console.log(permissionManager.hasPermission('User3', 'read'));
