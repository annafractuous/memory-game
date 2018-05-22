import { createStore } from "redux";
import rootReducer from "../reducers/index";

console.log('rootReducer', rootReducer)

const store = createStore(rootReducer);

export default store;