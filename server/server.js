const express = require('express')
const app = express()
const port = 3000

const path = require('path');
const resizeImages = require('./midelwares/resizeImage')
const storeImage =require('./midelwares/storeImages') 
app.use('/Picture', express.static('Picture'));
app.use('/userPicture', express.static('userPicture'));


app.get('/image',storeImage,resizeImages,async (req,res)=>{
    fileName = req.fileName
    const imagePath = path.join(__dirname, '../Picture', fileName);

    console.log('fileName',imagePath)
    res.send("successfuly")

})

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})
