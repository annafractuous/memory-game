import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import classNames from 'classnames'
import gameStyles from '../../data/game-styles.js'
import styles from './Cards.scss'


const mapStateToProps = state => {
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
const Card = connect(mapStateToProps)(ConnectedCard)

export default Card
