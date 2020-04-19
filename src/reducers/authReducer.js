import * as actionTypes from "../actionTypes/authActionTypes";

const initState = {
    id: "",
    name: "",
    toDashboard: false,
    email: "",
    password: "",
    JWToken: "",
    isAuthed: false,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                toDashboard: true,
                email: action.payload.email,
                JWToken: action.payload.token,
                id: action.payload._id,
                name: action.payload.name,
                recipes: action.payload.recipes,
            };
            break;
        case actionTypes.SET_NEW_TOKEN:
            return {
                ...state,
                JWToken: action.payload.token,
            };
            break;
        case actionTypes.GET_JWT:
            return {
                ...state,
                JWToken: action.payload.JWToken,
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                // toDashboard: true,
            };
            break;
        default:
            return initState;
    }
};

export default authReducer;
