import React, { useState } from "react";
import { useAuth } from "../../AuthContextPro";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const onsubmit2 = (e) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    e.preventDefault();

    const loginUser = users.find(
      (user) => user.userId === userId && user.password === password,
    );

    if (loginUser) {
      setCurrentUser(loginUser);
      localStorage.setItem("currentUser", JSON.stringify(loginUser));

      setUserId("");
      setPassword("");

      navigate("/");
    } else {
      alert("아이디 또는 비밀번호 오류");
    }
  };

  return (
    <div>
      <form onSubmit={onsubmit2}>
        <h1>로그인</h1>
        <input
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;