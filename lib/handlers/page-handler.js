import manifest from "../../dist/static.manifest.json";
import App from "../../src/App";
import Document from "../components/document";
import { streamJSX } from "../stream";

function pageHandler(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });

  const { js, css } = manifest;

  const jsx = (
    <Document title="React App" js={js} css={css}>
      <App />
    </Document>
  );

  streamJSX(jsx)
    .error(() => {
      res.statusCode = 500;
      res.end();
    })
    .pipe(res);
}

export default pageHandler;
