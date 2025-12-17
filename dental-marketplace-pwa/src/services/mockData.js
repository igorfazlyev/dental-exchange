export const mockData = {
  treatmentPlan: {
    patientId: 'P12345',
    planId: 'TP-2025-001',
    createdDate: '2025-12-10',
    status: 'pending',
    items: [
      {
        id: 'item_1',
        toothNumber: 16,
        toothNumberDisplay: '16 (верхний правый первый моляр)',
        diagnosis: 'Кариес',
        procedure: 'Лечение кариеса с пломбированием',
        specialization: 'therapy',
        estimatedCostMin: 3500,
        estimatedCostMax: 6000,
        status: 'pending',
        priority: 'medium'
      },
      {
        id: 'item_2',
        toothNumber: 17,
        toothNumberDisplay: '17 (верхний правый второй моляр)',
        diagnosis: 'Глубокий кариес',
        procedure: 'Эндодонтическое лечение, пломбирование каналов',
        specialization: 'therapy',
        estimatedCostMin: 8000,
        estimatedCostMax: 12000,
        status: 'pending',
        priority: 'high'
      },
      {
        id: 'item_3',
        toothNumber: 26,
        toothNumberDisplay: '26 (верхний левый первый моляр)',
        diagnosis: 'Отсутствующий зуб',
        procedure: 'Имплантация с коронкой',
        specialization: 'orthopedics',
        estimatedCostMin: 45000,
        estimatedCostMax: 85000,
        status: 'pending',
        priority: 'medium',
        requiresConsultation: 'orthopedist'
      },
      {
        id: 'item_4',
        toothNumber: 36,
        toothNumberDisplay: '36 (нижний левый первый моляр)',
        diagnosis: 'Разрушенная коронка',
        procedure: 'Установка керамической коронки',
        specialization: 'orthopedics',
        estimatedCostMin: 18000,
        estimatedCostMax: 35000,
        status: 'pending',
        priority: 'high'
      },
      {
        id: 'item_5',
        toothNumber: 48,
        toothNumberDisplay: '48 (нижний правый третий моляр)',
        diagnosis: 'Ретинированный зуб мудрости',
        procedure: 'Удаление зуба мудрости',
        specialization: 'surgery',
        estimatedCostMin: 5000,
        estimatedCostMax: 12000,
        status: 'pending',
        priority: 'medium'
      }
    ],
    recommendations: {
      primarySpecialist: 'orthopedist',
      reason: 'Присутствуют ортопедические работы и отсутствующие зубы',
      sequence: ['orthopedist', 'surgery', 'therapy']
    }
  },

  costBreakdown: {
    therapy: {
      items: 2,
      minCost: 11500,
      maxCost: 18000
    },
    orthopedics: {
      items: 2,
      minCost: 63000,
      maxCost: 120000
    },
    surgery: {
      items: 1,
      minCost: 5000,
      maxCost: 12000
    },
    total: {
      items: 5,
      minCost: 79500,
      maxCost: 150000
    }
  },

  clinicOffers: [
    {
      clinicId: 'C001',
      clinicName: 'Дента Плюс',
      location: 'Москва, ул. Тверская, 12',
      distanceKm: 2.3,
      rating: 4.7,
      foundedYear: 2015,
      license: 'ЛО-77-01-019234',
      specializations: ['therapy', 'orthopedics', 'surgery'],
      selectedServices: {
        therapy: {
          cost: 14500,
          discount: 10,
          finalCost: 13050
        },
        orthopedics: {
          cost: 95000,
          discount: 5,
          finalCost: 90250
        },
        surgery: {
          cost: 8000,
          discount: 0,
          finalCost: 8000
        }
      },
      totalCost: 111300,
      paymentOptions: ['cash', 'card', 'installment_6m', 'installment_12m'],
      cashbackPercent: 3,
      availableSlots: [
        { date: '2025-12-20', time: '10:00', doctor: 'Иванов П.С.' },
        { date: '2025-12-20', time: '14:00', doctor: 'Петрова А.В.' },
        { date: '2025-12-23', time: '09:00', doctor: 'Иванов П.С.' }
      ]
    },
    {
      clinicId: 'C002',
      clinicName: 'Стоматология 32',
      location: 'Москва, Проспект Мира, 45',
      distanceKm: 3.8,
      rating: 4.9,
      foundedYear: 2010,
      license: 'ЛО-77-01-015678',
      specializations: ['therapy', 'orthopedics', 'surgery', 'orthodontics'],
      selectedServices: {
        therapy: {
          cost: 16000,
          discount: 0,
          finalCost: 16000
        },
        orthopedics: {
          cost: 105000,
          discount: 15,
          finalCost: 89250
        },
        surgery: {
          cost: 9500,
          discount: 0,
          finalCost: 9500
        }
      },
      totalCost: 114750,
      paymentOptions: ['cash', 'card', 'installment_12m', 'installment_24m'],
      cashbackPercent: 5,
      availableSlots: [
        { date: '2025-12-19', time: '11:00', doctor: 'Смирнов В.И.' },
        { date: '2025-12-21', time: '15:00', doctor: 'Козлова М.А.' }
      ],
      promotion: 'Скидка 15% на ортопедию до конца года'
    },
    {
      clinicId: 'C003',
      clinicName: 'Белоснежка',
      location: 'Москва, ул. Арбат, 28',
      distanceKm: 4.5,
      rating: 4.5,
      foundedYear: 2018,
      license: 'ЛО-77-01-021456',
      specializations: ['therapy', 'surgery'],
      selectedServices: {
        therapy: {
          cost: 13000,
          discount: 5,
          finalCost: 12350
        },
        surgery: {
          cost: 7500,
          discount: 0,
          finalCost: 7500
        }
      },
      totalCost: 19850,
      note: 'Ортопедические услуги не предоставляются',
      paymentOptions: ['cash', 'card', 'installment_6m'],
      cashbackPercent: 2,
      availableSlots: [
        { date: '2025-12-18', time: '10:00', doctor: 'Федоров Д.Н.' }
      ]
    }
  ],

  newsFeed: [
    {
      id: 'news_1',
      type: 'promotion',
      clinicId: 'C002',
      clinicName: 'Стоматология 32',
      title: 'Новогодняя акция: скидка 15% на ортопедию',
      description: 'До конца года действует специальное предложение на все виды ортопедических работ.',
      validUntil: '2025-12-31',
      imageUrl: '/images/promo-1.jpg'
    },
    {
      id: 'news_2',
      type: 'educational',
      title: 'Как правильно ухаживать за имплантами',
      description: 'Видео-курс от ведущих специалистов о правильном уходе за зубными имплантами.',
      videoUrl: '/videos/implant-care.mp4',
      durationMin: 15
    },
    {
      id: 'news_3',
      type: 'event',
      clinicId: 'C001',
      clinicName: 'Дента Плюс',
      title: 'Бесплатный семинар: современные методы отбеливания',
      description: '25 декабря приглашаем на бесплатный семинар о современных методах отбеливания зубов.',
      eventDate: '2025-12-25',
      registrationRequired: true
    }
  ],

  patientProfile: {
    id: 'P12345',
    name: 'Иван Петров',
    phone: '+7 (999) 123-45-67',
    email: 'ivan.petrov@example.com',
    activePlans: 1,
    completedTreatments: 3,
    bonusPoints: 1250,
    notificationsEnabled: true
  },

  clinicDashboard: {
    clinicId: 'C001',
    clinicName: 'Дента Плюс',
    roles: ['doctor', 'manager'],
    stats: {
      pendingOrders: 12,
      thisMonthOrders: 48,
      thisMonthRevenue: 1250000,
      conversionRate: 68,
      avgTreatmentCost: 26000
    },
    recentOrders: [
      {
        orderId: 'ORD-001',
        patientName: 'Анна С.',
        specializations: ['therapy', 'orthopedics'],
        estimatedValue: 85000,
        status: 'new',
        receivedDate: '2025-12-17'
      },
      {
        orderId: 'ORD-002',
        patientName: 'Михаил К.',
        specializations: ['surgery'],
        estimatedValue: 12000,
        status: 'consultation_scheduled',
        receivedDate: '2025-12-16'
      }
    ]
  },

  insuranceDashboard: {
    insuranceId: 'INS-001',
    companyName: 'МедГарант',
    portfolioStats: {
      totalPatients: 1520,
      activeTreatmentPlans: 234,
      pendingApprovals: 45,
      thisMonthClaims: 3200000,
      avgClaimAmount: 18500
    },
    pendingApprovals: [
      {
        claimId: 'CLM-789',
        patientName: 'Екатерина В.',
        treatmentPlanId: 'TP-2025-089',
        requestedAmount: 125000,
        aiEstimatedAmount: 118000,
        discrepancy: 7000,
        requiresReview: true,
        submittedDate: '2025-12-15'
      }
    ]
  }
};

export const specializationNames = {
  therapy: 'Терапия',
  orthopedics: 'Ортопедия',
  surgery: 'Хирургия',
  orthodontics: 'Ортодонтия'
};

export const priorityNames = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий'
};

export const statusNames = {
  pending: 'Ожидание',
  in_progress: 'В процессе',
  completed: 'Завершено',
  consultation_scheduled: 'Консультация назначена',
  new: 'Новый'
};
