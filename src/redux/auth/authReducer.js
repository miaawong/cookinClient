import * as authActionTypes from "./authActionTypes";

const initState = {
    id: "",
    name: "",
    email: "",
    password: "",
    JWToken: "",
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                email: action.payload.email,
                JWToken: action.payload.token,
                id: action.payload._id,
                name: action.payload.name,
                recipes: action.payload.recipes,
            };
        case authActionTypes.SET_NEW_TOKEN:
            return {
                ...state,
                JWToken: action.payload.token,
            };
        case authActionTypes.GET_JWT:
            return {
                ...state,
                JWToken: action.payload.JWToken,
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
            };
        default:
            return state;
    }
};

export default authReducer;
