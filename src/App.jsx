import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './components/pages/MainPage'
import LoginPage from './components/pages/LoginPage'
import SearchBar from './components/SearchBar'
import SignupPage from './components/pages/SignupPage'
import ReviewForm from './components/ReviewForm'
import MyPage from './components/pages/MyPage'
import ReviewList from './components/ReviewList'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<SignupPage />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movie:id" element={<ReviewForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/review" element={<ReviewList />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
