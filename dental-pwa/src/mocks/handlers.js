import { http, HttpResponse, delay } from 'msw';
import { mockPatients } from '../api/mockData/patients';
import { mockClinics } from '../api/mockData/clinics';
import { mockOffers } from '../api/mockData/offers';
import { SPECIALIZATIONS } from '../api/mockData/specializations';

// In-memory data store (simulates database)
let patients = [...mockPatients];
let clinics = [...mockClinics];
let offers = [...mockOffers];

export const handlers = [
  // ============= AUTH ENDPOINTS =============
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500);
    const { email, password, role } = await request.json();
    
    // Mock authentication
    if (password === 'demo123') {
      return HttpResponse.json({
        success: true,
        user: {
          id: role === 'patient' ? 1 : 101,
          email,
          role,
          name: role === 'patient' ? 'Иван Петров' : 'DNTL Клиника',
        },
        token: 'mock-jwt-token-' + Date.now(),
      });
    }
    
    return HttpResponse.json(
      { success: false, message: 'Неверный email или пароль' },
      { status: 401 }
    );
  }),

  // ============= PATIENT ENDPOINTS =============
  
  // Get patient profile
  http.get('/api/patient/:id', async ({ params }) => {
    await delay(300);
    const patient = patients.find(p => p.id === Number(params.id));
    
    if (!patient) {
      return HttpResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(patient);
  }),
  
  // Upload scan
  http.post('/api/patient/:id/scans', async ({ request, params }) => {
    await delay(1500); // Simulate upload time
    const formData = await request.formData();
    const file = formData.get('scan');
    const source = formData.get('source') || 'Загружен вручную';
    
    const newScan = {
      id: Date.now(),
      uploadDate: new Date().toISOString(),
      status: 'processing',
      source,
      imageUrl: 'https://via.placeholder.com/400x300?text=Processing+CT+Scan',
    };
    
    const patient = patients.find(p => p.id === Number(params.id));
    if (patient) {
      patient.scans.push(newScan);
    }
    
    // Simulate AI processing - update status after 3 seconds
    setTimeout(() => {
      newScan.status = 'processed';
    }, 3000);
    
    return HttpResponse.json({
      success: true,
      scan: newScan,
    });
  }),
  
  // Get treatment plan
  http.get('/api/scans/:scanId/treatment-plan', async ({ params }) => {
    await delay(800);
    
    const patient = patients.find(p => 
      p.scans.some(s => s.id === Number(params.scanId))
    );
    
    if (!patient) {
      return HttpResponse.json(
        { error: 'Scan not found' },
        { status: 404 }
      );
    }
    
    const plan = patient.treatmentPlans.find(
      tp => tp.scanId === Number(params.scanId)
    );
    
    if (!plan) {
      // Generate new treatment plan
      const newPlan = {
        id: Date.now(),
        scanId: Number(params.scanId),
        createdDate: new Date().toISOString(),
        status: 'draft',
        specializations: mockPatients[0].treatmentPlans[0].specializations,
        totalEstimate: mockPatients[0].treatmentPlans[0].totalEstimate,
      };
      
      patient.treatmentPlans.push(newPlan);
      return HttpResponse.json(newPlan);
    }
    
    return HttpResponse.json(plan);
  }),
  
  // Publish treatment plan (request offers)
  http.post('/api/treatment-plans/:planId/publish', async ({ params, request }) => {
    await delay(500);
    const { selectedSpecializations, criteria } = await request.json();
    
    const patient = patients.find(p =>
      p.treatmentPlans.some(tp => tp.id === Number(params.planId))
    );
    
    if (!patient) {
      return HttpResponse.json(
        { error: 'Treatment plan not found' },
        { status: 404 }
      );
    }
    
    const plan = patient.treatmentPlans.find(tp => tp.id === Number(params.planId));
    plan.status = 'published';
    plan.selectedSpecializations = selectedSpecializations;
    plan.searchCriteria = criteria;
    
    return HttpResponse.json({
      success: true,
      message: 'План лечения опубликован',
      plan,
    });
  }),
  
  // Get offers for treatment plan
  http.get('/api/treatment-plans/:planId/offers', async ({ params }) => {
    await delay(600);
    
    const planOffers = offers.filter(
      o => o.treatmentPlanId === Number(params.planId)
    );
    
    // Enrich offers with clinic data
    const enrichedOffers = planOffers.map(offer => ({
      ...offer,
      clinic: clinics.find(c => c.id === offer.clinicId),
    }));
    
    return HttpResponse.json(enrichedOffers);
  }),
  
  // Accept offer
  http.post('/api/offers/:offerId/accept', async ({ params }) => {
    await delay(400);
    
    const offer = offers.find(o => o.id === Number(params.offerId));
    if (!offer) {
      return HttpResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      );
    }
    
    offer.status = 'accepted';
    
    // Update patient treatment plan status
    const patient = patients.find(p =>
      p.treatmentPlans.some(tp => tp.id === offer.treatmentPlanId)
    );
    
    if (patient) {
      const plan = patient.treatmentPlans.find(tp => tp.id === offer.treatmentPlanId);
      plan.status = 'clinic_selected';
      
      // Create appointment
      const appointment = {
        id: Date.now(),
        treatmentPlanId: offer.treatmentPlanId,
        clinicId: offer.clinicId,
        offerId: offer.id,
        status: 'pending_contact', // 'pending_contact', 'scheduled', 'consultation_done', 'in_treatment', 'completed'
        createdDate: new Date().toISOString(),
        selectedSlot: null,
      };
      
      patient.appointments.push(appointment);
    }
    
    return HttpResponse.json({
      success: true,
      message: 'Предложение принято',
      offer,
    });
  }),
  
  // Request callback
  http.post('/api/offers/:offerId/callback', async ({ request, params }) => {
    await delay(500);
    const { preferredDate, contactMethod, phone, messenger } = await request.json();
    
    return HttpResponse.json({
      success: true,
      message: 'Заявка на обратный звонок отправлена',
      callbackId: Date.now(),
    });
  }),
  
  // Get patient appointments
  http.get('/api/patient/:id/appointments', async ({ params }) => {
    await delay(400);
    
    const patient = patients.find(p => p.id === Number(params.id));
    if (!patient) {
      return HttpResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }
    
    // Enrich appointments with clinic and plan data
    const enrichedAppointments = patient.appointments.map(apt => ({
      ...apt,
      clinic: clinics.find(c => c.id === apt.clinicId),
      treatmentPlan: patient.treatmentPlans.find(tp => tp.id === apt.treatmentPlanId),
    }));
    
    return HttpResponse.json(enrichedAppointments);
  }),

  // ============= CLINIC ENDPOINTS =============
  
  // Get clinic profile
  http.get('/api/clinic/:id', async ({ params }) => {
    await delay(300);
    const clinic = clinics.find(c => c.id === Number(params.id));
    
    if (!clinic) {
      return HttpResponse.json(
        { error: 'Clinic not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(clinic);
  }),
  
  // Get incoming treatment plans (marketplace)
  http.get('/api/clinic/:id/incoming-plans', async ({ params, request }) => {
    await delay(500);
    const url = new URL(request.url);
    const specializationFilter = url.searchParams.get('specialization');
    
    // Find published treatment plans that match clinic's specializations
    const clinic = clinics.find(c => c.id === Number(params.id));
    if (!clinic) {
      return HttpResponse.json([], { status: 200 });
    }
    
    const incomingPlans = [];
    
    patients.forEach(patient => {
      patient.treatmentPlans.forEach(plan => {
        if (plan.status === 'published') {
          // Check if plan has specializations this clinic offers
          const hasMatchingSpec = plan.specializations.some(spec =>
            clinic.specializations.includes(spec.type)
          );
          
          if (hasMatchingSpec) {
            incomingPlans.push({
              id: plan.id,
              patientId: patient.id,
              patientAge: patient.age,
              patientGender: patient.gender,
              createdDate: plan.createdDate,
              specializations: plan.specializations,
              totalEstimate: plan.totalEstimate,
              selectedSpecializations: plan.selectedSpecializations,
              searchCriteria: plan.searchCriteria,
            });
          }
        }
      });
    });
    
    return HttpResponse.json(incomingPlans);
  }),
  
  // Calculate offer for treatment plan
  http.post('/api/clinic/:id/calculate-offer', async ({ params, request }) => {
    await delay(800);
    const { treatmentPlanId, selectedSpecializations } = await request.json();
    
    const clinic = clinics.find(c => c.id === Number(params.id));
    if (!clinic) {
      return HttpResponse.json(
        { error: 'Clinic not found' },
        { status: 404 }
      );
    }
    
    // Find treatment plan
    let plan = null;
    patients.forEach(patient => {
      const found = patient.treatmentPlans.find(tp => tp.id === treatmentPlanId);
      if (found) plan = found;
    });
    
    if (!plan) {
      return HttpResponse.json(
        { error: 'Treatment plan not found' },
        { status: 404 }
      );
    }
    
    // Calculate pricing based on clinic's price list
    const pricing = {};
    let totalPrice = 0;
    
    selectedSpecializations.forEach(specType => {
      const spec = plan.specializations.find(s => s.type === specType);
      if (spec) {
        const breakdown = spec.procedures.map(proc => ({
          procedure: proc.procedure,
          price: Math.floor((proc.estimatedPrice.min + proc.estimatedPrice.max) / 2),
        }));
        
        const specTotal = breakdown.reduce((sum, item) => sum + item.price, 0);
        
        pricing[specType] = {
          total: specTotal,
          breakdown,
        };
        
        totalPrice += specTotal;
      }
    });
    
    const discountedPrice = Math.floor(totalPrice * (1 - clinic.features.discount / 100));
    
    return HttpResponse.json({
      pricing,
      totalPrice,
      discountedPrice,
      discount: clinic.features.discount,
    });
  }),
  
  // Submit offer
  http.post('/api/clinic/:id/submit-offer', async ({ params, request }) => {
    await delay(600);
    const offerData = await request.json();
    
    const newOffer = {
      id: Date.now(),
      clinicId: Number(params.id),
      createdDate: new Date().toISOString(),
      status: 'pending',
      ...offerData,
    };
    
    offers.push(newOffer);
    
    // Update treatment plan status
    patients.forEach(patient => {
      const plan = patient.treatmentPlans.find(
        tp => tp.id === offerData.treatmentPlanId
      );
      if (plan && plan.status === 'published') {
        plan.status = 'offers_received';
      }
    });
    
    return HttpResponse.json({
      success: true,
      message: 'Предложение отправлено пациенту',
      offer: newOffer,
    });
  }),
  
  // Get clinic leads
  http.get('/api/clinic/:id/leads', async ({ params }) => {
    await delay(500);
    
    const clinicOffers = offers.filter(
      o => o.clinicId === Number(params.id) && o.status === 'accepted'
    );
    
    const leads = [];
    
    clinicOffers.forEach(offer => {
      patients.forEach(patient => {
        const appointment = patient.appointments.find(
          apt => apt.offerId === offer.id
        );
        
        if (appointment) {
          const plan = patient.treatmentPlans.find(
            tp => tp.id === offer.treatmentPlanId
          );
          
          leads.push({
            id: appointment.id,
            patient: {
              id: patient.id,
              name: patient.name,
              phone: patient.phone,
              email: patient.email,
              age: patient.age,
            },
            treatmentPlan: plan,
            offer,
            appointment,
            createdDate: appointment.createdDate,
            status: appointment.status,
          });
        }
      });
    });
    
    return HttpResponse.json(leads);
  }),
  
  // Update lead status
  http.patch('/api/clinic/:clinicId/leads/:leadId', async ({ params, request }) => {
    await delay(400);
    const { status, notes } = await request.json();
    
    // Find and update appointment
    patients.forEach(patient => {
      const appointment = patient.appointments.find(
        apt => apt.id === Number(params.leadId)
      );
      if (appointment) {
        appointment.status = status;
        appointment.notes = notes;
        appointment.updatedDate = new Date().toISOString();
      }
    });
    
    return HttpResponse.json({
      success: true,
      message: 'Статус заявки обновлен',
    });
  }),
  
  // Get clinic analytics
  http.get('/api/clinic/:id/analytics', async ({ params, request }) => {
    await delay(700);
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '30'; // days
    
    const clinicOffers = offers.filter(o => o.clinicId === Number(params.id));
    const acceptedOffers = clinicOffers.filter(o => o.status === 'accepted');
    
    const totalPlanned = clinicOffers.reduce((sum, o) => sum + o.totalPrice, 0);
    const totalActual = acceptedOffers.reduce((sum, o) => sum + o.totalPrice, 0);
    
    return HttpResponse.json({
      period,
      metrics: {
        newPlans: clinicOffers.length,
        acceptedOffers: acceptedOffers.length,
        rejectedOffers: clinicOffers.filter(o => o.status === 'rejected').length,
        conversionRate: clinicOffers.length > 0 
          ? Math.round((acceptedOffers.length / clinicOffers.length) * 100) 
          : 0,
        totalPlannedRevenue: totalPlanned,
        totalActualRevenue: totalActual,
        averageOrderValue: acceptedOffers.length > 0
          ? Math.round(totalActual / acceptedOffers.length)
          : 0,
      },
      bySpecialization: {
        therapy: { count: 12, revenue: 250000 },
        orthopedics: { count: 5, revenue: 550000 },
        surgery: { count: 3, revenue: 180000 },
        hygiene: { count: 18, revenue: 90000 },
        periodontics: { count: 2, revenue: 40000 },
      },
    });
  }),

  // ============= GENERAL ENDPOINTS =============
  
  // Search clinics
  http.get('/api/clinics', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const specialization = url.searchParams.get('specialization');
    const district = url.searchParams.get('district');
    const priceRange = url.searchParams.get('priceRange'); // 'low', 'medium', 'high'
    
    let filteredClinics = [...clinics];
    
    if (specialization) {
      filteredClinics = filteredClinics.filter(c =>
        c.specializations.includes(specialization)
      );
    }
    
    if (district) {
      filteredClinics = filteredClinics.filter(c =>
        c.districts.includes(district)
      );
    }
    
    return HttpResponse.json(filteredClinics);
  }),
  
  // Get specializations
  http.get('/api/specializations', async () => {
    await delay(200);
    return HttpResponse.json(Object.values(SPECIALIZATIONS));
  }),
];
