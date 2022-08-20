const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.json());
const cors = require("cors");
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const url = process.env.MONGOSE_URL;
const uri = url;

const client = new MongoClient(uri, console.log("hello"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const prodcutCollection = client.db("education").collection("course");
    app.get("/get-all", async (req, res) => {
      const result = await prodcutCollection.find({}).toArray();
      res.send(result);
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
