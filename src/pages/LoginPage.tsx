import { createSignal, Show, For } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import { useAuth } from '../contexts/AuthContext';
import { USERS } from '../config/constants';

export function LoginPage() {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    
    if (!username() || !password()) {
      setError('请输入用户名和密码');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const result = login(username(), password());
      setIsLoading(false);
      
      if (result.success) {
        const from = (location.state as { from?: string })?.from || '/';
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    }, 500);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">用量运营平台</h1>
            <p class="text-gray-500 mt-2">Usage Operations Platform</p>
          </div>

          <form onSubmit={handleSubmit} class="space-y-6">
            <Show when={error()}>
              <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error()}
              </div>
            </Show>

            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <input
                id="username"
                type="text"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading()}
              class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Show when={isLoading()}>
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </Show>
              {isLoading() ? '登录中...' : '登录'}
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="text-sm text-gray-500 text-center mb-3">测试账号</p>
            <div class="space-y-2 text-xs">
              <For each={USERS}>
                {(user) => (
                  <div class="flex justify-between text-gray-600 bg-gray-50 px-3 py-2 rounded">
                    <span class="font-mono">{user.username}</span>
                    <span class="font-mono">{user.password}</span>
                    <span class="text-gray-400">
                      ({user.role === 'admin' ? '管理员' : user.role === 'ops' ? '运维' : '只读'})
                    </span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
