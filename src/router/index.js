import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/table',
    name: 'Example',
    meta: { title: '商品', icon: 'example' },
    children: [
      {
        path: 'product',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'addProduct',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '添加商品', icon: 'table' }
      },
      {
        path: 'productCate',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '商品分类', icon: 'table' }
      },
      {
        path: 'productAttr',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '商品类型', icon: 'table' }
      },
      {
        path: 'brand',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '品牌管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'Example',
    meta: { title: '订单', icon: 'example' },
    children: [
      {
        path: 'order',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '订单列表', icon: 'form' }
      },
      {
        path: 'orderSetting',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '订单设置', icon: 'form' }
      },
      {
        path: 'returnApply',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '退货申请处理', icon: 'form' }
      },
      {
        path: 'returnReason',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '退货原因设置', icon: 'form' }
      }
    ]
  },

  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/flash',
    name: 'Nested',
    meta: {
      title: '营销',
      icon: 'nested'
    },
    children: [
      {
        path: 'flash',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '秒杀活动列表', icon: 'form' }
      },
      {
        path: 'coupon',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '优惠券列表', icon: 'form' }
      },
      {
        path: 'brand',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '品牌推荐', icon: 'form' }
      },
      {
        path: 'new',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '新品推荐', icon: 'form' }
      },
      {
        path: 'hot',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '人气推荐', icon: 'form' }
      },
      {
        path: 'subject',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '专题推荐', icon: 'form' }
      },
      {
        path: 'advertise',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '广告列表', icon: 'form' }
      }
    ]
  },

  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'Example',
    meta: { title: '权限', icon: 'example' },
    children: [
      {
        path: 'admin',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '用户列表', icon: 'form' }
      },
      {
        path: 'role',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '角色列表', icon: 'form' }
      },
      {
        path: 'menu',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '菜单列表', icon: 'form' }
      },
      {
        path: 'resource',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '资源列表', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
