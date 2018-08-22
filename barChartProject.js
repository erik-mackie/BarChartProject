var stackOptions = [];

//Title Color controls
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
//Bar and Graph Controls

//populate bar stack options list from objects
function populateValueChoices() {
      var barValueOptions = $(".barValueType");
      barValueOptions.empty();
      //loop onject and apply key value pairs to choices list
      stackOptions.map(val => {
        barValueOptions.append($("<option></option>")
         .attr("value", val['color']).text(val['text']));
      });
}

//take input from each stacked value, and append to index upon add click
  $(document).on('click','.stackAdd', function() {
      let stackValue = $(this).closest('.stackValue').children('.typeInput').val();
      let stackColor = $(this).closest('.stackValue').children('.stackedColour').val();
      //append custom div to index as build from inputs
      $(
        `<div class="indexItem">
          <div class="colourBox" style="background-color:${stackColor}":></div>
          <p>${stackValue}</p>
        </div>`).appendTo("#stackedIndexContainer"
        );

      // push to array for use by "new bar" later
      stackOptions.push({text:`${stackValue}`,
                         color:`${stackColor}`})

      //on add click, change to remove button and add new input row
      $(".stackValue").clone().appendTo("#stackTypes").find("input[type='text']").val("").find("input[type='color']").val("");
      $(this).closest('.stackValue').removeClass("stackValue").addClass("exStackValue");
      $(this).html("Close").css("color: #C21807");
      $(this).addClass('stackRemove').removeClass("stackAdd");
      // hide new stack value inputs if 3 exist.
      if ($('#stackedIndexContainer').children().length >= 3) {
        $(".stackValue").hide();
        }
      populateValueChoices();
    })

// close button remove input row and deletes index entry
$(document).on('click','.stackRemove', function() {
  $(this).closest('.exStackValue').remove();
  //find corrisponding index values and remove
  let indexName = $(this).closest('.exStackValue').children('.typeInput').val();
  $(`.indexItem:contains(${indexName})`).remove();
  //if stack row was deleted, show new input.
  $(".stackValue").show();
  //find corrispoding onject in array and remove
  stackOptions = stackOptions.filter(function(item) {
    return item['text'] !== indexName;
  });

  populateValueChoices();
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
//Add Bar Controls
var barValuesArr = [ ["Javascript",[10, "red"], [20, "blue"], [30, "green"]],
                     ["C++",[10, "red"], [15, "blue"], [20, "green"]],
                     ["Apashe",[20, "red"], [30, "blue"], [40, "green"]],
                     ["Python",[40, "red"], [40, "blue"], [20, "green"]]
                     ];

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

// loop over barArray and populate dropdown list + add delete button
function populateDropDown() {
  $( ".dropdown-content" ).empty();
  barValuesArr.map(val => {
    $(
          `<div class="existingBarValue">
            <p class="dropDownName">${val[0]}</p>
            <button class="barDelete">X</button>
          </div>`).appendTo(".dropdown-content");
  })
}

// take data from input and push into array on add click
$(document).on('click','#valuesBtn', function() {
  let tempArr = [];
  //get text from input and send to array item
  tempArr.push($("#barName").val());
  let inputs = $(".exValueInput");
  //loop each input row and pull input data and send to array
  inputs.each(function() {
    tempArr.push([$(this).children(".barValue").val(),
                       $(this).children(".barValueType").val()
                       ]);
    })
  // uncomment this once graph testing is finished
  // uncomment this once graph testing is finished
  // uncomment this once graph testing is finished
  //barValuesArr.push(tempArr);
  tempArr = [];
  //empty dropdown with each click
  populateDropDown();
  drawBarchart();
})

// bar delete button removes entry drop dropdown, from array and re-runs graph build function
$(document).on('click','.barDelete', function() {
  let barName = $(this).closest('.existingBarValue').children('.dropDownName').text();
  console.log(barName)
  // remove from array and repopulate
  barValuesArr = barValuesArr.filter(function(val) {
   return val[0] != barName;
  })
  populateDropDown();
})

//["Javascript",[10, "red"], [20, "blue"], [30, "green"]]
//build bar chart from array of values
function drawBarchart() {
  barValuesArr.map(val => {
    $(
          `<li class="barContainer" title="${val[0]}" >
                <div class="bar" style="background-color:${val[3][1]}; height:${val[3][0]}%"><p>${val[3][0]}</p></div>
                <div class="bar" style="background-color:${val[2][1]}; height:${val[2][0]}%"><p>${val[2][0]}</p></div>
                <div class="bar" style="background-color:${val[1][1]}; height:${val[1][0]}%"><p>${val[1][0]}</p></div>


          </li>`).appendTo(".chart");
          // create html item
          /*`<li>
              <div class="barContainer" title="${val[0]}">
                <div class="value1"><p></p></div>
                <div class="value2"><p></p></div>
                <div class="value3"><p></p></div>
              </div>
          </li>`).appendTo(".chart");

    //first value
    $(".value1").css*/
  })
}


//left off with bar animations, adding, and transtion from bottom not top. Fixig bar title
//because it went away upon changing containers




// time on project 3h 2h  3h 3h 2.5h 3h 2h 3h 3h mon 3h 2h tues 3h 1h



//to do

// ***********make resuable functions for duplicate code for stack values and inputs
// bar value click without input pushes empty array into  array. fix this.
//successive clicks of bar values add adds more even if no inputs are selected

