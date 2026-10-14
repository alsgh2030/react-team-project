import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);   // 마우스를 올린 상태의 별점
  const totalStars = 5;

  const activeValue = hover || rating; // 현재 화면에 보여줄 별점 기준

  return (
    <div className="flex items-center gap-3 py-2 w-fit transition-colors duration-200">
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1; // 현재 별의 기준 정수 값 (1, 2, 3, 4, 5)

          // 별의 채워짐 상태 조건 분기
          const isFull = starValue <= activeValue;
          const isHalf = !isFull && (starValue - 0.5) <= activeValue;

          return (
            <div
              key={index}
              className="relative w-9 h-9 transition-transform duration-150 transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              {/* [기본 배경] 비어있는 회색 별 */}
              <Star
                size={36}
                className="text-neutral-200 fill-neutral-200 dark:text-neutral-700 dark:fill-neutral-700"
              />

              {/* [오버레이] 조건에 따라 채워지는 노란색 별 */}
              <div
                className={`absolute top-0 left-0 h-full overflow-hidden text-rose-600 pointer-events-none ${
                  isFull ? "w-full" : isHalf ? "w-1/2" : "w-0"
                }`}
              >
                <Star
                  size={36}
                  className="text-rose-600 fill-rose-600"
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
      <span className="text-xl font-bold text-neutral-900 dark:text-white min-w-[40px]">
        {activeValue.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;