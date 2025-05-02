const db = require("../../database/database")

const createBarrelSauna = async (barrel) => {
    return await new Promise((resolve, reject) => {
        const sql = "INSERT INTO barrel_sauna " +
            "(material_id, form_id, oven_type_id, color_id, oven_addition_id, " +
            "door_id, tank_id, window_id, base_id, total_price, area_id, tension_ring_id, oven_placement_id) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
                barrel.material_id,
                barrel.form_id,
                barrel.oven_type_id,
                barrel.color_id,
                barrel.oven_addition_id,
                barrel.door_id,
                barrel.tank_id,
                barrel.window_id,
                barrel.base_id,
                barrel.total_price,
                barrel.area_id,
                barrel.tension_ring_id,
                barrel.oven_placement_id
            ];
        db.run(sql, values, function(err) {
                if (err) return reject({status: 500, message: err})
                console.log(this.lastID)
                resolve(this.lastID)
        })
    })
}

module.exports = {createBarrelSauna}