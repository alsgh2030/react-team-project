import img1 from "./image/걸캅스.jpg";
import img2 from "./image/귀멸의 칼날.jpg";
import img3 from "./image/단지의 두사람.jpg";
import img4 from "./image/도둑들.jpg";
import img5 from "./image/론 서바이버.jpg";
import img6 from "./image/말할 수 없는 비밀.jpg";
import img7 from "./image/먼작귀.jpg";
import img8 from "./image/바람과 함께 사라지다.jpg";
import img9 from "./image/불한당.jpg";
import img10 from "./image/설국열차.jpg";
import img11 from "./image/신과 함께_좌와 벌.jpg";
import img12 from "./image/썸머워즈.jpg";
import img13 from "./image/아메리칸 셰프.jpg";
import img14 from "./image/언터처블.jpg";
import img15 from "./image/연가시.jpg";
import img16 from "./image/엽기적인 그녀.jpg";
import img17 from "./image/원피스 로맨스 던.jpg";
import img18 from "./image/타인의 삶.jpg";
import img19 from "./image/타짜.jpg";
import img20 from "./image/퍼니게임.jpg";
import img21 from "./image/해운대.jpg";
import wide1 from "./image/width_poster/걸캅스.jpg";
import wide2 from "./image/width_poster/귀멸의 칼날.jpg";
import wide3 from "./image/width_poster/단지의 두사람.jpg";
import wide4 from "./image/width_poster/도둑들.jpg";
import wide5 from "./image/width_poster/론 서바이버.jpg";
import wide6 from "./image/width_poster/말할 수 없는 비밀.jpg";
import wide7 from "./image/width_poster/치이카와.jpg";
import wide8 from "./image/width_poster/바람과 함께 사라지다.jpg";
import wide9 from "./image/width_poster/불한당.jpg";
import wide10 from "./image/width_poster/설국열차.jpg";
import wide11 from "./image/width_poster/신과 함께.jpg";
import wide12 from "./image/width_poster/썸머 워즈.jpg";
import wide13 from "./image/width_poster/아메리칸 셰프.jpg";
import wide14 from "./image/width_poster/언터처블.jpg";
import wide15 from "./image/width_poster/연가시.jpg";
import wide16 from "./image/width_poster/엽기적인 그녀.jpg";
import wide17 from "./image/width_poster/원피스 로맨스 던.jpg";
import wide18 from "./image/width_poster/타인의 삶.jpg";
import wide19 from "./image/width_poster/타짜.jpg";
import wide20 from "./image/width_poster/퍼니 게임.jpg";
import wide21 from "./image/width_poster/해운대.jpg";
import profile_pink from "./image/profile_img/profile_icon_pink.png";
import profile_brown from "./image/profile_img/profile_icon_brown.png";
import profile_green from "./image/profile_img/profile_icon_green.png";
import profile_blue from "./image/profile_img/profile_icon_blue.png";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextPro = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );

  const [currentMovie, setCurrentMovie] = useState(
    JSON.parse(localStorage.getItem("currentMovie")) || null,
  );

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const profile_icon = [
    { profile_icon: profile_pink },
    { profile_icon: profile_brown },
    { profile_icon: profile_green },
    { profile_icon: profile_blue },
  ];
  localStorage.setItem("profile_icon", JSON.stringify(profile_icon));

  const movies = [
    {
      id: 1,
      title: "걸캅스",
      releaseDate: "2019.05.09",
      overview: "한국 • 코미디 • 107분",
      synopsis:
        "전직 전설의 형사 미영과 민원실로 밀려난 현직 형사 지혜. 두 사람은 디지털 성범죄 사건의 피해자를 발견하고 비공식 수사에 나선다.",
      content: "전직 경찰과 현직 민원실 경찰이 디지털 성범죄를 쫓는 이야기",
      avgScore: 3.2,
      reviewCount: 1,
      poster: img1,
      wide_poster: wide1,
    },
    {
      id: 2,
      title: "귀멸의 칼날: 무한열차편",
      releaseDate: "2021.01.27",
      overview: "일본 • 애니메이션 • 116분",
      synopsis:
        "혈귀로 변한 여동생 네즈코를 인간으로 되돌리기 위해 귀살대에 들어간 탄지로. 염주 렌고쿠와 함께 무한열차에 탑승한 그는 숨어 있던 혈귀와 마주한다.",
      content: "귀살대원들이 무한열차에서 벌어지는 사건에 맞서는 이야기",
      avgScore: 4.4,
      reviewCount: 1,
      poster: img2,
      wide_poster: wide2,
    },
    {
      id: 3,
      title: "단지의 두사람",
      releaseDate: "2024.09.01",
      overview: "일본 • 드라마 • 회당 48분",
      synopsis:
        "같은 아파트 단지에 사는 소꿉친구 노에와 나츠코. 평온한 일상을 보내던 두 사람은 오랜 이웃에게 뜻밖의 부탁을 받는다.",
      content: "단지에 두 사람이 있어",
      avgScore: 3.5,
      reviewCount: 1,
      poster: img3,
      wide_poster: wide3,
    },
    {
      id: 4,
      title: "도둑들",
      releaseDate: "2012.07.25",
      overview: "한국 • 범죄 • 136분",
      synopsis:
        "한국과 중국의 도둑들이 마카오 카지노에 숨겨진 희대의 다이아몬드를 훔치기 위해 팀을 이룬다.",
      content:
        "한국과 홍콩 도둑들이 마카오 카지노에서 다이아몬드를 훔치려는 이야기",
      avgScore: 3.9,
      reviewCount: 1,
      poster: img4,
      wide_poster: wide4,
    },
    {
      id: 5,
      title: "론 서바이버",
      releaseDate: "2014.04.02",
      overview: "미국 • 액션 • 121분",
      synopsis:
        "아프가니스탄에서 탈레반 지도자를 체포하는 작전에 투입된 네이비씰 대원들. 잠복 중 주민들에게 발각되면서 어려운 선택에 직면한다.",
      content: "아프가니스탄 작전 중 고립된 네이비실 대원들의 실화 기반 생존기",
      avgScore: 4.0,
      reviewCount: 1,
      poster: img5,
      wide_poster: wide5,
    },
    {
      id: 6,
      title: "말할 수 없는 비밀",
      releaseDate: "2008.01.10",
      overview: "대만 • 로맨스 • 101분",
      synopsis:
        "예술학교로 전학 온 상륜은 옛 음악실에서 샤오위를 만난다. 가까워질수록 애틋한 마음이 생기지만 그녀에게는 알 수 없는 비밀이 있다.",
      content: "음악 학교에서 만난 두 남녀 사이에 숨은 비밀과 사랑 이야기",
      avgScore: 4.3,
      reviewCount: 1,
      poster: img6,
      wide_poster: wide6,
    },
    {
      id: 7,
      title: "극장판 먼작귀: 특별한 섬으로의 초대",
      releaseDate: "2026.09.30",
      overview: "일본 • 애니메이션 • 99분",
      originalWork: "만화 '먼작귀'",
      synopsis: `어느 날, 광장에서 쉬고 있던 치이카와와 친구들 앞에 특별한 섬으로의 초대장이 나타난다.

“섬에서 간단한 토벌만 해도 보수 100배!”
“한정 섬라멘과 한정 디저트까지!”

솔깃한 문구에 이끌려 치이카와와 친구들은 섬에서 열리는 행사에 참가하기로 한다.

하지만 초대장의 내용이 어딘가 수상하다고 느끼는 해달.

과연 특별한 섬에는 어떤 비밀이 숨겨져 있을까...?`,
      content: "작고 귀여운 캐릭터들의 일상과 소소한 모험",
      avgScore: 4.1,
      reviewCount: 1,
      poster: img7,
      wide_poster: wide7,
    },
    {
      id: 8,
      title: "바람과 함께 사라지다",
      releaseDate: "1957.03.25",
      overview: "미국 • 드라마 • 220분",
      synopsis:
        "남북전쟁 직전, 스칼렛은 애슐리에게 사랑을 고백하지만 거절당한다. 이를 지켜본 레트는 스칼렛에게 매력을 느낀다.",
      content: "남북전쟁 시기를 살아가는 스칼렛 오하라의 삶과 사랑",
      avgScore: 4.2,
      reviewCount: 1,
      poster: img8,
      wide_poster: wide8,
    },
    {
      id: 9,
      title: "불한당: 나쁜 놈들의 세상",
      releaseDate: "2017.05.17",
      overview: "한국 • 범죄 • 120분",
      synopsis:
        "교도소에서 만난 재호와 현수. 서로에게 강하게 끌린 두 사람은 출소 후 조직의 권력을 차지하기 위해 손을 잡는다.",
      content: "감옥에서 만난 두 남자의 위험한 관계와 배신",
      avgScore: 3.8,
      reviewCount: 1,
      poster: img9,
      wide_poster: wide9,
    },
    {
      id: 10,
      title: "설국열차",
      releaseDate: "2013.08.01",
      overview: "한국 • 액션 • 125분",
      synopsis:
        "얼어붙은 지구에서 생존자들을 태운 열차. 꼬리 칸의 커티스는 불평등한 질서에 맞서 앞쪽 칸으로 향하는 반란을 시작한다.",
      content: "빙하기, 열차 안에서 계급 사회에 맞서 싸우는 사람들",
      avgScore: 4.0,
      reviewCount: 2,
      poster: img10,
      wide_poster: wide10,
    },
    {
      id: 11,
      title: "신과 함께: 죄와 벌",
      releaseDate: "2017.12.20",
      overview: "한국 • 판타지 • 139분",
      synopsis:
        "화재 현장에서 아이를 구하고 죽은 소방관 자홍. 세 명의 저승차사와 함께 일곱 번의 재판을 받으며 예상치 못한 진실을 마주한다.",
      content: "죽은 소방관이 저승 삼차사와 함께 49일간 재판을 받는 이야기",
      avgScore: 3.7,
      reviewCount: 1,
      poster: img11,
      wide_poster: wide11,
    },
    {
      id: 12,
      title: "썸머워즈",
      releaseDate: "2009.08.13",
      overview: "일본 • 애니메이션 • 114분",
      synopsis:
        "수학 천재 겐지는 나츠키와 함께 시골 여행을 떠난다. 어느 날 수수께끼의 숫자가 담긴 문자를 받으면서 가상 세계 OZ에 위기가 찾아온다.",
      content: "가상 세계의 위기를 가족이 힘을 합쳐 해결하는 여름 이야기",
      avgScore: 4.4,
      reviewCount: 1,
      poster: img12,
      wide_poster: wide12,
    },
    {
      id: 13,
      title: "아메리칸 셰프",
      releaseDate: "2015.01.07",
      overview: "미국 • 모험 • 114분",
      synopsis:
        "유명 음식 평론가와의 갈등으로 레스토랑을 떠난 셰프 칼은 푸드트럭을 시작하며 요리의 즐거움을 되찾는다.",
      content: "유명 셰프가 푸드트럭으로 다시 요리의 즐거움을 찾는 이야기",
      avgScore: 3.9,
      reviewCount: 1,
      poster: img13,
      wide_poster: wide13,
    },
    {
      id: 14,
      title: "언터처블: 1%의 우정",
      releaseDate: "2012.03.22",
      overview: "프랑스 • 전기 • 111분",
      synopsis:
        "사고로 전신이 마비된 백만장자 필립과 자유분방한 드리스. 서로 다른 두 사람이 만나 특별한 우정을 쌓는다.",
      content: "전신마비 부호와 그의 간병인 사이에 싹튼 우정",
      avgScore: 4.5,
      reviewCount: 2,
      poster: img14,
      wide_poster: wide14,
    },
    {
      id: 15,
      title: "연가시",
      releaseDate: "2012.07.05",
      overview: "한국 • 드라마 • 109분",
      synopsis:
        "전국에서 변종 연가시로 인한 사망자가 발견된다. 재혁은 감염된 가족들을 구하기 위해 치료제를 찾아 나선다.",
      content: "기생충에 감염된 사람들이 물을 찾아 달려드는 재난",
      avgScore: 3.3,
      reviewCount: 1,
      poster: img15,
      wide_poster: wide15,
    },
    {
      id: 16,
      title: "엽기적인 그녀",
      releaseDate: "2001.07.27",
      overview: "한국 • 드라마 • 137분",
      synopsis:
        "전철에서 술에 취한 여성을 만난 견우. 예측할 수 없는 그녀와의 만남은 뜻밖의 사랑 이야기로 이어진다.",
      content: "지하철에서 만난 엉뚱한 그녀와 순한 남자의 연애담",
      avgScore: 4.1,
      reviewCount: 1,
      poster: img16,
      wide_poster: wide16,
    },
    {
      id: 17,
      title: "원피스: 로맨스 던",
      releaseDate: "2017",
      overview: "한국 • 애니메이션 • 21분",
      synopsis:
        "원피스 TV 애니메이션화 20주년 기념 특별판. 해적을 꿈꾸는 또 다른 루피의 모험이 시작된다.",
      content: "루피의 모험이 시작되는 이야기",
      avgScore: 3.6,
      reviewCount: 1,
      poster: img17,
      wide_poster: wide17,
    },
    {
      id: 18,
      title: "타인의 삶",
      releaseDate: "2006.03.23",
      overview: "한국 • 드라마 • 137분",
      synopsis:
        "동독 비밀경찰 비즐러는 극작가 드라이만과 배우 크리스타를 감시하는 임무를 맡지만, 그들의 삶을 지켜보며 변하기 시작한다.",
      content: "동독 비밀경찰이 감시 대상의 삶에 점점 빠져드는 이야기",
      avgScore: 4.5,
      reviewCount: 1,
      poster: img18,
      wide_poster: wide18,
    },
    {
      id: 19,
      title: "타짜",
      releaseDate: "2006.09.28",
      overview: "한국 • 드라마 • 140분",
      synopsis:
        "도박판에서 전 재산을 잃은 고니는 전설적인 타짜 평경장을 만나 화투의 세계에 뛰어든다.",
      content: "화투판에 뛰어든 청년이 타짜의 세계를 배워 가는 이야기",
      avgScore: 4.2,
      reviewCount: 2,
      poster: img19,
      wide_poster: wide19,
    },
    {
      id: 20,
      title: "퍼니게임",
      releaseDate: "1997.11.15",
      overview: "오스트리아 • 범죄 • 108분",
      synopsis:
        "호숫가 별장에서 휴가를 보내던 가족 앞에 낯선 두 청년이 찾아오면서 평화로운 일상이 악몽으로 변한다.",
      content: "휴가지 별장에 찾아온 낯선 두 청년이 가족을 위협하는 이야기",
      avgScore: 3.6,
      reviewCount: 1,
      poster: img20,
      wide_poster: wide20,
    },
    {
      id: 21,
      title: "해운대",
      releaseDate: "2009.07.22",
      overview: "한국 • 액션 • 120분",
      synopsis:
        "부산 해운대에 초대형 쓰나미가 몰려온다. 재난 속에서 사람들은 사랑하는 이들을 구하기 위해 사투를 벌인다.",
      content: "해운대에 닥친 초대형 쓰나미와 그 속의 사람들",
      avgScore: 3.6,
      reviewCount: 1,
      poster: img21,
      wide_poster: wide21,
    },
  ];

  if (!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  // review 목데이터
  const reviews = [
    {
      userId: "user2",
      id: 1791590400000,
      movieId: 14,
      title: "웃다가 울었어요",
      content: "두 배우의 호흡이 최고입니다. 인생 영화예요.",
      score: 5,
      like: ["user1", "user3", "user4"],
    },
    {
      userId: "user1",
      id: 1791594000000,
      movieId: 2,
      title: "작화가 미쳤습니다",
      content: "극장에서 다시 보고 싶어요. 음악도 너무 좋았어요.",
      score: 5,
      like: ["user3", "user4"],
    },
    {
      userId: "user3",
      id: 1791597600000,
      movieId: 10,
      title: "결말이 오래 남네요",
      content: "설정이 신선하고 연출이 대단합니다. 두 번 봐도 재밌어요.",
      score: 4,
      like: ["user1", "user2"],
    },
    {
      userId: "user4",
      id: 1791601200000,
      movieId: 19,
      title: "명대사 폭격",
      content: "대사 하나하나가 명대사. 몇 번을 봐도 재밌습니다.",
      score: 5,
      like: ["user2", "user3", "user4"],
    },
    {
      userId: "user3",
      id: 1791604800000,
      movieId: 18,
      title: "조용하지만 큰 울림",
      content: "천천히 스며드는 영화. 마지막 장면에서 소름 돋았어요.",
      score: 5,
      like: ["user1"],
    },
    {
      userId: "user2",
      id: 1791608400000,
      movieId: 6,
      title: "피아노 장면 최고",
      content: "반전도 좋았고 음악이 정말 예뻐요.",
      score: 4,
      like: ["user1", "user4"],
    },
    {
      userId: "user1",
      id: 1791612000000,
      movieId: 12,
      title: "온 가족 추천",
      content: "가족끼리 보기 딱 좋은 애니메이션이에요.",
      score: 5,
      like: [],
    },
    {
      userId: "user4",
      id: 1791615600000,
      movieId: 7,
      title: "귀여워서 힐링",
      content: "보기만 해도 기분이 좋아지는 영화. 캐릭터가 너무 귀여워요.",
      score: 4,
      like: ["user2"],
    },
    {
      userId: "user2",
      id: 1791619200000,
      movieId: 11,
      title: "후반부가 아쉬워요",
      content: "볼거리는 많은데 뒷부분이 조금 늘어졌어요.",
      score: 3,
      like: [],
    },
    {
      userId: "user1",
      id: 1791622800000,
      movieId: 21,
      title: "재난 장면은 좋았는데",
      content: "박진감은 있었지만 이야기는 평범했어요.",
      score: 3,
      like: ["user3"],
    },
  ];

  if (!localStorage.getItem("reviews")) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  // 영화별 평균 별점 / 리뷰 수: 저장된 reviews에서 그때그때 계산
  // 리뷰가 없으면 avg는 null, count는 0
  const getMovieStats = (movieId) => {
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const movieReviews = allReviews.filter(
      (r) => String(r.movieId) === String(movieId),
    );
    if (movieReviews.length === 0) return { avg: null, count: 0 };
    const sum = movieReviews.reduce((acc, r) => acc + Number(r.score || 0), 0);
    return {
      avg: Math.round((sum / movieReviews.length) * 10) / 10,
      count: movieReviews.length,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        getMovieStats,
        currentMovie,
        setCurrentMovie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
