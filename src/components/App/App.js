import React from 'react'
import PropTypes from 'prop-types'
import Message from '../Message/Message'
import Game from '../Game/Game'

import { connect } from 'react-redux'
import { cardsLoadingState, setCards, toggleShowGame } from '../../redux/actions/game-state'
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
        cardsLoadingState: value => dispatch(cardsLoadingState(value)),
        setCards: cards => dispatch(setCards(cards)),
        toggleShowGame: bool => dispatch(toggleShowGame(bool))
    }
}
class App extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const cardsJSON = 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json'
		fetch(cardsJSON)
			.then(response => response.json())
			.then(data => this.setCards(data))
			.catch(error => this.handleError(error))
	}

    componentWillReceiveProps(nextProps) {
        this.showGameCheck(nextProps)
    }

	handleError(error) {
		console.log(error)
        this.props.cardsLoadingState('error')
	}

	setCards(data) {
		const cards = {}
		for (let set of data.levels) {
			cards[set.difficulty] = set.cards
		}
        
        this.props.cardsLoadingState('true')
        this.props.setCards(cards)
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
        // window.store = store
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
App.propTypes = {
    showGame: PropTypes.bool.isRequired,
    gameOver: PropTypes.bool.isRequired,
    difficulty: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    totalTime: PropTypes.string.isRequired,
    totalMoves: PropTypes.number.isRequired,
    cardsLoadingState: PropTypes.func.isRequired,
    setCards: PropTypes.func.isRequired,
    toggleShowGame: PropTypes.func.isRequired
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
