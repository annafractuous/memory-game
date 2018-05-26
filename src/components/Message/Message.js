import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import { Button, ButtonGroup } from '../Buttons/Buttons'
import { connect } from 'react-redux'
import { selectDifficulty, selectBackground } from '../../redux/actions/selection'
import { resetCardState } from '../../redux/actions/cards'
import { clearSelections } from '../../redux/actions/selection'
import { toggleShowGame, toggleGameOver } from '../../redux/actions/game-state'

import styles from './Message.scss'

const mapDispatchToWelcomeProps = dispatch => {
    return {
        selectDifficulty: selection => dispatch(selectDifficulty(selection)),
        selectBackground: selection => dispatch(selectBackground(selection)),
        toggleShowGame: bool => dispatch(toggleShowGame(bool))        
    }
}
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


const mapStateToSummaryProps = state => {
    return {
        totalTime: state.summary.time,
        totalMoves: state.summary.moves
    }
}
const mapDispatchToSummaryProps = dispatch => {
    return {
        toggleGameOver: bool => dispatch(toggleGameOver(bool)),
        clearSelections: () => dispatch(clearSelections()),
        resetCardState: () => dispatch(resetCardState())
    }
}
const ConnectedSummary = props => {
    const onPlayAgain = () => {
        props.toggleGameOver(false)
        props.clearSelections()
        props.resetCardState()
    }

    const playAgain = 'Play Again'
    return (
        <section className={styles.summary}>
            <p className={styles.text}>Done! You won the game with {props.totalMoves} moves in {props.totalTime}.</p>
            <div>
                <Button
                    btnClass='defaultButton'
                    value={playAgain} 
                    label={playAgain} 
                    text={playAgain} 
                    style={{}} 
                    onClick={onPlayAgain} 
                />
            </div>
        </section>
    )
}
ConnectedSummary.propTypes = {
    // handleSelect: PropTypes.func.isRequired,
    toggleGameOver: PropTypes.func.isRequired,
    resetCardState: PropTypes.func.isRequired,
    moves: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
}
const Summary = connect(mapStateToSummaryProps, mapDispatchToSummaryProps)(ConnectedSummary)



const mapStateToMessageProps = state => {
    return {
        gameOver: state.gameState.gameOver
    }
}
class ConnectedMessage extends React.Component {
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
        const screen = this.props.gameOver ?
            <Summary 
                // moves={this.props.moves} 
                // time={this.props.time} 
                handleSelect={this.restartGame} 
            /> :
            <Welcome />
        
        return (
            <article className={styles.screen}>
                <Header style='screen' />
                {screen}
            </article>
        )
    }
}
ConnectedMessage.propTypes = {
    // gameState: PropTypes.string.isRequired,
    gameOver: PropTypes.bool.isRequired,
    moves: PropTypes.number,
    time: PropTypes.string
}
const Message = connect(mapStateToMessageProps)(ConnectedMessage)

export default Message