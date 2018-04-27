import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
			flipped: false
		}

		this.handleClick = this.handleClick.bind(this)
    }

	handleClick(e) {
		this.props.handleClick(e)
	}

	render() {
		let cardClass = ''
		cardClass += 'card-container'
		cardClass += this.state.flipped ? ' flipped' : ''
		cardClass += this.props.active ? ' active' : ''
		
		return (
			<div className={cardClass} data-value={this.props.value} onClick={this.handleClick}>
				<div className='card'>
					{this.props.value}
				</div>
			</div>
		)
	}
}

export default Card
