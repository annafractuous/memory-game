import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Cards.scss'

class Card extends React.Component {
    constructor(props) {
        super(props)

		this.handleClick = this.handleClick.bind(this)
    }

	handleClick() {
		this.props.handleClick(this.props.value, this.props.idx)
	}

	render() {
        const bgStyle = {
            backgroundImage: `url(${this.props.background})`
        }
		const cardClass = classNames([styles.cardContainer], {
            [styles.active]: this.props.active,
            [styles.flipped]: this.props.flipped
        })
        const disabled = this.props.flipped || !this.props.active

		return (
			<div className={cardClass} onClick={this.handleClick}>
                <div className={styles.card}>
                    <button className={styles.front} aria-label={this.props.value} disabled={disabled}>
                        {this.props.value}
                    </button>
                    <div className={styles.back} style={bgStyle}></div>
                </div>
            </div>
		)
	}
}
Card.propTypes = {
    idx: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    flipped: PropTypes.bool.isRequired,
    background: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
}

class Cards extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
            firstCard: true,
			pairingCards: [],
			pairsMade: [],
			pairsRemaining: this.props.cards.length / 2,
			moves: 0
		}
		this.cards = this.shuffleCards()

		this.handleClick = this.handleClick.bind(this)
    }

	shuffleCards() {
		// Fisher-Yates shuffle
		const cards = this.props.cards
		let counter = cards.length;
		let temp, randomIdx;

		while (counter > 0) {
			randomIdx = Math.floor(Math.random() * counter);
			counter--;

			temp = cards[counter];
			cards[counter] = cards[randomIdx];
			cards[randomIdx] = temp;
		}
		return cards;
	}

	handleClick(value, idx) {
		const card = {
            idx: idx,
            value: value
        }

        if (this.state.firstCard) {
            this.startGame(card)
        } else {
            this.state.pairingCards.length ? this.checkMatch(card) : this.setPairingCard(card)
        }
	}

    startGame(card) {
        this.props.startGame()
        this.setState({
            firstCard: false,
            pairingCards: [...this.state.pairingCards, card]
        })
    }

    setPairingCard(card) {
        this.setState({
            pairingCards: [...this.state.pairingCards, card]
        })
    }

	checkMatch(card) {
		const pairingCards = [...this.state.pairingCards, card]
        const moves = this.state.moves + 1
        let pairsMade, pairsRemaining, callback

		if (!this.matchMade(card)) {
            pairsMade = this.state.pairsMade
            pairsRemaining = this.state.pairsRemaining
            callback = this.flipBack
        } else {
            pairsMade = [...this.state.pairsMade, card.value]
            pairsRemaining = this.state.pairsRemaining - 1
            callback = this.checkPairs
        }

        this.setState({
            pairingCards: pairingCards,
            pairsMade: pairsMade,
            pairsRemaining: pairsRemaining,
            moves: moves
        }, callback)
	}

    matchMade(card) {
        const matchingCard = this.state.pairingCards.find((c) => c.value === card.value)
        return !!matchingCard
    }

    checkPairs() {
        this.state.pairsRemaining ? this.flipBack() : this.flipBack(true)
    }

    flipBack(endGame) {
        const callback = endGame ? () => this.props.setMoves(this.state.moves) : null
        setTimeout(() => {
            this.setState({
                pairingCards: []
            }, callback)
            document.activeElement.blur()   // not resetting the focus as intended
        }, 500)
    }

	render() {
        const countClass = `count${this.props.cards.length}`
		const containerClass = classNames([styles.cardsContainer], [styles[countClass]])

        return (
			<div className={containerClass}>
				{this.props.cards.map((card, i) => {
                    const active = !this.state.pairsMade.includes(card)
					const flipped = !!this.state.pairingCards.find((c) => c.idx === i)
					return (
                        <Card 
                            idx={i} 
                            value={card} 
                            active={active} 
                            flipped={flipped} 
                            background={this.props.background} 
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
    cards: PropTypes.array.isRequired,
    background: PropTypes.string.isRequired,
    startGame: PropTypes.func.isRequired,
    setMoves: PropTypes.func.isRequired
}

export default Cards
