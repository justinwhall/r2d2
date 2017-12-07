import React from 'react'
import { Component } from "react"
import { formatDate } from '../../util/util'

const Comment = props => (
	<div id={ `comment-${ props.id }` } className="single-comment">
		<div className="row">
			<div className="column column-25">
				<span className="vcard">
					<img class="avatar" src={ props.author_avatar_urls[ '96' ] } />
					<div className="author-name">{ props.author_name }</div>
				</span>
				<div className="comment-date">{ formatDate( props.date ) }</div>
			</div>
			<div className="column">
				<div className="comment-content" dangerouslySetInnerHTML={ { __html: props.content.rendered } }></div>
			</div>
		</div>
	</div >
)

export default Comment;