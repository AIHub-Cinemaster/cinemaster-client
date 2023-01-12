import { apiClient } from ".";

export const getRandomIds = async () => {
  return await apiClient({
    method: "get",
    url: `/eval/20`,
  })
};