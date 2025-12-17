// Mock Data for Dental Platform

// Users - EXPORTED
export const users = {
  patient: { username: 'patient', password: 'demo123', role: 'patient', name: 'Иван Петров' },
  clinic: { username: 'clinic', password: 'demo123', role: 'clinic', name: 'СтомаПрофи' },
  government: { username: 'government', password: 'demo123', role: 'government', name: 'Минздрав РФ' },
  insurance: { username: 'insurance', password: 'demo123', role: 'insurance', name: 'Альфа Страхование' }
};

// Patient Scans
export const patientScans = [
  { id: 1, date: '2025-11-15', status: 'processed', aiAnalyzed: true },
  { id: 2, date: '2025-10-12', status: 'processed', aiAnalyzed: true },
  { id: 3, date: '2025-09-08', status: 'processed', aiAnalyzed: true }
];

// Diagnoses (for display in pathology list)
export const diagnoses = [
  { id: 1, text: 'Кариес зуба 16 (глубокий)', toothNumber: '16', specialization: 'Терапия', severity: 'high' },
  { id: 2, text: 'Пульпит зуба 25 (острый)', toothNumber: '25', specialization: 'Терапия', severity: 'high' },
  { id: 3, text: 'Отсутствует зуб 37', toothNumber: '37', specialization: 'Ортопедия', severity: 'medium' },
  { id: 4, text: 'Отсутствует зуб 45', toothNumber: '45', specialization: 'Ортопедия', severity: 'low' },
  { id: 5, text: 'Периодонтит зуба 37 (хронический)', toothNumber: '37', specialization: 'Терапия', severity: 'high' },
  { id: 6, text: 'Кариес зуба 46 (средний)', toothNumber: '46', specialization: 'Терапия', severity: 'medium' },
  { id: 7, text: 'Гингивит (генерализованный)', toothNumber: null, specialization: 'Терапия', severity: 'medium' },
  { id: 8, text: 'Скол коронки зуба 21', toothNumber: '21', specialization: 'Ортопедия', severity: 'medium' },
  { id: 9, text: 'Подвижность зуба 28 (II степень)', toothNumber: '28', specialization: 'Хирургия', severity: 'medium' }
];

// Treatment Procedures with FDI numbering AND pathology
export const treatmentProcedures = [
  { 
    id: 1, 
    type: 'Имплант', 
    pathology: 'Отсутствует зуб 37',
    toothNumber: '37', 
    specialization: 'Ортопедия',
    estimatedCost: { min: 75000, max: 120000 },
    priority: 2
  },
  { 
    id: 2, 
    type: 'Имплант', 
    pathology: 'Отсутствует зуб 45',
    toothNumber: '45', 
    specialization: 'Ортопедия',
    estimatedCost: { min: 75000, max: 120000 },
    priority: 3
  },
  { 
    id: 3, 
    type: 'Коронка', 
    pathology: 'Пульпит зуба 25 (после лечения каналов)',
    toothNumber: '25', 
    specialization: 'Ортопедия',
    estimatedCost: { min: 30000, max: 45000 },
    priority: 1
  },
  { 
    id: 4, 
    type: 'Коронка', 
    pathology: 'Скол коронки зуба 21',
    toothNumber: '21', 
    specialization: 'Ортопедия',
    estimatedCost: { min: 35000, max: 50000 },
    priority: 2
  },
  { 
    id: 5, 
    type: 'Лечение каналов', 
    pathology: 'Пульпит зуба 25 (острый)',
    toothNumber: '25', 
    specialization: 'Терапия',
    estimatedCost: { min: 12000, max: 20000 },
    priority: 1
  },
  { 
    id: 6, 
    type: 'Лечение каналов', 
    pathology: 'Периодонтит зуба 37 (хронический)',
    toothNumber: '37', 
    specialization: 'Терапия',
    estimatedCost: { min: 12000, max: 20000 },
    priority: 1
  },
  { 
    id: 7, 
    type: 'Пломбирование', 
    pathology: 'Кариес зуба 16 (глубокий)',
    toothNumber: '16', 
    specialization: 'Терапия',
    estimatedCost: { min: 4000, max: 7000 },
    priority: 1
  },
  { 
    id: 8, 
    type: 'Пломбирование', 
    pathology: 'Кариес зуба 46 (средний)',
    toothNumber: '46', 
    specialization: 'Терапия',
    estimatedCost: { min: 4000, max: 6000 },
    priority: 2
  },
  { 
    id: 9, 
    type: 'Профессиональная чистка', 
    pathology: 'Гингивит (генерализованный)',
    toothNumber: null, 
    specialization: 'Терапия',
    estimatedCost: { min: 3000, max: 6000 },
    priority: 2
  },
  { 
    id: 10, 
    type: 'Удаление зуба', 
    pathology: 'Подвижность зуба 28 (II степень, не подлежит сохранению)',
    toothNumber: '28', 
    specialization: 'Хирургия',
    estimatedCost: { min: 3000, max: 8000 },
    priority: 2
  }
];

