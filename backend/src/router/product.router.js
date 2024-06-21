const router = require("express").Router();
const Sequelize = require('sequelize');
const Usuario = require("../model/usuario.model");
const BitacoraAccion = require("../model/bitacoraAccion.model"); // Importa directamente el modelo BitacoraAccion
const { Incidencia, generateIncidenciaId } = require('../model/incidencia.model');
const {Diagnostico, generarFechaHora} = require('../model/diagnostico.model');
const RolUsuario= require("../model/rolUsuario.model");
const AsignarIncidencia= require('../model/asignarIncidencia.model');
const Roles=require("../model/roles.model");

router.get("/consultarUsuarios", async (req, res) =>{
    try {
        const consultarUsuario = await Usuario.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: consultarUsuario
        });
    } catch (error) {
        console.error('Error al consultar usuarios:', error);
        res.status(500).json({ error: 'No se pudo consultar usuarios', detalles: error.message });
    }
});
router.get("/consultarUsuariosTecnicos", async (req, res) => {
    try {
        const usuariosTecnicos = await RolUsuario.findAll({
            where: { CN_Id_Rol: 4 },
            attributes: ['CT_Usuario'] // Selecciona solo la columna CT_Usuario
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: usuariosTecnicos
        });
    } catch (error) {
        console.error('Error al consultar usuarios técnicos:', error);
        res.status(500).json({ error: 'No se pudo consultar usuarios técnicos', detalles: error.message });
    }
});

module.exports = router;

router.get("/consultarIncidencias", async (req, res) =>{
    try {
        const consultarIncidencias = await Incidencia.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: consultarIncidencias
        });
    } catch (error) {
        console.error('Error al consultar usuarios:', error);
        res.status(500).json({ error: 'No se pudo consultar usuarios', detalles: error.message });
    }
});

router.post('/crearBitacoraAccion', async(req, res) => {
    try {
        const { CT_Nombre_Sistema, CT_Nombre_Referencia, CT_Usuario } = req.body;
        const nuevaBitacoraAccion = await BitacoraAccion.create({
            CT_Nombre_Sistema,
            CT_Nombre_Referencia,
            CT_Usuario
        });
        res.status(201).json(nuevaBitacoraAccion);
    } catch (error) {
        console.error('Error al crear b_accion:', error);
        res.status(500).json({ error: 'No se pudo crear la b_accion', detalles: error.message });
    }
});
router.post('/registrarUsuario', async (req, res) => {
    try {
        const { CT_Codigo_Usuario, CT_Nombre, CT_Contraseña, CT_Usuario, CN_Numero_Telefonico, CT_Puesto, CT_Id_Departamento } = req.body;
        const nuevoUsuario = await Usuario.create({
            CT_Codigo_Usuario,
            CT_Nombre,
            CT_Contraseña,
            CT_Usuario,
            CN_Numero_Telefonico,
            CT_Puesto,
            CT_Id_Departamento
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'No se pudo crear el usuario', detalles: error.message });
    }
});
router.post('/ingresarSistema', async (req, res) => {
    const { CT_Usuario, CT_Contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { CT_Usuario } });

        if (!usuario || usuario.CT_Contraseña !== CT_Contraseña) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Usuario autenticado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});
