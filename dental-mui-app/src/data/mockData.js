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
// News and promotions
// News and promotions
export const newsItems = [
  {
    id: 'news-001',
    type: 'promotion',
    title: 'Скидка 20% на имплантацию',
    clinic: 'СтомаПрофи',
    content: 'Специальное предложение на имплантацию зубов до конца месяца',
    detailedContent: `
      <h3>Специальное предложение на имплантацию зубов</h3>
      
      <p>Клиника СтомаПрофи объявляет о специальной акции на имплантацию зубов! Только до конца декабря вы можете воспользоваться скидкой 20% на все виды имплантации.</p>
      
      <h4>Что входит в акцию:</h4>
      <ul>
        <li>Бесплатная первичная консультация и 3D-диагностика</li>
        <li>Установка имплантов премиум-класса (Швейцария, Израиль)</li>
        <li>Скидка 20% на работу врача-имплантолога</li>
        <li>Гарантия на импланты - пожизненная</li>
        <li>Бесплатный контрольный осмотр через 1, 3 и 6 месяцев</li>
      </ul>
      
      <h4>Почему выбирают нас:</h4>
      <ul>
        <li>Опытные хирурги-имплантологи со стажем более 15 лет</li>
        <li>Современное оборудование и материалы</li>
        <li>Возможность рассрочки на 12 месяцев без переплат</li>
        <li>Индивидуальный подход к каждому пациенту</li>
      </ul>
      
      <p><strong>Не упустите возможность восстановить здоровье и красоту вашей улыбки по выгодной цене!</strong></p>
    `,
    validUntil: '2025-12-31',
    publishedAt: '2025-12-20',
    image: null,
  },
  {
    id: 'news-002',
    type: 'education',
    title: 'Как правильно ухаживать за зубами',
    clinic: null,
    content: 'Образовательный материал о гигиене полости рта',
    detailedContent: `
      <h3>Полное руководство по уходу за зубами</h3>
      
      <p>Правильная гигиена полости рта - это основа здоровых зубов и десен. Следуя простым правилам, вы можете значительно снизить риск кариеса и заболеваний десен.</p>
      
      <h4>Основные правила чистки зубов:</h4>
      <ul>
        <li><strong>Чистите зубы 2 раза в день</strong> - утром после завтрака и вечером перед сном</li>
        <li><strong>Продолжительность чистки - не менее 2 минут</strong></li>
        <li><strong>Используйте правильную технику:</strong> держите щетку под углом 45° к деснам, совершайте круговые движения</li>
        <li><strong>Не забывайте про язык</strong> - на нем скапливается много бактерий</li>
      </ul>
      
      <h4>Выбор зубной щетки и пасты:</h4>
      <ul>
        <li>Мягкая или средней жесткости щетка для большинства людей</li>
        <li>Меняйте щетку каждые 3 месяца</li>
        <li>Фторсодержащая паста для профилактики кариеса</li>
        <li>Электрические щетки более эффективны</li>
      </ul>
      
      <h4>Дополнительные средства гигиены:</h4>
      <ul>
        <li><strong>Зубная нить</strong> - обязательно 1 раз в день</li>
        <li><strong>Ополаскиватель</strong> - после каждой чистки</li>
        <li><strong>Ирригатор</strong> - особенно полезен при брекетах и имплантах</li>
      </ul>
      
      <h4>Питание для здоровых зубов:</h4>
      <ul>
        <li>Ограничьте сладкое и кислое</li>
        <li>Ешьте твердые овощи и фрукты - они естественно очищают зубы</li>
        <li>Пейте больше воды</li>
        <li>Продукты с кальцием: молоко, сыр, творог</li>
      </ul>
      
      <p><strong>Помните:</strong> профессиональная чистка у стоматолога нужна каждые 6 месяцев, даже при отличной домашней гигиене!</p>
    `,
    validUntil: null,
    publishedAt: '2025-12-18',
    image: null,
  },
  {
    id: 'news-003',
    type: 'bonus',
    title: 'Бонусная программа лояльности',
    clinic: 'Дента-Люкс',
    content: 'Накапливайте баллы и получайте скидки на услуги',
    detailedContent: `
      <h3>Программа лояльности "Дента-Люкс"</h3>
      
      <p>Мы ценим каждого нашего пациента! Представляем новую бонусную программу, которая позволит вам экономить на стоматологических услугах.</p>
      
      <h4>Как работает программа:</h4>
      <ul>
        <li><strong>Регистрация бесплатная</strong> - просто сообщите администратору о желании участвовать</li>
        <li><strong>За каждые 1000₽</strong> вы получаете 50 бонусных баллов</li>
        <li><strong>1 балл = 1 рубль</strong> при оплате следующих визитов</li>
        <li><strong>Баллы действуют 12 месяцев</strong> с момента начисления</li>
      </ul>
      
      <h4>Дополнительные бонусы:</h4>
      <ul>
        <li><strong>+500 баллов</strong> за регистрацию в программе</li>
        <li><strong>+1000 баллов</strong> в день рождения</li>
        <li><strong>+300 баллов</strong> за каждого приведенного друга</li>
        <li><strong>Двойные баллы</strong> на профилактические процедуры</li>
      </ul>
      
      <h4>Уровни программы:</h4>
      <ul>
        <li><strong>Серебряный (0-5000₽)</strong> - стандартное начисление баллов</li>
        <li><strong>Золотой (5001-15000₽)</strong> - начисление x1.5, скидка 5% на диагностику</li>
        <li><strong>Платиновый (15001₽+)</strong> - начисление x2, скидка 10% на все услуги</li>
      </ul>
      
      <h4>Как использовать баллы:</h4>
      <ul>
        <li>Баллами можно оплатить до 50% стоимости услуги</li>
        <li>Баллы суммируются с другими акциями и скидками</li>
        <li>Проверить баланс можно в личном кабинете или у администратора</li>
      </ul>
      
      <p><strong>Присоединяйтесь к программе лояльности и экономьте на здоровье ваших зубов!</strong></p>
    `,
    validUntil: null,
    publishedAt: '2025-12-22',
    image: null,
  },
  {
    id: 'news-004',
    type: 'promotion',
    title: 'Бесплатная консультация ортодонта',
    clinic: 'ЗдравМед',
    content: 'Запишитесь на бесплатную консультацию в декабре',
    detailedContent: `
      <h3>Бесплатная консультация ортодонта в декабре</h3>
      
      <p>Мечтаете о ровной и красивой улыбке? Клиника ЗдравМед предлагает бесплатную консультацию врача-ортодонта!</p>
      
      <h4>Что входит в бесплатную консультацию:</h4>
      <ul>
        <li>Полный осмотр полости рта</li>
        <li>Диагностика прикуса</li>
        <li>3D-сканирование челюстей</li>
        <li>Расчет примерной стоимости лечения</li>
        <li>Рекомендации по выбору метода коррекции</li>
      </ul>
      
      <h4>Виды ортодонтического лечения:</h4>
      <ul>
        <li><strong>Металлические брекеты</strong> - классический и надежный вариант</li>
        <li><strong>Керамические брекеты</strong> - эстетичное решение</li>
        <li><strong>Сапфировые брекеты</strong> - практически незаметны</li>
        <li><strong>Элайнеры (капы)</strong> - современная альтернатива брекетам</li>
        <li><strong>Лингвальные брекеты</strong> - устанавливаются с внутренней стороны зубов</li>
      </ul>
      
      <h4>Почему важно исправить прикус:</h4>
      <ul>
        <li>Правильное распределение нагрузки при жевании</li>
        <li>Профилактика заболеваний височно-нижнечелюстного сустава</li>
        <li>Улучшение дикции</li>
        <li>Облегчение гигиены полости рта</li>
        <li>Эстетика улыбки и повышение уверенности в себе</li>
      </ul>
      
      <h4>Наши преимущества:</h4>
      <ul>
        <li>Опытные врачи-ортодонты с международными сертификатами</li>
        <li>Современное оборудование для точной диагностики</li>
        <li>Индивидуальный план лечения</li>
        <li>Рассрочка до 24 месяцев</li>
        <li>Контроль на всех этапах лечения</li>
      </ul>
      
      <p><strong>Количество мест ограничено! Запишитесь на бесплатную консультацию прямо сейчас.</strong></p>
    `,
    validUntil: '2025-12-31',
    publishedAt: '2025-12-15',
    image: null,
  },
  {
    id: 'news-005',
    type: 'education',
    title: 'Профилактика кариеса у детей',
    clinic: null,
    content: 'Полезные советы для родителей о детской стоматологии',
    detailedContent: `
      <h3>Профилактика кариеса у детей: руководство для родителей</h3>
      
      <p>Здоровье молочных зубов критически важно для правильного развития постоянных зубов. Узнайте, как защитить зубы вашего ребенка от кариеса.</p>
      
      <h4>Когда начинать уход за зубами:</h4>
      <ul>
        <li><strong>С рождения</strong> - протирайте десны влажной марлей после кормления</li>
        <li><strong>С появления первого зуба</strong> - начинайте чистку специальной детской щеткой</li>
        <li><strong>С 2 лет</strong> - приучайте к самостоятельной чистке под контролем</li>
        <li><strong>С 6 лет</strong> - ребенок может чистить зубы сам, но родители должны проверять</li>
      </ul>
      
      <h4>Правила чистки детских зубов:</h4>
      <ul>
        <li>Чистите зубы 2 раза в день по 2 минуты</li>
        <li>Используйте мягкую детскую щетку</li>
        <li>Детям до 3 лет - паста размером с рисовое зернышко</li>
        <li>Детям 3-6 лет - паста размером с горошину</li>
        <li>Выбирайте пасту с фтором, соответствующую возрасту</li>
      </ul>
      
      <h4>Питание для здоровых детских зубов:</h4>
      <ul>
        <li><strong>Ограничьте сладкое</strong> - особенно между приемами пищи</li>
        <li><strong>Избегайте сладких напитков</strong> - соки, газировки разрушают эмаль</li>
        <li><strong>Полезные перекусы:</strong> овощи, фрукты, сыр, орехи</li>
        <li><strong>После сладкого</strong> - прополощите рот водой</li>
        <li><strong>Не давайте бутылочку на ночь</strong> - это вызывает "бутылочный кариес"</li>
      </ul>
      
      <h4>Профессиональная профилактика:</h4>
      <ul>
        <li><strong>Первый визит к стоматологу</strong> - в 1 год или при появлении первого зуба</li>
        <li><strong>Регулярные осмотры</strong> - каждые 6 месяцев</li>
        <li><strong>Фторирование</strong> - укрепление эмали специальным составом</li>
        <li><strong>Герметизация фиссур</strong> - запечатывание естественных углублений в зубах</li>
        <li><strong>Профессиональная чистка</strong> - по показаниям врача</li>
      </ul>
      
      <h4>Как подготовить ребенка к визиту к стоматологу:</h4>
      <ul>
        <li>Расскажите о визите заранее, но не пугайте</li>
        <li>Объясните, что врач просто посмотрит зубки</li>
        <li>Не используйте визит как наказание</li>
        <li>Сами сохраняйте спокойствие</li>
        <li>Похвалите ребенка после приема</li>
      </ul>
      
      <p><strong>Помните:</strong> молочные зубы нужно лечить! Их здоровье влияет на развитие постоянных зубов и общее здоровье ребенка.</p>
    `,
    validUntil: null,
    publishedAt: '2025-12-10',
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

// Government / Regulator Data

// Regional statistics
export const regionalStats = {
  region: 'Москва',
  totalPopulation: 12_500_000,
  registeredClinics: 245,
  activeClinics: 238,
  suspendedClinics: 7,
  totalDoctors: 3_450,
  totalPatients: 892_000,
  avgWaitTime: 4.2, // days
  patientSatisfaction: 4.3, // out of 5
}

// Clinic registry with license info
export const clinicRegistry = [
  {
    id: 'clinic-001',
    name: 'СтомаПрофи',
    legalName: 'ООО "СтомаПрофи"',
    inn: '7701234567',
    license: '№ ЛО-77-01-012345',
    licenseIssueDate: '2020-03-15',
    licenseValidUntil: '2030-03-15',
    status: 'active',
    address: 'г. Москва, ул. Тверская, д. 10',
    district: 'Центральный',
    director: 'Смирнов И.П.',
    chiefDoctor: 'Петрова А.С.',
    specialties: ['therapy', 'orthopedics', 'surgery'],
    doctorsCount: 12,
    patientsPerMonth: 450,
    complaintsCount: 2,
    rating: 4.8,
    lastInspection: '2025-06-15',
  },
  {
    id: 'clinic-002',
    name: 'Дента-Люкс',
    legalName: 'ООО "Дента-Люкс"',
    inn: '7702345678',
    license: '№ ЛО-77-01-023456',
    licenseIssueDate: '2019-05-20',
    licenseValidUntil: '2029-05-20',
    status: 'active',
    address: 'г. Москва, пр-т Мира, д. 45',
    district: 'Северный',
    director: 'Иванова М.В.',
    chiefDoctor: 'Сидоров П.К.',
    specialties: ['therapy', 'orthopedics'],
    doctorsCount: 8,
    patientsPerMonth: 320,
    complaintsCount: 1,
    rating: 4.6,
    lastInspection: '2025-08-10',
  },
  {
    id: 'clinic-003',
    name: 'ЗдравМед',
    legalName: 'ООО "ЗдравМед"',
    inn: '7703456789',
    license: '№ ЛО-77-01-034567',
    licenseIssueDate: '2021-01-10',
    licenseValidUntil: '2031-01-10',
    status: 'active',
    address: 'г. Москва, ул. Южная, д. 88',
    district: 'Южный',
    director: 'Козлов В.А.',
    chiefDoctor: 'Морозова Е.Н.',
    specialties: ['therapy', 'orthopedics', 'surgery'],
    doctorsCount: 15,
    patientsPerMonth: 580,
    complaintsCount: 3,
    rating: 4.5,
    lastInspection: '2025-09-22',
  },
  {
    id: 'clinic-004',
    name: 'Стоматология 24',
    legalName: 'ООО "Стоматология 24"',
    inn: '7704567890',
    license: '№ ЛО-77-01-045678',
    licenseIssueDate: '2018-11-05',
    licenseValidUntil: '2028-11-05',
    status: 'active',
    address: 'г. Москва, Ленинский пр-т, д. 120',
    district: 'Западный',
    director: 'Новиков Д.С.',
    chiefDoctor: 'Федорова А.П.',
    specialties: ['therapy', 'surgery'],
    doctorsCount: 10,
    patientsPerMonth: 410,
    complaintsCount: 1,
    rating: 4.7,
    lastInspection: '2025-07-18',
  },
  {
    id: 'clinic-005',
    name: 'ДентаПлюс',
    legalName: 'ООО "ДентаПлюс"',
    inn: '7705678901',
    license: '№ ЛО-77-01-056789',
    licenseIssueDate: '2022-02-28',
    licenseValidUntil: '2032-02-28',
    status: 'active',
    address: 'г. Москва, ул. Восточная, д. 55',
    district: 'Восточный',
    director: 'Соколов И.В.',
    chiefDoctor: 'Кузнецова М.И.',
    specialties: ['therapy', 'orthopedics', 'surgery'],
    doctorsCount: 18,
    patientsPerMonth: 620,
    complaintsCount: 0,
    rating: 4.9,
    lastInspection: '2025-10-05',
  },
  {
    id: 'clinic-006',
    name: 'Белый Клык',
    legalName: 'ООО "Белый Клык"',
    inn: '7706789012',
    license: '№ ЛО-77-01-067890',
    licenseIssueDate: '2017-09-12',
    licenseValidUntil: '2027-09-12',
    status: 'suspended',
    address: 'г. Москва, ул. Северная, д. 33',
    district: 'Северный',
    director: 'Волков С.М.',
    chiefDoctor: 'Лебедев А.Н.',
    specialties: ['therapy'],
    doctorsCount: 5,
    patientsPerMonth: 150,
    complaintsCount: 8,
    rating: 3.2,
    lastInspection: '2025-11-20',
    suspensionReason: 'Множественные нарушения санитарных норм',
  },
]

// Regional analytics by district
export const districtAnalytics = [
  {
    district: 'Центральный',
    clinicsCount: 45,
    doctorsCount: 620,
    patientsCount: 156_000,
    avgWaitTime: 3.5,
    avgRating: 4.7,
    complaintsCount: 12,
  },
  {
    district: 'Северный',
    clinicsCount: 52,
    doctorsCount: 710,
    patientsCount: 178_000,
    avgWaitTime: 4.2,
    avgRating: 4.5,
    complaintsCount: 18,
  },
  {
    district: 'Южный',
    clinicsCount: 48,
    doctorsCount: 650,
    patientsCount: 165_000,
    avgWaitTime: 4.8,
    avgRating: 4.4,
    complaintsCount: 22,
  },
  {
    district: 'Западный',
    clinicsCount: 50,
    doctorsCount: 690,
    patientsCount: 172_000,
    avgWaitTime: 4.0,
    avgRating: 4.6,
    complaintsCount: 15,
  },
  {
    district: 'Восточный',
    clinicsCount: 50,
    doctorsCount: 680,
    patientsCount: 168_000,
    avgWaitTime: 4.5,
    avgRating: 4.5,
    complaintsCount: 20,
  },
]

// Monthly treatment statistics
export const monthlyTreatmentStats = [
  { month: 'Июнь', patients: 68_200, procedures: 142_000, revenue: 856_000_000 },
  { month: 'Июль', patients: 71_500, procedures: 148_500, revenue: 891_000_000 },
  { month: 'Август', patients: 69_800, procedures: 145_200, revenue: 871_000_000 },
  { month: 'Сентябрь', patients: 74_200, procedures: 154_000, revenue: 924_000_000 },
  { month: 'Октябрь', patients: 76_500, procedures: 159_000, revenue: 954_000_000 },
  { month: 'Ноябрь', patients: 78_100, procedures: 162_300, revenue: 973_000_000 },
]

// Specialty distribution
export const specialtyDistribution = [
  { specialty: 'Терапия', procedures: 45_600, share: 48 },
  { specialty: 'Ортопедия', procedures: 28_500, share: 30 },
  { specialty: 'Хирургия', procedures: 20_900, share: 22 },
]

// Quality indicators
export const qualityIndicators = [
  {
    indicator: 'Соблюдение санитарных норм',
    compliance: 96,
    target: 95,
    status: 'good',
  },
  {
    indicator: 'Наличие действующих лицензий',
    compliance: 97,
    target: 100,
    status: 'warning',
  },
  {
    indicator: 'Своевременность оказания услуг',
    compliance: 89,
    target: 90,
    status: 'warning',
  },
  {
    indicator: 'Удовлетворенность пациентов',
    compliance: 86,
    target: 85,
    status: 'good',
  },
]
