import { SELECT_DIFFICULTY, SELECT_BACKGROUND, CLEAR_SELECTIONS } from '../actions/action-types'

export const selectDifficulty = selection => ({
    type: SELECT_DIFFICULTY,
    selection: selection
})

export const selectBackground = selection => ({
    type: SELECT_BACKGROUND,
    selection: selection
})

export const clearSelections = () => ({
    type: CLEAR_SELECTIONS
})