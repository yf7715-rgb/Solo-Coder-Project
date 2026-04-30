import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '@solidjs/router';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div class="flex items-center gap-4">
        <h2 class="text-lg font-semibold text-gray-800">用量运营仪表盘</h2>
      </div>

      <div class="flex items-center gap-4">
        <div class="relative">
          <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-gray-700">{user()?.name}</p>
            <p class="text-xs text-gray-500">
              {user()?.role === 'admin' ? '管理员' : user()?.role === 'ops' ? '运维人员' : '只读用户'}
            </p>
          </div>
          <div class="relative group">
            <button class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-700 transition-colors">
              {user()?.name.charAt(0)}
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hidden group-hover:block z-50">
              <div class="px-4 py-2 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-700">{user()?.name}</p>
                <p class="text-xs text-gray-500">{user()?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
