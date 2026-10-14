import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditreviewPage = () => {
  const { id } = useParams(); // 문자열로 반환
  const [review, setReview] = useState({ title: "", rating: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // 로컬 스토리지에 저장된 글 목록에서 id 같은 값 찾기
    const currentReview = reviews.find((p) => p.id === parseInt(id));

    // 찾으면 setReview로 state에 넣어서 입력창에 제목과 내용 나타나도록
    if (currentReview) {
      setReview(currentReview);
    }
  }, [id]);

  const onSubmit1 = (e) => {
    e.preventDefault();
    // getItem으로 값 가져와서 writeId 비교 후 로컬에 수정된 값 저장
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // 수정할 수 있는 글인지 확인 -> 수정한 내용으로 교체 : p
    const newReviews = reviews.map((p) =>
      p.id === parseInt(id) ? { ...review, writeId: p.writeId } : p,
    );

    localStorage.setItem("reviews", JSON.stringify(newReviews));

    navigate("/reviewList");
  };
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f2f3f6] px-6 py-12 dark:bg-[#181818]">
    <div className="max-w-[640px] mx-auto bg-white p-8 rounded-2xl border border-neutral-200 text-neutral-900 dark:bg-[#222222] dark:text-white dark:border-neutral-800">
      <h1 className="text-2xl font-bold tracking-tight mb-6 pb-5 border-b border-neutral-100 dark:border-neutral-800">게시글 수정</h1>

      <form onSubmit={onSubmit1} className="flex flex-col gap-5">
        <input
          className="h-12 w-full px-4 border border-neutral-300 rounded-xl outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-neutral-700"
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
        />
        <Rating rating={rating} setRating={setRating} />
        <textarea
          className="h-44 w-full p-4 border border-neutral-300 rounded-xl resize-y outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-neutral-700"
          value={review.content}
          onChange={(e) => setReview({ ...review, content: e.target.value })}
        />

        <button className="h-12 self-end px-8 rounded-xl bg-rose-600 text-white font-bold cursor-pointer transition-colors hover:bg-rose-700">
          수정
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditreviewPage;