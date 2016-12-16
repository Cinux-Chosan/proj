let http = require('http'),
  fs = require('fs');


http.createServer((req, res) => {
  if (req.url == '/') {
    fs.readFile('./titles.json', (err, data) => {
      if (err) {
        console.error(err);
        res.end('Server Error');
      } else {
        let titles = JSON.parse(data.toString());
        fs.readFile('./template.html', (err, data) => {
          if (err) {
            console.error(err);
            res.end('Server Error');
          } else {
            let tmpl = data.toString(),
              html = tmpl.replace('%', titles.join('</li><li>'));
              res.writeHead(200, { "Content-Type": 'text/html' });
              res.end(html);
          }
        });
      }
    })
  }
}).listen(8000);
