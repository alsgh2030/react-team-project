import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import StarDisplay from "../StarDisplay";
import { useAuth } from "../../AuthContextPro";
import welcome_light from "../../image/welcome_light.png";
import welcome_dark from "../../image/welcome_dark.png";
import popup_ai from "../../image/popup_ai.png";
import popup_birthday from "../../image/popup_birthday.png";

// 좌우 화살표 버튼 (라이트/다크 모드에 따라 색이 바뀜)
const ArrowButton = ({ dir, onClick, label, size = 68, className = "" }) => {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  const from = dir === "left" ? 45 : 225;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:scale-105
        text-neutral-900 [--btn-bg:#ffffff] [--arc:225,29,72] shadow-[0_6px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_0_22px_rgba(225,29,72,0.28),0_6px_20px_rgba(15,23,42,0.18)]
        dark:text-white dark:[--btn-bg:#16181d] dark:[--arc:147,197,253] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_0_24px_rgba(147,197,253,0.35),0_8px_24px_rgba(0,0,0,0.45)]
        ${className}`}
      style={{
        width: size,
        height: size,
        border: "2px solid transparent",
        background: `linear-gradient(var(--btn-bg), var(--btn-bg)) padding-box, conic-gradient(from ${from}deg, rgba(var(--arc),0.95), rgba(var(--arc),0.1) 30%, rgba(var(--arc),0.1) 70%, rgba(var(--arc),0.95)) border-box`,
        transitionProperty: "opacity, translate, scale, box-shadow, color",
        transitionDuration: "300ms",
      }}
    >
      <Icon size={Math.round(size * 0.38)} strokeWidth={2.5} />
    </button>
  );
};

const MainPage = () => {
  const movies = JSON.parse(localStorage.getItem("movies"));
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || [],
  );
  const { currentUser, getMovieStats, currentMovie, setCurrentMovie } =
    useAuth();

  const shuffled = () => {
    const suf_mov = movies.map((x) => ({ ...x, key: Math.random() }));
    return suf_mov.sort((x, y) => x.key - y.key);
  };

  const [random_movies, setRandomMovies] = useState(shuffled().slice(0, 5));
  const [top_movie_List, setTop_moive_List] = useState(
    movies.filter((x) => x.avgScore > 3.5).slice(0, 10),
  );

  const onLeft1 = () => {
    const left_1 = random_movies.slice(1);
    setRandomMovies([...left_1, random_movies[0]]);
  };

  const onRight1 = () => {
    const right_1 = random_movies.slice(0, 4);
    setRandomMovies([random_movies[4], ...right_1]);
  };

  const onLeft2 = () => {
    const right_1 = top_movie_List.slice(0, -5);
    const right_2 = top_movie_List.slice(-5);
    setTop_moive_List([...right_2, ...right_1]);
  };

  const onRight2 = () => {
    const left_1 = top_movie_List.slice(0, 5);
    const left_2 = top_movie_List.slice(5, 10);
    setTop_moive_List([...left_2, ...left_1]);
  };

  const navigate = useNavigate();

  // 메인페이지에 들어올 때 항상 스크롤을 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 환영 연출: 이 탭에서 로그인 후 메인에 처음 들어왔을 때 한 번만
  // 단계: enter(등장 준비) → show(보이는 중) → leave(사라지는 중) → none
  const [welcome, setWelcome] = useState(() => {
    try {
      return currentUser &&
        currentUser.userId &&
        !sessionStorage.getItem("welcome_shown")
        ? "enter"
        : "none";
    } catch {
      return "none";
    }
  });
  const [welcome_bar, setWelcomeBar] = useState(false);

  useEffect(() => {
    if (welcome !== "enter") return;
    try {
      sessionStorage.setItem("welcome_shown", "1");
    } catch {}
    const t0 = setTimeout(() => setWelcome("show"), 50);
    const t1 = setTimeout(() => setWelcomeBar(true), 700);
    const t2 = setTimeout(
      () => setWelcome((w) => (w === "show" ? "leave" : w)),
      3300,
    );
    const t3 = setTimeout(() => setWelcome("none"), 4500);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // 화면을 누르면 바로 사라지기 시작
  const skipWelcome = () => {
    if (welcome !== "show") return;
    setWelcome("leave");
    setTimeout(() => setWelcome("none"), 1200);
  };

  // 광고 팝업: 환영 연출이 끝난 뒤 등장, [24시간 동안 보지 않기]는 localStorage에 만료 시각 저장
  const [popups, setPopups] = useState(() => {
    const now = Date.now();
    return ["ai", "birthday"].filter((id) => {
      try {
        return !(Number(localStorage.getItem(`popup_hide_${id}`)) > now);
      } catch {
        return true;
      }
    });
  });
  const [popup_ready, setPopupReady] = useState(false);

  useEffect(() => {
    if (welcome !== "none") return;
    const t = setTimeout(() => setPopupReady(true), 300);
    return () => clearTimeout(t);
  }, [welcome]);

  const closePopup = (id) => {
    setPopups((prev) => prev.filter((x) => x !== id));
  };

  // 외부 링크로 바로 이동 (현재 탭에서 이동)
  const openLink = (url) => {
    window.location.assign(url);
  };

  const hidePopup24h = (id) => {
    try {
      localStorage.setItem(
        `popup_hide_${id}`,
        String(Date.now() + 24 * 60 * 60 * 1000),
      );
    } catch {}
    closePopup(id);
  };

  const banner_slots = [
    { x: -1312, w: 480, h: 270, o: 0, z: 0 },
    { x: -816, w: 480, h: 270, o: 1, z: 1 },
    { x: -320, w: 640, h: 360, o: 1, z: 2 },
    { x: 336, w: 480, h: 270, o: 1, z: 1 },
    { x: 832, w: 480, h: 270, o: 0, z: 0 },
  ];

  const [pop_fx, setPopFx] = useState({ x: 0, anim: false });
  const busy2 = useRef(false);

  // 배너 자동 넘김: 5.5초마다 다음 영화로 (마우스를 올려도 계속 흐름)
  const BANNER_DELAY = 5500;
  const banner_auto = welcome === "none" && popups.length === 0;

  useEffect(() => {
    if (!banner_auto) return;
    const t = setTimeout(() => {
      setRandomMovies((prev) => [...prev.slice(1), prev[0]]);
    }, BANNER_DELAY);
    return () => clearTimeout(t);
  }, [random_movies, banner_auto]);

  const slidePop = (move, change) => {
    if (busy2.current) return;
    busy2.current = true;

    if (move < 0) {
      setPopFx({ x: -1200, anim: true });
      setTimeout(() => {
        change();
        setPopFx({ x: 0, anim: false });
        busy2.current = false;
      }, 400);
    } else {
      change();
      setPopFx({ x: -1200, anim: false });
      setTimeout(() => setPopFx({ x: 0, anim: true }), 30);
      setTimeout(() => {
        busy2.current = false;
      }, 430);
    }
  };

  const handleLikeReview = (reviewId) => {
    if (!currentUser || !currentUser.userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

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

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  const alig_review = [...reviews].sort((x, y) => y.id - x.id);
  const profile_icon = JSON.parse(localStorage.getItem("profile_icon")) || [];
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  const onClickMovie = (movie) => {
    setCurrentMovie(movie);
    navigate(`/movie/${movie.id}`);
  };
  useEffect(() => {
    localStorage.setItem("currentMovie", JSON.stringify(currentMovie));
  }, [currentMovie]);

  return (
    <div className="min-h-screen bg-[#f2f3f6] text-neutral-900 transition-colors duration-200 dark:bg-[#181818] dark:text-neutral-100">
      {welcome !== "none" && (
        <div
          onClick={skipWelcome}
          className="fixed inset-0 z-[100] cursor-pointer bg-white/40 backdrop-blur-md dark:bg-black/60"
          style={{
            opacity: welcome === "show" ? 1 : 0,
            transition:
              welcome === "leave"
                ? "opacity 700ms ease 450ms"
                : "opacity 450ms ease",
          }}
        >
          {/* 화면 중단: 배경 이미지 띠 (가운데에서 위아래로 열리고, 끝날 때 다시 닫힘) */}
          <div
            className="absolute left-0 right-0 top-[18%] bottom-[18%] flex flex-col items-center justify-center overflow-hidden text-center text-neutral-900 shadow-2xl dark:text-white"
            style={{
              clipPath:
                welcome === "show" ? "inset(0% 0 0% 0)" : "inset(50% 0 50% 0)",
              transition:
                welcome === "leave"
                  ? "clip-path 650ms cubic-bezier(0.65, 0, 0.35, 1) 200ms"
                  : "clip-path 750ms cubic-bezier(0.22, 1, 0.36, 1) 150ms",
            }}
          >
            <img
              src={welcome_light}
              alt=""
              className="absolute inset-0 h-full w-full object-cover dark:hidden"
            />
            <img
              src={welcome_dark}
              alt=""
              className="absolute inset-0 hidden h-full w-full object-cover dark:block"
            />

            <div
              className="relative flex flex-col items-center"
              style={{
                opacity: welcome === "show" ? 1 : 0,
                transform:
                  welcome === "show"
                    ? "translateY(0)"
                    : welcome === "leave"
                      ? "translateY(-14px)"
                      : "translateY(14px)",
                transition:
                  welcome === "leave"
                    ? "opacity 300ms ease, transform 300ms ease"
                    : "opacity 600ms ease 550ms, transform 600ms ease 550ms",
              }}
            >
              <p className="mb-4 text-lg font-bold tracking-[0.5em] text-rose-600 dark:text-rose-400">
                WELCOME
              </p>
              <h2 className="text-6xl font-black tracking-tight">
                {currentUser?.userId}님, 환영합니다!
              </h2>
              <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-300">
                오늘 볼 영화, 같이 찾아볼까요?
              </p>
              <div className="mt-10 h-1 w-64 overflow-hidden rounded-full bg-neutral-300/70 dark:bg-neutral-700">
                <div
                  className="h-full rounded-full bg-rose-500"
                  style={{
                    width: welcome_bar ? "100%" : "0%",
                    transition: "width 2500ms linear",
                  }}
                ></div>
              </div>
              <p className="mt-3 text-sm text-neutral-500">
                화면을 누르면 바로 시작해요
              </p>
            </div>
          </div>
        </div>
      )}

      {welcome === "none" && popups.length > 0 && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/50 pt-24 transition-opacity dark:bg-black/70 duration-500"
          style={{ opacity: popup_ready ? 1 : 0 }}
        >
          <div
            className="flex items-start gap-5 transition-transform duration-500"
            style={{ transform: `translateY(${popup_ready ? "0px" : "16px"})` }}
          >
            {popups.includes("ai") && (
              <div className="w-[480px] overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-black/10 dark:ring-white/20 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_48px_rgba(56,189,248,0.22),0_24px_60px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[3/2] w-full">
                  <img
                    src={popup_ai}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"></div>
                  <div className="relative flex h-full flex-col justify-center px-8 text-white">
                    <span className="text-xs font-medium text-neutral-300">
                      글로벌 기업 IBM x Red Hat과 함께하는
                    </span>
                    <p className="mt-2 text-[30px] font-black leading-tight tracking-tight">
                      <span className="text-sky-400">AI</span> 서비스
                      <br />
                      개발 교육생 모집
                    </p>
                    <p className="mt-2 text-sm font-bold text-neutral-200">
                      AI 서비스 개발, 처음부터 끝까지!
                    </p>
                    <a
                      href="https://itjobgo.hi-kdt.com/"
                      onClick={(e) => {
                        e.preventDefault();
                        openLink("https://itjobgo.hi-kdt.com/");
                      }}
                      className="mt-5 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-neutral-900 transition hover:bg-sky-100 hover:scale-[1.03]"
                    >
                      지금 바로 지원하기 →
                    </a>
                  </div>
                </div>
                <div className="flex h-[76px] flex-col items-center justify-center bg-[#0b1530] px-6 text-center">
                  <p className="text-lg font-black text-sky-300">
                    [IBM x RedHat] AX Academy
                  </p>
                  <p className="mt-0.5 text-sm text-neutral-300">
                    AI Transformation 교육생 모집 중
                  </p>
                </div>
                <div className="flex divide-x divide-neutral-700 bg-neutral-900 text-sm text-neutral-300">
                  <button
                    onClick={() => hidePopup24h("ai")}
                    className="flex-1 cursor-pointer py-3 transition-colors hover:bg-neutral-800 hover:text-white"
                  >
                    24시간 동안 보지 않기
                  </button>
                  <button
                    onClick={() => closePopup("ai")}
                    className="w-24 cursor-pointer py-3 font-bold transition-colors hover:bg-neutral-800 hover:text-white"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}

            {popups.includes("birthday") && (
              <div className="w-[480px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 dark:ring-white/20 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_48px_rgba(244,63,94,0.22),0_24px_60px_rgba(0,0,0,0.6)]">
                <div
                  onClick={() => openLink("https://gift.kakao.com/home")}
                  className="relative aspect-[3/2] w-full cursor-pointer transition hover:brightness-105"
                >
                  <img
                    src={popup_birthday}
                    alt="강예진 생일 축하해"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white shadow">
                    EVENT
                  </span>
                </div>
                <div className="flex h-[76px] flex-col items-center justify-center bg-white px-6 text-center">
                  <p className="text-lg font-black text-rose-600">
                    2주 전은 예진님의 생일이에요!
                  </p>
                  <p className="mt-0.5 text-sm text-neutral-600">
                    민호 무비 일동 모두가 축하합니다
                  </p>
                </div>
                <div className="flex divide-x divide-neutral-700 bg-neutral-900 text-sm text-neutral-300">
                  <button
                    onClick={() => hidePopup24h("birthday")}
                    className="flex-1 cursor-pointer py-3 transition-colors hover:bg-neutral-800 hover:text-white"
                  >
                    24시간 동안 보지 않기
                  </button>
                  <button
                    onClick={() => closePopup("birthday")}
                    className="w-24 cursor-pointer py-3 font-bold transition-colors hover:bg-neutral-800 hover:text-white"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="group relative mt-8 overflow-hidden">
        <ArrowButton
          dir="left"
          onClick={onRight1}
          label="이전 영화"
          className="top-1/2 left-[calc(50%-354px)] opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 focus-visible:opacity-100"
        />

        <div className="relative mx-auto h-[420px] w-full">
          {[...random_movies]
            .sort((a, b) => a.id - b.id)
            .map((x) => {
              const pos = random_movies.findIndex((m) => m.id === x.id);
              const slot = banner_slots[pos];
              const stats = getMovieStats(x.id);

              // 양옆 배너를 누르면 그 포스터가 가운데로, 가운데 배너를 누르면 상세 페이지로
              const onBanner = () => {
                if (pos === 1)
                  onRight1(); // 왼쪽 흐릿한 영화
                else if (pos === 3)
                  onLeft1(); // 오른쪽 흐릿한 영화
                else if (pos === 2) onClickMovie(x); // 가운데 영화
              };

              return (
                <div
                  key={x.id}
                  onClick={onBanner}
                  className="absolute cursor-pointer overflow-hidden rounded-2xl"
                  style={{
                    left: `calc(50% + ${slot.x}px)`,
                    top: (420 - slot.h) / 2,
                    width: slot.w,
                    height: slot.h,
                    opacity: slot.z === 2 ? 1 : slot.o * 0.5,
                    zIndex: slot.z,
                    pointerEvents: slot.o ? "auto" : "none",
                    transition: "all 450ms ease",
                    boxShadow:
                      slot.z === 2 ? "0 20px 50px rgba(0,0,0,0.25)" : "none",
                  }}
                >
                  <img
                    src={x.wide_poster}
                    className="h-full w-full object-cover"
                  />

                  {/* 가운데 포스터일 때만 영화 정보가 서서히 나타남 */}
                  <div
                    className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/25 to-transparent px-8 pb-7 text-white"
                    style={{
                      opacity: slot.z === 2 ? 1 : 0,
                      transition:
                        slot.z === 2
                          ? "opacity 300ms ease 250ms"
                          : "opacity 150ms ease",
                    }}
                  >
                    <span className="text-xs font-bold tracking-widest text-rose-300">
                      오늘의 추천
                    </span>
                    <span className="mt-1 truncate text-[34px] font-black tracking-tight">
                      {x.title}
                    </span>
                    <span className="mt-1 line-clamp-1 text-sm text-neutral-200">
                      {x.content}
                    </span>
                    <span className="mt-2 text-sm text-neutral-200">
                      <span
                        className={`font-bold ${
                          stats.count > 0 ? "text-rose-300" : "text-neutral-400"
                        }`}
                      >
                        ★ {stats.count > 0 ? stats.avg.toFixed(1) : "0.0"}
                      </span>{" "}
                      · 리뷰 {stats.count}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        <ArrowButton
          dir="right"
          onClick={onLeft1}
          label="다음 영화"
          className="top-1/2 left-[calc(50%+286px)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 focus-visible:opacity-100"
        />
      </div>

      {/* 자동 넘김 진행 바 (넘어갈 때마다 처음부터 다시 참) */}
      <div className="mx-auto mt-4 h-1 w-[640px] max-w-[90%] overflow-hidden rounded-full bg-neutral-300/70 dark:bg-neutral-700/70">
        <div
          key={`${random_movies[2]?.id}-${banner_auto}`}
          className="h-full rounded-full bg-rose-500"
          style={{
            width: banner_auto ? undefined : "0%",
            animation: banner_auto
              ? `banner-progress ${BANNER_DELAY}ms linear forwards`
              : "none",
          }}
        ></div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1200px] items-baseline justify-between px-6">
        <h3 className="text-[22px] font-bold tracking-tight">
          현재 떠오르는 인기작들
        </h3>
      </div>

      <div className="relative mx-auto mt-5 w-[1280px]">
        <ArrowButton
          dir="left"
          size={52}
          onClick={() => slidePop(1, onLeft2)}
          label="이전 인기작"
          className="top-[170px] left-[-36px]"
        />

        <div className="mx-auto w-[1200px] overflow-hidden rounded-2xl border border-neutral-200 bg-white px-[10px] pb-6 pt-6 dark:border-neutral-800 dark:bg-[#222222]">
          <div
            className="flex gap-5"
            style={{
              transform: `translateX(${pop_fx.x}px)`,
              transition: pop_fx.anim ? "transform 400ms ease" : "none",
            }}
          >
            {top_movie_List.map((x) => {
              const stats = getMovieStats(x.id);
              return (
                <div key={x.id} className="group w-[220px] shrink-0">
                  <img
                    src={x.poster}
                    onClick={() => onClickMovie(x)}
                    className="aspect-[2/3] w-[220px] cursor-pointer rounded-lg object-cover ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                  <p className="mt-3 truncate text-[15px] font-bold">
                    {x.title}
                  </p>
                  <p className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
                    평균{" "}
                    <span
                      className={`font-bold ${
                        stats.count > 0
                          ? "text-rose-600"
                          : "text-neutral-400 dark:text-neutral-500"
                      }`}
                    >
                      ★ {stats.count > 0 ? stats.avg.toFixed(1) : "0.0"}
                    </span>{" "}
                    · 리뷰 {stats.count}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <ArrowButton
          dir="right"
          size={52}
          onClick={() => slidePop(-1, onRight2)}
          label="다음 인기작"
          className="top-[170px] right-[-36px]"
        />
      </div>

      <div className="mx-auto mt-14 max-w-[1200px] px-6">
        <h3 className="text-[22px] font-bold tracking-tight">
          따끈따끈한 신작 리뷰
        </h3>

        <div className="mt-5 grid grid-cols-3 gap-4">
          {alig_review.length === 0 && (
            <p className="col-span-3 rounded-xl border border-dashed border-neutral-300 py-14 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              아직 등록된 리뷰가 없습니다.
            </p>
          )}

          {alig_review.slice(0, 6).map((x) => {
            const icon_idx =
              [...String(x.userId)].reduce((a, c) => a + c.charCodeAt(0), 0) %
              (profile_icon.length || 1);

            const ran_profile = [profile_icon[icon_idx]];
            const target_movie = movies.find((m) => m.id === x.movieId);

            return (
              <div
                key={x.id}
                onClick={() =>
                  navigate("/reviewlist", { state: { reviewId: x.id } })
                }
                className="flex cursor-pointer flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-[#222222]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ran_profile[0]?.profile_icon}
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                  />
                  <p className="min-w-0 flex-1 truncate text-sm font-bold">
                    {x.userId}
                  </p>
                  <StarDisplay score={x.score} size={14} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  {target_movie && (
                    <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                      {target_movie.title}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <h4 className="truncate text-base font-bold">{x.title}</h4>
                  </div>

                  <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {x.content}
                  </p>

                  <div className="mt-auto flex gap-1 border-t border-neutral-100 pt-3 dark:border-neutral-700">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeReview(x.id);
                      }}
                      className={
                        Array.isArray(x.like) &&
                        currentUser &&
                        x.like.includes(currentUser.userId)
                          ? "flex cursor-pointer items-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1 text-sm font-bold text-rose-600 dark:bg-rose-500/15"
                          : "flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                      }
                    >
                      <Heart
                        size={16}
                        className={
                          Array.isArray(x.like) &&
                          currentUser &&
                          x.like.includes(currentUser.userId)
                            ? "fill-rose-600 text-rose-600"
                            : "fill-none"
                        }
                      />
                      {Array.isArray(x.like) ? x.like.length : x.like || 0}
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      <MessageCircle size={16} />
                      {comments.filter((c) => c.reviewId === x.id).length}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 회사 정보 (푸터) */}
      <footer className="mt-24 border-t border-neutral-200 bg-[#e5e7eb] text-neutral-600 dark:border-neutral-800 dark:bg-[#1c1c1e] dark:text-neutral-400">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-neutral-300 py-5 text-sm dark:border-neutral-800">
            <span className="cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-200">
              서비스 이용약관
            </span>
            <span className="cursor-pointer font-bold text-neutral-900 dark:text-neutral-200">
              개인정보처리방침
            </span>
            <span className="cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-200">
              고객센터
            </span>
          </div>

          <div className="flex flex-col gap-3 py-8 text-sm">
            <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              (주) 예진보유국
            </p>
            <p>
              <span className="mr-2 font-bold text-neutral-800 dark:text-neutral-200">
                주소
              </span>
              서울 종로구 인사동길 12 대일빌딩 7층
              <span className="mx-3 text-neutral-400 dark:text-neutral-700">
                |
              </span>
              <span className="mr-2 font-bold text-neutral-800 dark:text-neutral-200">
                대표자
              </span>
              최민호
            </p>
            <p>
              <span className="mr-2 font-bold text-neutral-800 dark:text-neutral-200">
                사업자등록번호
              </span>
              123-45-67890
              <span className="mx-3 text-neutral-400 dark:text-neutral-700">
                |
              </span>
              <span className="mr-2 font-bold text-neutral-800 dark:text-neutral-200">
                통신판매업신고
              </span>
              제2026-서울종로-1015호
            </p>
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
              copyright © 민호 무비. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
