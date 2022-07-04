const { MongoClient } = require('mongodb');
require('dotenv').config();

class MongoService {

    constructor() {
        this.connectUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
        this.mongoClient = new MongoClient(this.connectUri);
    }

    async recordEmail(email) {
        let output = "";
        try {
            await this.mongoClient.connect();
            const db = this.mongoClient.db("cymulate");
            const emailCollection = db.collection("emails");
            const status = await emailCollection.insertOne(email);
            console.log(status);
            output = email.emailId
        } catch (e) {
            console.log(`MongoService error - recordEmail(): ${e}`);
            output = "";
        } finally {
            await this.mongoClient.close();
        }
        return output;
    }

    async logClick(emailId) {
        console.log(`logClick() email: ${emailId}`);
        try {
            await this.mongoClient.connect();
            const db = this.mongoClient.db("cymulate");
            const emailCollection = db.collection("emails");

            const filter = { emailId: emailId };
            const update = { $set: { clicked: true } };
            const noUpsert = { upsert: false }

            const status = await emailCollection.updateOne(filter, update, noUpsert);
            console.log(`LogClick status: ${JSON.stringify(status)}`)
        } catch (e) {
            console.log(`LogClick() error: ${e}`)
        } finally {
            await this.mongoClient.close();
        }

    }
}

module.exports = new MongoService();