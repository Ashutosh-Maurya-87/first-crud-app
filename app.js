const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.urlencoded());
app.use(express.json());

const studentrouter= require("./routes/routeapp.js");
app.use('/students',studentrouter);
async function main() {
    await mongoose.connect('mongodb+srv://ashutosh:lMaG7wUtEqmGdeDT@cluster0.ilwvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  }
let port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
    main();
});




//await menu.save({ _id: req.params.menuId},{$set:menu}).then((error)=>{res.status(error)}).then(()=>{res.json()})