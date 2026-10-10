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
    <div className="max-w-wl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">게시글 수정</h1>

      <form onSubmit={onSubmit1}>
        <input
          className="border w-full p-2 mb-3 rounded"
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
        />
        <Rating rating={rating} setRating={setRating} />
        <textarea
          className="border w-full p-2 mb-3 rounded h-40"
          value={review.content}
          onChange={(e) => setReview({ ...review, content: e.target.value })}
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          수정
        </button>
      </form>
    </div>
  );
};

export default EditreviewPage;
