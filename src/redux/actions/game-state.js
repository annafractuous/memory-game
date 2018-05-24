import { TOGGLE_GAME_VIEW, TOGGLE_GAME_ACTIVE, TOGGLE_GAME_OVER } from '../actions/action-types'

export const toggleGameView = value => ({
    type: TOGGLE_GAME_VIEW,
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