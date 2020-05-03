import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recipes from './Recipes';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';

class App extends Component {
  render() {
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
          <Route path="/" exact component={Recipes}/>
          <Route path="/edit/:id" exact component={EditRecipe}/>
          <Route path="/add" exact component={AddRecipe}/>
        </div>
      </Router>
    )
  }
}

export default App;
