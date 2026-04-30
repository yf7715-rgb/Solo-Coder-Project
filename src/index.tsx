/* @refresh reload */
import { render } from 'solid-js/web';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';

const root = document.getElementById('root');

render(
  () => (
    <AuthProvider>
      <App />
    </AuthProvider>
  ),
  root!
);
