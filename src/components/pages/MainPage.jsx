import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle } from 'lucide-react'
import StarDisplay from '../StarDisplay'
const MainPage = () => {





  const movies=JSON.parse(localStorage.getItem('movies'))
  const reviews=JSON.parse(localStorage.getItem('reviews')) || []

  const shuffled = () => {
  const suf_mov = movies.map((x) => ({ ...x, key: Math.random() }))
  return suf_mov.sort((x, y) => x.key - y.key)
}
  const [random_movies,setRandomMovies]=useState(shuffled().slice(0,5))
  const [top_movie_List,setTop_moive_List]=useState(movies.filter((x)=>x.avgScore>3.5).slice(0,10))

  const onLeft1=()=>{
    const left_1=random_movies.slice(1)
    setRandomMovies([...left_1,random_movies[0]])
  }

  const onRight1=()=>{
    const right_1=random_movies.slice(0,4)
    setRandomMovies([random_movies[4],...right_1])
  }

  const onLeft2=()=>{
    const left_1=top_movie_List.slice(0,5)
    const left_2=top_movie_List.slice(5,10)
    setTop_moive_List([...left_2,...left_1])
  }

  const onRight2=()=>{
    const right_1=top_movie_List.slice(0,-5)
    const right_2=top_movie_List.slice(-5)
    setTop_moive_List([...right_2,...right_1])
  }

  const navigate=useNavigate()

  const alig_review=[...reviews].sort((x,y)=>x.id - y.id)
  const profile_icon=JSON.parse(localStorage.getItem('profile_icon')) || []
  const comments=JSON.parse(localStorage.getItem('comments')) || []

  return (
    <div className='bg-white pb-16'>
      <div className='relative mt-4 overflow-hidden'>
      <button onClick={onLeft1} className='absolute left-[12%] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-7xl text-white [-webkit-text-stroke:3px_black]'>◀</button>
      <div className='mx-auto flex h-[420px] max-w-6xl items-center justify-center gap-4 [&>img:nth-child(1)]:hidden [&>img:nth-child(5)]:hidden [&>img:nth-child(2)]:-ml-40 [&>img:nth-child(4)]:-mr-40 [&>img:nth-child(3)]:h-[420px] [&>img:nth-child(3)]:w-[560px] [&>img:nth-child(3)]:object-top'>
        {random_movies.map((x)=>{
        return <img key={x.id} src={x.poster} onClick={()=>navigate(`/movie:${x.id}`)} className='h-[380px] w-72 shrink-0 border-2 border-black object-cover'
        style={{clipPath:'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%)'}}
        /> 
        })}
      </div>
      <button onClick={onRight1} className='absolute right-[12%] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-7xl text-white [-webkit-text-stroke:3px_black]'>▶</button>
      </div>

      <hr className='mx-6 my-6 border-gray-400'></hr>
      <h3 className='inline-block border-2 border-black bg-white py-2 pl-6 pr-10 text-xl font-bold' style={{clipPath:'polygon(0 0, 94% 0, 100% 30%, 100% 100%, 0 100%)'}}>현재 떠오르는 인기작들</h3>
      <div className='relative mx-auto mt-6 w-[1280px]'>
      <button onClick={onLeft2} className='absolute left-0 top-1/2 w-10 -translate-y-1/2 cursor-pointer text-center text-4xl text-black'>◀</button>
      <div className='mx-auto w-[1200px] overflow-hidden px-[10px] pb-3'>
      <div className='flex gap-5'>
      {top_movie_List.map((x)=>{
        return <img key={x.id} src={x.poster} onClick={()=>navigate(`/movie:${x.id}`)}className='aspect-[2/3] w-[220px] shrink-0 rounded-[36px] border-2 border-slate-800 object-cover shadow-[4px_6px_8px_rgba(0,0,0,0.4)]'/>
      })} 
      </div>
      </div>
      <button onClick={onRight2} className='absolute right-0 top-1/2 w-10 -translate-y-1/2 cursor-pointer text-center text-4xl text-black'>▶</button>
      </div>

      <h3 className='mt-10 inline-block border-2 border-black bg-white py-2 pl-6 pr-10 text-xl font-bold' style={{clipPath:'polygon(0 0, 94% 0, 100% 30%, 100% 100%, 0 100%)'}}>따끈따끈한 신작 리뷰 ★</h3>
      <div className='mt-4 grid grid-cols-3 gap-x-10 gap-y-4 bg-gray-300 px-14 py-8'>
      {alig_review.length === 0 && (
        <p className='col-span-3 py-10 text-center text-lg text-gray-600'>아직 등록된 리뷰가 없습니다.</p>
      )}
      {alig_review.slice(0,6).map((x)=>{
        const ran_profile= profile_icon.map((x) => ({ ...x, key: Math.random() }))
        ran_profile.sort((x,y)=>x.key - y.key)
        return (<div key={x.id} className='flex items-center gap-4 rounded-3xl bg-gray-100 p-4'>
          <div className='flex w-24 shrink-0 flex-col items-center gap-1'>
          <img src={ran_profile[0]?.profile_icon} className='h-20 w-20 rounded-full object-cover'/>
          <p className='max-w-full truncate text-xs'>{x.userId}</p>
          </div>
          <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='flex items-center justify-between gap-2'>
          <h4 className='truncate text-lg font-semibold'>{x.title}</h4>
          <StarDisplay score={x.score} />
          </div>
          <p className='line-clamp-3 text-xs'>{x.content}</p>
          <div className='flex justify-end gap-2'>
          <div className='flex items-center gap-2 rounded-lg bg-pink-200 px-3 py-1 text-lg'>
          <Heart size={26} className='fill-rose-600 text-rose-600' />
          {x.like}
          </div>
          <div className='flex items-center gap-2 rounded-lg bg-sky-300 px-3 py-1 text-lg'>
          <MessageCircle size={26} className='fill-blue-600 text-blue-600' />
          {comments.filter((c)=>c.reviewId===x.id).length}
          </div>
          </div>
          </div>
          </div>
        )
      })}
      </div>


    </div>
  )
}

export default MainPage