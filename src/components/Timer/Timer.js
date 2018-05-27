import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setTotalTime } from '../../redux/actions/summary'

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
const TimerFunction = ({ time = 0 }) => <div className={styles.timer}>Time: {formatTime(time)}</div>
TimerFunction.propTypes = {
	time: PropTypes.number,
}


const mapStateToProps = state => {
    return {
        gameActive: state.gameState.gameActive
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalTime: time => dispatch(setTotalTime(time))
    }
}
class TimerContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			secondsElapsed: 0,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.gameActive && !this.interval) {
			this.interval = setInterval(this.tick.bind(this), 1000)
		} else if (this.props.gameActive && !nextProps.gameActive) {
			this.props.setTotalTime(formatTime(this.state.secondsElapsed))
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
		return <TimerFunction time={this.state.secondsElapsed} />
	}
}
TimerContainer.propTypes = {
	setTotalTime: PropTypes.func.isRequired,
	gameActive: PropTypes.bool.isRequired
}
const ConnectedTimerContainer = connect(mapStateToProps, mapDispatchToProps)(TimerContainer)

export default ConnectedTimerContainer
