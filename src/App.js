import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipes from './Recipes';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import SingleRecipe from './SingleRecipe';
import {get, addRecipe, deleteRecipe, editRecipe} from './services/db_handler';
import { getEmptyRecipe, checkRecipeValidity } from './services/helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.getAllRecipes();
    this.state = {
      loading: true,
      recipes: {},
      addRecipe: getEmptyRecipe(),
    }
  }

  showStatus() {
    // TODO
  }

  getAllRecipes() {
    get()
    .then(data => {
      this.setState({
        loading: false,
        recipes: data.result,
      })
    });
  }

  updateAddRecipe(recipe) {
    this.setState({
      addRecipe: recipe,
    })
  }

  submitAddRecipe() {
    if (checkRecipeValidity(this.state.addRecipe)) {
      this.setState({
        loading: true,
      }, () => {
        addRecipe(this.state.addRecipe)
        .then(data => {
          this.showRecipe(this.state.addRecipe)
          this.setState({
            loading: false,
            recipes: data.result,
            addRecipe: getEmptyRecipe(),
          });
        })
        .catch(err => console.log(err));
      });
    } else {
      // TODO
      this.showStatus();
    }
  }

  showRecipe(recipe) {
    window.location.pathname = `/recipe/${recipe.name}`;
  }

  render() {
    let content = null;
    if (this.state.loading) {
      content = <div id="spin"></div>;
    } else {
      content = <Switch>
        <Route 
          path = "/"
          exact render = {
            () => <Recipes
              recipes = {this.state.recipes}
              showRecipe = {recipe => this.showRecipe(recipe)}
            />
          }
        />
        <Route 
          path = "/add"
          exact render = {
            () => <AddRecipe
              recipe = {this.state.addRecipe}
              updateRecipe = {recipe => this.updateAddRecipe(recipe)}
              submitRecipe = {() => this.submitAddRecipe()}
            />
          }
        />
        <Route
          path = "/recipe/:name"
          exact render = {
            (routerProps) => <SingleRecipe
              {...routerProps}
            />
          }
        />
      </Switch>;
    }
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
          {content}
        </div>
      </Router>
    )
  }
}

export default App;
