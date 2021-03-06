import React from 'react'
import PropTypes from 'prop-types'
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
const Welcome = props => {
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
Welcome.propTypes = {
    selectDifficulty: PropTypes.func.isRequired,
    selectBackground: PropTypes.func.isRequired
}
const ConnectedWelcome = connect(null, mapDispatchToProps)(Welcome)

export default ConnectedWelcome