import React from "react"
import {Route, Routes} from "react-router-dom"

import ContentWrap from "./content/ContentWrap"
import {ACTIVE_PANELS, ROUTES} from "../globalConstants"
import AdminPage from "./admin/AdminPage"
import Auth from "./admin/Auth"

export default function App() {
  return (
    <div id="App" className="h-100">
      <Routes>
          <Route path={ ROUTES.main } element={ <ContentWrap /> } />
          <Route path={ ROUTES.admin } element={ <AdminPage admin_props={{
              active_panel: null,
              is_single: false
          }} /> } />
          <Route path={ ROUTES.admin_events } element={ <AdminPage admin_props={{
              active_panel: ACTIVE_PANELS.events,
              is_single: false
          }} /> } />
          <Route path={ ROUTES.admin_organizers } element={ <AdminPage admin_props={{
              active_panel: ACTIVE_PANELS.organizers,
              is_single: false
          }} /> } />
          <Route path={ ROUTES.admin_forum_programme } element={ <AdminPage admin_props={{
              active_panel: null,
              is_single: false
          }} /> } />
          <Route path={ `${ROUTES.admin_events}/:id` } element={ <AdminPage admin_props={{
              active_panel: ACTIVE_PANELS.events,
              is_single: true
          }} /> } />
          <Route path={ `${ROUTES.admin_organizers}/:id` } element={ <AdminPage admin_props={{
              active_panel: ACTIVE_PANELS.organizers,
              is_single: true
          }} /> } />
          <Route path={ `${ROUTES.admin_events}${ROUTES.admin_create}` } element={ <AdminPage admin_props={{
              active_panel: ACTIVE_PANELS.events,
              is_single: true
          }} /> } />
          <Route path={ `${ROUTES.admin_organizers}${ROUTES.admin_create}` } element={ <AdminPage admin_props={{
              active_panel: ACTIVE_PANELS.organizers,
              is_single: true
          }} /> } />
          <Route path={ ROUTES.admin_auth } element={ <Auth /> } />
      </Routes>
    </div>
  )
}
