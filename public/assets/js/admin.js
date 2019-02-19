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

const getCategory = () => {
  $.ajax({
    url: "/user/getCategory",
    type: 'GET'
  }).then((data) => {
    createCategoryTable(data);
  });
};


const createMeasurementTable = (data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((m) => {
    let $tr = createRow(m.id,m.measurement_name,'MST');
    newTable.append($tr);
  });

  $("#mContainer").append(newTable);
}

const createCuisineTable = (data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((cuisine) => {
    let $tr = createRow(cuisine.id, cuisine.cuisine_name, 'CUI');
    newTable.append($tr);
  });
  
  $("#cContainer").append(newTable);
}

const createCategoryTable = (data) => {
  let newTable = $("<table style='width:50%'>");
  data.forEach((category) => {
    let $tr = createRow(category.id,category.categories_name,'CAT');
    newTable.append($tr);
  });
  $("#catContainer").append(newTable);
}

const createRow = (id,name,table) => {
    let $tr = $("<tr>").addClass("itemRow").attr("table",table).attr("id",id);
    let $tdItem = $("<td>").html(name);
    let $tdEdit = $("<td>").html(`<a href=""><i class="material-icons edit">edit</i></a>`);
    let $tdDelete = $("<td>").html(`<i class="material-icons delete">delete_forever</i>`);
    $tr.append($tdItem, $tdEdit, $tdDelete);

    return $tr;
  }

 
  const deleteRow = (table, id) => {
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
          return fetch(`/user/deleteItems/${id}/${table}`)
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
  getCategory();

  // Event handler for delete
  $(document).on("click",".delete",function(){
    let table = $(this).closest(".itemRow").attr("table");
    let id = $(this).closest(".itemRow").attr("id");
    deleteRow(table, id);
    deleteItems();
  });

  const getUser = () => {
    $.ajax({
      url: "/user/getUser",
      type: 'GET'
    }).then((data) => {
      createUserTable(data);
    });
   };
   
   const createUserTable = (data) => {
    let newTable = $("<table style='width:50%'>");
    data.forEach((m) => {
      let $tr = createRow(m.id,m.firstName +" " +  m.lastName +" " + m.userType,'UT');
      newTable.append($tr);
    });
   
    $("#uContainer").append(newTable);
   }
   getUser();
});