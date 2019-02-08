import server from "./server";

server.listen(process.env.PORT || 4000, () =>
    console.log("Running in port " + process.env.PORT || 4000)
);
