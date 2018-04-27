import React from 'react'
import PropTypes from 'prop-types';

const Welcome = props => {
    return (
        <article>
            <h1>Memory</h1>
            <h4>The game you won't soon forget</h4>
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
            <h1>Memory</h1>
            <h4>The game you won't soon forget</h4>
            <div>
                <p>Done! Want to play again?</p>
                <div>
                    <button onClick={props.handleClick}>Yes</button>
                </div>
            </div>
        </article>
    )
}
Summary.propTypes = {
    handleClick: PropTypes.func.isRequired
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
            return <Welcome handleClick={this.selectDifficulty}/>
        } else if (this.props.gameState === 'complete') {
            return <Summary handleClick={this.restartGame} />
        }
    }
}
Message.propTypes = {
    gameState: PropTypes.string.isRequired,
    handleUserSelection: PropTypes.func.isRequired
}

export default Message