import React, { Component } from 'react';

class AddRecipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			servings: "",
			description: "",
			ingredients: [
				{
					name: "",
					amount: "",
					unit: "",
				}
			],
			instructions: [
				{
					step: 1,
					instruction: "",	
				}
			],
		}
	}

	addIngredientRow(e) {
		const tempIngredients = this.state.ingredients;
		tempIngredients.push({
			name: "",
			amount: "",
			unit: "",
		});
		this.setState({
			ingredients: tempIngredients,
		})
		e.preventDefault();
	}

	addInstructionRow(e) {
		const tempInstructions = this.state.instructions;
		tempInstructions.push({
			step: tempInstructions.length,
			instruction: "",	
		});
		this.setState({
			instructions: tempInstructions,
		})
		e.preventDefault();
	}

	removeIngredientRow(e, index) {
		const tempIngredients = this.state.ingredients;
		tempIngredients.splice(index, 1);
		this.setState({
			ingredients: tempIngredients,
		})
		e.preventDefault();
	}

	removeInstructionRow(e, index) {
		const tempInstructions = this.state.instructions;
		tempInstructions.splice(index, 1);
		this.setState({
			instructions: tempInstructions,
		})
		e.preventDefault();
	}

	handleChangeName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	handleChangeServings(e) {
		this.setState({
			servings: e.target.value,
		});
	}

	handleChangeDescription(e) {
		this.setState({
			description: e.target.value,
		});
	}

	handleChangeIngredientName(e, index) {
		const tempIngredients = this.state.ingredients;
		tempIngredients[index].name = e.target.value;
		this.setState({
			ingredients: tempIngredients,
		});
	}

	handleChangeIngredientAmount(e, index) {
		const tempIngredients = this.state.ingredients;
		tempIngredients[index].amount = e.target.value;
		this.setState({
			ingredients: tempIngredients,
		});
	}

	handleChangeIngredientUnit(e, index) {
		const tempIngredients = this.state.ingredients;
		tempIngredients[index].unit = e.target.value;
		this.setState({
			ingredients: tempIngredients,
		});
	}

	handleChangeInstruction(e, index) {
		const tempInstructions = this.state.instructions;
		tempInstructions[index].instruction = e.target.value;
		this.setState({
			instructions: tempInstructions,
		});
	}

	render() {
		let ingredients = [];
		ingredients.push(<div key={0} className="form-row flex-nowrap">
			<div className="form-group col-7">
				<label htmlFor="ingredients-input">Ingredient</label>
				<input value={this.state.ingredients[0].name} onChange={e => this.handleChangeIngredientName(e, 0)} className="form-control ingredients-input"></input>
			</div>
			<div className="form-group col-2">
				<label htmlFor="amount-input">Amount</label>
				<input value={this.state.ingredients[0].amount} onChange={e => this.handleChangeIngredientAmount(e, 0)} className="form-control amount-input"></input>
			</div>
			<div className="form-group col-2">
				<label htmlFor="units-input">Unit</label>
				<input value={this.state.ingredients[0].unit} onChange={e => this.handleChangeIngredientUnit(e, 0)} className="form-control units-input"></input>
			</div>
		</div>);

		for (let i = 1; i < this.state.ingredients.length; i++) {
			ingredients.push(
				<div key={i} className="form-row flex-nowrap">
					<div className="form-group col-7">
						<input value={this.state.ingredients[i].name} onChange={e => this.handleChangeIngredientName(e, i)} className="form-control ingredients-input"></input>
					</div>
					<div className="form-group col-2">
						<input value={this.state.ingredients[i].amount} onChange={e => this.handleChangeIngredientAmount(e, i)} className="form-control amount-input"></input>
					</div>
					<div className="form-group col-2">
						<input value={this.state.ingredients[i].unit} onChange={e => this.handleChangeIngredientUnit(e, i)} className="form-control units-input"></input>
					</div>
					<div className="form-group col-1">
						<button className="btn btn-danger w-100" type="submit" onClick={e => {this.removeIngredientRow(e, i)}}>-</button>
					</div>
				</div>
			);
		}

		ingredients.push(<div key={this.state.ingredients.length+1} className="form-row flex-nowrap">
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
				<button type="submit" className="btn btn-primary w-100" onClick={e => this.addIngredientRow(e)}>+</button>
			</div>
		</div>);

		let instructions = [];
		instructions.push(<div key={0} className="form-row align-items-end flex-nowrap">
			<div className="form-group col-1 align-self-center">
				<span>{this.state.instructions[0].step}.</span>
			</div>
			<div className="form-group col-9">
				<textarea value={this.state.instructions[0].instruction} onChange={e => this.handleChangeInstruction(e, 0)} className="form-control instruction-input" rows="2"></textarea>
			</div>
		</div>);

		for (let i = 1; i < this.state.instructions.length; i++) {
			instructions.push(<div key={i} className="form-row align-items-end flex-nowrap">
				<div className="form-group col-1 align-self-center">
					<span className="instruction-step">{i+1}.</span>
				</div>
				<div className="form-group col-9">
					<textarea value={this.state.instructions[i].instruction} onChange={e => this.handleChangeInstruction(e, i)} className="form-control instruction-input"></textarea>
				</div>
				<div className="form-group col-1">
					<button onClick={e => this.removeInstructionRow(e, i)} className="btn btn-danger w-100" type="submit">-</button>
				</div>
			</div>
			);
		}

		instructions.push(<div key={this.state.instructions.length+1} className="form-row align-items-end flex-nowrap">
			<div className="form-group col-1 align-self-center">
				<span id="read-only-instruction-number">{this.state.instructions.length+1}.</span>
			</div>
			<div className="form-group col-9">
				<textarea className="form-control" rows="2" readOnly></textarea>
			</div>
			<div className="form-group col-1">
				<button onClick={e => this.addInstructionRow(e)} type="submit" className="btn btn-primary w-100">+</button>
			</div>
		</div>
		);

		return <div className="container mt-5 mx-auto">
			<form>
				<div className="form-group col-sm-12">
					<label htmlFor="recipe-name">Recipe Name</label>
					<input value={this.state.name} onChange={e => this.handleChangeName(e)} className="form-control" placeholder="Enter recipe name"></input>
				</div>

				<div>
					<div className="form-group col-6 col-md-3">
						<label htmlFor="servings">Servings</label>
						<input type="number" value={this.state.servings} onChange={e => this.handleChangeServings(e)} className="form-control" placeholder="Enter number of servings"></input>
					</div>
        </div>

				<div className="form-group col-12">
          <label htmlFor="recipe-description">Description</label>
          <textarea value={this.state.description} onChange={e => this.handleChangeDescription(e)} className="form-control" rows="3" placeholder="Enter description"></textarea>
        </div>

				<div className="small-width mx-auto">
					{ingredients}
				</div>
				
				<div className="small-width mx-auto">
					<label htmlFor="instruction-input">Instructions</label>
					{instructions}
				</div>
			</form>
		</div>;
	}
}

export default AddRecipe;