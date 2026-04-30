import { Router, Route, useNavigate, useLocation } from '@solidjs/router';
import { createEffect } from 'solid-js';
import type { Component } from 'solid-js';
import { useAuth } from './contexts/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsagePage } from './pages/UsagePage';
import { CustomersPage } from './pages/CustomersPage';
import { CustomerDetailPage } from './pages/CustomerDetailPage';
import { AlertsPage } from './pages/AlertsPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AuditLogPage } from './pages/AuditLogPage';

function ProtectedRoute(Component: Component) {
  return function ProtectedComponent() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    createEffect(() => {
      if (!isAuthenticated()) {
        navigate('/login', { state: { from: location.pathname } });
      }
    });

    return <Component />;
  };
}

function LayoutWrapper(Component: Component) {
  return function LayoutComponent() {
    return (
      <MainLayout>
        <Component />
      </MainLayout>
    );
  };
}

function NavigateToHome() {
  const navigate = useNavigate();
  createEffect(() => {
    navigate('/');
  });
  return null;
}

export default function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={LayoutWrapper(ProtectedRoute(DashboardPage))} />
      <Route path="/usage" component={LayoutWrapper(ProtectedRoute(UsagePage))} />
      <Route path="/customers" component={LayoutWrapper(ProtectedRoute(CustomersPage))} />
      <Route path="/customers/:id" component={LayoutWrapper(ProtectedRoute(CustomerDetailPage))} />
      <Route path="/alerts" component={LayoutWrapper(ProtectedRoute(AlertsPage))} />
      <Route path="/policies" component={LayoutWrapper(ProtectedRoute(PoliciesPage))} />
      <Route path="/audit-log" component={LayoutWrapper(ProtectedRoute(AuditLogPage))} />
      <Route path="*" component={NavigateToHome} />
    </Router>
  );
}
