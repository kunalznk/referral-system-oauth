import { combineReducers } from "redux";
import appSlice from "./slice/appSlice";

const reducer = combineReducers({
    app:appSlice.reducer
})

export default reducer;