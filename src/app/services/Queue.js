const kue = require("kue");
// const Sentry = require("@sentry/node");
const redisConfig = require("../../config/redis");
const jobs = require("../jobs");

const Queue = kue.createQueue({ redis: redisConfig });

Queue.process(jobs.ActiveAccountMail.key, jobs.ActiveAccountMail.handle);

Queue.on("error", console.log);

module.exports = Queue;
