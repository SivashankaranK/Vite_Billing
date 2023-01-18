import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routersList } from '../utils/constants';
import { ProgressBar } from '../components';

export const AppRoutes = () => {
	const location = window.location;
	useEffect(() => {
		if (location.pathname === '/') {
			window.location.assign(`${location.origin}/customers`);
		}
	}, [location]);

	return (
		<Routes>
			{routersList.map((it, index) => {
				const ActiveComponent = it.component;
				return (
					<Route
						key={`route${index}`}
						path={it.path}
						element={
							<Suspense fallback={<ProgressBar isLoading={true} />}>
								<ActiveComponent />
							</Suspense>
						}
					/>
				);
			})}
		</Routes>
	);
};
