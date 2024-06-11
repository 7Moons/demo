import request from '@/utils/request'

// 接口地址
const api = {
  login: '/auth/login', // 登录
  logout: '/auth/logout', // 退出登录
  info: '/user/info', // 获取用户信息
  editInfo: '/api/sales-order', // 编辑订单
  cancelOrder: '/api/sales-order/cancel', // 取消订单
  createOrder: '/api/sales-order/create', // 创建订单
  commentOrder: '/api/sales-order/comment', // 评论订单
  deleteComment: '/api/sales-order/delete', // 删除评论
}

// 登录
export function loginApi(parameter) {
  return request({
    url: api.login,
    method: 'post',
    data: parameter
  })
}

// 获取用户信息
export function infoApi(parameter) {
  return request({
    url: api.info,
    method: 'get',
    params: parameter
  })
}

// 退出登录
export function logoutApi(parameter) {
  return request({
    url: api.logout,
    method: 'post',
    data: parameter
  })
}

// 修改订单
export function editInfo(parameter) {
  return request({
    url: api.editInfo,
    method: 'post',
    data: parameter
  })
}

// 取消订单
export function cancelOrder(parameter) {
  return request({
    url: api.cancelOrder,
    method: 'post',
    data: parameter
  })
}

// 创建订单
export function createOrder(parameter) {
  return request({
    url: api.createOrder,
    method: 'post',
    data: parameter
  })
}

// 保存评论
export function commentOrder(parameter) {
  return request({
    url: api.commentOrder,
    method: 'post',
    data: parameter
  })
}

// 删除评论
export function deleteComment(parameter) {
  return request({
    url: api.deleteComment,
    method: 'post',
    data: parameter
  })
}
