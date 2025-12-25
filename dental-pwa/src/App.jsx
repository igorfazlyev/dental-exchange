import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';

// Auth
import LoginPage from './features/auth/LoginPage';

// Patient
import PatientDashboard from './features/patient/PatientDashboard';
import ScansPage from './features/patient/ScansPage';
import TreatmentPlanPage from './features/patient/TreatmentPlanPage';
import OffersPage from './features/patient/OffersPage';
import AppointmentsPage from './features/patient/AppointmentsPage';

// Clinic
import ClinicDashboard from './features/clinic/ClinicDashboard';
import IncomingPlansPage from './features/clinic/IncomingPlansPage';
import LeadsPage from './features/clinic/LeadsPage';
import PatientProfile from './features/patient/PatientProfile';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user, userRole } = useStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={`/${userRole}`} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/scans"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <ScansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/treatment-plan"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <TreatmentPlanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/offers"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <OffersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        {/* Clinic Routes */}
        <Route
          path="/clinic"
          element={
            <ProtectedRoute allowedRoles={['clinic']}>
              <ClinicDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinic/incoming-plans"
          element={
            <ProtectedRoute allowedRoles={['clinic']}>
              <IncomingPlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinic/leads"
          element={
            <ProtectedRoute allowedRoles={['clinic']}>
              <LeadsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinic/analytics"
          element={
            <ProtectedRoute allowedRoles={['clinic']}>
              <ClinicDashboard />
            </ProtectedRoute>
          }
        />

        {/* Insurance Routes (Placeholder) */}
        <Route
          path="/insurance"
          element={
            <ProtectedRoute allowedRoles={['insurance']}>
              <div style={{ padding: 20, textAlign: 'center' }}>
                <h1>Страховая компания</h1>
                <p>Раздел в разработке</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Government Routes (Placeholder) */}
        <Route
          path="/government"
          element={
            <ProtectedRoute allowedRoles={['government']}>
              <div style={{ padding: 20, textAlign: 'center' }}>
                <h1>Департамент здравоохранения</h1>
                <p>Раздел в разработке</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
