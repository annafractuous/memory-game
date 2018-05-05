import React from 'react'
import Message from '../Message/Message'
import Game from '../Game/Game'
import classNames from 'classnames'

import gameStyles from '../../data/game-styles.js';
import styles from './App.scss'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			gamePlay: false,
			gameState: 'start',
			difficulty: '',
			background: '',
            totalTime: '0:00',
            totalMoves: 0,
            dillyDali: false
		}

        this.setMoves = this.setMoves.bind(this)
        this.setTime = this.setTime.bind(this)
        this.dillyDali = this.dillyDali.bind(this)
        this.handleUserSelection = this.handleUserSelection.bind(this)
	}

	handleUserSelection(selection) {
        switch (selection.type) {
            case 'difficulty':
			    this.selectDifficulty(selection.value)
                break
            case 'background':
                this.selectBackground(selection.value)
                break
            case  'replay':
			    this.restartGame()
                break
        }
	}

	selectDifficulty(difficulty) {
		this.setState({
			difficulty: difficulty
		}, this.startGame)
	}

	selectBackground(background) {
		this.setState({
			background: background
		}, this.startGame)
	}

    startGame() {
        if (this.state.background !== '' && this.state.difficulty !== '') {
            this.setState({
                gamePlay: true
            })
        }
    }

	restartGame() {
		this.setState({
			gameState: 'start',
            totalTime: '0:00',
            totalMoves: 0
		})
	}

    dillyDali() {
        this.setState({
            dillyDali: true
        }, this.stopDali)
    }

    stopDali() {
        const dillyDali = setTimeout(() => {
            clearTimeout(dillyDali)
            this.setState({
                dillyDali: false
            })
        }, 3000)
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
                gameState: 'complete',
                difficulty: '',
                background: ''
            })
        }
	}

	render() {
        const bgColor = this.state.gamePlay && this.state.background.length ? gameStyles[this.state.background].pageColor : 'white'
        const style = {
            backgroundColor: bgColor
        }
        const appClass = classNames([styles.memoryGame], {
            [styles.dillyDali]: this.state.dillyDali
        })
        const component = this.state.gamePlay ? 
            <Game 
                difficulty={this.state.difficulty} 
                background={this.state.background} 
                setMoves={this.setMoves} 
                setTime={this.setTime} 
                dillyDali={this.dillyDali} 
            /> :
            <Message 
                gameState={this.state.gameState} 
                moves={this.state.totalMoves} 
                time={this.state.totalTime} 
                handleUserSelection={this.handleUserSelection} 
            />
		
        return (
            <div className={appClass} style={style}>
                <div className={styles.dali}></div>
                {component}
            </div>
        )
	}
}

export default App
