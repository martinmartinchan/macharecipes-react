import React, { Component } from 'react';
import SearchBar from './SearchBar';

function RecipeList(props) {
	let recipeCards = [];
	props.recipes.forEach(recipe => {
		recipeCards.push(
			<div key={recipe.name} className="card small-width mt-3 mx-auto cursor-pointer">
				<h5 className="card-header">{recipe.name}</h5>
				<div className="card-body text-left">
					<p className="card-text">{recipe.description}</p>
				</div>
			</div>
		)
	});
	return recipeCards;
}

class Recipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listedRecipes: this.props.recipes,
		}
	}

	foundRecipe(recipe) {
		this.props.onFound(recipe);
	}

	listRecipes(recipes) {
		this.setState({
			listedRecipes: recipes,
		})
	}

	render() {
		return (
			<div>
				<SearchBar
				recipes = {this.props.recipes}
				onFound = {(recipe) => this.foundRecipe(recipe)}
				onSearch = {(recipes) => this.listRecipes(recipes)}
				/>
				<RecipeList 
					recipes = {this.state.listedRecipes}
				/>
			</div>
		)
	}
}

export default Recipes;