export function getEmptyRecipe() {
	return {
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

export function checkRecipeValidity(recipe) {
	// TODO
	return true;
}