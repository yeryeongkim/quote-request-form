import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const saved = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
    // 최신순 정렬
    saved.sort((a, b) => b.id - a.id);
    setRequests(saved);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updated = requests.filter((req) => req.id !== id);
      localStorage.setItem('quoteRequests', JSON.stringify(updated));
      setRequests(updated);
      if (selectedRequest?.id === id) {
        setSelectedRequest(null);
      }
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('모든 견적 요청을 삭제하시겠습니까?')) {
      localStorage.removeItem('quoteRequests');
      setRequests([]);
      setSelectedRequest(null);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>견적 요청 관리</h1>
        <Link to="/" className="back-link">← 견적 폼으로 돌아가기</Link>
      </header>

      <div className="admin-content">
        <div className="requests-list">
          <div className="list-header">
            <h2>요청 목록 ({requests.length}건)</h2>
            {requests.length > 0 && (
              <button className="delete-all-btn" onClick={handleDeleteAll}>
                전체 삭제
              </button>
            )}
          </div>

          {requests.length === 0 ? (
            <div className="empty-state">
              <p>아직 견적 요청이 없습니다.</p>
            </div>
          ) : (
            <ul className="request-items">
              {requests.map((req) => (
                <li
                  key={req.id}
                  className={`request-item ${selectedRequest?.id === req.id ? 'active' : ''}`}
                  onClick={() => setSelectedRequest(req)}
                >
                  <div className="request-summary">
                    <span className="request-email">{req.email}</span>
                    <span className="request-date">{formatDate(req.submittedAt)}</span>
                  </div>
                  <div className="request-info">
                    <span>{req.desiredDate} {req.desiredTime}</span>
                    <span>{req.numberOfPeople}명</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="request-detail">
          {selectedRequest ? (
            <>
              <div className="detail-header">
                <h2>상세 정보</h2>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(selectedRequest.id)}
                >
                  삭제
                </button>
              </div>

              <div className="detail-content">
                <div className="detail-section">
                  <h3>연락처 정보</h3>
                  <div className="detail-row">
                    <label>이메일</label>
                    <span>{selectedRequest.email}</span>
                  </div>
                  <div className="detail-row">
                    <label>연락처</label>
                    <span>{selectedRequest.phone}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>이용 정보</h3>
                  <div className="detail-row">
                    <label>이용 날짜</label>
                    <span>{selectedRequest.desiredDate}</span>
                  </div>
                  <div className="detail-row">
                    <label>이용 시간</label>
                    <span>{selectedRequest.desiredTime}</span>
                  </div>
                  <div className="detail-row">
                    <label>인원 수</label>
                    <span>{selectedRequest.numberOfPeople}명</span>
                  </div>
                </div>

                {selectedRequest.requests && (
                  <div className="detail-section">
                    <h3>요청사항</h3>
                    <p className="request-text">{selectedRequest.requests}</p>
                  </div>
                )}

                <div className="detail-section">
                  <h3>요청 일시</h3>
                  <span>{formatDate(selectedRequest.submittedAt)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-detail">
              <p>요청을 선택하면 상세 정보가 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
