import Sybase from "sybase";
import config from "./../config";
import { scripts as consultasql } from "./../database/scripts";
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
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(consultasql.ListadoExpIngresos(result_fecha));
        db.query(
          consultasql.ListadoExpIngresos(result_fecha),
          function (error, data) {
            if (error) console.log(error);
            //agregar data a redis
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getListadoIngresoMensualxTipRecurso = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(
        //   consultasql.ListadoIngresoMensualxTipRecurso(instancia, result_fecha)
        // );
        db.query(
          consultasql.ListadoIngresoMensualxTipRecurso(instancia, result_fecha),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getListadoIngresoMensualxCorteProced = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(
        //   consultasql.ListadoIngresoMensualxCorteProced(instancia, result_fecha)
        // );
        db.query(
          consultasql.ListadoIngresoMensualxCorteProced(
            instancia,
            result_fecha
          ),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//CONTROLLER PROGRAMADOS
const getListadoProgramaciones = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(consultasql.ListadoProgramaciones(result_fecha));
        db.query(
          consultasql.ListadoProgramaciones(result_fecha),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getListadoProgramacionesPonente = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(
        //   consultasql.ListadoProgramacionesPonente(instancia, result_fecha)
        // );
        db.query(
          consultasql.ListadoProgramacionesPonente(instancia, result_fecha),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getListadoProgramacionesFirmadoPonente = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(
        //   consultasql.ListadoProgramacionesFirmadoPonente(
        //     instancia,
        //     result_fecha
        //   )
        // );
        db.query(
          consultasql.ListadoProgramacionesFirmadoPonente(
            instancia,
            result_fecha
          ),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//CONTROLLER ESCRITOS
const getListadoEscritosAnual = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(consultasql.ListadoEscritosAnual(result_fecha));
        db.query(
          consultasql.ListadoEscritosAnual(result_fecha),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getListaTipoEscritos = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(consultasql.ListaTipoEscritos(instancia, result_fecha));
        db.query(
          consultasql.ListaTipoEscritos(instancia, result_fecha),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getListadoEscritosPendienteAtendido = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const db = await new Sybase(
        config.host,
        config.port,
        config.dbname,
        config.username,
        config.password
      );

      await db.connect(function (error) {
        if (error) return console.log(error);
        // console.log(consultasql.ListadoEscritosPendienteAtendido(result_fecha));
        db.query(
          consultasql.ListadoEscritosPendienteAtendido(result_fecha),
          function (error, data) {
            if (error) console.log(error);
            res.status(200).json(data);
            db.disconnect();
          }
        );
      });
    } else {
      res.status(500).send("No se aceptan parametros vacios.");
    }
  } catch (error) {
    res.status(500).send(error.message);
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
      res.status(500).send("Access denied, token expired or incorrect");
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
  getListadoEscritosAnual,
  getListaTipoEscritos,
  getListadoEscritosPendienteAtendido,
};
