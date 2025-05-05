const express = require("express")
const router = express.Router()
const authentificateToken = require("../middleware/authentificateToken")
const {createOrder, getOrdersByAccountID, getOrdersByAccountIdWithBarrels, getOrders} = require("../services/database_services/orderService")
const {createBarrelSauna} = require("../services/database_services/barrelSaunaService")
/*
//bb router deprecated
router.post("/create-order", authentificateToken, async (req, res) => {
    try {
        barrelSaunaId = await createBarrelSauna(req.body.barrelSauna)
        const result = await createOrder(barrelSaunaId, req.jwtData.id)
        res.status(result.status).json(result)
    } catch(err) {
        res.status(err.status || 500).json(err)
    }
    
})
*/

router.get("/orders-by-account", authentificateToken, async (req, res) => {
    try {
        const result = await getOrdersByAccountIdWithBarrels(req.jwtData.id)
        res.status(200).json(result)
    } catch(err) {
        res.status(err.status || 500).json(err)
    }
})
///smart orders
router.get("", async(req, res) => {
    try {
        const result = await getOrders()
        res.status(200).json(result)
    } catch(err) {
        res.status(err.status || 500).json(err)
    }
})
router.post("/create-order", async(req, res) => {
    try{
        const pickedItems = req.body.pickedItems
        const result = await createOrder(pickedItems)
        res.status(200).json(result)
    } catch(err) {
        res.status(err.status || 500).json(err)
    }
    
})
module.exports = router