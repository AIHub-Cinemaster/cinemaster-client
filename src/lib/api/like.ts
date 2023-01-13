import { apiClient } from ".";

export const setlike = async (shortId: string, reviewId: string) => {
  return await apiClient({
    method: 'post',
    url: '/like',
    data: {
      shortId,
      reviewId
    }
  })
}