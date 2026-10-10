import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);   // 마우스를 올린 상태의 별점
  const totalStars = 5;

  const activeValue = hover || rating; // 현재 화면에 보여줄 별점 기준

  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg w-fit">
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1; // 현재 별의 기준 정수 값 (1, 2, 3, 4, 5)
          
          // 별의 채워짐 상태 조건 분기
          const isFull = starValue <= activeValue;
          const isHalf = !isFull && (starValue - 0.5) <= activeValue;

          return (
            <div
              key={index}
              className="relative w-8 h-8 transition-transform duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              {/* [기본 배경] 비어있는 회색 별 */}
              <Star
                size={32}
                className="text-[#e4e5e9] fill-[#e4e5e9]"
              />

              {/* [오버레이] 조건에 따라 채워지는 노란색 별 */}
              <div
                className={`absolute top-0 left-0 h-full overflow-hidden text-[#ffc107] pointer-events-none ${
                  isFull ? "w-full" : isHalf ? "w-1/2" : "w-0"
                }`}
              >
                <Star
                  size={32}
                  className="text-[#ffc107] fill-[#ffc107]"
                />
              </div>

              {/* 왼쪽 절반 감지 영역 (0.5점 감소된 값) */}
              <div
                className="absolute top-0 left-0 w-1/2 h-full z-10"
                onMouseEnter={() => setHover(starValue - 0.5)}
                onClick={() => setRating(starValue - 0.5)}
              />

              {/* 오른쪽 절반 감지 영역 (온전한 정수 값) */}
              <div
                className="absolute top-0 right-0 w-1/2 h-full z-10"
                onMouseEnter={() => setHover(starValue)}
                onClick={() => setRating(starValue)}
              />
            </div>
          );
        })}
      </div>

      {/* 점수 표시 */}
      <span className="ml-2 text-lg font-bold text-gray-700 min-w-[45px]">
        {activeValue.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
