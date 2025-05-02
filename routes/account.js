const express = require("express")
const router = express.Router()
const { getAccountInfoById } = require("../services/database_services/accountService")
const authentificateToken = require("../middleware/authentificateToken")
router.get('/account-info', authentificateToken, (req, res) => {
    if (!req.userId) res.status(403)
    getAccountInfoById(req.jwtData.id)
        .then((result) =>{
            res.status(result.status).json(result)
        }).catch(err => {
            res.status(err.status || 500).json(err)
        })
})

module.exports = router