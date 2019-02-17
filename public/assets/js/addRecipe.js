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


const createCuisineOptionTable = (data) =>{

  data.forEach(item => {
    let txt = item.cuisine_name;
    var $newOpt = $("<option>").attr("value",'1').text(txt)
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
      alert('to loop');
      data.forEach(item => {
        
        let txt = item.measurement_name;
        var $newOpt = $("<option>").attr("value",'1').text(txt)
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
  <input id="ingredient_name" name="ingredient_name" type="text" class="validate">
  <label for="ingredient_name">Ingredients</label>
  </div>`);

  let $tdQuan = $("<td>");
  $tdQuan.html(`<div class="input-field">
  <i class="material-icons prefix">phone</i>
  <input id="ingredient_quantity" name="ingredient_quantity" type="text" class="validate">
  <label for="ingredient_quantity">Quantity</label>
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
  
  // setup listener for custom event to re-initialize on change
  $('.materialSelect').on('contentChanged', function() {
    $(this).formSelect();
  });

  //getMeasurements();  
  getCuisine();
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
    var text = editor.getText();
    //console.log(text);
    var justHtml = editor.root.innerHTML;
    //console.log(justHtml);

    /* End code for quill */
    let newIngredient=[{
      ingredient_name: $("#ingredient_name").val(),
      ingredient_quantity: $("#ingredient_quantity").val(),
      ingredient_measurement: $("#measurementType").val()
    },{
      ingredient_name: $("#ingredient_name").val(),
      ingredient_quantity: $("#ingredient_quantity").val(),
      ingredient_measurement: $("#measurementType").val()
    }];

    console.log('--------------INGREDENT-----------------------')
    console.log(newIngredient);

    // create formData object (needed for sending image)
    const form = new FormData();
    form.append('recipe_name', $("#recipe_name").val().trim());
    form.append('recipe_instruction', JSON.stringify(content));
    form.append('recipe_html', justHtml);
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