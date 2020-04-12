import * as actionTypes from "../actionTypes/authActionTypes";

const initState = {
    JWToken: "",
    isAuthed: false,
    user: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return console.log("login");

        default:
            return state;
    }
};

export default authReducer;