// Calculate costs by specialization
export const getCostBySpecialization = () => {
  const costs = {
    'Терапия': { min: 0, max: 0, procedures: [] },
    'Ортопедия': { min: 0, max: 0, procedures: [] },
    'Хирургия': { min: 0, max: 0, procedures: [] }
  };

  treatmentProcedures.forEach(proc => {
    if (costs[proc.specialization]) {
      costs[proc.specialization].min += proc.estimatedCost.min;
      costs[proc.specialization].max += proc.estimatedCost.max;
      costs[proc.specialization].procedures.push(proc);
    }
  });

  return costs;
};

// Clinic Offers
export const clinicOffers = [
  {
    id: 1,
    clinicName: 'СтомаПрофи',
    rating: 4.8,
    specializations: ['Терапия', 'Ортопедия', 'Хирургия'],
    costs: {
      'Терапия': 42000,
      'Ортопедия': 180000,
      'Хирургия': 6000,
      total: 228000
    },
    duration: '3-4 месяца',
    warranty: '5 лет на импланты',
    installment: 'До 12 месяцев',
    location: 'Москва, Центральный район',
    yearEstablished: 2015,
    license: 'ЛО-77-01-002345'
  },
  {
    id: 2,
    clinicName: 'ЭлитДент',
    rating: 4.9,
    specializations: ['Терапия', 'Ортопедия', 'Хирургия', 'Ортодонтия'],
    costs: {
      'Терапия': 55000,
      'Ортопедия': 245000,
      'Хирургия': 8000,
      total: 308000
    },
    duration: '3-5 месяцев',
    warranty: '10 лет на импланты',
    installment: 'До 24 месяцев',
    location: 'Москва, Центральный район',
    yearEstablished: 2010,
    license: 'ЛО-77-01-001234'
  },
  {
    id: 3,
    clinicName: 'Дентал Плюс',
    rating: 4.5,
    specializations: ['Терапия', 'Ортопедия', 'Хирургия'],
    costs: {
      'Терапия': 38000,
      'Ортопедия': 160000,
      'Хирургия': 5000,
      total: 203000
    },
    duration: '2-3 месяца',
    warranty: '3 года на импланты',
    installment: 'До 6 месяцев',
    location: 'Москва, Северный район',
    yearEstablished: 2018,
    license: 'ЛО-77-01-003456'
  }
];

// Incoming Orders (for clinics)
export const incomingOrders = [
  {
    id: 1,
    patientAge: 35,
    patientGender: 'Ж',
    date: '2025-12-15',
    specializations: ['Терапия', 'Ортопедия'],
    estimatedCost: 228000,
    status: 'new',
    contactShared: false
  },
  {
    id: 2,
    patientAge: 42,
    patientGender: 'М',
    date: '2025-12-14',
    specializations: ['Ортопедия'],
    estimatedCost: 450000,
    status: 'contact_requested',
    contactShared: true,
    patientName: 'Игорь Смирнов',
    patientPhone: '+7 926 555-5678'
  },
  {
    id: 3,
    patientAge: 28,
    patientGender: 'Ж',
    date: '2025-12-14',
    specializations: ['Терапия'],
    estimatedCost: 35000,
    status: 'consultation_scheduled',
    consultationDate: '2025-12-18 10:00'
  }
];

// Price List by Specialization
export const priceList = {
  'Терапия': [
    { service: 'Консультация', price: 1500, warranty: 0 },
    { service: 'Лечение каналов (1 канал)', price: 5000, warranty: 1 },
    { service: 'Лечение каналов (2 канала)', price: 8000, warranty: 1 },
    { service: 'Лечение каналов (3 канала)', price: 15000, warranty: 1 },
    { service: 'Пломба светоотверждаемая', price: 5000, warranty: 1 },
    { service: 'Профессиональная чистка', price: 4000, warranty: 0 },
    { service: 'Лечение кариеса', price: 6000, warranty: 1 }
  ],
  'Ортопедия': [
    { service: 'Консультация ортопеда', price: 2000, warranty: 0 },
    { service: 'Имплант Nobel Biocare', price: 95000, warranty: 10 },
    { service: 'Имплант Straumann', price: 120000, warranty: 10 },
    { service: 'Имплант Osstem', price: 75000, warranty: 5 },
    { service: 'Коронка металлокерамика', price: 30000, warranty: 2 },
    { service: 'Коронка циркониевая', price: 45000, warranty: 5 },
    { service: 'Винир керамический', price: 35000, warranty: 5 }
  ],
  'Хирургия': [
    { service: 'Консультация хирурга', price: 1500, warranty: 0 },
    { service: 'Удаление зуба простое', price: 3000, warranty: 0 },
    { service: 'Удаление зуба сложное', price: 6000, warranty: 0 },
    { service: 'Удаление зуба мудрости', price: 8000, warranty: 0 },
    { service: 'Костная пластика', price: 35000, warranty: 1 },
    { service: 'Синус-лифтинг', price: 45000, warranty: 1 }
  ]
};

