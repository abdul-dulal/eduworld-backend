const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.json());
const cors = require("cors");
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const url = process.env.MONGOSE_URL;
const uri = url;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const courseCollection = client.db("education").collection("course");
    const orderCollection = client.db("education").collection("order");

    app.post("/create-payment-intent", async (req, res) => {
      const service = req.body;

      const price = service.price;
      const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    app.get("/get-all", async (req, res) => {
      const result = await courseCollection.find({}).toArray();
      res.send(result);
    });

    app.get("/price/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await courseCollection.findOne(filter);
      res.send(result);
    });

    app.post("/my-order", async (req, res) => {
      const order = req.body;
      const orderResult = await orderCollection.insertOne(order);
      res.send(orderResult);
    });
    app.get("/my-order", async (req, res) => {
      const email = req.query.email;
      const filter = { email };
      const order = await orderCollection.find(filter).toArray();
      res.send(order);
    });

    app.get("/", (req, res) => {
      res.send("hello from eduworld");
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
