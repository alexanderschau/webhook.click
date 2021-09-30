const http = require("http");
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
    }
    // send
    const sendExp = /^\/send\/([^\/?]+)$/;
    const sendMatch = pathname.match(sendExp);
    if (sendMatch) {
      wait.emit(sendMatch[1]);
    }
    res.write("ok");
    res.end();
  })
  .listen(8080);
