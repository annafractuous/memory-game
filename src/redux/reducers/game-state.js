import { TOGGLE_GAME_VIEW, TOGGLE_GAME_ACTIVE, TOGGLE_GAME_OVER } from '../actions/action-types'

const initialState = {
    showGame: false,
    gameActive: false,
    gameOver: false
}

export const gamestateReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_GAME_VIEW:
            return { ...state, showGame: action.value }
        case TOGGLE_GAME_ACTIVE:
            return { ...state, gameActive: action.value }
        case TOGGLE_GAME_OVER:
            return { ...state, gaveOver: action.value }
        default:
            return state
    }
}