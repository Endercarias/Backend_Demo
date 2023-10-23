const { Router } = require( "express")
const controller  = require( "../controller/importadora.controller")
const imageController = require("../controller/image.controller")

const router = Router()

router.get("/", controller.getRaiz)

// usuarios
router.get("/user", controller.readUsers)
router.get("/user/:idUser", controller.readUser)
router.post("/setUser", controller.createUser)
router.delete("/deleteUser", controller.deleteUser)
router.put("/updateUser", controller.updateUser)

router.post("/login", controller.login)
router.post("/registro", controller.registro)
router.get("/logout", controller.logout)

// carros 
router.get("/cars", controller.readCars)
router.get("/car/:idCar", controller.readCar)
router.post("/setCar", controller.isAuthenticated, controller.createCar)
router.delete("/deleteCar", controller.isAuthenticated, controller.deleteCar)
router.put("/updateCar", controller.isAuthenticated, controller.updateCar)

//fotos
router.delete("/delete/:idImage", controller.isAuthenticated, imageController.delete )
router.post("/createimage", controller.isAuthenticated, imageController.create)

// cotizaciones
router.post("/setCotizacion", controller.createCotizacion)
router.get("/getCotizaciones/:idCarro", controller.readCotizacion)

//citas
router.get("/citas", controller.readCitas)
router.get("/cita/:idCita", controller.readCita)
router.post("/setCita", controller.createCita)
router.delete("/deleteCita/:idCita", controller.isAuthenticated, controller.deleteCita)
router.put("/updateCita/:idCita", controller.isAuthenticated, controller.updateCita)
router.get("/selectCita/:idUsuario", imageController.selectCita)



module.exports = router