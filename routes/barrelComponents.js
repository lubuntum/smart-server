const express = require("express")
const router = express.Router()
const getBarrelComponents = require("../services/database_services/componentService")
router.get("/components", async (req, res) => {
    try {
        const result = await getBarrelComponents()
        return res.status(result.status).json(result.data)
    } catch(err) {
        return res.status(err.status || 500).json(err)
    }
    
})

module.exports = router