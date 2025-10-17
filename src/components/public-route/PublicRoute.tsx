import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { getRedirectPathForRole } from '@/services/auth/mockAuth';
import type { ReactNode } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated && user) {
    const destination = getRedirectPathForRole(user.type);
    return <Navigate to={destination} replace />;
  }

  return <>{children}</>;
}
