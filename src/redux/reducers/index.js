import { combineReducers } from "redux";
import { selectionReducer } from "./message";

// const initialState = {
// 	   gameActive: false,
//     gameState: 'start',
//     difficulty: 'easy',
//     background: '',
//     totalTime: '0:00',
//     totalMoves: 0,
//     cardsLoaded: false,
//     cards: {},
//     gamePlay: false,
//     dillyDali: false,
//     pairingCards: [],
//     pairsMade: [],
//     pairsRemaining: null,
//     moves: 0,
//     movesSinceMatch: 0
// }

const rootReducer = combineReducers({
    selection: selectionReducer
})

export default rootReducer;