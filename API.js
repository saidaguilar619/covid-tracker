
//API Key
var APIKey = 'c53af2ca86msh4bfaf081fbd83fcp1c2189jsn990be6229e40';
      var name = '';
      var name = $('').val();
      var symbol = $('#symbol').val();
      //URL to query the database
      var queryURL = "covid-19-data.p.rapidapi.com" +
        "name=" + name + "&user_key=" + APIKey;
      //AJAX to call the API
      $.ajax({
          url: queryURL,
          method: "GET"
        })
    
    // Store all of the retrieved data inside of an object called "response"
        .then(function (response) {
    // Log the resulting object
            console.log(response);
        })


