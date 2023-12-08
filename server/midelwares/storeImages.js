const axios = require('axios')
const fs = require('fs')
const path = require('path');

const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
async function storeImage (req,res,next){

    const imageUrl = req.query.url;
    try{
        
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        
        const filename = `downloaded_image_${Date.now()}.jpg`;

        // Define the path where the image will be saved
        const filePath = path.join(__dirname, '../Picture', filename);

        // Save the image to the server
        await fs.writeFileSync(filePath, response.data);
    
        req.fileName=filename ,
        next()
        
    }catch(err){
        console.log('we get an error here',err)
    }


}

module.exports=  storeImage