import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContextPro";

const INITIAL_MOVIE_DATA = {
    id: 1,
    title: "극장판 먼작귀: 특별한 섬으로의 초대",
    releaseDate: "2026.09.30",
    overview: "일본 • 애니메이션 • 99분",
    originalWork: "만화 '먼작귀'",
    synopsis: `어느 날, 광장에서 쉬고 있던 치이카와와 가르마 앞에 얼굴에 전단지를 붙인 토끼가 나타난다.

그곳엔 “특별한 섬으로의 초대”라는 글귀가 적혀 있는데...

“섬에서 간단한 토벌만 해도 보수 100배!”
“한정 섬라멘과 한정 디저트까지, 달콤한 것도 매콤한 것도 사실상 무료”

솔깃한 문구에 이끌린 치이카와와 친구들은 섬에서 열리는 행사에 참가하기로 한다.

초대장의 내용이 어딘가 수상하다고 느끼는 해달과, 부푼 마음으로 배에 오르는 치이카와와 친구들.

모두가 기대를 안은 채 특별한 섬에 도착하는데!

과연 그 섬에는 어떤 비밀이 숨겨져 있을까...?!`,
    posterUrl: "/chiikawa-poster.jpg",
    reviews: [
        {
            id: 1,
            author: "치이카와팬",
            rating: 5,
            content: "너무 귀엽고 감동적이에요! 보수 100배 가자!",
            date: "2026-10-01"
        },
        {
            id: 2,
            author: "라멘마니아",
            rating: 5,
            content: "섬라멘 먹는 장면에서 침 고였습니다. 강추합니다.",
            date: "2026-10-05"
        }
    ]
};

const STORAGE_KEY = "specialIslandReviews";

export default function MovieDetail() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const movie = INITIAL_MOVIE_DATA;

    const [reviews, setReviews] = useState(() =>
        loadReviews()
    );
    const [newReview, setNewReview] = useState({
        rating: 5,
        content: ""
    });

    function loadReviews() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : movie.reviews;
        } catch {
            return movie.reviews;
        }
    }

    const totalReviews = reviews.length;

    const averageRating = totalReviews
        ? (
            reviews.reduce((sum, r) => sum + Number(r.rating), 0) /
            totalReviews
        ).toFixed(1)
        : "0.0";

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            alert("로그인 후 리뷰를 작성할 수 있습니다.");
            navigate("/auth");
            return;
        }

        if (!newReview.content.trim()) {
            return alert("리뷰 내용을 입력해주세요.");
        }

        const review = {
            id: crypto.randomUUID(),
            author: user.id,
            rating: Number(newReview.rating),
            content: newReview.content.trim(),
            date: new Date().toLocaleDateString("en-CA")
        };

        const updated = [...reviews, review];
        setReviews(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setNewReview({ rating: 5, content: "" });

        alert("리뷰가 등록되었습니다.");
    };

    return (
        <main className="movie-page">
            <section className="movie-card">
                <img
                    className="movie-poster"
                    src={movie.posterUrl}
                    alt={`${movie.title} 포스터`}
                />

                <div className="movie-content">
                    <div>
                        <p className="eyebrow">MOVIE DETAIL</p>
                        <h1>{movie.title}</h1>
                        <p className="movie-meta">
                            {movie.overview} | {movie.releaseDate} 개봉
                        </p>

                        <div className="movie-facts">
                            <p>
                                <strong>원작</strong> {movie.originalWork}
                            </p>
                        </div>

                        <h3>줄거리</h3>
                        <p className="synopsis">{movie.synopsis}</p>
                    </div>

                    <div className="rating-box">
                        <div>
                            <small>평균 별점</small>
                            <strong>★ {averageRating}</strong>
                        </div>

                        <div className="rating-divider" />

                        <div>
                            <small>총 리뷰 수</small>
                            <strong>{totalReviews}개</strong>
                        </div>
                    </div>
                </div>
            </section>

            <section className="review-card">
                <h2>한줄평 쓰기</h2>

                <form onSubmit={handleReviewSubmit}>
                    <div className="review-controls">
                        <input
                            value={user ? user.id : "로그인이 필요합니다"}
                            readOnly
                        />

                        <select
                            value={newReview.rating}
                            onChange={(e) =>
                                setNewReview({
                                    ...newReview,
                                    rating: Number(e.target.value)
                                })
                            }
                        >
                            <option value={5}>★★★★★ (5점)</option>
                            <option value={4}>★★★★☆ (4점)</option>
                            <option value={3}>★★★☆☆ (3점)</option>
                            <option value={2}>★★☆☆☆ (2점)</option>
                            <option value={1}>★☆☆☆☆ (1점)</option>
                        </select>

                        <button type="submit" className="black-btn">
                            리뷰 등록
                        </button>
                    </div>

                    <textarea
                        rows={4}
                        placeholder="먼작귀 영화에 대한 평을 남겨주세요."
                        value={newReview.content}
                        onChange={(e) =>
                            setNewReview({
                                ...newReview,
                                content: e.target.value
                            })
                        }
                    />
                </form>
            </section>

            <section className="review-card">
                <h2>관람객 리뷰 ({totalReviews})</h2>

                {reviews.length === 0 ? (
                    <p>첫 번째 리뷰를 남겨보세요!</p>
                ) : (
                    reviews.map((review) => (
                        <div className="review-item" key={review.id}>
                            <div className="review-top">
                                <div>
                                    <strong>{review.author}</strong>
                                    <span className="stars">
                                        {"★".repeat(Math.floor(review.rating))}
                                        {review.rating % 1 ? "½" : ""}
                                    </span>
                                </div>
                                <small>{review.date}</small>
                            </div>
                            <p>{review.content}</p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}