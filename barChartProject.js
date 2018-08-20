var stackOptions = [{name: "Javascript", value: "Javascript",
                    {name:"HTML", value: "HTML"}
                    ];
console.log(stackOptions)

//Title Color controls
//Title Color controls

//change Graph Title text
$(".titleInput").keyup(function() {
    let value = $(this).val();
    $("#graphTitle").text(value);
  }).keyup();

//change graph Text Size
$("#titleSize").change(function() {
    $('#graphTitle').css("font-size", $(this).val() + "px");
});

//change graph Text Color
$("#titleColour").change(function() {
    $('#graphTitle').css("color", $(this).val());
});

//Bar and Graph Controls
//Bar and Graph Controls

//take input from each stacked value, and append to index upon add click
  $(document).on('click','.stackAdd', function() {
      let stackValue = $(this).closest('.stackValue').children('.typeInput').val();
      let stackColor = $(this).closest('.stackValue').children('.stackedColour').val();
      //append custom div to index as build from inputs
      $(`<div class="indexItem">
          <div class="colourBox" style="background-color:${stackColor}":></div>
          <p>${stackValue}</p>
        </div>`).appendTo("#stackedIndexContainer");
      // push to array for use by "new bar" later
      stackOptions.push({name:`${stackValue}`,
                         value: `${stackValue}`})


      //on add click, change to remove button and add new input row
      $(".stackValue").clone().appendTo("#stackTypes").find("input[type='text']").val("").find("input[type='color']").val("");
      $(this).closest('.stackValue').removeClass("stackValue").addClass("exStackValue");
      $(this).html("Close").css("color: #C21807");
      $(this).addClass('stackRemove').removeClass("stackAdd");
      // hide new stack value inputs if 3 exist.
      if ($('#stackedIndexContainer').children().length >= 3) {
        $(".stackValue").hide();
        }
    })

// close button remove input row and deletes index entry
$(document).on('click','.stackRemove', function() {
  $(this).closest('.exStackValue').remove();
  //find corrisponding index values and remove
  let indexName = $(this).closest('.exStackValue').children('.typeInput').val();
  $(`.indexItem:contains(${indexName})`).remove();
  //if stack row was deleted, show new input.
  $(".stackValue").show();
})

//change Y axis values from input
$(".yAxisUnits").keyup(function() {
    // get ticks and value
    let value = $(this).val();
    let ticks = $(".tick").children("p");
    // apply values to ticks
    var percentTotal = 1;
    ticks.each(function() {
      $(this).text(value * percentTotal.toFixed(2));
      percentTotal -= .2;
    })
}).keyup();

//Add Bar Controls
//Add Bar Controls

var barValuesArr = [];
//get text from input
$(".barName").keyup(function() {
    let value = $(this).val();
    /*$("#graphTitle").text(value);*/
    //on add button, clear text field and pull info into array
  }).keyup();

//populate bar stack options list from array


////on add click, change to remove button and add new input row
$(document).on('click','.barValueAdd', function() {
  if (stackOptions.length >= $('#barInputContainer').children().length)
    $(".valueInput").clone().appendTo("#barInputContainer").find("input[type='number']").val("")//.find("input[type='color']").val("");
    $(this).closest('.valueInput').removeClass("valueInput").addClass("exValueInput");
    $(this).html("Close").css("color: #C21807");
    $(this).addClass('barValueDelete').removeClass("barValueAdd");
    // hide new bar inputif 3 exist.
    if ($('#barInputContainer').children().length > 3) {
      $(".valueInput").hide();
      }
  else if (stackOptions.length == 0) {alert("Please enter a value type in the previous section")}
})

//delete stack option from new bar
$(document).on('click','.barValueDelete', function() {
  $(this).closest('.exValueInput').remove();
  $(".valueInput").show();
})



/*drawBarChart(data, options, element);*/





// time on project 3h 2h  3h 3h 2.5h 3h 2h 3h 3h



//to do

// ***********make resuable functions for duplicate code for stack values and inputs




