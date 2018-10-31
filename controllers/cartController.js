const ObjectID = require('mongodb').ObjectID;
const cartCollection = db.collection('cart');
const productsCollection = db.collection('products');

function router(app) {

	app.get('/cart', (req, res) => {
		cartCollection.find({}).toArray((err, docs) => {
			if (err) console.log(err)
			console.log(docs)
			res.render('cart', {
				products: docs
			})
		})
	})

	app.post("/cart/:itemId", (req, res) => {
		console.log("cart post calling************************************")
		console.log(typeof (req.params.itemId))
		cartCollection.find({
			"productId": {
				$in: [req.params.itemId]
			}
		}).toArray((err, docs) => {
			console.log("docs length " + docs.length)
			console.log(docs)
			if (err) {
				console.log(err)
			} else if (docs.length > 0) {
				res.redirect('/products')
			} else {
				productsCollection.findOne({
					"_id": ObjectID(req.params.itemId)
				}, (err, result) => {
					if (err) console.log(err)
					else {
						var cartJson = {
							"name": result.name,
							"price": result.price,
							"productId": result._id.toString(),
							"image": result.image
						}
						console.log(cartJson)
						cartCollection.insertOne(cartJson, (err, inserted) => {
							if (err) {
								console.log(err);
							} else {
								console.log("Inserted Successfully")
								res.redirect('/products')
							}
						})
					}
				})
			}
		})
	});

	app.delete('/cart/delete/:itemId', function(request, response) {
		console.log("******in cart delete*****************************")
	    cartCollection.remove({"_id":ObjectID(req.params.itemId)},(err,deleted)=>{
	    	if(err) console.log(err)
	    	response.redirect('/cart');	
	    })
	    //   where: {
	    //     UserId: request.user.id,
	    //     id: request.params.itemId,
	    //   }
	    // }).then(function() {
	    //   response.redirect('/cart');
	    // }).catch(function(err) {
	    //     console.log(err.message);
	    //     response.send(err);
	    // });
	});

}


module.exports = router;