import { TOGGLE_SHOW_GAME, TOGGLE_GAME_ACTIVE, TOGGLE_GAME_OVER, END_GAME, RESTART_GAME } from '../actions/action-types'

export const toggleShowGame = bool => ({
    type: TOGGLE_SHOW_GAME,
    value: bool
})

export const toggleGameActive = bool => ({
    type: TOGGLE_GAME_ACTIVE,
    value: bool
})

export const toggleGameOver = bool => ({
    type: TOGGLE_GAME_OVER,
    value: bool
})

export const endGame = () => ({
    type: END_GAME
})