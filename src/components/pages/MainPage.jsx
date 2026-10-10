import React, { useState } from 'react'
const MainPage = () => {





  const movies=JSON.parse(localStorage.getItem('movies'))
  const reviews=JSON.parse(localStorage.getItem('Reviews'))

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
  return (
    <div className='bg-white pb-16'>
      <div className='relative mt-4 overflow-hidden'>
      <button onClick={onLeft1} className='absolute left-[12%] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-7xl text-white [-webkit-text-stroke:3px_black]'>◀</button>
      <div className='mx-auto flex h-[420px] max-w-6xl items-center justify-center gap-4 [&>img:nth-child(1)]:hidden [&>img:nth-child(5)]:hidden [&>img:nth-child(2)]:-ml-40 [&>img:nth-child(4)]:-mr-40 [&>img:nth-child(3)]:h-[420px] [&>img:nth-child(3)]:w-[560px] [&>img:nth-child(3)]:object-top'>
        {random_movies.map((x)=>{
        return <img key={x.id} src={x.poster} className='h-[380px] w-72 shrink-0 border-2 border-black object-cover'
        style={{clipPath:'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%)'}}
        />  // 영화 목록 중 5개만? 나오게 ㅇㅇ
        //누르면 네비게이트로 해서 경로를/movie/{x.id}로하는걸로이야기 다음 주에 하고
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
        return <img key={x.id} src={x.poster} className='aspect-[2/3] w-[220px] shrink-0 rounded-[36px] border-2 border-slate-800 object-cover shadow-[4px_6px_8px_rgba(0,0,0,0.4)]'/>
      })} {/* 평점 3점 이상인 얘들 10개? 나열, 나머지는 영화 리스트?, 앞 뒤가 연결되어 있어서 반복(루프) */}
      </div>
      </div>
      {/* 위와 동일하게 누르면 네비게이트로 /movie/{x.id}로 하는 걸로하고 */}
      <button onClick={onRight2} className='absolute right-0 top-1/2 w-10 -translate-y-1/2 cursor-pointer text-center text-4xl text-black'>▶</button>
      </div>
{/* 
      <h3>따끈따끈한 신작 리뷰 ★</h3>
      <button onClick={onLeft}>◀</button>
      {/* {reviews(x)} 댓글 id 내림차순으로 나열 한 12개까지, 2페이지로 구성, 앞뒤 연결되어 있어서 반복(루프)*/}
      {/* 댓글 데이터 씹에바치네 줴줴이야 */}
      {/* <button onClick={onRight}>▶</button>  */}


    </div>
  )
}

export default MainPage