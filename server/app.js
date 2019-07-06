const express = require('express')
const app = express()
const path = require('path')

// app.use(express.static('client'))

// app.get('/', function(req, res){
//   console.log("Test123");
//   // res.send('<h1>Hello world</h1>');
//   res.render('client/index');
// });

app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  // res.sendFile('client/index.html');
  // path.resolve(__dirname, '.../public')
  res.sendFile('index.html', { root: path.resolve('./client/') });
});


const server = app.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
