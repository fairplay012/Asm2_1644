const MongoClient = require('mongodb').MongoClient;
const url =  "mongodb+srv://manhntgch190570:010901@cluster0.ond2e.mongodb.net/test";
const dbName = "NguyenTienManhDB";

module.exports = {
    async GetDB() {
        let client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const dbo = client.db("TienManhDB");
        return dbo;
    }
}