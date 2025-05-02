const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database/smart_db.sqlite3", (err) => {
    if (err) console.error(err.message)
    else console.log("Connection succeed")
})

module.exports = db