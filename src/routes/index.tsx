import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { BillingNavBar } from "../layout/header";
import { routersList } from "../utils/constants";

export const AppRoutes = () => {

    const location = window.location;

    useEffect(() => {
        if (location.pathname === '/') {
            window.location.assign(`${location.origin}/customers`)
        }
    }, [location])

    return (
        <BrowserRouter>
            <BillingNavBar />
            <Routes>
                {routersList.map((it, index) => {
                    const ActiveComponent = it.component;
                    return (
                        <Route
                            key={index}
                            path={it.path}
                            element={
                                <Suspense fallback='Loading...'>
                                    <ActiveComponent />
                                </Suspense>
                            }
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}