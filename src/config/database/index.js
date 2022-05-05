const mongoose = require('mongoose');

const database = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Banh_The_Cake_Youtube');
        console.log("connect success");
    }
    catch(err) {
        console.log("something wrong in database")
    }
}

module.exports = {database};