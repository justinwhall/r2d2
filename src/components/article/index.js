import React from 'react'
import { Component } from "react"
import { formatLink } from '../../util/util'
import Title from '../title'
import Meta from '../meta'

const Article = props => (
	<article className="r-too">
		<Title title={ props.title.rendered } />
		{ props.type === 'post' && <Meta date={ props.date } { ...props._embedded } /> }
		<div className="post-content" dangerouslySetInnerHTML={ { __html: props.content.rendered } }></div>
	</article>
)

export default Article;