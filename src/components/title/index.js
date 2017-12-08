import React from 'react'

const Title = props => (
	<header className="m-bottom-1 header">
		<h1 className="m-bottom-none">{ props.title }</h1>
		<div className="bar"></div>
		{ props.subHead && <small className="berry">{ props.subHead }</small> }
	</header>
)

export default Title