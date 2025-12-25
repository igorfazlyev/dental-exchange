import { http, HttpResponse, delay } from 'msw';
import { mockPatients } from '../api/mockData/patients';
import { mockClinics } from '../api/mockData/clinics';
import { mockOffers } from '../api/mockData/offers';
import { SPECIALIZATIONS } from '../api/mockData/specializations';


// In-memory data store (simulates database)
let patients = [...mockPatients];
let clinics = [...mockClinics];
let offers = [...mockOffers];

// Mock incoming plans data
// Update mockIncomingPlans in handlers.js:

const mockIncomingPlans = [
  {
    id: 101,
    patientId: 1,
    patientAge: 32,
    patientGender: 'male',
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    specializations: [
      {
        type: 'therapy',
        procedures: [
          { 
            tooth: 16, 
            procedure: 'Лечение кариеса', 
            estimatedPrice: { min: 5000, max: 8000 } // ✅ This is correct
          },
          { 
            tooth: 26, 
            procedure: 'Пломбирование канала', 
            estimatedPrice: { min: 12000, max: 18000 } 
          },
        ],
        totalEstimate: { min: 17000, max: 26000 }, // ✅ ADD THIS - should be object with min/max
      },
      {
        type: 'hygiene',
        procedures: [
          { 
            procedure: 'Профессиональная чистка', 
            estimatedPrice: { min: 4000, max: 6000 } 
          },
        ],
        totalEstimate: { min: 4000, max: 6000 }, // ✅ ADD THIS
      },
    ],
    selectedSpecializations: ['therapy', 'hygiene'],
    totalEstimate: { min: 21000, max: 32000 }, // ✅ Change from number to object
    searchCriteria: {
      priceRange: { min: 20000, max: 50000 },
      districts: ['Центральный', 'Тверской'],
      metro: ['Маяковская', 'Пушкинская'],
    },
    status: 'published',
  },
  {
    id: 102,
    patientId: 2,
    patientAge: 45,
    patientGender: 'female',
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    specializations: [
      {
        type: 'orthopedics',
        procedures: [
          { 
            tooth: 36, 
            procedure: 'Коронка металлокерамическая', 
            estimatedPrice: { min: 25000, max: 45000 } 
          },
          { 
            tooth: 46, 
            procedure: 'Коронка металлокерамическая', 
            estimatedPrice: { min: 25000, max: 45000 } 
          },
        ],
        totalEstimate: { min: 50000, max: 90000 }, // ✅ ADD THIS
      },
    ],
    selectedSpecializations: ['orthopedics'],
    totalEstimate: { min: 50000, max: 90000 }, // ✅ Change to object
    searchCriteria: {
      priceRange: { min: 50000, max: 100000 },
      districts: ['Центральный', 'Пресненский'],
      metro: ['Белорусская', 'Маяковская'],
    },
    status: 'published',
  },
  {
    id: 103,
    patientId: 3,
    patientAge: 28,
    patientGender: 'female',
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    specializations: [
      {
        type: 'surgery',
        procedures: [
          { 
            tooth: 38, 
            procedure: 'Удаление зуба мудрости', 
            estimatedPrice: { min: 3000, max: 8000 } 
          },
        ],
        totalEstimate: { min: 3000, max: 8000 }, // ✅ ADD THIS
      },
      {
        type: 'therapy',
        procedures: [
          { 
            tooth: 17, 
            procedure: 'Лечение пульпита', 
            estimatedPrice: { min: 12000, max: 18000 } 
          },
        ],
        totalEstimate: { min: 12000, max: 18000 }, // ✅ ADD THIS
      },
    ],
    selectedSpecializations: ['surgery', 'therapy'],
    totalEstimate: { min: 15000, max: 26000 }, // ✅ Change to object
    searchCriteria: {
      priceRange: { min: 15000, max: 30000 },
      districts: ['Центральный', 'Хамовники'],
      metro: ['Фрунзенская', 'Пушкинская'],
    },
    status: 'published',
  },
  {
    id: 104,
    patientId: 4,
    patientAge: 55,
    patientGender: 'male',
    createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    specializations: [
      {
        type: 'periodontics',
        procedures: [
          { 
            procedure: 'Лечение пародонтита', 
            estimatedPrice: { min: 10000, max: 20000 } 
          },
        ],
        totalEstimate: { min: 10000, max: 20000 }, // ✅ ADD THIS
      },
      {
        type: 'hygiene',
        procedures: [
          { 
            procedure: 'Профессиональная чистка', 
            estimatedPrice: { min: 4000, max: 6000 } 
          },
        ],
        totalEstimate: { min: 4000, max: 6000 }, // ✅ ADD THIS
      },
    ],
    selectedSpecializations: ['periodontics', 'hygiene'],
    totalEstimate: { min: 14000, max: 26000 }, // ✅ Change to object
    searchCriteria: {
      priceRange: { min: 20000, max: 40000 },
      districts: ['Хамовники'],
      metro: ['Фрунзенская'],
    },
    status: 'published',
  },
  {
    id: 105,
    patientId: 5,
    patientAge: 38,
    patientGender: 'male',
    createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    specializations: [
      {
        type: 'orthopedics',
        procedures: [
          { 
            tooth: 14, 
            procedure: 'Имплант + коронка', 
            estimatedPrice: { min: 80000, max: 120000 } 
          },
        ],
        totalEstimate: { min: 80000, max: 120000 }, // ✅ ADD THIS
      },
      {
        type: 'therapy',
        procedures: [
          { 
            tooth: 15, 
            procedure: 'Лечение кариеса', 
            estimatedPrice: { min: 5000, max: 8000 } 
          },
          { 
            tooth: 25, 
            procedure: 'Лечение кариеса', 
            estimatedPrice: { min: 5000, max: 8000 } 
          },
        ],
        totalEstimate: { min: 10000, max: 16000 }, // ✅ ADD THIS
      },
    ],
    selectedSpecializations: ['orthopedics', 'therapy'],
    totalEstimate: { min: 90000, max: 136000 }, // ✅ Change to object
    searchCriteria: {
      priceRange: { min: 80000, max: 150000 },
      districts: ['Центральный', 'Тверской', 'Пресненский'],
      metro: ['Маяковская', 'Белорусская', 'Пушкинская'],
    },
    status: 'published',
  },
];


