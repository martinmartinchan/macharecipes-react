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
	let success = true;
	if (recipe.name === "") {
		success = false;
	}
	if (recipe.servings === "" || recipe.servings === 0) {
		success = false;
	}
	if (recipe.ingredients.length === 0) {
		success = false;
	}
	recipe.ingredients.forEach(ing => {
		if (ing.name === "") {
			success = false;
		}
		if (ing.amount === "") {
			success = false;
		}
	});
	if (recipe.instructions.length === 0) {
		success = false;
	}
	recipe.instructions.forEach(inst => {
		if (inst.instruction === "") {
			success = false;
		}
	});
	return success
}