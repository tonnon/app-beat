import { Routes, Route } from 'react-router-dom';
import Quiz from '../pages/quiz';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Quiz />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}
