import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './containers/app/appReducer'
import nav from './containers/nav/navReducer'

export default combineReducers( {
	router: routerReducer,
	app,
	nav
} )
