import { apiClient } from ".";

export const getPrefer = async (shortId: string) => {
  return await apiClient({
    method: 'get',
    url: `/report/prefer/${shortId}`
  })
}

export const getDist = async (shortId: string) => {
  return await apiClient({
    method: 'get',
    url: `/report/dist/${shortId}`
  })
}