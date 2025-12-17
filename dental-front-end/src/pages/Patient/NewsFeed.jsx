import { useState } from 'react';
import { newsFeed } from '../../data/mockData';

const PatientNewsFeed = () => {
  const [feed] = useState(newsFeed);

  const typeIcons = {
    promotion: { icon: 'fa-percent', color: '#4caf50', label: 'Акция' },
    education: { icon: 'fa-graduation-cap', color: '#2196f3', label: 'Обучение' },
    bonus: { icon: 'fa-gift', color: '#ff9800', label: 'Бонус' }
  };

  return (
    <div>
      <h1><i className="fas fa-newspaper"></i> Новости и акции</h1>

      <div className="grid grid-2">
        {feed.map(item => {
          const typeInfo = typeIcons[item.type];
          return (
            <div key={item.id} className="card" style={{position: 'relative'}}>
              {/* Image */}
              <div style={{
                width: '100%',
                height: '200px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <i className={`fas ${typeInfo.icon}`} style={{opacity: 0.3}}></i>
                {/* Type Badge - positioned on image */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem 1rem',
                  background: typeInfo.color,
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  <i className={`fas ${typeInfo.icon}`}></i>
                  {typeInfo.label}
                </div>
              </div>

              <h3 style={{marginBottom: '1rem'}}>{item.title}</h3>
              <p style={{marginBottom: '1rem', color: '#757575'}}>{item.description}</p>

              {item.clinic && (
                <div style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <i className="fas fa-hospital" style={{color: '#1976d2'}}></i>
                  <strong>{item.clinic}</strong>
                </div>
              )}

              {item.validUntil && (
                <div style={{marginBottom: '1rem', color: '#757575', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <i className="fas fa-clock"></i>
                  Действует до {new Date(item.validUntil).toLocaleDateString('ru-RU')}
                </div>
              )}

              {item.duration && (
                <div style={{marginBottom: '1rem', color: '#757575', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <i className="fas fa-video"></i>
                  Длительность: {item.duration}
                </div>
              )}

              <button className="btn btn-primary" style={{width: '100%'}}>
                <i className="fas fa-arrow-right"></i> Подробнее
              </button>
            </div>
          );
        })}
      </div>

      {/* Info card */}
      <div className="card" style={{marginTop: '2rem', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'}}>
        <h3><i className="fas fa-info-circle"></i> О новостной ленте</h3>
        <p style={{margin: 0}}>
          Здесь вы найдете актуальные акции от клиник, обучающие материалы по уходу за зубами, 
          информацию о бонусах и кэшбэке. Следите за обновлениями, чтобы не пропустить выгодные предложения!
        </p>
      </div>
    </div>
  );
};

export default PatientNewsFeed;
