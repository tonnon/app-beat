import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/protected-route/ProtectedRoute';
import PublicRoute from '@/components/public-route/PublicRoute';
import HomePage from '@/pages/home/HomePage';
import QuestionnairesPage from '@/pages/user-default/questionnaires/QuestionnairesPage';
import Pratice from '@/pages/user-default/pratice/PraticePage';
import UserPage from '@/pages/user-default/UserPage';
import AdminPage from '@/pages/user-admin/AdminPage';
import EnterpriseAdminPage from '@/pages/user-enterprise-admin/EntrepriseAdminPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/questionnaires" 
        element={
          <ProtectedRoute>
            <QuestionnairesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pratice" 
        element={
          <ProtectedRoute>
            <Pratice />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/task" 
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <EnterpriseAdminPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
