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
    <div className="flex min-h-[calc(100vh-64px)] items-start justify-center bg-[#f2f3f6] px-6 pt-20 dark:bg-[#181818]">
      <form onSubmit={onsubmit1} className="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-9 text-neutral-900 dark:border-neutral-800 dark:bg-[#222222] dark:text-white">
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight">회원가입</h1>
        <input
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] outline-none transition placeholder:text-neutral-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-neutral-700 dark:placeholder:text-neutral-500"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] outline-none transition placeholder:text-neutral-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-neutral-700 dark:placeholder:text-neutral-500"
        />
        <button className="mt-2 h-12 w-full cursor-pointer rounded-xl bg-rose-600 text-base font-bold text-white transition-colors hover:bg-rose-700">회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;