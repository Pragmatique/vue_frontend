import { HTTP } from './common'
export const Shop = {
  createShop (config) {
    return HTTP.post('/shops/', config).then(response => {
      return response.data
    })
  },
  deleteShop (id) {
    return HTTP.delete(`/shops/${id}/`)
  },
  getShop (id) {
    return HTTP.get(`/shops/${id}/`)
  },
  list () {
    return HTTP.get('/shops/').then(response => {
      return response.data
    })
  },
}
