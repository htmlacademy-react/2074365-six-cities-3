const MIN_RATING = 0;
const MAX_RATING = 5;


export const calculateRatingInPercent = (rating: number): number => {
  if (isNaN(rating)) {
    throw new Error('Рейтинг должен быть числом.');
  }

  if (rating < MIN_RATING || rating > MAX_RATING) {
    throw new Error('Рейтинг должен быть в диапазоне от 0 до 5.');
  }

  const roundedRating = Math.round(rating);
  return (roundedRating / MAX_RATING) * 100;
};
