const server = require("./server");

server.listen(process.env.PORT || 8080, () =>
    console.log("Running in port " + process.env.PORT)
);
