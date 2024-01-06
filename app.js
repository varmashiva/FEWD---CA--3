function onLoadFunction() {
  // Fetch data from the API
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => {
      console.log(data.meals[0]);
      displayRandomImages(data.meals[0]);
    })
    .catch((error) => console.error('Error fetching meals:', error));
}
onLoadFunction();

// creating variables and taking id name from HTML
function displayRandomImages(meals) {
  let ContainerRandomeName = document.getElementById('random_name');
  let containerMeal = document.getElementById('randomMeal');
  const modalIngredients = document.getElementById('modalIngredients');

// Taking Names and images from API
  ContainerRandomeName.innerText = meals.strMeal;
  containerMeal.src = meals.strMealThumb;

// Taking Ingredients from API and storing in the popup ingredients
  for (let i = 1; i < 10; i++) {
    let ingredient = meals[`strIngredient${i}`];

    //Displaying ingredients until all ingredients print in HTML

    modalIngredients.innerHTML += `
              <li>${ingredient}</li>`;
  }
  modalIngredients.innerHTML += meals['strInstructions'];
}

// Creating a click funtion to search icon
let icon = document.querySelector('.search');
icon.addEventListener('click', takeInput);

// Taking input from the input box and showing the results.
function takeInput() {
  let inputValue = document.querySelector('.text_bar').value;
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + inputValue)
    .then(function (result) {
      return result.json();
    })
    .then(function (res) {
      console.log(res.meals);
      display(res.meals);
    })
    .catch(() => {
      console.log('fre');
      display('error');
    });
}


//Showing random images and names by refreshing.
function display(dataArray) {
  let images = document.querySelector('.images');
  if (dataArray == 'error') {
    images.innerHTML = '<h1 id="notFoundtag">CATEGORY NOT FOUND</h1>';
  } else {
    images.innerHTML = '';
    dataArray.forEach(function (element, index) {
      images.innerHTML += `
    <div>
        <div>
            <img src='${element.strMealThumb}' alt='Image'/>
        </div>
        <p>${element.strMeal}</p>
    </div>
    `;
    });
  }
}

//Ceating a popup to be funtonal
let popup = document.getElementById('popupDiv');
function openpopup() {
  popup.classList.remove('close-popup');
  popup.classList.add('open-popup');
}

function closepopup() {
  popup.classList.remove('open-popup');
  popup.classList.add('close-popup');
}
