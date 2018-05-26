import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import { Button, ButtonGroup } from '../Buttons/Buttons'

import { connect } from 'react-redux'
import { selectDifficulty, selectBackground } from '../../redux/actions/selection'

import styles from './Welcome.scss'


const mapDispatchToProps = dispatch => {
    return {
        selectDifficulty: selection => dispatch(selectDifficulty(selection)),
        selectBackground: selection => dispatch(selectBackground(selection))
    }
}
const ConnectedWelcome = props => {
    return (
        <section>
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
    selectDifficulty: PropTypes.func.isRequired,
    selectBackground: PropTypes.func.isRequired
}
const Welcome = connect(null, mapDispatchToProps)(ConnectedWelcome)

export default Welcome