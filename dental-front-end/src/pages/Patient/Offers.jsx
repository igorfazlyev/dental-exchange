import { useState } from 'react';
import { clinicOffers, getCostBySpecialization } from '../../data/mockData';

const PatientOffers = () => {
  const [offers] = useState(clinicOffers);
  const [selectedSpec, setSelectedSpec] = useState('all');
  const costBySpec = getCostBySpecialization();

  const formatCost = (cost) => cost.toLocaleString('ru-RU') + ' ₽';

  const specializations = ['all', 'Терапия', 'Ортопедия', 'Хирургия'];

  return (
    <div>
      <h1><i className="fas fa-hospital-alt"></i> Предложения клиник</h1>

      {/* Filter by Specialization */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <i className="fas fa-filter"></i>
            Выбор специализации
          </div>
        </div>
        <p>Выберите специализацию для получения предложений или запросите по всему плану лечения</p>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          {specializations.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`btn ${selectedSpec === spec ? 'btn-primary' : 'btn-outline'}`}
            >
              {spec === 'all' ? 'Весь план' : spec}
              {spec !== 'all' && costBySpec[spec] && (
                <span style={{marginLeft: '0.5rem', fontSize: '0.875rem'}}>
                  ({formatCost(costBySpec[spec].min)} - {formatCost(costBySpec[spec].max)})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Clinic Offers */}
      {offers.map(offer => (
        <div key={offer.id} className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem'}}>
            <div>
              <h2 style={{marginBottom: '0.5rem'}}>{offer.clinicName}</h2>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                <span style={{color: '#ff9800', fontSize: '1.25rem'}}>
                  {'★'.repeat(Math.floor(offer.rating))} {offer.rating}
                </span>
                <span className="badge badge-info">{offer.location}</span>
              </div>
              <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                {offer.specializations.map(spec => (
                  <span key={spec} className="badge badge-success">{spec}</span>
                ))}
              </div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize: '0.875rem', color: '#757575'}}>Общая стоимость</div>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#1976d2'}}>
                {formatCost(offer.costs.total)}
              </div>
            </div>
          </div>

          <div className="grid grid-3" style={{marginBottom: '1.5rem'}}>
            {Object.entries(offer.costs).filter(([key]) => key !== 'total').map(([spec, cost]) => (
              <div key={spec} style={{padding: '1rem', background: '#f5f5f5', borderRadius: '8px'}}>
                <div style={{fontSize: '0.875rem', color: '#757575', marginBottom: '0.25rem'}}>{spec}</div>
                <div style={{fontSize: '1.25rem', fontWeight: '600'}}>{formatCost(cost)}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-2" style={{marginBottom: '1.5rem'}}>
            <div>
              <i className="fas fa-clock" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
              <strong>Длительность:</strong> {offer.duration}
            </div>
            <div>
              <i className="fas fa-shield-alt" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
              <strong>Гарантия:</strong> {offer.warranty}
            </div>
            <div>
              <i className="fas fa-credit-card" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
              <strong>Рассрочка:</strong> {offer.installment}
            </div>
            <div>
              <i className="fas fa-calendar-alt" style={{marginRight: '0.5rem', color: '#1976d2'}}></i>
              <strong>Год основания:</strong> {offer.yearEstablished}
            </div>
          </div>

          <div style={{display: 'flex', gap: '1rem'}}>
            <button className="btn btn-primary">
              <i className="fas fa-calendar-check"></i> Записаться на консультацию
            </button>
            <button className="btn btn-outline">
              <i className="fas fa-info-circle"></i> Подробнее о клинике
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientOffers;
