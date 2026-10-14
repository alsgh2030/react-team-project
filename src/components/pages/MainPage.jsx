import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import StarDisplay from "../StarDisplay";
import { useAuth } from "../../AuthContextPro";
const MainPage = () => {
  const movies = JSON.parse(localStorage.getItem("movies"));
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || [],
  );
  const { currentUser } = useAuth();

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
    const left_1 = top_movie_List.slice(0, 5);
    const left_2 = top_movie_List.slice(5, 10);
    setTop_moive_List([...left_2, ...left_1]);
  };

  const onRight2 = () => {
    const right_1 = top_movie_List.slice(0, -5);
    const right_2 = top_movie_List.slice(-5);
    setTop_moive_List([...right_2, ...right_1]);
  };

  const navigate = useNavigate();

  const banner_slots = [
    { x: -1312, w: 480, h: 270, o: 0, z: 0 },
    { x: -816, w: 480, h: 270, o: 1, z: 1 },
    { x: -320, w: 640, h: 360, o: 1, z: 2 },
    { x: 336, w: 480, h: 270, o: 1, z: 1 },
    { x: 832, w: 480, h: 270, o: 0, z: 0 },
  ];

  const [pop_fx, setPopFx] = useState({ x: 0, anim: false });
  const busy2 = useRef(false);
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

  const alig_review = [...reviews].sort((x, y) => x.id - y.id);
  const profile_icon = JSON.parse(localStorage.getItem("profile_icon")) || [];
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  return (
    <div className="bg-white pb-16">
      <div className="relative mt-4 overflow-hidden">
        <button
          onClick={onLeft1}
          className="absolute left-[12%] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-7xl text-white [-webkit-text-stroke:3px_black]"
        >
          ◀
        </button>
        <div className="relative mx-auto h-[420px] w-full">
          {[...random_movies]
            .sort((a, b) => a.id - b.id)
            .map((x) => {
              const slot =
                banner_slots[random_movies.findIndex((m) => m.id === x.id)];
              return (
                <img
                  key={x.id}
                  src={x.wide_poster}
                  onClick={() => navigate(`/movie/${x.id}`)}
                  className="absolute border-2 border-black object-cover"
                  style={{
                    left: `calc(50% + ${slot.x}px)`,
                    top: (420 - slot.h) / 2,
                    width: slot.w,
                    height: slot.h,
                    opacity: slot.o,
                    zIndex: slot.z,
                    pointerEvents: slot.o ? "auto" : "none",
                    transition: "all 450ms ease",
                    clipPath:
                      "polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%)",
                  }}
                />
              );
            })}
        </div>
        <button
          onClick={onRight1}
          className="absolute right-[12%] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-7xl text-white [-webkit-text-stroke:3px_black]"
        >
          ▶
        </button>
      </div>

      <hr className="mx-6 my-6 border-gray-400"></hr>
      <h3
        className="inline-block border-2 border-black bg-white py-2 pl-6 pr-10 text-xl font-bold"
        style={{ clipPath: "polygon(0 0, 94% 0, 100% 30%, 100% 100%, 0 100%)" }}
      >
        현재 떠오르는 인기작들
      </h3>
      <div className="relative mx-auto mt-6 w-[1280px]">
        <button
          onClick={() => slidePop(-1, onLeft2)}
          className="absolute left-0 top-1/2 w-10 -translate-y-1/2 cursor-pointer text-center text-4xl text-black"
        >
          ◀
        </button>
        <div className="mx-auto w-[1200px] overflow-hidden px-[10px] pb-3 pt-3">
          <div
            className="flex gap-5"
            style={{
              transform: `translateX(${pop_fx.x}px)`,
              transition: pop_fx.anim ? "transform 400ms ease" : "none",
            }}
          >
            {top_movie_List.map((x) => {
              return (
                <img
                  key={x.id}
                  src={x.poster}
                  onClick={() => navigate(`/movie/${x.id}`)}
                  className="aspect-[2/3] w-[220px] shrink-0 cursor-pointer rounded-[36px] transition-transform duration-200 hover:scale-105 border-2 border-slate-800 object-cover shadow-[4px_6px_8px_rgba(0,0,0,0.4)]"
                />
              );
            })}
          </div>
        </div>
        <button
          onClick={() => slidePop(1, onRight2)}
          className="absolute right-0 top-1/2 w-10 -translate-y-1/2 cursor-pointer text-center text-4xl text-black"
        >
          ▶
        </button>
      </div>

      <h3
        className="mt-10 inline-block border-2 border-black bg-white py-2 pl-6 pr-10 text-xl font-bold"
        style={{ clipPath: "polygon(0 0, 94% 0, 100% 30%, 100% 100%, 0 100%)" }}
      >
        따끈따끈한 신작 리뷰 ★
      </h3>
      <div className="mt-4 grid grid-cols-3 gap-x-10 gap-y-4 bg-gray-300 px-14 py-8">
        {alig_review.length === 0 && (
          <p className="col-span-3 py-10 text-center text-lg text-gray-600">
            아직 등록된 리뷰가 없습니다.
          </p>
        )}
        {alig_review.slice(0, 6).map((x) => {
          const icon_idx =
            [...String(x.userId)].reduce((a, c) => a + c.charCodeAt(0), 0) %
            (profile_icon.length || 1);
          const ran_profile = [profile_icon[icon_idx]];
          return (
            <div
              key={x.id}
              onClick={() =>
                navigate("/reviewlist", { state: { reviewId: x.id } })
              }
              className="flex cursor-pointer items-center gap-4 rounded-3xl bg-gray-100 p-4 transition-transform duration-200 hover:scale-105"
            >
              <div className="flex w-24 shrink-0 flex-col items-center gap-1">
                <img
                  src={ran_profile[0]?.profile_icon}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <p className="max-w-full truncate text-xs">{x.userId}</p>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="truncate text-lg font-semibold">{x.title}</h4>
                  <StarDisplay score={x.score} />
                </div>
                <p className="line-clamp-3 text-xs">{x.content}</p>
                <div className="flex justify-end gap-2">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeReview(x.id);
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-pink-200 px-3 py-1 text-lg"
                  >
                    <Heart
                      size={26}
                      className={
                        Array.isArray(x.like) &&
                        currentUser &&
                        x.like.includes(currentUser.userId)
                          ? "fill-rose-600 text-rose-600"
                          : "fill-none text-rose-600"
                      }
                    />
                    {Array.isArray(x.like) ? x.like.length : x.like || 0}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-sky-300 px-3 py-1 text-lg">
                    <MessageCircle
                      size={26}
                      className="fill-blue-600 text-blue-600"
                    />
                    {comments.filter((c) => c.reviewId === x.id).length}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
