import { Router } from "express";
import { methods as languageController } from "../controllers/language.controller";

const router = Router();

//ROUTER INGRESOS
router.get(
    "/api/getListadoExpIngresos/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListdoExpIngresos
);

router.get(
    "/api/getListadoIngresoMensualxTipRecurso/:instancia/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoIngresoMensualxTipRecurso
);

router.get(
    "/api/getListadoIngresoMensualxCorteProced/:instancia/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoIngresoMensualxCorteProced
);

//ROUTER PROGRAMADOS
router.get(
    "/api/getListadoProgramaciones/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoProgramaciones
);

router.get(
    "/api/getListadoProgramacionesPonente/:instancia/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoProgramacionesPonente
);

router.get(
    "/api/getListadoProgramacionesFirmadoPonente/:instancia/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoProgramacionesFirmadoPonente
);

//ROUTER ESCRITOS
router.get(
    "/api/getListadoEscritosAnual/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoEscritosAnual
);

router.get(
    "/api/getListaTipoEscritos/:instancia/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListaTipoEscritos
);

router.get(
    "/api/getListadoEscritosPendienteAtendido/:instancia/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoEscritosPendienteAtendido
);

export default router;