import { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BillingNavBar } from '../containers/header'
import { routersList } from '../utils/constants'
import { Col, Container, Row } from 'react-bootstrap'
import { ProgressBar, Toastifier } from '../components'
import { useSelector } from 'react-redux'
import { IStore } from '../types/store'
import { useDispatch } from 'react-redux'
import { updateToasterMessage } from '../reducers'

export const AppRoutes = () => {
  const location = window.location
  const dispatch = useDispatch();

  const toasterMessage = useSelector((state: IStore) => state.common.toasterMessage);

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
                      <Suspense fallback={<ProgressBar isLoading={true} />}>
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
      <Toastifier enabled={!!toasterMessage} message={toasterMessage} setToasterState={() => dispatch(updateToasterMessage(''))} />
    </BrowserRouter>
  )
}
