//run this function on load
$(function () {
  //grabbing stored events from local storage
  let events0 = localStorage.getItem("events0")
  let events1 = localStorage.getItem("events1")
  let events2 = localStorage.getItem("events2")
  let events3 = localStorage.getItem("events3")
  let events4 = localStorage.getItem("events4")
  let events5 = localStorage.getItem("events5")
  let events6 = localStorage.getItem("events6")
  let events7 = localStorage.getItem("events7")
  let events8 = localStorage.getItem("events8")
  //setting the events into an array for looping purposes
  let events = [events0, events1, events2, events3, events4, events5, events6, events7, events8]

  //writing our events to the screen
  writeEvents(events)
  //initializing our save buttons
  $(".saveBtn").each(function(){
    $(this).on("click", saveEvent)
  })
  //styling our hour blocks
  hourCompare()
  //displaying the current date
  displayDate()
});

//display the current date
function displayDate(){
  let date = $("#date")
  date.text("")
  let today = dayjs().format("MMM DD YYYY    HH:mm:ss")
  date.text(today)
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

//save an event when its corresponding save button is pressed
function saveEvent(e){
  let datablock = $(this).data("button")
  let textElement = $(this).siblings(".description")
  let currentevent = textElement.val()
  localStorage.setItem(`events${datablock}`, currentevent)
  }

//write out our events on pageload to our planner
function writeEvents(events){
  let textEls = $(".description")
  for (let i=0; i<textEls.length; i++){
    //writes an event only if its not undefined
    if(events[i] !== undefined){
    textEls[i].value = events[i]
    }
  }
}

//keep the time and coloration live
setInterval(function(){
  hourCompare()
  displayDate()
}, 1000)