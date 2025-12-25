export const mockPatients = [
  {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    age: 32,
    gender: 'male',
    scans: [
      {
        id: 101,
        uploadDate: '2024-12-20T10:30:00',
        status: 'processed', // 'uploading', 'processing', 'processed'
        source: 'Золотое Сечение',
        imageUrl: 'https://via.placeholder.com/400x300?text=CT+Scan',
      },
    ],
    treatmentPlans: [
      {
        id: 201,
        scanId: 101,
        createdDate: '2024-12-20T11:00:00',
        status: 'offers_received', // 'draft', 'published', 'offers_received', 'clinic_selected', 'in_treatment', 'completed'
        specializations: [
          {
            type: 'therapy',
            procedures: [
              {
                id: 1,
                toothNumber: 16,
                diagnosis: 'Кариес',
                procedure: 'Лечение кариеса с пломбированием',
                urgency: 'medium',
                estimatedPrice: { min: 5000, max: 8000 },
              },
              {
                id: 2,
                toothNumber: 26,
                diagnosis: 'Пульпит',
                procedure: 'Эндодонтическое лечение',
                urgency: 'high',
                estimatedPrice: { min: 12000, max: 18000 },
              },
            ],
            totalPrice: { min: 17000, max: 26000 },
          },
          {
            type: 'hygiene',
            procedures: [
              {
                id: 3,
                toothNumber: null,
                diagnosis: 'Зубной камень',
                procedure: 'Профессиональная гигиена полости рта',
                urgency: 'low',
                estimatedPrice: { min: 4000, max: 6000 },
              },
            ],
            totalPrice: { min: 4000, max: 6000 },
          },
          {
            type: 'orthopedics',
            procedures: [
              {
                id: 4,
                toothNumber: 36,
                diagnosis: 'Отсутствующий зуб',
                procedure: 'Имплантация с коронкой',
                urgency: 'medium',
                estimatedPrice: { min: 80000, max: 120000 },
              },
            ],
            totalPrice: { min: 80000, max: 120000 },
          },
        ],
        totalEstimate: { min: 101000, max: 152000 },
      },
    ],
    appointments: [],
    selectedOffers: [],
  },
];
