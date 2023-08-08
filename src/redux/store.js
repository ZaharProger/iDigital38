import { configureStore } from '@reduxjs/toolkit'

import { initialLandingState, initialAdminState } from './initialState'
import { landingReducer, adminReducer } from './reducer.js'

export const landingStore = configureStore({ reducer: landingReducer, preloadedState: initialLandingState })
export const adminStore = configureStore({ reducer: adminReducer, preloadedState: initialAdminState })