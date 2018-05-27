import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import GameDisplay from './GameDisplay'
import GamePlay from './GamePlay'

import { connect } from 'react-redux'

import classNames from 'classnames'
import styles from './Game.scss'


const mapStateToProps = state => {
    return {
        cardsLoaded: state.gameState.cardsLoaded
    }
}
const Game = props => {
    const component = props.cardsLoaded === 'true' ? <GamePlay /> : <GameDisplay />
    return (
        <article className={styles.gameContainer}>
            <Header style='gamePlay' />
            {component}
        </article>
    )
}
Game.propTypes = {
    cardsLoaded: PropTypes.string.isRequired
}
const ConnectedGame = connect(mapStateToProps)(Game)

export default ConnectedGame
