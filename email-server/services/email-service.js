"use strict";
const md5 = require('md5');
const nodemailer = require("nodemailer");
const MongoService = require("./mongo-service")
const messageTemplate = require('../templates/email-text/email-body')

class EmailService {

    constructor() {
        this.transporter = null;
    }

    async setupMailer() {
        const testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
      
    }

    prepareEmails({to, from, subject}) {
        if( Array.isArray(to)) {
            return to.map( recipient => { 
                const emailId = md5(new Date().toString() + to)

                return {
                    to: recipient.email,
                    from: from,
                    subject: subject,
                    text: "", //text.replace("{name}", recipient.name),
                    html: messageTemplate.replace("{name}", recipient.name).replace("{link}", process.env.EMAIL_LINK+emailId),
                    emailId: emailId,
                    clicked: false
            }});
        } else {
            const emailId = md5(new Date().toString() + to)

            return [{
                to: to.email,
                from: from,
                subject: subject,
                text: "",
                html: messageTemplate.replace("{name}", to.name).replace("{link}", process.env.EMAIL_LINK+emailId),
                emailId: emailId,
                clicked: false
            }]
        }
    }

    async sendEmail( email ) {
        try {
            const emailId = MongoService.recordEmail(email);
            email.text = email.text.replace("{emailId}", emailId)
            let info = await this.transporter.sendMail( email );
            return info;
        } catch(e) {
            console.log(`EmailService failure: ${e}`);
        }
    }
}

module.exports = new EmailService();