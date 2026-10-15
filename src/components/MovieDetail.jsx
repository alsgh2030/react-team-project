import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { useAuth } from "../AuthContextPro";
import ReviewList from "./ReviewList";

// 1. 영화 상세
const movieDetails = {
  1: {
    releaseDate: "2019.05.09",
    overview: "한국 • 코미디 • 107분",
    synopsis: "전직 전설의 형사 미영과 민원실로 밀려난 현직 형사 지혜. 두 사람은 디지털 성범죄 사건의 피해자를 발견하고 비공식 수사에 나선다."
  },
  2: {
    releaseDate: "2021.01.27",
    overview: "일본 • 애니메이션 • 116분",
    synopsis: "혈귀로 변한 여동생 네즈코를 인간으로 되돌리기 위해 귀살대에 들어간 탄지로. 염주 렌고쿠와 함께 무한열차에 탑승한 그는 숨어 있던 혈귀와 마주한다."
  },
  3: {
    releaseDate: "2024.09.01",
    overview: "일본 • 드라마 • 회당 48분",
    synopsis: "같은 아파트 단지에 사는 소꿉친구 노에와 나츠코. 평온한 일상을 보내던 두 사람은 오랜 이웃에게 뜻밖의 부탁을 받는다."
  },
  4: {
    releaseDate: "2012.07.25",
    overview: "한국 • 범죄 • 136분",
    synopsis: "한국과 중국의 도둑들이 마카오 카지노에 숨겨진 희대의 다이아몬드를 훔치기 위해 팀을 이룬다."
  },
  5: {
    releaseDate: "2014.04.02",
    overview: "미국 • 액션 • 121분",
    synopsis: "아프가니스탄에서 탈레반 지도자를 체포하는 작전에 투입된 네이비씰 대원들. 잠복 중 주민들에게 발각되면서 어려운 선택에 직면한다."
  },
  6: {
    releaseDate: "2008.01.10",
    overview: "대만 • 로맨스 • 101분",
    synopsis: "예술학교로 전학 온 상륜은 옛 음악실에서 샤오위를 만난다. 가까워질수록 애틋한 마음이 생기지만 그녀에게는 알 수 없는 비밀이 있다."
  },
  7: {
    title: "극장판 먼작귀: 특별한 섬으로의 초대",
    releaseDate: "2026.09.30",
    overview: "일본 • 애니메이션 • 99분",
    originalWork: "만화 '먼작귀'",
    synopsis: `어느 날, 광장에서 쉬고 있던 치이카와와 친구들 앞에 특별한 섬으로의 초대장이 나타난다.

“섬에서 간단한 토벌만 해도 보수 100배!”
“한정 섬라멘과 한정 디저트까지!”

솔깃한 문구에 이끌린 치이카와와 친구들은 섬에서 열리는 행사에 참가하기로 한다.

하지만 초대장의 내용이 어딘가 수상하다고 느끼는 해달.

과연 특별한 섬에는 어떤 비밀이 숨겨져 있을까...?`
  },
  8: {
    releaseDate: "1957.03.25",
    overview: "미국 • 드라마 • 220분",
    synopsis: "남북전쟁 직전, 스칼렛은 애슐리에게 사랑을 고백하지만 거절당한다. 이를 지켜본 레트는 스칼렛에게 매력을 느낀다."
  },
  9: {
    releaseDate: "2017.05.17",
    overview: "한국 • 범죄 • 120분",
    synopsis: "교도소에서 만난 재호와 현수. 서로에게 강하게 끌린 두 사람은 출소 후 조직의 권력을 차지하기 위해 손을 잡는다."
  },
  10: {
    releaseDate: "2013.08.01",
    overview: "한국 • 액션 • 125분",
    synopsis: "얼어붙은 지구에서 생존자들을 태운 열차. 꼬리 칸의 커티스는 불평등한 질서에 맞서 앞쪽 칸으로 향하는 반란을 시작한다."
  },
  11: {
    releaseDate: "2017.12.20",
    overview: "한국 • 판타지 • 139분",
    synopsis: "화재 현장에서 아이를 구하고 죽은 소방관 자홍. 세 명의 저승차사와 함께 일곱 번의 재판을 받으며 예상치 못한 진실을 마주한다."
  },
  12: {
    releaseDate: "2009.08.13",
    overview: "일본 • 애니메이션 • 114분",
    synopsis: "수학 천재 겐지는 나츠키와 함께 시골 여행을 떠난다. 어느 날 수수께끼의 숫자가 담긴 문자를 받으면서 가상 세계 OZ에 위기가 찾아온다."
  },
  13: {
    releaseDate: "2015.01.07",
    overview: "미국 • 모험 • 114분",
    synopsis: "유명 음식 평론가와의 갈등으로 레스토랑을 떠난 셰프 칼은 푸드트럭을 시작하며 요리의 즐거움을 되찾는다."
  },
  14: {
    releaseDate: "2012.03.22",
    overview: "프랑스 • 전기 • 111분",
    synopsis: "사고로 전신이 마비된 백만장자 필립과 자유분방한 드리스. 서로 다른 두 사람이 만나 특별한 우정을 쌓는다."
  },
  15: {
    releaseDate: "2012.07.05",
    overview: "한국 • 드라마 • 109분",
    synopsis: "전국에서 변종 연가시로 인한 사망자가 발견된다. 재혁은 감염된 가족들을 구하기 위해 치료제를 찾아 나선다."
  },
  16: {
    releaseDate: "2001.07.27",
    overview: "한국 • 드라마 • 137분",
    synopsis: "전철에서 술에 취한 여성을 만난 견우. 예측할 수 없는 그녀와의 만남은 뜻밖의 사랑 이야기로 이어진다."
  },
  17: {
    releaseDate: "2017",
    overview: "한국 • 애니메이션 • 21분",
    synopsis: "원피스 TV 애니메이션화 20주년 기념 특별판. 해적을 꿈꾸는 또 다른 루피의 모험이 시작된다."
  },
  18: {
    releaseDate: "2006.03.23",
    overview: "한국 • 드라마 • 137분",
    synopsis: "동독 비밀경찰 비즐러는 극작가 드라이만과 배우 크리스타를 감시하는 임무를 맡지만, 그들의 삶을 지켜보며 변하기 시작한다."
  },
  19: {
    releaseDate: "2006.09.28",
    overview: "한국 • 드라마 • 140분",
    synopsis: "도박판에서 전 재산을 잃은 고니는 전설적인 타짜 평경장을 만나 화투의 세계에 뛰어든다."
  },
  20: {
    releaseDate: "1997.11.15",
    overview: "오스트리아 • 범죄 • 108분",
    synopsis: "호숫가 별장에서 휴가를 보내던 가족 앞에 낯선 두 청년이 찾아오면서 평화로운 일상이 악몽으로 변한다."
  },
  21: {
    releaseDate: "2009.07.22",
    overview: "한국 • 액션 • 120분",
    synopsis: "부산 해운대에 초대형 쓰나미가 몰려온다. 재난 속에서 사람들은 사랑하는 이들을 구하기 위해 사투를 벌인다."
  }
};

