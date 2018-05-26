import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import GameDisplay from './GameDisplay'
import GamePlay from './GamePlay'

import { connect } from 'react-redux'

import classNames from 'classnames'
import styles from './Game.scss'


const mapStateToProps = state => {
    return {
        difficulty: state.selection.difficulty
    }
}
class ConnectedGame extends React.Component {
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
			.catch(error => this.handleError(error))
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
            component = <GamePlay cards={cardSet} />
        } else {
            component = <GameDisplay cardsLoaded={this.state.cardsLoaded} />
        }

        return (
            <article className={styles.gameContainer}>
                <Header style='gamePlay' />
                {component}
            </article>
        )
	}
}
ConnectedGame.propTypes = {
    difficulty: PropTypes.string.isRequired
}
const Game = connect(mapStateToProps)(ConnectedGame)

export default Game
