
function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqmt = document.getElementById("uiSqmt");
  var kitch_sqmt = document.getElementById("uiKitchSqmt");
  var floors_total = document.getElementById("uiFloors");
  var desired_floor = document.getElementById("uiFloorDes");
  var location = document.getElementById("uiLocations");
  var material = document.getElementById("uiMaterials");
  var estPrice = document.getElementById("uiEstimatedPrice");

   var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      total_sqmt: parseFloat(sqmt.value),
      kitchen_area: parseFloat(kitch_sqmt.value),
      floors_total: parseInt(floor_total.value),
      floor_number: parseInt(desired_floor.value),
      location: location.value
      material: material.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Rub</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  // var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  // var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  var url = "/api/get_material_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_material_names request");
      if(data) {
          var materials = data.materials;
          var uiMaterials = document.getElementById("uiMaterials");
          $('#uiMaterials').empty();
          for(var i in materials) {
              var opt = new Option(materials[i]);
              $('#uiMaterials').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;