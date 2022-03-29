require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET
    cloud_name: 'ahumareze',
    api_key: '169527325266592',
    api_secret: 'nrkLCaqONtnbA9z_DBr63N2mDLs'
});

module.exports = {cloudinary}