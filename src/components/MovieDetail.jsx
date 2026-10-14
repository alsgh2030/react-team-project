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
        <div className="min-h-screen bg-[#f2f3f6] pb-20 text-neutral-900 transition-colors duration-200 dark:bg-[#181818] dark:text-neutral-100">

            {/* 영화 상세 정보 */}
            <section className="mb-12">

                {/* 가로 포스터 */}
                <div className="relative h-[340px] w-full overflow-hidden bg-neutral-800">
                {movie.wide_poster && (
                    <img
                        src={movie.wide_poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="mx-auto flex max-w-[1100px] flex-col gap-9 px-6 md:flex-row">

                    {/* 세로 포스터 */}
                    <div className="-mt-32 relative w-48 md:w-56 shrink-0">
                        {movie.poster && (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full rounded-xl border-4 border-[#f2f3f6] shadow-2xl dark:border-[#181818]"
                            />
                        )}
                    </div>

                    {/* 영화 정보 */}
                    <div className="flex-1 pt-6">
                        <h1 className="text-[32px] font-bold tracking-tight mb-2 leading-tight">
                            {movie.title}
                        </h1>

                        <p className="text-neutral-500 mb-1 dark:text-neutral-400">
                            {movie.overview}
                        </p>

                        <p className="text-sm text-neutral-500 mb-1 dark:text-neutral-400">
                            개봉일: {movie.releaseDate}
                        </p>

                        <p className="text-sm text-neutral-500 mb-6 dark:text-neutral-400">
                            원작: {movie.originalWork}
                        </p>

                        {/* 평점 */}
                        <div className="flex items-center gap-8 py-5 mb-8 border-y border-neutral-200 dark:border-neutral-800">

                            <div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">평균 별점</p>
                                <p className="text-[28px] font-bold text-rose-600">
                                    ★ {averageRating}
                                </p>
                            </div>

                            <div className="h-11 w-px bg-neutral-200 dark:bg-neutral-800"></div>

                            <div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">리뷰 수</p>
                                <p className="text-[28px] font-bold">
                                    {movieReviews.length}개
                                </p>
                            </div>

                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            줄거리
                        </h2>

                        <p className="text-neutral-700 leading-8 whitespace-pre-wrap dark:text-neutral-300">
                            {movie.synopsis}
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-[1100px] px-6">

            {/* 리뷰 등록 버튼 */}
            <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-6 mb-10 dark:border-neutral-800 dark:bg-[#222222]">

                    <div>
                        <h2 className="text-xl font-bold mb-1">
                            영화 리뷰
                        </h2>
                        <p className="text-neutral-500 text-sm dark:text-neutral-400">
                            치이카와 영화를 감상한 후기를 남겨보세요!
                        </p>
                    </div>

                    <button
                        onClick={goToReviewForm}
                        className="h-12 rounded-xl bg-rose-600 px-7 font-bold text-white transition-colors hover:bg-rose-700 cursor-pointer"
                    >
                        리뷰 등록
                    </button>

            </section>

            {/* 리뷰 목록 */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#222222]">

                <h2 className="text-xl font-bold mb-2">
                    관람객 리뷰 <span className="text-rose-600">({movieReviews.length})</span>
                </h2>

                {movieReviews.length === 0 ? (
                    <p className="text-neutral-500 text-center py-14 rounded-xl border border-dashed border-neutral-300 mt-4 dark:border-neutral-700 dark:text-neutral-400">
                        아직 작성된 리뷰가 없습니다.
                    </p>
                ) : (
                    <div>
                        {movieReviews.map(review => (
                            <div
                                key={review.id}
                                className="border-b border-neutral-100 py-5 dark:border-neutral-800"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <p className="font-bold">
                                            {review.title}
                                        </p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            작성자: {review.userId}
                                        </p>
                                    </div>

                                    <span className="text-rose-600 font-bold tracking-wider">
                                        {'★'.repeat(Number(review.score))}
                                    </span>
                                </div>

                                <p className="text-neutral-700 leading-relaxed dark:text-neutral-300">
                                    {review.content}
                                </p>

                                <p className="text-sm text-neutral-400 mt-3">
                                    좋아요 {review.like?.length || 0}개
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            </div>
        </div>
    )
}

export default MovieDetail