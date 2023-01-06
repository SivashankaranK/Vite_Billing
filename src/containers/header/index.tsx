import { Container, Nav, NavDropdown, Navbar, Image } from 'react-bootstrap'
import { navBarItems } from '../../utils/constants'
import { useLocation, useNavigate } from 'react-router'

export const BillingNavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container fluid>
        <Navbar.Brand>Billing</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {navBarItems.map((it, index) => {
              return (
                <Nav.Link
                  className='cur-pointer'
                  key={`nav${index}`}
                  active={location.pathname === `/${it.value}`}
                  onClick={() => navigate(`/${it.value}`)}
                >
                  {it.label}
                </Nav.Link>
              )
            })}
          </Nav>
          <Nav>
            <div className='text-white'>Developer</div>
          </Nav>
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
  )
}
