const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

//sadik192
//8L1GXEgQxv6QEfAh


const uri = "mongodb+srv://sadik192:8L1GXEgQxv6QEfAh@cluster0.hy9z3.mongodb.net/?retryWrites=true&w=majority";
const server = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const orderListCollection = server.db("laptopAccessories").collection("orderList");
const productsCollection = server.db("laptopAccessories").collection("products");
const reviewsCollection = server.db("laptopAccessories").collection("reviews");
const devicesCollection = server.db("laptopAccessories").collection("users");
  

//add data to db
async function addingData(data,dataCollection){
    try {
        await server.connect();
        const result = await dataCollection.insertOne(data)
        console.log(`User inserted with id: ${result.insertedId}`)
    } finally {
        await server.close();        
    }
}



//adding review api

app.post('/addreview',(req,res) => {
    const newReview = req.body;
    addingData(newReview,reviewsCollection).catch(console.dir)
    res.send({success:true})
})









app.get('/',(req,res)=> {
    res.send("Laptop accessories server is running.");
})


app.listen(port,()=>{
    console.log(port,"port is listening.")
})