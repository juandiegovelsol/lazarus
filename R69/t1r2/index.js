"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const role_based_permission_control_1 = require("./role-based-permission-control");
const roleManager = new role_based_permission_control_1.RoleManager();
roleManager.addRole('admin', ['read', 'write', 'delete']);
roleManager.addRole('editor', ['read', 'write']);
roleManager.addRole('viewer', ['read']);
const users = [
    {
        name: 'User1',
        roles: [(_a = roleManager.getRole('admin')) !== null && _a !== void 0 ? _a : { name: 'unknown', permissions: [] }],
    },
    {
        name: 'User3',
        roles: [(_b = roleManager.getRole('viewer')) !== null && _b !== void 0 ? _b : { name: 'unknown', permissions: [] }],
    },
    {
        name: 'User2',
        roles: [(_c = roleManager.getRole('editor')) !== null && _c !== void 0 ? _c : { name: 'unknown', permissions: [] }],
    },
];
const permissionManager = new role_based_permission_control_1.PermissionManager(users, roleManager);
console.log(permissionManager.hasPermission('User1', 'delete')); // true
console.log(permissionManager.hasPermission('User2', 'delete')); // false
console.log(permissionManager.hasPermission('User3', 'read')); // true
