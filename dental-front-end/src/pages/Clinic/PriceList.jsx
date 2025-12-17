import { useState } from 'react';
import { priceList } from '../../data/mockData';

const ClinicPriceList = () => {
  const [activeSpec, setActiveSpec] = useState('Терапия');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <h1><i className="fas fa-dollar-sign"></i> Прайс-лист</h1>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <i className="fas fa-list"></i>
            Управление ценами
          </div>
          <button onClick={() => setIsEditing(!isEditing)} className="btn btn-primary">
            <i className={`fas fa-${isEditing ? 'save' : 'edit'}`}></i>
            {isEditing ? 'Сохранить' : 'Редактировать'}
          </button>
        </div>

        <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'}}>
          {Object.keys(priceList).map(spec => (
            <button
              key={spec}
              onClick={() => setActiveSpec(spec)}
              className={`btn ${activeSpec === spec ? 'btn-primary' : 'btn-outline'}`}
            >
              {spec}
            </button>
          ))}
        </div>

        <table>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Цена (₽)</th>
              <th>Гарантия (лет)</th>
              {isEditing && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {priceList[activeSpec].map((item, idx) => (
              <tr key={idx}>
                <td>{item.service}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      defaultValue={item.price}
                      style={{width: '150px'}}
                    />
                  ) : (
                    item.price.toLocaleString('ru-RU')
                  )}
                </td>
                <td>{item.warranty || '—'}</td>
                {isEditing && (
                  <td>
                    <button className="btn btn-danger btn-sm">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {isEditing && (
          <button className="btn btn-success" style={{marginTop: '1rem'}}>
            <i className="fas fa-plus"></i> Добавить услугу
          </button>
        )}
      </div>

      <div className="card">
        <h3><i className="fas fa-info-circle"></i> Информация</h3>
        <p>Прайс-лист структурирован по трем основным специализациям. Это позволяет пациентам получать точные ценовые ориентиры по каждому этапу лечения.</p>
      </div>
    </div>
  );
};

export default ClinicPriceList;
