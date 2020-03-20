const isAlpha = str => {
    if (str.match(/^[a-zA-Z() ]+$/)) {
        return true;
    } else {
        return false;
    }
};

const isEmail = str => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (str.match(regex)) {
        return true;
    } else {
        return false;
    }
};

//if email is actually an email

// validate signup
export const validateSignUp = state => {
    const { name, email, password } = state;
    if (!isAlpha(name)) {
        return "Only alphabets please, no numbers and symbols";
    }

    if (!isEmail(email)) {
        return "Doesn't look like an email...";
    }

    if (password.length < 8) {
        return "Should be 8 characters or more";
    }
};

// validate login
