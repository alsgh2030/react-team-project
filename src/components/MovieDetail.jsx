import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../AuthContextPro'

// 21개 영화 상세 데이터
const movieDetails = {
    "걸캅스": {
        releaseDate: "2019.05.09",
        overview: "한국 • 코미디 • 107분",
        synopsis: "전직 전설의 형사 미영과 민원실로 밀려난 현직 꼴통 형사 지혜. 차도에 뛰어든 한 여성을 목격한 두 사람은 그녀가 디지털 성범죄 사건의 피해자란 사실을 알게 되고, 비공식 수사에 나서기로 결심한다."
    },
    "귀멸의 칼날 무한열차": {
        releaseDate: "2021.01.27",
        overview: "일본 • 애니메이션 • 116분",
        synopsis: "혈귀로 변한 여동생 네즈코를 인간으로 되돌릴 단서를 찾아 비밀조직 귀살대에 들어간 탄지로. 임무 수행을 위해 최강 검사 염주 렌고쿠와 무한 열차에 탑승한 그는 숨어있던 식인 혈귀와 마주한다."
    },
    "단지의 두사람": {
        releaseDate: "2024.09.01",
        overview: "일본 • 드라마 • 회당 48분",
        synopsis: "대학교 시간강사인 노에와 일러스트레이터 나츠코는 같은 아파트 단지 주민이자 소꿉친구다. 함께 저녁을 먹으며 평온한 나날을 보내던 두 사람은 어느 날, 오랜 이웃인 사쿠마에게 뜻밖의 부탁을 받는다."
    },
    "도둑들": {
        releaseDate: "2012.07.25",
        overview: "한국 • 범죄 • 136분",
        synopsis: "마카오 박은 한국의 도둑 4인방과 마카오의 카지노를 털 계획을 세운다. 중국의 4인조 도둑 팀과 합류한 그들은 카지노에 숨겨진 희대의 다이아몬드를 훔치기 위해 움직인다."
    },
    "론 서바이버": {
        releaseDate: "2014.04.02",
        overview: "미국 • 액션 • 121분",
        synopsis: "아프가니스탄에서 복무 중인 네이비씰 대원들이 탈레반 리더 샤를 체포하기 위한 레드윙 작전에 투입된다. 임무 수행을 위해 잠복하던 중, 마을 주민들에게 발각되자 윤리와 의무 사이 선택의 기로에 놓인다."
    },
    "말할 수 없는 비밀": {
        releaseDate: "2008.01.10",
        overview: "대만 • 로맨스 • 101분",
        synopsis: "예술학교로 전학 온 상륜은 옛 음악실에서 샤오위라는 소녀를 만난다. 가까워질수록 애틋한 마음이 싹트지만 샤오위에 대해 더 알고 싶어 할 때마다 그녀는 어느 샌가 사라져버린다."
    },
    "먼작귀": {
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

과연 그 섬에는 어떤 비밀이 숨겨져 있을까...?!`
    },
    "바람과 함께 사라지다": {
        releaseDate: "1957.03.25",
        overview: "미국 • 드라마 • 220분",
        synopsis: "남북전쟁 발발 직전, 스칼렛은 짝사랑하던 애슐리가 친구 멜라니와 결혼한다는 이야기를 듣고 뒤늦게 고백하지만 거절당한다. 이 모습을 새로 이사 온 레트에게 들키고 레트는 거침없는 매력의 스칼렛에게 빠져든다."
    },
    "불한당: 나쁜 놈들의 세상": {
        releaseDate: "2017.05.17",
        overview: "한국 • 범죄 • 120분",
        synopsis: "마약 밀매조직의 일인자를 노리는 재호와 세상 무서운 것 없이 패기 넘치는 현수. 교도소에서 만나 첫눈에 서로에게 끌린 두 사람은 출소 후 권력을 차지하기 위해 의기투합한다."
    },
    "설국열차": {
        releaseDate: "2013.08.01",
        overview: "한국 • 액션 • 125분",
        synopsis: "얼어붙은 지구, 살아남은 자들을 실은 기차의 꼬리 칸에서 젊은 지도자 커티스는 불평등한 구조에 맞서 앞쪽 칸으로 가기 위해 긴 세월 준비해 온 폭동을 일으킨다."
    },
    "신과 함께: 죄와 벌": {
        releaseDate: "2017.12.20",
        overview: "한국 • 판타지 • 139분",
        synopsis: "화재 현장에서 아이를 구하고 죽은 소방관 자홍. 그는 저승차사 혜원맥과 덕춘, 강림과 함께 저승에서 7번 재판을 받고, 그 과정 중 예상치 못한 일들이 벌어진다."
    },
    "썸머워즈": {
        releaseDate: "2009.08.13",
        overview: "일본 • 애니메이션 • 114분",
        synopsis: "사이버 가상 세계 OZ의 서버를 관리하고 있는 수학 천재 겐지는 나츠키의 부탁으로 시골 여행에 동참한다. 그러던 어느 날, 겐지에게 수수께끼의 숫자가 담긴 문자 한 통이 도착한다."
    },
    "아메리칸 셰프": {
        releaseDate: "2015.01.07",
        overview: "미국 • 모험 • 114분",
        synopsis: "일류 레스토랑의 셰프 칼은 유명 음식 평론가의 혹평을 받자, 홧김에 트위터로 욕설을 보낸다. 이들의 말다툼은 화제가 되고, 칼은 레스토랑을 그만두기에 이른다."
    },
    "언터처블: 1%의 우정": {
        releaseDate: "2012.03.22",
        overview: "프랑스 • 전기 • 111분",
        synopsis: "불의의 사고로 전신이 마비되어 도와주는 손길이 없으면 아무것도 할 수 없는 백만장자 필립. 어느 날, 가진 것이라곤 건강한 신체밖에 없는 무일푼 백수 드리스를 만난 필립은 그에게 특별한 내기를 제안한다."
    },
    "연가시": {
        releaseDate: "2012.07.05",
        overview: "한국 • 드라마 • 109분",
        synopsis: "전국의 하천에서 변종 연가시가 원인으로 밝혀진 변사체들이 발견된다. 정부가 비상 대책본부를 가동해 감염자를 격리 수용하자, 재혁은 가족들을 위해 치료제를 찾아나선다."
    },
    "엽기적인 그녀": {
        releaseDate: "2001.07.27",
        overview: "한국 • 드라마 • 137분",
        synopsis: "어느 밤, 전철에서 술에 취한 그녀를 지켜보던 견우. 그런데 그녀가 옆에 있던 아저씨의 머리에 구토를 해 전철은 아수라장이 되고, 급기야 그녀는 견우를 전 남자친구로 착각한다."
    },
    "원피스: 로맨스 던": {
        releaseDate: "2017",
        overview: "한국 • 애니메이션 • 21분",
        synopsis: "원피스 TV 애니메이션화 20주년 기념 특별판. 이야기의 원점으로 돌아가 해적을 꿈꾸는 또 한 명의 루피를 만나고, 어쩌면 원피스가 될 수 있었던, 원피스 이전의 원피스 이야기가 시작된다."
    },
    "타인의 삶": {
        releaseDate: "2006.03.23",
        overview: "한국 • 드라마 • 137분",
        synopsis: "베를린 장벽이 무너지기 5년 전, 국가에 대한 맹목적인 신념을 지닌 비밀경찰 비즐러는 동독 최고의 극작가 드라이만과 인기배우 크리스타를 감시하는 중대 임무를 맡는다."
    },
    "타짜": {
        releaseDate: "2006.09.28",
        overview: "한국 • 드라마 • 140분",
        synopsis: "타짜들이 짜고 친 판에서 삼년 동안 모아두었던 돈 전부를 날린 고니는 우연인 듯 필연처럼 전설의 타짜 평경장을 만나 본격적인 꽃싸움에 몸을 던지는 동행길에 오른다."
    },
    "퍼니게임": {
        releaseDate: "1997.11.15",
        overview: "오스트리아 • 범죄 • 108분",
        synopsis: "서늘한 오스트리아의 여름, 게오르그 가족은 함께 휴가를 즐길 이웃을 만나러 호숫가 별장으로 향한다. 그러나 이웃의 태도는 어딘가 냉랭한 기운이 감돌고, 짐을 풀던 그들에게 낯선 청년 피터가 찾아온다."
    },
    "해운대": {
        releaseDate: "2009.07.22",
        overview: "한국 • 액션 • 120분",
        synopsis: "아무도 예상하지 않은 쓰나미가 해운대에 몰아치고, 엉망진창 대응과 재난에 무감한 부산 시민들을 구하기 위해 사랑하는 사람들이 쓰나미와 사투한다."
    }
}

const getMovieDetail = (title = "") => {
    const name = title.trim().replace(/\s+/g, " ")

    if (movieDetails[name]) return movieDetails[name]

    if (name.includes("먼작귀")) {
        return movieDetails["먼작귀"]
    }

    if (name.includes("귀멸의 칼날") && name.includes("무한열차")) {
        return movieDetails["귀멸의 칼날 무한열차"]
    }

    if (name.includes("신과함께") && name.includes("죄와 벌")) {
        return movieDetails["신과 함께: 죄와 벌"]
    }

    return {}
}

const MovieDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { currentUser, getMovieStats } = useAuth()

    // 기존 영화 데이터 및 리뷰 데이터 불러오기
    const movies = JSON.parse(localStorage.getItem('movies') || '[]')
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')

    // URL의 id와 일치하는 영화 찾기
    const currentMovie = movies.find(movie => String(movie.id) === id)

    if (!currentMovie) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f3f6] text-neutral-900 dark:bg-[#181818] dark:text-white">
                <h2 className="text-2xl font-bold mb-4">
                    영화를 찾을 수 없습니다.
                </h2>
                <button
                    onClick={() => navigate('/')}
                    className="rounded-lg bg-rose-600 px-6 py-3 text-white"
                >
                    메인으로 돌아가기
                </button>
            </div>
        )
    }

    // 영화 기본 정보 + 상세 매핑 정보 합치기
    const movie = {
        ...currentMovie,
        ...getMovieDetail(currentMovie.title)
    }

    // 해당 영화 리뷰만 필터링
    const movieReviews = reviews.filter(
        review => String(review.movieId) === String(movie.id)
    )

    // 평균 별점 계산 (getMovieStats 또는 직접 계산)
    const stats = getMovieStats ? getMovieStats(movie.id) : null
    const averageRating = stats?.avg ? Number(stats.avg).toFixed(1) : (
        movieReviews.length
            ? (
                movieReviews.reduce(
                    (sum, review) => sum + Number(review.score), 0
                ) / movieReviews.length
            ).toFixed(1)
            : '0.0'
    )

    const reviewCount = stats?.count ? stats.count : movieReviews.length

    // 리뷰 등록 페이지로 이동 (state 또는 쿼리스트링 모두 대응)
    const goToReviewForm = () => {
        if (!currentUser) {
            alert('로그인 후 리뷰를 작성할 수 있습니다.')
            navigate('/login')
            return
        }

        navigate('/review/create', {
            state: { movieId: movie.id }
        })
    }

    return (
        <div className="min-h-screen bg-[#f2f3f6] pb-20 text-neutral-900 transition-colors duration-200 dark:bg-[#181818] dark:text-neutral-100">

            {/* 영화 상세 정보 */}
            <section className="mb-12">

                {/* 가로 포스터 (wide_poster가 없으면 일반 포스터나 배경 대체용으로 안전 처리) */}
                <div className="relative h-[340px] w-full overflow-hidden bg-neutral-800">
                    {movie.wide_poster && (
                        <img
                            src={movie.wide_poster}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-6 left-6 z-10">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm"
                        >
                            <ArrowLeft size={16} />
                            뒤로가기
                        </button>
                    </div>
                </div>

                <div className="mx-auto flex max-w-[1100px] flex-col gap-9 px-6 md:flex-row">

                    {/* 세로 포스터 */}
                    <div className="-mt-32 relative w-48 md:w-56 shrink-0">
                        {movie.poster && (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-[340px] object-cover rounded-xl border-4 border-[#f2f3f6] shadow-2xl dark:border-[#181818]"
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
                            개봉일: {movie.releaseDate || "개봉일 정보 없음"}
                        </p>

                        {movie.originalWork && (
                            <p className="text-sm text-neutral-500 mb-6 dark:text-neutral-400">
                                원작: {movie.originalWork}
                            </p>
                        )}

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
                                    {reviewCount}개
                                </p>
                            </div>

                        </div>

                        <h2 className="text-xl font-bold mb-3">
                            줄거리
                        </h2>

                        <p className="text-neutral-700 leading-8 whitespace-pre-wrap dark:text-neutral-300">
                            {movie.synopsis || movie.content || "줄거리 정보가 없습니다."}
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
                            영화를 감상한 후기를 남겨보세요!
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
                                            작성자: {review.userId || review.author}
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