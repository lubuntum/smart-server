//docker run -d -p 3000:3000 -e HOSTNAME=%HOSTNAME% -e PORT=%PORT% my-node-app
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()

app.use(cors())
app.use(bodyParser.json())

//static folder
app.use(express.static(path.join(__dirname, 'public')))
//middlewares
const authentificateToken = require("./middleware/authentificateToken")

//routes reg
const authRoutes = require('./routes/auth')
app.use("/auth", authRoutes)
const barrelComponentsRoutes = require('./routes/barrelComponents')
app.use("/barrel", barrelComponentsRoutes)
const accountRoutes = require('./routes/account')
app.use("/account", accountRoutes)
const orderRoutes = require('./routes/order')
app.use("/order", orderRoutes)
app.get("/test-protected", authentificateToken, (req, res) => {
    res.status(200).json({message: "Accessed"})
})
const itemRoutes = require('./routes/items')
app.use("/items", itemRoutes)

app.listen(process.env.PORT, process.env.HOSTNAME,  () => {
    console.info(`server started at ${process.env.HOSTNAME}:${process.env.PORT}`)
})