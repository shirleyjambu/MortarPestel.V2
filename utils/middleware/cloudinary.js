const cloudinary = require('cloudinary');
const Formidable = require('formidable');
require('dotenv').config();

// tell cloudinary to use your account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});

// upload image and send nexts part of route
module.exports = function(req, res, next) {
  // create new formidable form
  const form = new Formidable.IncomingForm();
//  form.multiples = true;

  // since we're uploading an image, use formidable to parse it out and separate files (photos) from fields (text)
  form.parse(req, (err, fields, files) => {
    // if there's a photo, upload it and use it's callback object to get the url
    if (files.recipe_image) {
      cloudinary.uploader.upload(files.recipe_image.path, result => {
        console.log(result);
        // rewrite req.body so it's available in the next set of middleware
        req.body.recipe_image = result.secure_url;
        req.body.id = fields.recipe_id;
        req.body.recipe_name = fields.recipe_name;
        req.body.recipe_instruction = fields.recipe_instruction;
        req.body.recipe_html = fields.recipe_html;
        req.body.ingredient_list = fields.ingredient_list.split(',');
        req.body.cuisine_type = fields.cuisine_type;
        req.body.category_type = fields.category_type;
        
        console.log(req.body);

        // send next middleware
        next();
      });
    } else {
        req.body.id = fields.recipe_id;
        req.body.recipe_name = fields.recipe_name;
        req.body.recipe_instruction = fields.recipe_instruction;
        req.body.recipe_html = fields.recipe_html;
        req.body.ingredient_list = fields.ingredient_list.split(',');
        req.body.cuisine_type = fields.cuisine_type;
        req.body.category_type = fields.category_type;
        console.log(req.body);

        // send next middleware
        next();
    }
  });
};