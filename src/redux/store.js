import { configureStore } from '@reduxjs/toolkit'

import {initialLandingState, initialAdminState, initialAuthState} from './initialState'
import {landingReducer, adminReducer, authReducer} from './reducer.js'

export const landingStore = configureStore({ reducer: landingReducer, preloadedState: initialLandingState })
export const adminStore = configureStore({ reducer: adminReducer, preloadedState: initialAdminState })
export const authStore = configureStore({ reducer: authReducer, preloadedState: initialAuthState })