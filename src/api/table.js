import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/brand/list',
    method: 'get',
    params: params
  })
}

export function changeFactoryStatus(params) {
  return request({
    url: '/brand/update/factoryStatus',
    method: 'post',
    params
  })
}

export function changeShowStatus(params) {
  return request({
    url: '/brand/update/showStatus',
    method: 'post',
    params
  })
}
