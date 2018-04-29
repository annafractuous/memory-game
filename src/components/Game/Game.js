import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
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

class GamePlay extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
            gamePlay: false
		}

        this.startGame = this.startGame.bind(this)        
        this.setMoves = this.setMoves.bind(this)        
        this.setTime = this.setTime.bind(this)        
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
        return (
            <div>
                <Timer 
                    gamePlay={this.state.gamePlay} 
                    setTime={this.setTime} 
                />
                <Cards 
                    startGame={this.startGame} 
                    cards={this.props.cards} 
                    background={this.props.background} 
                    setMoves={this.setMoves} 
                />
            </div>
        )
    }
}
GamePlay.propTypes = {
    setMoves: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    background: PropTypes.string.isRequired
}

class Game extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
            gamePlay: false,
			cardsLoaded: 'false',
			cards: null
		}
       
        this.setMoves = this.props.setMoves.bind(this)        
        this.setTime = this.props.setTime.bind(this)        
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

	render() {
        let component
        if (this.state.cardsLoaded === 'true') {
            const cardSet = this.state.cards[this.props.difficulty]
            component =
                <GamePlay 
                    cards={cardSet} 
                    background={this.props.background} 
                    setMoves={this.setMoves} 
                    setTime={this.setTime} 
                />
        } else {
            component = 
                <GameDisplay cardsLoaded={this.state.cardsLoaded} />
        }

        return (
            <div className={styles.gameContainer}>
                <Header style='gamePlay' />
                {component}
            </div>
        )
	}
}
Game.propTypes = {
    difficulty: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    setMoves: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired
}

export default Game
