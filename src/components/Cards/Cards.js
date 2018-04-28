import React from 'react'
import PropTypes from 'prop-types';
import Card from '../Card/Card'

class Cards extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
            firstCard: true,
			pairingCard: null,
			pairsMade: [],
			pairsRemaining: this.props.cards.length / 2,
			moves: 0
		}
		this.cards = this.shuffleCards()

		this.handleClick = this.handleClick.bind(this)
    }

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return nextState.pairingCard === null
	// }

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

	handleClick(e) {
		const value = e.currentTarget.dataset.value

        if (this.state.firstCard) {
            this.startGame(value)
        }
        else {
            this.state.pairingCard === null ? this.setState({ pairingCard: value }) : this.checkMatch(value)
        }
	}

    startGame(value) {
        this.props.startGame()
        this.setState({
            firstCard: false,
            pairingCard: value
        })
    }

	checkMatch(value) {
		if (this.state.pairingCard === value) {
			this.setState({
				pairingCard: null,
				pairsMade: [...this.state.pairsMade, value],
				pairsRemaining: this.state.pairsRemaining - 1,
				moves: this.state.moves + 1
			}, this.checkForWin)
		} else {
			this.setState({
				pairingCard: null,
				moves: this.state.moves + 1
			})
		}
	}

    checkForWin() {
        if (!this.state.pairsRemaining) {
            this.props.setMoves(this.state.moves)
        }
    }

	render() {
		return (
			<div>
				{this.props.cards.map((card, i) => {
					const active = this.state.pairsMade.includes(card)
					return (
                        <Card 
                            value={card} 
                            active={active} 
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
    startGame: PropTypes.func.isRequired,
    setMoves: PropTypes.func.isRequired
}

export default Cards