// Mock leads data
// In handlers.js - Replace the mockLeads array with this:

const mockLeads = [
  {
    id: 1001,
    patient: {
      id: 1,
      name: 'Иван П.',
      phone: '+7 (999) 123-45-67',
      email: 'patient@demo.com',
      age: 32,
    },
    treatmentPlan: {
      id: 101,
      specializations: [
        {
          type: 'therapy',
          procedures: [
            { tooth: 16, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
            { tooth: 26, procedure: 'Пломбирование канала', estimatedPrice: { min: 12000, max: 18000 } },
          ],
        },
        {
          type: 'hygiene',
          procedures: [
            { procedure: 'Профессиональная чистка', estimatedPrice: { min: 4000, max: 6000 } },
          ],
        },
      ],
      selectedSpecializations: ['therapy', 'hygiene'],
      totalEstimate: 26500,
    },
    offer: {
      id: 2001,
      totalPrice: 26500,
      discountedPrice: 24000,
      discount: 10,
    },
    appointment: {
      id: 3001,
      status: 'new',
      createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      notes: '',
    },
    createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
  },
  {
    id: 1002,
    patient: {
      id: 2,
      name: 'Мария С.',
      phone: '+7 (999) 234-56-78',
      email: 'maria@example.com',
      age: 45,
    },
    treatmentPlan: {
      id: 102,
      specializations: [
        {
          type: 'orthopedics',
          procedures: [
            { tooth: 36, procedure: 'Коронка металлокерамическая', estimatedPrice: { min: 25000, max: 45000 } },
            { tooth: 46, procedure: 'Коронка металлокерамическая', estimatedPrice: { min: 25000, max: 45000 } },
          ],
        },
      ],
      selectedSpecializations: ['orthopedics'],
      totalEstimate: 70000,
    },
    offer: {
      id: 2002,
      totalPrice: 70000,
      discountedPrice: 63000,
      discount: 10,
    },
    appointment: {
      id: 3002,
      status: 'contacted',
      createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Связались, интересуется установкой коронок. Записана на консультацию 27.12.',
      lastContactDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'contacted',
  },
  {
    id: 1003,
    patient: {
      id: 3,
      name: 'Анна К.',
      phone: '+7 (999) 345-67-89',
      email: 'anna@example.com',
      age: 28,
    },
    treatmentPlan: {
      id: 103,
      specializations: [
        {
          type: 'surgery',
          procedures: [
            { tooth: 38, procedure: 'Удаление зуба мудрости', estimatedPrice: { min: 3000, max: 8000 } },
          ],
        },
        {
          type: 'therapy',
          procedures: [
            { tooth: 17, procedure: 'Лечение пульпита', estimatedPrice: { min: 12000, max: 18000 } },
          ],
        },
      ],
      selectedSpecializations: ['surgery', 'therapy'],
      totalEstimate: 20000,
    },
    offer: {
      id: 2003,
      totalPrice: 20000,
      discountedPrice: 18000,
      discount: 10,
    },
    appointment: {
      id: 3003,
      status: 'new',
      createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      notes: '',
    },
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'new',
  },
  {
    id: 1004,
    patient: {
      id: 6,
      name: 'Сергей Д.',
      phone: '+7 (999) 456-78-90',
      email: 'sergey@example.com',
      age: 42,
    },
    treatmentPlan: {
      id: 98,
      specializations: [
        {
          type: 'therapy',
          procedures: [
            { tooth: 16, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
          ],
        },
      ],
      selectedSpecializations: ['therapy'],
      totalEstimate: 15000,
    },
    offer: {
      id: 2004,
      totalPrice: 15000,
      discountedPrice: 13500,
      discount: 10,
    },
    appointment: {
      id: 3004,
      status: 'scheduled',
      createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Записан на 26.12 в 14:00. Лечение кариеса зуба 16.',
      lastContactDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      appointmentDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
  },
  {
    id: 1005,
    patient: {
      id: 7,
      name: 'Елена В.',
      phone: '+7 (999) 567-89-01',
      email: 'elena@example.com',
      age: 35,
    },
    treatmentPlan: {
      id: 95,
      specializations: [
        {
          type: 'orthopedics',
          procedures: [
            { tooth: 14, procedure: 'Имплант + коронка', estimatedPrice: { min: 80000, max: 120000 } },
          ],
        },
        {
          type: 'therapy',
          procedures: [
            { tooth: 15, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
            { tooth: 25, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
          ],
        },
      ],
      selectedSpecializations: ['orthopedics', 'therapy'],
      totalEstimate: 85000,
    },
    offer: {
      id: 2005,
      totalPrice: 85000,
      discountedPrice: 76500,
      discount: 10,
    },
    appointment: {
      id: 3005,
      status: 'in_treatment',
      createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Начато лечение. Завершена терапия, идёт подготовка к протезированию.',
      lastContactDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      appointmentDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      treatmentStartDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_treatment',
  },
  {
    id: 1006,
    patient: {
      id: 8,
      name: 'Дмитрий Л.',
      phone: '+7 (999) 678-90-12',
      email: 'dmitry@example.com',
      age: 50,
    },
    treatmentPlan: {
      id: 92,
      specializations: [
        {
          type: 'hygiene',
          procedures: [
            { procedure: 'Профессиональная чистка', estimatedPrice: { min: 4000, max: 6000 } },
          ],
        },
      ],
      selectedSpecializations: ['hygiene'],
      totalEstimate: 5000,
    },
    offer: {
      id: 2006,
      totalPrice: 5000,
      discountedPrice: 4500,
      discount: 10,
    },
    appointment: {
      id: 3006,
      status: 'completed',
      createdDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Лечение завершено. Профчистка выполнена. Пациент доволен.',
      lastContactDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      treatmentStartDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      completionDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    },
    createdDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 1007,
    patient: {
      id: 9,
      name: 'Ольга Р.',
      phone: '+7 (999) 789-01-23',
      email: 'olga@example.com',
      age: 29,
    },
    treatmentPlan: {
      id: 89,
      specializations: [
        {
          type: 'therapy',
          procedures: [
            { tooth: 16, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
          ],
        },
        {
          type: 'hygiene',
          procedures: [
            { procedure: 'Профессиональная чистка', estimatedPrice: { min: 4000, max: 6000 } },
          ],
        },
      ],
      selectedSpecializations: ['therapy', 'hygiene'],
      totalEstimate: 22000,
    },
    offer: {
      id: 2007,
      totalPrice: 22000,
      discountedPrice: 19800,
      discount: 10,
    },
    appointment: {
      id: 3007,
      status: 'rejected',
      createdDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Отказ. Выбрала другую клинику ближе к дому.',
      lastContactDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    createdDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'rejected',
  },
];



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
  
  // Get incoming treatment plans (marketplace) - NOW WITH MOCK DATA
// Get incoming treatment plans (marketplace)
http.get('/api/clinic/:id/incoming-plans', async ({ params, request }) => {
  await delay(500);
  const url = new URL(request.url);
  const specializationFilter = url.searchParams.get('specialization');
  
  // Mock incoming plans with proper structure
  const mockIncomingPlans = [
    {
      id: 101,
      patientId: 1,
      patientAge: 32,
      patientGender: 'male',
      createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      specializations: [
        {
          type: 'therapy',
          procedures: [
            { 
              tooth: 16, 
              procedure: 'Лечение кариеса', 
              estimatedPrice: { min: 5000, max: 8000 } 
            },
            { 
              tooth: 26, 
              procedure: 'Пломбирование канала', 
              estimatedPrice: { min: 12000, max: 18000 } 
            },
          ],
          totalPrice: { min: 17000, max: 26000 }, // ✅ Changed from totalEstimate to totalPrice
        },
        {
          type: 'hygiene',
          procedures: [
            { 
              procedure: 'Профессиональная чистка', 
              estimatedPrice: { min: 4000, max: 6000 } 
            },
          ],
          totalPrice: { min: 4000, max: 6000 }, // ✅ Changed from totalEstimate to totalPrice
        },
      ],
      selectedSpecializations: ['therapy', 'hygiene'],
      totalEstimate: { min: 21000, max: 32000 },
      searchCriteria: {
        priceRange: { min: 20000, max: 50000 },
        districts: ['Центральный', 'Тверской'],
        metro: ['Маяковская', 'Пушкинская'],
      },
      status: 'published',
    },
    {
      id: 102,
      patientId: 2,
      patientAge: 45,
      patientGender: 'female',
      createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      specializations: [
        {
          type: 'orthopedics',
          procedures: [
            { 
              tooth: 36, 
              procedure: 'Коронка металлокерамическая', 
              estimatedPrice: { min: 25000, max: 45000 } 
            },
            { 
              tooth: 46, 
              procedure: 'Коронка металлокерамическая', 
              estimatedPrice: { min: 25000, max: 45000 } 
            },
          ],
          totalPrice: { min: 50000, max: 90000 }, // ✅ Added totalPrice
        },
      ],
      selectedSpecializations: ['orthopedics'],
      totalEstimate: { min: 50000, max: 90000 },
      searchCriteria: {
        priceRange: { min: 50000, max: 100000 },
        districts: ['Центральный', 'Пресненский'],
        metro: ['Белорусская', 'Маяковская'],
      },
      status: 'published',
    },
    {
      id: 103,
      patientId: 3,
      patientAge: 28,
      patientGender: 'female',
      createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      specializations: [
        {
          type: 'surgery',
          procedures: [
            { 
              tooth: 38, 
              procedure: 'Удаление зуба мудрости', 
              estimatedPrice: { min: 3000, max: 8000 } 
            },
          ],
          totalPrice: { min: 3000, max: 8000 }, // ✅ Added totalPrice
        },
        {
          type: 'therapy',
          procedures: [
            { 
              tooth: 17, 
              procedure: 'Лечение пульпита', 
              estimatedPrice: { min: 12000, max: 18000 } 
            },
          ],
          totalPrice: { min: 12000, max: 18000 }, // ✅ Added totalPrice
        },
      ],
      selectedSpecializations: ['surgery', 'therapy'],
      totalEstimate: { min: 15000, max: 26000 },
      searchCriteria: {
        priceRange: { min: 15000, max: 30000 },
        districts: ['Центральный', 'Хамовники'],
        metro: ['Фрунзенская', 'Пушкинская'],
      },
      status: 'published',
    },
    {
      id: 104,
      patientId: 4,
      patientAge: 55,
      patientGender: 'male',
      createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      specializations: [
        {
          type: 'periodontics',
          procedures: [
            { 
              procedure: 'Лечение пародонтита', 
              estimatedPrice: { min: 10000, max: 20000 } 
            },
          ],
          totalPrice: { min: 10000, max: 20000 }, // ✅ Added totalPrice
        },
        {
          type: 'hygiene',
          procedures: [
            { 
              procedure: 'Профессиональная чистка', 
              estimatedPrice: { min: 4000, max: 6000 } 
            },
          ],
          totalPrice: { min: 4000, max: 6000 }, // ✅ Added totalPrice
        },
      ],
      selectedSpecializations: ['periodontics', 'hygiene'],
      totalEstimate: { min: 14000, max: 26000 },
      searchCriteria: {
        priceRange: { min: 20000, max: 40000 },
        districts: ['Хамовники'],
        metro: ['Фрунзенская'],
      },
      status: 'published',
    },
    {
      id: 105,
      patientId: 5,
      patientAge: 38,
      patientGender: 'male',
      createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      specializations: [
        {
          type: 'orthopedics',
          procedures: [
            { 
              tooth: 14, 
              procedure: 'Имплант + коронка', 
              estimatedPrice: { min: 80000, max: 120000 } 
            },
          ],
          totalPrice: { min: 80000, max: 120000 }, // ✅ Added totalPrice
        },
        {
          type: 'therapy',
          procedures: [
            { 
              tooth: 15, 
              procedure: 'Лечение кариеса', 
              estimatedPrice: { min: 5000, max: 8000 } 
            },
            { 
              tooth: 25, 
              procedure: 'Лечение кариеса', 
              estimatedPrice: { min: 5000, max: 8000 } 
            },
          ],
          totalPrice: { min: 10000, max: 16000 }, // ✅ Added totalPrice
        },
      ],
      selectedSpecializations: ['orthopedics', 'therapy'],
      totalEstimate: { min: 90000, max: 136000 },
      searchCriteria: {
        priceRange: { min: 80000, max: 150000 },
        districts: ['Центральный', 'Тверской', 'Пресненский'],
        metro: ['Маяковская', 'Белорусская', 'Пушкинская'],
      },
      status: 'published',
    },
  ];
  
  return HttpResponse.json(mockIncomingPlans);
}),

  
  // Calculate offer for treatment plan
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
  
  // Get the incoming plan from our mock data
  const mockIncomingPlans = [
    {
      id: 101,
      specializations: [
        {
          type: 'therapy',
          procedures: [
            { tooth: 16, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
            { tooth: 26, procedure: 'Пломбирование канала', estimatedPrice: { min: 12000, max: 18000 } },
          ],
        },
        {
          type: 'hygiene',
          procedures: [
            { procedure: 'Профессиональная чистка', estimatedPrice: { min: 4000, max: 6000 } },
          ],
        },
      ],
    },
    {
      id: 102,
      specializations: [
        {
          type: 'orthopedics',
          procedures: [
            { tooth: 36, procedure: 'Коронка металлокерамическая', estimatedPrice: { min: 25000, max: 45000 } },
            { tooth: 46, procedure: 'Коронка металлокерамическая', estimatedPrice: { min: 25000, max: 45000 } },
          ],
        },
      ],
    },
    {
      id: 103,
      specializations: [
        {
          type: 'surgery',
          procedures: [
            { tooth: 38, procedure: 'Удаление зуба мудрости', estimatedPrice: { min: 3000, max: 8000 } },
          ],
        },
        {
          type: 'therapy',
          procedures: [
            { tooth: 17, procedure: 'Лечение пульпита', estimatedPrice: { min: 12000, max: 18000 } },
          ],
        },
      ],
    },
    {
      id: 104,
      specializations: [
        {
          type: 'periodontics',
          procedures: [
            { procedure: 'Лечение пародонтита', estimatedPrice: { min: 10000, max: 20000 } },
          ],
        },
        {
          type: 'hygiene',
          procedures: [
            { procedure: 'Профессиональная чистка', estimatedPrice: { min: 4000, max: 6000 } },
          ],
        },
      ],
    },
    {
      id: 105,
      specializations: [
        {
          type: 'orthopedics',
          procedures: [
            { tooth: 14, procedure: 'Имплант + коронка', estimatedPrice: { min: 80000, max: 120000 } },
          ],
        },
        {
          type: 'therapy',
          procedures: [
            { tooth: 15, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
            { tooth: 25, procedure: 'Лечение кариеса', estimatedPrice: { min: 5000, max: 8000 } },
          ],
        },
      ],
    },
  ];
  
  const plan = mockIncomingPlans.find(p => p.id === treatmentPlanId);
  
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
        tooth: proc.tooth,
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
    
    return HttpResponse.json({
      success: true,
      message: 'Предложение отправлено пациенту',
      offer: newOffer,
    });
  }),
  
  // Get clinic leads - NOW WITH MOCK DATA
  http.get('/api/clinic/:id/leads', async ({ params }) => {
    await delay(500);
    
    // Return mock leads
    return HttpResponse.json(mockLeads);
  }),
  
  // Update lead status
  http.patch('/api/clinic/:clinicId/leads/:leadId', async ({ params, request }) => {
    await delay(400);
    const { status, notes } = await request.json();
    
    // Find and update lead in mock data
    const lead = mockLeads.find(l => l.id === Number(params.leadId));
    if (lead) {
      lead.status = status;
      lead.notes = notes;
      lead.updatedDate = new Date().toISOString();
    }
    
    return HttpResponse.json({
      success: true,
      message: 'Статус заявки обновлен',
    });
  }),
  
  // Get clinic analytics - UPDATED WITH MORE REALISTIC DATA
  http.get('/api/clinic/:id/analytics', async ({ params, request }) => {
    await delay(700);
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '30';
    
    return HttpResponse.json({
      period,
      metrics: {
        newPlans: 15,
        acceptedOffers: 8,
        rejectedOffers: 3,
        conversionRate: 53,
        totalPlannedRevenue: 1500000,
        totalActualRevenue: 950000,
        averageOrderValue: 118750,
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
    const priceRange = url.searchParams.get('priceRange');
    
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
