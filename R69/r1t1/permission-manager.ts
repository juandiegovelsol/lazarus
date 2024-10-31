import RoleManager from './role';
import { User } from './user';
import { PermissionList } from './role';

class PermissionManager {
  constructor(private users: User[], private roleManager: RoleManager) {}

  addUser(user: User): void {
    this.users.push(user);
  }

  hasPermission(userName: string, permission: PermissionList): boolean {
    const user = this.users.find(u => u.name === userName);
    if (!user) return false;

    return user.roles.some(role => 
      this.roleManager.hasPermission(role.name, permission)
    );
  }
}

export default PermissionManager;