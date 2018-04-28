import React from 'react'
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer'
import Cards from '../Cards/Cards'

import styles from './Game.scss'

const GameDisplay = props => {
    switch (props.cardsLoaded) {
        case 'false':
	    	return 'Loading...'
        case 'error':
        default:
		    return "We've encountered an error. Please try again later!"
    }
}
GameDisplay.propTypes = {
    cardsLoaded: PropTypes.string.isRequired
}

const GamePlay = props => {
    const startGame = () => props.startGame()
    const setTime = (time) => props.setTime(time)
    const setMoves = (moves) => props.setMoves(moves)
    return (
        <div>
            <Timer gamePlay={props.gamePlay} setTime={setTime} />
            <Cards startGame={startGame} cards={props.cards} setMoves={setMoves} />
        </div>
    )
}
GamePlay.propTypes = {
    cards: PropTypes.array.isRequired,
    gamePlay: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired,
    setMoves: PropTypes.func.isRequired
}

class Game extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
            gamePlay: false,
			cardsLoaded: 'false',
			cards: null
		}

        this.startGame = this.startGame.bind(this)        
        this.setMoves = this.setMoves.bind(this)        
        this.setTime = this.setTime.bind(this)        
    }

	componentDidMount() {
		const cardsJSON = 'https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json'
		fetch(cardsJSON)
			.then(response => response.json())
			.then(data => this.setCards(data))
			.catch(error => this.handleError(error));
	}

	handleError(error) {
		console.log(error)
		this.setState({
			cardsLoaded: 'error'
		})
	}

	setCards(data) {
		const cards = {}
		for (let set of data.levels) {
			cards[set.difficulty] = set.cards
		}
		this.setState({
			cardsLoaded: 'true',
			cards: cards
		})
	}

    startGame() {
        this.setState({
            gamePlay: true
        })
    }

	setMoves(moves) {
		this.props.setMoves(moves)
        this.setState({
            gamePlay: false
        })
	}
	
    setTime(time) {
		this.props.setTime(time)
	}

	render() {
        if (this.state.cardsLoaded === 'true') {
            const cardSet = this.state.cards[this.props.difficulty]
            return (
                <GamePlay 
                    cards={cardSet} 
                    gamePlay={this.state.gamePlay}
                    startGame={this.startGame}
                    setMoves={this.setMoves} 
                    setTime={this.setTime} 
                />
            )
        }
        else {
            return (
                <GameDisplay cardsLoaded={this.state.cardsLoaded} />
            )
        }
	}
}
Game.propTypes = {
    difficulty: PropTypes.string.isRequired,
    setMoves: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired
}

export default Game
