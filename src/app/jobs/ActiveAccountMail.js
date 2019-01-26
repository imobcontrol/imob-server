const Mail = require("../services/Mail");

class ActiveAccountMail {
    get key() {
        return "AccountActive";
    }

    async handle(job, done) {
        const { account } = job.data;

        await Mail.sendMail({
            from: '"Imob" <imob@gmail.com>',
            to: account.email,
            subject: `Ativação da sua nova conta Imob`,
            template: "activeAccount",
            context: { account }
        });

        return done();
    }
}

module.exports = new ActiveAccountMail();
