//if anything is empty
const isEmpty = str => {
    if (str === "") {
        return true;
    } else {
        return false;
    }
};

//if email is actually an email

// validate signup
export const validateSignUp = state => {
    const { fname, lname, email, password } = state;
    if (isEmpty(fname)) {
        console.log("required");
    }
    //else if (!isAlpha(fname)) {
    //     console.log("only alphabetic characters please!");
    // }
};

// validate login
