import React, {useEffect} from "react"
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import {Provider, useDispatch} from "react-redux"
import {adminStore, landingStore} from "../redux/store"

import ContentWrap from "./content/ContentWrap"
import {ACTIVE_PANELS, HOST, ROUTES} from "../globalConstants"
import AdminPage from "./admin/AdminPage"
import Auth from "./admin/auth/Auth"
import useApi from "../hooks/useApi"
import setUsername from "../redux/actions/setUsername"

export default function App() {
  const performApiCall = useApi()
  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
      performApiCall(`${HOST}/api/login`, 'GET', null, null).then(responseData => {
          if (responseData.status == 200) {
              if (responseData.data.username !== null) {
                  dispatch(setUsername(responseData.data.username))
                  if (location.pathname === ROUTES.admin_auth) {
                      navigate(ROUTES.admin)
                  }
              }
              else {
                  if (location.pathname !== ROUTES.admin_auth && location.pathname !== ROUTES.main) {
                      navigate(ROUTES.admin_auth)
                  }
              }
          }
          else {
              if (location.pathname !== ROUTES.admin_auth && location.pathname !== ROUTES.main) {
                  navigate(ROUTES.admin_auth)
              }
          }
      })
  }, [location.pathname])

  return (
    <div id="App" className="h-100">
      <Routes>
          <Route path={ ROUTES.main } element={ <Provider store={ landingStore }><ContentWrap /></Provider> } />
          <Route path={ ROUTES.admin_auth } element={ <Auth /> } />
          <Route path={ ROUTES.admin } element={ <Provider store={ adminStore }><AdminPage admin_props={{
              active_panel: null,
              is_single: false
          }} /></Provider> } />
          <Route path={ ROUTES.admin_events } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.events,
                  is_single: false
              }} />
          </Provider> } />
          <Route path={ ROUTES.admin_organizers } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.organizers,
                  is_single: false
              }} />
          </Provider> } />
          <Route path={ ROUTES.admin_forum_programme } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.forum_programme,
                  is_single: false
              }} />
          </Provider> } />
          <Route path={ `${ROUTES.admin_events}/:id` } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.events,
                  is_single: true
              }} />
          </Provider> } />
          <Route path={ `${ROUTES.admin_organizers}/:id` } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.organizers,
                  is_single: true
              }} />
          </Provider> } />
          <Route path={ `${ROUTES.admin_forum_programme}/:id` } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.forum_programme,
                  is_single: true
              }} />
          </Provider> } />
          <Route path={ `${ROUTES.admin_events}${ROUTES.admin_create}` } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.events,
                  is_single: true
              }} />
          </Provider> } />
          <Route path={ `${ROUTES.admin_organizers}${ROUTES.admin_create}` } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.organizers,
                  is_single: true
              }} />
          </Provider> } />
          <Route path={ `${ROUTES.admin_forum_programme}${ROUTES.admin_create}` } element={ <Provider store={ adminStore }>
              <AdminPage admin_props={{
                  active_panel: ACTIVE_PANELS.forum_programme,
                  is_single: true
              }} />
          </Provider> } />
      </Routes>
    </div>
  )
}
