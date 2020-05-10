import React, { Component } from 'react';
import RecipeForm from './RecipeForm';
import { getEmptyRecipe } from './../services/helper';

class EditRecipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldRecipeName: '',
			recipe: getEmptyRecipe(),
			recipeExists: false,
		}
	}

	componentDidMount() {
		const recipe = this.findRecipe(this.props.match.params.name);
		if (recipe) {
			this.setState({
				oldRecipeName: recipe.name,
				recipe: recipe,
				recipeExists: true,
			})
		}
	}

	updateRecipe(recipe){
		this.setState({
			recipe: recipe,
		})
	}

	findRecipe(recipeName) {
		let currentRecipe;
		this.props.recipes.forEach(recipe => {
			if (recipe.name.toLowerCase() === recipeName.toLowerCase()) {
				currentRecipe = recipe;
			}
		});
		return currentRecipe;
	}

	render() {
		if (!this.state.recipeExists) {
			return <div className="text-center mt-3">
				<img className="img-fluid mx-auto" src="/404.png" alt="404 Recipe not found"></img>
			</div>;
		} else {
			return <div className="container mt-5 mx-auto">
				<form>
					<RecipeForm 
						recipe = {this.state.recipe}
						updateRecipe = {(recipe) => this.updateRecipe(recipe)}
					/>
					<div className="d-flex flex-column align-items-end">
						<button className="btn btn-primary" type="submit" 
						onClick={(e) => {
							this.props.submitRecipe(this.state.oldRecipeName, this.state.recipe)
							e.preventDefault()
						}}>
							Submit Changes
						</button>	
					</div>
				</form>
			</div>;
		}
	}
}

export default EditRecipe;