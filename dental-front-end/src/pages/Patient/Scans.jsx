import { useState } from 'react';
import { patientScans } from '../../data/mockData';

const PatientScans = () => {
  const [scans] = useState(patientScans);

  return (
    <div>
      <h1><i className="fas fa-images"></i> Мои снимки</h1>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <i className="fas fa-list"></i>
            История снимков
          </div>
          <button className="btn btn-primary">
            <i className="fas fa-upload"></i> Загрузить новый снимок
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата загрузки</th>
              <th>Статус</th>
              <th>AI анализ</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {scans.map(scan => (
              <tr key={scan.id}>
                <td>#{scan.id}</td>
                <td>{new Date(scan.date).toLocaleDateString('ru-RU')}</td>
                <td>
                  <span className={`badge badge-${scan.status === 'processed' ? 'success' : 'warning'}`}>
                    {scan.status === 'processed' ? 'Обработан' : 'В обработке'}
                  </span>
                </td>
                <td>
                  {scan.aiAnalyzed ? (
                    <span className="badge badge-success">
                      <i className="fas fa-check-circle"></i> Завершен
                    </span>
                  ) : (
                    <span className="badge badge-warning">
                      <i className="fas fa-clock"></i> В процессе
                    </span>
                  )}
                </td>
                <td>
                  <button className="btn btn-primary btn-sm">
                    <i className="fas fa-eye"></i> Просмотр
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <i className="fas fa-info-circle"></i>
            Информация о снимках
          </div>
        </div>
        <p>Загрузите КТ-снимок для получения AI-анализа и автоматического формирования плана лечения.</p>
        <p>Поддерживаемые форматы: DICOM, JPG, PNG</p>
      </div>
    </div>
  );
};

export default PatientScans;
