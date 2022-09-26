// NutritionIX API

function testAPI() {
  var item = "apple"; //user input
  var apiUrl =
    "https://trackapi.nutritionix.com/v2/search/instant?query=" + item;
  var foodName = "";

  //   var nutriURL =
  //     "https://trackapi.nutritionix.com/v2/natural/nutrients?query=" + item;

  fetch(apiUrl, {
    headers: {
      "x-app-id": "def8c961",
      "x-app-key": "751bb1c983bf066a6d7484cdf84838e4",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //   console.log(data.common[0].food_name);
          foodName = data.common[0].food_name;
          console.log(foodName);
          fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-app-id": "def8c961",
              "x-app-key": "751bb1c983bf066a6d7484cdf84838e4",
            },
            body: JSON.stringify({
              query: item,
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
            })
            .catch(function (error) {
              console.log(error);
              //   alert("Unable to gather data.");
            });
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather data.");
    });
}

testAPI();
