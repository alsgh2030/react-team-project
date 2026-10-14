import React from 'react'
import { Star } from 'lucide-react'

const StarDisplay = ({ score = 0, size = 20 }) => {
  return (
    <div className='flex gap-0.5'>
      {[1, 2, 3, 4, 5].map((n) => {
        const isFull = n <= score
        const isHalf = !isFull && n - 0.5 <= score

        return (
          <div key={n} className='relative' style={{ width: size, height: size }}>
            <Star size={size} className='text-neutral-200 fill-neutral-200 dark:text-neutral-700 dark:fill-neutral-700' />
            <div className={`absolute left-0 top-0 h-full overflow-hidden ${isFull ? 'w-full' : isHalf ? 'w-1/2' : 'w-0'}`}>
              <Star size={size} className='text-rose-600 fill-rose-600' />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StarDisplay