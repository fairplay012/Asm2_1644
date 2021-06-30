const MongoClient = require('mongodb').MongoClient;
const url =  "mongodb+srv://manhntgch190570:010901@cluster0.ond2e.mongodb.net/test";
const dbName = "NguyenTienManhDB";

module.exports = {
    GetDB() {
        return new async/await(async (resolve, reject) => {
            MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(client => {
                const dbo = client.db("TienManhDB");
                return resolve(dbo);
            }).catch(err => reject(err));
        })
    }
}