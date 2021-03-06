import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

import { connect } from 'react-redux'
import { toggleFirstCard, setPairsCount, selectPairingCard, selectCorrectCard, selectWrongCard, flipBack } from '../../redux/actions/cards'
import { toggleGameActive, toggleDillyDali, endGame } from '../../redux/actions/game-state'
import { setTotalMoves } from '../../redux/actions/summary'

import classNames from 'classnames'
import styles from './Cards.scss'


const mapStateToProps = state => {
    return {
        cards: state.gameState.cards,
        difficulty: state.selection.difficulty,
        firstCardFlipped: state.cards.firstCardFlipped,
        pairingCards: state.cards.pairingCards,
        pairsMade: state.cards.pairsMade,
        pairsRemaining: state.cards.pairsRemaining,
        moves: state.cards.moves,
        wrongMoves: state.cards.wrongMoves,
        dillyDali: state.gameState.dillyDali
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setPairsCount: totalPairs => dispatch(setPairsCount(totalPairs)),
        selectPairingCard: card => dispatch(selectPairingCard(card)),
        selectCorrectCard: card => dispatch(selectCorrectCard(card)),
        selectWrongCard: card => dispatch(selectWrongCard(card)),
        flipBack: wrongMoves => dispatch(flipBack(wrongMoves)),
        toggleDillyDali: bool => dispatch(toggleDillyDali(bool)),
        toggleFirstCard: bool => dispatch(toggleFirstCard(bool)),
        toggleGameActive: bool => dispatch(toggleGameActive(bool)),
        setTotalMoves: moves => dispatch(setTotalMoves(moves)),
        endGame: () => dispatch(endGame()),
    }
}
class Cards extends React.Component {
    constructor(props) {
        super(props)
        
        this.shuffleCards()
        this.props.setPairsCount(this.cards.length / 2)
		
        this.handleClick = this.handleClick.bind(this)

    }

	shuffleCards() {
		// Fisher-Yates shuffle
		const cards = [...this.props.cards[this.props.difficulty]]
		let counter = cards.length
		let temp, randomIdx

		while (counter > 0) {
			randomIdx = Math.floor(Math.random() * counter)
			counter--

			temp = cards[counter]
			cards[counter] = cards[randomIdx]
			cards[randomIdx] = temp
		}

        this.cards = cards
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
        this.props.endGame()
        this.props.setTotalMoves(this.props.moves)
    }

    flipBack() {
        setTimeout(function() {
            this.props.flipBack()

            if (this.props.wrongMoves > 4) {
                this.dillyDali()
            } else if (!this.props.pairsRemaining) {
                this.gameOver()
            }
            
            document.activeElement.blur()   // not resetting the focus as intended
        }.bind(this), 500)
    }

    dillyDali() {
        this.props.toggleDillyDali(true)
        const daliOut = setTimeout(() => {
            clearTimeout(daliOut)
            this.props.toggleDillyDali(false)
        }, 3000)
    }

	render() {
        const countClass = `count${this.cards.length}`
		const containerClass = classNames([styles.cardsContainer], [styles[countClass]], {
            [styles.dillyDali]: this.props.dillyDali 
        })

        return (
			<div className={containerClass}>
                <div className={styles.dali}></div>
				{this.cards.map((card, i) => {
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
Cards.propTypes = {
    cards: PropTypes.object.isRequired,
    difficulty: PropTypes.string.isRequired,
    firstCardFlipped: PropTypes.bool.isRequired,
    pairingCards: PropTypes.array.isRequired,
    pairsMade: PropTypes.array.isRequired,
    pairsRemaining: PropTypes.number,
    moves: PropTypes.number.isRequired,
    wrongMoves: PropTypes.number.isRequired,
    dillyDali: PropTypes.bool.isRequired,
    setPairsCount: PropTypes.func.isRequired,
    selectPairingCard: PropTypes.func.isRequired,
    selectCorrectCard: PropTypes.func.isRequired,
    selectWrongCard: PropTypes.func.isRequired,
    flipBack: PropTypes.func.isRequired,
    toggleDillyDali: PropTypes.func.isRequired,
    toggleFirstCard: PropTypes.func.isRequired,
    toggleGameActive: PropTypes.func.isRequired,
    setTotalMoves: PropTypes.func.isRequired,
    endGame: PropTypes.func.isRequired
}
const ConnectedCards = connect(mapStateToProps, mapDispatchToProps)(Cards)

export default ConnectedCards
