import React from 'react'

class Letter extends React.Component {
	render() {
		return (
			<span className="btn" >{this.props.active ? this.props.value : '_'}</span>
		)
	}
}

export default Letter