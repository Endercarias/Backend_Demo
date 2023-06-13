import { Router } from "express"
import { methods as controller } from "../controller/importadora.controller"

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

// cotizaciones
router.post("/setCotizacion", controller.createCotizacion)
router.get("/getCotizaciones/:idCarro", controller.readCotizacion)


export default router