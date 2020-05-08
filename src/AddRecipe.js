import React, { Component } from 'react';

class AddRecipe extends Component {
	constructor(props) {
		super(props);
	}

	changeRecipe(e, fn) {
		let oldRecipe = this.props.recipe;
		let newRecipe = fn(oldRecipe);
		this.props.updateRecipe(newRecipe);
		e.preventDefault();
	}

	addIngredientRow(recipe) {
		recipe.ingredients.push({
			name: "",
			amount: "",
			unit: "",
		});
		return recipe;
	}

	addInstructionRow(recipe) {
		recipe.instructions.push({
			step: recipe.instructions.length + 1,
			instruction: "",	
		});
		return recipe;
	}

	removeIngredientRow(recipe, index) {
		recipe.ingredients.splice(index, 1);
		return recipe;
	}

	removeInstructionRow(recipe, index) {
		recipe.instructions.splice(index, 1);
		return recipe;
	}

	handleChangeName(recipe, value) {
		recipe.name = value;
		return recipe;
	}

	handleChangeServings(recipe, value) {
		recipe.servings = value;
		return recipe;
	}

	handleChangeDescription(recipe, value) {
		recipe.description = value;
		return recipe;
	}

	handleChangeIngredientName(recipe, index, value) {
		recipe.ingredients[index].name = value;
		return recipe;
	}

	handleChangeIngredientAmount(recipe, index, value) {
		recipe.ingredients[index].amount = value;
		return recipe;
	}

	handleChangeIngredientUnit(recipe, index, value) {
		recipe.ingredients[index].unit = value;
		return recipe;
	}

	handleChangeInstruction(recipe, index, value) {
		recipe.instructions[index].instruction = value;
		return recipe;
	}

	submitRecipe(e) {
		this.props.submitRecipe();
		e.preventDefault();
	}

	render() {
		let ingredients = [];
		ingredients.push(<div key={0} className="form-row flex-nowrap">
			<div className="form-group col-7">
				<label htmlFor="ingredients-input">Ingredient</label>
				<input value={this.props.recipe.ingredients[0].name} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeIngredientName(recipe, 0, e.target.value)})} className="form-control ingredients-input"></input>
			</div>
			<div className="form-group col-2">
				<label htmlFor="amount-input">Amount</label>
				<input value={this.props.recipe.ingredients[0].amount} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeIngredientAmount(recipe, 0, e.target.value)})} className="form-control amount-input"></input>
			</div>
			<div className="form-group col-2">
				<label htmlFor="units-input">Unit</label>
				<input value={this.props.recipe.ingredients[0].unit} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeIngredientUnit(recipe, 0, e.target.value)})} className="form-control units-input"></input>
			</div>
		</div>);

		for (let i = 1; i < this.props.recipe.ingredients.length; i++) {
			ingredients.push(
				<div key={i} className="form-row flex-nowrap">
					<div className="form-group col-7">
						<input value={this.props.recipe.ingredients[i].name} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeIngredientName(recipe, i, e.target.value)})} className="form-control ingredients-input"></input>
					</div>
					<div className="form-group col-2">
						<input value={this.props.recipe.ingredients[i].amount} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeIngredientAmount(recipe, i, e.target.value)})} className="form-control amount-input"></input>
					</div>
					<div className="form-group col-2">
						<input value={this.props.recipe.ingredients[i].unit} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeIngredientUnit(recipe, i, e.target.value)})} className="form-control units-input"></input>
					</div>
					<div className="form-group col-1">
						<button className="btn btn-danger w-100" type="submit" onClick={e => this.changeRecipe(e, recipe => {return this.removeIngredientRow(recipe, i)})}>-</button>
					</div>
				</div>
			);
		}

		ingredients.push(<div key={this.props.recipe.ingredients.length+1} className="form-row flex-nowrap">
			<div className="form-group col-7">
				<input className="form-control" readOnly></input>
			</div>
			<div className="form-group col-2">
				<input className="form-control" readOnly></input>
			</div>
			<div className="form-group col-2">
				<input className="form-control" readOnly></input>
			</div>
			<div className="form-group col-1">
				<button type="submit" className="btn btn-primary w-100" onClick={e => this.changeRecipe(e, recipe => {return this.addIngredientRow(recipe)})}>+</button>
			</div>
		</div>);

		let instructions = [];
		instructions.push(<div key={0} className="form-row align-items-end flex-nowrap">
			<div className="form-group col-1 align-self-center">
				<span>{this.props.recipe.instructions[0].step}.</span>
			</div>
			<div className="form-group col-9">
				<textarea value={this.props.recipe.instructions[0].instruction} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeInstruction(recipe, 0, e.target.value)})} className="form-control instruction-input" rows="2"></textarea>
			</div>
		</div>);

		for (let i = 1; i < this.props.recipe.instructions.length; i++) {
			instructions.push(<div key={i} className="form-row align-items-end flex-nowrap">
				<div className="form-group col-1 align-self-center">
					<span className="instruction-step">{this.props.recipe.instructions[i].step}.</span>
				</div>
				<div className="form-group col-9">
					<textarea value={this.props.recipe.instructions[i].instruction} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeInstruction(recipe, i, e.target.value)})} className="form-control instruction-input"></textarea>
				</div>
				<div className="form-group col-1">
					<button onClick={e => this.changeRecipe(e, recipe => {return this.removeInstructionRow(recipe, i)})}className="btn btn-danger w-100" type="submit">-</button>
				</div>
			</div>
			);
		}

		instructions.push(<div key={this.props.recipe.instructions.length+1} className="form-row align-items-end flex-nowrap">
			<div className="form-group col-1 align-self-center">
				<span id="read-only-instruction-number">{this.props.recipe.instructions.length+1}.</span>
			</div>
			<div className="form-group col-9">
				<textarea className="form-control" rows="2" readOnly></textarea>
			</div>
			<div className="form-group col-1">
				<button onClick={e => this.changeRecipe(e, recipe => {return this.addInstructionRow(recipe)})} type="submit" className="btn btn-primary w-100">+</button>
			</div>
		</div>
		);

		return <div className="container mt-5 mx-auto">
			<form>
				<div className="form-group col-sm-12">
					<label htmlFor="recipe-name">Recipe Name</label>
					<input value={this.props.recipe.name} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeName(recipe, e.target.value)})} className="form-control" placeholder="Enter recipe name"></input>
				</div>

				<div>
					<div className="form-group col-6 col-md-3">
						<label htmlFor="servings">Servings</label>
						<input type="number" value={this.props.recipe.servings} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeServings(recipe, e.target.value)})} className="form-control" placeholder="Enter number of servings"></input>
					</div>
        </div>

				<div className="form-group col-12">
          <label htmlFor="recipe-description">Description</label>
          <textarea value={this.props.recipe.description} onChange={e => this.changeRecipe(e, recipe => {return this.handleChangeDescription(recipe, e.target.value)})} className="form-control" rows="3" placeholder="Enter description"></textarea>
        </div>

				<div className="small-width mx-auto">
					{ingredients}
				</div>
				
				<div className="small-width mx-auto">
					<label htmlFor="instruction-input">Instructions</label>
					{instructions}
				</div>

				<div className="d-flex flex-column align-items-end">
					<button className="btn btn-primary" type="submit" onClick={e => this.submitRecipe(e)}>Add Recipe</button>	
        </div>
			</form>
		</div>;
	}
}

export default AddRecipe;