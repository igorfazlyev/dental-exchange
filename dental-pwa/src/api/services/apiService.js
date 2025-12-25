const API_BASE = '/api';

class ApiService {
  // Helper method for fetch with error handling
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async login(email, password, role) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  // Patient endpoints
  async getPatient(patientId) {
    return this.request(`/patient/${patientId}`);
  }

  async uploadScan(patientId, file, source) {
    const formData = new FormData();
    formData.append('scan', file);
    formData.append('source', source);
    
    return this.request(`/patient/${patientId}/scans`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async getTreatmentPlan(scanId) {
    return this.request(`/scans/${scanId}/treatment-plan`);
  }

  async publishTreatmentPlan(planId, selectedSpecializations, criteria) {
    return this.request(`/treatment-plans/${planId}/publish`, {
      method: 'POST',
      body: JSON.stringify({ selectedSpecializations, criteria }),
    });
  }

  async getOffers(planId) {
    return this.request(`/treatment-plans/${planId}/offers`);
  }

  async acceptOffer(offerId) {
    return this.request(`/offers/${offerId}/accept`, {
      method: 'POST',
    });
  }

  async requestCallback(offerId, data) {
    return this.request(`/offers/${offerId}/callback`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPatientAppointments(patientId) {
    return this.request(`/patient/${patientId}/appointments`);
  }

  // Clinic endpoints
  async getClinic(clinicId) {
    return this.request(`/clinic/${clinicId}`);
  }

  async getIncomingPlans(clinicId, filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/clinic/${clinicId}/incoming-plans?${params}`);
  }

  async calculateOffer(clinicId, treatmentPlanId, selectedSpecializations) {
    return this.request(`/clinic/${clinicId}/calculate-offer`, {
      method: 'POST',
      body: JSON.stringify({ treatmentPlanId, selectedSpecializations }),
    });
  }

  async submitOffer(clinicId, offerData) {
    return this.request(`/clinic/${clinicId}/submit-offer`, {
      method: 'POST',
      body: JSON.stringify(offerData),
    });
  }

  async getClinicLeads(clinicId) {
    return this.request(`/clinic/${clinicId}/leads`);
  }

  async updateLeadStatus(clinicId, leadId, status, notes) {
    return this.request(`/clinic/${clinicId}/leads/${leadId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  }

  async getClinicAnalytics(clinicId, period = '30') {
    return this.request(`/clinic/${clinicId}/analytics?period=${period}`);
  }

  // General endpoints
  async searchClinics(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/clinics?${params}`);
  }

  async getSpecializations() {
    return this.request('/specializations');
  }
}

export default new ApiService();
