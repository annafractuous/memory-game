import React from 'react'
import PropTypes from 'prop-types'

import buttons from '../../data/buttons.js';
import styles from './Buttons.scss'

const Button = props => {
    const style = props.style ? props.style : {}
    const text = props.text ? props.text : ''
    return (
        <button 
            className={styles[props.btnClass]} 
            value={props.value} 
            style={style} 
            onClick={props.onClick} 
            aria-label={props.label}
        >
        {text}
        </button>
    )
}
Button.propTypes = {
    btnClass: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}

const ButtonGroup = props => {
    const btnData = buttons[props.btns]
    const containerClass = props.containerClass ? props.containerClass : ''

    return (
        <div className={styles.selectionSection}>
            <p className={styles.text}>{props.questionText}</p>
            <div className={containerClass}>
                {btnData.map((btn, i) => {
                    return (
                        <Button
                            btnClass={btn.class}
                            value={btn.value}
                            label={btn.label}
                            text={btn.text}
                            style={btn.style}
                            onClick={props.handleSelect}
                            key={i}
                        />
                    )
                })}
            </div>
        </div>
    )
}
ButtonGroup.propTypes = {
    questionText: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
    btns: PropTypes.string.isRequired,
    containerClass: PropTypes.string
}

export { Button, ButtonGroup }