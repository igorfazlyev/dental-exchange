export const mockClinics = [
  {
    id: 1,
    name: 'DNTL Клиника',
    logo: 'https://via.placeholder.com/100x100?text=DNTL',
    rating: 4.8,
    reviewCount: 342,
    yearEstablished: 2015,
    districts: ['Центральный', 'Тверской'],
    metro: ['Маяковская', 'Пушкинская'],
    address: 'ул. Тверская, 12',
    phone: '+7 (495) 123-45-67',
    website: 'https://dntl.ru',
    proDoctorsId: 'dntl-moscow',
    proDoctorsRating: 4.8,
    
    specializations: ['therapy', 'orthopedics', 'surgery', 'hygiene', 'periodontics'],
    
    doctors: [
      {
        id: 1,
        name: 'Иванов Сергей Петрович',
        specialization: 'therapy',
        experience: 15,
        photo: 'https://via.placeholder.com/150x150?text=Dr.+Ivanov',
        rating: 4.9,
        education: 'МГМСУ им. Евдокимова',
      },
      {
        id: 2,
        name: 'Петрова Анна Викторовна',
        specialization: 'orthopedics',
        experience: 12,
        photo: 'https://via.placeholder.com/150x150?text=Dr.+Petrova',
        rating: 4.7,
        education: 'СПбГМУ',
      },
    ],
    
    priceList: {
      therapy: {
        cariesTreatment: { min: 5000, max: 8000 },
        rootCanal: { min: 12000, max: 18000 },
        filling: { min: 3000, max: 5000 },
      },
      orthopedics: {
        crown: { min: 25000, max: 45000 },
        implant: { min: 80000, max: 120000 },
        denture: { min: 40000, max: 80000 },
      },
      surgery: {
        extraction: { min: 3000, max: 8000 },
        implantation: { min: 50000, max: 80000 },
      },
      hygiene: {
        cleaning: { min: 4000, max: 6000 },
        whitening: { min: 15000, max: 25000 },
      },
      periodontics: {
        treatment: { min: 10000, max: 20000 },
      },
    },
    
    features: {
      installment: true,
      installmentMonths: 12,
      discount: 10,
      freeConsultation: true,
      warrantyYears: 2,
    },
    
    workingHours: {
      weekdays: '9:00 - 21:00',
      weekends: '10:00 - 18:00',
    },
    
    photos: [
      'https://via.placeholder.com/400x300?text=Clinic+1',
      'https://via.placeholder.com/400x300?text=Clinic+2',
    ],
  },
  {
    id: 2,
    name: 'Смайл Центр',
    logo: 'https://via.placeholder.com/100x100?text=Smile',
    rating: 4.6,
    reviewCount: 218,
    yearEstablished: 2018,
    districts: ['Пресненский'],
    metro: ['Белорусская'],
    address: 'Ленинградский проспект, 45',
    phone: '+7 (495) 234-56-78',
    website: 'https://smile-center.ru',
    proDoctorsId: 'smile-moscow',
    proDoctorsRating: 4.6,
    
    specializations: ['therapy', 'orthopedics', 'hygiene'],
    
    doctors: [
      {
        id: 3,
        name: 'Смирнов Алексей Николаевич',
        specialization: 'therapy',
        experience: 10,
        photo: 'https://via.placeholder.com/150x150?text=Dr.+Smirnov',
        rating: 4.8,
        education: 'РУДН',
      },
    ],
    
    priceList: {
      therapy: {
        cariesTreatment: { min: 4500, max: 7000 },
        rootCanal: { min: 10000, max: 15000 },
        filling: { min: 2500, max: 4500 },
      },
      orthopedics: {
        crown: { min: 20000, max: 40000 },
        implant: { min: 70000, max: 100000 },
      },
      hygiene: {
        cleaning: { min: 3500, max: 5000 },
        whitening: { min: 12000, max: 20000 },
      },
    },
    
    features: {
      installment: true,
      installmentMonths: 6,
      discount: 5,
      freeConsultation: true,
      warrantyYears: 1,
    },
    
    workingHours: {
      weekdays: '8:00 - 20:00',
      weekends: '9:00 - 17:00',
    },
    
    photos: [
      'https://via.placeholder.com/400x300?text=Smile+1',
    ],
  },
  {
    id: 3,
    name: 'ДентаМед',
    logo: 'https://via.placeholder.com/100x100?text=DentaMed',
    rating: 4.9,
    reviewCount: 456,
    yearEstablished: 2012,
    districts: ['Хамовники'],
    metro: ['Фрунзенская'],
    address: 'Комсомольский проспект, 28',
    phone: '+7 (495) 345-67-89',
    website: 'https://dentamed.ru',
    proDoctorsId: 'dentamed-moscow',
    proDoctorsRating: 4.9,
    
    specializations: ['therapy', 'orthopedics', 'surgery', 'hygiene', 'periodontics'],
    
    doctors: [
      {
        id: 4,
        name: 'Козлова Мария Андреевна',
        specialization: 'orthopedics',
        experience: 18,
        photo: 'https://via.placeholder.com/150x150?text=Dr.+Kozlova',
        rating: 5.0,
        education: 'МГМСУ им. Евдокимова',
      },
      {
        id: 5,
        name: 'Новиков Дмитрий Сергеевич',
        specialization: 'surgery',
        experience: 14,
        photo: 'https://via.placeholder.com/150x150?text=Dr.+Novikov',
        rating: 4.8,
        education: 'Первый МГМУ им. Сеченова',
      },
    ],
    
    priceList: {
      therapy: {
        cariesTreatment: { min: 6000, max: 9000 },
        rootCanal: { min: 15000, max: 22000 },
        filling: { min: 4000, max: 6000 },
      },
      orthopedics: {
        crown: { min: 30000, max: 50000 },
        implant: { min: 90000, max: 130000 },
        denture: { min: 50000, max: 90000 },
      },
      surgery: {
        extraction: { min: 4000, max: 10000 },
        implantation: { min: 60000, max: 90000 },
      },
      hygiene: {
        cleaning: { min: 5000, max: 7000 },
        whitening: { min: 18000, max: 30000 },
      },
      periodontics: {
        treatment: { min: 12000, max: 25000 },
      },
    },
    
    features: {
      installment: true,
      installmentMonths: 18,
      discount: 15,
      freeConsultation: true,
      warrantyYears: 3,
    },
    
    workingHours: {
      weekdays: '8:00 - 22:00',
      weekends: '9:00 - 19:00',
    },
    
    photos: [
      'https://via.placeholder.com/400x300?text=DentaMed+1',
      'https://via.placeholder.com/400x300?text=DentaMed+2',
      'https://via.placeholder.com/400x300?text=DentaMed+3',
    ],
  },
];
