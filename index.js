var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.redirect('https://ipfs.io/ipfs/QmSByV6XEz96cP5EhEHYcsp6YqWqyEsyTSbqLSRa4A9RDm');
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}