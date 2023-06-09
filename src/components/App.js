import React from "react"
import {Route, Routes} from "react-router-dom"

import ContentWrap from "./content/ContentWrap"
import {ROUTES} from "../globalConstants"
import AdminPage from "./admin/AdminPage"

export default function App() {
  return (
    <div id="App" className="h-100">
      <Routes>
          <Route path={ ROUTES.main } element={ <ContentWrap /> } />
          <Route path={ ROUTES.admin } element={ <AdminPage /> } />
      </Routes>
    </div>
  )
}
