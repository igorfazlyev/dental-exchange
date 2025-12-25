export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceRange = (min, max) => {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatPhone = (phone) => {
  return phone; // Already formatted in mock data
};

export const getSpecializationDisplay = (specializationId) => {
  const displays = {
    therapy: 'Лечение зубов',
    orthopedics: 'Протезирование',
    surgery: 'Удаление и имплантация',
    hygiene: 'Гигиена и профилактика',
    periodontics: 'Лечение дёсен',
  };
  return displays[specializationId] || specializationId;
};

export const getStatusDisplay = (status) => {
  const displays = {
    idle: 'Начало',
    scan_uploaded: 'Снимок загружен',
    plan_ready: 'План готов',
    offers_received: 'Получены предложения',
    clinic_selected: 'Клиника выбрана',
    pending_contact: 'Ожидает звонка',
    scheduled: 'Запись оформлена',
    consultation_done: 'Консультация пройдена',
    in_treatment: 'Лечение начато',
    completed: 'Лечение завершено',
  };
  return displays[status] || status;
};

export const getStatusColor = (status) => {
  const colors = {
    idle: 'default',
    scan_uploaded: 'info',
    plan_ready: 'info',
    offers_received: 'primary',
    clinic_selected: 'secondary',
    pending_contact: 'warning',
    scheduled: 'success',
    consultation_done: 'success',
    in_treatment: 'success',
    completed: 'success',
  };
  return colors[status] || 'default';
};
