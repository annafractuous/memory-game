import { SET_TOTAL_TIME, SET_TOTAL_MOVES, CLEAR_TOTALS } from '../actions/action-types'

const initialState = {
    time: '0:00',
    moves: 0
}

export const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOTAL_TIME:
            return { ...state, time: action.time }
        case SET_TOTAL_MOVES:
            return { ...state, moves: action.moves }
        case CLEAR_TOTALS:
            return { 
                ...state, 
                time: '0:00',
                moves: 0
            }
        default:
            return state
    }
}