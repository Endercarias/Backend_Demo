import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookeParser from "cookie-parser";
import router from "./routes/importadora.routes";

const app = express()

//settings
app.set('port', 4020)


//middelware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use(cookeParser())

app.use('/api/importadora', router)

export default app