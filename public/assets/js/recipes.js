
$("#addRecipe").on("submit", function (event) {
  event.preventDefault();
  const newRecipe = {
    plan: $("addRecipeTitle [name=add]").val().trim()
  };
  $.ajax("/addRecipe", {
    type: "POST",
    data: newRecipe
  }).then(
    function () {
      console.log("Successfully created plan");
    }
  );
});
$("#recipeText").on("")

