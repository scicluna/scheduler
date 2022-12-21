// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let events = JSON.parse(localStorage.getItem("events"))
    if (!events){
      events = []
    }
  writeEvents(events)
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").each(function(){
    $(this).on("click", saveEvents)
  })
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  hourCompare()
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  displayDate()
});

//display the date
function displayDate(){
  let date = $("#date")
  let today = dayjs().format("MMM DD YYYY")
  date.append(today)
}

//compare hours and apply classes to each div row
function hourCompare(){
  let blocks = $(".time-block")
  let currentHour = dayjs().format("HH")

  blocks.each(function(){
    if ($(this).data("block")+9 > currentHour){
      $(this).addClass("future")
    } 

    if ($(this).data("block")+9 < currentHour){
      $(this).addClass("past")
    } 

    if ($(this).data("block")+9 == currentHour){
      $(this).addClass("present")
    } 
  })
}

function saveEvents(e){
  let textElements = $(".description")

    events = []
  for (let i=0; i<textElements.length; i++){
    events[i] = textElements[i].value
  }
  
  localStorage.setItem("events", JSON.stringify(events))
}

function writeEvents(events){
  let textEls = $(".description")
  for (let i=0; i<textEls.length; i++){
    textEls[i].value = events[i]
  }
}