import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        cardsLoaded: state.gameState.cardsLoaded
    }
}
const ConnectedGameDisplay = props => {
    switch (props.cardsLoaded) {
        case 'false':
	    	return 'Loading...'
        case 'error':
        default:
		    return "We've encountered an error. Please try again later!"
    }
}
ConnectedGameDisplay.propTypes = {
    cardsLoaded: PropTypes.string.isRequired
}
const GameDisplay = connect(mapStateToProps)(ConnectedGameDisplay)

export default GameDisplay
