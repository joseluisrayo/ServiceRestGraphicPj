import { Router } from "express";
import { methods as languageController } from "../controllers/language.controller";

const router = Router();

// router.get(
//   "/api/getListadoProgramados",
//   languageController.validarAccessToken,
//   languageController.getListadoProgramados
// );

// router.get(
//   "/api/getListadoExpIngresado",
//   languageController.validarAccessToken,
//   languageController.getListadoExpIngresado
// );

router.get(
  "/api/getListadoExpIngresos/:fecha",
  languageController.validarAccessToken,
  languageController.getListdoExpIngresos
);

router.get(
  "/api/getListadoIngresoMensualxTipRecurso/:instancia/:fecha",
  languageController.validarAccessToken,
  languageController.getListadoIngresoMensualxTipRecurso
);

router.get(
  "/api/getListadoIngresoMensualxCorteProced/:instancia/:fecha",
  languageController.validarAccessToken,
  languageController.getListadoIngresoMensualxCorteProced
);

export default router;
