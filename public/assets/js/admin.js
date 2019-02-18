const getMeasurements = () => {
  $.ajax({
    url: "/user/getMeasurements",
    type: 'GET'
  }).then((data) => {
    createMeasurementTable(data);
  });
};

const getCuisine = () => {
  $.ajax({
    url: "/user/getCuisine",
    type: 'GET'
  }).then((data) => {
    createCuisineTable(data);
  });
};

const getCatergory = () => {
  $.ajax({
    url: "/user/getCategory",
    type: 'GET'
  }).then((data) => {
    createCategoryTable(data);
  });
};




const createMeasurementTable = (data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((measurement) => {
    let $tr = createRow(measurement.measurement_name);
    newTable.append($tr);
  });

  $("#mContainer").append(newTable);
}

const createCuisineTable = (data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((cuisine) => {
    let $tr = createRow(cuisine.cuisine_name);
    newTable.append($tr);
  });

  $("#cContainer").append(newTable);
}

const createCategoryTable = (data) => {
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
    let $tdEdit = $("<td>").html(`<a href=""><i class="material-icons">edit</i></a>`);
    let $tdDelete = $("<td>").html(`<a href="#" onclick="deleteRow();"><i class="material-icons">delete_forever</i></a>`);
    $tr.append($tdItem, $tdEdit, $tdDelete);

    return $tr;
  }

 
  const deleteRow = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          return fetch(`/user/deleteItems/1/MST`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              location.reload(); 
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }

$(document).ready(function () {
  // Intialize materialize controls
  $('.collapsible').collapsible();
  $('.tabs').tabs();
  $('select').formSelect();

  getMeasurements();
  getCuisine();
  

});