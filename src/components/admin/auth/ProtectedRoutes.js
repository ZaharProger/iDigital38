import React, {useEffect} from "react"
import {Outlet, useLocation, Navigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import {HOST, ROUTES} from "../../../globalConstants"
import useApi from "../../../hooks/useApi"
import setUsername from "../../../redux/actions/setUsername"

export default function ProtectedRoutes() {
    const location = useLocation()

    const performApiCall = useApi()
    const dispatch = useDispatch()

    const currentUsername = useSelector(state => state.username)

    let component
    if (currentUsername !== null) {
        component = ROUTES.admin_auth === location.pathname?
            <Navigate to={ROUTES.admin} /> : <Outlet />
    }
    else {
        component = [ROUTES.admin, ROUTES.admin_auth].includes(location.pathname)?
            <Outlet /> : <Navigate to={ ROUTES.admin_auth } />
    }

    useEffect(() => {
        const headers = {
            'ngrok-skip-browser-warning': 'akjgorwgijeori'
        }
        performApiCall(`${HOST}/api/login`, 'GET', null, headers).then(responseData => {
            if (responseData.status == 200) {
                dispatch(setUsername(responseData.data.username))
            }
        })
    }, [location.pathname])

    return component
}