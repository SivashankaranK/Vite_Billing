import { Navbar, Text, Avatar, Dropdown } from '@nextui-org/react';
import { navBarItems } from '../../utils/constant';
import { useLocation, useNavigate } from 'react-router';

export const BillingNavBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  return (

    <Navbar isBordered css={{ background: 'none' }} variant='floating'>
      <Navbar.Brand>
        <Text b color='inherit' hideIn='xs'>
          VITE JS
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn='xs' variant='highlight'>
        {navBarItems.map((it, index) => {
          return (
            <Navbar.Link
              key={index}
              css={{ cursor: 'pointer' }}
              isActive={location.pathname === `/${it.value}`}
              onClick={() => navigate(`/${it.value}`)}
            >
              {it.label}
            </Navbar.Link>
          )
        })}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Dropdown placement='bottom-right'>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as='button'
                size='md'
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label='User menu actions'
              color='secondary'
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key='profile' css={{ height: '$18' }}>
                <Text b color='inherit' css={{ d: 'flex' }}>
                  Signed in as
                </Text>
                <Text b color='inherit' css={{ d: 'flex' }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key='logout' withDivider color='error'>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}
