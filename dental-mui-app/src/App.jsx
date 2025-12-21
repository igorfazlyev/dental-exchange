import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'

// Patient pages
import PatientNewsFeed from './pages/Patient/NewsFeed'
import PatientScans from './pages/Patient/Scans'
import PatientTreatmentPlan from './pages/Patient/TreatmentPlan'
import PatientCriteria from './pages/Patient/Criteria'
import PatientOffers from './pages/Patient/Offers'
import PatientStatusTracking from './pages/Patient/StatusTracking'
import PatientConsultations from './pages/Patient/Consultations'
import PatientReviews from './pages/Patient/Reviews'

// Clinic pages
// Clinic pages
import ClinicDashboard from './pages/Clinic/Dashboard'
import ClinicProfile from './pages/Clinic/Profile'  // ✅ CORRECT
import ClinicOrders from './pages/Clinic/Orders'
import ClinicPatients from './pages/Clinic/Patients'
import ClinicPriceList from './pages/Clinic/PriceList'
import ClinicAnalytics from './pages/Clinic/Analytics'
import ClinicSchedule from './pages/Clinic/Schedule'
import ClinicComplaints from './pages/Clinic/Complaints'

// Government pages
import GovernmentDashboard from './pages/Government/Dashboard'
import GovernmentAnalytics from './pages/Government/Analytics'
import GovernmentClinicRegistry from './pages/Government/ClinicRegistry'

// Insurance pages
import InsuranceDashboard from './pages/Insurance/Dashboard'
import InsurancePatientPortfolio from './pages/Insurance/PatientPortfolio'
import InsurancePlanReview from './pages/Insurance/PlanReview'
import InsuranceApprovals from './pages/Insurance/Approvals'
import InsuranceAnalytics from './pages/Insurance/Analytics'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => setUser(userData)
  const handleLogout = () => setUser(null)

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        {/* Patient routes */}
        {user.role === 'patient' && (
          <>
            <Route path="/" element={<Navigate to="/patient/news" />} />
            <Route path="/patient/news" element={<PatientNewsFeed />} />
            <Route path="/patient/scans" element={<PatientScans />} />
            <Route path="/patient/plan" element={<PatientTreatmentPlan />} />
            <Route path="/patient/criteria" element={<PatientCriteria />} />
            <Route path="/patient/offers" element={<PatientOffers />} />
            <Route path="/patient/status" element={<PatientStatusTracking />} />
            <Route path="/patient/consultations" element={<PatientConsultations />} />
            <Route path="/patient/reviews" element={<PatientReviews />} />
          </>
        )}

        {/* Clinic routes */}
        {(user.role === 'clinic_doctor' || user.role === 'clinic_manager') && (
          <>
            <Route path="/" element={<Navigate to="/clinic/dashboard" />} />
            <Route path="/clinic/dashboard" element={<ClinicDashboard />} />
            <Route path="/clinic/orders" element={<ClinicOrders />} />
            <Route path="/clinic/patients" element={<ClinicPatients />} />
            <Route path="/clinic/pricelist" element={<ClinicPriceList />} />
            <Route path="/clinic/analytics" element={<ClinicAnalytics />} />
            <Route path="/clinic/schedule" element={<ClinicSchedule />} />
            <Route path="/clinic/complaints" element={<ClinicComplaints />} />
            <Route path="/clinic/profile" element={<ClinicProfile />} />
          </>
        )}

        {/* Government routes */}
        {user.role === 'government' && (
          <>
            <Route path="/" element={<Navigate to="/government/dashboard" />} />
            <Route path="/government/dashboard" element={<GovernmentDashboard />} />
            <Route path="/government/analytics" element={<GovernmentAnalytics />} />
            <Route path="/government/clinics" element={<GovernmentClinicRegistry />} />
          </>
        )}

        {/* Insurance routes */}
        {user.role === 'insurance' && (
          <>
            <Route path="/" element={<Navigate to="/insurance/dashboard" />} />
            <Route path="/insurance/dashboard" element={<InsuranceDashboard />} />
            <Route path="/insurance/portfolio" element={<InsurancePatientPortfolio />} />
            <Route path="/insurance/review/:id" element={<InsurancePlanReview />} />
            <Route path="/insurance/approvals" element={<InsuranceApprovals />} />
            <Route path="/insurance/analytics" element={<InsuranceAnalytics />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

export default App