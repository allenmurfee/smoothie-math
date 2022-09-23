// NutritionIX API

function testAPI() {
  var item = "apple"; //user input
  var apiUrl =
    "https://trackapi.nutritionix.com/v2/search/instant?query=" + item;

  fetch(apiUrl, {
    headers: {
      "x-app-id": "def8c961",
      "x-app-key": "751bb1c983bf066a6d7484cdf84838e4",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
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
