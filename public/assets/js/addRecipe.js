$(document).ready(function(){
  $('select').formSelect();
  
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