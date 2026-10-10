import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContextPro";
import Rating from "./Rating";

const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const { currentMovie } = useAuth();

  const onSubmitReview = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || rating === 0) {
      alert("내용을 모두 입력하시오.");
      return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const newReview = {
      id: Date.now(),
      title,
      content,
      rating,
      writeId: currentUser.userId,
      movieId: currentMovie.movieId,
    };

    reviews.push(newReview);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    setTitle("");
    setContent("");

    navigate("/MovieDetail");
  };

  return (
    <div className="max-w-wl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4 font-sans">리뷰 작성</h1>
      <form onSubmit={onSubmitReview}>
        <input
          placeholder="제목"
          className="border-2 border-black rounded-[22px] w-full p-2 mb-3 shadow-[5px_5px_0_#111] font-sans"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Rating rating={rating} setRating={setRating} />
        <textarea
          placeholder="내용"
          className="border-2 border-black rounded-[22px] w-full p-2 mb-3  h-40 shadow-[5px_5px_0_#111] font-sans"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-white border-2 border-black rounded-[22px] text-black px-4 py-2 shadow-[5px_5px_0_#111] font-sans">
          작성
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
