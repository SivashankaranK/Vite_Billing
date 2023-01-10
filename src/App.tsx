import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider
				breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
				minBreakpoint='xxs'>
				<AppRoutes />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
