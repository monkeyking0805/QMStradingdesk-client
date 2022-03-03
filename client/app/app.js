import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './config/configureStore'
import { LOGOUT } from './actions/auth_actions'
import { clientPath } from './constants/clientPath'
import history from './helpers/historyHelper'
import axios from 'axios'
import { ToastProvider } from 'react-toast-notifications'
import { LOG_ROCKET } from '../app/config/environment'
import '@babel/polyfill'
import LogRocket from 'logrocket'
LogRocket.init(LOG_ROCKET)

const { store, persistor } = configureStore()
const MOUNT_NODE = document.getElementById('app')

const UNAUTHORIZED = 401
const { dispatch } = store
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response
    if (status === UNAUTHORIZED) {
      dispatch({ type: LOGOUT })
      history.push(clientPath.auth.login)
    } else {
      return Promise.reject(error)
    }
  }
)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider placement='bottom-right'>
        <AppRouter />
      </ToastProvider>
    </PersistGate>
  </Provider>,
  MOUNT_NODE
)
