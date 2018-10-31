
function router(app) {
console.log(" in index controller")

  app.get('/', function(req, res) {
    res.redirect('/products');
  });
   
}

module.exports = router;
