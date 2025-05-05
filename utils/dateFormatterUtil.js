const {format} = require("date-fns")
const getCurrentLocalDateTime = () => {
    const date = new Date()
    return format(date, "dd-MM-yyyy HH:mm:ss")
}

module.exports = getCurrentLocalDateTime