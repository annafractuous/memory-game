import React from 'react'
import Message from '../Message/Message'
import Game from '../Game/Game'
import { connect } from 'react-redux'

import gameStyles from '../../data/game-styles.js';
import styles from './App.scss'

class ConnectedApp extends React.Component {
	constructor() {
		super()
		this.state = {
			gamePlay: false,
			gameState: 'start',
            totalTime: '0:00',
            totalMoves: 0
		}

        this.setMoves = this.setMoves.bind(this)
        this.setTime = this.setTime.bind(this)
        this.handleUserSelection = this.handleUserSelection.bind(this)
	}

    componentWillReceiveProps(nextProps) {
        console.log('nextProps: ', nextProps)
        this.gamePlayCheck(nextProps)
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

    gamePlayCheck(nextProps) {
        if (nextProps.background !== '' && nextProps.difficulty !== '') {
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
        const bgColor = this.state.gamePlay ? gameStyles[this.props.background].pageColor : 'white'
        const style = {
            backgroundColor: bgColor
        }
        const component = this.state.gamePlay ? 
            <Game 
                // difficulty={this.props.difficulty} 
                // background={this.props.background} 
                setMoves={this.setMoves} 
                setTime={this.setTime} 
            /> :
            <Message 
                gameState={this.state.gameState} 
                moves={this.state.totalMoves} 
                time={this.state.totalTime} 
            />
		
        return (
            <div className={styles.memoryGame} style={style}>
                {component}
            </div>
        )
	}
}
function mapStateToProps(state){
    return {
        difficulty: state.selection.difficulty,
        background: state.selection.background
    };
}
const App = connect(mapStateToProps)(ConnectedApp)

export default App
