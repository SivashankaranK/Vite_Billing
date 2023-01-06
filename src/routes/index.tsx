import { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BillingNavBar } from '../containers/header'
import { routersList } from '../utils/constants'
import { Col, Container, Row } from 'react-bootstrap'

export const AppRoutes = () => {
  const location = window.location

  useEffect(() => {
    if (location.pathname === '/') {
      window.location.assign(`${location.origin}/customers`)
    }
  }, [location])

  return (
    <BrowserRouter>
      <BillingNavBar />
      <Container fluid>
        <Row>
          <Col className='m-3'>
            <Routes>
              {routersList.map((it, index) => {
                const ActiveComponent = it.component
                return (
                  <Route
                    key={`route${index}`}
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
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}
