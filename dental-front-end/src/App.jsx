import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'

// Patient pages
import PatientScans from './pages/Patient/Scans'
import PatientTreatmentPlan from './pages/Patient/TreatmentPlan'
import PatientCriteria from './pages/Patient/Criteria'
import PatientOffers from './pages/Patient/Offers'
import PatientConsultations from './pages/Patient/Consultations'
import PatientReviews from './pages/Patient/Reviews'
import PatientStatusTracking from './pages/Patient/StatusTracking'
import PatientNewsFeed from './pages/Patient/NewsFeed'

// Clinic pages
import ClinicDashboard from './pages/Clinic/Dashboard'
import ClinicIncomingOrders from './pages/Clinic/IncomingOrders'
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

import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          {/* Patient Routes */}
          {user.role === 'patient' && (
            <>
              <Route path="/" element={<Navigate to="/patient/scans" />} />
              <Route path="/patient/scans" element={<PatientScans />} />
              <Route path="/patient/plan" element={<PatientTreatmentPlan />} />
              <Route path="/patient/criteria" element={<PatientCriteria />} />
              <Route path="/patient/offers" element={<PatientOffers />} />
              <Route path="/patient/consultations" element={<PatientConsultations />} />
              <Route path="/patient/reviews" element={<PatientReviews />} />
              <Route path="/patient/status" element={<PatientStatusTracking />} />
              <Route path="/patient/news" element={<PatientNewsFeed />} />
            </>
          )}

          {/* Clinic Routes */}
          {user.role === 'clinic' && (
            <>
              <Route path="/" element={<Navigate to="/clinic/dashboard" />} />
              <Route path="/clinic/dashboard" element={<ClinicDashboard />} />
              <Route path="/clinic/orders" element={<ClinicIncomingOrders />} />
              <Route path="/clinic/patients" element={<ClinicPatients />} />
              <Route path="/clinic/pricelist" element={<ClinicPriceList />} />
              <Route path="/clinic/analytics" element={<ClinicAnalytics />} />
              <Route path="/clinic/schedule" element={<ClinicSchedule />} />
              <Route path="/clinic/complaints" element={<ClinicComplaints />} />
            </>
          )}

          {/* Government Routes */}
          {user.role === 'government' && (
            <>
              <Route path="/" element={<Navigate to="/government/dashboard" />} />
              <Route path="/government/dashboard" element={<GovernmentDashboard />} />
              <Route path="/government/analytics" element={<GovernmentAnalytics />} />
              <Route path="/government/clinics" element={<GovernmentClinicRegistry />} />
            </>
          )}

          {/* Insurance Routes */}
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
