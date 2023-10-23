const  { config } = require( "dotenv")

config()

module.exports = {
    HOST: process.env.HOST || "",
    DATABASE: process.env.DATABASE || "",
    USER: process.env.USER || "",
    PASSWORD: process.env.PASSWORD || "",
    PORT: process.env.PORT || ""
}
