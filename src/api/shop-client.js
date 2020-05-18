import { HTTP } from './common'
export const Shopclient = {
  createShopclient (config) {
    return HTTP.post('/shop-clients/', config).then(response => {
      return response.data
    })
  },
  deleteShopclient (id) {
    return HTTP.delete(`/shop-clients/${id}/`)
  },
  getShopclient (id) {
    return HTTP.get(`/shop-clients/${id}/`)
  },
  listShopclient () {
    return HTTP.get('/shop-clients/').then(response => {
      return response.data
    })
  },
}