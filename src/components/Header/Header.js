import React from 'react'
import styles from './Header.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Memory</h1>
            <h4 className={styles.subTitle}>An unforgettable classic</h4>
        </header>
    )
}

export default Header