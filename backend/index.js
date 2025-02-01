require('dotenv').config();
const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser')

const app = express();

const {connectMongoDb} = require('./db/connectdb');

const authRoutes = require('./routes/authRoutes');

const path = require("path");

const _dirname = path.resolve();
 
const Url = process.env.MONGO_URL;

const PORT = process.env.PORT ||  5005;



// Allow all origins
app.use(cors({origin: 'http://localhost:5173',credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(_dirname,"/frontend/dist")));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
    });
}

app.listen(PORT,()=>{
    connectMongoDb(Url);
    console.log('Server is Running on PORT:',PORT);
})


