const { MongoClient } = require('mongodb');
require('dotenv').config();

class MongoService {

    constructor() {
        this.connectUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
        this.mongoClient = new MongoClient(this.connectUri);
    }

    async getEmails() {
        try {
            await this.mongoClient.connect();
            const db = this.mongoClient.db("cymulate");
            const emailCollection = db.collection("emails");
            const allEmails = await emailCollection.find().toArray();
            return allEmails;
        } catch(e) {
            console.log(`getEmails() error: ${e}`)
        } finally {
            await this.mongoClient.close();
        }
    }
}

module.exports = new MongoService();