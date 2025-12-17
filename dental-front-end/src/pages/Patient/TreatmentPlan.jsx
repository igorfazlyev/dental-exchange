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
      <h3 style={{color: 'var(--md-text-secondary)', marginBottom: 'var(--spacing-lg)'}}>
        Результат AI-анализа от 15.11.2025
      </h3>

      {/* Specialist Recommendation - MATERIAL DESIGN */}
      <div className="card" style={{
        borderLeft: '4px solid var(--md-primary)',
        background: 'var(--md-bg-paper)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'start',
          gap: 'var(--spacing-md)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(25, 118, 210, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <i className="fas fa-user-md" style={{
              fontSize: '1.5rem',
              color: 'var(--md-primary)'
            }}></i>
          </div>

          <div style={{flex: 1}}>
            <h3 style={{
              margin: '0 0 var(--spacing-sm) 0',
              color: 'var(--md-text-primary)',
              fontSize: '1rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Рекомендация специалиста
            </h3>

            <p style={{
              margin: '0 0 var(--spacing-sm) 0',
              fontSize: '1.125rem',
              fontWeight: '500',
              color: 'var(--md-text-primary)'
            }}>
              Рекомендуется начать с консультации: <strong>{recommendation.specialist}</strong>
            </p>

            <p style={{
              margin: 0,
              color: 'var(--md-text-secondary)',
              lineHeight: '1.6'
            }}>
              {recommendation.reason}
            </p>
          </div>
        </div>
      </div>

      {/* CT Scan Visualization */}
      <div className="card">
        <h3><i className="fas fa-search"></i> Визуализация снимка</h3>
        <div className="ct-scan-placeholder">
          <i className="fas fa-cube"></i>
          <p>Здесь отображается 3D-визуализация КТ-снимка с маркерами проблемных зон</p>
        </div>

      </div>

      {/* Treatment by Specialization */}
      <div className="card">
        <h3><i className="fas fa-pills"></i> План лечения по специализациям</h3>

        {Object.entries(costBySpec).map(([spec, data]) => (
          data.procedures.length > 0 && (
            <div key={spec} style={{
              marginBottom: 'var(--spacing-lg)',
              padding: 'var(--spacing-lg)',
              background: 'var(--md-bg-main)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--md-divider)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-md)',
                flexWrap: 'wrap',
                gap: 'var(--spacing-sm)'
              }}>
                <h4 style={{margin: 0, color: 'var(--md-text-primary)'}}>
                  <i className="fas fa-stethoscope" style={{marginRight: 'var(--spacing-sm)'}}></i>
                  {spec}
                </h4>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: 'var(--md-primary)'
                }}>
                  {formatCost(data.min)} - {formatCost(data.max)}
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Патология</th>
                    <th>Номер зуба</th>
                    <th>Процедура</th>
                    <th>Ориентировочная стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {data.procedures.map(proc => (
                    <tr key={proc.id}>
                      <td>
                        <span style={{fontSize: '0.875rem', color: 'var(--md-text-primary)'}}>
                          {proc.pathology}
                        </span>
                      </td>
                      <td>
                        {proc.toothNumber ? (
                          <span className="badge badge-info">Зуб {proc.toothNumber}</span>
                        ) : (
                          <span style={{color: 'var(--md-text-disabled)'}}>—</span>
                        )}
                      </td>
                      <td>
                        <strong style={{color: 'var(--md-text-primary)'}}>{proc.type}</strong>
                      </td>
                      <td style={{color: 'var(--md-text-secondary)'}}>
                        {formatCost(proc.estimatedCost.min)} - {formatCost(proc.estimatedCost.max)}
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
              <div style={{fontSize: '0.875rem', opacity: 0.9, color: 'var(--md-text-secondary)'}}>
                {data.procedures.length} процедур(ы)
              </div>
            </div>
          )
        ))}
      </div>

      <button 
        onClick={() => navigate('/patient/offers')} 
        className="btn btn-primary btn-large" 
        style={{width: '100%'}}
      >
        <i className="fas fa-hospital-alt"></i> Получить предложения от клиник
      </button>
    </div>
  );
};

export default PatientTreatmentPlan;
