//Variables
var mixBtn = $("#mix");
var clear = $("#clear");
var foodNutrition = {
  calories: [],
  fiber: [],
  protein: [],
  carbs: [],
  sugar: [],
};
var dropdownTrigger = $(".dropdown-trigger");
var dropdown = $(".dropdown");
var drop = $("#drop");
var APIKEY = "oNyZ8U08g1Lyt6teq7Y8doc6hPi2u62T";

//Functions

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
      localStorage.setItem("foodNutrition", JSON.stringify(foodNutrition));
      console.log(
        "this is when we parse",
        JSON.parse(localStorage.getItem("foodNutrition"))
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addToList(food) {
  $("#food-list").append("<li>" + food + "</li>");
}

function add() {
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
  displaySmoothie(calSum, fiberSum, proteinSum, carbSum, sugarSum);

  init();
}

function displaySmoothie(calSum, fiberSum, proteinSum, carbSum, sugarSum) {
  $("#final-nutrition").children().remove();
  $("#final-nutrition").append("<li> Calories: " + calSum + "</li>");
  $("#final-nutrition").append("<li> Fiber: " + fiberSum + "g</li>");
  $("#final-nutrition").append("<li> Protein: " + proteinSum + "g</li>");
  $("#final-nutrition").append("<li> Carbs: " + carbSum + "g</li>");
  $("#final-nutrition").append("<li> Sugar: " + sugarSum + "g</li>");
}

function init() {
  var url =
    "https://api.giphy.com/v1/gifs/xTiQytOEqr2U33lYkg?api_key=" + APIKEY;

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response.statusText);
      }
    })
    .then(function (data) {
      // console.log(data);
      var gif = $("#gif").attr("src", data.data.images.fixed_height.url);
      displayGif(gif);
    });
}

function displayGif(gif) {
  $("#gif").append(gif);
}


//Click Events

mixBtn.on("click", add);

clear.on("click", function() {
  window.location.reload();
});

$(document).on("click", function (e) {
  if (e.target.id != "targetSpan") {
    dropdown.attr("class", "dropdown");
  }
});

drop.on("click", function (e) {
  searchNutrition(e.target.text);
  addToList(e.target.text);
});


//Bulma
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
