require('dotenv').config()
const { MONGO_URL, PORT, PASSWORD, SALT } = process.env;

module.exports = {
    mongo_url : MONGO_URL,
    port : PORT,
    paswword : PASSWORD,
    salt : SALT
}