const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require('cors')
const { ObjectID } = require("json");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

const corsConfig = {
  origin: 'https://laptop-accessories.firebaseapp.com'
 
}
app.use(cors(corsConfig))

// app.use(cors({ origin : "https://laptop-accessories.firebaseapp.com" }))
// app.use(cors());
app.use(express.json());

//sadik192
//8L1GXEgQxv6QEfAh

const uri =`mongodb+srv://${process.env.USER}:${process.env.PWD}@cluster0.hy9z3.mongodb.net/?retryWrites=true&w=majority`;
const server = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const orderListCollection = server.db("laptopAccessories").collection("orderList");
const productsCollection = server.db("laptopAccessories").collection("products");
const reviewsCollection = server.db("laptopAccessories").collection("reviews");
const usersCollection = server.db("laptopAccessories").collection("users");

//add data to db
async function addingData(data, dataCollectionForAdd) {
  try {
    await server.connect();
    const result = await dataCollectionForAdd.insertOne(data);
    console.log(`User inserted with id: ${result.insertedId}`);
  } finally {
    await server.close();
  }
}

//add review api
app.post("/addreview", (req, res) => {
  const newReview = req.body;
  addingData(newReview, reviewsCollection).catch(console.dir);
  res.send({ success: true });
});
//add user api
app.post("/adduser", (req, res) => {
  const newUser = req.body;
  addingData(newUser, usersCollection).catch(console.dir);
  res.send({ success: true });
});

//add product api
app.post("/addproducts", (req, res) => {
  const newProduct = req.body;
  addingData(newProduct, productsCollection).catch(console.dir);
  res.send({ success: true });
});

//add order api
app.post("/addorder", (req, res) => {
  const newOrder = req.body;
  addingData(newOrder, orderListCollection).catch(console.dir);
  res.send({ success: true });
});

//Data show from api
async function showData(dataCollectionForShow) {
  try {
    await server.connect();

    const cursor = dataCollectionForShow.find({});
    const data = await cursor.toArray();

    return data;
  } finally {
    await server.close();
  }
}

//show all products
app.get("/showproducts", async (req, res) => {
  const products = await showData(productsCollection).catch(console.dir);
  res.send(products);
});

//show all review
app.get("/showreviews", async (req, res) => {
  const reviews = await showData(reviewsCollection).catch(console.dir);
  res.send(reviews);
});
//show all users
app.get("/showusers", async (req, res) => {
  const users = await showData(usersCollection).catch(console.dir);
  res.send(users);
});

//show all order
app.get("/showorders", async (req, res) => {
  const products = await showData(orderListCollection).catch(console.dir);
  res.send(products);
});

//single data from api
async function getSingleData(id, dataCollectionForFindOne) {
  try {
    await server.connect();
    const search = { _id: ObjectId(id) };

    const data = await dataCollectionForFindOne.findOne(search);

    return data;
  } finally {
    await server.close();
  }
}

//get one product
app.get("/showproductdetails/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id - ", id);
  const result = await getSingleData(id, productsCollection).catch(console.dir);
  res.send(result);
});


//update function
async function updateDate(filter, data, dataCollectionForUpdateOne) {
  //filter is the unique key to find a data
  try {
    await server.connect();

    const options = { upsert: true };

    const updateDoc = { $set: data };
    const result = await dataCollectionForUpdateOne.updateOne(filter,updateDoc,options);
    return result;
  } finally {
    await server.close();
  }
}

//update one user or insert one user
app.put("/addoneuser", async (req, res) => {
  let email = req.body.email;
  const id = { email: email };
  const data = req.body;
  const result = await updateDate(id, data, usersCollection);
  res.send(result);
});

//update product ammount
// app.put('/')



//delete product
app.delete("/deleteproduct/:id",async (req, res) => {
  try {
    await server.connect();
   
    const id = req.params.id

    console.log(id)

    const result = await productsCollection.deleteOne({_id:ObjectId(id)})

    res.send(result)
  } finally {
    await server.close();
  }
});


























































app.get("/", (req, res) => {
  res.send("Laptop-accessories server is running.");
});

app.listen(port, () => {
  console.log(port, "port is listening.");
});
