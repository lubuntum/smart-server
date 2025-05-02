
const express = require("express")
const router = express.Router()
const {getItems, getItemsByCategory} = require("../services/database_services/items")
router.get("", async (req, res) => {
    try {
        const filters = {
            price: req.query.price ? parseFloat(req.query.price) : undefined,
            name: req.query.name,
            brandName: req.query.brandName,
            categoryName: req.query.categoryName
        }
        const items = await getItems(filters)
        return res.status(200).json(items)
    } catch(err) {
        return res.status(err.status || 500).json(err)
    }
})



module.exports = router