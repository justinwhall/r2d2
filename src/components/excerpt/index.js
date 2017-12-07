import React from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'
import { formatLink } from '../../util/util'
import Meta from '../meta';

const Excerpt = props => (
	<article className="r-too">
		<h2 className="m-bottom-none">
			<Link to={ formatLink( props.link ) }  >
				{ props.title.rendered }
			</Link>
		</h2>
		<Meta date={ props.date } { ...props._embedded } />
		<div className="post-content" dangerouslySetInnerHTML={ { __html: props.excerpt.rendered } }></div>
	</article>
)

export default Excerpt;