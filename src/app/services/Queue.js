import kue from "kue";
// import Sentry from "@sentry/node";
import redisConfig from "../../config/redis";
import * as jobs from "../jobs";

const Queue = kue.createQueue({ redis: redisConfig });

Queue.process(jobs.ActiveAccountMail.key, jobs.ActiveAccountMail.handle);

Queue.on("error", console.log);

export default Queue;
