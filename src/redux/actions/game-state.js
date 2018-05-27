import { TOGGLE_SHOW_GAME, TOGGLE_GAME_ACTIVE, TOGGLE_GAME_OVER, END_GAME, CARDS_LOADING_STATE, SET_CARDS, TOGGLE_DILLY_DALI } from '../actions/action-types'

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

export const cardsLoadingState = value => ({
    type: CARDS_LOADING_STATE,
    value: value
})

export const setCards = cards => ({
    type: SET_CARDS,
    cards: cards
})

export const toggleDillyDali = bool => ({
    type: TOGGLE_DILLY_DALI,
    value: bool
})