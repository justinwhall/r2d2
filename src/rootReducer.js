import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import nav from './components/nav/navReducer'
import page from './components/page/pageReducer'

export default combineReducers({
  router: routerReducer,
  nav,
  page
})
