$(document).ready(function () {
  // listen for save button clicks

  //empty variable to hold the users text
  var userInput = [];


  $(".saveBtn").on("click", function () {
    // gets nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    console.log('value:', value);
    console.log('time:', time);

    //saves the text to the local storage
    localStorage.setItem(time, value);
  });

  function hourUpdater() {
    // gets current number of hours
    var currentHour = moment().hours();
    console.log('current hour:', currentHour);

    // loops over time blocks
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      console.log("block hour:", blockHour);

      // Past timeblock -- Changes text area color to teal
      if (currentHour > blockHour) {
        $(this).css("background", "teal");
        $(this).addClass("past");
        //Current time -- changes text area to grey
      } else if (currentHour === blockHour) {
        $(this).css("background", "grey",);
        $(this).removeClass("past");
        $(this).addClass("present");
        //Future time blocks - changes the color to goldenrod
      } else {
        $(this).css("background", "goldenrod");
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }

    });
  }

  hourUpdater();

  //Checks every 15 seconds if the current time needs to be updated
  setInterval(hourUpdater(), 15000);

  // this section loads the saved data from localStorage by using a for loop
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i)
    userInput.push(localStorage.key(i));
  }

  for (var i = 0; i < userInput.length; i++) {
    var input = userInput[i];
    var lsValue = localStorage.getItem(input);
    $("#" + input + " textarea").val(lsValue);
  }

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
