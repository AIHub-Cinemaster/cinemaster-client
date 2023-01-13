import { apiClient } from ".";

export const sendCreateReview = async (review: {}) => {
  return await apiClient({
    method: 'post',
    url: `/review/add`,
    data: review
  })
}

export const deleteReview = async (shortId: string, movieId: string) => {
  return await apiClient({
    method: 'post',
    url: `/review/delete`,
    data: {
      shortId,
      movieId
    }
  })
}

export const getReview = async (shortId: string, reviewId: string) => {
  return await apiClient({
    method: 'get',
    url: `/review/find/${shortId}/${reviewId}`
  })
}

export const updateReview = async (data: {}) => {
  return await apiClient({
    method: 'post',
    url: `/review/update`,
    data
  })
}

export const getReviewsByUser = async(shortId: string) => {
  return await apiClient({
    method: 'get',
    url: `/review/user/${shortId}`,
  })
}