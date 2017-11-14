import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import nav from './containers/nav/navReducer'
import page from './containers/pagePost/pagePostReducer'
import term from './containers/term/termReducer'
import author from './containers/author/authorReducer'

export default combineReducers( {
	router: routerReducer,
	nav,
	page,
	term,
	author
} )
