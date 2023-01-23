import { Container, Nav, Navbar } from 'react-bootstrap';
import { routersList } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router';

export const BillingNavBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			bg='white'
			variant='white'
			className='pb-0'>
			<Container fluid>
				<Navbar.Brand className='border-end px-4'>App</Navbar.Brand>
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
					{/* <Nav>
						<div className='px-3'>Developer</div>
					</Nav> */}
					{/* <Nav>
            <NavDropdown title={userTitle} menuVariant='light'>
              <NavDropdown.Item>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => alert('logout')}>
                <i className='bi bi-box-arrow-left' />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
