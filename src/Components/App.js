import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipes from './Recipes';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import SingleRecipe from './SingleRecipe';
import {get, addRecipe, deleteRecipe, editRecipe} from './../services/db_handler';
import { getEmptyRecipe, checkRecipeValidity } from './../services/helper';

class App extends Component {
  constructor(props) {
    super(props);
    // If there is a status message saved in the sessionStorage, it means we should show it and it is a success
    this.state = {
      loading: true,
      recipes: {},
      addRecipe: getEmptyRecipe(),
      status: {
        showing: false,
        message: '',
        success: false,
      },
    }
  }

  componentDidMount() {
    // Retrieve all recipes from database
    this.getAllRecipes();
    // If there is a status message saved in the sessionStorage, it means we should show it and it is a success
    const statusMessage = sessionStorage.getItem('statusMessage');
    if (statusMessage) {
      this.showStatus(true, statusMessage);
    }
  }

  // Sets the status for 5 seconds
  showStatus(success, message){
    this.setState({
      status: {
        showing: true,
        message: message,
        success: success,
      },
    });
    setTimeout(() => {
      // Remove status message if this came from the sessionStorage
      sessionStorage.removeItem('statusMessage');
      this.setState({
        status: {
          showing: false,
          message: '',
          success: false,
        },
      });
    }, 5000);
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
          if (data.success) {
            // We will refresh page after this and thus, sessionStorage needs to be set to show status after refresh
            sessionStorage.setItem("statusMessage", data.message);
            this.showRecipe(this.state.addRecipe);
          } else {
            this.setState({
              loading: false,
            });
            this.showStatus(false, data.message);
          }
        })
        .catch(err => console.log(err));
      });
    } else {
      this.setState({
        loading: false,
      });
      this.showStatus(false, "Recipe must contain name, number of servings, at least one non-empty ingredient and at least one non-empty instruction.");
    }
  }

  submitEditRecipe(oldRecipeName, newRecipe) {
    if (checkRecipeValidity(newRecipe)) {
      this.setState({
        loading: true,
      }, () => {
        editRecipe(oldRecipeName, newRecipe)
        .then(data => {
          if (data.success) {
            // We will refresh page after this and thus, sessionStorage needs to be set to show status after refresh
            sessionStorage.setItem("statusMessage", data.message);
            this.showRecipe(newRecipe);
          } else {
            this.setState({
              loading: false,
            });
            this.showStatus(false, data.message);
          }
        })
        .catch(err => console.log(err));
      });
    } else {
      this.setState({
        loading: false,
      });
      this.showStatus(false, "Recipe must contain name, number of servings, at least one non-empty ingredient and at least one non-empty instruction.");
    }
  }

  deleteRecipe(recipe) {
    const recipeName = {name: recipe.name}
    this.setState({
      loading: true,
    }, () => {deleteRecipe(recipeName)
      .then(data => {
        console.log(data);
        if(data.success) {
          sessionStorage.setItem("statusMessage", data.message);
          this.setState({
            loading: false,
          });
          window.location.pathname = '/';
        } else {
          this.setState({
            loading: false,
          });
          this.showStatus(false, data.message);
        }
      })
      .catch(err => console.log(err));
    });
  }

  editRecipe(recipe) {
    window.location.pathname = `/edit/${recipe.name}`;
  }

  showRecipe(recipe) {
    window.location.pathname = `/recipe/${recipe.name}`;
  }

  render() {
    let status = null;
    if (this.state.status.showing) {
      let statusClass = this.state.status.success ? "alert alert-success text-center" : "alert alert-danger text-center";
      status = <div className={statusClass} role="alert">
        {this.state.status.message}
      </div>
    }
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
              recipes = {this.state.recipes}
              deleteRecipe = {(recipe) => this.deleteRecipe(recipe)}
              editRecipe = {(recipe) => this.editRecipe(recipe)}
            />
          }
        />
        <Route
          path = "/edit/:name"
          exact render = {
            (routerProps) => <EditRecipe
              {...routerProps}
              recipes = {this.state.recipes}
              submitRecipe = {(oldRecipeName, newRecipe) => this.submitEditRecipe(oldRecipeName, newRecipe)}
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
              <img id="logo" src='/logo.png' alt="Logo"/>
            </Link>
            <Link to = "/" className="no-decor nav-item navbar-nav ml-3 text-white">
                Recipes
            </Link>
            <Link to = "/add" className="no-decor nav-item navbar-nav ml-3 text-white">
                Add Recipe
            </Link>
          </div>
          {status}
          {content}
        </div>
      </Router>
    )
  }
}

export default App;
