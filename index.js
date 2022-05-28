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
const usersCollection = server.db("laptopAccessories").collection("users");
  

//add data to db
async function addingData(data,dataCollectionForAdd){
    try {
        await server.connect();
        const result = await dataCollectionForAdd.insertOne(data)
        console.log(`User inserted with id: ${result.insertedId}`)
    } finally {
        await server.close();        
    }
}



//add review api
app.post('/addreview',(req,res) => {
    const newReview = req.body;
    addingData(newReview,reviewsCollection).catch(console.dir)
    res.send({success:true})
})


//add product api
app.post("/addproducts", (req,res) => {
    const newProduct = req.body;
    addingData(newProduct,productsCollection).catch(console.dir)
    res.send({success:true})
})


//Data show from api
async function showData (dataCollectionForShow) {
    try{
        await server.connect();
        
        const cursor = dataCollectionForShow.find({})
        const data = await cursor.toArray()
        console.log('mew')
        return data;
    }
    finally{
        await server.close();
    }
  }
 
  //show all products
app.get('/showproducts', async (req,res) => {
  
    const products = await showData(productsCollection).catch(console.dir)
    res.send(products)
  })

  //show all review
app.get('/showreviews', async (req,res) => {
  
    const products = await showData(reviewsCollection).catch(console.dir)
    res.send(products)
  })
  //show all users
app.get('/showusers', async (req,res) => {
  
    const products = await showData(reviewsCollection).catch(console.dir)
    res.send(products)
  })

























































app.get('/',(req,res)=> {
    res.send("Laptop-accessories server is running.");
})


app.listen(port,()=>{
    console.log(port,"port is listening.")
})