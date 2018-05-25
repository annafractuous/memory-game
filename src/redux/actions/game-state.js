import { TOGGLE_SHOW_GAME, TOGGLE_GAME_ACTIVE, TOGGLE_GAME_OVER, END_GAME, RESTART_GAME } from '../actions/action-types'

export const toggleShowGame = value => ({
    type: TOGGLE_SHOW_GAME,
    value: value
})

export const toggleGameActive = value => ({
    type: TOGGLE_GAME_ACTIVE,
    value: value
})

export const toggleGameOver = value => ({
    type: TOGGLE_GAME_OVER,
    value: value
})

export const endGame = () => ({
    type: END_GAME
})

export const restartGame = () => ({
    type: RESTART_GAME
})