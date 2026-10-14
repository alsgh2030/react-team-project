import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const searchRef = useRef(null)

  // 영화 목데이터 불러오기
  useEffect(() => {
    const savedMovies = JSON.parse(
      localStorage.getItem('movies')
    ) || []

    setMovies(savedMovies)
  }, [])

  // 검색어 입력되면 포함된 영화가 뜸
  const filteredMovies = movies.filter((movie) => {
    if (movie.title.includes(search)) {
      return true
    }
    return false
  })

  // 영화 선택 시 상세 페이지로 이동
  const selectMovie = (movie) => {
    setSearch('')
    setIsOpen(false)
    navigate(`/movie/${movie.id}`)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={searchRef} className="relative w-[280px]">
      <div className="relative flex items-center">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 text-neutral-400"
        >
          <circle cx="10" cy="10" r="6.5" />
          <line x1="15" y1="15" x2="21" y2="21" />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false)
            }

            if (e.key === 'Enter' && filteredMovies.length > 0) {
              selectMovie(filteredMovies[0])
            }
          }}
          placeholder="영화 제목을 검색해 보세요"
          className="w-full h-10 pl-10 pr-4 border-0 rounded-full bg-neutral-100 text-neutral-900 text-sm placeholder:text-neutral-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-rose-500/40 dark:!bg-neutral-800 dark:!text-white dark:placeholder:text-neutral-500"
        />
      </div>

      {isOpen && search.trim() !== '' && (
        <div className="absolute top-full left-0 mt-2 w-full max-h-[420px] overflow-y-auto bg-white border border-neutral-200 rounded-xl shadow-xl z-50 py-1 dark:border-neutral-700 dark:bg-[#232323]">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => selectMovie(movie)}
                className="flex items-center gap-3 w-full px-3 py-2.5 text-left cursor-pointer hover:bg-neutral-50 transition-colors dark:hover:bg-neutral-800 group"
              >
                <img
                  src={movie.poster}
                  alt={`${movie.title} 포스터`}
                  className="w-10 h-[56px] object-cover rounded-md shrink-0"
                />

                <div className="min-w-0">
                  <p className="font-bold text-sm truncate text-neutral-900 dark:text-white">
                    {movie.title}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500 line-clamp-2 dark:text-neutral-400">
                    {movie.content}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="p-4 text-sm text-neutral-500 text-center dark:text-neutral-400">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar