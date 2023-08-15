import React from "react"
import {Route, Routes} from "react-router-dom"
import {Provider} from "react-redux"
import {adminStore, landingStore} from "../redux/store"

import ContentWrap from "./content/ContentWrap"
import {ACTIVE_PANELS, ROUTES} from "../globalConstants"
import AdminPage from "./admin/AdminPage"
import Auth from "./admin/auth/Auth"
import ProtectedRoutes from "./admin/auth/ProtectedRoutes"

export default function App() {
  return (
    <div id="App" className="h-100">
      <Routes>
          <Route path={ ROUTES.main } element={ <Provider store={ landingStore }><ContentWrap /></Provider> } />
          <Route element={ <Provider store={ adminStore }> <ProtectedRoutes /> </Provider> }>
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
          </Route>
      </Routes>
    </div>
  )
}
