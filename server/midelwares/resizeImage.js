const sharp = require('sharp');
const fs  = require('fs')
const path =require('path')


const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  


const resizeImages = asyncMiddleware( async( req,res,next)=>{
    const fileName  = req.fileName;    
    const imagePath = path.join(__dirname, '../Picture', fileName);
    console.log('image file ',imagePath)
     // Use Sharp for image processing
    const image = sharp(imagePath) //path to the stored image 
    try{
       await image.metadata().   // get image metadata for size 
        then((metadata)=>{
          if (metadata.width > 450) {
            return image.resize({ width: 450 }).toFile(`./userPicture/${fileName}`) ; // resize if too big
          } else {
            return image.toFile(`./userPicture/${fileName}`);
          }
        }).then((data)=>{
            fs.rmSync(imagePath, { force: true }); // delete the tmp file as now have buffer
            console.log('data',data)
            data.filename = fileName
            data.destination=`./userPicture`
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