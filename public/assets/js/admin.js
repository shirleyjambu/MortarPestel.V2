 $(document).ready(function () {
   // Intialize materialize controls
   $('.collapsible').collapsible();
   $('select').formSelect();

   $("#measurement").on("click",function(){
     $.ajax(
       {url : "/user/getMeasurements",
       type : 'GET'}
     ).then((data) =>{
       location.replace("/user/adminMain");
     });
   });

   $("#cuisine").on("click", function(){
     $.ajax(
       {url : "/user/getCuisine",
      type : 'GET'}
     ).then((data) =>{
       location.replace("/user/adminMain");
     });
   });

 });
