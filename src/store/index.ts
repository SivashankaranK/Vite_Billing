import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		const middleware: Middleware[] = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
		if (process.env.NODE_ENV === 'development') {
			middleware.push(logger);
		}
		return middleware;
	},
});

sagaMiddleware.run(rootSaga);

export default store;
