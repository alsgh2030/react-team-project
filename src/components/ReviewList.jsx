import React, { useState, useEffect } from 'react';
import { Heart, Star, MessageSquare, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../AuthContextPro';
import Rating from "./Rating";
import { useLocation, useNavigate } from 'react-router-dom';

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

  // review display (최신순)
  const displayReviews = customReviews || [...reviews].sort((a, b) => b.id - a.id);

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

  // 메인페이지 리뷰 카드에서 넘어온 경우: 해당 리뷰 위치로 스크롤
  const location = useLocation();
  const navigate = useNavigate();
  const [focusedReviewId, setFocusedReviewId] = useState(null);

  useEffect(() => {
    const id = location.state?.reviewId;
    if (!id) return;
    const el = document.getElementById(`review-${id}`);
    if (!el) return; // 리뷰가 아직 안 그려졌으면 다음 렌더에서 다시 시도

    window.scrollTo(0, 0); // 항상 최상단에서 시작
    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 해당 리뷰까지 내려오기
      setFocusedReviewId(id); // 잠깐 강조 표시
      navigate(location.pathname, { replace: true, state: null }); // 새로고침/뒤로가기 때 다시 실행되지 않게 비움
    }, 300);
    return () => clearTimeout(t);
  }, [location.state, reviews]);

     // 강조 표시는 2초 뒤 해제
  useEffect(() => {
    if (!focusedReviewId) return;
    const t = setTimeout(() => setFocusedReviewId(null), 2000);
    return () => clearTimeout(t);
  }, [focusedReviewId]);


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
    loadData();
    window.dispatchEvent(new Event('local-update'));
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
    loadData();
    window.dispatchEvent(new Event('local-update'));
  };

  return (
    <div className="max-w-[760px] mx-auto px-5 py-8 transition-colors duration-200">
      {displayReviews.length === 0 ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400 py-14 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">등록된 리뷰가 없습니다.</p>
      ) : (
          displayReviews.map((review) => {
          const targetMovie = movies.find((m) => m.id === review.movieId);
          const reviewComments = comments.filter((c) => c.reviewId === review.id);
          const isLikedByMe = currentUser && Array.isArray(review.like) && review.like.includes(currentUser.userId);
          const isMyReview = currentUser && review.userId === currentUser.userId;

          return (
           <div
              key={review.id} id={`review-${review.id}`}
              className={`border rounded-2xl p-6 mb-4 bg-white dark:bg-[#222222] text-neutral-900 dark:text-neutral-100 transition-all duration-500 ${
                focusedReviewId === review.id
                  ? 'border-rose-500 ring-4 ring-rose-500/20'
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {/* 수정 모드인 경우 */}
              {editingReviewId === review.id ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목"
                    className="h-11 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#2a2a2a] text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                  />
                  <div className="flex flex-wrap gap-3 items-center">
                    <label className="text-sm font-bold text-neutral-600 dark:text-neutral-300">별점</label>
                    <Rating rating={editScore} setRating={setEditScore} />
                    <input
                      type="text"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      placeholder="#태그"
                      className="h-10 px-3 border border-neutral-300 dark:border-neutral-700 rounded-lg flex-1 bg-white dark:bg-[#2a2a2a] text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                    />
                  </div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="내용"
                    rows={4}
                    className="p-4 border border-neutral-300 dark:border-neutral-700 rounded-lg resize-y bg-white dark:bg-[#2a2a2a] text-neutral-900 dark:text-white outline-none focus:border-rose-500"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="h-10 px-4 bg-neutral-100 text-neutral-700 rounded-lg font-bold cursor-pointer hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleSaveEdit(review.id)}
                      className="h-10 px-5 bg-rose-600 text-white rounded-lg font-bold cursor-pointer hover:bg-rose-700"
                    >
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                /* 일반 조회 모드 */
                <>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold text-[15px]">{review.userId}</span>
                      {targetMovie && (
                        <span className="truncate text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                          {targetMovie.title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-rose-600">
                      <Star size={16} className="fill-rose-600" />
                      <span className="font-bold text-[15px]">{review.score}</span>
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-bold">{review.title}</h3>
                  <p className="mb-3 text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">{review.content}</p>

                  {review.tag && (
                    <div className="mb-3">
                      <span className="text-rose-600 dark:text-rose-400 text-sm font-medium">#{review.tag}</span>
                    </div>
                  )}

                  {/* 하단 버튼 및 수정/삭제 */}
                  <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800 pt-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className={`cursor-pointer flex items-center gap-1.5 h-9 px-3 rounded-lg transition-colors ${isLikedByMe ? 'bg-rose-50 dark:bg-rose-500/15' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                      >
                        <Heart size={17} color={isLikedByMe ? '#e11d48' : '#737373'} fill={isLikedByMe ? '#e11d48' : 'none'} />
                        <span className={`text-sm font-bold ${isLikedByMe ? 'text-rose-600' : 'text-neutral-500 dark:text-neutral-400'}`}>{review.like ? review.like.length : 0}</span>
                      </button>

                      <button
                        onClick={() => setActiveCommentReviewId(activeCommentReviewId === review.id ? null : review.id)}
                        className="cursor-pointer flex items-center gap-1.5 h-9 px-3 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <MessageSquare size={17} className="text-neutral-500 dark:text-neutral-400" />
                        <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">{reviewComments.length}</span>
                      </button>
                    </div>

                    {isMyReview && (
                      <div className="flex gap-1">
                        <button onClick={() => startEditReview(review)} aria-label="리뷰 수정" className="flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
                          <Edit size={17} className="text-neutral-500 dark:text-neutral-400" />
                        </button>
                        <button onClick={() => handleDeleteReview(review.id)} aria-label="리뷰 삭제" className="flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-500/15">
                          <Trash2 size={17} color="#e11d48" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 댓글 창 */}
                  {activeCommentReviewId === review.id && (
                    <div className="mt-4 p-4 bg-neutral-50 dark:bg-[#1c1c1c] rounded-xl transition-colors duration-200">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddComment(review.id);
                        }}
                        className="flex gap-2 mb-3"
                      >
                        <input
                          type="text"
                          placeholder="댓글을 입력하세요..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          className="flex-1 h-10 px-4 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#2a2a2a] text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:border-rose-500"
                        />
                        <button type="submit" className="h-10 px-4 bg-neutral-900 text-white rounded-lg font-bold cursor-pointer hover:bg-black dark:bg-white dark:text-neutral-900">
                          등록
                        </button>
                      </form>

                      <div className="flex flex-col gap-2">
                        {reviewComments.length === 0 ? (
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 m-0 py-2 text-center">작성된 댓글이 없습니다.</p>
                        ) : (
                          reviewComments.map((comment) => {
                            const isCommentLiked = currentUser && Array.isArray(comment.like) && comment.like.includes(currentUser.userId);
                            const isMyComment = currentUser && comment.userId === currentUser.userId;

                            return (
                              <div key={comment.id} className="flex justify-between items-center bg-white dark:bg-[#262626] py-2.5 px-3.5 rounded-lg">
                                <div className="min-w-0">
                                  <strong className="mr-2 text-[13px]">{comment.userId}</strong>
                                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{comment.content}</span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => handleLikeComment(comment.id)}
                                    className="cursor-pointer flex items-center gap-1 h-8 px-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                  >
                                    <Heart size={14} color={isCommentLiked ? '#e11d48' : '#a3a3a3'} fill={isCommentLiked ? '#e11d48' : 'none'} />
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{comment.like ? comment.like.length : 0}</span>
                                  </button>
                                  {isMyComment && (
                                    <button onClick={() => handleDeleteComment(comment.id)} aria-label="댓글 삭제" className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-500/15">
                                      <Trash2 size={14} color="#e11d48" />
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