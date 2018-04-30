import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import { Button, ButtonGroup } from '../Buttons/Buttons'

import styles from './Message.scss'

const Welcome = props => {
    return (
        <section className={styles.welcome}>
            <ButtonGroup 
                btns='difficulty'
                questionText='Select your difficulty level' 
                handleSelect={props.selectDifficulty} 
            />
            <ButtonGroup 
                btns='background'
                questionText='Pick a card style' 
                handleSelect={props.selectBackground} 
                containerClass={styles.bgBtnsContainer}
            />
        </section>
    )
}
Welcome.propTypes = {
    selectBackground: PropTypes.func.isRequired,
    selectDifficulty: PropTypes.func.isRequired
}

const Summary = props => {
    return (
        <section className={styles.summary}>
            <p className={styles.text}>Done! You won the game with {props.moves} moves in {props.time}.</p>
            <div>
                <Button
                    btnClass='defaultButton'
                    value='Play Again'
                    label='Play Again'
                    text='Play Again'
                    style={{}}
                    onClick={props.handleSelect}
                />
            </div>
        </section>
    )
}
Summary.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    moves: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
}

class Message extends React.Component {
    constructor(props) {
        super(props)

        this.selectDifficulty = this.selectDifficulty.bind(this)
        this.selectBackground = this.selectBackground.bind(this)
        this.restartGame = this.restartGame.bind(this)
    }

    selectDifficulty(e) {
        const selectionObject = {
            type: 'difficulty',
            value: e.target.value
        }
        this.props.handleUserSelection(selectionObject)
    }

    selectBackground(e) {
        const selectionObject = {
            type: 'background',
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
            <Welcome 
                selectDifficulty={this.selectDifficulty}
                selectBackground={this.selectBackground}
            /> :
            <Summary 
                moves={this.props.moves} 
                time={this.props.time} 
                handleSelect={this.restartGame} 
            />
        
        return (
            <article className={styles.screen}>
                <Header style='screen' />
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