import React, { Component } from 'react';

class SingleRecipe extends Component {
	constructor(props) {
		super(props);
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
		const recipe = this.findRecipe(this.props.match.params.name);
		const ingredients = [];
		let colorCounter = 0;
		recipe.ingredients.forEach(ing => {
			const colourClass = colorCounter % 2 ? "tr-nothing" : "tr-primary";
			ingredients.push(
				<tr key={colorCounter} className={colourClass}>
					<td>{ing.name}</td>
					<td>{ing.amount} {ing.unit}</td>
				</tr>
			);
			colorCounter++;
		})
		const instructions = [];
		recipe.instructions.forEach(inst => {
			instructions.push(<div key={inst.step} className="row mb-3 ml-3">
				<div className="col-1 align-self-center text-center">{inst.step}.</div>
				<div className="col-11">{inst.instruction}</div>
			</div>
			);
		});
		return <div className="container mt-5 text-left">
			<h1>{recipe.name}</h1>
			<h5>Servings: {recipe.servings}</h5>
			<p>{recipe.description}</p>
			<div className="d-flex align-items-stretch flex-wrap flex-sm-nowrap mt-3">
				<div className="max-width-large-screen flex-sm-grow-0">
					<h5>Ingredients</h5>
					<table className="table">
						<tbody>
							{ingredients}
						</tbody>	
					</table>
				</div>
				<div>
					<h5>Instructions</h5>
					{instructions}
				</div>
			</div>
			<div className="d-flex flex-column align-items-end">
				<div className="form-group mt-3">
					<button className="btn btn-primary mr-3" onClick={() => this.props.editRecipe(recipe)}>Edit Recipe</button>
					<button className="btn btn-danger" onClick={() => this.props.deleteRecipe(recipe)}>Delete Recipe</button>
				</div>
			</div>
		</div>;
	}
}

export default SingleRecipe;