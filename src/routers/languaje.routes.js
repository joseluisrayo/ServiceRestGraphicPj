import { Router } from "express";
import { methods as languageController } from "../controllers/language.controller.js";

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

router.get(
    "/api/getListadoProgramacionesPonenteRecurso/:instancia/:fechaini/:fechafin/:ponente",
    languageController.validarAccessToken,
    languageController.getListadoProgramacionesPonenteRecurso
);

router.get(
    "/api/getListadoProgramacionesPendientexSala/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoProgramacionesPendientexSala
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

//ROUTER PENDIENTE FALLO
router.get(
    "/api/getListdoPendienteSentidoFalloxSala/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListdoPendienteSentidoFalloxSala
);

router.get(
    "/api/getListadoPendienteSentidoFalloxPonente/:instancia/:fechaini/:fechafin",
    languageController.validarAccessToken,
    languageController.getListadoPendienteSentidoFalloxPonente
);

router.get(
    "/api/getListadoPendienteSentidoFalloxPonenteDetallado/:instancia/:fechaini/:fechafin/:ponente",
    languageController.validarAccessToken,
    languageController.getListadoPendienteSentidoFalloxPonenteDetallado
);

//ROUTER VERSUS INGRESOS Y PROGRAMADOS X AÑO-MES
router.get(
    "/api/getListadoVersusIngresosyProgramadoxAnio/:anio",
    languageController.validarAccessToken,
    languageController.getListadoVersusIngresosyProgramadoxAnio
);

router.get(
    "/api/getListadoVersusIngresosyProgramadoxMes/:instancia/:anio",
    languageController.validarAccessToken,
    languageController.getListadoVersusIngresosyProgramadoxMes
);

export default router;