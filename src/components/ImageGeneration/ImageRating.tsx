import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface Props {
  imageId: string;
  currentRating?: number;
  onRate: (imageId: string, rating: number) => Promise<void>;
}

export const ImageRating: React.FC<Props> = ({ imageId, currentRating = 0, onRate }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(imageId, star)}
          className="focus:outline-none"
        >
          <StarIcon
            className={`h-5 w-5 ${
              star <= (currentRating || 0)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}; 