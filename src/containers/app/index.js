import React from 'react';
import { Component } from "react";
import { Route, Link, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BLOG_PAGE, SITE_TITLE, SITE_DESCRIPTION } from '../../constants/settings'
import Post from '../post'
import Search from '../search'
import Blog from '../blog'
import Term from '../term'
import Nav from '../nav'
import Author from '../author'
import Attachment from '../attachment'
import NotFound from '../notFound'
import '../../styles/style.scss'

class App extends Component {

	componentWillUpdate( prevProps ) {
		if ( this.props.location.pathname !== prevProps.location.pathname ) {
			this.onRouteChanged();
		}
	}

	onRouteChanged() {
		this.props.dispatch( { type: 'RESET_STATE' } )
	}

	updateBodyClass() {
		const bodyClass = this.props.isLoading ? 'isLoading' : 'loaded';
		document.getElementById( 'site-wrapper' ).classList = bodyClass;
	}

	render() {
		this.updateBodyClass();
		const { user, homeIsBlog } = window.r2d2Settings;
		const appClass = user == 0 ? 'logged-out' : 'logged-in';
		const frontPage = homeIsBlog ? Blog : Post;
		const blogPath = homeIsBlog ? '/blog' : `/${ BLOG_PAGE }`;

		console.log( window.r2d2Settings );

		return (
			<div id="app" className={ appClass }>

				<div className="nav-wrap">
					<div className="container">
						<Nav />
					</div>
				</div>

				<div className="container">

					{ this.props.isLoading && <div className="loader"></div> }

					<main className="main">

						<Switch>
							<Route path="/:url*" exact strict render={ props => <Redirect to={ `${ props.location.pathname }/` } /> } />
							<Route exact path="/" component={ frontPage } />
							<Route exact path="/category/:catSlug/page/:offSet" component={ Term } />
							<Route exact path="/category/:catSlug" component={ Term } />
							<Route exact path="/tag/:tagSlug" component={ Term } />
							<Route exact path="/author/:authorSlug/page/:offSet" component={ Author } />
							<Route exact path="/author/:authorSlug" component={ Author } />
							<Route exact path={ `${ blogPath }/page/:offSet` } component={ Blog } />
							<Route exact path={ `${ blogPath }/` } component={ Blog } />
							{/* <Route exact path={ `/${ BLOG_PAGE }` } component={ Blog } /> */ }
							<Route exact path="/search/:query" component={ Search } />
							<Route exact path="/search" component={ Search } />
							<Route exact path="/attachment/:postSlug/:mediaID" component={ Attachment } />
							{/* <Route exact path="/([0-9]+)" component={ NotFound } /> */ }
							<Route exact path="/:postSlug" component={ Post } />
							<Route exact path="/**" component={ Post } />
							<Route component={ NotFound } />
						</Switch>

					</main>

				</div>

				<footer>
					<div className="container text-center">
						<span className="title">{ SITE_TITLE } </span>
						•
						<span className="title"> { SITE_DESCRIPTION } </span>
						•
						<span className="title"> <a href="https://github.com/justinwhall/r2d2" target="_blank"> GitHub </a></span>
						•
						<span className="title"> &copy; { new Date().getFullYear() }</span>
					</div>
				</footer>

			</div>
		)
	}
}

const mapStateToProps = function ( state ) {
	return {
		isLoading: state.app.mainContentIsLoading
	}
}

export default withRouter( connect(
	mapStateToProps,
)( App ) )