import React from 'react';

import LetterButton from './components/ui/LetterButton'
import Letter from './components/ui/Letter'
import Hangman from './components/Hangman'

import './styles/app.css'

import letterData from './data/letterData';
import wordData from './data/wordData';

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			word: wordData[Math.floor(Math.random() * wordData.length)],
			usedLetters: [],
			hang: 0,
			lives: 8,
			score: 0,

			letterButtons: letterData.map((letter) => {
				return {
					letter: letter,
					clicked: false
				}
			}),
			gameover: false,
			win: false
		}
		this.handleBtnClick = this.handleBtnClick.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}

	resetGame() {
		this.setState(() => (
			{
				word: wordData[Math.floor(Math.random() * wordData.length)],
				usedLetters: [],
				hang: 0,
				lives: 8,
				score: 0,

				letterButtons: letterData.map((letter) => {
					return {
						letter: letter,
						clicked: false
					}
				}),
				gameover: false,
				win: false
			}
			)
		)
	}

	handleBtnClick(letter) {
		this.setState(prevState => {
			const updatedLetterButtons = prevState.letterButtons.map(btn => {
				if (btn.letter === letter) {
					btn.clicked = true
				}
				return btn
			})

			const updatedUsedLetters = prevState.usedLetters
			if (!prevState.usedLetters.includes(letter)) {
				updatedUsedLetters.push(letter)
			}

			return {
				usedLetters: updatedUsedLetters,
				letterButtons: updatedLetterButtons,
			}
		})


		this.setState(prevState => {
			if (!prevState.word.toLowerCase().split('').includes(letter.toLowerCase())) {
				return {
					hang: prevState.hang + 1
				}
			}
			else {
				const addScore = prevState.word.toLowerCase().split('').filter(l => l === letter.toLowerCase())
				return {
					score: prevState.score + addScore.length
				}
			}
		})

		this.setState(prevState => {
			if (prevState.score >= prevState.word.length) {
				return {
					gameover: true,
					win: true
				}
			}
			if (prevState.hang >= prevState.lives) {
				return {
					gameover: true
				}
			}
		})

	}

	render() {
		const letters = this.state.word.split('').map((letter,i) => {
			const usedLetters = this.state.usedLetters.map(l => l.toLowerCase())
			return (
			<Letter
				key={i}
				value={letter}
				active={this.state.gameover ? true : usedLetters.includes(letter.toLowerCase())}
			/>
			)
		})

		const letterButtons = this.state.letterButtons.map(item =>
			<LetterButton
				key={item.letter}
				clicked={this.state.gameover ? true : item.clicked}
				value={item.letter}
				handleClick={this.handleBtnClick}
			/>
		)

		const gameOverButton = <p><h3>{this.state.win ? "Correct!" : "RIP"}</h3><button onClick={this.resetGame}>Play again</button></p>

		return(
			<main>
				<div className="hangman">
					<Hangman sprite={this.state.hang} />
				</div>

				<h1>{letters}</h1>

				<div>
					{this.state.gameover ? gameOverButton : letterButtons}
				</div>

			</main>
		)
	}
}

export default App;