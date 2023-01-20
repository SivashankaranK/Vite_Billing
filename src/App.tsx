import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { Col, Container, Row, ThemeProvider } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { BillingNavBar } from './containers/header';
import { Toastifier } from './components';

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider
				breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
				minBreakpoint='xxs'>
				<BrowserRouter>
					<BillingNavBar />
					<Container fluid>
						<Row>
							<Col className='m-3'>
								<AppRoutes />
							</Col>
						</Row>
					</Container>
					<Toastifier />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
