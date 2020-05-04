import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props)
	}

  handleKeyPress(e) {
		if (e.keyCode == 13) {
      const matchedList = this.props.recipes.filter(recipe => {
        this.props.onSearch(recipe.name.toLowerCase().includes(e.target.value.toLowerCase()));
      });
      if (matchedList.length === 1) {
        const recipeToShow = matchedList[0];
        this.props.onFound(recipeToShow);
      }
      e.preventDefault();
    }
	}

	handleKeyUp(e) {
		if (e.keyCode == 13) {
			return;
		}
		const matchedList = this.props.recipes.filter(recipe => {
			return recipe.name.toLowerCase().includes(e.target.value.toLowerCase());
		});
		this.props.onSearch(matchedList);
		e.preventDefault();
	}
    
	render() {
		return (
			<div className="p-3 w-50 rounded mx-auto">
				<div className="input-group">
					<input type="search" autoComplete="off" placeholder="Search for a recipe..." className="form-control" onKeyPress={e => this.handleKeyPress(e)} onKeyUp={e => this.handleKeyUp(e)}/>
				</div>
			</div>
		);
	}
}

export default SearchBar;