import React from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'
import { formatLink, formatDate } from '../../util/util'

const Meta = props => (
	<div className="r-too m-bottom-4 meta">
		<span className="author">
			<Link to={ formatLink( props.author[ 0 ].link ) } >{ props.author[ 0 ].name }</Link>
		</span>
		<span> • </span>
		<span className="date">{ formatDate( props.date ) }</span>
		<div className="terms">
			{ props[ 'wp:term' ][ 0 ].map( ( term ) => {
				return <Link key={ term.id } to={ formatLink( term.link ) } > { term.name } </Link>
			} ) }
		</div>
	</div>
)

export default Meta