// POST: Registrar una incidencia
router.post('/incidencias', async (req, res) => {
    try {
        const {CT_Usuario,CT_Titulo, CT_Descripcion, CT_Lugar, CN_Costos, CN_Duracion, CT_Imagen } = req.body;

        if (!CT_Usuario || !CT_Titulo || !CT_Descripcion || !CT_Lugar) {
            return res.status(400).json({ error: 'Por favor complete todos los campos obligatorios.' });
        }

        const CN_Id_Incidencia = await generateIncidenciaId();

        const nuevaIncidencia = await Incidencia.create({
            CN_Id_Incidencia,
            CN_Id_Estado:1,
            CT_Usuario,
            CT_Titulo,
            CT_Descripcion,
            CT_Lugar,
            CN_Costos,
            CN_Duracion,
            CT_Imagen
        });

        res.status(201).json(nuevaIncidencia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la incidencia.' });
    }
});
router.post('/diagnosticoIncidencia', async (req, res) => {
    try {
        const { CT_Diagnostico, CN_Id_Incidencia, CT_Requiere_Compra, CT_Tiempo_Estimado, CT_Observaciones, CT_Usuario } = req.body;

        if (!CT_Diagnostico || !CN_Id_Incidencia || !CT_Requiere_Compra || !CT_Tiempo_Estimado || !CT_Observaciones || !CT_Usuario) {
            return res.status(400).json({ error: 'Por favor complete todos los campos obligatorios.' });
        }
        const incidencia = await Incidencia.findOne({ where: { CN_Id_Incidencia } });

        if (!incidencia) {
            return res.status(404).json({ error: 'Incidencia no encontrada.' });
        }

        if (incidencia.CN_Id_Estado !== 4) {
            return res.status(400).json({ error: 'El diagnóstico solo se puede realizar si el estado de la incidencia es 4.' });
        }

        // Actualizar el estado de la incidencia
        let nuevoEstadoId;
        if (CT_Requiere_Compra.toLowerCase() === 'si') {
            nuevoEstadoId = 5; // Estado = 5 para "si"
        } else if (CT_Requiere_Compra.toLowerCase() === 'no') {
            nuevoEstadoId = 6; // Estado = 6 para "no"
        }

        await Incidencia.update({ CN_Id_Estado: nuevoEstadoId }, {
            where: { CN_Id_Incidencia }
        });

        // Crear el diagnóstico
        const CT_Fecha_Hora = await generarFechaHora();
        const diagnosticoIncidencia = await Diagnostico.create({
            CT_Fecha_Hora,
            CT_Diagnostico,
            CN_Id_Incidencia,
            CT_Requiere_Compra,
            CT_Tiempo_Estimado,
            CT_Observaciones,
            CT_Usuario
        });

        res.status(201).json(diagnosticoIncidencia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar el diagnóstico.' });
    }
});
router.get('/incidenciasCuatro', async (req, res) => {
    try {
        const incidencias = await Incidencia.findAll({
            where: { CN_Id_Estado: 4 }
        });
        res.json(incidencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener incidencias'});
    }
});
router.get('/incidenciasRegistrado', async (req, res) => {
    try {
        const incidencias = await Incidencia.findAll({
            where: { CN_Id_Estado: 1 },
            attributes: ['CN_Id_Incidencia']
        });
        res.json(incidencias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener incidencias'});
    }
});
router.get("/consultarIncidenciasPorUsuario", async (req, res) => {
    const { CT_Usuario } = req.query;

    if (!CT_Usuario) {
        return res.status(400).json({
            ok: false,
            status: 400,
            error: 'El parámetro CT_Usuario es obligatorio'
        });
    }

    try {
        const consultarIncidencias = await Incidencia.findAll({
            where: { CT_Usuario: CT_Usuario }
        });

        if (!consultarIncidencias || consultarIncidencias.length === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                error: 'No se encontraron incidencias para el usuario proporcionado'
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: consultarIncidencias
        });
    } catch (error) {
        console.error('Error al consultar usuarios:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            error: 'No se pudo consultar incidencias',
            detalles: error.message
        });
    }
});
router.get('/obtenerRolesPorUsuario', async (req, res) => {
    const { CT_Usuario } = req.query;

    try {
        const rolesAsociados = await RolUsuario.findAll({
            where: { CT_Usuario: CT_Usuario },
            attributes: ['CN_Id_Rol'] // Obtener solo los identificadores de los roles
        });

        // Si no hay roles asociados, devolver un arreglo vacío
        if (!rolesAsociados || rolesAsociados.length === 0) {
            return res.status(200).json({
                ok: true,
                status: 200,
                body: []
            });
        }

        // Obtener solo los identificadores de los roles asociados
        const roles = rolesAsociados.map(rolUsuario => rolUsuario.CN_Id_Rol);

        // Devolver los identificadores de los roles asociados al usuario
        res.status(200).json({
            ok: true,
            status: 200,
            body: roles
        });
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ error: 'No se pudieron obtener los roles', detalles: error.message });
    }
});
router.get('/incidenciasIdCuatro', async (req, res) => {
    try {
        const rolUsuario = await RolUsuario.findAll({
            where: { CN_Id_Rol: 4 }
        });
        res.json(rolUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios'});
    }
});

router.post('/asignarIncidencia', async (req, res) => {
    const {
      CT_Usuario,
      CN_Id_Incidencia,
      CN_Id_Riesgo,
      CN_Id_Prioridad,
      CN_Id_Afectacion,
      CN_Id_Categoria,
      CN_Costos,
      CN_Duracion
    } = req.body;
  
    // Verificar si todos los campos están presentes y son válidos
    if (
      !CT_Usuario ||
      !CN_Id_Incidencia ||
      CN_Id_Riesgo === undefined ||
      CN_Id_Prioridad === undefined ||
      CN_Id_Afectacion === undefined ||
      CN_Id_Categoria === undefined ||
      CN_Costos === undefined ||
      CN_Duracion === undefined
    ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
  
    try {
      // Verificar si el usuario tiene el rol necesario para asignar incidencias
      const usuarioConRol = await RolUsuario.findOne({
        where: {
          CT_Usuario,
          CN_Id_Rol: 4
        }
      });
      if (!usuarioConRol) {
        return res.status(403).json({ error: 'El usuario no tiene el rol necesario para asignar incidencias.' });
      }
  
      // Verificar si la incidencia ya está asignada al usuario
      const incidenciaAsignada = await AsignarIncidencia.findOne({
        where: {
          CT_Usuario,
          CN_Id_Incidencia
        }
      });
      if (incidenciaAsignada) {
        return res.status(400).json({ error: 'La incidencia ya ha sido asignada a este usuario.' });
      }
  
      // Asignar la incidencia al usuario
      const asignacion = await AsignarIncidencia.create({
        CT_Usuario,
        CN_Id_Incidencia
      });
  
      // Actualizar la incidencia con los nuevos campos y cambiar el estado a 2
      await Incidencia.update(
        {
          CN_Id_Estado: 3,
          CN_Id_Riesgo,
          CN_Id_Prioridad,
          CN_Id_Afectacion,
          CN_Id_Categoria,
          CN_Costos,
          CN_Duracion
        },
        {
          where: {
            CN_Id_Incidencia
          }
        }
      );
  
      return res.status(201).json(asignacion);
    } catch (error) {
      console.error('Error al asignar incidencia:', error);
      return res.status(500).json({ error: 'Error interno al procesar la solicitud.' });
    }
  });
  

router.get("/consultarIncidenciasAsignadas", async (req, res) =>{
    try {
        const consultarIncidenciasAsignadas = await AsignarIncidencia.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: consultarIncidenciasAsignadas
        });
    } catch (error) {
        console.error('Error al consultar incidencias Asignadas:', error);
        res.status(500).json({ error: 'No se pudo consultar incidencias', detalles: error.message });
    }
});
router.get('/consultarIncidenciasTecnico', async (req, res) => {
    const { CT_Usuario } = req.query;

    try {
        // Primero, buscar todas las CN_Id_Incidencia asignadas a CT_Usuario en t_asignar_incidencia
        const asignaciones = await AsignarIncidencia.findAll({
            attributes: ['CN_Id_Incidencia'],
            where: {
                CT_Usuario
            }
        });

        // Extraer los CN_Id_Incidencia de las asignaciones encontradas
        const incidenciaIds = asignaciones.map(asignacion => asignacion.CN_Id_Incidencia);

        // Luego, buscar todas las incidencias en t_incidencias con CN_Id_Estado = 3 y los CN_Id_Incidencia encontrados
        const incidencias = await Incidencia.findAll({
            where: {
                CN_Id_Incidencia: incidenciaIds,
                CN_Id_Estado: 3 // Suponiendo que CN_Id_Estado es de tipo STRING
            }
        });

        res.json(incidencias); // Devolver las incidencias encontradas en formato JSON
    } catch (error) {
        console.error('Error al obtener las incidencias:', error);
        res.status(500).json({ error: 'Error al obtener las incidencias' });
    }
});
router.put('/trabajar', async (req, res) => {
    const { id } = req.query; // ID de la incidencia a trabajar obtenido del query parameter
    const { CT_Usuario } = req.body; // Usuario que realiza la acción
  
    try {
      // Buscar todas las incidencias asignadas a ese usuario
      const asignaciones = await AsignarIncidencia.findAll({
        where: { CT_Usuario }
      });
  
      // Array para almacenar las promesas de búsqueda de estado 4
      const promises = asignaciones.map(asignacion =>
        Incidencia.findOne({
          where: {
            CN_Id_Incidencia: asignacion.CN_Id_Incidencia,
            CN_Id_Estado: 4 // Busca incidencias en estado 4
          }
        })
      );
  
      // Ejecutar las promesas en paralelo
      const incidenciasEnEstado4 = await Promise.all(promises);
  
      // Verificar si alguna incidencia está en estado 4
      const tieneEstado4 = incidenciasEnEstado4.some(incidencia => incidencia !== null);
  
      if (tieneEstado4) {
        return res.status(400).json({ error: 'Ya estás trabajando en otra incidencia' });
      }
  
      // Actualizar el estado de la incidencia seleccionada a estado 4
      const incidencia = await Incidencia.findByPk(id);
      if (!incidencia) {
        return res.status(404).json({ error: 'Incidencia no encontrada' });
      }
  
      incidencia.CN_Id_Estado = 4;
      await incidencia.save();
  
      res.json({ message: 'Estado de la incidencia actualizado correctamente' });
    } catch (error) {
      console.error('Error al cambiar el estado de la incidencia:', error);
      res.status(500).json({ error: 'Error al cambiar el estado de la incidencia' });
    }
  });
module.exports=router;