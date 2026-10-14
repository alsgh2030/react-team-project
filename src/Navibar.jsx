import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContextPro'
import { Moon, Sun } from 'lucide-react'
import SearchBar from './components/SearchBar'

const Navibar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const to_myPage = () => {
    navigate('/mypage')
  }

  const logout1 = () => {
    logout()
    navigate('/')
  }

  return (
    <nav
      className={`w-full min-h-[76px] flex flex-wrap justify-between items-center gap-3 px-5 py-3 border-2 rounded-[22px] shadow-[5px_5px_0_#111] font-sans transition-colors duration-200 ${
        darkMode
          ? 'bg-[#222222] text-white border-white'
          : 'bg-white text-black border-black'
      }`}
    >
      {/* 왼쪽: 로고 + 메뉴 */}
      <div className='flex items-center gap-7'>
        <Link
          to='/'
          className='flex items-center gap-2.5 py-1.5 pl-2 pr-3.5 bg-black rounded-[14px]'
        >
          <span className='flex items-center justify-center w-[34px] h-[34px] bg-[#FFD93B] rounded-[10px]'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='#111'
              aria-hidden='true'
            >
              <path d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z' />
            </svg>
          </span>

          <span className='text-[22px] font-black text-white tracking-tight whitespace-nowrap'>
            민호 무비
          </span>
        </Link>

        <div className='flex items-center gap-1.5 text-lg font-bold'>
          <Link
            to='/movieList'
            className='px-4 py-2.5 rounded-xl hover:bg-[#FFF1A8] hover:text-black'
          >
            영화 리스트
          </Link>

          <Link
            to='/reviewList'
            className='px-4 py-2.5 rounded-xl hover:bg-[#FFF1A8] hover:text-black'
          >
            리뷰 리스트
          </Link>
        </div>
      </div>

      {/* 오른쪽: 검색창 + 다크모드 + 계정 버튼 */}
      <div className='flex flex-wrap items-center gap-3'>
        <SearchBar />

        {/* 다크모드 전환 버튼 */}
        <button
          type='button'
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
          title={darkMode ? '라이트 모드' : '다크 모드'}
          className={`flex items-center justify-center w-11 h-11 border-2 rounded-xl transition-colors ${
            darkMode
              ? 'border-white bg-[#333333] text-[#FFD93B] hover:bg-[#444444]'
              : 'border-black bg-white text-black hover:bg-[#FFF1A8]'
          }`}
        >
          {darkMode ? <Sun size={21} /> : <Moon size={21} />}
        </button>

        {!currentUser && (
          <div className='flex items-center gap-2.5'>
            <Link
              to='/login'
              className={`flex items-center h-11 px-5 border-2 rounded-xl text-[15px] font-bold ${
                darkMode
                  ? 'border-white bg-[#333333] text-white hover:bg-[#444444]'
                  : 'border-black bg-white text-black hover:bg-slate-100'
              }`}
            >
              로그인
            </Link>

            <Link
              to='/signup'
              className='flex items-center h-11 px-5 border-2 border-black rounded-xl bg-[#FFD93B] text-black text-[15px] font-bold hover:brightness-95'
            >
              회원가입
            </Link>
          </div>
        )}

        {currentUser && (
          <div className='flex items-center gap-2.5'>
            <button
              onClick={to_myPage}
              className='h-11 px-5 border-2 border-black rounded-xl bg-green-700 text-[15px] font-bold text-white cursor-pointer hover:bg-green-800'
            >
              마이페이지
            </button>

            <button
              onClick={logout1}
              className='h-11 px-5 border-2 border-black rounded-xl bg-red-600 text-[15px] font-bold text-white cursor-pointer hover:bg-red-700'
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navibar