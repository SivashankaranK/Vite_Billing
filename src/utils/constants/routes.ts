import { lazy } from "react";

export const routersList = [
    {
        path: '/customers',
        component: lazy(() => import('../../containers/customers'))
    },
    {
        path: '/items',
        component: lazy(() => import('../../containers/items'))
    }
]