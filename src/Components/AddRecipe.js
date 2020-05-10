import React, { Component } from 'react';
import RecipeForm from './RecipeForm';

class AddRecipe extends Component {
	render() {
		return <div className="container mt-5 mx-auto">
			<form>
				<RecipeForm 
					recipe = {this.props.recipe}
					updateRecipe = {(recipe) => this.props.updateRecipe(recipe)}
				/>
				<div className="d-flex flex-column align-items-end">
					<button className="btn btn-primary" type="submit" 
						onClick={(e) => {
							this.props.submitRecipe()
							e.preventDefault()
						}}>
						Add Recipe
					</button>	
        </div>
			</form>
		</div>;
	}
}

export default AddRecipe;