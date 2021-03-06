var process = require('process');  
var http = require('http'),
    fs = require('fs'),
    util = require('util');

sleep(30000).then(function(){
   app.get('/', function(req, res){
  res.redirect('https://localhost:4000');
  /*
    This will redirect to an add that will redirect to the next video
    This uses express routing and ejs templates
  */
});
  });

http.createServer(function (req, res) {
  var path = 'video.mp4';
  var stat = fs.statSync(path);
  var total = stat.size;
  if (req.headers['range']) {
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res);
  } else {
    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
    fs.createReadStream(path).pipe(res);
  }
}).listen(1337, );
console.log('Server running at http://localhost:1337/');
setTimeout(function() {
	process.abort();
    console.log('Blah blah blah blah extra-blah');
}, 200000);


