import React from 'react'
import Message from '../Message/Message'
import Game from '../Game/Game'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			gamePlay: false,
			gameState: 'start',
			difficulty: 'easy',
            totalTime: '0:00',
            totalMoves: 0
		}

        this.setMoves = this.setMoves.bind(this)
        this.setTime = this.setTime.bind(this)
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

    setMoves(moves) {
        this.setState({
            totalMoves: moves
        }, this.completeGame)
    }

    setTime(time) {
        this.setState({
            totalTime: time
        }, this.completeGame)
    }

	completeGame() {
        if (this.state.totalMoves !== 0 && this.state.totalTime !== '0:00') {
            this.setState({
                gamePlay: false,
                gameState: 'complete'
            })
        }
	}

	render() {
		if (this.state.gamePlay) {
			return (
                <Game 
                    difficulty={this.state.difficulty} 
                    setMoves={this.setMoves} 
                    setTime={this.setTime} 
                />
            )
		} else {
			return (
                <Message 
                    gameState={this.state.gameState} 
                    moves={this.state.totalMoves} 
                    time={this.state.totalTime} 
                    handleUserSelection={this.handleUserSelection} 
                />
            )
		}
	}
}

export default App
