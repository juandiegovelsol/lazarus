"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const role_based_permission_control_1 = require("./role-based-permission-control");
const roleManager = new role_based_permission_control_1.RoleManager();
const permissionManager = new role_based_permission_control_1.PermissionManager(roleManager);
// Add 3 roles with different permissions.
roleManager.addRole('admin', [role_based_permission_control_1.PermissionList.READ, role_based_permission_control_1.PermissionList.WRITE, role_based_permission_control_1.PermissionList.DELETE]);
roleManager.addRole('editor', [role_based_permission_control_1.PermissionList.READ, role_based_permission_control_1.PermissionList.WRITE]);
roleManager.addRole('viewer', [role_based_permission_control_1.PermissionList.READ]);
// Add 3 users with different roles.
permissionManager.addUser({
    name: 'User1',
    roles: [roleManager.getRole('admin')],
    groups: [],
});
permissionManager.addUser({
    name: 'User3',
    roles: [roleManager.getRole('viewer')],
    groups: [],
});
permissionManager.addUser({
    name: 'User2',
    roles: [roleManager.getRole('editor')],
    groups: [],
});
// Add 1 group and add 2 users to it.
permissionManager.addGroup('Group1');
permissionManager.addUserToGroup('Group1', 'User1');
permissionManager.addUserToGroup('Group1', 'User2');
// Test if the permission manager works correctly.
console.log(permissionManager.hasPermission('User1', role_based_permission_control_1.PermissionList.DELETE)); // true
console.log(permissionManager.hasPermission('User2', role_based_permission_control_1.PermissionList.DELETE)); // false
console.log(permissionManager.hasPermission('User3', role_based_permission_control_1.PermissionList.READ)); // true
// Show that User2 has the 'editor' role.
console.log(permissionManager.getUser('User2')); // { name: 'User2', roles: [ { name: 'editor', permissions: [ 'read', 'write' ] } ], groups: [ 'Group1' ] }
// Delete a role.
roleManager.deleteRole('editor', permissionManager);
console.log(roleManager.getDeleteLog()); // [ "Role 'editor' deleted." ]
// Show that User2 no longer has the 'editor' role.
console.log(permissionManager.getUser('User2')); // { name: 'User2', roles: [], groups: [ 'Group1' ] }
// Delete a user.
permissionManager.deleteUser('User3');
console.log(permissionManager.getDeleteLog()); // [ "User 'User3' deleted." ]
// Delete a group.
permissionManager.deleteGroup('Group1');
console.log(permissionManager.getDeleteLog()); // [ "User 'User3' deleted.", "User 'User1' deleted.", "Group 'Group1' deleted." ]
