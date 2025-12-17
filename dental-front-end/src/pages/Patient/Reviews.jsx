import { useState } from 'react';
import { reviews } from '../../data/mockData';

const PatientReviews = () => {
  const [reviewList] = useState(reviews);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1><i className="fas fa-star"></i> Отзывы и жалобы</h1>

      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          <i className="fas fa-plus"></i> Оставить отзыв или жалобу
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Новый отзыв</h3>
          <form>
            <div className="form-group">
              <label>Клиника</label>
              <select>
                <option>СтомаПрофи</option>
                <option>ЭлитДент</option>
                <option>Дентал Плюс</option>
              </select>
            </div>

            <div className="form-group">
              <label>Тип</label>
              <select>
                <option value="review">Отзыв</option>
                <option value="complaint">Жалоба</option>
              </select>
            </div>

            <div className="form-group">
              <label>Оценка (только для отзывов)</label>
              <div style={{display: 'flex', gap: '0.5rem', fontSize: '2rem'}}>
                {[1,2,3,4,5].map(star => (
                  <i key={star} className="far fa-star" style={{cursor: 'pointer', color: '#ff9800'}}></i>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Комментарий</label>
              <textarea rows="4" placeholder="Опишите ваш опыт..."></textarea>
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-paper-plane"></i> Отправить
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      {reviewList.map(review => (
        <div key={review.id} className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem'}}>
            <div>
              <h3 style={{marginBottom: '0.5rem'}}>{review.clinic}</h3>
              {review.rating && (
                <div style={{color: '#ff9800', fontSize: '1.25rem'}}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                </div>
              )}
              {review.type === 'complaint' && (
                <span className="badge badge-warning">Жалоба</span>
              )}
            </div>
            <span style={{color: '#757575', fontSize: '0.875rem'}}>
              {new Date(review.date).toLocaleDateString('ru-RU')}
            </span>
          </div>

          <p>{review.comment}</p>

          <div style={{
            padding: '1rem',
            background: review.status === 'published' ? '#e8f5e9' : '#fff3e0',
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <strong>Статус: </strong>
            {review.status === 'published' ? 'Опубликовано' : 'На рассмотрении'}
          </div>

          {review.clinicResponse && (
            <div style={{
              padding: '1rem',
              background: '#e3f2fd',
              borderRadius: '8px',
              marginTop: '1rem',
              borderLeft: '4px solid #2196f3'
            }}>
              <strong>Ответ клиники:</strong>
              <p style={{margin: '0.5rem 0 0'}}>{review.clinicResponse}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientReviews;
