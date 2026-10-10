import React, { useState } from 'react'
const MainPage = () => {

  const onLeft=()=>{

  }
  const onRight=()=>{

  }


  const movies=JSON.parse(localStorage.getItem('movies'))
  const reviews=JSON.parse(localStorage.getItem('Reviews'))

  const shuffled = () => {
  const suf_mov = movies.map((x) => ({ ...x, key: Math.random() }))
  return suf_mov.sort((x, y) => x.key - y.key)
}
  const [random_movies,setRandomMovies]=useState(shuffled().slice(0,5))
  const [top_movie_List,setTop_moive_List]=useState(movies.filter((x)=>x.avgScore>4))


  return (
    <div>
      <button onClick={onLeft}>◀</button>
        {random_movies.map((x)=>{
        return <img key={x.id} src={x.poster} />  // 영화 목록 중 5개만? 나오게 ㅇㅇ 
        })}
      <button onClick={onRight}>▶</button>

      <hr></hr>
      <h3>현재 떠오르는 인기작들</h3>
      <button onClick={onLeft}>◀</button>
      {top_movie_List.map((x)=>{
        return <img key={x.id} src={x.poster}/>
      })} {/* 평점 3점 이상인 얘들 10개? 나열, 나머지는 영화 리스트?, 앞 뒤가 연결되어 있어서 반복(루프) */}
      <button onClick={onRight}>▶</button>

      <h3>따끈따끈한 신작 리뷰 ★</h3>
      <button onClick={onLeft}>◀</button>
      {/* {reviews(x)} 댓글 id 내림차순으로 나열 한 12개까지, 2페이지로 구성, 앞뒤 연결되어 있어서 반복(루프)*/}
      <button onClick={onRight}>▶</button>


    </div>
  )
}

export default MainPage
