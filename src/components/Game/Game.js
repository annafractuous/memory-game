import React from 'react'
import PropTypes from 'prop-types';
import Timer from '../Timer/Timer'
import Cards from '../Cards/Cards'

import styles from './Game.scss'

const GameDisplay = props => {
	if (props.readyState === 'true') {
		const completeGame = () => props.completeGame()
		return <Cards cards={props.cards[props.difficulty]} completeGame={completeGame} />
	} else if (props.readyState === 'error') {
		return "We've encountered an error. Please try again later!"
	} else {
		return 'Loading...'
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

		this.completeGame = this.completeGame.bind(this)
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

	completeGame() {
		this.props.completeGame()
	}

	render() {
		return (
			<div>
				<h1 className={styles.header}>NYT Games Code Test</h1>
				<Timer />
				<GameDisplay readyState={this.state.cardsLoaded} cards={this.state.cards} difficulty={this.props.difficulty} completeGame={this.completeGame} />
			</div>
		)
	}
}
Game.propTypes = {
    difficulty: PropTypes.string.isRequired,
    completeGame: PropTypes.func.isRequired
}

export default Game
