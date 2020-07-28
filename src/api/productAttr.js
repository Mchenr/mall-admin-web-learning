import request from '@/utils/request'

export function listAttrCate(params) {
  return request({
    url: '/productAttrCategory/listAttrCate',
    method: 'get',
    params: params
  })
}

export function createAttrCate(attrCateName) {
  return request({
    url: '/productAttrCategory/createAttrCate',
    method: 'post',
    params: { attrCateName }
  })
}

export function updateAttrCate(id, attrCateName) {
  return request({
    url: '/productAttrCategory/updateAttrCate/' + id,
    method: 'post',
    params: { attrCateName }
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

