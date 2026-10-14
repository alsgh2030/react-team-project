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
    window.addEventListener('local-update', loadMyData);
    return () => {
      window.removeEventListener('storage', loadMyData);
      window.removeEventListener('local-update', loadMyData);
    }
  }, [currentUser]);

  // 로그인되지 않은 경우
  if (!currentUser || !currentUser.userId) {
    return (
      <div className="py-24 text-center text-neutral-900 dark:text-white">
        <h2 className="text-xl font-bold">로그인이 필요한 페이지입니다.</h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2">로그인 후 이용해 주세요.</p>
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
    <div className="min-h-[calc(100vh-64px)] bg-[#f2f3f6] dark:bg-[#181818]">
    <div className="max-w-[800px] mx-auto px-5 py-10 text-neutral-900 dark:text-white transition-colors duration-200">
      {/* 사용자 프로필 헤더 */}
      <div className="flex items-center gap-5 mb-5 p-7 bg-white dark:bg-[#222222] border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-colors duration-200">
        <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-500/15 flex justify-center items-center">
          <User size={38} className="text-rose-600" />
        </div>
        <div>
          <h2 className="m-0 text-2xl font-bold tracking-tight">{currentUser.userId} 님의 마이페이지</h2>
          <p className="mt-1.5 mb-0 text-neutral-500 dark:text-neutral-400 text-sm">
            작성한 리뷰 <strong className="text-neutral-900 dark:text-white">{myReviews.length}</strong>개 | 작성한 댓글 <strong className="text-neutral-900 dark:text-white">{myComments.length}</strong>개
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex bg-white dark:bg-[#222222] border border-neutral-200 dark:border-neutral-800 rounded-t-2xl border-b-0 overflow-hidden">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex-1 h-14 bg-transparent cursor-pointer text-[15px] transition-colors border-b-2 ${
            activeTab === 'reviews'
              ? 'border-neutral-900 font-bold text-neutral-900 dark:border-white dark:text-white'
              : 'border-neutral-200 font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400'
          }`}
        >
          내가 쓴 리뷰 ({myReviews.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 h-14 bg-transparent cursor-pointer text-[15px] transition-colors border-b-2 ${
            activeTab === 'comments'
              ? 'border-neutral-900 font-bold text-neutral-900 dark:border-white dark:text-white'
              : 'border-neutral-200 font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400'
          }`}
        >
          내가 쓴 댓글 ({myComments.length})
        </button>
      </div>

      <div className="bg-white dark:bg-[#222222] border border-t-0 border-neutral-200 dark:border-neutral-800 rounded-b-2xl px-4 pb-4">
      {/* 1. 내가 쓴 리뷰 탭 */}
      {activeTab === 'reviews' && (
        <div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1.5 h-9 px-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-[#2a2a2a] text-neutral-700 dark:text-neutral-200 cursor-pointer text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
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
        <div className="flex flex-col pt-2">
          {myComments.length === 0 ? (
            <p className="text-center text-neutral-500 dark:text-neutral-400 py-14">작성한 댓글이 없습니다.</p>
          ) : (
            myComments.map((comment) => {
              const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
              const targetReview = allReviews.find((r) => r.id === comment.reviewId);
              const targetMovie = targetReview ? movies.find((m) => m.id === targetReview.movieId) : null;

              return (
                <div
                  key={comment.id}
                  className="border-b border-neutral-100 dark:border-neutral-800 px-2 py-4 text-neutral-900 dark:text-white flex justify-between items-center gap-4 transition-colors duration-200"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1.5 truncate">
                      {targetMovie ? `[${targetMovie.title}] ` : ''}
                      {targetReview ? `리뷰: "${targetReview.title}"` : '삭제된 리뷰'}
                    </div>
                    <p className="m-0 text-[15px] text-neutral-800 dark:text-neutral-200">{comment.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMyComment(comment.id)}
                    aria-label="댓글 삭제"
                    className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg cursor-pointer text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/15"
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
    </div>
    </div>
  );
}