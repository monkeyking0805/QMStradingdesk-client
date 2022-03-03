import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import LogRocket from 'logrocket'

/*
  ignore form, searchAsset because need to refresh if page refresh
*/
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, logger, LogRocket.reduxMiddleware())
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
