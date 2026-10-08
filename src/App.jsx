import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './components/pages/MainPage'
import LoginPage from './components/pages/LoginPage'
import SearchBar from './components/SearchBar'
import SignupPage from './components/pages/SignupPage'
import MyPage from './components/pages/MyPage'
import MovieDetail from './components/MovieDetail'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movie:id" element={<MovieDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
