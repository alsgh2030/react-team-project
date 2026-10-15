import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContextPro";
import { Moon, Sun } from "lucide-react";
import SearchBar from "./components/SearchBar";

const Navibar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const to_myPage = () => {
    navigate("/mypage");
  };

  const logout1 = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full border-b font-sans transition-colors duration-200 ${
        darkMode
          ? "bg-[#181818]/95 text-neutral-100 border-neutral-800"
          : "bg-white/95 text-neutral-900 border-neutral-200"
      }`}
    >
      <div className="mx-auto flex min-h-16 max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-2">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 bg-rose-600 rounded-lg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#fff"
                aria-hidden="true"
              >
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
              </svg>
            </span>

            <span className="text-[21px] font-black tracking-tight whitespace-nowrap">
              민호 <span className="text-rose-600">무비</span>
            </span>
          </a>

          <div className="flex items-center gap-1 text-[15px] font-medium">
            <Link
              to="/movieList"
              className={`px-3 py-2 rounded-lg transition-colors ${darkMode ? "text-neutral-400 hover:text-white hover:bg-neutral-800" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"}`}
            >
              영화 리스트
            </Link>

            <Link
              to="/reviewList"
              className={`px-3 py-2 rounded-lg transition-colors ${darkMode ? "text-neutral-400 hover:text-white hover:bg-neutral-800" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"}`}
            >
              리뷰 리스트
            </Link>
          </div>
        </div>

        {/* 오른쪽: 검색창 + 다크모드 + 계정 버튼 */}
        <div className="flex flex-wrap items-center gap-2">
          <SearchBar />

          {/* 다크모드 전환 버튼 */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
            title={darkMode ? "라이트 모드" : "다크 모드"}
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors ${
              darkMode
                ? "text-amber-300 hover:bg-neutral-800"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!currentUser && (
            <div className="flex items-center gap-1">
              <Link
                to="/login"
                className={`flex items-center h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                  darkMode
                    ? "text-neutral-300 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                로그인
              </Link>

              <Link
                to="/signup"
                className="flex items-center h-9 px-4 rounded-lg bg-rose-600 text-white text-sm font-bold transition-colors hover:bg-rose-700"
              >
                회원가입
              </Link>
            </div>
          )}

          {currentUser && (
            <div className="flex items-center gap-1">
              <button
                onClick={to_myPage}
                className={`h-9 px-4 rounded-lg text-sm font-bold cursor-pointer transition-colors ${
                  darkMode
                    ? "bg-neutral-800 text-white hover:bg-neutral-700"
                    : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                }`}
              >
                마이페이지
              </button>

              <button
                onClick={logout1}
                className={`h-9 px-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                  darkMode
                    ? "text-neutral-400 hover:text-rose-400"
                    : "text-neutral-500 hover:text-rose-600"
                }`}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
