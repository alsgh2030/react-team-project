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
    <div ref={searchRef} className="relative w-[300px]">
      <div className="flex items-center gap-2.5">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          aria-hidden="true"
          className="text-black dark:text-white"
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
          placeholder="제목을 검색하세요…"
          className="w-full h-11 px-3.5 border-2 border-black rounded-xl bg-white text-black text-[15px] font-medium placeholder:text-gray-500 focus:outline-3 focus:outline-[#FFD93B] dark:border-white dark:bg-[#333333] dark:text-white dark:placeholder:text-gray-400"
        />
      </div>

      {isOpen && search.trim() !== '' && (
        <div className="absolute top-full left-0 mt-2 w-full max-h-[420px] overflow-y-auto bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_#111] z-50 dark:border-white dark:bg-[#252525]">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => selectMovie(movie)}
                className="flex items-center gap-3 w-full p-3 text-left hover:bg-[#FFF1A8] hover:text-black transition-colors dark:hover:bg-[#383838]"
              >
                <img
                  src={movie.poster}
                  alt={`${movie.title} 포스터`}
                  className="w-12 h-[68px] object-cover rounded-md border border-gray-200 shrink-0 dark:border-gray-600"
                />

                <div className="min-w-0">
                  <p className="font-bold text-[15px] truncate">
                    {movie.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-600 line-clamp-2 dark:text-gray-400">
                    {movie.content}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500 text-center dark:text-gray-400">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar