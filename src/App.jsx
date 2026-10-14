import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import SearchBar from "./components/SearchBar";
import SignupPage from "./components/pages/SignupPage";
import MyPage from "./components/pages/MyPage";
import MovieDetail from "./components/MovieDetail";
import Navibar from "./Navibar";
import { AuthContextPro } from "./AuthContextPro";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import ReviewEdit from "./components/ReviewEdit";
import MovieListPage from "./components/pages/MovieListPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <AuthContextPro>
      <BrowserRouter>
        <Navibar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/reviewList" element={<ReviewList />} />
          <Route path="/review/create" element={<ReviewForm />} />
          <Route path="/review/edit" element={<ReviewEdit />} />
          <Route path="/movieList" element={<MovieListPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextPro>
  );
};

export default App;
