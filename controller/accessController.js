const db = require("./../models");


module.exports = function(app) {
app.post("/assets", function(req, res) {

  db.Access.create({
    userId: req.body.userId,
    recipeId: req.body.recipeId
  }).then(function(dbData) {
    res.json(post);
  })
    .catch(function(err) {
      res.json(err);
    });
});
};