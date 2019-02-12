app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {console.log(err);}
    else{
      if (foundUser){
        if (foundUser.password === password){
          res.render(welcomepage
            // page and options we want available to authorized user
          );
        }
      }
    }
  })

})