// 2. MovieDetail 컴포넌트
const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // 데이터 상태
  const [movies, setMovies] = useState(() =>
    JSON.parse(localStorage.getItem("movies") || "[]")
  );

  const [reviews, setReviews] = useState(() =>
    JSON.parse(localStorage.getItem("reviews") || "[]")
  );

  const [movieLikes, setMovieLikes] = useState(() =>
    JSON.parse(localStorage.getItem("movieLikes") || "{}")
  );

  const [movieComments, setMovieComments] = useState(() =>
    JSON.parse(localStorage.getItem("movieComments") || "[]")
  );

  const [commentInput, setCommentInput] = useState("");

  // 3. 데이터 불러오기
  useEffect(() => {
    const loadData = () => {
      setMovies(JSON.parse(localStorage.getItem("movies") || "[]"));
      setReviews(JSON.parse(localStorage.getItem("reviews") || "[]"));
      setMovieLikes(JSON.parse(localStorage.getItem("movieLikes") || "{}"));
      setMovieComments(
        JSON.parse(localStorage.getItem("movieComments") || "[]")
      );
    };

    loadData();

    window.addEventListener("storage", loadData);
    window.addEventListener("local-update", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("local-update", loadData);
    };
  }, [id]);

  // 4. 현재 영화
  const currentMovie = movies.find(
    (m) => String(m.id) === String(id)
  );

  const movie = currentMovie
    ? { ...currentMovie, ...(movieDetails[currentMovie.id] || {}) }
    : null;

  // 5. 현재 영화의 리뷰
  const movieReviews = reviews.filter(
    (review) => String(review.movieId) === String(id)
  );

  // 평균 별점
  const averageRating = movieReviews.length
    ? (
        movieReviews.reduce(
          (sum, review) => sum + Number(review.score || 0),
          0
        ) / movieReviews.length
      ).toFixed(1)
    : "0.0";

  // 6. 영화 좋아요 및 댓글
  const likes = movieLikes[id] || [];

  const isLiked = currentUser?.userId
    ? likes.includes(currentUser.userId)
    : false;

  const comments = movieComments.filter(
    (comment) => String(comment.movieId) === String(id)
  );

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
        movieTitle: movie.title
      }
    });
  };

  // 8. 영화 좋아요
  const handleMovieLike = () => {
    if (!currentUser?.userId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const userId = currentUser.userId;

    const updatedLikes = isLiked
      ? likes.filter((user) => user !== userId)
      : [...likes, userId];

    const updated = {
      ...movieLikes,
      [id]: updatedLikes
    };

    setMovieLikes(updated);
    localStorage.setItem("movieLikes", JSON.stringify(updated));
  };

  // 9. 영화 댓글 등록
  const handleAddMovieComment = (e) => {
    e.preventDefault();

    if (!currentUser?.userId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      movieId: Number(id),
      userId: currentUser.userId,
      content: commentInput.trim()
    };

    const updated = [...movieComments, newComment];

    setMovieComments(updated);
    localStorage.setItem("movieComments", JSON.stringify(updated));
    setCommentInput("");
  };

  // 10. 영화 댓글 삭제
  const handleDeleteMovieComment = (commentId) => {
    const target = movieComments.find(
      (comment) => comment.id === commentId
    );

    if (!target || target.userId !== currentUser?.userId) return;
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    const updated = movieComments.filter(
      (comment) => comment.id !== commentId
    );

    setMovieComments(updated);
    localStorage.setItem("movieComments", JSON.stringify(updated));
  };

  // 영화가 없을 때
  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#101015] px-4 text-white">
        <h2 className="mb-5 text-2xl font-bold">
          영화를 찾을 수 없습니다.
        </h2>

        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-pink-600 px-6 py-3 font-bold text-white transition hover:bg-pink-500"
        >
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  // 11. 화면
  return (
    <div className="min-h-screen bg-[#101015] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* 1. 영화 상세 정보 */}
        <section className="overflow-hidden rounded-2xl border border-pink-500/30 bg-[#1c1c24] shadow-[0_0_25px_rgba(236,72,153,0.12)]">

          {/* 가로 포스터 */}
          {movie.wide_poster && (
            <div className="relative">
              <img
                src={movie.wide_poster}
                alt={`${movie.title} 가로 포스터`}
                className="h-64 w-full object-cover md:h-80"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1c24] via-transparent to-transparent" />
            </div>
          )}

          <div className="flex flex-col gap-7 p-6 md:flex-row md:p-8">

            {/* 세로 포스터 */}
            <div className="w-full shrink-0 md:w-56">
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-xl border border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.2)]"
                />
              )}
            </div>

            {/* 영화 정보 */}
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-xs font-bold tracking-[0.25em] text-pink-400">
                MOVIE DETAIL
              </p>

              <h1 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
                {movie.title}
              </h1>

              <p className="mb-3 text-sm text-gray-400">
                {movie.overview || movie.content}
              </p>

              {movie.releaseDate && (
                <p className="mb-2 text-sm text-gray-300">
                  개봉일: {movie.releaseDate}
                </p>
              )}

              {movie.originalWork && (
                <p className="mb-2 text-sm text-gray-300">
                  원작: {movie.originalWork}
                </p>
              )}

              <div className="my-6 h-px bg-gradient-to-r from-pink-500/60 to-transparent" />

              <h2 className="mb-3 text-xl font-bold text-pink-300">
                줄거리
              </h2>

              <p className="whitespace-pre-wrap leading-8 text-gray-300">
                {movie.synopsis || movie.content}
              </p>

              {/* 평균 별점 */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-pink-500/30 bg-[#28202e] p-5">
                  <p className="mb-2 text-sm text-gray-300">
                    평균 별점
                  </p>

                  <p className="text-3xl font-black text-pink-400">
                    ★ {averageRating}
                  </p>
                </div>

                <div className="rounded-xl border border-pink-500/30 bg-[#28202e] p-5">
                  <p className="mb-2 text-sm text-gray-300">
                    리뷰 수
                  </p>

                  <p className="text-3xl font-black text-white">
                    {movieReviews.length}
                    <span className="ml-1 text-base text-gray-400">
                      개
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 리뷰 등록 */}
        <section className="rounded-2xl border border-pink-500/30 bg-[#1c1c24] p-6 shadow-[0_0_20px_rgba(236,72,153,0.08)] md:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-2 text-2xl font-black">
                영화 리뷰
              </h2>

              <p className="text-sm text-gray-400">
                {movie.title} 영화를 감상한 후기를 남겨보세요!
              </p>
            </div>

            <button
              onClick={goToReviewForm}
              className="shrink-0 rounded-xl bg-gradient-to-r from-pink-600 to-fuchsia-500 px-7 py-3 font-bold text-white shadow-[0_0_18px_rgba(236,72,153,0.25)] transition-all hover:brightness-110"
            >
              + 리뷰 등록
            </button>
          </div>
        </section>

        {/* 3. 관람객 리뷰 */}
        <section className="rounded-2xl border border-pink-500/30 bg-[#1c1c24] p-5 shadow-[0_0_20px_rgba(236,72,153,0.08)] md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />

            <h2 className="text-2xl font-black">
              관람객 리뷰
            </h2>

            <span className="rounded-full bg-pink-500/15 px-3 py-1 text-sm font-bold text-pink-300">
              {movieReviews.length}
            </span>
          </div>

          {/* 기존 ReviewList 연결 */}
          <div className="dark rounded-xl bg-[#1c1c24] text-white">
            <ReviewList customReviews={movieReviews} />
          </div>
        </section>

        {/* 4. 영화 좋아요 · 댓글 */}
        <section className="rounded-2xl border border-pink-500/30 bg-[#1c1c24] p-6 shadow-[0_0_20px_rgba(236,72,153,0.08)] md:p-8">

          <div className="mb-6 flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />

            <h2 className="text-2xl font-black">
              영화 좋아요 · 댓글
            </h2>
          </div>

          {/* 좋아요 및 댓글 개수 */}
          <div className="mb-7 flex flex-wrap items-center gap-4">
            <button
              onClick={handleMovieLike}
              className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-bold transition-all ${
                isLiked
                  ? "border-pink-400 bg-pink-500/20 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                  : "border-gray-700 bg-[#252525] text-gray-300 hover:border-pink-400"
              }`}
            >
              <Heart
                size={20}
                className={
                  isLiked
                    ? "fill-pink-400 text-pink-400"
                    : "text-pink-400"
                }
              />
              좋아요 {likes.length}
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-gray-700 bg-[#252525] px-5 py-3 font-bold text-gray-300">
              <MessageCircle
                size={20}
                className="text-pink-400"
              />
              댓글 {comments.length}
            </div>
          </div>

          {/* 영화 댓글 작성 */}
          <form
            onSubmit={handleAddMovieComment}
            className="mb-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="영화에 대한 댓글을 입력하세요..."
              className="min-w-0 flex-1 rounded-xl border border-gray-700 bg-[#252525] px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-pink-400"
            />

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-pink-600 to-fuchsia-500 px-7 py-3 font-bold text-white transition hover:brightness-110"
            >
              등록
            </button>
          </form>

          {/* 영화 댓글 목록 */}
          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="rounded-xl border border-gray-700 bg-[#252525] py-8 text-center text-gray-400">
                아직 영화에 대한 댓글이 없습니다.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-gray-700 bg-[#252525] p-4"
                >
                  <div className="min-w-0">
                    <p className="mb-2 text-sm font-bold text-pink-300">
                      {comment.userId}
                    </p>

                    <p className="break-words leading-7 text-gray-200">
                      {comment.content}
                    </p>
                  </div>

                  {/* 본인 댓글만 삭제 가능 */}
                  {comment.userId === currentUser?.userId && (
                    <button
                      onClick={() =>
                        handleDeleteMovieComment(comment.id)
                      }
                      className="shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-pink-500/10 hover:text-pink-400"
                      aria-label="댓글 삭제"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MovieDetail;
