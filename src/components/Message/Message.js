import React from 'react'
import PropTypes from 'prop-types'

const Title = () => {
    return (
        <header>
            <h1>Memory</h1>
            <h4>An unforgettable classic</h4>
        </header>
    )
}

const Welcome = props => {
    return (
        <article>
            <Title />
            <div>
                <p>Select your difficulty level.</p>
                <div>
                    <button value='easy' onClick={props.handleClick}>Easy</button>
                    <button value='hard' onClick={props.handleClick}>Hard</button>
                </div>
            </div>
        </article>
    )
}
Welcome.propTypes = {
    handleClick: PropTypes.func.isRequired
}

const Summary = props => {
    return (
        <article>
            <Title />
            <div>
                <p>Done! You won the game in {props.moves} moves in {props.time}.</p>
                <div>
                    <button onClick={props.handleClick}>Play Again</button>
                </div>
            </div>
        </article>
    )
}
Summary.propTypes = {
    handleClick: PropTypes.func.isRequired,
    moves: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
}

class Message extends React.Component {
    constructor(props) {
        super(props)

        this.selectDifficulty = this.selectDifficulty.bind(this)
        this.restartGame = this.restartGame.bind(this)
    }

    selectDifficulty(e) {
        const selectionObject = {
            type: 'difficulty',
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
        if (this.props.gameState === 'start') {
            return (
                <Welcome handleClick={this.selectDifficulty}/>
            )
        } else if (this.props.gameState === 'complete') {
            return (
                <Summary 
                    moves={this.props.moves} 
                    time={this.props.time} 
                    handleClick={this.restartGame} 
                />
            )
        }
    }
}
Message.propTypes = {
    gameState: PropTypes.string.isRequired,
    handleUserSelection: PropTypes.func.isRequired,
    moves: PropTypes.number,
    time: PropTypes.string
}

export default Message