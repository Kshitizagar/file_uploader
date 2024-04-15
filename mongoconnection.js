const mongoose = require('mongoose');

const mongoconnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/uploaderDB", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then(() => {
        console.log("Connection successful");
    }).catch((err) => {
        console.error("Connection failed:", err);
    });
};

module.exports = mongoconnect;
















