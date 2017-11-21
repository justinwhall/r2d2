import React from 'react'
import { Component } from "react"
import { formatLink } from '../../util/util'
import Title from '../../components/title'

const Article = props => (
	<article className="r-too">
		<Title title={ props.title.rendered } />
		<div className="post-content" dangerouslySetInnerHTML={ { __html: props.content.rendered } }></div>
	</article>
)

export default Article;