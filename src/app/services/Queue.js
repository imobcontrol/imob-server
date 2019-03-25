import kue from "kue";
// import Sentry from "@sentry/node";
import { uri } from "../../config/redis";
import * as jobs from "../jobs";

const Queue = kue.createQueue({ redis: uri });

Queue.process(jobs.AccountActiveMail.key, jobs.AccountActiveMail.handle);

Queue.process(jobs.AccountRecoveryMail.key, jobs.AccountRecoveryMail.handle);

Queue.on("error", console.log);

export default Queue;
