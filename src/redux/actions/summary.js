import { SET_TOTAL_TIME, SET_TOTAL_MOVES, CLEAR_TOTALS } from '../actions/action-types'

export const setTotalTime = time => ({
    type: SET_TOTAL_TIME,
    time: time
})

export const setTotalMoves = moves => ({
    type: SET_TOTAL_MOVES,
    moves: moves
})

export const clearTotals = () => ({
    type: CLEAR_TOTALS
})