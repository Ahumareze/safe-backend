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

app.post('/api/crimes', (req, res) => {
    Crime.find({location: req.body.location})
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            res.status(500).json({message: 'error'})
        })
})

app.post('/api/upload', async (req, res) => {
    const fileStr = req.body.image;

    try {
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'kqiuojxc'
        });
        console.log(uploadResponse);
        postCrime(uploadResponse.url, req, res)
    } catch (error) {
        res.status(500).json({message: 'something went wrong'});
        console.log(error)
    }
});

app.post('/api/like', (req, res) => {
    const id = req.body.id;
    Crime.findById(req.body.id)
        .then(r => {
            likePost(id, r, res);
        })
        .catch(e => {
            res.status(500).json({message: e});
            console.log(e)
        })
});

const likePost = (id, data, res) => {
    res.json(r.likes)
}

const postCrime = (imgUrl, req, res) => {
    const content = req.body.content;
    const date = req.body.date;
    const time = req.body.time;
    const likes = req.body.likes;
    const location = req.body.location;

    const crime = new Crime({
        name: 'Anonymous',
        date,
        time,
        location,
        image: imgUrl,
        content,
        likes
    })
    crime.save()
        .then(r => {
            res.json(r)
        })
        .catch(e => {
            res.status(500).json({message: 'error posting data'});
            console.log(e)
        })
}