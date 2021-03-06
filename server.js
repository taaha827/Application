//Importing Express
const express = require("express");
const mongoose = require("mongoose");
require('dotenv/config');
//Initializing The Server
const app = express();
const bodyParser = require("body-parser");
const passport = require('./config/passport')
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(express.static("uploads/Store"))
app.use(express.static("uploads/Customer"))
app.use(express.static("uploads/Owner"))
app.use(express.static("uploads/Posts"))

//Loading Routes 
const appointmentRoutes = require("./Routes/appointments");
const customerRouters = require('./Routes/customers');
const ownerRoutes  = require('./Routes/owners');
const packageRoutes  = require('./Routes/packages');
const postRoutes  = require('./Routes/posts');
const reviewRoutes =require('./Routes/reviews');
const storeRoutes  = require('./Routes/stores');
const generalRoute = require('./Routes/gerneal');
const paymentRoute = require('./Routes/payment');

app.use('/payment',paymentRoute);
app.use("/appointments",appointmentRoutes);
app.use("/customer",customerRouters);
app.use("/owner",ownerRoutes);
app.use("/package",packageRoutes);
app.use("/post",postRoutes);
app.use("/review",reviewRoutes);
app.use("/store",storeRoutes);
app.use('/general',generalRoute);


//Connection TO Database
mongoose.connect(" mongodb+srv://taaha827:randompassword@cluster0-xezp5.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log("Connection Successfull")
});


app.listen(process.env.PORT||5000);