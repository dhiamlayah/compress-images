const sharp = require('sharp');
const fs  = require('fs')
const path =require('path')

const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const resizeImages = asyncMiddleware( async( req,res,next)=>{
    const fileName  = req.fileName;    
    const imagePath = path.join(__dirname, '../Picture', fileName);
    const imageWidth= parseInt(req.query.width)
    const imageheigth= parseInt(req.query.height)

    // Use Sharp for image processing
    const image = sharp(imagePath) //path to the stored image 
    try{
       await image.metadata().   // get image metadata for size 
        then(()=>{
             return image.resize({ width: imageWidth,height:imageheigth }).toFile(`./userPicture/${fileName}`) ; // resize if too big
        }).then((data)=>{
            fs.rmSync(imagePath, { force: true }); // delete the tmp file as now have buffer
            req.imageResized = data
            next()
        });  
     
    }catch(error){
        console.log('we have a problem when we resize the image :( =>',error)
        next(error)
    }
}
)

module.exports= resizeImages