// Mock data for Dental Platform with FDI tooth numbering and specialties

// Treatment plan items with FDI numbering (11-48) and specialty classification
export const treatmentPlanItems = [
  {
    id: '1',
    toothNumber: 16,
    pathology: 'Кариес',
    procedureType: 'Пломбирование',
    specialty: 'therapy',
    estimatedCostMin: 3000,
    estimatedCostMax: 5000,
    status: 'planned',
  },
  {
    id: '2',
    toothNumber: 25,
    pathology: 'Глубокий кариес',
    procedureType: 'Лечение каналов',
    specialty: 'therapy',
    estimatedCostMin: 8000,
    estimatedCostMax: 12000,
    status: 'planned',
  },
  {
    id: '3',
    toothNumber: 37,
    pathology: 'Отсутствующий зуб',
    procedureType: 'Имплантация',
    specialty: 'orthopedics',
    estimatedCostMin: 45000,
    estimatedCostMax: 65000,
    status: 'planned',
  },
  {
    id: '4',
    toothNumber: 11,
    pathology: 'Скол',
    procedureType: 'Керамическая коронка',
    specialty: 'orthopedics',
    estimatedCostMin: 25000,
    estimatedCostMax: 35000,
    status: 'planned',
  },
  {
    id: '5',
    toothNumber: 48,
    pathology: 'Ретинированный зуб мудрости',
    procedureType: 'Удаление',
    specialty: 'surgery',
    estimatedCostMin: 5000,
    estimatedCostMax: 8000,
    status: 'planned',
  },
]

// Treatment plan with AI analysis result
export const treatmentPlan = {
  id: 'plan-001',
  patientId: 'patient',
  createdAt: '2025-11-15T10:00:00Z',
  aiAnalyzed: true,
  items: treatmentPlanItems,
  recommendation: {
    specialist: 'Ортопед',
    reason: 'При наличии отсутствующих зубов или необходимости ортопедического лечения рекомендуется начать с консультации ортопеда',
  },
}

// Patient scans
export const patientScans = [
  {
    id: 'scan-001',
    date: '2025-11-15',
    type: 'CT',
    status: 'processed',
    aiAnalyzed: true,
  },
  {
    id: 'scan-002',
    date: '2025-10-20',
    type: 'Panoramic',
    status: 'processed',
    aiAnalyzed: true,
  },
  {
    id: 'scan-003',
    date: '2025-09-10',
    type: 'CT',
    status: 'in_progress',
    aiAnalyzed: false,
  },
]

// News and promotions
export const newsItems = [
  {
    id: 'news-001',
    type: 'promotion',
    title: 'Скидка 20% на имплантацию',
    clinic: 'СтомаПрофи',
    content: 'Специальное предложение на имплантацию зубов до конца месяца',
    validUntil: '2025-12-31',
    image: null,
  },
  {
    id: 'news-002',
    type: 'education',
    title: 'Как правильно ухаживать за зубами',
    clinic: null,
    content: 'Образовательный материал о гигиене полости рта',
    validUntil: null,
    image: null,
  },
  {
    id: 'news-003',
    type: 'bonus',
    title: 'Бонусная программа лояльности',
    clinic: 'Дента-Люкс',
    content: 'Накапливайте баллы и получайте скидки на услуги',
    validUntil: null,
    image: null,
  },
]

