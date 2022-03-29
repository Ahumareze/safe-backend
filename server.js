const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {cloudinary} = require('./utils/cloudinary');
const Crime = require('./models/crime');
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

//connect to mongodb
const dbUrl = process.env.dbUrl;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(r => {
    console.log('connected to db ' + r);
    app.listen(PORT);
  })
  .catch(e => console.log(e));

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