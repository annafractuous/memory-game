import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'

import styles from './Message.scss'

const Welcome = props => {
    return (
        <div className={styles.welcome}>
            <p className={styles.text}>Select your difficulty level</p>
            <div>
                <button className={styles.button} value='easy' onClick={props.handleClick}>Easy</button>
                <button className={styles.button} value='hard' onClick={props.handleClick}>Hard</button>
            </div>
        </div>
    )
}
Welcome.propTypes = {
    handleClick: PropTypes.func.isRequired
}

const Summary = props => {
    return (
        <div className={styles.summary}>
            <p className={styles.text}>Done! You won the game in {props.moves} moves in {props.time}.</p>
            <div>
                <button className={styles.button} onClick={props.handleClick}>Play Again</button>
            </div>
        </div>
    )
}
Summary.propTypes = {
    handleClick: PropTypes.func.isRequired,
    moves: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
}

class Message extends React.Component {
    constructor(props) {
        super(props)

        this.selectDifficulty = this.selectDifficulty.bind(this)
        this.restartGame = this.restartGame.bind(this)
    }

    selectDifficulty(e) {
        const selectionObject = {
            type: 'difficulty',
            value: e.target.value
        }
        this.props.handleUserSelection(selectionObject)
    }

    restartGame() {
        const selectionObject = {
            type: 'replay'
        }
        this.props.handleUserSelection(selectionObject)
    }

    render() {
        const screen = this.props.gameState === 'start' ?
            <Welcome handleClick={this.selectDifficulty}/> :
            <Summary 
                moves={this.props.moves} 
                time={this.props.time} 
                handleClick={this.restartGame} 
            />
        
        return (
            <article className={styles.screen}>
                <Header />
                {screen}
            </article>
        )
    }
}
Message.propTypes = {
    gameState: PropTypes.string.isRequired,
    handleUserSelection: PropTypes.func.isRequired,
    moves: PropTypes.number,
    time: PropTypes.string
}

export default Message