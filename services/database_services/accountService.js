const db = require("../../database/database")
const jwt = require("jsonwebtoken")
const {hashPassword, comparePasswords} = require("../../utils/passwordUtil")
const registerAccount = async (acc) => {
    try {
        const emailFromDb = await new Promise((resolve, reject) => {
            db.get("SELECT email FROM account WHERE email = ?", [acc.email], (err, row) => {
                if (err) return reject({status: 500, message: `error occurred: ${err.message}`})
                resolve(row)
            })
        })
        if (emailFromDb) throw { status: 400, message: "User already exists" }; 

        const hashedPassword = await hashPassword(acc.password)
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO account (name, surname, patronymic, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)',
                [acc.name, acc.secondName, acc.patronymic, acc.email, hashedPassword, acc.phoneNumber], (err) => {
                    if (err) return reject({status: 500, message: `error occured while registration: ${err.message}`})
                    resolve()
                })
        })
        return {status: 201, message: "Registration Succeed"}
    } catch(err) {
        return err
    }
}

const loginAccount = async (email, password) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM account where email = ?", [email], async (err, account) => {
            if (err) return reject({status: 500, message: `error occurred: ${err.message && err.message}`})
            if (!account) return reject({status: 400, message: 'Invalid credentials'})
            console.log(await comparePasswords(password, account.password))
            const isMatch = await comparePasswords(password, account.password)
            if (!isMatch)
                return reject({status: 400, message: 'Invalid credentials'})
            const token = "Bearer " + jwt.sign({id: account.id}, process.env.SECRET_KEY, {expiresIn: '1h'})
            resolve({status: 200, token: token})
        })
    })
}

const getAccountInfoById = async (accountId) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT name, surname, patronymic, email FROM account where id=?", [accountId], (err, accountInfo)=>{
            if (err) return reject({status: 500, message: err})
            resolve({status: 200, data: accountInfo})
        })
    })
}

module.exports = {registerAccount ,loginAccount, getAccountInfoById}