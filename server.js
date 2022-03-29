const express = require('express');
const cors = require('cors');
const {cloudinary} = require('./utils/cloudinary');

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post('/upload', async (req, res) => {
    const fileStr = req.body.image;
    const content = req.body.content;

    try {
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'kqiuojxc'
        });
        console.log(uploadResponse);
        postCrime(uploadResponse.url, content, res)
    } catch (error) {
        res.status(500).json({message: 'something went wrong'});
        console.log(error)
    }
});

const postCrime = (imgUrl, content, res) => {
    res.json({imgUrl, content})
}

app.listen(PORT, () => console.log('server running on ' + PORT))