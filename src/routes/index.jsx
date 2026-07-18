import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Session from '../pages/Session.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session/:sessionId" element={<Session />} />
    </Routes>
  );
}
