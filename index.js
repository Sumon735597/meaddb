
const inputFeild = document.getElementById('search-data');
console.log(inputFeild)
const searchBtn = document.getElementById('btn-search"')

inputFeild.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {

        searchBtn.onclick();

    }

})





//get input data ,search data
const getInputData = () => {
    const getInput = document.getElementById('search-data');
    const getData = getInput.value;
    if (getData.length == 0) {
        const text = document.getElementById('spinner')
        text.innerHTML = `
        <h2>please type somthing</h2>
        `
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${getData}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
    }
    getInput.value = "";
}

const displayFood = meals => {

    const rootDiv = document.getElementById('food-item');
    rootDiv.innerHTML = "";
    meals.forEach(meal => {
        console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        const { strMealThumb, strMeal, strInstructions, idMeal } = meal;
        div.innerHTML = `
        <div class="card h-100">
            <img src="${strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${strMeal}</h5>
                    <p class="card-text">${strInstructions.slice(0, 150)}</p>
                </div>
            <button onclick="showDetails(${idMeal})" class="btn btn-secondary rounded" type="button">See more</button>
        </div>
        `
        rootDiv.appendChild(div)
    });
}

const showDetails = id => {
    window.scrollTo(0, 40);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.meals[0]))
}

const displayDetail = element => {
    const rootDiv = document.getElementById('detail');
    rootDiv.innerHTML = "";
    const newDiv = document.createElement('div');
    const { strYoutube, strMealThumb, strMeal, strInstructions, idMeal } = element;
    newDiv.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2>${idMeal}</h2>
                    <h5 class="card-title">${strMeal}</h5>
                    <p class="card-text">${strInstructions.slice(0, 120)}</p>
                    <a href="${strYoutube}" class="btn btn-primary">Youtube Link</a>
                </div>
            </div>
    `
    rootDiv.appendChild(newDiv)
}