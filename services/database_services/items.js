const db = require("../../database/database")
const getItems = async (filters) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT i.*, c.name as category, b.name as brand 
                   FROM item i 
                   LEFT JOIN category c ON i.category_id = c.id 
                   LEFT JOIN brand b ON i.brand_id = b.id`
        const conditions = []
        const params = []
        if (filters.price) {
            conditions.push('i.price <= ?')
            params.push(filters.price)
        }
        if (filters.name) {
            conditions.push('i.name LIKE ?')
            params.push(`%${filters.name}%`)
        }
        if (filters.brandName) {
            conditions.push('b.name = ?')
            params.push(filters.brandName)
        }
        if (filters.categoryName) {
            conditions.push('c.name = ?')
            params.push(filters.categoryName)
        }
        if (conditions.length > 0)
            sql += ' WHERE ' + conditions.join(' AND ')
        db.all(sql, params, (err, rows) => {
            if(err) return reject({status: 500, message:err})
            resolve(rows)
        })
    })
}
const getItemsByCategory = async (categoryName) => {
    return new Promise((resolve, reject) => {
        db.run(`SELECT i.*, c.name as category, b.name as brand FROM item i 
            left join category c on i.category_id = c.id 
            left join brand b on i.brand_id = b.id where c.name = ?`, [categoryName], (err, rows) => {
                if(err) return reject({status: 500, message:err})
                    resolve(row)
            } )
    })
}
module.exports = {getItems, getItemsByCategory}