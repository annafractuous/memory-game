import { SELECT_DIFFICULTY, SELECT_BACKGROUND } from '../actions/action-types'

export const selectDifficulty = selection => ({
    type: SELECT_DIFFICULTY,
    selection: selection
})

export const selectBackground = selection => ({
    type: SELECT_BACKGROUND,
    selection: selection
})