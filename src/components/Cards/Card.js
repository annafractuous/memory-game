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
const ConnectedCard = props => {
    const handleClick = () => {
		props.handleClick(props.value, props.idx)
	}

    const getCardStyles = () => {
        const extraStyles      = gameStyles[props.background].extraStyles
        const extraBackStyles  = extraStyles && extraStyles.back ? extraStyles.back : {}
        const extraFrontStyles = extraStyles && extraStyles.front ? extraStyles.front : {}
        
        const backStyle = Object.assign({
            backgroundImage: `url(${gameStyles[props.background].img})`
        }, extraBackStyles)
        
        const frontStyle = Object.assign({
            backgroundColor: gameStyles[props.background].cardColor
        }, extraFrontStyles)

        return [backStyle, frontStyle]
    }

	const [backStyle, frontStyle] = getCardStyles()
    const cardClass = classNames([styles.cardContainer], {
        [styles.active]: props.active,
        [styles.flipped]: props.flipped
    })
    const disabled = props.flipped || !props.active

    return (
        <div className={cardClass} onClick={handleClick}>
            <div className={styles.card}>
                <button className={styles.front} style={frontStyle} aria-label={props.value} disabled={disabled}>
                    {props.value}
                </button>
                <div className={styles.back} style={backStyle}></div>
            </div>
        </div>
    )
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
