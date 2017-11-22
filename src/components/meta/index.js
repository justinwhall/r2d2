import React from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'
import { formatLink } from '../../util/util'

const Meta = props => (
	<div className="r-too m-bottom-2 meta">
		<div className="author">
			<Link to={ formatLink( props.author[ 0 ].link ) } >{ props.author[ 0 ].name }</Link>
		</div>
		<div className="terms">
			{ props[ 'wp:term' ][ 0 ].map( ( term ) => {
				return <Link key={ term.id } to={ formatLink( term.link ) } > { term.name } </Link>
			} ) }
		</div>
		<div className="categories">
		</div>
	</div>
)

export default Meta