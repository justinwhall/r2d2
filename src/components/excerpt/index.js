import React from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'
import { formatLink } from '../../util/util'

const Excerpt = props => (
	<article className="r-too">
		<h1>
			<Link to={ formatLink( props.link ) }  >
				{ props.title.rendered }
			</Link>
		</h1>
		<div className="post-content" dangerouslySetInnerHTML={ { __html: props.excerpt.rendered } }></div>
	</article>
)

export default Excerpt;