import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, MessageSquarePlus, ArrowLeft } from "lucide-react";
import { useAuth } from "../AuthContextPro";
import ReviewList from "./ReviewList";

// 1. 영화 상세
// 2. 영화 상세 컴포넌트
const MovieDetail = ({ darkMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [movies, setMovies] = useState(() =>
    JSON.parse(localStorage.getItem("movies") || "[]"),
  );

  const [reviews, setReviews] = useState(() =>
    JSON.parse(localStorage.getItem("reviews") || "[]"),
  );

  const [movieLikes, setMovieLikes] = useState(() =>
    JSON.parse(localStorage.getItem("movieLikes") || "{}"),
  );

  // 3. 데이터 불러오기
  useEffect(() => {
    const loadData = () => {
      setMovies(JSON.parse(localStorage.getItem("movies") || "[]"));
      setReviews(JSON.parse(localStorage.getItem("reviews") || "[]"));
      setMovieLikes(JSON.parse(localStorage.getItem("movieLikes") || "{}"));
    };

    loadData();

    window.addEventListener("storage", loadData);
    window.addEventListener("local-update", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("local-update", loadData);
    };
  }, [id]);

  //   // 4. ReviewList 수정·삭제 후 데이터 동기화
  //   useEffect(() => {
  //     const syncReviews = () => {
  //       const savedReviews = localStorage.getItem("reviews") || "[]";

  //       setReviews((prev) =>
  //         JSON.stringify(prev) === savedReviews
  //           ? prev
  //           : JSON.parse(savedReviews)
  //       );
  //     };

  //     const interval = setInterval(syncReviews, 500);
  //     return () => clearInterval(interval);
  //   }, []);

  // 5. 현재 영화 및 리뷰
  const currentMovie = movies.find((m) => String(m.id) === String(id));

  const movie = currentMovie;

  const movieReviews = reviews
    .filter((review) => String(review.movieId) === String(id))
    .sort((a, b) => b.id - a.id);

  const averageRating = movieReviews.length
    ? (
        movieReviews.reduce(
          (sum, review) => sum + Number(review.score || 0),
          0,
        ) / movieReviews.length
      ).toFixed(1)
    : "0.0";

  // 6. 영화 좋아요
  const likes = movieLikes[id] || [];

  const isLiked = currentUser?.userId
    ? likes.some((user) => String(user) === String(currentUser.userId))
    : false;

  const handleMovieLike = () => {
    if (!currentUser?.userId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const userId = currentUser.userId;

    const updatedLikes = isLiked
      ? likes.filter((user) => String(user) !== String(userId))
      : [...likes, userId];

    const updated = {
      ...movieLikes,
      [id]: updatedLikes,
    };

    setMovieLikes(updated);
    localStorage.setItem("movieLikes", JSON.stringify(updated));
    window.dispatchEvent(new Event("local-update"));
  };

  // 7. 리뷰 등록 페이지 이동
  const goToReviewForm = () => {
    if (!currentUser?.userId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    navigate("/review/create", {
      state: {
        movieId: movie.id,
        movieTitle: movie.title,
      },
    });
  };

  // 9. 영화가 없을 때
  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <h2 className="mb-5 text-2xl font-bold">영화를 찾을 수 없습니다.</h2>

        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-rose-600 px-6 py-3 font-bold text-white hover:bg-rose-700"
        >
          메인으로 돌아가기
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f2f3f6] pb-20 text-neutral-900 transition-colors duration-200 dark:bg-[#181818] dark:text-neutral-100">
      {/* 영화 상세 정보 */}
      <section className="mb-12">
        {/* 가로 포스터 */}
        <div className="relative h-[340px] w-full overflow-hidden bg-neutral-800">
          {movie.wide_poster && (
            <img
              src={movie.wide_poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f2f3f6] via-transparent to-transparent dark:from-[#181818]"></div>
          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"
            >
              <ArrowLeft size={16} />
              뒤로가기
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1100px] flex-col gap-9 px-6 md:flex-row">
          {/* 세로 포스터 */}
          <div className="-mt-32 relative w-48 md:w-56 shrink-0">
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-[340px] object-cover rounded-xl border-4 border-[#f2f3f6] shadow-2xl dark:border-[#181818]"
              />
            )}
          </div>

          {/* 영화 정보 */}
          <div className="flex-1 pt-6">
            <h1 className="text-[32px] font-bold tracking-tight mb-2 leading-tight">
              {movie.title}
            </h1>

            <p className="text-neutral-500 mb-1 dark:text-neutral-400">
              {movie.overview}
            </p>

            {movie.releaseDate && (
              <p className="text-sm text-neutral-500 mb-1 dark:text-neutral-400">
                개봉일: {movie.releaseDate}
              </p>
            )}

            {/* 평점 */}
            <div className="mt-8 grid grid-cols-2 gap-4 dark:border-neutral-400">
              <div className="rounded-xl border border-neutral-200 p-5 bg-white dark:bg-neutral-1000 dark:border-neutral-800 dark:bg-[#222222]">
                <p className="mb-2 text-sm">평균 별점</p>
                <div className="flex items-center gap-2">
                  <Star size={25} className="fill-rose-600 text-rose-600" />
                  <span className="text-3xl font-black">{averageRating}</span>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 p-5 bg-white dark:bg-neutral-1000 dark:border-neutral-800 dark:bg-[#222222]">
                <div>
                  <p className="mb-2 text-sm">리뷰 수</p>
                  <p className="text-3xl font-black">
                    {movieReviews.length}
                    <span className="ml-1 text-base">개</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 h-px" />

            <h2 className="mb-3 text-xl font-bold">줄거리</h2>

            <p className="leading-8 whitespace-pre-wrap dark:text-neutral-300">
              {movie.synopsis}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-6">
        {/* 리뷰 등록 버튼 섹션 */}
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 mb-10 dark:border-neutral-800 dark:bg-[#222222]">
          <div>
            <h2 className="text-xl font-black mb-2">영화 리뷰</h2>
            <p className="text-neutral-500 text-sm dark:text-neutral-400">
              {movie.title} 영화를 감상한 후기를 남겨보세요!
            </p>
          </div>

          <button
            onClick={goToReviewForm}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-3 font-bold text-white transition-colors hover:bg-rose-700"
          >
            <MessageSquarePlus size={19} />
            리뷰 등록
          </button>
        </section>

        {/* 관람객 리뷰 및 ReviewList 적용 섹션 */}
        <section>
          <div className="flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-rose-600" />

            <h2 className="text-2xl font-black">관람객 리뷰</h2>

            <span className="rounded-full px-3 py-1 text-sm font-bold bg-rose-50 text-rose-600 dark:bg-rose-600/15 dark:text-rose-400">
              {movieReviews.length}
            </span>
          </div>
        </section>
        <div>
          {/* 기존 ReviewList 기능 그대로 사용 */}
          <ReviewList customReviews={movieReviews} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
