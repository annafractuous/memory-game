import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from '../Buttons/Buttons'

import { connect } from 'react-redux'
import { resetCardState } from '../../redux/actions/cards'
import { clearSelections } from '../../redux/actions/selection'
import { clearTotals } from '../../redux/actions/summary'
import { toggleGameOver } from '../../redux/actions/game-state'

import styles from './Summary.scss'


const mapStateToProps = state => {
    return {
        totalTime: state.summary.time,
        totalMoves: state.summary.moves
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleGameOver: bool => dispatch(toggleGameOver(bool)),
        clearSelections: () => dispatch(clearSelections()),
        clearTotals: () => dispatch(clearTotals()),
        resetCardState: () => dispatch(resetCardState())
    }
}
const ConnectedSummary = props => {
    const onPlayAgain = () => {
        props.toggleGameOver(false)
        props.clearSelections()
        props.resetCardState()
        props.clearTotals()
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
    toggleGameOver: PropTypes.func.isRequired,
    clearSelections: PropTypes.func.isRequired,
    resetCardState: PropTypes.func.isRequired,
    clearTotals: PropTypes.func.isRequired,
    totalMoves: PropTypes.number.isRequired,
    totalTime: PropTypes.string.isRequired
}
const Summary = connect(mapStateToProps, mapDispatchToProps)(ConnectedSummary)

export default Summary