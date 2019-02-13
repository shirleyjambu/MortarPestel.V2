const { validationResult } = require('express-validator/check');
var db = require("./../models");

module.exports = {
  addMeasurements : (req, res) => {
    console.log('............ CREATE MEASUREMENTS .........');
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("adminMain",{layout:'user', errors:errors.array()});
    }else{
      
      let measurements = {
        measurement_name: req.body.measurement
      
      };

      db.Measurements.create(measurements).then(function(dbData) {
        res.render("adminMain",{layout:'user', measurementCreated:'Measurement added in database'});
      });    
    }
    
  }
};