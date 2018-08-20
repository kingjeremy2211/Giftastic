$( document ).ready(function() {
    // An array of rappers
    var rappers = ["P Diddy", "2Pac", "2 Chainz", "Snoop Dogg", "Drake", "Dr. Dre", "Eminem", "50 cent", "Lil Wayne", "Lil Dicky", "Kanye"];
    // Function that displays all gif buttons
    function displayGifButtons(){
        // empties all user created buttons upon refresh
        $("#gifButtonsView").empty();
        // for loop to cycle through array of rappers and create buttons for each array item
        for (var i = 0; i < rappers.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("rapper");
            gifButton.addClass("btn btn-primary");
            gifButton.attr("data-name", rappers[i]);
            gifButton.text(rappers[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function that adds a new rapper button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var rapper = $("#rapper-input").val().trim();
        // This is to make sure user doesn't add a blank button
        if (rapper == ""){
          return false; 
        }
        rappers.push(rapper);
    
        displayGifButtons();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var rapper = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + rapper + "&api_key=dqDjb8LOkQAaEPGSi6b8j6c2zg9vEnkf&limit=10";
        // console.log(queryURL); USEd THIS TO VERIFY WHETHER GIPHY API REQUEST WORKS CORRECTLY
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            // clears all previously displays gifs
            $("#gifsView").empty(); 
            var results = response.data; 
            // alerts user if requested button has no available gifs 
            if (results == ""){
              alert("Sorry......there are no gifs for this button");
            }
            for (var i=0; i<results.length; i++){
                // div created to display requested gifs
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                // pulls rating of requested gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                // attributes 'src' to requested gif image
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                // attributes 'still' tag to still gif image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                // attributes 'animate' tag to animated gif image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                // sets the gif image state
                gifImage.attr("data-state", "still");
                // adds class name of 'image' to requested gif
                gifImage.addClass("image");
                // appends requested gifs to created gif div
                gifDiv.append(gifImage);
                // adds created gif div to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calls Functions & Methods
    displayGifButtons(); 
    addNewButton();
    // Event Listeners that allow user to click to animate gifs and also stop animation and display still images
    $(document).on("click", ".rapper", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });