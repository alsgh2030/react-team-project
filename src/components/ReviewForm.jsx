import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContextPro";
import Rating from "./Rating";

const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { currentMovie } = useAuth();

  const onSubmitReview = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || score === 0) {
      alert("내용을 모두 입력하시오.");
      return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const newReview = {
      id: Date.now(),
      title,
      content,
      score,
      userId: currentUser.userId,
      movieId: 1 // currentMovie.movieId,
    };

    reviews.push(newReview);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    setTitle("");
    setContent("");

    navigate("/reviewList");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f2f3f6] px-6 py-12 dark:bg-[#181818]">
    <div className="max-w-[640px] mx-auto bg-white p-8 rounded-2xl border border-neutral-200 text-neutral-900 dark:bg-[#222222] dark:text-white dark:border-neutral-800 transition-colors duration-200">
      <h1 className="text-2xl font-bold tracking-tight mb-6 pb-5 border-b border-neutral-100 dark:border-neutral-800">리뷰 작성</h1>
      <form onSubmit={onSubmitReview} className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">이 영화 어떠셨나요?</span>
          <Rating rating={score} setRating={setScore} />
        </div>
        <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">제목</label>
        <input
          placeholder="제목"
          className="h-12 w-full px-4 border border-neutral-300 rounded-xl bg-white text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:bg-[#2a2a2a] dark:text-white dark:border-neutral-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">내용</label>
        <textarea
          placeholder="내용"
          className="h-44 w-full p-4 border border-neutral-300 rounded-xl bg-white text-neutral-900 placeholder:text-neutral-400 resize-y outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:bg-[#2a2a2a] dark:text-white dark:border-neutral-700"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        </div>
        <button className="h-12 self-end px-8 rounded-xl bg-rose-600 text-white font-bold cursor-pointer transition-colors hover:bg-rose-700">
          작성
        </button>
      </form>
    </div>
    </div>
  );
};

export default ReviewForm;