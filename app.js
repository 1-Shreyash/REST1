require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 3000;

const products_routes = require("./routes/products");

app.get("/", (req, res)=>{
    res.send("HI, Hello world!!");
});

//middleware
app.use("/api/products", products_routes);

const start = async() =>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,  () => {
            console.log(`${PORT} YIPEE I am Connected!`);
        });
    }catch(error){
        console.log(error);  
    }
}

start();