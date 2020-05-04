let baseURL = "https://martinchan.pythonanywhere.com";
let dummyPassword = "Troglodon5986";

export function get() {
  return new Promise((resolve, reject) => {
    fetch(baseURL)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err))
  })
}

export function addRecipe(recipe) {
  recipe['password'] = dummyPassword;
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/addrecipe", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}

export function deleteRecipe(data) {
  data['password'] = dummyPassword;
  return new Promise ((resolve, reject) => {
    fetch(baseURL + "/deleterecipe", {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}

export function editRecipe(oldRecipeName, editedRecipe){
  let data = {};
  data['password'] = dummyPassword;
  data['name'] = oldRecipeName;
  data['recipe'] = editedRecipe;
  return new Promise ((resolve, reject) => {
    fetch(baseURL + "/editrecipe", {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}