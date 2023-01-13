import { apiClient } from ".";

export const getReviewsByMovie = async (movieId: string) => {
  return await apiClient({
    method: "get",
    url: `/reviewlist/${movieId}`,
  })
};