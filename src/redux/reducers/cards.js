import { SET_PAIRS_COUNT, SELECT_PAIRING_CARD, SELECT_CORRECT_CARD, SELECT_WRONG_CARD, FLIP_BACK, RESET_CARD_STATE } from '../actions/action-types'

const initialState = {
    pairingCards: [],
    pairsMade: [],
    pairsRemaining: null,
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
                moves: state.moves + 1,
                wrongMoves: 0
            }
        case SELECT_WRONG_CARD:
            const wrongMoves = state.wrongMoves > 4 ? 0 : state.wrongMoves + 1
            return {
                ...state,
                pairingCards: [...state.pairingCards, action.card],
                moves: state.moves + 1,
                wrongMoves: wrongMoves
            }
        case FLIP_BACK:
            return {
                ...state,
                pairingCards: []
            }
        case RESET_CARD_STATE:
            return {
                ...state,
                pairingCards: [],
                pairsMade: [],
                pairsRemaining: null,
                moves: 0,
                wrongMoves: 0
            }
        default:
            return state
    }
}