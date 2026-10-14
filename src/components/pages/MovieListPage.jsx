import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'

const MovieListPage = () => {
  const movies = JSON.parse(localStorage.getItem('movies')) || []
  const navigate = useNavigate()

  const [sort_type, setSortType] = useState('default')

  const sort_tabs = [
    { key: 'default', label: '전체' },
    { key: 'score', label: '평점 높은 순' },
    { key: 'review', label: '리뷰 많은 순' },
    { key: 'title', label: '가나다 순' },
  ]

  const sorted_movies = [...movies].sort((x, y) => {
    if (sort_type === 'score') return y.avgScore - x.avgScore
    if (sort_type === 'review') return y.reviewCount - x.reviewCount
    if (sort_type === 'title') return x.title.localeCompare(y.title, 'ko')
    return x.id - y.id
  })

  return (
    <div className='bg-white px-10 pb-16 pt-6'>
      <h3 className='inline-block border-2 border-black bg-white py-2 pl-6 pr-10 text-xl font-bold' style={{clipPath:'polygon(0 0, 94% 0, 100% 30%, 100% 100%, 0 100%)'}}>영화 리스트</h3>

      <div className='mt-5 flex gap-2'>
        {sort_tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSortType(t.key)}
            className={'cursor-pointer rounded-full border-2 border-black px-4 py-1 text-sm font-semibold transition-colors ' + (sort_type === t.key ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sorted_movies.length === 0 && (
        <p className='py-20 text-center text-lg text-gray-600'>등록된 영화가 없습니다.</p>
      )}

      <div className='mt-6 grid grid-cols-5 gap-x-6 gap-y-8'>
        {sorted_movies.map((x) => (
          <div key={x.id} onClick={() => navigate(`/movie/${x.id}`)} className='group cursor-pointer'>
            <img
              src={x.poster}
              alt={x.title}
              className='aspect-[2/3] w-full rounded-2xl border-2 border-slate-800 object-cover shadow-[3px_5px_8px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:scale-105'
            />
            <p className='mt-3 truncate text-base font-semibold'>{x.title}</p>
            <div className='flex items-center gap-1 text-sm text-gray-600'>
              <Star size={14} className='fill-yellow-400 text-yellow-400' />
              <span>{Number(x.avgScore).toFixed(1)}</span>
              <span className='ml-1'>· 리뷰 {x.reviewCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieListPage