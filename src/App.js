import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipes from './Recipes';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import SingleRecipe from './SingleRecipe';
import {get, addRecipe, deleteRecipe, editRecipe} from './services/db_handler';

/** Function returning the status and loading screen */
function Status(props) {
  if (props.loading) {
    return (
      <div id="spin"></div>
    )
  } else {
    return null;
  }
}

function RecipesList(props) {

}

class App extends Component {
  constructor(props) {
    super(props);
    this.getAllRecipes();
    this.state = {
      loading: true,
      recipes: {},
    }
  }

  getAllRecipes() {
    get()
    .then(data => {
      console.log(data);
      this.setState({
        loading: false,
        recipes: data.result,
      })
    });
  }

  showRecipe(recipe) {
    window.location.pathname = `/recipe/${recipe.name}`;
  }

  render() {
    return (
      <Router>
        <div className="container mb-5">
          <div className="navbar align-middle navbar-expand bg-dark">
            <Link to = "/" className="no-decor nav-item navbar-nav mr-auto text-white">
              <img id="logo" src={'logo.png'} alt="Logo"/>
            </Link>
            <Link to = "/" className="no-decor nav-item navbar-nav ml-3 text-white">
                Recipes
            </Link>
            <Link to = "/add" className="no-decor nav-item navbar-nav ml-3 text-white">
                Add Recipe
            </Link>
          </div>
          <Switch>
            <Route 
              path = "/"
              exact render = {
                () => <Recipes
                  loading = {this.state.loading}
                  recipes = {this.state.recipes}
                  showRecipe = {(recipe) => this.showRecipe(recipe)}
                />
              }
            />
            <Route 
              path = "/add"
              exact render = {
                () => <AddRecipe
                  loading = {this.state.loading}
                />
              }
            />
            <Route
              path = "/recipe/:name"
              exact render = {
                (routerProps) => <SingleRecipe
                  {...routerProps}
                  loading = {this.state.loading}
                />
              }
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
