const db = require("../../database/database")

const getBarrelComponents = async () => {
    try {
        const material = await getComponentsByName("material")
        const form = await getComponentsByName("form")
        const ovenType = await getComponentsByName("oven_type")
        const color = await getComponentsByName("color")
        const ovenAddition = await getComponentsByName("oven_addition")
        const door = await getComponentsByName("door")
        const tank = await getComponentsByName("tank")
        const window = await getComponentsByName("window")
        const base = await getComponentsByName("base")
        const area = await getComponentsByName("area")
        const tensionRing = await getComponentsByName("tension_ring")
        const ovenPlacement = await getComponentsByName("oven_placement")
        return {status: 200, data: {material, form, ovenType, color, ovenAddition, door, tank, window, base, area, tensionRing, ovenPlacement}}
    } catch(err) {
        return err
    }
}

const getComponentsByName = (componentsName) => {
    return new Promise((resolve, reject) => {
        console.log(`SELECT * FROM ${componentsName}`)
        db.all(`SELECT * FROM ${componentsName}`, (err, row) => {
            if (err) return reject({status: 500, message: `error occured white getting ${componentsName} - ${err}`})
            resolve(row)
        })
    })
}


module.exports = getBarrelComponents