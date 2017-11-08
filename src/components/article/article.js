import React from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'
import { formatLink } from '../util/util'

const Article = props => (
	<article className="r-too">
		<h1>
			<Link to={ formatLink( props.link ) }  >

				{ props.title.rendered }
			</Link>
		</h1>
		<div className="post-content">
			{ props.content.rendered }
		</div>
	</article>
)

// class Article extends Component {

// 	render() {

// 		// const link = formatLink( 'foo' );

// 		return (
// 			<article className="r-too">
// 				<h1>
// 					<Link to={ 'link' }  >
// 						{ props.title.rendered }
// 					</Link>
// 				</h1>
// 				<div className="post-content">
// 					{ props.content.rendered }
// 				</div>
// 			</article>
// 		);
// 	}
// }

export default Article;