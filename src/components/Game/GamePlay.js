import React from 'react'
import PropTypes from 'prop-types'
import Timer from '../Timer/Timer'
import Cards from '../Cards/Cards'

import classNames from 'classnames'
import styles from './Game.scss'

class GamePlay extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section>
                <Timer />
                <Cards />
            </section>
        )
    }
}

export default GamePlay
