let adminRoute = [
    {
        path: '/layout',
        name: 'layout',
        redirect: '/group',
        component: 'layout',
        children: [
            {
                path: '/companySearch',
                name: 'companySearch',
                component: 'group/companySearch/index',
                meta: {
                    type: 'first',
                    name: '运单查询',
                    icon: 'Search'
                }
            },
            {
                path: '/adminCenter',
                name: 'adminCenter',
                component: 'group/adminCenter',
                meta: {
                    type: 'first',
                    name: '配置中心',
                    icon: 'Setting'
                }
            },
            {
                path: '/personCenter',
                name: 'PersonCenter',
                component: 'group/personCenter',
                meta: {
                    type: 'first',
                    name: '个人中心',
                    icon: 'UserFilled'
                }
            }
        ]
    },
]

let personRoute = [
    {
        path: '/layout',
        name: 'layout',
        redirect: '/sendExpressDelivery',
        component: 'layout',
        children: [
            {
                path: '/sendExpressDelivery',
                name: 'sendExpressDelivery',
                component: 'group/sendExpressDelivery/index',
                meta: {
                    type: 'first',
                    name: '寄快递',
                    icon: 'Box'
                }
            },
            {
                path: '/searchExpressDelivery',
                name: 'searchExpressDelivery',
                component: 'group/searchExpressDelivery/index',
                meta: {
                    type: 'first',
                    name: '运单查询',
                    icon: 'Search'
                }
            },
            {
                path: '/adminCenter',
                name: 'adminCenter',
                component: 'group/adminCenter',
                meta: {
                    type: 'first',
                    name: '配置中心',
                    icon: 'Setting'
                }
            },
            {
                path: '/personCenter',
                name: 'PersonCenter',
                component: 'group/personCenter',
                meta: {
                    type: 'first',
                    name: '个人中心',
                    icon: 'UserFilled'
                }
            }
        ]
    },
]
module.exports = {
    adminRoute,
    personRoute
}