var app = require('http').createServer(handler)
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var PORT='8000'
var mysql = require('mysql');
var bcrypt = require('bcryptjs');




var db = mysql.createConnection({
    host: "sql9.freemysqlhosting.net"
   ,user: "sql9338639"
   ,password: "lz5n3BdAwk"
   ,database: "sql9338639"
   ,portnumber: "3306"
});

db.connect(function (error){
//
});
app.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});



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
    db.query("INSERT INTO moment (msg,image) VALUES (?,?)",[data.moment,imgpath] function(error, result){
      console.log(error);
      db.query("SELECT * FROM moment WHERE msg = (?) ORDER BY msgID DESC LIMIT 1",data.moment, function (error, message){
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

  socket.on('all user', function(end, data){
    //  console.log("yes all user");
      db.query("SELECT username FROM account", function(error, message){
      //  console.log(message);
        socket.emit('all user', JSON.stringify(message));
      });
    });

  socket.on('check follow', function(data){
      //check if not login in;
      if(data.self_name == ""){socket.emit('not login in')}
      else{
        console.log("if already login in ");
        var self_name = data.self_name;
        var follow_name = data.sbf;
        var count= 0;
      //  console.log("follow_name: "+data.sbf);
        db.query("SELECT * FROM Follow WHERE self = (?)", follow_name, function(error, message){

          for(var i = 0; i < message.length; i++){
            var fl = message[i].Follower;
            if(bcrypt.compareSync(fl, self_name)){
              console.log("already follow this guy");
              socket.emit('already follow');
              count++;
          }
          //  socket.emit('check follow', "unfollow");
          }

          if(count == 0){
            console.log("haven't follow");
            db.query("SELECT username FROM account", function(error, message){
              for(var i = 0; i < message.length; i++){
                var username = message[i].username;
                if(bcrypt.compareSync(username, self_name)){
                  console.log("im the user");
                  // db.query("INSERT INTO Follow (self, Follower) VALUES ('"+ follow_name +"', '"+ username +"')", function(error, message){
                  db.query("INSERT INTO Follow (self, Follower) VALUES (?,?)",[follow_name,username], function(error, message){
                    console.log("first time follow");
                    socket.emit('now u follow the guy');
                  })
                }
              }
          })
        }
      })
    }
    });

  socket.on('check unfollow', function(data){
      //check if not login in;
      if(data.self_name == ""){socket.emit('not login in')}
      else{
        console.log("if already login in ");
        var self_name = data.self_name;
        var follow_name = data.sbf;
        var count= 0;
      //  console.log("follow_name: "+data.sbf);
        db.query("SELECT * FROM Follow WHERE self = (?)", follow_name, function(error, message){

          for(var i = 0; i < message.length; i++){
            var fl = message[i].Follower;
            if(bcrypt.compareSync(fl, self_name)){
              console.log("already follow this guy");
              db.query("DELETE FROM Follow WHERE self = (?) AND Follower = (?)", [follow_name, fl], function(error, message){

              })
              socket.emit('already unfollow');
              count++;
          }
          //  socket.emit('check follow', "unfollow");
          }

          if(count == 0){
            console.log("haven't follow");
            socket.emit('not follow yet');

        }


      })
    }
    });

  socket.on('add like to ', function(data){
    var count = 0;
    if(data.self_name == ""){io.emit("not login in");}
    else{
          db.query("SELECT * FROM account", function(error, message){
            for(var i = 0; i < message.length; i++){
                if(bcrypt.compareSync(message[i].username, data.self_name)){
                  var username = message[i].username;
                  count += 1;
                    db.query("SELECT * FROM LikeCount WHERE userID = (?) AND msgID = (?)", [message[i].username, data.id], function(error, response){
                      console.log(response);
                      if(response.length == 0){
                        console.log("the Moment ID is : "+data.id+ "UserID: "+username);
                        db.query("UPDATE moment SET Likes = Likes+1 WHERE msgID = (?)", data.id, function(error, resp3){
                        });
                        db.query("SELECT * FROM moment WHERE msgID = (?)", data.id, function(error, resp2){
                          io.emit("like result", JSON.stringify(resp2));
                        });
                        db.query("INSERT INTO LikeCount (msgID, userID) VALUES (?, ?)", [data.id, username], function(error, resp){
                        });
                      }else {
                        socket.emit("already like");
                      }
          });
      }
    }
    if(count == 0){
    }
  });
}
  });


  socket.on('add dislike to ', function(data){
    if(data.self_name == "") {io.emit("not login in");}
    else{
        db.query("SELECT * FROM account", function(error, message){
          for(var i = 0; i < message.length; i++){
              if(bcrypt.compareSync(message[i].username, data.self_name)){
                var username = message[i].username;
                console.log("Username: "+username+" msgID: "+data.id);
                  db.query("SELECT * FROM LikeCount WHERE userID = (?) AND msgID = (?)", [message[i].username, data.id], function(error, response){
                          console.log(response);
                          if(response.length != 0){
                            console.log("already like");
                            db.query("UPDATE moment SET Likes = Likes-1 WHERE msgID = (?)", data.id, function(error, resp3){
                            });
                            db.query("SELECT * FROM moment WHERE msgID = (?)", data.id, function(error, resp2){
                              io.emit("like result", JSON.stringify(resp2));
                            });
                            db.query("DELETE FROM LikeCount WHERE userID = (?) AND msgID = (?)", [username, data.id], function(error, resp){
                            });
                          }else {
                            socket.emit('never like');
                          }
                  });
              }
            }
        });
    }
  });

  socket.on('comment to', function(data){
    io.emit('comment to', data);
    db.query("INSERT INTO comment (msg, msgID) VALUES (?, ?)", [data.comment, data.id],function(error, result){
    });

  });

  socket.on('account', function(data){
    db.query("SELECT * FROM account WHERE username = (?)", data.User, function(error, message){
      if(data.CPW.length >= 8){
      if(JSON.stringify(message).length == 2){
        var salt = bcrypt.genSalt();
        var hash = bcrypt.hashSync(data.CPW, 10);

        // db.query("INSERT INTO account (username, password) VALUES ('"+ data.User +"', '"+ hash +"')", function(error, result){
        db.query("INSERT INTO account (username, password) VALUES (?,?)",[data.User,hash], function(error, result){
        });
        io.emit('newuser',data.User);
        var inf = true;
        socket.emit('account', inf);

      }
      else{
        var inf = false;
        socket.emit('account', inf);

      }
    }
    else{
      var inf = 'Your password must contain at least 8 characters.';
      socket.emit('account', inf);
    }
    })



  });

  socket.on('login_form',function(data){
    // console.log(data);
    db.query("SELECT password FROM account WHERE username = (?)",data.email, function(error, result){

      if(JSON.stringify(result) =="[]" ){
        socket.emit("login_form","no_such_user");
      }
      else {
        var dataa = JSON.parse(JSON.stringify(result));
        console.log(dataa[0].password);
        console.log(data.password);
        if (bcrypt.compareSync(data.password, dataa[0].password)){
          //用username 来hash最后当做cookie
          var hash = bcrypt.hashSync(data.email, bcrypt.genSaltSync(10));
          var cook = "name="+hash;
          socket.emit("login_forms",cook);
        }
        else if (!bcrypt.compareSync(data.password, dataa[0].password)){
          socket.emit("login_forms","password_wrong_retry");
        }
      }

    });
  });

  socket.on('all pmoment',function (data){
    db.query("SELECT username FROM account", function(error, message){
      var dataa = JSON.parse(JSON.stringify(message));
      var name = "DNE"
      for(i=0;i<dataa.length;i++){
        if(bcrypt.compareSync(dataa[i].username, data)){
          name = dataa[i].username;
        }
      }
      console.log("结束了"+name);
      if(name!="DNE"){
        db.query("SELECT self FROM Follow where Follower = (?)",name, function(error, message){
          var dataaa = JSON.parse(JSON.stringify(message));
          console.log(dataaa);
          socket.emit('all puser', JSON.stringify(message));
        });
      }
      else{
        console.log("username doesnt exist");
        socket.emit('not login in',"1");
      }
    });
  });

  socket.on('all pcomment',function (data){
    db.query("SELECT username FROM account", function(error, message){
      var dataa = JSON.parse(JSON.stringify(message));
      var name = "DNE"
      for(i=0;i<dataa.length;i++){
        if(bcrypt.compareSync(dataa[i].username, data)){
          name = dataa[i].username;
        }
      }
      console.log("结束了"+name);
      if(name!="DNE"){
        db.query("SELECT Follower FROM Follow where self = (?)",name, function(error, message){
          var dataaa = JSON.parse(JSON.stringify(message));
          console.log(dataaa);
          socket.emit('all pfollower', JSON.stringify(message));
        });
      }
      else{
        console.log("username doesnt exist");
        socket.emit('not login in',"1");
      }
    });
  });


});
