import { config } from "dotenv"

config()

export default {
    HOST: process.env.HOST || "",
    DATABASE: process.env.DATABASE || "",
    USER: process.env.USER || "",
    PASSWORD: process.env.PASSWORD || "",
    PORT: process.env.PORT || ""
}
