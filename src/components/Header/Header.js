import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Header.scss'

const Header = props => {
    const headerClass = classNames([styles.header], [styles[props.style]])
    return (
        <header className={headerClass}>
            <h1 className={styles.title}>Memory</h1>
            <h4 className={styles.subTitle}>An unforgettable classic</h4>
        </header>
    )
}
Header.propTypes = {
    style: PropTypes.string
}

export default Header