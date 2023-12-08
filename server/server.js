const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')

const resizeImages = require('./midelwares/resizeImage')
const storeImage =require('./midelwares/storeImages') 

app.use(express.json());
app.use(cors())
app.use('/Picture', express.static('Picture'));
app.use('/userPicture', express.static('userPicture'));


app.get('/image',storeImage,resizeImages,async (req,res)=>{
    const imageDiscreption = req.imageResized
    res.json({imageDiscreption})
})

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})
