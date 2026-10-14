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
    <div className='min-h-screen bg-[#f2f3f6] pb-20 text-neutral-900 transition-colors duration-200 dark:bg-[#181818] dark:text-neutral-100'>
      <div className='mx-auto max-w-[1200px] px-6 pt-10'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
      <div>
      <h3 className='text-[28px] font-bold tracking-tight'>
        영화 리스트
      </h3>
      <p className='mt-1 text-sm text-neutral-500 dark:text-neutral-400'>등록된 영화 {movies.length}편</p>
      </div>

      <div className='flex gap-1 rounded-xl border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-800'>
        {sort_tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setSortType(t.key)}
            className={'cursor-pointer rounded-lg px-3.5 py-1.5 text-sm transition-colors ' +
              (sort_type === t.key
                ? 'bg-neutral-900 font-bold text-white dark:bg-neutral-600 dark:text-white'
                : 'font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white')
            }
          >
            {t.label}
          </button>
        ))}
      </div>
      </div>

      {sorted_movies.length === 0 && (
        <p className='py-20 text-center text-lg text-neutral-500 dark:text-neutral-400'>등록된 영화가 없습니다.</p>
      )}

      <div className='mt-8 grid grid-cols-6 gap-x-5 gap-y-9'>
        {sorted_movies.map((x) => (
          <div key={x.id} onClick={() => navigate(`/movie/${x.id}`)} className='group cursor-pointer'>
            <div className='overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10'>
            <img
              src={x.poster}
              alt={x.title}
              className='aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
            </div>
            <p className='mt-3 truncate text-[15px] font-bold'>{x.title}</p>
            <div className='mt-0.5 flex items-center gap-1 text-[13px] text-neutral-500 dark:text-neutral-400'>
              <Star size={13} className='fill-rose-600 text-rose-600' />
              <span className='font-bold text-rose-600'>{Number(x.avgScore).toFixed(1)}</span>
              <span className='ml-1'>· 리뷰 {x.reviewCount}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default MovieListPage