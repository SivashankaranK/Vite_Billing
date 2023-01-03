import { lazy } from "react";

export const routersList = [
    {
        path: '/customers',
        component: lazy(() => import('../../container/customers'))
    },
    {
        path: '/items',
        component: lazy(() => import('../../container/items'))
    }
]