import Mail from "../services/Mail";

class AccountRecoveryMail {
    get key() {
        return "AccountRecovery";
    }

    async handle(job, done) {
        const { account } = job.data;

        const response = await Mail.sendMail({
            from: '"Imob" <imob@gmail.com>',
            to: account.email,
            subject: `Recuperação de senha - Imob`,
            template: "recoveryAccount",
            context: { account }
        });

        console.log(response);

        return done();
    }
}

export default new AccountRecoveryMail();
