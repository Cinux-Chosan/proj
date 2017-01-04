const connect = require('connect');
app = connect();


app.listen(3000);

app.use('/test', (req, res, next) => {
  console.log(req.url);
  res.end('xxx');
  next();
});
