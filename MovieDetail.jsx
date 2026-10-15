JSX

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContextPro'

const MovieDetail = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    // 기존 영화 데이터에서 치이카와 포스터 가져오기
    const [chiikawa] = useState(() => {
        const movies = JSON.parse(localStorage.getItem('movies') || '[]')
        return movies.find(movie => movie.id === 7)
    })

    // 기존 리뷰 데이터 불러오기
    const [reviews] = useState(() =>
        JSON.parse(localStorage.getItem('reviews') || '[]')
    )

    // 치이카와 영화 정보
    const movie = {
        id: 7,
        title: '극장판 먼작귀: 특별한 섬으로의 초대',
        releaseDate: '2026.09.30',
        overview: '일본 • 애니메이션 • 99분',
        originalWork: "만화 '먼작귀'",
        poster: chiikawa?.poster,
        wide_poster: chiikawa?.wide_poster,
        synopsis: `어느 날, 광장에서 쉬고 있던 치이카와와 가르마 앞에 얼굴에 전단지를 붙인 토끼가 나타난다.

그곳엔 “특별한 섬으로의 초대”라는 글귀가 적혀 있는데...

“섬에서 간단한 토벌만 해도 보수 100배!”
“한정 섬라멘과 한정 디저트까지, 달콤한 것도 매콤한 것도 사실상 무료”

솔깃한 문구에 이끌린 치이카와와 친구들은 섬에서 열리는 행사에 참가하기로 한다.

초대장의 내용이 어딘가 수상하다고 느끼는 해달과, 부푼 마음으로 배에 오르는 치이카와와 친구들.

모두가 기대를 안은 채 특별한 섬에 도착하는데!

과연 그 섬에는 어떤 비밀이 숨겨져 있을까...?!`
    }

    // 치이카와 영화 리뷰만 가져오기
    const movieReviews = reviews.filter(
        review => review.movieId === movie.id
    )

    // 평균 별점 계산
    const averageRating = movieReviews.length
        ? (
            movieReviews.reduce(
                (sum, review) => sum + Number(review.score), 0
            ) / movieReviews.length
        ).toFixed(1)
        : '0.0'

    // 리뷰 등록 페이지로 이동
    const goToReviewForm = () => {
        if (!currentUser) {
            alert('로그인 후 리뷰를 작성할 수 있습니다.')
            navigate('/login')
            return
        }

        navigate('/review/create?movieId=7')
    }

    return (
        <div className="max-w-5xl mx-auto p-6 text-black">

            {/* 영화 상세 정보 */}
            <section className="bg-white border-2 border-black rounded-[22px] shadow-[5px_5px_0_#111] overflow-hidden mb-8">

                {/* 가로 포스터 */}
                {movie.wide_poster && (
                    <img
                        src={movie.wide_poster}
                        alt={movie.title}
                        className="w-full h-64 object-cover"
                    />
                )}

                <div className="flex flex-col md:flex-row gap-7 p-6">

                    {/* 세로 포스터 */}
                    <div className="w-full md:w-56 shrink-0">
                        {movie.poster && (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full rounded-xl border-2 border-black"
                            />
                        )}
                    </div>

                    {/* 영화 정보 */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-black mb-3">
                            {movie.title}
                        </h1>

                        <p className="text-gray-500 mb-2">
                            {movie.overview}
                        </p>

                        <p className="text-sm mb-2">
                            개봉일: {movie.releaseDate}
                        </p>

                        <p className="text-sm mb-5">
                            원작: {movie.originalWork}
                        </p>

                        <h2 className="text-xl font-bold mb-3">
                            줄거리
                        </h2>

                        <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                            {movie.synopsis}
                        </p>

                        {/* 평점 */}
                        <div className="flex gap-10 mt-7 p-5 bg-[#FFF1A8] rounded-xl border-2 border-black">

                            <div>
                                <p className="font-bold">평균 별점</p>
                                <p className="text-2xl font-black">
                                    ★ {averageRating}
                                </p>
                            </div>

                            <div>
                                <p className="font-bold">리뷰 수</p>
                                <p className="text-2xl font-black">
                                    {movieReviews.length}개
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* 리뷰 등록 버튼 */}
            <section className="bg-white border-2 border-black rounded-[22px] shadow-[5px_5px_0_#111] p-6 mb-8">

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">

                    <div>
                        <h2 className="text-2xl font-black mb-2">
                            영화 리뷰
                        </h2>
                        <p className="text-gray-500 text-sm">
                            치이카와 영화를 감상한 후기를 남겨보세요!
                        </p>
                    </div>

                    <button
                        onClick={goToReviewForm}
                        className="bg-[#FFD93B] border-2 border-black rounded-xl px-6 py-3 font-black hover:bg-yellow-300 shadow-[3px_3px_0_#111] cursor-pointer"
                    >
                        리뷰 등록
                    </button>

                </div>
            </section>

            {/* 리뷰 목록 */}
            <section className="bg-white border-2 border-black rounded-[22px] shadow-[5px_5px_0_#111] p-6">

                <h2 className="text-2xl font-black mb-5">
                    관람객 리뷰 ({movieReviews.length})
                </h2>

                {movieReviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        아직 작성된 리뷰가 없습니다.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {movieReviews.map(review => (
                            <div
                                key={review.id}
                                className="border-b border-gray-200 py-4"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <p className="font-bold">
                                            {review.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            작성자: {review.userId}
                                        </p>
                                    </div>

                                    <span className="text-yellow-500 font-bold">
                                        {'★'.repeat(Number(review.score))}
                                    </span>
                                </div>

                                <p className="text-gray-700">
                                    {review.content}
                                </p>

                                <p className="text-sm text-gray-400 mt-3">
                                    좋아요 {review.like?.length || 0}개
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </div>
    )
}

export default MovieDetail
