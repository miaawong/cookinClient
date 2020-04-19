import { combineReducers } from "redux";
import authReducer from "../redux/auth/authReducer";
import recipeReducer from "../redux/recipes/recipeReducer";

export default combineReducers({
    authReducer,
    recipeReducer,
});
