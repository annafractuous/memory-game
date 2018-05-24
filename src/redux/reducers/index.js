import { combineReducers } from "redux"
import { selectionReducer } from "./selection"
import { cardsReducer } from "./cards"

// const initialState = {
//     gameState: {
//         showGame: false,        // gamePlay in App
//         gameActive: false,      // use in Timer
//         gameOver: false         // currently gameState ('start' or 'complete'), use in Message
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
    selection: selectionReducer,
    cards: cardsReducer
})

export default rootReducer