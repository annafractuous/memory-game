import React from 'react'
import Card from '../Card/Card'

class Cards extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
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
        console.log(value)
    }

	render() {
		return (
			<div>
				{this.props.cards.map((card, i) => {
					return <Card value={card} handleClick={this.handleClick} key={i} />
				}, this)}
			</div>
		)
	}
}

export default Cards
