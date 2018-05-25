import { SELECT_DIFFICULTY, SELECT_BACKGROUND, CLEAR_SELECTIONS } from '../actions/action-types'

const initialState = {
    difficulty: '',
    background: ''
}

export const selectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_DIFFICULTY:
            return { ...state, difficulty: action.selection }
        case SELECT_BACKGROUND:
            return { ...state, background: action.selection }
        case CLEAR_SELECTIONS:
            return { 
                ...state, 
                difficulty: '',
                background: ''
            }
        default:
            return state
    }
}