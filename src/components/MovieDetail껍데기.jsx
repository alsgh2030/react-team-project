import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Star, MessageSquarePlus } from "lucide-react";
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

  // 8. 팀원 Navibar 디자인과 동일한 컬러
  const pageBg = darkMode
    ? "bg-[#181818] text-neutral-100"
    : "bg-white text-neutral-900";

  const cardStyle = darkMode
    ? "border-neutral-800 bg-[#222222]"
    : "border-neutral-200 bg-white";

  const subCardStyle = darkMode
    ? "border-neutral-700 bg-neutral-800"
    : "border-neutral-200 bg-neutral-50";

  const subText = darkMode ? "text-neutral-400" : "text-neutral-500";

  // 9. 영화가 없을 때
  if (!movie) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-center px-4 ${pageBg}`}
      >
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

  // 10. 화면
  return (
    <div
      className={`min-h-screen px-4 py-10 font-sans transition-colors duration-200 ${pageBg}`}
    >
      <div className="mx-auto max-w-[1100px] space-y-8">
        {/* 1. 영화 상세 정보 */}
        <section className={`overflow-hidden rounded-2xl border ${cardStyle}`}>
          {/* 가로 포스터 */}
          {movie.wide_poster && (
            <div className="relative">
              <img
                src={movie.wide_poster}
                alt={`${movie.title} 가로 포스터`}
                className="h-64 w-full object-cover md:h-80"
              />

              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
                  darkMode
                    ? "from-[#222222] via-transparent"
                    : "from-white via-transparent"
                } to-transparent`}
              />
            </div>
          )}

          <div className="flex flex-col gap-7 p-6 md:flex-row md:p-8">
            {/* 세로 포스터 */}
            <div className="w-full shrink-0 md:w-56">
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-xl border border-neutral-300 object-cover shadow-sm"
                />
              )}
            </div>

            {/* 영화 정보 */}
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-bold tracking-[0.25em] text-rose-600">
                MOVIE DETAIL
              </p>

              <h1 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
                {movie.title}
              </h1>

              <p className={`mb-3 text-sm ${subText}`}>{movie.overview}</p>

              {movie.releaseDate && (
                <p className={`mb-2 text-sm ${subText}`}>
                  개봉일: {movie.releaseDate}
                </p>
              )}

              <div
                className={`my-6 h-px ${
                  darkMode ? "bg-neutral-700" : "bg-neutral-200"
                }`}
              />

              <h2 className="mb-3 text-xl font-bold">줄거리</h2>

              <p className={`whitespace-pre-wrap leading-8 ${subText}`}>
                {movie.synopsis}
              </p>

              {/* 평균 별점 및 리뷰 수 */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className={`rounded-xl border p-5 ${subCardStyle}`}>
                  <p className={`mb-2 text-sm ${subText}`}>평균 별점</p>

                  <div className="flex items-center gap-2">
                    <Star size={25} className="fill-rose-600 text-rose-600" />
                    <span className="text-3xl font-black">{averageRating}</span>
                  </div>
                </div>

                <div className={`rounded-xl border p-5 ${subCardStyle}`}>
                  <p className={`mb-2 text-sm ${subText}`}>리뷰 수</p>

                  <p className="text-3xl font-black">
                    {movieReviews.length}
                    <span className={`ml-1 text-base ${subText}`}>개</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 리뷰 등록 */}
        <section className={`rounded-2xl border p-6 md:p-8 ${cardStyle}`}>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-2 text-2xl font-black">영화 리뷰</h2>

              <p className={`text-sm ${subText}`}>
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
          </div>
        </section>

        {/* 3. 관람객 리뷰 */}
        <section className={`rounded-2xl border p-5 md:p-8 ${cardStyle}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-rose-600" />

            <h2 className="text-2xl font-black">관람객 리뷰</h2>

            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                darkMode
                  ? "bg-rose-600/15 text-rose-400"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              {movieReviews.length}
            </span>
          </div>

          {/* 기존 ReviewList 기능 그대로 사용 */}
          <div
            className={`rounded-xl ${
              darkMode
                ? "dark bg-[#222222] text-white"
                : "bg-white text-neutral-900"
            }`}
          >
            <ReviewList customReviews={movieReviews} />
          </div>
        </section>

        {/* 4. 영화 자체 좋아요 */}
        <section className={`rounded-2xl border p-6 md:p-8 ${cardStyle}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-rose-600" />

            <h2 className="text-2xl font-black">영화 좋아요</h2>
          </div>

          <button
            onClick={handleMovieLike}
            className={`flex items-center gap-2 rounded-lg border px-5 py-3 font-bold transition-colors ${
              isLiked
                ? "border-rose-600 bg-rose-600 text-white"
                : darkMode
                  ? "border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-rose-600"
                  : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-rose-600"
            }`}
          >
            <Heart size={20} className={isLiked ? "fill-current" : ""} />
            좋아요 {likes.length}
          </button>
        </section>
      </div>
    </div>
  );
};

export default MovieDetail;
