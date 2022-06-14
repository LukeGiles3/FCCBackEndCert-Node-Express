let express = require('express');
let app = express();
let bodyParser = require('body-parser')

console.log("Hello World");

// app.get("/", function(req, res) {
//   res.send('Hello Express')
// });

app.use("/", function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html")
});

app.get("/json", function(req,res) {
  if(process.env.MESSAGE_STYLE === "uppercase") {
      res.send({"message": "HELLO JSON"})
  } else {
    res.send({"message": "Hello json"})
  }
})

app.get("/now", function middleware(req, res, next) {
  req.time = new Date().toString()
  next()
}, function (req, res) {
  res.send({"time": req.time})
})

app.get("/:word/echo", function(req, res) {
  res.send({"echo": req.params.word})
})

app.get("/name", function(req, res) {
  res.send({"name": req.query.first + ' ' + req.query.last})
})

app.post('/name', function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
})

 module.exports = app;