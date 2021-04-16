import "regenerator-runtime";
import "./style/style.css";
import "./component/header-top";
import "./component/search-bar.js";
// base url
const baseUrl = "https://www.themealdb.com/api/json/v1/1";
const showCard = document.querySelector("#showCard");

const getRecomendation = async () => {
  try {
    for (let i = 1; i <= 6; i++) {
      const response = await fetch(`${baseUrl}/random.php`);
      const responseJson = await response.json();
      if (responseJson.error) {
        errorMessage(responseJson.message);
      } else {
        renderFoodRecomendation(responseJson.meals);
      }
    }
  } catch (error) {
    errorMessage(error);
  }
}

const searchFood = async (keyword) => {
  try {
    const response = await fetch(`${baseUrl}/search.php?s=${keyword}`);
    const responseJson = await response.json();
    if (responseJson.error) {
      errorMessage(responseJson.message);
    } else {
      searchResult(responseJson.meals);
    }
  } catch (error) {
    errorMessage(error);
  }
}









// function
const renderFoodRecomendation = (foods) => {
  const Food = foods[0];
  const foodList = document.querySelector("#recomendation");

  foodList.innerHTML += `
  <section class="card">
  <img src="${Food.strMealThumb}" alt="${Food.strMeal}">
  <section>
  <h2 data-id="${Food.idMeal}">${Food.strMeal}</h2>
  </section>
  `

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("click", function (e) {
      e.preventDefault();

      const dataId = card.querySelector('h2').getAttribute("data-id");
      console.log(dataId);
      showCard.style.display = 'flex';
      getDetail(dataId);
    })
  })


}

// get id
const getDetail = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/lookup.php?i=${id}`);
    const responseJson = await response.json();
    if (responseJson.error) {
      errorMessage(responseJson.message);

    } else {
      const foods = responseJson.meals;
      const Food = foods[0];

      // get Ingredient
      let listIngredient = ``;
      let listMeasure = ``;
      let numI = 1
      let numM = 1

      for (let key of Object.keys(Food)) {
        if (key == `strIngredient${numI}`) {
          if (Food[key] == null || Food[key] == '' || Food[key] == ' ') {
            continue;
          } else {
            listIngredient += `${Food[key]}, `;
          }
          numI++;
        }

        if (key == `strMeasure${numM}`) {
          if (Food[key] == null || Food[key] == '' || Food[key] == ' ') {
            continue;
          } else {
            listMeasure += `${Food[key]}, `;
          }
          numM++;
        }
      }

      showCard.innerHTML = `
      <div class="container">
      <div class="pic">
        <img src="${Food.strMealThumb}" alt="${Food.strMeal}">
      </div>
      <div class="desc">
        <h1>${Food.strMeal}</h1>
        <hr>
        <div class="list">
          <div class="ingredient">
            <h2>Ingredient</h2>
            <p>
            ${listIngredient}
            </p>
          </div>
          <div class="measure">
            <h2>Measure</h2>
            <p>
            ${listMeasure}
            </p>
          </div>
        </div>
        <div class="instruc">
          <h2>Instructions</h2>
          <p>
            ${Food.strInstructions}
          </p>
        </div>

      </div>
    </div>
    <button id="back-button">Back</button>`;

      if (listMeasure == '') {
        const measure = document.querySelector(".measure");
        measure.style.display = 'none';
      }

      // back from show card
      const backButton = document.querySelector("#back-button");
      backButton.addEventListener('click', function (e) {
        e.preventDefault();
        backButton.parentElement.style.display = 'none';
      })
    }
  } catch (error) {
    errorMessage(error);
  }
}

// search food

const searchResult = (foods) => {
  const foodList = document.querySelector("#searchResult");
  if (foods == null) {
    foodList.innerHTML += `
    <p class="not-found">not found</p>
    `
  } else {
    foods.forEach(function (Food) {

      foodList.innerHTML += `
        <section class="card">
        <img src="${Food.strMealThumb}" alt="${Food.strMeal}">
        <section>
        <h2 data-id="${Food.idMeal}">${Food.strMeal}</h2>
        </section>
        `;

      const cards = document.querySelectorAll(".card");
      cards.forEach(card => {
        card.addEventListener("click", function (e) {
          e.preventDefault();

          const dataId = card.querySelector('h2').getAttribute("data-id");

          showCard.style.display = 'flex';
          getDetail(dataId);
        })
      })


    })
  }
}


// message
const errorMessage = (message = "check your internet connection") => {
  alert(message);
}

// event
const showMoreRecomendation = document.querySelector("#showMore-recomendation");
showMoreRecomendation.addEventListener('click', function (e) {
  e.preventDefault();
  getRecomendation();
})







// action
getRecomendation();
const inputKeyword = document.querySelector("#search");
const inputButton = document.querySelector("#searchButton");
const hidding = document.querySelector("main h2.sub.hide");
const sResult = document.querySelector("#searchResult");

inputButton.addEventListener('click', function (e) {

  if (hidding.style.display == '') {
    searchFood(inputKeyword.value);
    hidding.style.display = 'block';
    hidding.innerHTML = `Search result for "${inputKeyword.value}"`;
  } else {
    sResult.innerHTML = '';
    hidding.style.display = 'none';
    searchFood(inputKeyword.value);
    hidding.style.display = 'block';
    hidding.innerHTML = `Search result for "${inputKeyword.value}"`;
  }
})