import React from 'react'
import Timer from '../Timer/Timer'

import styles from './Game.scss'

class Game extends React.Component {
    constructor(props) {
        super(props)

		this.completeGame = this.completeGame.bind(this)
    }

	completeGame() {
		this.props.completeGame()
	}

	render() {
		return (
			<div>Hi, we are here! And we've chosen to play {this.props.difficulty}.</div>
		)
	}
}

export default Game
