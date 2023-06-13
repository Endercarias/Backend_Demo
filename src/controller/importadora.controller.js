const jwt = require("jsonwebtoken")
import { promisify } from 'util';
const bcryptjs = require("bcryptjs")
import { getConnection } from "../database/importadora.database"

const getRaiz = async (req, res) => {
    res.send("estamos en la raiz")
}

const readUsers = async (req, res) => {
    try {
        const connection = await getConnection()
        const query = await connection.query("select * from usuario;")

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const readUser = async (req, res) => {
    try {
        const email  = req.params.idUser

        const connection = await getConnection()
        const query = await connection.query("select * from usuario WHERE Email = ?;", [email])

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const readUser1 = async (req, res) => {
    try {
        const email  = req.params.idUser

        const connection = await getConnection()
        const query = await connection.query("select * from usuario WHERE Email = ?;", [email])

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const login = async (req, res) => {
    try {
        const { email, contrasena} = req.body

        const connection = await getConnection()
        const query = await connection.query("select * from usuario WHERE Email = ?;", [email], 
        async (error, result) => {
            if (result.length == 0 || ! (await bcryptjs.compare(contrasena, result[0].contrasena))) {
                res.status(500).json({Message: "Contraseña Incorrecta"})
            }else{
                //inicio de sesion ok
                const id = result[0].Email
                const token = jwt.sign({id:id}, process.env.JWT_SECRET, {
                    expiresIn:process.env.JWT_TIME_EXPIRES
                })
                //TOKEN sin fecha de expiracion:
                //const token = jwt.sign({id:id}, process.env.JWT_SECRET)
                console.log("token generado: ", token, " de usuario: ", id)

                const cookiesOptions = {
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
                    httpOnly: true
                }
                res.cookie('JWT', token, cookiesOptions)
                res.send({
                    Message: "Ingreso Exitosamente!",
                    token: token
                })
            }
        } )

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

/**
 * este metodo lo que hace es verificar la autenticacion de los usuarios
 * @param {email, nombre, apellido, contrasena, idRol} req Datos recibidos de la peticion
 * @param {message} res Muestra el usuario ingresado a la DB
 */
const isAuthenticated = async (req, res, next) => {
    console.log(req.headers.jwt)
    if (req.headers.jwt) {
        try {
            const decodificated = await promisify(jwt.verify)(req.headers.jwt, process.env.JWT_SECRET)
            const connection = await getConnection()
            const query = await connection.query("select * from usuario WHERE Email = ?;", [decodificated.id], 
            (error, result) => {
                if(!result[0]){return next()}
                req.Email = result[0]
                return next()
            })
        } catch (error) {
            res.status(500).json({Message: error.message})
            return next()
        }
    }else{
        res.status(404).json({Message: "Falta Logearse", RedirectUrl: "/api/importadora/login"})
    }
}

/**
 * LOGOUT
 * @param {} req 
 * @param {} res redirect
 */
const logout = async (req, res) => {

    res.removeHeader('JWT')
    return res.redirect('/api/importadora/')
}


/**
 * este metodo lo que hace es registrar usuarios
 * @param {email, nombre, apellido, contrasena, idRol} req Datos recibidos de la peticion
 * @param {message} res Muestra el usuario ingresado a la DB
 */
const registro = async (req, res) => {
    try {

        const { email, nombre, apellido, contrasena, idRol } = req.body
        let passHash = await bcryptjs.hash(contrasena, 10)
        const params = [email, nombre, apellido, passHash, idRol]

        const connection = await getConnection()
        const query = await connection.query("insert into usuario(Email,nombre,apellido,contrasena,idRol) values(?,?,?,?,?);", params)

        res.json({message: "Usuario: " +email+ " ingresado exitosamente"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}


const createUser = async (req, res) => {
    try {

        const { email, nombre, apellido, contrasena, idRol } = req.body
        const params = [email, nombre, apellido, contrasena, idRol]

        const connection = await getConnection()
        const query = await connection.query("insert into usuario(Email,nombre,apellido,contrasena,idRol) values(?,?,?,?,?);", params)

        res.json({message: "Usuario: " +email+ " ingresado exitosamente"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {

        const { email } = req.body
        const params = [email]

        const connection = await getConnection()
        const query = await connection.query("DELETE FROM usuario WHERE Email = ?;", params)

        res.json({message: "Usuario: " +email+ " Eliminado del registro"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const updateUser = async (req, res) => {
    try {

        const { contrasena, nombre, apellido, idRol, email } = req.body
        const params = [contrasena, nombre, apellido, idRol, email ]

        const connection = await getConnection()
        const query = await connection.query("UPDATE usuario SET contrasena=?, nombre=?, apellido=?, idRol=? WHERE Email=?;", params)

        res.json({message: "Usuario: " +email+ " Actualizado su perfil exitosamente"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

// -- carros --
const readCars = async (req, res) => {
    try {
        const connection = await getConnection()
        const query = await connection.query("select * from carro;")

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const readCar = async (req, res) => {
    try {
        const idCarro  = req.params.idCar

        const connection = await getConnection()
        const query = await connection.query("select * from carro WHERE idCarro = ?;", [idCarro])

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const createCar = async (req, res) => {
    try {

        const { marca, linea, tipoVehiculo, modelo, descripccion, foto, precio, vendido } = req.body
        const params = [ marca, linea, tipoVehiculo, modelo, descripccion, foto, precio, vendido ]

        const connection = await getConnection()
        const query = await connection.query("insert into carro(marca,linea,tipoVehiculo,modelo,descripccion,foto,precio,vendido) values(?,?,?,?,?,?,?,?);", params)

        res.json({message: "Carro: " +marca+" "+linea+ " ingresado exitosamente"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const deleteCar = async (req, res) => {
    try {

        const { idCar } = req.body
        const params = [idCar]

        const connection = await getConnection()
        const query = await connection.query("DELETE FROM carro WHERE idCarro = ?;", params)

        res.json({message: "Carro con id: " +idCar+ " Eliminado del registro de carros"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const updateCar = async (req, res) => {
    try {

        const { marca, linea, tipoVehiculo, modelo, descripccion, foto, precio, vendido, idCarro } = req.body
        const params = [ marca, linea, tipoVehiculo, modelo, descripccion, foto, precio, vendido, idCarro ]

        const connection = await getConnection()
        const query = await connection.query("UPDATE carro SET marca=?, linea=?, tipoVehiculo=?, modelo=?, descripccion=?, foto=?, precio=?, vendido=? WHERE idCarro=?;", params)

        res.json({message: "Carro: " +marca+" "+linea+ " actualizado exitosamente"})
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

// -- COTIZACIONES --
const createCotizacion = async (req, res) => {
    try {

        const fechaCotizacion = formatDate(new Date());
        const currentDateObj = new Date();
        currentDateObj.setDate(currentDateObj.getDate() + 10);
        const validesCotizacion = formatDate(currentDateObj);

        console.log("- " ,fechaCotizacion, "-f " ,validesCotizacion )

        const { email, nombre, apellido, telefono, idCarro } = req.body
        console.log(idCarro)
        const params = [fechaCotizacion, validesCotizacion, parseInt(idCarro), email, nombre, apellido, telefono]

        const connection = await getConnection()
        const query = await connection.query("insert into cotizaciones(fechaCotizacion,validesCotizacion,idCarro,email,nombre,apellido,telefono) values(?,?,?,?,?,?,?);", params)

        console.log("parametros: ", params, "- " ,fechaCotizacion, "-f " ,validesCotizacion )

        res.json({message: "Usuario: " +email+ " cotizacion creada exitosamente"})
        
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

const readCotizacion = async (req, res) => {
    try {
        const connection = await getConnection()
        const {idCarro } = req.params
        const query = await connection.query(`select * from cotizaciones where cotizaciones.idCarro = ${idCarro} ; `)

        res.send(query)
    } catch (error) {
        res.status(500).json({Message: error.message})
    }
}

// DATE
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const methods = {
    getRaiz,
    createUser,
    readUser,
    readUsers,
    login,
    registro,
    updateUser,
    deleteUser,
    readCars,
    readCar,
    createCar,
    updateCar,
    deleteCar,
    isAuthenticated,
    logout,
    createCotizacion,
    readCotizacion,
}