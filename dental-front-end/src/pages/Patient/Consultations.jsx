import { useState } from 'react';

const PatientConsultations = () => {
  const [consultations] = useState([
    {
      id: 1,
      clinic: 'СтомаПрофи',
      doctor: 'Иванов А.С.',
      specialization: 'Ортопед',
      date: '2025-11-20',
      time: '10:00',
      status: 'completed',
      notes: 'Проведена первичная консультация, составлен план лечения'
    },
    {
      id: 2,
      clinic: 'СтомаПрофи',
      doctor: 'Петрова М.В.',
      specialization: 'Терапевт',
      date: '2025-12-20',
      time: '14:30',
      status: 'scheduled'
    }
  ]);

  const statusInfo = {
    completed: { color: '#4caf50', icon: 'fa-check-circle', text: 'Завершена' },
    scheduled: { color: '#2196f3', icon: 'fa-clock', text: 'Запланирована' },
    cancelled: { color: '#f44336', icon: 'fa-times-circle', text: 'Отменена' }
  };

  return (
    <div>
      <h1><i className="fas fa-calendar-check"></i> Мои консультации</h1>

      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Записаться на консультацию
        </button>
        <button className="btn btn-outline">
          <i className="fas fa-calendar"></i> Показать все даты
        </button>
      </div>

      {consultations.map(consultation => {
        const info = statusInfo[consultation.status];
        return (
          <div key={consultation.id} className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem'}}>
              <div>
                <h3 style={{marginBottom: '0.5rem'}}>{consultation.clinic}</h3>
                <div style={{color: '#757575', marginBottom: '0.5rem'}}>
                  <i className="fas fa-user-md" style={{marginRight: '0.5rem'}}></i>
                  {consultation.doctor} — {consultation.specialization}
                </div>
              </div>
              <span style={{
                padding: '0.5rem 1rem',
                background: info.color,
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.875rem'
              }}>
                <i className={`fas ${info.icon}`} style={{marginRight: '0.5rem'}}></i>
                {info.text}
              </span>
            </div>

            <div className="grid grid-2" style={{marginBottom: '1.5rem'}}>
              <div>
                <i className="fas fa-calendar" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
                <strong>Дата:</strong> {new Date(consultation.date).toLocaleDateString('ru-RU')}
              </div>
              <div>
                <i className="fas fa-clock" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
                <strong>Время:</strong> {consultation.time}
              </div>
            </div>

            {consultation.notes && (
              <div style={{
                padding: '1rem',
                background: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <strong>Заметки врача:</strong>
                <p style={{margin: '0.5rem 0 0'}}>{consultation.notes}</p>
              </div>
            )}

            {consultation.status === 'scheduled' && (
              <div style={{display: 'flex', gap: '1rem'}}>
                <button className="btn btn-danger">
                  <i className="fas fa-times"></i> Отменить запись
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-edit"></i> Перенести
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PatientConsultations;
