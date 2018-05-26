import React from 'react'
import PropTypes from 'prop-types'
import Message from '../Message/Message'
import Game from '../Game/Game'

import { connect } from 'react-redux'
import { toggleShowGame } from '../../redux/actions/game-state'
// import store from '../../redux/store/index'

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
	constructor(props) {
		super(props)
	}

    componentWillReceiveProps(nextProps) {
        this.showGameCheck(nextProps)
    }

    showGameCheck(nextProps) {
        if (!nextProps.gameOver && nextProps.background !== '' && nextProps.difficulty !== '') {
            this.props.toggleShowGame(true)
        }
        else if (nextProps.gameOver && nextProps.totalTime !== '0:00' && nextProps.totalMoves !== 0) {
            this.props.toggleShowGame(false)
        }
    }

	render() {
        // window.store = store;
        const bgColor = this.props.showGame ? gameStyles[this.props.background].pageColor : 'white'
        const style = {
            backgroundColor: bgColor
        }
        const component = this.props.showGame ? <Game /> : <Message />
		
        return (
            <div className={styles.memoryGame} style={style}>
                {component}
            </div>
        )
	}
}
ConnectedApp.propTypes = {
    showGame: PropTypes.bool.isRequired,
    gameOver: PropTypes.bool.isRequired,
    difficulty: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    totalTime: PropTypes.string.isRequired,
    totalMoves: PropTypes.number.isRequired,
    toggleShowGame: PropTypes.func.isRequired
}
const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)

export default App
