import React from 'react'
import PropTypes from 'prop-types'

import styles from './Timer.scss'

const getHours = time => {
	return Math.floor(time / 3600)
}

const getMins = (time, leadingZero) => {
	const m = Math.floor((time % 3600) / 60)
	return leadingZero && m < 10 ? `0${m}` : m
}

const getSecs = time => {
	const s = time % 60
	return s < 10 ? `0${s}` : s
}

export const formatTime = time => {
	if (time < 0) return '--:--'
	const h = getHours(time)
	const m = getMins(time, h > 0)
	const s = getSecs(time)

	return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`
}

const Timer = ({ time = 0 }) => <div className={styles.timer}>Time: {formatTime(time)}</div>
Timer.propTypes = {
	time: PropTypes.number,
}

class TimerContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			secondsElapsed: 0,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.gamePlay) {
			this.interval = setInterval(this.tick.bind(this), 1000)
		} else if (this.props.gamePlay && !nextProps.gamePlay) {
			this.props.setTime(formatTime(this.state.secondsElapsed))
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	tick() {
		this.setState({
			secondsElapsed: this.state.secondsElapsed + 1,
		})
	}

	render() {
		return <Timer time={this.state.secondsElapsed} />
	}
}
TimerContainer.propTypes = {
	setTime: PropTypes.func.isRequired,
	gamePlay: PropTypes.bool.isRequired
}

export default TimerContainer
