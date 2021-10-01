const http = require("http");
const https = require("https");
const events = require("events");

const wait = new events.EventEmitter();

http
  .createServer(async (req, res) => {
    const pathname = req.url;
    // receive
    const receiveExp = /^\/receive\/([^\/?]+)$/;
    const receiveMatch = pathname.match(receiveExp);
    if (receiveMatch) {
      await new Promise((resolve) => {
        wait.on(receiveMatch[1], () => {
          resolve("");
        });
      });
      res.write("ok");
      res.end();
      return;
    }
    // send
    const sendExp = /^\/send\/([^\/?]+)$/;
    const sendMatch = pathname.match(sendExp);
    if (sendMatch) {
      wait.emit(sendMatch[1]);
      res.write("ok");
      res.end();
      return;
    }
    handleProxy(req, res);
  })
  .listen(8080);

const handleProxy = (client_req, client_res) => {
  var options = {
    hostname: "webhook.pages.dev",
    port: 443,
    path: client_req.url,
    method: client_req.method,
    //headers: client_req.headers,
  };
  var proxy = https.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers);
    res.pipe(client_res, {
      end: true,
    });
  });

  client_req.pipe(proxy, {
    end: true,
  });
};
