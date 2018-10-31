const ObjectID = require('mongodb').ObjectID;
const productsCollection = db.collection('products');


function router(app) {
	// console.log("in products controller")
	app.get('/products',(req,res)=>{
		// const collection = db.collection('products');
		productsCollection.find({}).toArray((err,docs)=>{
			console.log("in db call")
			if(err){
				console.log(err)
			}
			res.render('products',{products:docs})
		})
		
	})



	app.get('/products/:id', function(req, res) {
		console.log(req.params.id)
		console.log(typeof(req.params.id))
		productsCollection.findOne({"_id":ObjectID(req.params.id)},(err,result)=>{
			if(err) console.log(err)
			console.log(result)
			res.render('product',{product:result})
		})  
	})    
}


module.exports = router;