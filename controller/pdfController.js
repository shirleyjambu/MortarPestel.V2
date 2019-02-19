const PDFDocument = require('pdfkit');
const hbs = require('handlebars');
const fs = require('file-system');
const path = require('path');
const recipeController = require('./recipeController');

const promiseHandler = promise => promise
  .then(res => [null, res])
  .catch(err => [err, null]);


const compile = (templateName, data) =>{
    return  new Promise(async(resolve, reject) => {
      const filepath = path.join(path.dirname(__dirname) , 'template', `${templateName}.hbs`);
      await fs.readFile(filepath,'utf-8',async (err,html)=>{
      
        if(err){
          reject(err); 
        }else{
          console.log(html);
          console.log("STEP 2");
          console.log(data);
          const content = await hbs.compile(html)(data)
          resolve(content);
        }
    });
  })};


module.exports = {
  getPDF : async(req,res) => {
    let filename = "output.pdf";
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')
    
    const doc = new PDFDocument();

    const [err, recipeData] = await promiseHandler(recipeController.getRecipeById(req,res));

    if (err) {
      console.log(err);
      return false;
    }

    console.log(recipeData);
    if(recipeData){

      
      let recipe = recipeData.dataValues;
      let name = recipe.recipe_name;
      let instruction = recipe.recipe_html;
      
     // Embed a font, set the font size, and render some text
     doc.font('Times-Roman')
     .fontSize(20)
     .text(name);
      
          // Embed a font, set the font size, and render some text
          /*doc.font('Times-Roman')
          .fontSize(15)
          .text('Ingredients:');
    
          let ingArr= recipe.Ingredients;
          for(let i=1; i<= ingArr.length ;i ++){
            console.log('Here ---------------------');
            console.log(JSON.parse(ingArr[i].Ingredients));

            let str="";
            /*let str = i + ". " +ingArr[i].ingredient_name + " " + ingArr[i].ingredient_quantity + " " + ingArr[i].ingredient_measurement;

            doc.font('Times-Roman')
            .fontSize(15)
            .text(str);
          }*/
          
    
    doc.font('Times-Roman')
    .fontSize(12)
    .text(instruction);

    doc.pipe(res);
    doc.end(); 
      
     
    }
  }
}


      /*Add an image, constrain it to a given size, and center it vertically and horizontally
      doc.image('./../public/assets/images/logo3.png', {
        fit: [100, 100],
        align: 'center',
        valign: 'center'
      });*/


      /*console.log(`
    
        
      STEP 0 ..Get DATA ${recipeData.dataValues}
    
      `);*/

      /*const [compileErr, content] = await promiseHandler(compile('recipePdf',recipeData.dataValues));
    
      if(compileErr){
        return compileErr;
      }

      if(content){
         

            
      
        //    console.log("STEP 4 : PDF CREATED");
      
      }*/
