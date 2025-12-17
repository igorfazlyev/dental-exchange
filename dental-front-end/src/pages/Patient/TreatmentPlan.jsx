import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diagnoses, treatmentProcedures, getCostBySpecialization, getSpecialistRecommendation } from '../../data/mockData';

const PatientTreatmentPlan = () => {
  const navigate = useNavigate();
  const [procedures] = useState(treatmentProcedures);
  const [diagnosisList] = useState(diagnoses);
  const costBySpec = getCostBySpecialization();
  const recommendation = getSpecialistRecommendation();

  const formatCost = (cost) => {
    return cost.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <div>
      <h1><i className="fas fa-file-medical"></i> План лечения</h1>
      <h3 style={{color: '#757575', marginBottom: '2rem'}}>Результат AI-анализа от 15.11.2025</h3>

      {/* Specialist Recommendation */}
      <div className="card" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
        <h3><i className="fas fa-user-md"></i> Рекомендация специалиста</h3>
        <p style={{fontSize: '1.1rem', margin: 0}}>
          <strong>Рекомендуется начать с консультации: {recommendation.specialist}</strong>
        </p>
        <p style={{opacity: 0.9, marginTop: '0.5rem'}}>{recommendation.reason}</p>
      </div>

      {/* CT Scan Visualization */}
      <div className="card">
        <h3><i className="fas fa-search"></i> Визуализация снимка</h3>
        <div className="ct-scan-placeholder">
          <i className="fas fa-cube"></i>
          <p>Здесь отображается 3D-визуализация КТ-снимка с маркерами проблемных зон</p>
        </div>

        <h4 style={{marginTop: '2rem'}}>Обнаруженные патологии:</h4>
        <ul style={{listStyle: 'none', padding: 0}}>
          {diagnosisList.map(diagnosis => (
            <li key={diagnosis.id} style={{
              padding: '0.75rem',
              marginBottom: '0.5rem',
              background: diagnosis.severity === 'high' ? '#ffebee' : '#fff3e0',
              borderRadius: '8px',
              borderLeft: `4px solid ${diagnosis.severity === 'high' ? '#f44336' : '#ff9800'}`
            }}>
              <i className="fas fa-exclamation-circle" style={{marginRight: '0.5rem'}}></i>
              {diagnosis.text}
              {diagnosis.toothNumber && (
                <span className="badge badge-info" style={{marginLeft: '0.5rem'}}>
                  Зуб {diagnosis.toothNumber}
                </span>
              )}
              <span className="badge badge-info" style={{marginLeft: '0.5rem'}}>
                {diagnosis.specialization}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment by Specialization */}
      <div className="card">
        <h3><i className="fas fa-pills"></i> План лечения по специализациям</h3>

        {Object.entries(costBySpec).map(([spec, data]) => (
          data.procedures.length > 0 && (
            <div key={spec} style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: '#f5f5f5',
              borderRadius: '12px'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <h4 style={{margin: 0}}>
                  <i className="fas fa-stethoscope"></i> {spec}
                </h4>
                <div style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1976d2'}}>
                  {formatCost(data.min)} - {formatCost(data.max)}
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Процедура</th>
                    <th>Номер зуба</th>
                    <th>Ориентировочная стоимость</th>
                    <th>Приоритет</th>
                  </tr>
                </thead>
                <tbody>
                  {data.procedures.map(proc => (
                    <tr key={proc.id}>
                      <td>{proc.type}</td>
                      <td>
                        {proc.toothNumber ? (
                          <span className="badge badge-info">Зуб {proc.toothNumber}</span>
                        ) : (
                          <span style={{color: '#999'}}>—</span>
                        )}
                      </td>
                      <td>{formatCost(proc.estimatedCost.min)} - {formatCost(proc.estimatedCost.max)}</td>
                      <td>
                        <span className={`badge ${proc.priority === 1 ? 'badge-danger' : proc.priority === 2 ? 'badge-warning' : 'badge-info'}`}>
                          {proc.priority === 1 ? 'Высокий' : proc.priority === 2 ? 'Средний' : 'Низкий'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ))}
      </div>

      {/* Cost Summary */}
      <div className="metrics-grid">
        {Object.entries(costBySpec).map(([spec, data]) => (
          data.procedures.length > 0 && (
            <div key={spec} className="metric-card info">
              <div className="metric-label">{spec}</div>
              <div className="metric-value">{formatCost(data.min)} - {formatCost(data.max)}</div>
              <div style={{fontSize: '0.875rem', opacity: 0.9}}>
                {data.procedures.length} процедур(ы)
              </div>
            </div>
          )
        ))}
      </div>

      <button onClick={() => navigate('/patient/offers')} className="btn btn-primary btn-large" style={{width: '100%'}}>
        <i className="fas fa-hospital-alt"></i> Получить предложения от клиник
      </button>
    </div>
  );
};

export default PatientTreatmentPlan;
