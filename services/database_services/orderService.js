const db = require("../../database/database")
const getCurrentLocalDateTime = require("../../utils/dateFormatterUtil")
/*
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
*/
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
///smart servive for order

const getOrders = async () => {
    return await new Promise((resolve, reject) => {
        db.all("SELECT c_o.*, s.name as status_name, i.name as item_name, i.price, i.articul, i.id as item_id FROM client_order c_o LEFT JOIN status s on c_o.status_id = s.id LEFT JOIN order_item o_i on c_o.id = o_i.order_id LEFT JOIN item i on o_i.item_id = i.id", (err, data) => {
            if (err) return reject({status: 500, message: err})
            const orders = {}
            data.forEach(row => {
                if (!orders[row.id])
                    orders[row.id] = {
                        id: row.id,
                        createdAt: row.created_at,
                        status: row.status_name,
                        items: []
                    }
                if (row.item_id) {
                    orders[row.id].items.push({
                        id: row.item_id,
                        name: row.item_name,
                        price: row.price,
                        articul: row.articul
                    })
                }
            })
            resolve(Object.values(orders))
        })
    })
}
const createOrder = async (pickedItems) => {
    const statusId = await new Promise((resolve, reject) => {
        db.get("SELECT id FROM status WHERE status.name = ?", "Создан", (err, data) => {
            if (err) return reject({status: 500, message: err})
            resolve(data.id)
        })
    })
    console.log(statusId)
    const orderId = await new Promise((resolve, reject) => {
        db.run("INSERT INTO client_order (status_id, created_at) VALUES (?, ?)", [statusId, getCurrentLocalDateTime()], function (err) {
            if (err) return reject({status: 500, message: err})   
            resolve(this.lastID)
        })
    })
    await Promise.all(pickedItems.map(item => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO order_item (order_id, item_id) VALUES (?, ?)", [orderId, item.id], (err) => {
                if (err) reject({status: 500, message: err})
                resolve()
            })
        })
    }))
    return {status: 200, message: "Order created successfully"}
}
module.exports = {getOrders, createOrder, getOrdersByAccountId, getOrdersByAccountIdWithBarrels}