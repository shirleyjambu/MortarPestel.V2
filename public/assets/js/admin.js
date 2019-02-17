const getMeasurements = () => {
   $.ajax(
  {url : "/user/getMeasurements",
    type : 'GET'}
  ).then((data) =>{
    createMeasurementTable(data);
  });
};

const getCuisine = () => {
 $.ajax(
 {url : "/user/getCuisine",
   type : 'GET'}
 ).then((data) =>{
    createCuisineTable(data);
 });
};

const getCatergory = () => {
  $.ajax(
  {url : "/user/getCategory",
    type : 'GET'}
  ).then((data) =>{
     createCategoryTable(data);
  });
 };




const createMeasurementTable =(data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((measurement) => {
    let $tr = createRow(measurement.measurement_name);
    newTable.append($tr);
  });  
  
  $("#mContainer").append(newTable);
}

const createCuisineTable =(data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((cuisine) => {
    let $tr = createRow(cuisine.cuisine_name);
    newTable.append($tr);
  });  
  
  $("#cContainer").append(newTable);
}

const createCategoryTable =(data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((category) => {
    let $tr = createRow(category.categories_name);
    newTable.append($tr);
  });    
  $("#catContainer").append(newTable);
}

const createRow = (name) => {
  let $tr = $("<tr>");
  let $tdItem = $("<td>").html(name);
  let $tdEdit = $("<td>").html(`<i class="material-icons">edit</i>`);
  let $tdDelete = $("<td>").html(`<i class="material-icons">delete</i>`);

  

  $tr.append($tdItem, $tdEdit, $tdDelete);

  return $tr;
}







$(document).ready(function () {
  // Intialize materialize controls
   $('.collapsible').collapsible();
   $('.tabs').tabs();
   $('select').formSelect();

   getMeasurements();
   getCuisine();
   getCatergory();
});
