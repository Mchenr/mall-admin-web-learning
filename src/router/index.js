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
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: { title: '商品', icon: 'product' },
    children: [
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/table/index'),
        meta: { title: '商品列表', icon: 'product-list' }
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/table/index'),
        meta: { title: '添加商品', icon: 'product-add' }
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/table/index'),
        meta: { title: '商品分类', icon: 'product-cate' }
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: { title: '商品类型', icon: 'product-attr' }
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: { title: '品牌管理', icon: 'product-brand' }
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: { title: '添加品牌' },
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: { title: '编辑品牌' },
        hidden: true
      }
    ]
  },

  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: { title: '订单', icon: 'order' },
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/form/index'),
        meta: { title: '订单列表', icon: 'product-list' }
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/form/index'),
        meta: { title: '订单设置', icon: 'order-setting' }
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/form/index'),
        meta: { title: '退货申请处理', icon: 'order-return' }
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/form/index'),
        meta: { title: '退货原因设置', icon: 'order-return-reason' }
      }
    ]
  },

  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/flash',
    name: 'sms',
    meta: {
      title: '营销',
      icon: 'sms'
    },
    children: [
      {
        path: 'flash',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'flash',
        meta: { title: '秒杀活动列表', icon: 'sms-flash' }
      },
      {
        path: 'coupon',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'coupon',
        meta: { title: '优惠券列表', icon: 'sms-coupon' }
      },
      {
        path: 'brand',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'brand',
        meta: { title: '品牌推荐', icon: 'product-brand' }
      },
      {
        path: 'new',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'new',
        meta: { title: '新品推荐', icon: 'sms-new' }
      },
      {
        path: 'hot',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'hot',
        meta: { title: '人气推荐', icon: 'sms-hot' }
      },
      {
        path: 'subject',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'subject',
        meta: { title: '专题推荐', icon: 'sms-subject' }
      },
      {
        path: 'advertise',
        component: () => import('@/views/nested/menu2/index'),
        name: 'advertise',
        meta: { title: '广告列表', icon: 'sms-ad' }
      }
    ]
  },

  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: { title: '权限', icon: 'ums' },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/form/index'),
        meta: { title: '用户列表', icon: 'ums-admin' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/form/index'),
        meta: { title: '角色列表', icon: 'ums-role' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/form/index'),
        meta: { title: '菜单列表', icon: 'ums-menu' }
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/form/index'),
        meta: { title: '资源列表', icon: 'ums-resource' }
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
