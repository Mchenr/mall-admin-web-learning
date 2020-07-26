import request from '@/utils/request'

export function listAttrCate(params) {
  return request({
    url: '/productAttrCategory/listAttrCate',
    method: 'get',
    params: params
  })
}

export function createAttrCate(data) {
  return request({
    url: '/productAttrCategory/createAttrCate',
    method: 'post',
    data: data
  })
}

export function updateAttrCate(id, data) {
  return request({
    url: '/productAttrCategory/updateAttrCate/' + id,
    method: 'post',
    data: data
  })
}

export function getItem(id) {
  return request({
    url: '/productAttrCategory/getItem/' + id,
    method: 'get'
  })
}

export function deleteAttrCate(id) {
  return request({
    url: '/productAttrCategory/deleteAttrCate/' + id,
    method: 'get'
  })
}

