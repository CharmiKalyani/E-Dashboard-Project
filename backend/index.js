const express = require("express")
const cors = require("cors");
const app = express()
require('./db/config')
const User = require("./db/User")
const Product = require("./db/Product")
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
// // removes error

app.use(express.json())
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete user.password;
    resp.send(result);
})

app.post("/login", async (req, resp) => {
    // const {email, password} = req.body;
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body)
        if (user) {
            resp.send(user)
        }
        else {
            resp.send({ result: 'No user found' })
        }
    }
    else {
        resp.send({ result: 'No user found' })
    }

})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/products", async (req, resp) => {
    console.log("Hiii")
    let products = await Product.find();

    console.log(products);
    if (products.length > 0) {
        resp.send(products);
    }

    else {
        resp.send({ result: "No Products Find" })
    }
})

app.delete("/product/:id", async (req, resp) => {
    // resp.send(req.params.id)
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result)
});

app.get("/products/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    }
    else {
        resp.send({ result: "No record found." })
    }
})

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result)
});

app.listen(5000, () => {
    console.log("Server is started at port 5000")
})

app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    resp.send(result)
})


// app.get(path,callback) function routes the http GET request to the path which is being specified with the specified callback function.

// The app.post() function routes the HTTP POST requests to the specified path with the specified callback functions.