var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app)
  , port = 3000;

app.configure(function(){
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
  res.render('index');
});

io.sockets.on('connection', function(socket){
  socket.emit('news', {hello: 'world'});
  socket.on('reply', function(data){
    console.log('client %s got it, and replied "%s"', socket, data.content);
  });
  socket.on('message', function(data){
    console.log(data);
    io.sockets.emit('message', {'content':data.content});  
  });
});

app.listen(port);
console.log("server is running at http://localhost:" + port);