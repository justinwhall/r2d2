import React from 'react'
import { Component } from "react"
import { formatLink } from '../../util/util'

const Article = props => (
	<article className="r-too">
		<h1 className="p-bottom-none">
			{ props.title.rendered }
		</h1>
		<div className="post-content" dangerouslySetInnerHTML={ { __html: props.content.rendered } }></div>
	</article>
)

export default Article;