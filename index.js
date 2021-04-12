const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const connectionString = "mongodb+srv://root:umassd123@cluster0.thksr.mongodb.net/node_activity?retryWrites=true&w=majority"
mongoose.connect(connectionString, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, res) => {
        if(err) {
            console.log("Connection error")
        }
        else {
            console.log("MongoDB connection successful")
        }
    }
    )

const mySchema = new mongoose.Schema({
    "Country (or dependency)": String,
    "Population (2020)": Number,
    "Yearly Change": String,
    "Net Change": Number,
    "Density (P/Km²)": Number,
    "Land Area (Km²)": Number,
    "Migrants (net)": Number,
    "Fert. Rate": Number,
    "Med. Age": Number,
    "Urban Pop %": String,
    "World Share": String
})

const model = mongoose.model("world_population", mySchema, "world_population")

app.get("/", (req, res) => {
    const country = req.query.country
    console.log(country)
 
    if (country !== undefined) {
        model.find({"Country (or dependency)":country}, (err, data) => {
            if(err) {
                console.log("Error")
            }
            else {
                res.json(data)
            }
        })
    }
    else {
        res.status(400).json({"Error":"Incorrect key"})
    }

})

app.listen(port, () => {
    console.log("Listening...")
})