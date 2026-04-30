import { Router, Route, useNavigate, useLocation } from '@solidjs/router';
import { createEffect, Show, createMemo } from 'solid-js';
import type { Component } from 'solid-js';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsagePage } from './pages/UsagePage';
import { CustomersPage } from './pages/CustomersPage';
import { CustomerDetailPage } from './pages/CustomerDetailPage';
import { AlertsPage } from './pages/AlertsPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AuditLogPage } from './pages/AuditLogPage';
import type { Role } from './types';

function ProtectedPage(props: { component: Component; roles: Role[] }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const hasAccess = createMemo(() => {
    if (!isAuthenticated()) return false;
    const currentUser = user();
    if (!currentUser) return false;
    return props.roles.includes(currentUser.role);
  });

  createEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    } else if (!hasAccess()) {
      navigate('/', { replace: true });
    }
  });

  return (
    <Show when={isAuthenticated() && hasAccess()}>
      <props.component />
    </Show>
  );
}

function PageWithLayout(props: { component: Component; roles: Role[] }) {
  return function LayoutPage() {
    return (
      <MainLayout>
        <ProtectedPage component={props.component} roles={props.roles} />
      </MainLayout>
    );
  };
}

function NavigateToLogin() {
  const navigate = useNavigate();
  createEffect(() => {
    navigate('/login', { replace: true });
  });
  return null;
}

function AppContent() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={PageWithLayout({ component: DashboardPage, roles: ['admin', 'ops', 'viewer'] })} />
      <Route path="/usage" component={PageWithLayout({ component: UsagePage, roles: ['admin', 'ops', 'viewer'] })} />
      <Route path="/customers" component={PageWithLayout({ component: CustomersPage, roles: ['admin', 'ops', 'viewer'] })} />
      <Route path="/customers/:id" component={PageWithLayout({ component: CustomerDetailPage, roles: ['admin', 'ops', 'viewer'] })} />
      <Route path="/alerts" component={PageWithLayout({ component: AlertsPage, roles: ['admin', 'ops', 'viewer'] })} />
      <Route path="/policies" component={PageWithLayout({ component: PoliciesPage, roles: ['admin', 'ops'] })} />
      <Route path="/audit-log" component={PageWithLayout({ component: AuditLogPage, roles: ['admin', 'ops'] })} />
      <Route path="*" component={NavigateToLogin} />
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
