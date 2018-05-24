import { SET_PAIRS_COUNT, SELECT_PAIRING_CARD, SELECT_CORRECT_CARD, SELECT_WRONG_CARD, FLIP_BACK } from '../actions/action-types'

const initialState = {
    pairingCards: [],
    pairsMade: [],
    pairsRemaining: 100,
    moves: 0,
    wrongMoves: 0
}

export const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAIRS_COUNT:
            return {
                ...state,
                pairsRemaining: action.totalPairs
            }
        case SELECT_PAIRING_CARD:
            return {
                ...state,
                pairingCards: [...state.pairingCards, action.card]
            }
        case SELECT_CORRECT_CARD:
            return {
                ...state,
                pairingCards: [...state.pairingCards, action.card],
                pairsMade: [...state.pairsMade, action.card.value],
                pairsRemaining: state.pairsRemaining - 1,
                moves: state.moves + 1
            }
        case SELECT_WRONG_CARD:
            return {
                ...state,
                pairingCards: [...state.pairingCards, action.card],
                moves: state.moves + 1
            }
        case FLIP_BACK:
            return {
                ...state,
                pairingCards: [],
                wrongMoves: action.wrongMoves
            }
        default:
            return state
    }
}