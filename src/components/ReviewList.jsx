import React, { useState, useEffect } from 'react';
import { Heart, Star, MessageSquare, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../AuthContextPro';
import Rating from "./Rating";

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
    <div className="max-w-[800px] mx-auto p-5 transition-colors duration-200">
      {displayReviews.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">등록된 리뷰가 없습니다.</p>
      ) : (
        displayReviews.map((review) => {
          const targetMovie = movies.find((m) => m.id === review.movieId);
          const reviewComments = comments.filter((c) => c.reviewId === review.id);
          const isLikedByMe = currentUser && Array.isArray(review.like) && review.like.includes(currentUser.userId);
          const isMyReview = currentUser && review.userId === currentUser.userId;

          return (
            <div
              key={review.id}
              className="border border-[#e0e0e0] dark:border-gray-700 rounded-lg p-5 mb-4 bg-white dark:bg-[#252525] text-black dark:text-white shadow-sm transition-colors duration-200"
            >
              {/* 수정 모드인 경우 */}
              {editingReviewId === review.id ? (
                <div className="flex flex-col gap-2.5">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목"
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#333] text-black dark:text-white"
                  />
                  <div className="flex gap-2.5 items-center">
                    <label>별점: </label>
                    <Rating rating={editScore} setRating={setEditScore} />
                    <input
                      type="text"
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      placeholder="#태그"
                      className="p-1.5 border border-gray-300 dark:border-gray-600 rounded flex-1 bg-white dark:bg-[#333] text-black dark:text-white"
                    />
                  </div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="내용"
                    rows={4}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded resize-vertical bg-white dark:bg-[#333] text-black dark:text-white"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleSaveEdit(review.id)}
                      className="px-3 py-1.5 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="px-3 py-1.5 bg-gray-600 text-white border-none rounded cursor-pointer hover:bg-gray-700"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                /* 일반 조회 모드 */
                <>
                  <div className="flex justify-between items-center mb-2.5">
                    <div>
                      <span className="font-bold mr-2 text-base">{review.userId}</span>
                      {targetMovie && (
                        <span className="text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#383838] px-2 py-0.5 rounded">
                          {targetMovie.title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[#ffb400]">
                      <Star size={18} fill="#ffb400" />
                      <span className="font-bold text-base text-black dark:text-white">{review.score}</span>
                    </div>
                  </div>

                  <h3 className="my-2 text-lg font-bold">{review.title}</h3>
                  <p className="my-0 mb-2.5 text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{review.content}</p>

                  {review.tag && (
                    <div className="mb-3">
                      <span className="text-blue-500 dark:text-blue-400 text-xs">#{review.tag}</span>
                    </div>
                  )}

                  {/* 하단 버튼 및 수정/삭제 */}
                  <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-2.5">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className="background-none border-none cursor-pointer flex items-center gap-1 bg-transparent"
                      >
                        <Heart size={18} color={isLikedByMe ? '#ff4d4f' : '#666'} fill={isLikedByMe ? '#ff4d4f' : 'none'} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{review.like ? review.like.length : 0}</span>
                      </button>

                      <button
                        onClick={() => setActiveCommentReviewId(activeCommentReviewId === review.id ? null : review.id)}
                        className="background-none border-none cursor-pointer flex items-center gap-1 bg-transparent"
                      >
                        <MessageSquare size={18} className="text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{reviewComments.length}</span>
                      </button>
                    </div>

                    {isMyReview && (
                      <div className="flex gap-2.5">
                        <button onClick={() => startEditReview(review)} className="bg-transparent border-none cursor-pointer">
                          <Edit size={18} className="text-gray-600 dark:text-gray-400 hover:text-blue-500" />
                        </button>
                        <button onClick={() => handleDeleteReview(review.id)} className="bg-transparent border-none cursor-pointer">
                          <Trash2 size={18} color="#ff4d4f" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 댓글 창 */}
                  {activeCommentReviewId === review.id && (
                    <div className="mt-3.5 p-3 bg-gray-50 dark:bg-[#1e1e1e] rounded-md transition-colors duration-200">
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
                          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333] text-black dark:text-white placeholder:text-gray-400"
                        />
                        <button type="submit" className="px-3.5 py-2 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700">
                          등록
                        </button>
                      </form>

                      <div className="flex flex-col gap-2">
                        {reviewComments.length === 0 ? (
                          <p className="text-xs text-gray-500 dark:text-gray-400 m-0">작성된 댓글이 없습니다.</p>
                        ) : (
                          reviewComments.map((comment) => {
                            const isCommentLiked = currentUser && Array.isArray(comment.like) && comment.like.includes(currentUser.userId);
                            const isMyComment = currentUser && comment.userId === currentUser.userId;

                            return (
                              <div key={comment.id} className="flex justify-between items-center bg-white dark:bg-[#2a2a2a] p-2 px-3 rounded border border-gray-200 dark:border-gray-700">
                                <div>
                                  <strong className="mr-2 text-xs">{comment.userId}</strong>
                                  <span className="text-sm">{comment.content}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <button
                                    onClick={() => handleLikeComment(comment.id)}
                                    className="bg-transparent border-none cursor-pointer flex items-center gap-0.5"
                                  >
                                    <Heart size={14} color={isCommentLiked ? '#ff4d4f' : '#888'} fill={isCommentLiked ? '#ff4d4f' : 'none'} />
                                    <span className="text-xs text-gray-600 dark:text-gray-400">{comment.like ? comment.like.length : 0}</span>
                                  </button>
                                  {isMyComment && (
                                    <button onClick={() => handleDeleteComment(comment.id)} className="bg-transparent border-none cursor-pointer">
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