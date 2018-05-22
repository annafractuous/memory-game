import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import { Button, ButtonGroup } from '../Buttons/Buttons'
import { connect } from 'react-redux'
import { selectDifficulty, selectBackground } from '../../redux/actions/message'

import styles from './Message.scss'

const mapDispatchToWelcomeProps = dispatch => {
    return {
        selectDifficulty: selection => dispatch(selectDifficulty(selection)),
        selectBackground: selection => dispatch(selectBackground(selection))
    };
};
const ConnectedWelcome = props => {
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
ConnectedWelcome.propTypes = {
    selectBackground: PropTypes.func.isRequired,
    selectDifficulty: PropTypes.func.isRequired
}
const Welcome = connect(null, mapDispatchToWelcomeProps)(ConnectedWelcome)

const Summary = props => {
    const playAgain = 'Play Again';
    return (
        <section className={styles.summary}>
            <p className={styles.text}>Done! You won the game with {props.moves} moves in {props.time}.</p>
            <div>
                <Button
                    btnClass='defaultButton'
                    value={playAgain} 
                    label={playAgain} 
                    text={playAgain} 
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

        this.restartGame = this.restartGame.bind(this)
    }

    restartGame() {
        const selectionObject = {
            type: 'replay'
        }
        this.props.handleUserSelection(selectionObject)
    }

    render() {
        const screen = this.props.gameState === 'start' ?
            <Welcome /> :
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
    // handleUserSelection: PropTypes.func.isRequired,
    moves: PropTypes.number,
    time: PropTypes.string
}

export default Message