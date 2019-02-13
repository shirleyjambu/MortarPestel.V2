$(document).ready(function(){
  $("#addRecipe").on("submit", function (event) {
    event.preventDefault();
    /* Code for quill*/
    console.log("--------------- Submitting ----------");

    var editor_content = editor.container.innerHTML;
    console.log(editor_content);
    var delta = editor.getContents();
    console.log("------------ Delta -------------");
    console.log(delta);
    var content = delta.ops;
    console.log("---------------Content -----------");
    console.log(content);

    console.log("----------- HTML ---------------");
    console.log(editor_content);
    

    console.log(delta);
    var text = editor.getText();
    console.log(text);
    var justHtml = editor.root.innerHTML;
    console.log(justHtml);

    /* End code for quill */
    let newRecipe = {
      recipe_name: $("#recipe_name").val().trim(),
      recipe_instruction : content,
      recipe_html: justHtml
    };

    $.ajax("/api/addRecipe", {
      type: "POST",
      data: newRecipe
    }).then((redirectUrl) => {
        location.replace('/user/userRecipes');
    }
    );
  });
 
});

 


