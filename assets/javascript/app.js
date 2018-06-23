$(document).ready(function() {
    // Create a variable to hold all of the button names
    var games = ["Fallout", "Skyrim", "Gears of War", "Dark Souls", "Bioshock", "Halo", "Dishonored", "God of War", "Zelda", "Pokemon", "The Last of Us", "Metro 2033"];
    // Loop through the array and display each button on the page
    function displayButtons() {
        $("#buttonList").empty();
        for (var i = 0; i < games.length; i++) {
            $("#buttonList").append("<button class='btn btn-secondary mr-1 mb-1 game' data-game='" + games[i] + "'>" + games[i] + "</button>");
        }
    }
    displayButtons();

    var giphyAPIKey = "l6bX2dQJswkirP8LSxIY0iGjNnomqyWZ";
    
    // Click the game buttons to add 10 gifs to the page
    $(document).on("click", ".game", function() {
        var buttonClick = $(this).attr("data-game").trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonClick + "&api_key=" + giphyAPIKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              $("#gifArea").empty();
              for (var j = 0; j < response.data.length; j++) {
                  $("#gifArea").append("<div style='background-color: #35AAFF; float: left; margin-bottom: 2px; margin-right: 2px;'><h4>Rated: " + response.data[j].rating + "</h4><img src='" + response.data[j].images.fixed_height_still.url + "' data-still='" + response.data[j].images.fixed_height_still.url + "' data-animate='" + response.data[j].images.fixed_height.url + "' data-state='still' style='height: 200px; width: 200px;' class='gif' /></div>");
              }
          });
    })
    // Click the gif to start and stop the gifs
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");

        if (state == 'still') {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });

    // Add new buttons to the page
    $("#addGameButton").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var game = $("#addGameText").val().trim();

        // The game from the textbox is then added to the games array
        if (game && !games.includes(game)) {
            games.push(game);
        };

        // Re-render the games array buttons
        displayButtons();

        // Clear the text field
        $("#addGameText").val("");

      });
});
