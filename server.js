const express = require('express');
const cors = require('cors');
const {cloudinary} = require('./utils/cloudinary');
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}))
const PORT = process.env.PORT || 5000;

// const uploads = (file, folder) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (result) => {
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             })
//             console.log(resolve)
//         })
//     })
// }

app.post('/upload', async (req, res) => {
    const fileStr = req.body.image;
    try {
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'kqiuojxc'
        });
        console.log(uploadResponse);
        res.json({msg: "successful"})
    } catch (error) {
        // res.status(500).json({err: 'sommething went wrong'})
        console.log(error)
    }
    
})

app.listen(PORT)