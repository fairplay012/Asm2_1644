const express = require('express')
const hbs = require('hbs')

var app = express();
app.set('view engine','hbs')
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'))
app.set('views', './views')
const ObjectID = require('mongodb').ObjectID;
var dsNotToDelete = ['ao','quan','bep','my goi'];

const dbHandler = require('./databaseHandler')


//search chinh xac=> tim gan dung
app.post('/search', async (req,res)=>{
    const searchText = req.body.txtName;
    const dbo = await dbHandler.GetDB();
    let result = await dbo.collection("Products").find({name: new RegExp(searchText, 'i')}).toArray();
    console.log(result);
    res.render('allProduct',{model:result}) 

})

app.post('/update',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const newValues ={$set : {name: nameInput,price:priceInput}};
    
    const condition = {"_id" : ObjectID(id)};
    const dbo = await dbHandler.GetDB();
    await dbo.collection("Products").updateOne(condition, newValues);
    res.redirect('/view');
})
app.get('/delete',async (req,res)=>{
    const id = req.query.id;
    const condition = {"_id" : ObjectID(id)};
    
    const dbo = await dbHandler.GetDB();
    const productToDelete = await dbo.collection("Products").findOne(condition);
    const index = dsNotToDelete.findIndex((e)=>e==productToDelete.name);
    if (index !=-1) {
        res.end('khong the xoa vi sp dac biet: ' + dsNotToDelete[index])
    }else{
        await dbo.collection("Products").deleteOne(condition);
        res.redirect('/view');
    }   
})

app.get('/view',async (req,res)=>{
    const dbo = await dbHandler.GetDB();
    const results =  await dbo.collection("Products").find().toArray();
    res.render('allProduct',{model:results})
})

app.post('/doInsert', async (req,res)=>{
    let nameInput = req.body.txtName;
    let priceInput = req.body.txtPrice;
    let newProduct = {name:nameInput, price:priceInput, size : {dai:20, rong:40}};
    const dbo = await dbHandler.GetDB();
    await dbo.collection("Products").insertOne(newProduct);
    res.render('index');
})
app.get('/insert',(req,res)=>{
    res.render('insert')
})

app.get('/',(req,res)=>{
    res.render('index')
})

var PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Server is running at: '+ PORT);