import { Routes, Route } from 'react-router-dom';
import Quiz from '../pages/quiz';
import Home from '../pages/home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}
