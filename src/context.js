import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
const CookinContext = React.createContext();

class CookinProvider extends Component {
    state = {
        id: "",
        name: "",
        email: "",
        password: "",
        toDashboard: false,
        errMsg: "",
        JWToken: null,
        refreshToken: "",
        recipes: [],
        currentRecipe: {
            recipeName: ""
        }
    };
    componentDidMount() {
        console.log("didmount");

        this.getJWToken();
        if (!this.state.JWToken) {
            console.log("no token");
        }
    }

    isAuthed = token => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        this.setState({ JWToken: token });
        axios
            .get("http://localhost:3000/api/users/user", config)
            .then(res => {
                console.log("login successful");
                console.log(res, "isauth");
                this.setState({
                    id: res.data.userData._id,
                    name: res.data.userData.name,
                    email: res.data.userData.email,
                    password: res.data.userData.password,
                    toDashboard: true
                });

                this.findAllRecipes(this.state.JWToken);
            })

            .catch(err => {
                console.log(err);
                this.setState({
                    errMsg: "you're not suppose to be here, please login."
                });
            });
    };
    signUp = data => {
        const { name, email, password } = data;
        const newUser = {
            name,
            email,
            password
        };

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/auth/", newUser, config)

            .then(res => {
                this.setState({
                    name: res.data.newUser.name,
                    email: res.data.newUser.email,
                    password: res.data.newUser.password,
                    JWToken: res.data.token
                });
                console.log("signed up");
                this.isAuthed(this.state.JWToken);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    errMsg: "Something happen, sorry, try again."
                });
            });
    };
    getJWToken = () => {
        //  console.log(this.state.refreshToken, "retoken");
        // axios.defaults.withCredentials = true;
        axios
            .post("http://localhost:3000/api/auth/refresh_token", null, {
                withCredentials: true
            })
            .then(res => {
                console.log("newjwt", res);
                this.setState({ JWToken: res.data.JWToken });
                let decoded = jwtDecode(this.state.JWToken);
                console.log(decoded, "decode");
                console.log(this.state.JWToken);
                // this is so nasty but it works
                this.isAuthed(this.state.JWToken);
            })
            .catch(err => {
                console.log(err, "newjwterr");
            });
    };

    login = data => {
        const { email, password } = data;
        const login = { email, password };
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/auth/login", login, config)
            .then(res => {
                this.setState({ JWToken: res.data.token });
                const { refreshToken } = res.data;
                console.log(refreshToken, "refreshToken");
                document.cookie = `refreshToken=${refreshToken}`;
                this.isAuthed(this.state.JWToken);
            })
            .catch(err => {
                console.log(err);
                this.setState({ errMsg: "email or password maybe incorrect" });
            });
    };
    findAllRecipes = token => {
        console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios
            .get("http://localhost:3000/api/users/recipes", config)
            .then(res => {
                console.log("found recipes");
                this.setState({ recipes: res.data.recipe });
                // this.state.recipes.forEach(recipe => {
                //     console.log(recipe.recipeName);
                //     this.state.recipes.push(recipe.recipeName);
                // });
            })

            .catch(err => {
                console.log(err);
                this.setState({
                    errMsg: "you're not suppose to be here, please login."
                });
            });
    };
    // only use this to get a recipe id
    findOneRecipe = recipeId => {
        const config = {
            headers: {
                Authorization: `Bearer ${this.state.JWToken}`
            }
        };
        axios
            .get(`http://localhost:3000/api/recipes/${recipeId}`, config)
            .then(res => {
                console.log(res, "findrecipe response");
                console.log(res.data.recipe.recipeName);
                this.setState({
                    currentRecipe: {
                        // ...this.state.currentRecipe,
                        recipeName: res.data.recipe.recipeName
                    }
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    createRecipe = data => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            img
        } = data;
        const newRecipe = {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            img
        };
        const config = {
            headers: {
                Authorization: `Bearer ${this.state.JWToken}`
            }
        };
        axios
            .post("http://localhost:3000/api/recipes/", newRecipe, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <CookinContext.Provider
                value={{
                    ...this.state,
                    signUp: this.signUp,
                    isAuthed: this.isAuthed,
                    login: this.login,
                    findAllRecipes: this.findAllRecipes,
                    findOneRecipe: this.findOneRecipe,
                    createRecipe: this.createRecipe,
                    getJWToken: this.getJWToken
                }}
            >
                {this.props.children}
            </CookinContext.Provider>
        );
    }
}
export { CookinProvider, CookinContext };
