import React from 'react'
import PropTypes from 'prop-types'

const GameDisplay = props => {
    switch (props.cardsLoaded) {
        case 'false':
	    	return 'Loading...'
        case 'error':
        default:
		    return "We've encountered an error. Please try again later!"
    }
}
GameDisplay.propTypes = {
    cardsLoaded: PropTypes.string.isRequired
}

export default GameDisplay
