import React, { useState, useEffect } from 'react';
import { Heart, Star, MessageSquare, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../AuthContextPro';

export default function ReviewList({ customReviews }) {
  const { currentUser } = useAuth();

  // 상태 관리 (localStorage 기반)
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [movies, setMovies] = useState([]);

  // 수정 관련 상태
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editScore, setEditScore] = useState(5);
  const [editTag, setEditTag] = useState('');

  // 댓글 관련 상태
  const [activeCommentReviewId, setActiveCommentReviewId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  // 데이터 로드
  const loadData = () => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const savedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    setReviews(savedReviews);
    setComments(savedComments);
    setMovies(savedMovies);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // 외부(MyPage 등)에서 props로 reviews를 넘겨주면 그것을 우선 사용, 없으면 전체 리뷰 사용
  const displayReviews = customReviews || reviews;

  // 1. 리뷰 좋아요 토글 (한 계정당 한번)
  const handleLikeReview = (reviewId) => {
    if (!currentUser || !currentUser.userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const updatedReviews = allReviews.map((review) => {
      if (review.id === reviewId) {
        const likes = Array.isArray(review.like) ? review.like : [];
        const isLiked = likes.includes(currentUser.userId);
        const updatedLikes = isLiked
          ? likes.filter((id) => id !== currentUser.userId)
          : [...likes, currentUser.userId];
        return { ...review, like: updatedLikes };
      }
      return review;
    });

    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    window.dispatchEvent(new Event('local-update'));
  };

  // 2. 리뷰 삭제
  const handleDeleteReview = (reviewId) => {
    if (!window.confirm('리뷰를 삭제하시겠습니까?')) return;

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const updatedReviews = allReviews.filter((r) => r.id !== reviewId);
    
    // 연관 댓글 삭제
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const updatedComments = allComments.filter((c) => c.reviewId !== reviewId);

    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setReviews(updatedReviews);
    setComments(updatedComments);
  };

  // 3. 리뷰 수정 시작
  const startEditReview = (review) => {
    setEditingReviewId(review.id);
    setEditTitle(review.title);
    setEditContent(review.content);
    setEditScore(review.score || 5);
    setEditTag(review.tag || '');
  };

  // 4. 리뷰 수정 저장
  const handleSaveEdit = (reviewId) => {
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const updatedReviews = allReviews.map((r) => {
      if (r.id === reviewId) {
        return {
          ...r,
          title: editTitle,
          content: editContent,
          score: Number(editScore),
          tag: editTag
        };
      }
      return r;
    });

    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    // setReviews(updatedReviews);
    loadData();
    window.dispatchEvent(new Event('local-update'));
    setEditingReviewId(null);
  };

  // 5. 댓글 추가
  const handleAddComment = (reviewId) => {
    if (!currentUser || !currentUser.userId) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!commentInput.trim()) return;

    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const newComment = {
      id: Date.now(),
      reviewId,
      userId: currentUser.userId,
      content: commentInput.trim(),
      like: []
    };

    const updatedComments = [...allComments, newComment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    // setComments(updatedComments);
    loadData();
    window.dispatchEvent(new Event('local-update'));
    setCommentInput('');
  };

  // 6. 댓글 좋아요 토글 (한 계정당 한번)
  const handleLikeComment = (commentId) => {
    if (!currentUser || !currentUser.userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const updatedComments = allComments.map((c) => {
      if (c.id === commentId) {
        const likes = Array.isArray(c.like) ? c.like : [];
        const isLiked = likes.includes(currentUser.userId);
        const updatedLikes = isLiked
          ? likes.filter((id) => id !== currentUser.userId)
          : [...likes, currentUser.userId];
        return { ...c, like: updatedLikes };
      }
      return c;
    });

    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  // 7. 댓글 삭제
  const handleDeleteComment = (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const updatedComments = allComments.filter((c) => c.id !== commentId);

    localStorage.setItem('comments', JSON.stringify(updatedComments));
    // setComments(updatedComments);
    loadData();
    window.dispatchEvent(new Event('local-update'));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {displayReviews.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>등록된 리뷰가 없습니다.</p>
      ) : (
        displayReviews.map((review) => {
          const targetMovie = movies.find((m) => m.id === review.movieId);
          const reviewComments = comments.filter((c) => c.reviewId === review.id);
          const isLikedByMe = currentUser && Array.isArray(review.like) && review.like.includes(currentUser.userId);
          const isMyReview = currentUser && review.userId === currentUser.userId;

          return (
            <div
              key={review.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              {/* 수정 모드인 경우 */}
              {editingReviewId === review.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목"
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label>별점: </label>
                    <select
                      value={editScore}
                      onChange={(e) => setEditScore(e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}점</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      placeholder="#태그"
                      style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }}
                    />
                  </div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="내용"
                    rows={4}
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleSaveEdit(review.id)}
                      style={{ padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingReviewId(null)}
                      style={{ padding: '6px 12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                /* 일반 조회 모드 */
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', marginRight: '8px', fontSize: '1rem' }}>{review.userId}</span>
                      {targetMovie && (
                        <span style={{ fontSize: '0.85rem', color: '#555', backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '4px' }}>
                          {targetMovie.title}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb400' }}>
                      <Star size={18} fill="#ffb400" />
                      <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333' }}>{review.score}</span>
                    </div>
                  </div>

                  <h3 style={{ margin: '8px 0', fontSize: '1.1rem' }}>{review.title}</h3>
                  <p style={{ margin: '0 0 10px 0', color: '#444', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{review.content}</p>

                  {review.tag && (
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ color: '#007bff', fontSize: '0.85rem' }}>#{review.tag}</span>
                    </div>
                  )}

                  {/* 하단 버튼 및 수정/삭제 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Heart size={18} color={isLikedByMe ? '#ff4d4f' : '#666'} fill={isLikedByMe ? '#ff4d4f' : 'none'} />
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>{review.like ? review.like.length : 0}</span>
                      </button>

                      <button
                        onClick={() => setActiveCommentReviewId(activeCommentReviewId === review.id ? null : review.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <MessageSquare size={18} color="#666" />
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>{reviewComments.length}</span>
                      </button>
                    </div>

                    {isMyReview && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEditReview(review)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                          <Edit size={18} color="#666" />
                        </button>
                        <button onClick={() => handleDeleteReview(review.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={18} color="#ff4d4f" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 댓글 창 */}
                  {activeCommentReviewId === review.id && (
                    <div style={{ marginTop: '14px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddComment(review.id);
                        }}
                        style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}
                      >
                        <input
                          type="text"
                          placeholder="댓글을 입력하세요..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <button type="submit" style={{ padding: '8px 14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                          등록
                        </button>
                      </form>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {reviewComments.length === 0 ? (
                          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>작성된 댓글이 없습니다.</p>
                        ) : (
                          reviewComments.map((comment) => {
                            const isCommentLiked = currentUser && Array.isArray(comment.like) && comment.like.includes(currentUser.userId);
                            const isMyComment = currentUser && comment.userId === currentUser.userId;

                            return (
                              <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '8px 12px', borderRadius: '4px', border: '1px solid #eee' }}>
                                <div>
                                  <strong style={{ marginRight: '8px', fontSize: '0.85rem' }}>{comment.userId}</strong>
                                  <span style={{ fontSize: '0.9rem' }}>{comment.content}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <button
                                    onClick={() => handleLikeComment(comment.id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                                  >
                                    <Heart size={14} color={isCommentLiked ? '#ff4d4f' : '#888'} fill={isCommentLiked ? '#ff4d4f' : 'none'} />
                                    <span style={{ fontSize: '0.8rem', color: '#666' }}>{comment.like ? comment.like.length : 0}</span>
                                  </button>
                                  {isMyComment && (
                                    <button onClick={() => handleDeleteComment(comment.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                      <Trash2 size={14} color="#ff4d4f" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}