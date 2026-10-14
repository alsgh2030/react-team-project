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
      <div className="py-[60px] text-center text-black dark:text-white">
        <h2 className="text-xl font-bold">로그인이 필요한 페이지입니다.</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">로그인 후 이용해 주세요.</p>
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
    <div className="max-w-[800px] mx-auto p-5 text-black dark:text-white transition-colors duration-200">
      {/* 사용자 프로필 헤더 */}
      <div className="flex items-center gap-5 mb-6 p-6 bg-[#f8f9fa] dark:bg-[#252525] border border-transparent dark:border-gray-700 rounded-xl transition-colors duration-200">
        <div className="w-16 h-16 rounded-full bg-[#e2e8f0] dark:bg-[#383838] flex justify-center items-center">
          <User size={36} className="text-[#64748b] dark:text-gray-300" />
        </div>
        <div>
          <h2 className="m-0 text-[1.4rem] font-bold">{currentUser.userId} 님의 마이페이지</h2>
          <p className="mt-1.5 mb-0 text-[#666] dark:text-gray-400 text-sm">
            작성한 리뷰 <strong className="text-black dark:text-white">{myReviews.length}</strong>개 | 작성한 댓글 <strong className="text-black dark:text-white">{myComments.length}</strong>개
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b-2 border-[#e2e8f0] dark:border-gray-700 mb-5">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex-1 p-3.5 bg-transparent border-none cursor-pointer text-base transition-colors ${
            activeTab === 'reviews'
              ? 'border-b-[3px] border-[#007bff] font-bold text-[#007bff] dark:text-[#3b82f6]'
              : 'font-normal text-[#64748b] dark:text-gray-400'
          }`}
        >
          내가 쓴 리뷰 ({myReviews.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 p-3.5 bg-transparent border-none cursor-pointer text-base transition-colors ${
            activeTab === 'comments'
              ? 'border-b-[3px] border-[#007bff] font-bold text-[#007bff] dark:text-[#3b82f6]'
              : 'font-normal text-[#64748b] dark:text-gray-400'
          }`}
        >
          내가 쓴 댓글 ({myComments.length})
        </button>
      </div>

      {/* 1. 내가 쓴 리뷰 탭 */}
      {activeTab === 'reviews' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1.5 px-3 py-2 border border-[#cbd5e1] dark:border-gray-600 rounded-md bg-white dark:bg-[#333] text-black dark:text-white cursor-pointer text-xs"
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
        <div className="flex flex-col gap-3">
          {myComments.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">작성한 댓글이 없습니다.</p>
          ) : (
            myComments.map((comment) => {
              const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
              const targetReview = allReviews.find((r) => r.id === comment.reviewId);
              const targetMovie = targetReview ? movies.find((m) => m.id === targetReview.movieId) : null;

              return (
                <div
                  key={comment.id}
                  className="border border-[#e2e8f0] dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[#252525] text-black dark:text-white flex justify-between items-center transition-colors duration-200"
                >
                  <div>
                    <div className="text-xs text-[#64748b] dark:text-gray-400 mb-1.5">
                      {targetMovie ? `[${targetMovie.title}] ` : ''}
                      {targetReview ? `리뷰: "${targetReview.title}"` : '삭제된 리뷰'}
                    </div>
                    <p className="m-0 text-[0.950rem] text-[#1e293b] dark:text-gray-200">{comment.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMyComment(comment.id)}
                    className="bg-transparent border-none cursor-pointer text-[#ff4d4f] p-1"
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