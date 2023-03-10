if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
const express = require('express')
const app=express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter=require('./routes/index')

const authorsRouter =require('./routes/authors')
const bodyParser = require('body-parser')

app.set('view engine' , 'ejs' )
app.set('views' ,__dirname + '/views' )
app.set('layout' , 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))

const mongoose=require('mongoose')
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL ,()=>{
    console.log("connected to mongoDb");
})
const db =mongoose.connection
db.on('error' , error=>console.error(error))
db.once('error' , () =>console.log("connected to mongoose"))



app.use('/' , indexRouter)
app.use('/authors' , authorsRouter)
app.listen(process.env.PORT || 3000)
