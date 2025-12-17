import { useState } from 'react';
import { patientScans } from '../../data/mockData';

const PatientScans = () => {
  const [scans] = useState(patientScans);
  const [showModal, setShowModal] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);

  const handleViewScan = (scan) => {
    setSelectedScan(scan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedScan(null);
  };

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
                  <button 
                    onClick={() => handleViewScan(scan)}
                    className="btn btn-primary btn-sm"
                  >
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fas fa-x-ray"></i> КТ-снимок #{selectedScan?.id}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              {/* CT Scan Viewer Placeholder */}
              <div className="ct-scan-viewer">
                <i className="fas fa-tooth" style={{fontSize: '4rem', opacity: 0.3}}></i>
                <h3>3D визуализация КТ-снимка</h3>
                <p>Здесь будет отображаться интерактивная 3D-визуализация вашего КТ-снимка</p>
                <p style={{marginTop: '1rem', color: '#757575'}}>
                  Дата снимка: {selectedScan && new Date(selectedScan.date).toLocaleDateString('ru-RU')}
                </p>
              </div>

              <div style={{marginTop: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: '8px'}}>
                <strong><i className="fas fa-info-circle"></i> Функционал в разработке</strong>
                <p style={{margin: '0.5rem 0 0', color: '#1565c0'}}>
                  Интерактивный просмотрщик DICOM-файлов с возможностью поворота, приближения 
                  и выделения проблемных зон будет доступен в следующей версии платформы.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={closeModal} className="btn btn-secondary">
                Закрыть
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-download"></i> Скачать снимок
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientScans;
