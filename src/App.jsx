import React from "react";
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

const App = () => {
  return (
    <AuthContextPro>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/movie:id" element={<MovieDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/reviewList" element={<ReviewList />} />
          <Route path="/review/create" element={<ReviewForm />} />
          <Route path="/review/edit" element={<ReviewEdit />} />
        </Routes>
      </BrowserRouter>
    </AuthContextPro>
  );
};

export default App;
