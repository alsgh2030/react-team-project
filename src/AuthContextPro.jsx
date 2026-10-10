import img1 from './image/걸캅스.jpg'
import img2 from './image/귀멸의 칼날.jpg'
import img3 from './image/단지의 두사람.jpg'
import img4 from './image/도둑들.jpg'
import img5 from './image/론 서바이버.jpg'
import img6 from './image/말할 수 없는 비밀.jpg'
import img7 from './image/먼작귀.jpg'
import img8 from './image/바람과 함께 사라지다.jpg'
import img9 from './image/불한당.jpg'
import img10 from './image/설국열차.jpg'
import img11 from './image/신과 함께_좌와 벌.jpg'
import img12 from './image/썸머워즈.jpg'
import img13 from './image/아메리칸 셰프.jpg'
import img14 from './image/언터처블.jpg'
import img15 from './image/연가시.jpg'
import img16 from './image/엽기적인 그녀.jpg'
import img17 from './image/원피스 로맨스 던.jpg'
import img18 from './image/타인의 삶.jpg'
import img19 from './image/타짜.jpg'
import img20 from './image/퍼니게임.jpg'
import img21 from './image/해운대.jpg'
import { createContext, useContext, useState } from "react";

const AuthContext=createContext()

export const AuthContextPro=({children})=>{
    const[currentUser,setCurrentUser]=useState(
        JSON.parse(localStorage.getItem('currentUser'))||true
    )


    const logout=()=>{
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
    }

    const movies = [
  { id: 1,  title: '걸캅스',                 content: '전직 경찰과 현직 민원실 경찰이 디지털 성범죄를 쫓는 이야기', avgScore: 3.2, reviewCount: 1, poster: img1 },
  { id: 2,  title: '귀멸의 칼날: 무한열차편', content: '귀살대원들이 무한열차에서 벌어지는 사건에 맞서는 이야기', avgScore: 4.4, reviewCount: 1, poster: img2 },
  { id: 3,  title: '단지의 두사람',           content: '(직접 채워 주세요)', avgScore: 3.5, reviewCount: 1, poster: img3 },
  { id: 4,  title: '도둑들',                 content: '한국과 홍콩 도둑들이 마카오 카지노에서 다이아몬드를 훔치려는 이야기', avgScore: 3.9, reviewCount: 1, poster: img4 },
  { id: 5,  title: '론 서바이버',             content: '아프가니스탄 작전 중 고립된 네이비실 대원들의 실화 기반 생존기', avgScore: 4.0, reviewCount: 1, poster: img5 },
  { id: 6,  title: '말할 수 없는 비밀',       content: '음악 학교에서 만난 두 남녀 사이에 숨은 비밀과 사랑 이야기', avgScore: 4.3, reviewCount: 1, poster: img6 },
  { id: 7,  title: '먼작귀',                 content: '작고 귀여운 캐릭터들의 일상과 소소한 모험', avgScore: 4.1, reviewCount: 1, poster: img7 },
  { id: 8,  title: '바람과 함께 사라지다',     content: '남북전쟁 시기를 살아가는 스칼렛 오하라의 삶과 사랑', avgScore: 4.2, reviewCount: 1, poster: img8 },
  { id: 9,  title: '불한당: 나쁜 놈들의 세상', content: '감옥에서 만난 두 남자의 위험한 관계와 배신', avgScore: 3.8, reviewCount: 1, poster: img9 },
  { id: 10, title: '설국열차',               content: '빙하기, 열차 안에서 계급 사회에 맞서 싸우는 사람들', avgScore: 4.0, reviewCount: 2, poster: img10 },
  { id: 11, title: '신과 함께: 죄와 벌',       content: '죽은 소방관이 저승 삼차사와 함께 49일간 재판을 받는 이야기', avgScore: 3.7, reviewCount: 1, poster: img11 },
  { id: 12, title: '썸머워즈',               content: '가상 세계의 위기를 가족이 힘을 합쳐 해결하는 여름 이야기', avgScore: 4.4, reviewCount: 1, poster: img12 },
  { id: 13, title: '아메리칸 셰프',           content: '유명 셰프가 푸드트럭으로 다시 요리의 즐거움을 찾는 이야기', avgScore: 3.9, reviewCount: 1, poster: img13 },
  { id: 14, title: '언터처블: 1%의 우정',      content: '전신마비 부호와 그의 간병인 사이에 싹튼 우정', avgScore: 4.5, reviewCount: 2, poster: img14 },
  { id: 15, title: '연가시',                 content: '기생충에 감염된 사람들이 물을 찾아 달려드는 재난', avgScore: 3.3, reviewCount: 1, poster: img15 },
  { id: 16, title: '엽기적인 그녀',           content: '지하철에서 만난 엉뚱한 그녀와 순한 남자의 연애담', avgScore: 4.1, reviewCount: 1, poster: img16 },
  { id: 17, title: '원피스: 로맨스 던',       content: '루피의 모험이 시작되는 이야기', avgScore: 3.6, reviewCount: 1, poster: img17 },
  { id: 18, title: '타인의 삶',               content: '동독 비밀경찰이 감시 대상의 삶에 점점 빠져드는 이야기', avgScore: 4.5, reviewCount: 1, poster: img18 },
  { id: 19, title: '타짜',                   content: '화투판에 뛰어든 청년이 타짜의 세계를 배워 가는 이야기', avgScore: 4.2, reviewCount: 2, poster: img19 },
  { id: 20, title: '퍼니게임',               content: '휴가지 별장에 찾아온 낯선 두 청년이 가족을 위협하는 이야기', avgScore: 3.6, reviewCount: 1, poster: img20 },
  { id: 21, title: '해운대',                 content: '해운대에 닥친 초대형 쓰나미와 그 속의 사람들', avgScore: 3.6, reviewCount: 1, poster: img21 },
]

    localStorage.setItem('movies',JSON.stringify(movies))

    return(
        <AuthContext.Provider value={{currentUser,setCurrentUser,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)