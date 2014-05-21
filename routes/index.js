var express =require('express');
var app = module.exports = express.createServer();

var mongoose= require('mongoose');
var db = mongoose.createConnection('localhost','tempdb');

/*
 * GET home page.
 */
//Schema 
var itemsSchema = new mongoose.Schema({
	category: String,
	producttype: String,
        productname: String,
        price: Number,
        meta: {
             brand: String,
             color: String,
	     volume: String,
             isbn : String,
	     author : String,
             Publisher : String
             }
    });

var Item = db.model('Item',itemsSchema);

app.get('/',function(req,res,next){  
    res.render('index', { title: 'Express' })
});


/* GET Hello World page. */
app.get('/helloworld',function(req, res, next) {
    res.render('helloworld', { title: 'Hello, World!' })
});

//default home page 
app.get('/home',function(req,res){		

   if(req.query.category && req.query.searchtext==""){
	return Item.find({category:req.query.category},{_id:0},function (err, items) {
	        console.log(items);
	        res.render('home',{title:'Welcome to Online Shopping',result:items});	       
	});
    }
     else if(req.query.category && req.query.searchtext){
		return Item.find( { category:req.query.category,'$text': { '$search': req.query.searchtext }},{_id:0},function(err,items){
       			console.log(items)
        		res.render('home',{title:'Welcome to Online Shopping',result:items});	       
		});
	}
	else if(req.query.category=="" && req.query.searchtext){
		console.log(req.query.category);
		return Item.find( { '$text': { '$search': req.query.searchtext }},function(err,items){
       			console.log(items)
        		res.render('home',{title:'Welcome to Online Shopping',result:items});	       
		});

	}
	else
		res.render('home',{title:'Welcome to Online Shopping',homepage:'true',result:''}) 
});
