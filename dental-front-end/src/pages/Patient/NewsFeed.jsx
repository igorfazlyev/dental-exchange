import { useState } from 'react';
import { newsFeed } from '../../data/mockData';

const PatientNewsFeed = () => {
  const [feed] = useState(newsFeed);

  const typeIcons = {
    promotion: { icon: 'fa-percent', color: '#4caf50' },
    education: { icon: 'fa-graduation-cap', color: '#2196f3' },
    bonus: { icon: 'fa-gift', color: '#ff9800' }
  };

  return (
    <div>
      <h1><i className="fas fa-newspaper"></i> Новости и акции</h1>

      <div className="grid grid-2">
        {feed.map(item => {
          const typeInfo = typeIcons[item.type];
          return (
            <div key={item.id} className="card">
              <img 
                src={item.image} 
                alt={item.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />

              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: typeInfo.color,
                color: 'white',
                borderRadius: '20px',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                <i className={`fas ${typeInfo.icon}`} style={{marginRight: '0.5rem'}}></i>
                {item.type === 'promotion' ? 'Акция' : item.type === 'education' ? 'Обучение' : 'Бонус'}
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {item.clinic && (
                <div style={{marginBottom: '0.5rem'}}>
                  <i className="fas fa-hospital" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
                  <strong>{item.clinic}</strong>
                </div>
              )}

              {item.validUntil && (
                <div style={{marginBottom: '1rem', color: '#757575'}}>
                  <i className="fas fa-clock" style={{marginRight: '0.5rem'}}></i>
                  Действует до {new Date(item.validUntil).toLocaleDateString('ru-RU')}
                </div>
              )}

              {item.duration && (
                <div style={{marginBottom: '1rem', color: '#757575'}}>
                  <i className="fas fa-video" style={{marginRight: '0.5rem'}}></i>
                  Длительность: {item.duration}
                </div>
              )}

              <button className="btn btn-primary">
                <i className="fas fa-arrow-right"></i> Подробнее
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientNewsFeed;
