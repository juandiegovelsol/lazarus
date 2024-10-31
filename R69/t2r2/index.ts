// index.ts
import { RoleManager, UserManager, PermissionList } from './role-based-permission-control';

const roleManager = new RoleManager();
const userManager = new UserManager(roleManager);

// Add 3 roles with different permissions.
roleManager.addRole('admin', [PermissionList.READ, PermissionList.WRITE, PermissionList.DELETE]);
roleManager.addRole('editor', [PermissionList.READ, PermissionList.WRITE]);
roleManager.addRole('viewer', [PermissionList.READ]);

// Add 3 users with different roles.
userManager.addUser('User1', ['admin']);
userManager.addUser('User2', ['editor']);
userManager.addUser('User3', ['viewer']);

// Test if the permission manager works correctly.
console.log(userManager.hasPermission('User1', PermissionList.DELETE)); // true
console.log(userManager.hasPermission('User2', PermissionList.DELETE)); // false
console.log(userManager.hasPermission('User3', PermissionList.READ)); // true

// Add users to groups.
userManager.addUserToGroup('User1', 'Group1');
userManager.addUserToGroup('User2', 'Group1');
userManager.addUserToGroup('User3', 'Group2');

// Delete a role.
try {
  roleManager.deleteRole('editor');
} catch (error) {
  console.error(error.message);
}

// Delete a user.
try {
  userManager.deleteUser('User2');
} catch (error) {
  console.error(error.message);
}

// Delete a group.
try {
  userManager.deleteGroup('Group2');
} catch (error) {
  console.error(error.message);
}

// Try to delete a non-existent role.
try {
  roleManager.deleteRole('non-existent-role');
} catch (error) {
  console.error(error.message);
}

// Try to delete a non-existent user.
try {
  userManager.deleteUser('non-existent-user');
} catch (error) {
  console.error(error.message);
}

// Try to delete a non-existent group.
try {
  userManager.deleteGroup('non-existent-group');
} catch (error) {
  console.error(error.message);
}

// Print the logs.
console.log('Logs:');
for (const log of userManager.getLog()) {
  console.log(log);
}