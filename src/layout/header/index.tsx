import { Container, Nav, NavDropdown, Navbar, Image } from 'react-bootstrap';
import { navBarItems } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router';

export const BillingNavBar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const userTitle = (
    <span>
      <Image
        src={'https://via.placeholder.com/28?text=D'}
        roundedCircle
        width={40}
        height={40}
        className='p-2'
      />
      {'Developer'}
    </span>
  )
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">Billing</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {navBarItems.map((it, index) => {
              return (
                <Nav.Link
                  key={index}
                  style={{ cursor: 'pointer' }}
                  active={location.pathname === `/${it.value}`}
                  onClick={() => navigate(`/${it.value}`)}
                >
                  {it.label}
                </Nav.Link>
              )
            })}
          </Nav>
          <Nav>
            <NavDropdown title={userTitle} menuVariant='light'>
              <NavDropdown.Item>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => alert('logout')}>
                <i className='bi bi-box-arrow-left'/>
                 Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}
