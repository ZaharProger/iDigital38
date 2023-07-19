import React from "react"
import {Route, Routes} from "react-router-dom"

import ContentWrap from "./content/ContentWrap"
import {ACTIVE_PANELS, ROUTES} from "../globalConstants"
import AdminPage from "./admin/AdminPage"

export default function App() {
  return (
    <div id="App" className="h-100">
      <Routes>
          <Route path={ ROUTES.main } element={ <ContentWrap /> } />
          <Route path={ ROUTES.admin } element={ <AdminPage active_panel={ null } /> } />
          <Route path={ ROUTES.admin_events }
                 element={ <AdminPage active_panel={ ACTIVE_PANELS.events } /> } />
          <Route path={ ROUTES.admin_organizers }
                 element={ <AdminPage active_panel={ ACTIVE_PANELS.organizers } /> } />
          <Route path={ ROUTES.admin_forum_programme }
                 element={ <AdminPage active_panel={ ACTIVE_PANELS.forum_programme } /> } />
          <Route path={ `${ROUTES.admin_events}/:id` }
                 element={ <AdminPage active_panel={ ACTIVE_PANELS.events } /> } />
          <Route path={ `${ROUTES.admin_organizers}/:id` }
                 element={ <AdminPage active_panel={ ACTIVE_PANELS.organizers } /> } />
      </Routes>
    </div>
  )
}
