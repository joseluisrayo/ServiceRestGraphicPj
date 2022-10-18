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

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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
      const querys = await consultasql.ListadoIngresoMensualxTipRecurso(
        instancia,
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoIngresoMensualxTipRecurso"
          );
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
      const querys = await consultasql.ListadoIngresoMensualxCorteProced(
        instancia,
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoIngresoMensualxCorteProced"
          );
        }
      });

      const data = await db.query(querys);
      const replaces = data.map((item) => {
        const preplace = (item["00_Corte Procedencia"] || "").replace("�", "Ñ");
        if (preplace.length > 0) {
          item["00_Corte Procedencia"] = preplace;
        }
        return item;
      });
      res.status(200).json(replaces);
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

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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
      const querys = await consultasql.ListadoProgramacionesPonente(
        instancia,
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoProgramacionesPonente"
          );
        }
      });

      const data = await db.query(querys);
      const replaces = data.map((item) => {
        const preplace = (item["00_Ponente"] || "").replace("�", "Ñ");
        preplace.length > 0 && (item["00_Ponente"] = preplace);
        return item;
      });
      res.status(200).json(replaces);
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
      const querys = await consultasql.ListadoProgramacionesFirmadoPonente(
        instancia,
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoProgramacionesFirmadoPonente"
          );
        }
      });

      const data = await db.query(querys);
      const replaces = data.map((item) => {
        const preplace = (item["00_Ponente"] || "").replace("�", "Ñ");
        preplace.length > 0 && (item["00_Ponente"] = preplace);
        return item;
      });
      res.status(200).json(replaces);
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
    let { instancia, fechaini, fechafin, ponente } = req.params;
    if (
      instancia.length != 0 &&
      fechaini.length != 0 &&
      fechafin.length != 0 &&
      ponente.length != 0
    ) {
      const result_fecha = validarFecha(fechaini, fechafin);
      ponente === "SCASTAÑEDA" && (ponente = "SCASTA");
      ponente === "HNUÑEZ" && (ponente = "HNU");
      const querys = await consultasql.ListadoProgramacionesPonenteRecurso(
        instancia,
        result_fecha,
        ponente
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoProgramacionesPonenteRecurso"
          );
        }
      });

      const data = await db.query(querys);
      const replaces = data.map((item) => {
        const preplace1 = (item["02_Ponente"] || "").replace("�", "Ñ");
        const preplace2 = (item["09_TipoAudiencia"] || "").replace("�", "ó");
        const preplace3 = (item["11_Accion"] || "").replace("�", "ó");
        preplace1.length > 0 && (item["02_Ponente"] = preplace1);
        preplace2.length > 0 && (item["09_TipoAudiencia"] = preplace2);
        preplace3.length > 0 && (item["11_Accion"] = preplace3);
        return item;
      });
      res.status(200).json(replaces);
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

const getListadoProgramacionesPendientexSala = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoProgramacionPendientexSala(
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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
      const querys = await consultasql.ListaTipoEscritos(
        instancia,
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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
      const querys = await consultasql.ListadoEscritosPendienteAtendido(
        instancia,
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoEscritosPendienteAtendido"
          );
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

//CONTROLLER PENDIENTE FALLO
const getListdoPendienteSentidoFalloxSala = async (req, res, next) => {
  try {
    const { fechaini, fechafin } = req.params;
    if (fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoPendienteSentidoFalloxSala(
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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

const getListadoPendienteSentidoFalloxPonente = async (req, res, next) => {
  try {
    const { instancia, fechaini, fechafin } = req.params;
    if (instancia.length != 0 && fechaini.length != 0 && fechafin.length != 0) {
      const result_fecha = validarFecha(fechaini, fechafin);
      const querys = await consultasql.ListadoPendienteSentidoFalloxPonente(
        instancia,
        result_fecha
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoIngresoMensualxTipRecurso"
          );
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

const getListadoPendienteSentidoFalloxPonenteDetallado = async (
  req,
  res,
  next
) => {
  try {
    let { instancia, fechaini, fechafin, ponente } = req.params;
    if (
      instancia.length != 0 &&
      fechaini.length != 0 &&
      fechafin.length != 0 &&
      ponente.length != 0
    ) {
      const result_fecha = validarFecha(fechaini, fechafin);
      ponente === "SCASTAÑEDA" && (ponente = "SCASTA");
      ponente === "HNUÑEZ" && (ponente = "HNU");
      const querys =
        await consultasql.ListadoPendienteSentidoFalloxPonenteDetallado(
          instancia,
          result_fecha,
          ponente
        );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
          return console.log(
            "Error connection: getListadoProgramacionesPonenteRecurso"
          );
        }
      });

      const data = await db.query(querys);
      const replaces = data.map((item) => {
        const preplace1 = (item["01_Ponente"] || "").replace("�", "Ñ");
        const preplace2 = (item["06_TipoAudiencia"] || "").replace("�", "ó");
        preplace1.length > 0 && (item["01_Ponente"] = preplace1);
        preplace2.length > 0 && (item["06_TipoAudiencia"] = preplace2);
        return item;
      });
      res.status(200).json(replaces);
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

//QUERY VERSUS INGRESOS Y PROGRAMADOS X AÑO
const getListadoVersusIngresosyProgramadoxAnio = async (req, res, next) => {
  try {
    const { anio } = req.params;
    if (anio.length != 0) {
      const querys = await consultasql.ListadoVersusIngresosyProgramadoxAnio(
        anio
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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

const getListadoVersusIngresosyProgramadoxMes = async (req, res, next) => {
  try {
    const { instancia, anio } = req.params;
    if (instancia.length != 0 && anio.length != 0) {
      const querys = await consultasql.ListadoVersusIngresosyProgramadoxMes(
        instancia,
        anio
      );
      const db = new SybasePromised({
        host: config.host,
        port: config.port,
        dbname: config.dbname,
        username: config.username,
        password: config.password,
      });

      await db.connect((error) => {
        if (error) {
          res
            .status(500)
            .send("No se conectar con la base de datos, intentelo mas tarde.");
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
  const fechaActualFormat = moment(new Date()).format(
    "MM-DD-YYYY [23:59:59.000]"
  );

  const ultimaFecha = moment(ultimaFechaAniosFormat).isAfter(fechaActualFormat, "year")
    ? fechaActualFormat
    : ultimaFechaAniosFormat;

  return `'${primerFechaAniosFormat}' AND '${ultimaFecha}'`;
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
  getListadoProgramacionesPendientexSala,
  getListadoEscritosAnual,
  getListaTipoEscritos,
  getListadoEscritosPendienteAtendido,
  getListdoPendienteSentidoFalloxSala,
  getListadoPendienteSentidoFalloxPonente,
  getListadoPendienteSentidoFalloxPonenteDetallado,
  getListadoVersusIngresosyProgramadoxAnio,
  getListadoVersusIngresosyProgramadoxMes,
};
