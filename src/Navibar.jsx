import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContextPro'

const Navibar = () => {

  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [serch, setSerch] = useState('')

  const to_myPage = () => {
    navigate('/mypage')
  }

  const logout1 = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className='w-full h-[76px] flex justify-between items-center px-5 bg-white border-2 border-black rounded-[22px] shadow-[5px_5px_0_#111] font-sans'>

      {/* 왼쪽: 로고 + 메뉴 */}
      <div className='flex items-center gap-7'>
        <Link to='/' className='flex items-center gap-2.5 py-1.5 pl-2 pr-3.5 bg-black rounded-[14px]'>
          <span className='flex items-center justify-center w-[34px] h-[34px] bg-[#FFD93B] rounded-[10px]'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='#111' aria-hidden='true'>
              <path d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z' />
            </svg>
          </span>
          <span className='text-[22px] font-black text-white tracking-tight whitespace-nowrap'>민호 무비</span>
        </Link>

        <div className='flex items-center gap-1.5 text-lg font-bold'>
          <Link to='/' className='px-4 py-2.5 rounded-xl hover:bg-[#FFF1A8]'>영화 리스트</Link>
          <Link to='/reviewList' className='px-4 py-2.5 rounded-xl hover:bg-[#FFF1A8]'>리뷰 리스트</Link>
          <Link to='/' className='px-4 py-2.5 rounded-xl hover:bg-[#FFF1A8]'>탭 3</Link>
          <Link to='/' className='px-4 py-2.5 rounded-xl hover:bg-[#FFF1A8]'>탭 4</Link>
        </div>
      </div>

      {/* 오른쪽: 돋보기 + 검색창 + 버튼 */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2.5'>
          <svg width='30' height='30' viewBox='0 0 24 24' fill='none' stroke='#111' strokeWidth='2.6' strokeLinecap='round' aria-hidden='true'>
            <circle cx='10' cy='10' r='6.5' />
            <line x1='15' y1='15' x2='21' y2='21' />
          </svg>
          <input
            placeholder='제목을 검색하세요…'
            className='w-[250px] h-11 px-3.5 border-2 border-black rounded-xl bg-white text-[15px] font-medium placeholder:text-gray-500 focus:outline-3 focus:outline-[#FFD93B]'
            onClick={() => navigate('/search')}
          ></input>
        </div>

        {!currentUser &&
          <div className='flex items-center gap-2.5'>
            <Link
              to='/login'
              className='flex items-center h-11 px-5 border-2 border-black rounded-xl bg-white text-[15px] font-bold hover:bg-slate-100'
            >로그인</Link>
            <Link
              to='/signup'
              className='flex items-center h-11 px-5 border-2 border-black rounded-xl bg-[#FFD93B] text-[15px] font-bold hover:brightness-95'
            >회원가입</Link>
          </div>
        }
        {currentUser &&
          <div className='flex items-center gap-2.5'>
            <button
              onClick={to_myPage}
              className='h-11 px-5 border-2 border-black rounded-xl bg-green-700 text-[15px] font-bold text-white cursor-pointer hover:bg-green-800'
            >마이페이지</button>
            <button
              onClick={logout1}
              className='h-11 px-5 border-2 border-black rounded-xl bg-red-600 text-[15px] font-bold text-white cursor-pointer hover:bg-red-700'
            >로그아웃</button>
          </div>
        }
      </div>
    </nav>
  )
}

export default Navibar