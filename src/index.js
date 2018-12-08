const server = require("./server");

server.listen(4000 || process.env.PORT, () =>
    console.log("Running in port " + 4000)
);
