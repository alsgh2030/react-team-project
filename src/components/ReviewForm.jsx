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
    <div className="max-w-wl mx-auto mt-10 bg-white p-6 rounded shadow border-2 border-black dark:bg-[#252525] dark:text-white dark:border-white transition-colors duration-200">
      <h1 className="text-xl font-bold mb-4 font-sans">리뷰 작성</h1>
      <form onSubmit={onSubmitReview}>
        <input
          placeholder="제목"
          className="border-2 border-black rounded-[22px] w-full p-2 mb-3 shadow-[5px_5px_0_#111] font-sans bg-white text-black placeholder:text-gray-500 dark:bg-[#333333] dark:text-white dark:border-white dark:placeholder:text-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Rating rating={score} setRating={setScore} />
        <textarea
          placeholder="내용"
          className="border-2 border-black rounded-[22px] w-full p-2 mb-3 h-40 shadow-[5px_5px_0_#111] font-sans bg-white text-black placeholder:text-gray-500 dark:bg-[#333333] dark:text-white dark:border-white dark:placeholder:text-gray-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-white border-2 border-black rounded-[22px] text-black px-4 py-2 shadow-[5px_5px_0_#111] font-sans cursor-pointer hover:bg-gray-100 dark:bg-[#444] dark:text-white dark:border-white dark:hover:bg-[#555]">
          작성
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;