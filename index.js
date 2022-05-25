const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());



app.get('/',(req,res)=> {
    res.send("Server is running.");
})


app.listen(port,()=>{
    console.log(port,"port is listening.")
})