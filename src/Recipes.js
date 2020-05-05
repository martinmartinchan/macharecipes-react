import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function RecipeList(props) {
	let recipeCards = [];
	if (props.recipes.length > 0) {
		props.recipes.forEach(recipe => {
			recipeCards.push(
				<Link to = {`/recipe/${recipe.name}`} className="no-decor" key={recipe.name}>
					<div className="card small-width mt-3 mx-auto cursor-pointer no-decor">
						<h5 className="card-header">{recipe.name}</h5>
						<div className="card-body text-left">
							<p className="card-text">{recipe.description}</p>
						</div>
					</div>
				</Link>
			)
		});
	}
	return recipeCards;
}

class Recipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredRecipes: {},
			showFiltered: false,
		}
	}

	showRecipe(recipe) {
		this.props.showRecipe(recipe);
	}

	setShowFiltered(showFiltered, recipes) {
		this.setState({
			filteredRecipes: recipes,
			showFiltered: showFiltered,
		})
	}

	render() {
		let listedRecipes = this.props.recipes;
		if (this.state.showFiltered) {
			listedRecipes = this.state.filteredRecipes;
		}
		if (this.props.loading) {
			return <div id="spin"></div>;
		} else {
			return (
				<div>
					<SearchBar
					recipes = {this.props.recipes}
					setShowFiltered = {(showFiltered, recipes) => this.setShowFiltered(showFiltered, recipes)}
					showRecipe = {(recipe) => this.showRecipe(recipe)}
					/>
					<RecipeList 
						recipes = {listedRecipes}
					/>
				</div>
			)
		}
	}
}

export default Recipes;