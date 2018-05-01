import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import buttons from '../../data/buttons.js';
import styles from './Buttons.scss'

const Button = props => {
    const style = props.style ? props.style : {}
    const text = props.text ? props.text : ''
    
    return (
        <button 
            className={props.btnClass} 
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

class ButtonGroup extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			selected: null
		}

        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(e) {
        this.setState({
            selected: e.target.value
        })
        this.props.handleSelect(e.target.value)
    }

    render() {
        const btnData = buttons[this.props.btns]
        const containerClass = this.props.containerClass ? this.props.containerClass : ''

        return (
            <div className={styles.selectionSection}>
                <p className={styles.text}>{this.props.questionText}</p>
                <div className={containerClass}>
                    {btnData.map((btn, i) => {
                        const btnClass = classNames([styles[btn.class]], {
                            [styles.selected]: this.state.selected === btn.value
                        })

                        return (
                            <Button
                                btnClass={btnClass}
                                value={btn.value}
                                label={btn.label}
                                text={btn.text}
                                style={btn.style}
                                onClick={this.handleSelect}
                                key={i}
                            />
                        )
                    }, this)}
                </div>
            </div>
        )
    }
}
ButtonGroup.propTypes = {
    questionText: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
    btns: PropTypes.string.isRequired,
    containerClass: PropTypes.string
}

export { Button, ButtonGroup }