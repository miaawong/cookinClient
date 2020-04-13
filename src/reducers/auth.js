import * as actionTypes from "../actionTypes/authActionTypes";

const initState = {
    loading: false,
    email: "",
    password: "",
    // JWToken: "",
    // isAuthed: false,
    // user: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                email: action.payload.email,
            };
            break;

        default:
            return initState;
    }
};

export default authReducer;
