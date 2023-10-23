const  express = require( "express");
const  morgan = require( "morgan");
const  cors = require( "cors");
const  cookeParser = require( "cookie-parser");
const  router = require( "./routes/importadora.routes");
const  multer = require( "multer")
const  path = require( "path")
const bodyParse = require("body-parser")

const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

//settings
app.set('port', 4020)


//middelware
app.use(bodyParse.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use(cookeParser())

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getMilliseconds() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).array('image'));

app.use('/public',express.static(path.join(__dirname, 'uploads')));

app.use('/api/importadora', router)



module.exports = app