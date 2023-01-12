import { apiClient } from ".";

export const getReviewData = async (movieId: string) => {
  return await apiClient({
    method: "get",
    url: `/reviewlist/${movieId}`,
  })
};