import React from 'react'


const sprites = [
	"img/0.png",
	"img/0-2.png",
	"img/0-1.png",
	"img/1.png",
	"img/2.png",
	"img/3.png",
	"img/4.png",
	"img/5.png",
	"img/6.png",
]

class Hangman extends React.Component {
	render() {
		return (
			<figure>
				<img src={sprites[this.props.sprite]} alt="Hangman" />
			</figure>
		)
	}

}

export default Hangman