import { useState } from 'react';

const PatientCriteria = () => {
  const [saved, setSaved] = useState(false);
  const [criteria, setCriteria] = useState({
    city: 'Москва',
    district: 'Центральный',
    priceSegment: 'Средний',
    startDate: '2025-12-20',
    specializations: {
      therapy: true,
      orthopedics: true,
      surgery: false,
      orthodontics: false
    },
    paymentOptions: {
      installment: true,
      discounts: false,
      insurance: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCheckbox = (category, field) => {
    setCriteria({
      ...criteria,
      [category]: {
        ...criteria[category],
        [field]: !criteria[category][field]
      }
    });
  };

  return (
    <div>
      <h1><i className="fas fa-sliders-h"></i> Настройка критериев поиска клиники</h1>

      {saved && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          Критерии поиска успешно сохранены!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <i className="fas fa-filter"></i>
              Основные параметры
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label><i className="fas fa-map-marker-alt"></i> Город</label>
              <select value={criteria.city} onChange={(e) => setCriteria({...criteria, city: e.target.value})}>
                <option>Москва</option>
                <option>Санкт-Петербург</option>
                <option>Казань</option>
                <option>Екатеринбург</option>
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-map-marked-alt"></i> Район</label>
              <select value={criteria.district} onChange={(e) => setCriteria({...criteria, district: e.target.value})}>
                <option>Центральный</option>
                <option>Северный</option>
                <option>Южный</option>
                <option>Восточный</option>
                <option>Западный</option>
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-dollar-sign"></i> Ценовой сегмент</label>
              <select value={criteria.priceSegment} onChange={(e) => setCriteria({...criteria, priceSegment: e.target.value})}>
                <option>Эконом</option>
                <option>Средний</option>
                <option>Бизнес</option>
                <option>Премиум</option>
              </select>
            </div>

            <div className="form-group">
              <label><i className="far fa-calendar-alt"></i> Желаемая дата начала лечения</label>
              <input
                type="date"
                value={criteria.startDate}
                onChange={(e) => setCriteria({...criteria, startDate: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <i className="fas fa-microscope"></i>
              Нужные специализации
            </div>
          </div>

          <div className="grid grid-2">
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={criteria.specializations.therapy}
                onChange={() => handleCheckbox('specializations', 'therapy')}
              />
              Терапия
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={criteria.specializations.orthopedics}
                onChange={() => handleCheckbox('specializations', 'orthopedics')}
              />
              Ортопедия
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={criteria.specializations.surgery}
                onChange={() => handleCheckbox('specializations', 'surgery')}
              />
              Хирургия
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={criteria.specializations.orthodontics}
                onChange={() => handleCheckbox('specializations', 'orthodontics')}
              />
              Ортодонтия
            </label>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <i className="fas fa-credit-card"></i>
              Условия оплаты
            </div>
          </div>

          <div className="grid grid-2">
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={criteria.paymentOptions.installment}
                onChange={() => handleCheckbox('paymentOptions', 'installment')}
              />
              Наличие рассрочки
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={criteria.paymentOptions.discounts}
                onChange={() => handleCheckbox('paymentOptions', 'discounts')}
              />
              Скидки и акции
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={criteria.paymentOptions.insurance}
                onChange={() => handleCheckbox('paymentOptions', 'insurance')}
              />
              Работа со страховыми
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-large">
          <i className="fas fa-save"></i> Сохранить критерии
        </button>
      </form>
    </div>
  );
};

export default PatientCriteria;
