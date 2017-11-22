import React, { Component } from 'react';

class SearchForm extends Component {

	getValue() {
		return this.refs.r2d2Search.value;
	}

	render() {
		return (
			<form action="/search/" className="search-form" onSubmit={ this.props.onSubmit }>
				<div className="row">
					<div className="column column-75">
						<input className="search-field" type="text" name="r2d2Search" ref="r2d2Search" defaultValue={ this.props.initialQuery } />
					</div>
					<div className="column">
						<input type="submit" className="btn" value="Search" />
					</div>
				</div>
			</form>
		);
	}
}

export default SearchForm;