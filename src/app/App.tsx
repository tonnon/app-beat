
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes';
import TopNavbar from '@/components/navbar/top-navbar/TopNavbar';
import BottomNavbar from '@/components/navbar/bottom-navbar/BottomNavbar';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <TopNavbar/>
      <BottomNavbar/>
    </BrowserRouter>
  );
}
