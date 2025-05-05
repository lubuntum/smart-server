const express = require("express")
const router = express.Router()
const {loginAccount, registerAccount} = require("../services/database_services/accountService")

router.post('/login', (req, res) => {
    const {email, password} = req.body
    loginAccount(email, password).then(result => {
        res.status(result.status).json(result)
    }).catch(err=> {
        res.status(err.status || 500).json(err)
    })
})

router.post('/register', async (req, res) => {
    try {
        const result = await registerAccount(req.body)
        res.status(result.status).json(result)
    } catch(err) {
        res.status(err.status || 500).json(err)
    }
})
module.exports = router