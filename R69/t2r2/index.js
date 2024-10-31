"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const role_based_permission_control_1 = require("./role-based-permission-control");
const roleManager = new role_based_permission_control_1.RoleManager();
const userManager = new role_based_permission_control_1.UserManager(roleManager);
// Add 3 roles with different permissions.
roleManager.addRole('admin', [role_based_permission_control_1.PermissionList.READ, role_based_permission_control_1.PermissionList.WRITE, role_based_permission_control_1.PermissionList.DELETE]);
roleManager.addRole('editor', [role_based_permission_control_1.PermissionList.READ, role_based_permission_control_1.PermissionList.WRITE]);
roleManager.addRole('viewer', [role_based_permission_control_1.PermissionList.READ]);
// Add 3 users with different roles.
userManager.addUser('User1', ['admin']);
userManager.addUser('User2', ['editor']);
userManager.addUser('User3', ['viewer']);
// Test if the permission manager works correctly.
console.log(userManager.hasPermission('User1', role_based_permission_control_1.PermissionList.DELETE)); // true
console.log(userManager.hasPermission('User2', role_based_permission_control_1.PermissionList.DELETE)); // false
console.log(userManager.hasPermission('User3', role_based_permission_control_1.PermissionList.READ)); // true
// Add users to groups.
userManager.addUserToGroup('User1', 'Group1');
userManager.addUserToGroup('User2', 'Group1');
userManager.addUserToGroup('User3', 'Group2');
// Delete a role.
try {
    roleManager.deleteRole('editor');
}
catch (error) {
    console.error(error.message);
}
// Delete a user.
try {
    userManager.deleteUser('User2');
}
catch (error) {
    console.error(error.message);
}
// Delete a group.
try {
    userManager.deleteGroup('Group2');
}
catch (error) {
    console.error(error.message);
}
// Try to delete a non-existent role.
try {
    roleManager.deleteRole('non-existent-role');
}
catch (error) {
    console.error(error.message);
}
// Try to delete a non-existent user.
try {
    userManager.deleteUser('non-existent-user');
}
catch (error) {
    console.error(error.message);
}
// Try to delete a non-existent group.
try {
    userManager.deleteGroup('non-existent-group');
}
catch (error) {
    console.error(error.message);
}
// Print the logs.
console.log('Logs:');
for (const log of userManager.getLog()) {
    console.log(log);
}
