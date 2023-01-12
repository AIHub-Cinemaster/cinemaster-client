import { apiClient } from ".";

export const getCart = async (shortId: string) => {
  return await apiClient({
    method: "get",
    url: `/cart/list/${shortId}`,
  })
}

export const setCart = async (shortId: string , movieId: string) => {
  return await apiClient({
    method: "post",
    url: `/cart/toggle`,
    data: {
      shortId,
      movieId
    }
  })
}