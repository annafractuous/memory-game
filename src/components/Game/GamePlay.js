import React from 'react'
import PropTypes from 'prop-types'
import Timer from '../Timer/Timer'
import Cards from '../Cards/Cards'

import classNames from 'classnames'
import styles from './Game.scss'

class GamePlay extends React.Component {
    constructor(props) {
        super(props)
		this.state = {
            dillyDali: false
		}

        this.dillyDali = this.dillyDali.bind(this)
    }

    dillyDali() {
        this.setState({
            dillyDali: true
        }, this.stopDali)
    }

    stopDali() {
        const dillyDali = setTimeout(() => {
            clearTimeout(dillyDali)
            this.setState({
                dillyDali: false
            })
        }, 3000)
    }

    render() {
        const daliClass = classNames({ 
            [styles.dillyDali]: this.state.dillyDali 
        })
        return (
            <section className={daliClass}>
                <div className={styles.dali}></div>
                <Timer />
                <Cards 
                    cards={this.props.cards} 
                    dillyDali={this.dillyDali} 
                />
            </section>
        )
    }
}
GamePlay.propTypes = {
    cards: PropTypes.array.isRequired
}

export default GamePlay
