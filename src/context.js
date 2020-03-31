import React, { Component } from "react";
import axios from "axios";
const CookinContext = React.createContext();

class CookinProvider extends Component {
    state = {
        id: "",
        name: "",
        email: "",
        password: "",
        toDashboard: false,
        errMsg: "",
        JWToken: "",
        recipes: []
    };

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
            .post("http://localhost:3000/api/users/", newUser, config)

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

    login = data => {
        const { email, password } = data;
        const login = { email, password };
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios
            .post("http://localhost:3000/api/users/login", login, config)
            .then(res => {
                this.setState({ JWToken: res.data.token });
                console.log(this.state.JWToken);
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
                this.state.recipes.forEach(recipe => {
                    // to do
                    // find each of the recipes and get their details
                    //  this.findRecipe(recipe);
                    console.log(recipe);
                });
                console.log(this.state.recipes);
            })

            .catch(err => {
                console.log(err);
                this.setState({
                    errMsg: "you're not suppose to be here, please login."
                });
            });
    };

    findRecipe = recipeId => {
        const config = {
            headers: {
                Authorization: `Bearer ${this.state.JWToken}`
            }
        };
        axios
            .get(`http://localhost:3000/api/recipes/${recipeId}`, config)
            .then(res => {
                console.log(res.data.recipe.recipeName);
                let recipename = res.data.recipe.recipeName;
                return recipename;
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
                    findRecipe: this.findRecipe
                }}
            >
                {this.props.children}
            </CookinContext.Provider>
        );
    }
}
export { CookinProvider, CookinContext };
