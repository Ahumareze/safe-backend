const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'ahumareze',
    api_key: '169527325266592',
    api_secret: 'nrkLCaqONtnbA9z_DBr63N2mDLs'
});

const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
            console.log(resolve)
        })
    })
}

app.post('/upload', (req, res) => {
    console.log(req.body.file)
})

app.listen(PORT)