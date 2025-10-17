
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes';
import TopNavbar from '@/components/navbar/top-navbar/TopNavbar';
import Auth from '@/pages/auth/Auth';
import { AuthDialogProvider } from '@/context/auth/AuthDialogContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthDialogProvider>
        <AppRoutes />
        <TopNavbar />
        <Auth />
      </AuthDialogProvider>
    </BrowserRouter>
  );
}