// Clinic offers with specialty-based pricing
export const clinicOffers = [
  {
    id: 'offer-001',
    clinicId: 'clinic-001',
    clinicName: 'СтомаПрофи',
    city: 'Москва',
    area: 'Центральный район',
    specialties: ['therapy', 'orthopedics', 'surgery'],
    priceBySpecialty: {
      therapy: { min: 10000, max: 15000 },
      orthopedics: { min: 65000, max: 95000 },
      surgery: { min: 5000, max: 8000 },
    },
    totalPrice: { min: 80000, max: 118000 },
    discount: '10% на полный план лечения',
    installment: 'Рассрочка до 12 месяцев',
    promoComment: 'Бесплатная консультация ортопеда',
    distance: 2.5,
    rating: 4.8,
  },
  {
    id: 'offer-002',
    clinicId: 'clinic-002',
    clinicName: 'Дента-Люкс',
    city: 'Москва',
    area: 'Северный район',
    specialties: ['therapy', 'orthopedics'],
    priceBySpecialty: {
      therapy: { min: 12000, max: 18000 },
      orthopedics: { min: 70000, max: 105000 },
    },
    totalPrice: { min: 82000, max: 123000 },
    discount: null,
    installment: 'Кредит от банка-партнера',
    promoComment: null,
    distance: 5.3,
    rating: 4.6,
  },
  {
    id: 'offer-003',
    clinicId: 'clinic-003',
    clinicName: 'ЗдравМед',
    city: 'Москва',
    area: 'Южный район',
    specialties: ['therapy', 'orthopedics', 'surgery'],
    priceBySpecialty: {
      therapy: { min: 9000, max: 13000 },
      orthopedics: { min: 60000, max: 85000 },
      surgery: { min: 4500, max: 7000 },
    },
    totalPrice: { min: 73500, max: 105000 },
    discount: '15% для новых пациентов',
    installment: 'Рассрочка до 6 месяцев',
    promoComment: 'Работаем со страховыми',
    distance: 7.8,
    rating: 4.5,
  },
]

// Treatment stages/statuses
export const treatmentStages = [
  {
    id: 'stage-001',
    name: 'Первичная консультация',
    specialty: 'orthopedics',
    status: 'done',
    completedAt: '2025-11-20',
  },
  {
    id: 'stage-002',
    name: 'Терапевтическое лечение',
    specialty: 'therapy',
    status: 'in_progress',
    completedAt: null,
  },
  {
    id: 'stage-003',
    name: 'Хирургическое лечение',
    specialty: 'surgery',
    status: 'not_started',
    completedAt: null,
  },
  {
    id: 'stage-004',
    name: 'Ортопедическое лечение',
    specialty: 'orthopedics',
    status: 'not_started',
    completedAt: null,
  },
]

// Patient consultations
export const patientConsultations = [
  {
    id: 'cons-001',
    date: '2025-11-20',
    clinicName: 'СтомаПрофи',
    doctorName: 'Д-р Смирнов',
    specialty: 'orthopedics',
    results: 'План лечения согласован, начинаем с терапии',
    nextAppointment: '2025-12-05',
    canReview: true,
  },
  {
    id: 'cons-002',
    date: '2025-10-15',
    clinicName: 'Дента-Люкс',
    doctorName: 'Д-р Иванова',
    specialty: 'therapy',
    results: 'Профессиональная чистка выполнена',
    nextAppointment: null,
    canReview: true,
  },
]

// Clinic orders (for clinic dashboard)
export const clinicOrders = [
  {
    id: 'order-001',
    patientName: 'Иван Петров',
    status: 'in_progress',
    createdAt: '2025-11-15',
    stages: treatmentStages,
    totalPrice: { min: 80000, max: 118000 },
  },
  {
    id: 'order-002',
    patientName: 'Анна Сидорова',
    status: 'new',
    createdAt: '2025-12-20',
    stages: [
      {
        id: 'stage-new-001',
        name: 'Консультация',
        specialty: 'therapy',
        status: 'not_started',
        completedAt: null,
      },
    ],
    totalPrice: { min: 15000, max: 25000 },
  },
  {
    id: 'order-003',
    patientName: 'Петр Васильев',
    status: 'completed',
    createdAt: '2025-09-01',
    stages: [
      {
        id: 'stage-comp-001',
        name: 'Имплантация',
        specialty: 'orthopedics',
        status: 'done',
        completedAt: '2025-11-30',
      },
    ],
    totalPrice: { min: 50000, max: 65000 },
  },
]

