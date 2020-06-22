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

export function createBrand(data) {
  return request({
    url: '/brand/create',
    method: 'post',
    data: data
  })
}

export function updateBrand(id, data) {
  return request({
    url: '/brand/update/' + id,
    method: 'post',
    data: data
  })
}

export function getBrand(id) {
  return request({
    url: '/brand/' + id,
    method: 'get'
  })
}

export function deleteBrand(id) {
  return request({
    url: '/brand/delete/' + id,
    method: 'get'
  })
}

