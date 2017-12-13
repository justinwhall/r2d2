import React from 'react'
import { Component } from "react"
import { formatLink } from '../../util/util'
import Title from '../title'
import Meta from '../meta'

class Article extends Component {

	render() {

		const html = this.props.type == 'attachment' ? this.props.description.rendered : this.props.content.rendered

		return (
			<article className="r-too">
				<Title title={ this.props.title.rendered } />
				{ this.props.type === 'post' && <Meta date={ this.props.date } { ...this.props._embedded } /> }
				<div className="post-content" dangerouslySetInnerHTML={ { __html: html } }></div>
			</article>
		)
	}

}

export default Article;