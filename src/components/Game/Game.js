import React from 'react'
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer'
import Cards from '../Cards/Cards'

import styles from './Game.scss'

const GamePlay = props => {
    const completeGame = (moves) => props.completeGame(moves)
    return (
        <div>
            <Timer />
            <Cards cards={props.cards} completeGame={completeGame} />
        </div>
    )
}
GamePlay.propTypes = {
    cards: PropTypes.array.isRequired,
    completeGame: PropTypes.func.isRequired
}

const GameDisplay = props => {
    switch (props.readyState) {
        case 'false':
	    	return 'Loading...'
        case 'error':
        default:
		    return "We've encountered an error. Please try again later!"
    }
}
GameDisplay.propTypes = {
    readyState: PropTypes.string.isRequired
}

class Game extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
			cardsLoaded: 'false',
			cards: null
		}
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

	completeGame(moves) {
		this.props.completeGame(moves)
	}

	render() {
        if (this.state.cardsLoaded === 'true') {
            const cardSet = this.state.cards[this.props.difficulty]
            return (
                <GamePlay 
                    cards={cardSet} 
                    completeGame={(moves) => this.completeGame(moves)} 
                />
            )
        }
        else {
            return (
                <GameDisplay readyState={this.state.cardsLoaded} />
            )
        }
	}
}
Game.propTypes = {
    difficulty: PropTypes.string.isRequired,
    completeGame: PropTypes.func.isRequired
}

export default Game
