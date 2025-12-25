export const mockOffers = [
  {
    id: 1,
    treatmentPlanId: 201,
    clinicId: 1,
    createdDate: '2024-12-21T09:00:00',
    status: 'pending', // 'pending', 'accepted', 'rejected'
    
    selectedSpecializations: ['therapy', 'hygiene'],
    
    pricing: {
      therapy: {
        total: 23000,
        breakdown: [
          { procedure: 'Лечение кариеса зуб 16', price: 6500 },
          { procedure: 'Эндодонтическое лечение зуб 26', price: 16500 },
        ],
      },
      hygiene: {
        total: 5000,
        breakdown: [
          { procedure: 'Профессиональная гигиена', price: 5000 },
        ],
      },
    },
    
    totalPrice: 28000,
    discountedPrice: 25200, // 10% discount
    
    estimatedDuration: {
      therapy: '3-4 визита',
      hygiene: '1 визит',
    },
    
    availableSlots: [
      { date: '2024-12-26', time: '10:00' },
      { date: '2024-12-26', time: '14:00' },
      { date: '2024-12-27', time: '11:00' },
    ],
    
    message: 'Мы готовы принять вас в ближайшее время. Первичная консультация бесплатно!',
  },
  {
    id: 2,
    treatmentPlanId: 201,
    clinicId: 2,
    createdDate: '2024-12-21T10:30:00',
    status: 'pending',
    
    selectedSpecializations: ['therapy', 'hygiene'],
    
    pricing: {
      therapy: {
        total: 19000,
        breakdown: [
          { procedure: 'Лечение кариеса зуб 16', price: 5500 },
          { procedure: 'Эндодонтическое лечение зуб 26', price: 13500 },
        ],
      },
      hygiene: {
        total: 4000,
        breakdown: [
          { procedure: 'Профессиональная гигиена', price: 4000 },
        ],
      },
    },
    
    totalPrice: 23000,
    discountedPrice: 21850, // 5% discount
    
    estimatedDuration: {
      therapy: '3 визита',
      hygiene: '1 визит',
    },
    
    availableSlots: [
      { date: '2024-12-28', time: '09:00' },
      { date: '2024-12-28', time: '15:00' },
    ],
    
    message: 'Специальное предложение: скидка 5% на первое лечение!',
  },
  {
    id: 3,
    treatmentPlanId: 201,
    clinicId: 3,
    createdDate: '2024-12-21T11:15:00',
    status: 'pending',
    
    selectedSpecializations: ['therapy', 'hygiene', 'orthopedics'],
    
    pricing: {
      therapy: {
        total: 28000,
        breakdown: [
          { procedure: 'Лечение кариеса зуб 16', price: 7500 },
          { procedure: 'Эндодонтическое лечение зуб 26', price: 20500 },
        ],
      },
      hygiene: {
        total: 6000,
        breakdown: [
          { procedure: 'Профессиональная гигиена', price: 6000 },
        ],
      },
      orthopedics: {
        total: 110000,
        breakdown: [
          { procedure: 'Имплантация с коронкой зуб 36', price: 110000 },
        ],
      },
    },
    
    totalPrice: 144000,
    discountedPrice: 122400, // 15% discount
    
    estimatedDuration: {
      therapy: '4 визита',
      hygiene: '1 визит',
      orthopedics: '3-4 месяца (включая приживление)',
    },
    
    availableSlots: [
      { date: '2024-12-25', time: '10:00' },
      { date: '2024-12-25', time: '16:00' },
      { date: '2024-12-27', time: '09:00' },
    ],
    
    message: 'Комплексное лечение со скидкой 15%! Рассрочка до 18 месяцев без процентов.',
  },
];
