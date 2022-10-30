import http from "http";
import staticHandler from "./handlers/static-handler";
import apiHandler from "./handlers/api-handler";
import pageHandler from "./handlers/page-handler";

const port = 7000;
const apiPath = "/api/v1";
const staticPath = "/static";

const server = http.createServer((req, res) => {
  const url = req.url;
  let handler;

  if (url.startsWith(apiPath)) handler = apiHandler;
  else if (url.startsWith(staticPath)) handler = staticHandler;
  else handler = pageHandler;

  handler(req, res);
});

server.on("clientError", err => console.log("Client error", err));
server.on("error", err => console.log("Exited with error", err));
server.listen(port, () => console.log("Serving on port", port));
