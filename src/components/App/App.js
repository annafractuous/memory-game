import React from 'react'
import PropTypes from 'prop-types'
import Message from '../Message/Message'
import Game from '../Game/Game'
import { connect } from 'react-redux'
import { toggleShowGame } from '../../redux/actions/game-state'
import store from '../../redux/store/index'

import gameStyles from '../../data/game-styles.js'
import styles from './App.scss'


const mapStateToProps = state => {
    return {
        gameOver: state.gameState.gameOver,
        showGame: state.gameState.showGame,
        difficulty: state.selection.difficulty,
        background: state.selection.background,
        totalTime: state.summary.time,
        totalMoves: state.summary.moves
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleShowGame: bool => dispatch(toggleShowGame(bool))
    }
}
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
        this.showGameCheck(nextProps)
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

    showGameCheck(nextProps) {
        if (!nextProps.gameOver && nextProps.background !== '' && nextProps.difficulty !== '') {
            this.props.toggleShowGame(true)
        }
        else if (nextProps.gameOver && nextProps.totalTime !== '0:00' && nextProps.totalMoves !== 0) {
            this.props.toggleShowGame(false)
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
            // this.setState({
            //     gamePlay: false,
            //     gameState: 'complete',
            //     difficulty: '',
            //     background: ''
            // })
            this.props.toggleShowGame(false)
        }
	}

	render() {
        // window.store = store;
        const bgColor = this.props.showGame ? gameStyles[this.props.background].pageColor : 'white'
        const style = {
            backgroundColor: bgColor
        }
        console.log(this.props)
        const component = this.props.showGame ? 
            <Game 
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
ConnectedApp.propTypes = {
    showGame: PropTypes.bool.isRequired,
    // difficulty: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
}
const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)

export default App
