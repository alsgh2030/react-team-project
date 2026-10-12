import React, { useState, useEffect } from 'react';
import { ArrowUpDown, User, Trash2 } from 'lucide-react';
import { useAuth } from '../../AuthContextPro';
import ReviewList from '../ReviewList';

export default function MyPage() {
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews' | 'comments'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'
  const [myReviews, setMyReviews] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [movies, setMovies] = useState([]);

  // 데이터 동기화
  const loadMyData = () => {
    if (!currentUser || !currentUser.userId) return;

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const allMovies = JSON.parse(localStorage.getItem('movies') || '[]');

    // 내가 작성한 리뷰 및 댓글만 추출
    const userReviews = allReviews.filter((r) => r.userId === currentUser.userId);
    const userComments = allComments.filter((c) => c.userId === currentUser.userId);

    setMyReviews(userReviews);
    setMyComments(userComments);
    setMovies(allMovies);
  };

  useEffect(() => {
    loadMyData();
    window.addEventListener('storage', loadMyData);
    return () => window.removeEventListener('storage', loadMyData);
  }, [currentUser]);

  // 로그인되지 않은 경우
  if (!currentUser || !currentUser.userId) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2>로그인이 필요한 페이지입니다.</h2>
        <p style={{ color: '#666' }}>로그인 후 이용해 주세요.</p>
      </div>
    );
  }

  // 별점 오름차순 / 내림차순 정렬
  const sortedMyReviews = [...myReviews].sort((a, b) => {
    return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
  });

  // 내 댓글 삭제 처리
  const handleDeleteMyComment = (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const updatedComments = allComments.filter((c) => c.id !== commentId);

    localStorage.setItem('comments', JSON.stringify(updatedComments));
    loadMyData();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* 사용자 프로필 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', padding: '24px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <User size={36} color="#64748b" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{currentUser.userId} 님의 마이페이지</h2>
          <p style={{ margin: '6px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
            작성한 리뷰 <strong>{myReviews.length}</strong>개 | 작성한 댓글 <strong>{myComments.length}</strong>개
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('reviews')}
          style={{
            flex: 1,
            padding: '14px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'reviews' ? '3px solid #007bff' : 'none',
            fontWeight: activeTab === 'reviews' ? 'bold' : 'normal',
            color: activeTab === 'reviews' ? '#007bff' : '#64748b',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          내가 쓴 리뷰 ({myReviews.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          style={{
            flex: 1,
            padding: '14px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'comments' ? '3px solid #007bff' : 'none',
            fontWeight: activeTab === 'comments' ? 'bold' : 'normal',
            color: activeTab === 'comments' ? '#007bff' : '#64748b',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          내가 쓴 댓글 ({myComments.length})
        </button>
      </div>

      {/* 1. 내가 쓴 리뷰 탭 */}
      {activeTab === 'reviews' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              <ArrowUpDown size={14} />
              별점 {sortOrder === 'asc' ? '낮은순 ▲' : '높은순 ▼'}
            </button>
          </div>

          <ReviewList customReviews={sortedMyReviews} />
        </div>
      )}

      {/* 2. 내가 쓴 댓글 탭 */}
      {activeTab === 'comments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {myComments.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>작성한 댓글이 없습니다.</p>
          ) : (
            myComments.map((comment) => {
              const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
              const targetReview = allReviews.find((r) => r.id === comment.reviewId);
              const targetMovie = targetReview ? movies.find((m) => m.id === targetReview.movieId) : null;

              return (
                <div
                  key={comment.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>
                      {targetMovie ? `[${targetMovie.title}] ` : ''}
                      {targetReview ? `리뷰: "${targetReview.title}"` : '삭제된 리뷰'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#1e293b' }}>{comment.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMyComment(comment.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f', padding: '4px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}