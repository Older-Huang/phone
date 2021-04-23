import Home from 'views/home/Home'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },{
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            showTabbar: true
        }
    },{
        path: '/cart',
        name: 'cart',
        component: () => import('views/cart/Cart'),
        meta: {
            isLogin: true
        }
    },{
        path: '/me',
        name: 'me',
        component: () => import('views/me/Me'),
        meta: {
            showTabbar: true
        }
    },{
        path: '/detail',
        name: 'detail',
        component: () => import('views/detail/detail')
    },{
        path: '/login',
        name: 'login',
        component: () => import('views/login/login')
    },{
        path: '/orderConfirm',
        name: 'orderConfirm',
        component: () => import('views/order/orderConfirm'),
        meta: {
            isLogin: true
        }
    },{
        path: '/addressList',
        name: 'addressList',
        component: () => import('views/address/addressList'),
        meta: {
            isLogin: true
        }  
    },{
        path: '/addressEdit',
        name: 'addressEdit',
        component: () => import('views/address/addressEdit'),
        meta: {
            isLogin: true
        }
    },{
        path: '/paySuccess',
        name: 'paySuccess',
        component: () => import('components/paySuccess'),
        meta: {
            isLogin: true
        }
    },{
        path: '/orderInfo',
        name: 'orderInfo',
        component: () => import('views/order/orderInfo'),
        meta: {
            isLogin: true
        }
    },{
        path: '/orderList',
        name: 'orderList',
        component: () => import('views/order/orderList'),
        meta: {
            isLogin: true
        }
    },{
        path: '/likeList',
        name: 'likeList',
        component: () => import('views/like/likeList'),
        meta: {
            isLogin: true
        }
    },{
        path: '/setting',
        name: 'setting',
        component: () => import('views/setting/setting'),
        meta: {
            isLogin: true
        }
    },{
        path: '/setNickName',
        name: 'setNickName',
        component: () => import('views/setting/setNickName'),
        meta: {
            isLogin: true
        }
    },{
        path: '/setAvatar',
        name: 'setavatar',
        component: () => import('views/setting/setAvatar'),
        meta: {
            isLogin: true
        }
    },{
        path: '/setLoginPassword',
        name: 'setLoginPassword',
        component: () => import('views/setting/setLoginPassword'),
        meta: {
            isLogin: true
        }
    },{
        path: '/setPayPassword',
        name: 'setPayPassword',
        component: () => import('views/setting/setPayPassword'),
        meta: {
            isLogin: true
        }
    },{
        path: '/citySelect',
        name: 'citySelect',
        component: () => import('views/city/citySelect'),
        meta: {
            isLogin: true
        }
    },{
        path: '/search',
        name: 'search',
        component: () => import('views/search/search'),
        meta: {
            isLogin: true
        }
    }
]

export default routes