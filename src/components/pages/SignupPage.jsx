import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onsubmit1 = (e) => {
    e.preventDefault();
    
    const user = { userId, password };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    setUserId("");
    setPassword("");

    navigate("/login");
  };

  return (
    <div>
      <form onSubmit={onsubmit1}>
        <h1>회원가입</h1>
        <input
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;