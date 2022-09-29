var inputBox = $("#search");
var searchBtn = $("#searchBtn");
var mixBtn = $("#mix");
var foodNutrition = {
  calories: [],
  fiber: [],
  protein: [],
  carbs: [],
  sugar: [],
};

//Functions

function searchFood(food) {
  console.log(food);
  if (inputBox != null) {
    searchNutrition(food);
  } else {
    return;
  }
}

// NutritionIX API

function searchNutrition(food) {
  fetch("https://trackapi.nutritionix.com/v2/search/instant?query=" + food, {
    headers: {
      "Content-Type": "application/json",
      "x-app-id": "def8c961",
      "x-app-key": "751bb1c983bf066a6d7484cdf84838e4",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response.statusText);
      }
    })
    .then(function (data) {
      console.log(data);
      if (data.common) {
        getNutrients(data.common[0].food_name);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getNutrients(food) {
  var nutrUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";
  fetch(nutrUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": "def8c961",
      "x-app-key": "751bb1c983bf066a6d7484cdf84838e4",
    },
    body: JSON.stringify({
      query: food,
      num_servings: 0,
      line_delimited: false,
      use_raw_foods: false,
      include_subrecipe: false,
      lat: 0,
      lng: 0,
      meal_type: 0,
      use_branded_foods: false,
      locale: "en_US",
      taxonomy: false,
      ingredient_statement: false,
      last_modified: false,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var calories = data.foods[0].nf_calories;
      console.log(calories);
      var fiber = data.foods[0].nf_dietary_fiber;
      var protein = data.foods[0].nf_protein;
      var carbs = data.foods[0].nf_total_carbohydrate;
      var sugar = data.foods[0].nf_sugars;
      foodNutrition.calories.push(calories);
      foodNutrition.fiber.push(fiber);
      foodNutrition.protein.push(protein);
      foodNutrition.carbs.push(carbs);
      foodNutrition.sugar.push(sugar);
      console.log(foodNutrition);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addToList(food) {
  $("#food-list").append("<li>" + food + "</li>");
}

function displaySmoothie(calSum, fiberSum, proteinSum, carbSum, sugarSum) {
  // var finalMix = JSON.stringify(foodNutrition);
  // console.log(finalMix)
  $("#final-nutrition").append("<li> Calories: " + calSum + "</li>");
  $("#final-nutrition").append("<li> Fiber: " + fiberSum + "g</li>");
  $("#final-nutrition").append("<li> Protein: " + proteinSum + "g</li>");
  $("#final-nutrition").append("<li> Carbs: " + carbSum + "g</li>");
  $("#final-nutrition").append("<li> Sugar: " + sugarSum + "g</li>");
}

searchBtn.on("click", function () {
  searchFood(inputBox.val());
  addToList(inputBox.val());
  inputBox.val("");
});

mixBtn.on("click", function () {
  var calSum = 0;
  var fiberSum = 0;
  var proteinSum = 0;
  var carbSum = 0;
  var sugarSum = 0;
  for (var i = 0; i < foodNutrition.calories.length; i++) {
    calSum += foodNutrition.calories[i];
  }
  for (var i = 0; i < foodNutrition.fiber.length; i++) {
    fiberSum += foodNutrition.fiber[i];
  }
  for (var i = 0; i < foodNutrition.protein.length; i++) {
    proteinSum += foodNutrition.protein[i];
  }
  for (var i = 0; i < foodNutrition.carbs.length; i++) {
    carbSum += foodNutrition.carbs[i];
  }
  for (var i = 0; i < foodNutrition.sugar.length; i++) {
    sugarSum += foodNutrition.sugar[i];
  }
  console.log(calSum);
  console.log(fiberSum);
  console.log(proteinSum);
  console.log(carbSum);
  console.log(sugarSum);

  displaySmoothie(calSum, fiberSum, proteinSum, carbSum, sugarSum);
});






//Dropdown NOT WORKING
//var $dropdowns = getAll(".dropdown:not(.is-hoverable)");
var $dropdowns = getAll(".dropdown");

if ($dropdowns.length > 0) {
  $dropdowns.forEach(function ($el) {
    $el.addEventListener("click", function (event) {
      event.stopPropagation();
      $el.classList.toggle("is-active");
    });
  });

  document.addEventListener("click", function (event) {
    closeDropdowns();
  });
}

function closeDropdowns() {
  $dropdowns.forEach(function ($el) {
    $el.classList.remove("is-active");
  });
}
