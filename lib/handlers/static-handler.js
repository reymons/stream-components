import path from "path";
import { streamStatic } from "../stream";

const dist = path.resolve(__dirname, "../../dist");

const mimeType = {
  ".js": "application/javascript",
  ".css": "text/css"
};

function staticHandler(req, res) {
  const ext = path.extname(req.url);
  const type = mimeType[ext];

  if (!type) {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.writeHead(200, {
    "Content-Type": type,
    "Content-Encoding": "gzip",
    Vary: "Accept-Encoding"
  });

  const filepath = path.join(dist, req.url);

  streamStatic(filepath)
    .error(() => {
      res.statusCode = 500;
      res.end();
    })
    .pipe(res);
}

export default staticHandler;