// Treatment Status Tracking
export const treatmentStatuses = [
  {
    stage: 'Первичная консультация',
    specialization: 'Ортопедия',
    status: 'completed',
    date: '2025-11-20',
    doctor: 'Иванов А.С.'
  },
  {
    stage: 'Терапевтическое лечение',
    specialization: 'Терапия',
    status: 'in_progress',
    date: '2025-12-01',
    completedProcedures: 2,
    totalProcedures: 5,
    doctor: 'Петрова М.В.'
  },
  {
    stage: 'Хирургический этап',
    specialization: 'Хирургия',
    status: 'scheduled',
    date: '2025-12-20',
    doctor: 'Сидоров П.И.'
  },
  {
    stage: 'Ортопедическое лечение',
    specialization: 'Ортопедия',
    status: 'not_started',
    estimatedDate: 'Январь 2026',
    doctor: 'Иванов А.С.'
  }
];

// News Feed
export const newsFeed = [
  {
    id: 1,
    type: 'promotion',
    title: 'Скидка 15% на профессиональную чистку',
    clinic: 'СтомаПрофи',
    description: 'При записи до конца декабря - скидка 15% на профессиональную чистку зубов',
    validUntil: '2025-12-31',
    image: 'https://via.placeholder.com/400x200/4CAF50/ffffff?text=Promotion'
  },
  {
    id: 2,
    type: 'education',
    title: 'Как правильно ухаживать за имплантами',
    description: 'Видео-курс от ведущих специалистов о правильном уходе за имплантами',
    duration: '15 минут',
    image: 'https://via.placeholder.com/400x200/2196F3/ffffff?text=Education'
  },
  {
    id: 3,
    type: 'bonus',
    title: 'Кэшбэк 5% на ортопедическое лечение',
    clinic: 'ЭлитДент',
    description: 'Получите кэшбэк 5% на счет при оплате ортопедического лечения',
    validUntil: '2026-01-31',
    image: 'https://via.placeholder.com/400x200/FF9800/ffffff?text=Cashback'
  }
];

// Reviews and Complaints
export const reviews = [
  {
    id: 1,
    clinic: 'СтомаПрофи',
    rating: 5,
    comment: 'Отличное обслуживание, все прошло быстро и безболезненно',
    date: '2025-11-25',
    status: 'published'
  },
  {
    id: 2,
    clinic: 'СтомаПрофи',
    type: 'complaint',
    comment: 'Долгое ожидание приема, опоздали на 40 минут',
    date: '2025-12-10',
    status: 'under_review',
    clinicResponse: 'Приносим извинения, свяжемся с вами для решения вопроса'
  }
];

// Government Analytics Data
export const governmentAnalytics = {
  totalClinics: 145,
  activeClinics: 132,
  totalPatients: 45230,
  averageCostPerPatient: 185000,
  diseaseStats: [
    { disease: 'Кариес', cases: 12450, averageAge: 34 },
    { disease: 'Пульпит', cases: 5234, averageAge: 38 },
    { disease: 'Пародонтит', cases: 4187, averageAge: 45 },
    { disease: 'Периодонтит', cases: 2098, averageAge: 42 },
    { disease: 'Гингивит', cases: 3156, averageAge: 29 }
  ]
};

// Insurance: Patient Portfolio
export const insurancePatients = [
  {
    id: 1,
    name: 'Иван Петров',
    policyNumber: 'АС-12345678',
    age: 35,
    planDate: '2025-11-15',
    estimatedCost: 228000,
    approvedCost: null,
    status: 'under_review',
    specializations: ['Терапия', 'Ортопедия', 'Хирургия']
  },
  {
    id: 2,
    name: 'Мария Соколова',
    policyNumber: 'АС-87654321',
    age: 28,
    planDate: '2025-12-01',
    estimatedCost: 156000,
    approvedCost: 145000,
    status: 'approved',
    specializations: ['Терапия', 'Ортопедия']
  },
  {
    id: 3,
    name: 'Сергей Морозов',
    policyNumber: 'АС-11223344',
    age: 52,
    planDate: '2025-11-28',
    estimatedCost: 385000,
    approvedCost: 320000,
    status: 'partially_approved',
    specializations: ['Терапия', 'Ортопедия', 'Хирургия'],
    notes: 'Костная пластика требует дополнительного обоснования'
  }
];

// Helper function to get specialist recommendation
export const getSpecialistRecommendation = () => {
  const hasOrthodontics = treatmentProcedures.some(p => p.specialization === 'Ортопедия');
  const hasMissingTeeth = diagnoses.some(d => d.text.includes('Отсутствует'));

  if (hasOrthodontics || hasMissingTeeth) {
    return {
      specialist: 'Ортопед',
      reason: 'При наличии отсутствующих зубов или необходимости ортопедического лечения рекомендуется начать с консультации ортопеда'
    };
  }

  return {
    specialist: 'Терапевт',
    reason: 'Рекомендуется начать с терапевтического лечения'
  };
};
