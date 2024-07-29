import request from '../js/request'

// 获取列表
export function offline_device(data) {
  return request({
    url: `/index/Webhook/offline_device`,
    method: 'post',
    data: data
  })
}
