//In powershell create env variables (TEST ONLY)
[System.Environment]::SetEnvironmentVariable("PORT", "8090", "User")
[System.Environment]::SetEnvironmentVariable("HOSTNAME", "0.0.0.0", "User")
[System.Environment]::SetEnvironmentVariable("SECRET_KEY", "anySecretKey", "User")
//start the server
node app.js