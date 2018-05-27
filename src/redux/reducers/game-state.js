import { TOGGLE_SHOW_GAME, TOGGLE_GAME_ACTIVE, TOGGLE_GAME_OVER, END_GAME, CARDS_LOADING_STATE, SET_CARDS, TOGGLE_DILLY_DALI } from '../actions/action-types'

const initialState = {
    showGame: false,
    gameActive: false,
    gameOver: false,
    cardsLoaded: 'false',
    cards: {},
    dillyDali: false
}

export const gamestateReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SHOW_GAME:
            return { ...state, showGame: action.value }
        case TOGGLE_GAME_ACTIVE:
            return { ...state, gameActive: action.value }
        case TOGGLE_GAME_OVER:
            return { ...state, gameOver: action.value }
        case CARDS_LOADING_STATE:
            return { ...state, cardsLoaded: action.value }
        case SET_CARDS:
            return { ...state, cards: action.cards }
        case TOGGLE_DILLY_DALI:
            return { ...state, dillyDali: action.value }
        case END_GAME:
            return { 
                ...state,
                gameActive: false,
                gameOver: true
            }
        default:
            return state
    }
}