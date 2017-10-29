import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getNavItems,
} from './navActions'

class Nav extends Component {

	componentWillMount() {
		this.props.getNavItems('/wp-json/r2d2/menu')
	}

	getNavLinks( navItems ) {

		const nav = navItems.map( function ( item, i ) {
			return <Link key={i} to={ item.uri }>{ item.title }</Link>
		} );

		return nav;
	}

	render() {
		let navLinks = this.props.navItems ? this.getNavLinks( this.props.navItems ) : false;

		return (
			<nav>
				{navLinks}
			</nav>
		);
	}
}

const mapStateToProps = state => ({
  navItems: state.nav.navItems
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getNavItems
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
