var app = require('http').createServer(handler)
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var PORT='8080'
var mysql = require('mysql');


var db = mysql.createConnection({
    host: "sql9.freemysqlhosting.net"
   ,user: "sql9334561"
   ,password: "NCPryrhr43"
   ,database: "sql9334561"
   ,portnumber: "3306"
});

db.connect(function (error){
  //
});
app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});


//db.connect();
function handler (request, response) {
    var pathname = url.parse(request.url).pathname;
    if(pathname=="/"){
      pathname="/index.html";
    }
    var realPath = path.join('.', pathname);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
}

var io = require('socket.io').listen(app);
io.on('connection', function (socket) {
    var imgpath="./images/no_images.png";
  socket.on('chat message', function (data) {
      console.log(data);
    if(data.img.length!=0){
      console.log(data.img)
      let imgData=data.img.img;
      let time = new Date().getTime();
      imgpath="./images/"+time+".png";
      var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = new Buffer(base64Data, 'base64');
      fs.writeFile(imgpath, dataBuffer, function(err) {
        if(err){
          console.error(err);

        }

    });
  };


    db.query("INSERT INTO moment (msg,image) VALUES ('"+ data.moment +"','"+ imgpath +"')", function(error, result){
      console.log(error);
      db.query("SELECT * FROM moment WHERE msg = ('"+ data.moment +"') ORDER BY msgID DESC LIMIT 1", function (error, message){
        io.emit('chat message',JSON.stringify(message));
      })
    });
    imgpath=" ";

  });


  socket.on('all moment', function(end, data){
    db.query("SELECT * FROM moment", function(error, message){
      socket.emit('all moment', JSON.stringify(message));
    });
  });
  socket.on('all comment', function(end, data){
    db.query("SELECT * FROM comment", function(error, message){
      socket.emit('all comment', JSON.stringify(message));

    });
  });

  socket.on('add like to ', function(data){
    db.query("UPDATE moment SET Likes = Likes+1 WHERE msgID = ('"+data+"')", function(error, message){
    })
    db.query("SELECT * FROM moment WHERE msgID = ('"+data+"')", function(error, message){
      io.emit("like result", JSON.stringify(message));
    })
  });

  socket.on('comment to', function(data){
    io.emit('comment to', data);
    db.query("INSERT INTO comment (msg, msgID) VALUES ('"+ data.comment +"', '"+ data.id +"')", function(error, result){
    });

  });

});
