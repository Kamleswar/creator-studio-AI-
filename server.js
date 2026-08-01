const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {

  // Home page
  if (req.url === "/" || req.url === "/index.html") {
    const file = path.join(__dirname, "index.html");

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("index.html nahi mila");
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });

      res.end(data);
    });

    return;
  }

  // CSS
  if (req.url === "/style.css") {
    const file = path.join(__dirname, "style.css");

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("CSS nahi mila");
      }

      res.writeHead(200, {
        "Content-Type": "text/css"
      });

      res.end(data);
    });

    return;
  }

  // JavaScript
  if (req.url === "/script.js") {
    const file = path.join(__dirname, "script.js");

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("JavaScript nahi mila");
      }

      res.writeHead(200, {
        "Content-Type": "application/javascript"
      });

      res.end(data);
    });

    return;
  }

  // 404
  res.writeHead(404, {
    "Content-Type": "text/plain"
  });

  res.end("Page not found");
});

server.listen(PORT, () => {
  console.log(`Creator Studio AI running on http://localhost:${PORT}`);
});