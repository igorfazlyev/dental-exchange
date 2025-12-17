import { useState } from 'react';
import { treatmentStatuses } from '../../data/mockData';

const PatientStatusTracking = () => {
  const [statuses] = useState(treatmentStatuses);

  const statusInfo = {
    completed: { color: '#4caf50', icon: 'fa-check-circle', text: 'Завершено' },
    in_progress: { color: '#2196f3', icon: 'fa-spinner', text: 'В процессе' },
    scheduled: { color: '#ff9800', icon: 'fa-clock', text: 'Запланировано' },
    not_started: { color: '#9e9e9e', icon: 'fa-circle', text: 'Не начато' }
  };

  return (
    <div>
      <h1><i className="fas fa-tasks"></i> Статус лечения</h1>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <i className="fas fa-route"></i>
            Прогресс лечения
          </div>
        </div>

        <div style={{marginBottom: '2rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
            <span>Общий прогресс</span>
            <span style={{fontWeight: 'bold'}}>40%</span>
          </div>
          <div style={{
            height: '20px',
            background: '#e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '40%',
              height: '100%',
              background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {statuses.map((status, index) => {
          const info = statusInfo[status.status];
          return (
            <div key={index} style={{
              padding: '1.5rem',
              marginBottom: '1rem',
              background: '#f5f5f5',
              borderRadius: '12px',
              borderLeft: `4px solid ${info.color}`
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem'}}>
                <div>
                  <h3 style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <i className={`fas ${info.icon}`} style={{color: info.color}}></i>
                    {status.stage}
                  </h3>
                  <span className="badge badge-info">{status.specialization}</span>
                </div>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: info.color,
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {info.text}
                </span>
              </div>

              <div className="grid grid-2">
                <div>
                  <i className="fas fa-user-md" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
                  <strong>Врач:</strong> {status.doctor}
                </div>
                <div>
                  <i className="fas fa-calendar" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
                  <strong>Дата:</strong> {status.date || status.estimatedDate}
                </div>
              </div>

              {status.completedProcedures && (
                <div style={{marginTop: '1rem'}}>
                  <div style={{marginBottom: '0.5rem'}}>
                    Выполнено процедур: {status.completedProcedures} из {status.totalProcedures}
                  </div>
                  <div style={{
                    height: '8px',
                    background: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(status.completedProcedures / status.totalProcedures) * 100}%`,
                      height: '100%',
                      background: info.color
                    }}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3><i className="fas fa-bell"></i> Уведомления</h3>
        <div style={{padding: '1rem', background: '#e3f2fd', borderRadius: '8px', marginBottom: '1rem'}}>
          <i className="fas fa-info-circle" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
          Не забудьте прийти на прием 20 декабря в 10:00
        </div>
        <div style={{padding: '1rem', background: '#e8f5e9', borderRadius: '8px'}}>
          <i className="fas fa-check-circle" style={{marginRight: '0.5rem', color: '#4caf50'}}></i>
          Терапевтическое лечение зуба 16 успешно завершено
        </div>
      </div>
    </div>
  );
};

export default PatientStatusTracking;
