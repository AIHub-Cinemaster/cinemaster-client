import { apiClient } from ".";

export const sendKakao = async (code: string) => {
  return await apiClient({
    method: 'get',
    url: '/auth/kakao',
    params: {
      code
    }
  })
}

export const sendNaver = async (code: string) => {
  return await apiClient({
    method: 'get',
    url: '/auth/naver',
    params: {
      code
    }
  })
}