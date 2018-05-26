import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

import { connect } from 'react-redux'
import { toggleFirstCard, setPairsCount, selectPairingCard, selectCorrectCard, selectWrongCard, flipBack } from '../../redux/actions/cards'
import { toggleGameActive, toggleGameOver } from '../../redux/actions/game-state'
import { setTotalMoves } from '../../redux/actions/summary'

import classNames from 'classnames'
import styles from './Cards.scss'


const mapStateToProps = state => {
    return {
        firstCardFlipped: state.cards.firstCardFlipped,
        pairingCards: state.cards.pairingCards,
        pairsMade: state.cards.pairsMade,
        pairsRemaining: state.cards.pairsRemaining,
        moves: state.cards.moves,
        wrongMoves: state.cards.wrongMoves
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setPairsCount: totalPairs => dispatch(setPairsCount(totalPairs)),
        selectPairingCard: card => dispatch(selectPairingCard(card)),
        selectCorrectCard: card => dispatch(selectCorrectCard(card)),
        selectWrongCard: card => dispatch(selectWrongCard(card)),
        flipBack: wrongMoves => dispatch(flipBack(wrongMoves)),
        toggleFirstCard: bool => dispatch(toggleFirstCard(bool)),
        toggleGameActive: bool => dispatch(toggleGameActive(bool)),
        toggleGameOver: bool => dispatch(toggleGameOver(bool)),
        setTotalMoves: moves => dispatch(setTotalMoves(moves))
    }
}
class ConnectedCards extends React.Component {
    constructor(props) {
        super(props)
        
        this.shuffleCards()
        this.props.setPairsCount(this.props.cards.length / 2)
		
        this.handleClick = this.handleClick.bind(this)

    }

	shuffleCards() {
		// Fisher-Yates shuffle
		const cards = this.props.cards
		let counter = cards.length
		let temp, randomIdx

		while (counter > 0) {
			randomIdx = Math.floor(Math.random() * counter)
			counter--

			temp = cards[counter]
			cards[counter] = cards[randomIdx]
			cards[randomIdx] = temp
		}
	}

	handleClick(value, idx) {
		const card = {
            idx: idx,
            value: value
        }

        if (!this.props.firstCardFlipped) {
            this.startGame(card)
        } else {
            this.props.pairingCards.length ? this.checkMatch(card) : this.props.selectPairingCard(card)
        }
	}

    startGame(card) {
        this.props.toggleFirstCard(true)
        this.props.toggleGameActive(true)
        this.props.selectPairingCard(card)
    }

	checkMatch(card) {
		this.matchMade(card) ? this.props.selectCorrectCard(card) : this.props.selectWrongCard(card)
        this.flipBack()
	}

    matchMade(card) {
        const matchingCard = this.props.pairingCards.find((c) => c.value === card.value)
        return !!matchingCard
    }

    gameOver() {
        this.props.toggleGameActive(false)
        this.props.toggleGameOver(true)
        this.props.setTotalMoves(this.props.moves)
    }

    flipBack() {
        setTimeout(function() {
            this.props.flipBack()

            if (this.props.wrongMoves > 4) {
                this.props.dillyDali()
            } else if (!this.props.pairsRemaining) {
                this.gameOver()
            }
            
            document.activeElement.blur()   // not resetting the focus as intended
        }.bind(this), 500)
    }

	render() {
        const countClass = `count${this.props.cards.length}`
		const containerClass = classNames([styles.cardsContainer], [styles[countClass]])

        return (
			<div className={containerClass}>
				{this.props.cards.map((card, i) => {
                    const active = !this.props.pairsMade.includes(card)
					const flipped = !!this.props.pairingCards.find((c) => c.idx === i)
					return (
                        <Card 
                            idx={i} 
                            value={card} 
                            active={active} 
                            flipped={flipped} 
                            handleClick={this.handleClick} 
                            key={i} 
                        />
                    )
				}, this)}
			</div>
		)
	}
}
ConnectedCards.propTypes = {
    cards: PropTypes.array.isRequired,
    firstCardFlipped: PropTypes.bool.isRequired,
    pairingCards: PropTypes.array.isRequired,
    pairsMade: PropTypes.array.isRequired,
    pairsRemaining: PropTypes.number,
    moves: PropTypes.number.isRequired,
    wrongMoves: PropTypes.number.isRequired,
    dillyDali: PropTypes.func.isRequired
}
const Cards = connect(mapStateToProps, mapDispatchToProps)(ConnectedCards)

export default Cards
