import { RouteView, BasicLayout } from '@/layouts'

/**
 * @desc 权限路由表
 * */

const Empower = () => import(/* webpackChunkName: 'empower' */ '@/views/empower')
const Exception = () => import(/* webpackChunkName: 'exception' */ '@/views/exception')
const Promotion = () => import(/* webpackChunkName: 'promotion' */ '@/views/promotion')
const OrderManage = () => import(/* webpackChunkName: 'order-manage' */ '@/views/order-manage')
const OrderDetail = () => import(/* webpackChunkName: 'order-manage' */ '@/views/order-manage/Detail.vue')
const CommentMange = () => import(/* webpackChunkName: 'comment-manage' */ '@/views/comment-manage/index.vue')

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    meta: { keepAlive: true, isAuth: false },
    children: [
      {
        path: '/organize/order-manage',
        name: 'OrderManage',
        component: OrderManage,
        meta: { title: 'Order management', icon: 'ordered-list', keepAlive: true },
        hidden: false
      },
      {
        path: '/organize/order-detail/:id',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: { title: 'Order Detail', icon: 'ordered-list', keepAlive: true },
        hidden: true
      },
      {
        path: '/organize/comment-manage',
        name: 'CommentMange',
        component: CommentMange,
        meta: { title: 'Comment management', icon: 'form', keepAlive: true },
        hidden: false
      }
    ]
  }
]

// 基础路由
export const constantRouterMap = [
  {
    path: '/promotion',
    name: 'Promotion',
    component: Promotion,
    meta: { title: '推广页', isWhite: true }
  },
  {
    path: '/empower',
    name: 'Empower',
    component: Empower
  },
  // 异常处理
  {
    path: '/exception',
    name: 'Exception',
    component: Exception
  }
]
