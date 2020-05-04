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
      listedRecipes: {},
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

  foundRecipe(recipe) {
    
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <div id="spin"></div>;
    } else {
      content = (
        <Switch>
          <Route path="/">
            <Recipes 
              recipes = {this.state.recipes}
              onFound = {(recipe) => this.foundRecipe(recipe)}
            />
          </Route>
          <Route path="/edit/:id">
            <EditRecipe />
          </Route>
          <Route path="/recipe/:id">
            <SingleRecipe />
          </Route>
          <Route path="/add">
            <AddRecipe />
          </Route>
        </Switch>
      );
    }
    return (
      <Router>
        <div className="container mb-5">
          <ul className="navbar align-middle navbar-expand bg-dark">
            <li className="nav-item navbar-nav mr-auto text-white">
            <Link to="/" className="text-white no-decor">
              <img id="logo" src={'logo.png'} alt="Logo"/>
            </Link>
            </li>
            <li className="nav-item navbar-nav ml-3 text-white">
            <Link to="/" className="text-white no-decor">
              Recipes
            </Link>
            </li>
            <li className="nav-item navbar-nav ml-3">
            <Link to="/add" className="text-white no-decor">
              Add Recipe
            </Link>
            </li>
          </ul>
          {content}
        </div>
      </Router>
    )
  }
}

export default App;
