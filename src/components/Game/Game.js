import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import Timer from '../Timer/Timer'
import Cards from '../Cards/Cards'
import { connect } from 'react-redux'

import classNames from 'classnames'
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
            dillyDali: false
		}

        this.dillyDali = this.dillyDali.bind(this)
        this.setMoves = this.setMoves.bind(this)
        this.setTime = this.setTime.bind(this)
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
		this.props.setMoves(moves)
	}

    setTime(time) {
		this.props.setTime(time)
	}

    render() {
        const daliClass = classNames({ 
            [styles.dillyDali]: this.state.dillyDali 
        })
        return (
            <section className={daliClass}>
                <div className={styles.dali}></div>
                <Timer setTime={this.setTime} />
                <Cards 
                    cards={this.props.cards} 
                    setMoves={this.setMoves} 
                    dillyDali={this.dillyDali} 
                />
            </section>
        )
    }
}
GamePlay.propTypes = {
    setMoves: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired
}

const mapStateToGameProps = state => {
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

        this.setMoves = this.props.setMoves.bind(this)
        this.setTime = this.props.setTime.bind(this)
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
            component =
                <GamePlay 
                    cards={cardSet} 
                    setMoves={this.setMoves} 
                    setTime={this.setTime} 
                />
        } else {
            component = 
                <GameDisplay cardsLoaded={this.state.cardsLoaded} />
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
    difficulty: PropTypes.string.isRequired,
    setMoves: PropTypes.func.isRequired,
    setTime: PropTypes.func.isRequired
}
const Game = connect(mapStateToGameProps)(ConnectedGame)

export default Game
