import SybasePromised from "sybase-promised";
import config from "./../config.js";
import { scripts as consultasql } from "./../database/scripts.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// const generateAccessToken = () => {
//   //Default_token: eyJhbGciOiJIUzI1NiJ9.c3VwcmVtYQ.cpUyTYcgm8ixIVDTLe-Fua0RLkyUKg8yy2IkAOfKi2I
//   return jwt.sign("suprema", config.secretkey);
// };

//CONTROLLER INGRESOS
const getListdoExpIngresos = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoExpIngresos(result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListdoExpIngresos");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getListadoIngresoMensualxTipRecurso = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoIngresoMensualxTipRecurso(instancia, result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoIngresoMensualxTipRecurso");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getListadoIngresoMensualxCorteProced = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoIngresoMensualxCorteProced(instancia, result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoIngresoMensualxCorteProced");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

//CONTROLLER PROGRAMADOS
const getListadoProgramaciones = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoProgramaciones(result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoProgramaciones");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getListadoProgramacionesPonente = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoProgramacionesPonente(instancia, result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoProgramacionesPonente");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getListadoProgramacionesFirmadoPonente = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoProgramacionesFirmadoPonente(instancia, result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoProgramacionesFirmadoPonente");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getListadoProgramacionesPonenteRecurso = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin, ponente } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoProgramacionesPonenteRecurso(instancia, result_fecha, ponente);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoProgramacionesPonenteRecurso");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
}

//CONTROLLER ESCRITOS
const getListadoEscritosAnual = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoEscritosAnual(result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoEscritosAnual");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getListaTipoEscritos = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListaTipoEscritos(instancia, result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListaTipoEscritos");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getListadoEscritosPendienteAtendido = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoEscritosPendienteAtendido(instancia, result_fecha);
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error)=>{
        if (error) {       
          res.status(500).send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log("Error connection: getListadoEscritosPendienteAtendido");
        }
      });

      const data = await db.query(querys);
      res.status(200).json(data);
      db.disconnect();

    } else {
      res.status(400).send("No se aceptan parametros vacios.");
      console.log("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

//commons
const validarFecha = (v_fechaIni, v_fechaFin) => {
  const fechaIniSplit = v_fechaIni.split("-");
  const fechaFinSplit = v_fechaFin.split("-");
  const fechaIniDate = new Date(
    fechaIniSplit[0],
    fechaIniSplit[1] - 1,
    fechaIniSplit[2]
  );
  const fechaFinDate = new Date(
    fechaFinSplit[0],
    fechaFinSplit[1] - 1,
    fechaFinSplit[2]
  );
  const primerFechaAniosFormat = moment(fechaIniDate).format(
    "MM-DD-YYYY [00:00:00.000]"
  );
  const ultimaFechaAniosFormat = moment(fechaFinDate).format(
    "MM-DD-YYYY [23:59:59.000]"
  );
  return `'${primerFechaAniosFormat}' AND '${ultimaFechaAniosFormat}'`;
};

const validarAccessToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"];
  await jwt.verify(accessToken, config.secretkey, (err, data) => {
    if (err) {
      res.status(401).send("Access denied, token expired or incorrect");
    } else {
      next();
    }
  });
};

export const methods = {
  validarAccessToken,
  getListdoExpIngresos,
  getListadoIngresoMensualxTipRecurso,
  getListadoIngresoMensualxCorteProced,
  getListadoProgramaciones,
  getListadoProgramacionesPonente,
  getListadoProgramacionesFirmadoPonente,
  getListadoProgramacionesPonenteRecurso,
  getListadoEscritosAnual,
  getListaTipoEscritos,
  getListadoEscritosPendienteAtendido,
};
