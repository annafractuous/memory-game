import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import Welcome from './Welcome'
import Summary from './Summary'

import { connect } from 'react-redux'

import styles from './Message.scss'


const mapStateToProps = state => {
    return {
        gameOver: state.gameState.gameOver
    }
}
const ConnectedMessage = props => {
    const screen = props.gameOver ? <Summary /> : <Welcome />        
    return (
        <article className={styles.screen}>
            <Header style='screen' />
            {screen}
        </article>
    )
}
ConnectedMessage.propTypes = {
    gameOver: PropTypes.bool.isRequired
}
const Message = connect(mapStateToProps)(ConnectedMessage)

export default Message