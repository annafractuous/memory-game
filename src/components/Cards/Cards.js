import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setPairsCount, selectPairingCard, selectCorrectCard, selectWrongCard, flipBack } from '../../redux/actions/cards'
import classNames from 'classnames'

import gameStyles from '../../data/game-styles.js'
import styles from './Cards.scss'

const mapStateToCardProps = state => {
    return {
        background: state.selection.background
    }
}
class ConnectedCard extends React.Component {
    constructor(props) {
        super(props)

		this.handleClick = this.handleClick.bind(this)
    }

	handleClick() {
		this.props.handleClick(this.props.value, this.props.idx)
	}

    getCardStyles() {
        const extraStyles = gameStyles[this.props.background].extraStyles
        const extraBackStyles = extraStyles && extraStyles.back ? extraStyles.back : {}
        const extraFrontStyles = extraStyles && extraStyles.front ? extraStyles.front : {}
        
        const backStyle = Object.assign({
            backgroundImage: `url(${gameStyles[this.props.background].img})`
        }, extraBackStyles)
        const frontStyle = Object.assign({
            backgroundColor: gameStyles[this.props.background].cardColor
        }, extraFrontStyles)

        return [backStyle, frontStyle]
    }

	render() {
        const [backStyle, frontStyle] = this.getCardStyles()
		const cardClass = classNames([styles.cardContainer], {
            [styles.active]: this.props.active,
            [styles.flipped]: this.props.flipped
        })
        const disabled = this.props.flipped || !this.props.active

		return (
			<div className={cardClass} onClick={this.handleClick}>
                <div className={styles.card}>
                    <button className={styles.front} style={frontStyle} aria-label={this.props.value} disabled={disabled}>
                        {this.props.value}
                    </button>
                    <div className={styles.back} style={backStyle}></div>
                </div>
            </div>
		)
	}
}
ConnectedCard.propTypes = {
    idx: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    flipped: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
}
const Card = connect(mapStateToCardProps)(ConnectedCard)


const mapStateToCardsProps = state => {
    return {
        pairingCards: state.cards.pairingCards,
        pairsMade: state.cards.pairsMade,
        pairsRemaining: state.cards.pairsRemaining,
        moves: state.cards.moves,
        wrongMoves: state.cards.wrongMoves
    }
}
const mapDispatchToCardsProps = dispatch => {
    return {
        setPairsCount: totalPairs => dispatch(setPairsCount(totalPairs)),
        selectPairingCard: card => dispatch(selectPairingCard(card)),
        selectCorrectCard: card => dispatch(selectCorrectCard(card)),
        selectWrongCard: card => dispatch(selectWrongCard(card)),
        flipBack: wrongMoves => dispatch(flipBack(wrongMoves))
    }
}
class ConnectedCards extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
            firstCard: true
		}
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

        if (this.state.firstCard) {
            this.startGame(card)
        } else {
            this.props.pairingCards.length ? this.checkMatch(card) : this.props.selectPairingCard(card)
        }
	}

    startGame(card) {
        this.props.startGame()
        this.setState({
            firstCard: false
        })

        this.props.selectPairingCard(card)
    }

	checkMatch(card) {
		let pairsMade, pairsRemaining, callback, wrongMoves

		if (!this.matchMade(card)) {
            this.props.selectWrongCard(card)
            this.flipBack()
        } else {
            this.props.selectCorrectCard(card)
            this.checkPairs()
        }
	}

    matchMade(card) {
        const matchingCard = this.props.pairingCards.find((c) => c.value === card.value)
        return !!matchingCard
    }

    checkPairs() {
        this.props.pairsRemaining ? this.flipBack() : this.flipBack(true)
    }

    flipBack(endGame) {
        let callback, wrongMoves
        if (endGame) {
            wrongMoves = 0
            callback = () => this.props.setMoves(this.props.moves)
        } else if (this.props.wrongMoves > 4) {
            wrongMoves = 0
            callback = () => this.props.dillyDali()
        } else {
            wrongMoves = this.props.wrongMoves
            callback = null
        }

        setTimeout(() => {
            this.props.flipBack(wrongMoves)
            callback === null || callback()
            document.activeElement.blur()   // not resetting the focus as intended
        }, 500)
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
    setMoves: PropTypes.func.isRequired
}
const Cards = connect(mapStateToCardsProps, mapDispatchToCardsProps)(ConnectedCards)

export default Cards
