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

    const [err, recipeData] = await promiseHandler(recipeController.getRecipeById());

    if (err) {
      console.log(err);
      return false;
    }

    if(recipeData){
      console.log(`
    
        
      STEP 0 ..Get DATA ${recipeData.dataValues}
    
      `);

      const [compileErr, content] = await promiseHandler(compile('recipePdf',recipeData.dataValues));
    
      if(compileErr){
        return compileErr;
      }

      if(content){
        console.log(`
      
      STEP 3 : Content
      
      ${content}
      
      
      `); 

            // Embed a font, set the font size, and render some text
            doc.font('Times-Roman')
            .fontSize(25)
            .text(content, 100, 100);
            doc.pipe(res);
            doc.end();
      
            console.log("STEP 4 : PDF CREATED");
      
      

      }
     
    }
  }
} 