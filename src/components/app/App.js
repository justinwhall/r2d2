import React from 'react';
import { Route, Link } from 'react-router-dom'
import Page from '../page/Page'
import Nav from '../nav/Nav'
import r2d2 from '../r2d2/r2d2'
import '../../styles/App.css'

const App = () => (
	<div>

		<Nav />

		<main>
			<Route exact path="/" component={r2d2} />
			<Route exact path="/:pageSlug" component={ Page } />

		</main>

	</div>
)

export default App