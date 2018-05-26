import { TOGGLE_SHOW_GAME, TOGGLE_GAME_ACTIVE, TOGGLE_GAME_OVER, END_GAME } from '../actions/action-types'

const initialState = {
    showGame: false,
    gameActive: false,
    gameOver: false
}

export const gamestateReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SHOW_GAME:
            return { ...state, showGame: action.value }
        case TOGGLE_GAME_ACTIVE:
            return { ...state, gameActive: action.value }
        case TOGGLE_GAME_OVER:
            return { ...state, gameOver: action.value }
        case END_GAME:
            return { 
                ...state, 
                showGame: false,
                gameActive: false,
                gameOver: true
            }
        default:
            return state
    }
}