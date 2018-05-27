import { combineReducers } from "redux"
import { gamestateReducer } from "./game-state"
import { selectionReducer } from "./selection"
import { summaryReducer } from "./summary"
import { cardsReducer } from "./cards"

// const initialState = {
//     gameState: {
//         showGame: false,
//         gameActive: false,
//         gameOver: false
//     },
//     selection: {
//         difficulty: '',
//         background: ''
//     },
//     summary: {
//         totalTime: '0:00',
//         totalMoves: 0
//     },
//     buttonGroup: {
//         selected: null
//     },
//     game: {
//         cardsLoaded: false,
//         cards: null
//     },
//     gamePlay: {
//         dillyDali: false
//     },
//     cards: {
//         firstCard: true,
//         pairingCards: [],
//         pairsMade: [],
//         pairsRemaining: null,
//         moves: 0,
//         movesSinceMatch: 0
//     }
// }

const rootReducer = combineReducers({
    gameState: gamestateReducer,
    selection: selectionReducer,
    summary: summaryReducer,
    cards: cardsReducer
})

export default rootReducer