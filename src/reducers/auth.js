import * as actionTypes from "../actionTypes/authActionTypes";

const initState = {
    id: "",
    name: "",
    toDashboard: false,
    email: "",
    password: "",
    JWToken: "",
    isAuthed: false,
    recipes: [],
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                toDashboard: true,
                email: action.payload.email,
                password: action.payload.password,
                JWToken: action.payload.token,
                id: action.payload._id,
                name: action.payload.name,
            };
            break;
        default:
            return initState;
    }
};

export default authReducer;
