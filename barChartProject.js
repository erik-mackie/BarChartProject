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
var yAxisValue = 0;
$(".yAxisUnits").change(function() {
    // get ticks and value
    yAxisValue = $(this).val();
    let ticks = $(".tick").children("p");
    // apply values to ticks
    var percentTotal = 1;
    ticks.each(function() {
      $(this).text(yAxisValue * percentTotal.toFixed(2));
      percentTotal -= .2;
    })
    return yAxisValue;
}).keyup();

//bar graph value spacing
//bar spacing less
$(function() {
    $('#lessSpace').click(function () {
       $(".bar").css({'margin-left': '-=.1em','margin-right': '-=.1em'});
    });
});
//bar spacing more
$("#moreSpace").click(function() {
  $(".bar").css({'margin-left': '+=.1em','margin-right': '+=.1em'});
})

//bar values location
$(document).on('change','#barValueLocation', function() {
  let changeValue = $('#barValueLocation').val();
  let values = $(".bar").children("p");
  // change css of values dependant on dropdown selection
  if ( changeValue == "bottom" ) {
    $(values).removeClass("valMdl").removeClass('valTop').addClass('valBtm')
  } else if (changeValue == "middle") {
    $(values).removeClass("valBtm").removeClass('valTop').addClass('valMdl')
  } else if (changeValue == "top") {
    $(values).removeClass("valBtm").removeClass('valMdl').addClass('valTop')
  } else {
    $(values).css({'visibility': 'hidden'});
  }
});



//Add Bar Controls
//Add Bar Controls
//Add Bar Controls

var barValuesArr = [];

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

// bar add button
// take data from input and push into array on add click

$(document).on('click','#valuesBtn', function() {
  if ($("#barName").val() == "" || $(".barValue").val() == 0) {
  alert("You must have one named value before submitting")
  } else {
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
    // clear inputs on click
    $(".barValue").val("")
    $("#barName").val("")

    barValuesArr.push(tempArr);
    tempArr = [];
    //empty dropdown with each click
      populateDropDown();
      drawBarchart();
  }
})


// bar delete button removes entry drop dropdown, from array and re-runs graph build function
$(document).on('click','.barDelete', function() {
  let barName = $(this).closest('.existingBarValue').children('.dropDownName').text();
  // remove from array and repopulate
  barValuesArr = barValuesArr.filter(function(val) {
   return val[0] != barName;
   console.log(barValuesArr);
  })
  populateDropDown();
  drawBarchart();
})

//build bar chart from array of values
function drawBarchart() {
  $(".chart").empty();
  if (yAxisValue == 0) {
    alert("Please Enter A Y axis value");
    return
  } else {
    // loop of array and inject HTML into chart
    barValuesArr.map(val => {
      console.log(barValuesArr);
      var barheight1 = (val[1][0] / yAxisValue) * 100;
      var barColor1 = val[1][1];
      var barP1 = val[1][0];

      // if only one stacked value was passed. Injectable HTML still works
      if (typeof val[2] !== 'undefined') {
        var barheight2 = (val[2][0] / yAxisValue) * 100;
        var barColor2 = val[2][1];
        var barP2 = val[2][0];
      }else {
        var barheight2 = 0;
        var barColor2 = "transparent";
        var barP2 = "";
      }
      if (typeof val[3] !== 'undefined') {

        var barheight3 = (val[3][0] / yAxisValue) * 100;
        var barColor3 = val[3][1];
        var barP3 = val[3][0];
      }else {
        var barheight3 = 0;
        var barColor3 = "transparent";
        var barP3 = "";
      }

      $(
            `<li class="barContainer" title="${val[0]}">
                  <div class="bar" style="background-color:${barColor3}; height:${barheight3}%"><p class="barVal">${barP3}</p></div>
                  <div class="bar" style="background-color:${barColor2}; height:${barheight2}%"><p class="barVal">${barP2}</p></div>
                  <div class="bar" style="background-color:${barColor1}; height:${barheight1}%"><p class="barVal">${barP1}</p></div>
            </li>`).appendTo(".chart");

    })
  }
}

//Page Master Section
//Page Master Section

//Export Graph as image
/*var domtoimage = require('dom-to-image');

domtoimage.toJpeg($('.exportBtn'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });*/


//Clear all inputs and graph
$("#clearBtn").click(function() {
  window.location.reload();
})


// time on project 3h 2h  3h 3h 2.5h 3h 2h 3h 3h mon 3h 2h tues 3h 1h 3h 3h

//left off trying to get image to pdf working

//to do

// ***********make resuable functions for duplicate code for stack values and inputs
// margin less can collapse divs into eachother. set minumum limit
// If you  only add 2 values, error thrown


// delete button on dropdown deletes graph item