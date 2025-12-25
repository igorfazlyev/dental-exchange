import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // User state
      user: null,
      userRole: null,

      setUser: (user, role) => set({ user, userRole: role }),
      logout: () => set({ 
        user: null, 
        userRole: null,
        currentScan: null,
        treatmentPlan: null,
        selectedClinic: null,
        patientStatus: 'idle',
      }),

      // Patient state
      currentScan: null,
      treatmentPlan: null,
      selectedClinic: null,
      patientStatus: 'idle',

      setCurrentScan: (scan) => set({ currentScan: scan }),
      setTreatmentPlan: (plan) => set({ 
        treatmentPlan: plan, 
        patientStatus: plan.status === 'draft' ? 'plan_ready' : plan.status 
      }),
      setSelectedClinic: (clinic) => set({ 
        selectedClinic: clinic, 
        patientStatus: 'clinic_selected' 
      }),
      setPatientStatus: (status) => set({ patientStatus: status }),

      // Clinic state
      incomingPlans: [],
      leads: [],

      setIncomingPlans: (plans) => set({ incomingPlans: plans }),
      setLeads: (leads) => set({ leads }),
    }),
    {
      name: 'dental-ai-storage',
      partialize: (state) => ({
        user: state.user,
        userRole: state.userRole,
        patientStatus: state.patientStatus,
      }),
    }
  )
);

export default useStore;
