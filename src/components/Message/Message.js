import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'

import styles from './Message.scss'

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
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    style: PropTypes.object
}

const DifficultySelect = props => {
    const btns = [
        { value: 'easy', text: 'Easy' },
        { value: 'hard', text: 'Hard' }
    ]

    return (
        <div className={styles.bgBtnsContainer}>
            {btns.map((btn, i) => {
                return (
                    <Button 
                        btnClass={styles.defaultButton} 
                        value={btn.value} 
                        label={btn.text} 
                        text={btn.text} 
                        onClick={props.handleSelect} 
                        key={i} 
                    />
                )
            })}
        </div>
    )
}
DifficultySelect.propTypes = {
    handleSelect: PropTypes.func.isRequired
}

const BackgroundSelect = props => {
    const imagesPath = '/assets/images/backgrounds'
    const imgs = [
        { fileName: 'jose-roosevelt.jpg', label: 'Jose Roosevelt, Autumn Story'},
        { fileName: 'escher.jpg', label: 'M.C. Escher, Relativity'},
        { fileName: 'kehinde-wiley.jpg', label: 'Kehinde Wiley'},
        { fileName: 'rothko.jpg', label: 'Rothko, Emerald Bay'},
        { fileName: 'van-gogh.jpg', label: 'Van Gogh, Almond Blossoms'},
        { fileName: 'okeeffe.jpg', label: "O'Keeffe, Red Canna"}
    ]

    return (
        <div className={styles.bgBtnsContainer}>
            {imgs.map((img, i) => {
                const imgPath = `${imagesPath}/${img.fileName}`
                const btnStyle = {
                    backgroundImage: `url(${imgPath})`
                }
                return (
                    <Button 
                        btnClass={styles.bgButton} 
                        value={imgPath} 
                        label={img.label} 
                        onClick={props.handleSelect} 
                        style={btnStyle} 
                        key={i} 
                    />
                )
            })}
        </div>
    )
}
BackgroundSelect.propTypes = {
    handleSelect: PropTypes.func.isRequired
}

const SelectionSection = props => {
    return (
        <div className={styles.selectionSection}>
            <p className={styles.text}>{props.questionText}</p>
            {props.btnsComponent}
        </div>
    )
}
SelectionSection.propTypes = {
    questionText: PropTypes.string.isRequired,
    btnsComponent: PropTypes.element.isRequired
}

const Welcome = props => {
    const difficultySelect = <DifficultySelect handleSelect={props.selectDifficulty} />
    const backgroundSelect = <BackgroundSelect handleSelect={props.selectBackground} />
    
    return (
        <section className={styles.welcome}>
            <SelectionSection
                questionText='Select your difficulty level'
                btnsComponent={difficultySelect}
            />
            <SelectionSection
                questionText='Pick a card style'
                btnsComponent={backgroundSelect}
            />
        </section>
    )
}
Welcome.propTypes = {
    selectBackground: PropTypes.func.isRequired,
    selectDifficulty: PropTypes.func.isRequired
}

const Summary = props => {
    return (
        <section className={styles.summary}>
            <p className={styles.text}>Done! You won the game with {props.moves} moves in {props.time}.</p>
            <div>
                <button className={styles.defaultButton} onClick={props.handleSelect}>Play Again</button>
            </div>
        </section>
    )
}
Summary.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    moves: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
}

class Message extends React.Component {
    constructor(props) {
        super(props)

        this.selectDifficulty = this.selectDifficulty.bind(this)
        this.selectBackground = this.selectBackground.bind(this)
        this.restartGame = this.restartGame.bind(this)
    }

    selectDifficulty(e) {
        const selectionObject = {
            type: 'difficulty',
            value: e.target.value
        }
        this.props.handleUserSelection(selectionObject)
    }

    selectBackground(e) {
        const selectionObject = {
            type: 'background',
            value: e.target.value
        }
        this.props.handleUserSelection(selectionObject)
    }

    restartGame() {
        const selectionObject = {
            type: 'replay'
        }
        this.props.handleUserSelection(selectionObject)
    }

    render() {
        const screen = this.props.gameState === 'start' ?
            <Welcome 
                selectDifficulty={this.selectDifficulty}
                selectBackground={this.selectBackground}
            /> :
            <Summary 
                moves={this.props.moves} 
                time={this.props.time} 
                handleSelect={this.restartGame} 
            />
        
        return (
            <article className={styles.screen}>
                <Header style='screen' />
                {screen}
            </article>
        )
    }
}
Message.propTypes = {
    gameState: PropTypes.string.isRequired,
    handleUserSelection: PropTypes.func.isRequired,
    moves: PropTypes.number,
    time: PropTypes.string
}

export default Message