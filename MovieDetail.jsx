import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../AuthContextPro";
import StarDisplay from "./StarDisplay";

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
        synopsis: "어느 날, 치이카와와 하치와레가 광장에서 쉬고 있는데, 갑자기 얼굴에 전단지를 붙인 우사기가 찾아온다. 하치와레가 그 전단지를 확인하자, 그것은 '특별한 섬으로 초대'라고 쓰여진 초대장이었다."
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
};

// 저장된 영화 제목과 상세 정보 연결
const getMovieDetail = (title = "") => {
    const name = title.trim().replace(/\s+/g, " ");

    if (movieDetails[name]) return movieDetails[name];

    if (name.includes("먼작귀")) {
        return movieDetails["먼작귀"];
    }

    if (
        name.includes("귀멸의 칼날") &&
        name.includes("무한열차")
    ) {
        return movieDetails["귀멸의 칼날 무한열차"];
    }

    if (
        name.includes("신과함께") &&
        name.includes("죄와 벌")
    ) {
        return movieDetails["신과 함께: 죄와 벌"];
    }

    return {};
};

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getMovieStats } = useAuth();

    // 기존 영화 목록
    const movies = JSON.parse(
        localStorage.getItem("movies") || "[]"
    );

    // URL의 ID와 일치하는 영화
    const currentMovie = movies.find(
        (movie) => String(movie.id) === id
    );

    if (!currentMovie) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f3f6] text-neutral-900 dark:bg-[#181818] dark:text-white">
                <h2 className="text-2xl font-bold">
                    영화를 찾을 수 없습니다.
                </h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 rounded-lg bg-rose-600 px-6 py-3 text-white"
                >
                    메인으로 돌아가기
                </button>
            </div>
        );
    }

    // 영화 데이터 +  상세 정보
    const movie = {
        ...currentMovie,
        ...getMovieDetail(currentMovie.title),
    };

    // 메인 페이지와 동일한 평균 평점
    const stats = getMovieStats(movie.id);
    const avg = Number(stats?.avg) || 0;
    const count = Number(stats?.count) || 0;

    // 리뷰 작성 페이지로 영화 ID 전달
    const goToReview = () => {
        navigate("/review/create", {
            state: { movieId: movie.id },
        });
    };

    return (
        <div className="min-h-screen bg-[#f2f3f6] text-neutral-900 transition-colors dark:bg-[#181818] dark:text-white">
            <div className="mx-auto max-w-[1100px] px-6 py-12">

                {/* 뒤로가기 */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-sm text-neutral-500 transition hover:text-rose-600 dark:text-neutral-400"
                >
                    <ArrowLeft size={18} />
                    뒤로가기
                </button>

                {/* 영화 상세 정보 */}
                <div className="flex flex-col gap-10 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm md:flex-row dark:border-neutral-800 dark:bg-[#222222]">

                    {/* 포스터 */}
                    <div className="shrink-0">
                        <img
                            src={movie.poster}
                            alt={`${movie.title} 포스터`}
                            className="h-[390px] w-[260px] rounded-xl object-cover shadow-md"
                        />
                    </div>

                    {/* 상세 내용 */}
                    <div className="min-w-0 flex-1">
                        <h1 className="text-4xl font-black tracking-tight">
                            {movie.title}
                        </h1>

                        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                            {movie.releaseDate || "개봉일 정보 없음"}
                        </p>

                        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                            {movie.overview || movie.content || "영화 정보 없음"}
                        </p>

                        {/* 별점과 리뷰 수 */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <StarDisplay
                                score={count > 0 ? avg : 0}
                                size={24}
                            />

                            <span className="font-bold text-rose-600">
                                {count > 0 ? avg.toFixed(1) : "평점 없음"}
                            </span>

                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                리뷰 {count}개
                            </span>
                        </div>

                        {/* 줄거리 */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold">
                                줄거리
                            </h2>

                            <p className="mt-3 whitespace-pre-line leading-8 text-neutral-600 dark:text-neutral-300">
                                {movie.synopsis ||
                                    movie.content ||
                                    "줄거리 정보가 없습니다."}
                            </p>
                        </div>

                        {/* 원작 정보가 있는 영화만 표시 */}
                        {movie.originalWork && (
                            <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-400">
                                원작: {movie.originalWork}
                            </p>
                        )}

                        {/* 리뷰 작성 버튼 */}
                        <button
                            onClick={goToReview}
                            className="mt-8 rounded-lg bg-rose-600 px-7 py-3 font-bold text-white transition hover:bg-rose-700"
                        >
                            리뷰 등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
