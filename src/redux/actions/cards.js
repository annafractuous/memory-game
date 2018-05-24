import { SET_PAIRS_COUNT, SELECT_PAIRING_CARD, SELECT_CORRECT_CARD, SELECT_WRONG_CARD, FLIP_BACK } from '../actions/action-types'

export const setPairsCount = totalPairs => ({
    type: SET_PAIRS_COUNT,
    totalPairs: totalPairs
})

export const selectPairingCard = card => ({
    type: SELECT_PAIRING_CARD,
    card: card
})

export const selectCorrectCard = card => ({
    type: SELECT_CORRECT_CARD,
    card: card
})

export const selectWrongCard = card => ({
    type: SELECT_WRONG_CARD,
    card: card
})

export const flipBack = () => ({
    type: FLIP_BACK
})