import React from 'react'
import Message from '../Message/Message'
import Game from '../Game/Game'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			gamePlay: false,
			gameState: 'start',
			difficulty: 'easy'
		}

        this.completeGame = this.completeGame.bind(this)
        this.handleUserSelection = this.handleUserSelection.bind(this)
	}

	handleUserSelection(selection) {
		if (selection.type === 'difficulty') {
			this.selectDifficulty(selection.value)
		} else if (selection.type === 'replay') {
			this.restartGame()
		}
	}

	selectDifficulty(difficulty) {
		this.setState({
			gamePlay: true,
			difficulty: difficulty
		})
	}

	restartGame() {
		this.setState({
			gameState: 'start'
		})
	}

	completeGame() {
		this.setState({
			gamePlay: false,
			gameState: 'complete'
		})
	}

	render() {
		if (this.state.gamePlay) {
			return <Game difficulty={this.state.difficulty} completeGame={this.completeGame} />
		} else {
			return <Message gameState={this.state.gameState} handleUserSelection={this.handleUserSelection} />
		}
	}
}

export default App
