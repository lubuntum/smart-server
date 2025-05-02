const db = require("../../database/database")

const createOrder = async (barrelSaunaId, accountId) => {
    //console.log(order.barrelSaunaId, new Date().toISOString())
    const statusId = await new Promise((resolve, reject) => {
        const sql = "SELECT id FROM `status` WHERE status_name = ?"
        db.get(sql, "Не оплачено", (err, row) => {
            if (err) reject({status: 500, message: err})
            resolve(row.id)
        })
    })
    try {
        return await new Promise((resolve, reject) => {
            db.run("INSERT INTO `order` (barrel_sauna_id, account_id, created_at, count, status_id) VALUES (?, ?, ?, ?, ?)", 
                [barrelSaunaId, accountId, new Date().toISOString(), 1, statusId], (err) => {
                    if (err) return reject({status: 500, message: err})
                    resolve({status: 201, message: "created"})
                })
        })
    } catch(err) {
        return err
    }
}

const getOrdersByAccountId = async (accountId) => {
    try{
        return await new Promise((resolve, reject)=>{
            db.all("SELECT * FROM `order` where account_id=?",[accountId], (err, data) => {
                if (err) return reject({status: 500, message: err})
                resolve(data)
            })
        })
    } catch(err) {
        return err
    }
}
const getOrdersByAccountIdWithBarrels = async (accountId) => {
    const ordersWithBarrels = await new Promise((resolve, reject) => {
        db.all("SELECT o.*, b.* FROM `order` o LEFT JOIN barrel_sauna b ON o.barrel_sauna_id = b.id where o.account_id=?",[accountId], (err, data) => {
            if (err) return reject({status: 500, message: err})
            resolve(data)
        })
    })
    return ordersWithBarrels

}

module.exports = {createOrder, getOrdersByAccountId, getOrdersByAccountIdWithBarrels}