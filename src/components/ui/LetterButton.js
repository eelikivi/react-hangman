import React from 'react'

class LetterButton extends React.Component {
	render() {
		return (
			<button onClick={() => this.props.handleClick(this.props.value)} className="btn" disabled={this.props.clicked}>{this.props.value}</button>
		)
	}
}

export default LetterButton