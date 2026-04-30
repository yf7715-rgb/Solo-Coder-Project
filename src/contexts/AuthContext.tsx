import { createContext, useContext, createSignal } from 'solid-js';
import type { ParentComponent, Context } from 'solid-js';
import type { User } from '../types';
import { USERS } from '../config/constants';
import { generateAuditRecord, addAuditLog } from '../utils';

function getInitialUser(): User | null {
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  }
  return null;
}

interface AuthContextType {
  user: () => User | null;
  isAuthenticated: () => boolean;
  login: (username: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canPerformAction: (action: 'view' | 'edit' | 'manage' | 'delete') => boolean;
}

const AuthContext: Context<AuthContextType | undefined> = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: ParentComponent = (props) => {
  const [user, setUser] = createSignal<User | null>(getInitialUser());

  const isAuthenticated = () => !!user();

  const login = (username: string, password: string): { success: boolean; message: string } => {
    const foundUser = USERS.find(u => u.username === username && u.password === password);
    
    if (!foundUser) {
      return { success: false, message: '用户名或密码错误' };
    }
    
    const newUser: User = {
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.name,
      role: foundUser.role
    };
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    const auditRecord = generateAuditRecord(
      'login',
      { id: newUser.id, name: newUser.name, role: newUser.role },
      '用户成功登录系统'
    );
    addAuditLog(auditRecord);
    
    return { success: true, message: '登录成功' };
  };

  const logout = () => {
    const currentUser = user();
    if (currentUser) {
      const auditRecord = generateAuditRecord(
        'logout',
        { id: currentUser.id, name: currentUser.name, role: currentUser.role },
        '用户成功登出系统'
      );
      addAuditLog(auditRecord);
    }
    
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission: string): boolean => {
    const currentUser = user();
    if (!currentUser) return false;
    
    const roleConfig = {
      admin: { permissions: ['*'] },
      ops: {
        permissions: ['dashboard:view', 'usage:view', 'customers:view', 'customers:edit', 'alerts:view', 'alerts:manage', 'policies:view', 'audit:view']
      },
      viewer: {
        permissions: ['dashboard:view', 'usage:view', 'customers:view', 'alerts:view', 'policies:view', 'audit:view']
      }
    };
    
    const permissions = roleConfig[currentUser.role].permissions;
    if (permissions.includes('*')) return true;
    return permissions.includes(permission);
  };

  const canPerformAction = (action: 'view' | 'edit' | 'manage' | 'delete'): boolean => {
    const currentUser = user();
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'ops') {
      return action === 'view' || action === 'edit' || action === 'manage';
    }
    return action === 'view';
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    hasPermission,
    canPerformAction
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
