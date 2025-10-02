
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes';
import BottomNavbar from '@/components/bottom-navbar/BottomNavbar';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <BottomNavbar/>
    </BrowserRouter>
  );
}
