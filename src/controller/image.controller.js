const  { getConnection } = require("../database/importadora.database")

module.exports = {
    delete: async(req, res) => {
        const idImage  = req.params.idImage

        const connection = await getConnection()
        const query = await connection.query("DELETE FROM imagenes WHERE idImagenes = ?;", [idImage])
        
        res.send(query)
    },
    create: async (req, res) => {
        
        const connection = await getConnection()
        console.log(req.files)
        const query = await connection.query(`INSERT INTO imagenes (name,idCarro) VALUES (?, ?);`, 
        [req.files[0].filename, req.body.idCarro])

        res.send(query)
    },
    selectCita: async (req, res ) => {
        const idUsuario  = req.params.idUsuario

        const connection = await getConnection()
        console.log(req.files)
        const [query] = await connection.query(`SELECT cita.idCita, 
        carro.marca, 
        carro.linea, 
        carro.modelo, 
        cita.fechaInicio, 
        cita.fechaFin, 
        estadocita.estado,
        usuario.nombre,
        usuario.apellido
        FROM cita 
        inner join carro on carro.idCarro =  cita.idCarro
        inner join estadocita on cita.idEstadoCita = estadocita.idEstado
        inner join usuario on cita.idUsuario =  usuario.idUsuario where cita.idUsuario = ?`, [idUsuario])

        res.send(query)
    }

}