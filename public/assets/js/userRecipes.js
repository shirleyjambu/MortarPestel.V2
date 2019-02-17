function deleteRecipe(id) {
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
      return fetch(`/user/deleteRecipe/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          location.reload(); {
               }
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


function shareRecipe(recipeId) {
  Swal.fire({
    title: 'Enter the email id?',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (input) => {
      return fetch(`/user/shareRecipe/${input}/${recipeId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result) {
      console.log(result);
      Swal.fire({
        title: `You've shared your recipe with ${result.value.firstName}`,
        type: 'info',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
      })

    }
  })
};

const saveMeasurements = (data) =>{
  let mObj = {};
  
  data.forEach(m => {
    let id = m.id;
    let name = m.measurement_name;
    mObj[id] = name;
  });

  return mObj;
};

const setMeasurementNames=()=>{
  $.ajax(
    {url : "/user/getMeasurements",
      type : 'GET'}
    ).then((data) =>{
      let gMeasurements = saveMeasurements(data);
      console.log(gMeasurements);
      $(".mId").each(function( index ) {
        
        /*let id= $(this).text;
        alert(id);
        $(this).text(gMeasurements[id]);*/
        $(this).text('Cups');
      });
    });
}

$(document).ready(function () {
  $('.tooltipped').tooltip();
  setMeasurementNames();
});
