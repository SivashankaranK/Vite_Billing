import { Container, Nav, Navbar } from 'react-bootstrap';
import { routersList } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router';
import logo from '../../assets/images/logo.jpg';
export const BillingNavBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<Navbar
			collapseOnSelect={true}
			expand='lg'
			bg='white'
			variant='white'
			className='pb-0'>
			<Container fluid={true}>
				<Navbar.Brand className='border-end px-4'>
					<img
						src={logo}
						width={50}
						alt='Siva Sakthi Catering'
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='justify-content-around flex-grow-1 pe-3'>
						{routersList.map((it, index) => {
							return (
								<Nav.Link
									className='cur-pointer w-100 text-center rounded-top py-3'
									key={`nav${index}`}
									active={location.pathname === it.path}
									onClick={() => navigate(it.path)}>
									{it.navLabel}
								</Nav.Link>
							);
						})}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
