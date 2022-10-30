import ReactDOM from "react-dom/server";
import fs from "fs";
import zlib from "zlib";

function wrapError(stream) {
  let errCallback = () => {};
  const error = callback => {
    errCallback = callback;
    return stream;
  };
  return {
    stream: Object.assign({}, stream, { error }),
    errCallback
  };
}

export function streamJSX(jsx) {
  let errCallback;

  const stream = ReactDOM.renderToPipeableStream(jsx, {
    onError: () => errCallback?.()
  });

  const error = function (callback) {
    errCallback = callback;
    return this;
  };

  return Object.assign({}, stream, { error });
}

export function streamStatic(filepath) {
  const rs = fs.createReadStream(filepath);
  const gs = zlib.createGzip();
  const { errCallback, stream } = wrapError(rs.pipe(gs));
  rs.on("error", errCallback);
  gs.on("error", errCallback);
  return stream;
}
