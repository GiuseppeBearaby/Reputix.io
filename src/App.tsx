import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReportOutput from './pages/ReportOutput';
import Onboarding from './pages/Onboarding';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import ReviewsPage from './pages/ReviewsPage';
import CompetitorsPage from './pages/CompetitorsPage';
import ReviewBoostPage from './pages/ReviewBoostPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/report/:id" element={<ReportOutput />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="competitors" element={<CompetitorsPage />} />
          <Route path="customers" element={<ReviewBoostPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
