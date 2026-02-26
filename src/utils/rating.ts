/* eslint-disable @typescript-eslint/no-explicit-any */
export const averageRating = (ratings: number[]) => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
};

export const ratingDistribution = (feedback: any[]) =>
  [5, 4, 3, 2, 1].reduce(
    (acc, star) => {
      acc[star] = feedback.filter((fd: any) => fd.rating === star).length;
      return acc;
    },
    {} as Record<number, number>,
  );