// Clinic price list by specialty
export const clinicPriceList = [
  // Therapy
  {
    id: 'price-001',
    code: 'T001',
    name: 'Лечение кариеса (пломба)',
    specialty: 'therapy',
    price: 4000,
  },
  {
    id: 'price-002',
    code: 'T002',
    name: 'Лечение пульпита (1 канал)',
    specialty: 'therapy',
    priceFrom: 8000,
    priceTo: 12000,
  },
  {
    id: 'price-003',
    code: 'T003',
    name: 'Профессиональная чистка',
    specialty: 'therapy',
    price: 5000,
  },
  // Orthopedics
  {
    id: 'price-004',
    code: 'O001',
    name: 'Металлокерамическая коронка',
    specialty: 'orthopedics',
    priceFrom: 18000,
    priceTo: 25000,
  },
  {
    id: 'price-005',
    code: 'O002',
    name: 'Керамическая коронка',
    specialty: 'orthopedics',
    priceFrom: 28000,
    priceTo: 40000,
  },
  {
    id: 'price-006',
    code: 'O003',
    name: 'Имплантация (с установкой)',
    specialty: 'orthopedics',
    priceFrom: 50000,
    priceTo: 70000,
  },
  // Surgery
  {
    id: 'price-007',
    code: 'S001',
    name: 'Удаление зуба простое',
    specialty: 'surgery',
    price: 3000,
  },
  {
    id: 'price-008',
    code: 'S002',
    name: 'Удаление зуба сложное',
    specialty: 'surgery',
    priceFrom: 6000,
    priceTo: 10000,
  },
]

// Clinic complaints
export const clinicComplaints = [
  {
    id: 'complaint-001',
    patientName: 'Мария Иванова',
    orderId: 'order-005',
    text: 'Долгое ожидание приема',
    status: 'in_review',
    createdAt: '2025-12-18',
    response: null,
  },
  {
    id: 'complaint-002',
    patientName: 'Сергей Петров',
    orderId: 'order-008',
    text: 'Некачественная работа',
    status: 'resolved',
    createdAt: '2025-12-10',
    response: 'Пациент приглашен на повторный прием, работа исправлена',
    resolvedAt: '2025-12-15',
  },
]

// Insurance portfolio (for insurance company)
export const insurancePortfolio = [
  {
    id: 'ins-patient-001',
    patientName: 'Иван Петров',
    policyNumber: 'POL-2025-001',
    treatmentPlanId: 'plan-001',
    estimatedCost: { min: 80000, max: 118000 },
    approvedLimit: 100000,
    status: 'under_review',
  },
  {
    id: 'ins-patient-002',
    patientName: 'Анна Сидорова',
    policyNumber: 'POL-2025-002',
    treatmentPlanId: 'plan-002',
    estimatedCost: { min: 15000, max: 25000 },
    approvedLimit: 30000,
    status: 'approved',
  },
]

// Helper function to calculate cost by specialty
export const getCostBySpecialty = (items = treatmentPlanItems) => {
  const result = {
    therapy: { min: 0, max: 0, procedures: [] },
    orthopedics: { min: 0, max: 0, procedures: [] },
    surgery: { min: 0, max: 0, procedures: [] },
  }

  items.forEach(item => {
    if (item.specialty && result[item.specialty]) {
      result[item.specialty].min += item.estimatedCostMin || 0
      result[item.specialty].max += item.estimatedCostMax || 0
      result[item.specialty].procedures.push(item)
    }
  })

  return result
}

// Helper to get specialist recommendation
export const getSpecialistRecommendation = (items = treatmentPlanItems) => {
  const hasOrthopedics = items.some(item => item.specialty === 'orthopedics')
  const hasSurgery = items.some(item => item.specialty === 'surgery')
  const hasTherapy = items.some(item => item.specialty === 'therapy')

  if (hasOrthopedics) {
    return {
      specialist: 'Ортопед',
      reason: 'При наличии отсутствующих зубов или необходимости ортопедического лечения рекомендуется начать с консультации ортопеда',
    }
  }

  if (hasSurgery && !hasTherapy) {
    return {
      specialist: 'Хирург',
      reason: 'Необходимо хирургическое вмешательство',
    }
  }

  return {
    specialist: 'Терапевт',
    reason: 'Рекомендуется начать с терапевтического лечения',
  }
}