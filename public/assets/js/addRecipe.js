//Counter for ingredient
var ingCounter = 1;

const getCuisine = () => {
$.ajax(
{url : "/user/getCuisine",
  type : 'GET'}
).then((data) =>{
   createCuisineOptionTable(data);
});
};

const getCategory = () => {
  $.ajax(
  {url : "/user/getCategory",
    type : 'GET'}
  ).then((data) =>{
     createCategoryOptionTable(data);
  });
  };

const createCategoryOptionTable = (data) =>{

  data.forEach(item => {
    
    let txt = item.categories_name;
    let id = item.id;
    var $newOpt = $("<option>").attr("value",id).text(txt)
    $("#categoryDropdown").append($newOpt);

    // fire custom event anytime you've updated select
    $("#categoryDropdown").trigger('contentChanged');
  });
}
  
const createCuisineOptionTable = (data) =>{

  data.forEach(item => {
    let txt = item.cuisine_name;
    let id = item.id;
    var $newOpt = $("<option>").attr("value",id).text(txt)
    $("#cuisineDropdown").append($newOpt);

    // fire custom event anytime you've updated select
    $("#cuisineDropdown").trigger('contentChanged');
  });
}

const createMeasurementOption =(id) =>{
  $.ajax(
    {url : "/user/getMeasurements",
      type : 'GET'}
    ).then((data) =>{
        data.forEach(item => {
        let itemId = item.id;
        let txt = item.measurement_name;
        var $newOpt = $("<option>").attr("value",itemId).text(txt)
        $("#measurementDropdown"+id).append($newOpt);
    
        // fire custom event anytime you've updated select
        $("#measurementDropdown"+id).trigger('contentChanged');
      });

      ingCounter++;

      return $select;
    
    });

}

const addIngredientsRow =() =>{

  let $tr = $("<tr>").addClass("ingRow");
  let $tdIng = $("<td>");
  $tdIng.html(`<div class="input-field">
  <i class="material-icons prefix">account_circle</i>
  <input id="ingredient_name${ingCounter}" name="ingredient_name${ingCounter}" type="text" class="validate">
  <label for="ingredient_name${ingCounter}">Ingredients</label>
  </div>`);

  let $tdQuan = $("<td>");
  $tdQuan.html(`<div class="input-field">
  <i class="material-icons prefix">phone</i>
  <input id="ingredient_quantity${ingCounter}" name="ingredient_quantity${ingCounter}" type="text" class="validate">
  <label for="ingredient_quantity${ingCounter}">Quantity</label>
  </div>`);

  
  let $tdMeas= $("<td>");
  let $div = $("<div>").addClass("input-field");
  let $select = $("<select>").addClass("materialSelect browser-default").attr("id","measurementDropdown"+ingCounter);
  let $option = $("<option>").val('0').text('Select Measurement');
  $select.append($option);
  $div.append($select);
  $tdMeas.append($div);
  
  $tr.append($tdIng,$tdQuan,$tdMeas);
  
  $("#ingredientTable").append($tr);
  
  createMeasurementOption(ingCounter);
  $('.materialSelect').formSelect();
};


$(document).ready(function(){

  //Select for materialize
  $('select').addClass('browser-default');
  $('select').formSelect();
  $('.materialSelect').formSelect();
  $('.tooltipped').tooltip();
  
  // setup listener for custom event to re-initialize on change
  $('.materialSelect').on('contentChanged', function() {
    $(this).formSelect();
  });

  //getMeasurements();  
  getCuisine();
  getCategory();
  addIngredientsRow();

  // Event handler for add Ingredient Row
  $('.moreIngredients').on("click",function(){
     addIngredientsRow();
  })

  // Event handler for add  Recipe
  $("#addRecipe").on("submit", function (event) {
    event.preventDefault();

    // get image data (only works for single file, not multiple)
    const imageData = document.getElementById("image-input").files[0];

    /* Code for quill*/
    console.log("--------------- Submitting ----------");

    var editor_content = editor.container.innerHTML;
    //console.log(editor_content);
    var delta = editor.getContents();
    //console.log("------------ Delta -------------");
    //console.log(delta);
    var content = delta.ops;
    //console.log("---------------Content -----------");
    //console.log(content);

    //console.log("----------- HTML ---------------");
    //console.log(editor_content);
    

    //console.log(delta);
    var jText = editor.getText();
    //console.log(text);
    var justHtml = editor.root.innerHTML;
    //console.log(justHtml);

    /* End code for quill */

    //Get all ingredients
    let ingItems = $(".ingRow").length;
    
    let newIngredient=[];

    for(let i=1; i<=ingItems; i++){
      let obj = {
        ingredient_name: $("#ingredient_name"+i).val(),
        ingredient_quantity: $("#ingredient_quantity"+i).val(),
        ingredient_measurement: $("#measurementDropdown"+i).val()
      }
      newIngredient.push(obj);
    }

    console.log('--------------INGREDENT-----------------------')
    console.log(newIngredient);

    // create formData object (needed for sending image)
    const form = new FormData();
    form.append('recipe_name', $("#recipe_name").val().trim());
    form.append('cuisine_type',$("#cuisineDropdown option:selected").val());
    form.append('category_type',$("#categoryDropdown option:selected").val());
    form.append('recipe_instruction', JSON.stringify(content));
    form.append('recipe_html', jText);
    form.append('ingredient_list', JSON.stringify(newIngredient));

    if (imageData) {
      form.append('recipe_image', imageData, imageData.name);
    }

    $.ajax("/api/addRecipe", {
      type: "POST",
      data: form,
      cache: false,
      contentType: false,
      processData: false
    }).then((data) => {
      console.log('Recipe Created Successfully');
      location.replace('/user/userRecipes');
    }
    );
  });
 
});