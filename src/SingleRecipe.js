import React, { Component } from 'react';

class SingleRecipe extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>
				<h1>{this.props.match.params.name}</h1>
			</div>
	}
}

export default SingleRecipe;