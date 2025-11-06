const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/om-kudrat").then(() => {
    console.log("Database Connected!");
}).catch((error) => {
    console.log("Database Connection Error!", error);
})