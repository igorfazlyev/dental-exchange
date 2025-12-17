import { useState } from 'react';
import { incomingOrders } from '../../data/mockData';

const ClinicIncomingOrders = () => {
  const [orders] = useState(incomingOrders);

  const statusInfo = {
    new: { color: '#2196f3', text: 'Новый' },
    contact_requested: { color: '#ff9800', text: 'Запрошен контакт' },
    consultation_scheduled: { color: '#4caf50', text: 'Консультация назначена' }
  };

  return (
    <div>
      <h1><i className="fas fa-inbox"></i> Входящие заказы</h1>

      <div className="card">
        <p>Здесь отображаются заказы от пациентов с их планами лечения. Вы можете запросить контакты для связи или предложить свободные слоты для записи.</p>
      </div>

      {orders.map(order => (
        <div key={order.id} className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem'}}>
            <div>
              <h3>Заказ #{order.id}</h3>
              <div style={{color: '#757575'}}>
                {order.patientAge} лет, {order.patientGender === 'М' ? 'Мужчина' : 'Женщина'}
              </div>
              <div style={{marginTop: '0.5rem'}}>
                {order.specializations.map(spec => (
                  <span key={spec} className="badge badge-info" style={{marginRight: '0.5rem'}}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize: '0.875rem', color: '#757575'}}>Ориентировочная стоимость</div>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2'}}>
                {order.estimatedCost.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>

          <div style={{
            padding: '1rem',
            background: statusInfo[order.status].color + '20',
            borderRadius: '8px',
            borderLeft: `4px solid ${statusInfo[order.status].color}`,
            marginBottom: '1.5rem'
          }}>
            <strong>Статус:</strong> {statusInfo[order.status].text}
          </div>

          {order.contactShared && (
            <div style={{
              padding: '1rem',
              background: '#e8f5e9',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <h4>Контактные данные пациента:</h4>
              <div><strong>ФИО:</strong> {order.patientName}</div>
              <div><strong>Телефон:</strong> {order.patientPhone}</div>
            </div>
          )}

          {order.consultationDate && (
            <div style={{
              padding: '1rem',
              background: '#e3f2fd',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <i className="fas fa-calendar-check" style={{marginRight: '0.5rem', color: '#2196f3'}}></i>
              <strong>Консультация назначена:</strong> {order.consultationDate}
            </div>
          )}

          <div style={{display: 'flex', gap: '1rem'}}>
            {order.status === 'new' && (
              <>
                <button className="btn btn-primary">
                  <i className="fas fa-phone"></i> Запросить контакт
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-eye"></i> Просмотреть план
                </button>
              </>
            )}
            {order.status === 'contact_requested' && (
              <>
                <button className="btn btn-success">
                  <i className="fas fa-calendar"></i> Предложить слоты
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-phone"></i> Позвонить
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClinicIncomingOrders;
