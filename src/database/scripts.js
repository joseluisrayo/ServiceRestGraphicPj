//QUERY INGRESOS
const ListadoExpIngresos = (fecha) => `
        SELECT year(ie.f_ingreso) as '00_anno',  
            count(CASE WHEN ie.c_instancia  = '101' THEN ie.n_unico END) AS '101_SPP',			 
            count(CASE WHEN ie.c_instancia  = '102' THEN ie.n_unico END) AS '102_SPT', 		      
            count(CASE WHEN ie.c_instancia  = '201' THEN ie.n_unico END) AS '201_SCP',
            count(CASE WHEN ie.c_instancia  = '202' THEN ie.n_unico END) AS '202_SCT',
            count(CASE WHEN ie.c_instancia  = '203' THEN ie.n_unico END) AS '203_SDCP' ,
            count(CASE WHEN ie.c_instancia  = '204' THEN ie.n_unico END) AS '204_1SDCT' ,
            count(CASE WHEN ie.c_instancia  = '206' THEN ie.n_unico END) AS '206_2SDCT' ,
            count(CASE WHEN ie.c_instancia  = '207' THEN ie.n_unico END) AS '207_3SDCT'  ,
            count(CASE WHEN ie.c_instancia  = '208' THEN ie.n_unico END) AS '208_4SDCT' ,
            count(CASE WHEN ie.c_instancia  = '209' THEN ie.n_unico END) AS '209_5SDCT'  
        FROM instancia_expediente ie noholdlock
        JOIN expediente e noholdlock
        ON e.n_unico=ie.n_unico
        AND e.n_incidente=ie.n_incidente
        JOIN motivo_ingreso_maestro mim noholdlock
        ON ie.c_motivo_ingreso=mim.c_motivo_ingreso       
        WHERE ie.c_distrito = '50'
            AND ie.c_provincia = '01'
            AND ie.c_instancia in ('101', '102',   '201', '202', '203', '204',  '206', '207', '208', '209') 
            AND ie.f_ingreso BETWEEN ${fecha}
            AND ie.l_ultimo = 'S'
            AND ISNULL(e.l_anulado,'N') = 'N'
        GROUP BY year(ie.f_ingreso)
`;

const ListadoIngresoMensualxTipRecurso = (n_sala, fecha) => `
    SELECT RTRIM(mim.x_desc_motivo_ingreso) AS '00_Recurso' ,
    count(CASE datepart(month,ie.f_ingreso) WHEN 1 THEN ie.f_ingreso END) AS "01_Enero",
    count(CASE datepart(month,ie.f_ingreso) WHEN 2 THEN ie.f_ingreso END) AS "02_Febrero",
    count(CASE datepart(month,ie.f_ingreso) WHEN 3 THEN ie.f_ingreso END) AS "03_Marzo",
    count(CASE datepart(month,ie.f_ingreso) WHEN 4 THEN ie.f_ingreso END) AS "04_Abril",
    count(CASE datepart(month,ie.f_ingreso) WHEN 5 THEN ie.f_ingreso END) AS "05_Mayo",
    count(CASE datepart(month,ie.f_ingreso) WHEN 6 THEN ie.f_ingreso END) AS "06_Junio",
    count(CASE datepart(month,ie.f_ingreso) WHEN 7 THEN ie.f_ingreso END) AS "07_Julio",
    count(CASE datepart(month,ie.f_ingreso) WHEN 8 THEN ie.f_ingreso END) AS "08_Agosto",	   	   
    count(CASE datepart(month,ie.f_ingreso) WHEN 9 THEN ie.f_ingreso END) AS "09_Setiembre",
    count(CASE datepart(month,ie.f_ingreso) WHEN 10 THEN ie.f_ingreso END) AS "10_Octubre",
    count(CASE datepart(month,ie.f_ingreso) WHEN 11 THEN ie.f_ingreso END) AS "11_Noviembre",
    count(CASE datepart(month,ie.f_ingreso) WHEN 12 THEN ie.f_ingreso END) AS "12_Diciembre" 
    FROM instancia_expediente ie noholdlock
    JOIN expediente e noholdlock
    ON e.n_unico=ie.n_unico
    AND e.n_incidente=ie.n_incidente
    JOIN motivo_ingreso_maestro mim noholdlock
    ON ie.c_motivo_ingreso=mim.c_motivo_ingreso
    WHERE ie.c_distrito = '50'
    AND ie.c_provincia = '01'
    AND ie.c_instancia = '${n_sala}'
    AND ie.f_ingreso BETWEEN ${fecha}
    AND ie.l_ultimo = 'S'
    AND ISNULL(e.l_anulado,'N') = 'N'
    GROUP BY  mim.c_motivo_ingreso
`;

const ListadoIngresoMensualxCorteProced = (n_sala, fecha) => `
    SELECT isnull(dj.x_nom_distrito,'SIN ASIGNACION') AS '00_Corte Procedencia' ,
    count(CASE datepart(month,ie.f_ingreso) WHEN 1 THEN ie.f_ingreso END) AS "01_Enero",
    count(CASE datepart(month,ie.f_ingreso) WHEN 2 THEN ie.f_ingreso END) AS "02_Febrero",
    count(CASE datepart(month,ie.f_ingreso) WHEN 3 THEN ie.f_ingreso END) AS "03_Marzo",
    count(CASE datepart(month,ie.f_ingreso) WHEN 4 THEN ie.f_ingreso END) AS "04_Abril",
    count(CASE datepart(month,ie.f_ingreso) WHEN 5 THEN ie.f_ingreso END) AS "05_Mayo",
    count(CASE datepart(month,ie.f_ingreso) WHEN 6 THEN ie.f_ingreso END) AS "06_Junio",
    count(CASE datepart(month,ie.f_ingreso) WHEN 7 THEN ie.f_ingreso END) AS "07_Julio",
    count(CASE datepart(month,ie.f_ingreso) WHEN 8 THEN ie.f_ingreso END) AS "08_Agosto",	   	   
    count(CASE datepart(month,ie.f_ingreso) WHEN 9 THEN ie.f_ingreso END) AS "09_Setiembre",
    count(CASE datepart(month,ie.f_ingreso) WHEN 10 THEN ie.f_ingreso END) AS "10_Octubre",
    count(CASE datepart(month,ie.f_ingreso) WHEN 11 THEN ie.f_ingreso END) AS "11_Noviembre",
    count(CASE datepart(month,ie.f_ingreso) WHEN 12 THEN ie.f_ingreso END) AS "12_Diciembre" 
    FROM instancia_expediente ie noholdlock
    JOIN expediente e noholdlock
    ON e.n_unico=ie.n_unico
    AND e.n_incidente=ie.n_incidente
    LEFT JOIN expediente_elevacion xl ON xl.c_distrito = ie.c_distrito AND xl.c_provincia = ie.c_provincia AND xl.c_instancia = ie.c_instancia AND xl.n_unico = ie.n_unico AND xl.n_incidente = ie.n_incidente AND xl.f_ingreso = ie.f_ingreso
    LEFT JOIN distrito_judicial dj ON dj.c_distrito = xl.c_distrito_orig
    WHERE ie.c_distrito = '50'
    AND ie.c_provincia = '01'
    AND ie.c_instancia = '${n_sala}'
    AND ie.f_ingreso BETWEEN ${fecha}
    AND ie.l_ultimo = 'S'
    AND ISNULL(e.l_anulado,'N') = 'N'
    GROUP BY  dj.x_nom_distrito
`;

//QUERY PROGRAMADOS
const ListadoProgramacionesPonente = (n_sala, fecha) => `
    SELECT RTRIM(x.c_usuario_vocal) AS "00_Ponente" ,
    count(CASE WHEN x.mes = 1  THEN 1 END) AS "01_Enero",
    count(CASE WHEN x.mes = 2  THEN 1 END) AS "02_Febrero",
    count(CASE WHEN x.mes = 3  THEN 1 END) AS "03_Marzo",
    count(CASE WHEN x.mes = 4  THEN 1 END) AS "04_Abril",
    count(CASE WHEN x.mes = 5  THEN 1 END) AS "05_Mayo",
    count(CASE WHEN x.mes = 6  THEN 1 END) AS "06_Junio",
    count(CASE WHEN x.mes = 7  THEN 1 END) AS "07_Julio",
    count(CASE WHEN x.mes = 8  THEN 1 END) AS "08_Agosto",	   	   
    count(CASE WHEN x.mes = 9  THEN 1 END) AS "09_Setiembre",
    count(CASE WHEN x.mes = 10 THEN 1 END) AS "10_Octubre",
    count(CASE WHEN x.mes = 11 THEN 1 END) AS "11_Noviembre",
    count(CASE WHEN x.mes = 12 THEN 1 END) AS "12_Diciembre"
    FROM (        
    SELECT cg.c_usuario_vocal  ,
    month(cg.f_programacion )  AS mes
    FROM instancia_expediente ie (INDEX insta_expe_unic) noholdlock
    JOIN expediente e noholdlock
    ON e.n_unico=ie.n_unico
    AND e.n_incidente=ie.n_incidente
    JOIN conformacion_grupo   cg noholdlock 
    ON ie.c_distrito = cg.c_distrito AND ie.c_provincia = cg.c_provincia 
    AND ie.c_instancia = cg.c_instancia AND ie.n_unico = cg.n_unico 
    AND ie.n_incidente = cg.n_incidente AND ie.f_ingreso = cg.f_ingreso 
    AND cg.l_ultimo = 'S' AND cg.l_ultimo_audiencia = 'S' 
    AND cg.l_reprogramado = 'N' AND cg.l_no_vista = 'N' AND cg.l_publicado = 'S'
    AND cg.c_usuario_vocal IS NOT NULL
    WHERE 	ie.c_distrito = '50'
    AND  ie.c_provincia = '01'
    AND   ie.c_instancia = '${n_sala}'     
    AND  cg.f_programacion BETWEEN ${fecha}
    AND ie.l_ultimo = 'S'
    AND ISNULL(e.l_anulado,'N') = 'N') x
    GROUP BY x.c_usuario_vocal 
`;

const ListadoProgramaciones = (fecha) => `
    SELECT 
    x.anno AS '00_anno',
    count(CASE WHEN x.c_instancia  = '101' THEN 1 END) AS '101_SPP',			 
    count(CASE WHEN x.c_instancia  = '102' THEN 1 END) AS '102_SPT', 		      
    count(CASE WHEN x.c_instancia  = '201' THEN 1 END) AS '201_SCP',
    count(CASE WHEN x.c_instancia  = '202' THEN 1 END) AS '202_SCT',
    count(CASE WHEN x.c_instancia  = '203' THEN 1 END) AS '203_SDCP' ,
    count(CASE WHEN x.c_instancia  = '204' THEN 1 END) AS '204_1SDCT' ,
    count(CASE WHEN x.c_instancia  = '206' THEN 1 END) AS '206_2SDCT' ,
    count(CASE WHEN x.c_instancia  = '207' THEN 1 END) AS '207_3SDCT'  ,
    count(CASE WHEN x.c_instancia  = '208' THEN 1 END) AS '208_4SDCT' ,
    count(CASE WHEN x.c_instancia  = '209' THEN 1 END) AS '209_5SDCT' 
    FROM 
    ( SELECT     year(cg.f_programacion)  AS anno,
        ie.c_instancia
    FROM instancia_expediente ie (INDEX insta_expe_unic)  noholdlock
    JOIN expediente e noholdlock
    ON e.n_unico=ie.n_unico
    AND e.n_incidente=ie.n_incidente
    JOIN conformacion_grupo   cg  noholdlock 
    ON  ie.c_distrito = cg.c_distrito AND ie.c_provincia = cg.c_provincia 
    AND ie.c_instancia = cg.c_instancia AND ie.n_unico = cg.n_unico 
    AND ie.n_incidente = cg.n_incidente AND ie.f_ingreso = cg.f_ingreso 
    AND cg.l_ultimo = 'S' AND cg.l_ultimo_audiencia = 'S' 
    AND cg.l_reprogramado = 'N' AND cg.l_no_vista = 'N' AND cg.l_publicado = 'S'
    AND cg.c_usuario_vocal IS NOT NULL
    WHERE 	ie.c_distrito = '50'
    AND  ie.c_provincia = '01'
    AND   ie.c_instancia    IN ('101', '102',   '201', '202', '203', '204',  '206', '207', '208', '209'  )
    and   cg.f_programacion BETWEEN ${fecha}
    AND ie.l_ultimo = 'S'
    AND ISNULL(e.l_anulado,'N') = 'N' ) x 
    GROUP BY x.anno
    ORDER BY 1
`;

const ListadoProgramacionesFirmadoPonente = (n_sala, fecha) => `
    SELECT
    RTRIM(z.c_usuario_vocal) AS "00_Ponente" ,
            count(CASE WHEN z.mes = 1  THEN 1 END) AS "01_Enero",
            count(CASE WHEN z.mes = 2  THEN 1 END) AS "02_Febrero",
            count(CASE WHEN z.mes = 3  THEN 1 END) AS "03_Marzo",
            count(CASE WHEN z.mes = 4  THEN 1 END) AS "04_Abril",
            count(CASE WHEN z.mes = 5  THEN 1 END) AS "05_Mayo",
            count(CASE WHEN z.mes = 6  THEN 1 END) AS "06_Junio",
            count(CASE WHEN z.mes = 7  THEN 1 END) AS "07_Julio",
            count(CASE WHEN z.mes = 8  THEN 1 END) AS "08_Agosto",    
            count(CASE WHEN z.mes = 9  THEN 1 END) AS "09_Setiembre",
            count(CASE WHEN z.mes = 10 THEN 1 END) AS "10_Octubre",
            count(CASE WHEN z.mes = 11 THEN 1 END) AS "11_Noviembre",
            count(CASE WHEN z.mes = 12 THEN 1 END) AS "12_Diciembre"  
    FROM  
    ( SELECT      
    cg.n_unico ,
    cg.n_incidente ,
    cg.c_usuario_vocal      ,  
    ie.n_exp_sala n_num_recurso,
        ie.n_ano_sala n_ano_recurso ,
        mim.x_desc_motivo_ingreso nom_recurso , ie.c_especialidad,
    cg.f_programacion ,
    year(cg.f_programacion) anno,
    month(cg.f_programacion)  mes,
    cg.num_tipo_audiencia
    FROM instancia_expediente ie (INDEX insta_expe_unic)  noholdlock
    JOIN expediente e noholdlock
    ON e.n_unico=ie.n_unico
    AND e.n_incidente=ie.n_incidente
    JOIN conformacion_grupo   cg noholdlock
        ON ie.c_distrito = cg.c_distrito AND ie.c_provincia = cg.c_provincia
                AND ie.c_instancia = cg.c_instancia AND ie.n_unico = cg.n_unico
                AND ie.n_incidente = cg.n_incidente AND ie.f_ingreso = cg.f_ingreso
                AND cg.l_ultimo = 'S' AND cg.l_ultimo_audiencia = 'S'
                AND cg.l_reprogramado = 'N' AND cg.l_no_vista = 'N' AND cg.l_publicado = 'S'
                AND cg.c_usuario_vocal IS NOT NULL    
    JOIN grupo_programacion gp noholdlock ON 
		        gp.c_programacion = cg.c_programacion AND 
		        gp.n_grupo = cg.n_grupo  AND 
		        gp.n_secuencia = cg.n_secuencia     
	JOIN programacion_instancia prg noholdlock ON 
				prg.c_programacion = gp.c_programacion 
	LEFT JOIN cargo_detalle a (INDEX idx_cargo_detalle_07) noholdlock  
				ON a.n_unico		= ie.n_unico AND 
				   a.n_incidente	= ie.n_incidente AND 
				   a.cod_accion		= '013' AND 
				   a.ind_estado_detalle IN ('E','R') AND 
				   a.fec_envio_detalle >= prg.f_registro AND 
				   a.fec_envio_detalle = ( SELECT max(fec_envio_detalle) FROM cargo_detalle m (INDEX idx_cargo_detalle_07)	Noholdlock
		        							WHERE m.n_unico = a.n_unico AND 
		        							      m.n_incidente = a.n_incidente AND 
		        							      m.cod_accion		= '013' AND 
		        							      m.ind_estado_detalle IN ('E','R') )
    JOIN motivo_ingreso_maestro mim noholdlock ON mim.c_motivo_ingreso = ie.c_motivo_ingreso      
    WHERE ie.c_distrito = '50'
    AND  ie.c_provincia = '01'
    AND  ie.c_instancia =  '${n_sala}'    
    and  cg.f_programacion BETWEEN ${fecha}   
    AND ie.l_ultimo = 'S'
    AND cg.num_tipo_audiencia <> 5
    AND ISNULL(e.l_anulado,'N') = 'N'    
    AND  (( ie.c_especialidad ='PE' AND  NOT EXISTS
    				 (SELECT 1 FROM ResolucionEditorEnvioEst s noholdlock  
							WHERE 
								  s.ano_cargo = a.ano_cargo AND 
								  s.num_cargo = a.num_cargo AND 
								  s.n_unico	  = a.n_unico AND 
								  s.n_incidente=a.n_incidente and 
								  s.l_activo = 'S') 
					 ) OR 
		  ( ie.c_especialidad <> 'PE'  AND  NOT EXISTS
    				 (SELECT 1 FROM ResolucionEditorMovimientoDet s noholdlock  
							WHERE s.c_distrito = a.c_distrito AND 
								  s.ano_cargo = a.ano_cargo AND 
								  s.num_cargo = a.num_cargo AND 
								  s.n_unico	  = a.n_unico AND 
								  s.n_incidente=a.n_incidente and 
								  s.l_activo = 'S')	  )
		   )						  		 
     )  z 
    GROUP BY  z.c_usuario_vocal  
`;

const ListadoProgramacionesPonenteRecurso = (n_sala, fecha, ponente) => `
    SELECT  
        year(cg.f_programacion) AS '00_Año',
        s.x_descripcion AS '01_Mes',
        RTRIM(cg.c_usuario_vocal) AS '02_Ponente',
        RTRIM(mim.x_desc_motivo_ingreso) AS '03_Recurso',  
        ie.n_exp_sala AS '04_NumRecurso',
        ie.n_ano_sala AS '05_AñoRecurso' ,    
        CONVERT(varchar(10), ie.f_ingreso, 103) AS '06_FechaIngreso',  
        RTRIM(em.x_desc_estado) AS '07_EstadoExp',
        CONVERT(varchar(10), cg.f_programacion, 103) AS '08_FechaProgramacion',
        pao.x_descripcion AS '09_TipoAudiencia',
        datediff( dd, cg.f_programacion, getdate() ) AS '10_DiasPendiente',
        ISNULL (m.des_accion, '----------') AS '11_Accion',
        ISNULL (CONVERT(varchar(10), a.fec_envio_detalle, 103), '----------') AS '12_FechaEnvio',
        ISNULL (CONVERT(varchar(10), a.fec_recepcion_detalle, 103), '----------') AS '13_FechaRecepcion', 
        ISNULL (a.ano_cargo, '----------') AS '14_AñoCargo',
        ISNULL(CONVERT (VARCHAR(100), a.num_cargo), '----------')  AS '15_NumCargo'
    FROM instancia_expediente ie (index idx_inst_exp_011)  noholdlock
    JOIN expediente e noholdlock
    ON e.n_unico = ie.n_unico AND
    e.n_incidente = ie.n_incidente
    JOIN conformacion_grupo   cg noholdlock
            ON ie.c_distrito = cg.c_distrito AND ie.c_provincia = cg.c_provincia
                    AND ie.c_instancia = cg.c_instancia AND ie.n_unico = cg.n_unico
                    AND ie.n_incidente = cg.n_incidente AND ie.f_ingreso = cg.f_ingreso
                    AND cg.l_ultimo = 'S' AND cg.l_ultimo_audiencia = 'S'
                    AND cg.l_reprogramado = 'N' AND cg.l_no_vista = 'N' AND cg.l_publicado = 'S'
                    AND cg.c_usuario_vocal IS NOT NULL
            JOIN grupo_programacion gp noholdlock ON
        gp.c_programacion = cg.c_programacion AND
        gp.n_grupo = cg.n_grupo  AND
        gp.n_secuencia = cg.n_secuencia    
    JOIN programacion_instancia prg noholdlock ON
    prg.c_programacion = gp.c_programacion
    LEFT JOIN cargo_detalle a (INDEX idx_cargo_detalle_07) noholdlock  
    ON a.n_unico = ie.n_unico AND
    a.n_incidente = ie.n_incidente AND
    a.cod_accion = '013' AND
    a.ind_estado_detalle IN ('E','R') AND
    a.fec_envio_detalle >= prg.f_registro AND
    a.fec_envio_detalle = ( SELECT max(fec_envio_detalle) FROM cargo_detalle m (INDEX idx_cargo_detalle_07) Noholdlock
            WHERE m.n_unico = a.n_unico AND
                m.n_incidente = a.n_incidente AND
                m.cod_accion = '013' AND
                m.ind_estado_detalle IN ('E','R') )
            LEFT JOIN acciones_maestro m noholdlock  
    ON a.cod_accion = m.cod_accion
    JOIN motivo_ingreso_maestro mim noholdlock  
    ON ie.c_motivo_ingreso = mim.c_motivo_ingreso  
    JOIN expediente_estado ee noholdlock ON ee.n_unico = ie.n_unico
    AND ee.n_incidente = ie.n_incidente AND ee.l_ultimo = 'S'
        JOIN estado_maestro em noholdlock ON em.c_estado = ee.c_estado
        JOIN meses s ON s.n_mes = month(cg.f_programacion)
    LEFT JOIN tipo_programa_audiencia_organo pao (INDEX idx_tipo_programa_aud_org_001) NOHOLDLOCK
    ON pao.num_tipo_audiencia = cg.num_tipo_audiencia
    AND pao.c_org_jurisd = '01'
    AND pao.c_especialidad = ie.c_especialidad    
    WHERE ie.c_distrito = '50'
        AND ie.c_provincia = '01' 
        AND ie.c_instancia = '${n_sala}'    
        AND cg.f_programacion BETWEEN ${fecha}
        AND cg.c_usuario_vocal = '${ponente}' 
        AND ie.l_ultimo = 'S'
        AND cg.num_tipo_audiencia <> 5
        AND ISNULL(e.l_anulado,'N') = 'N'      
    AND  (( ie.c_especialidad ='PE' AND  NOT EXISTS
    				 (SELECT 1 FROM ResolucionEditorEnvioEst s noholdlock  
							WHERE 
								  s.ano_cargo = a.ano_cargo AND 
								  s.num_cargo = a.num_cargo AND 
								  s.n_unico	  = a.n_unico AND 
								  s.n_incidente=a.n_incidente and 
								  s.l_activo = 'S') 
					 ) OR 
		  ( ie.c_especialidad <> 'PE'  AND  NOT EXISTS
    				 (SELECT 1 FROM ResolucionEditorMovimientoDet s noholdlock  
							WHERE s.c_distrito = a.c_distrito AND 
								  s.ano_cargo = a.ano_cargo AND 
								  s.num_cargo = a.num_cargo AND 
								  s.n_unico	  = a.n_unico AND 
								  s.n_incidente=a.n_incidente and 
								  s.l_activo = 'S')	  )
		   )
    ORDER BY year(cg.f_programacion)  ,
        month(cg.f_programacion) ,
        cg.c_usuario_vocal,
        cg.f_programacion
`;

//QUERY ESCRITOS
const ListadoEscritosAnual = (fecha) => `
    SELECT 
    year(e.f_ingreso_acto) as '00_anno',  
    count(CASE WHEN e.c_instancia  = '101' THEN e.n_unico END) AS '101_SPP',			 
    count(CASE WHEN e.c_instancia  = '102' THEN e.n_unico END) AS '102_SPT', 		      
    count(CASE WHEN e.c_instancia  = '201' THEN e.n_unico END) AS '201_SCP',
    count(CASE WHEN e.c_instancia  = '202' THEN e.n_unico END) AS '202_SCT',
    count(CASE WHEN e.c_instancia  = '203' THEN e.n_unico END) AS '203_SDCP' ,
    count(CASE WHEN e.c_instancia  = '204' THEN e.n_unico END) AS '204_1SDCT' ,
    count(CASE WHEN e.c_instancia  = '206' THEN e.n_unico END) AS '206_2SDCT' ,
    count(CASE WHEN e.c_instancia  = '207' THEN e.n_unico END) AS '207_3SDCT'  ,
    count(CASE WHEN e.c_instancia  = '208' THEN e.n_unico END) AS '208_4SDCT' ,
    count(CASE WHEN e.c_instancia  = '209' THEN e.n_unico END) AS '209_5SDCT'   
    FROM escrito e
    JOIN instancia i
    ON i.c_distrito = e.c_distrito AND
    i.c_provincia = e.c_provincia AND
    i.c_instancia = e.c_instancia
    JOIN acto_procesal a
    ON a.c_acto_procesal = e.c_acto_procesal
    WHERE 
    e.c_distrito = '50'
    AND e.c_provincia = '01'
    AND e.c_instancia  IN   ('101', '102',   '201', '202', '203', '204',  '206', '207', '208', '209') 
    AND e.f_ingreso_acto BETWEEN ${fecha}
    AND IsNull(e.l_estado, '') <> 'A'
    AND a.l_parte = 'S'
    AND a.l_redistribucion = 'N'
    GROUP BY  year(e.f_ingreso_acto)
`;

const ListaTipoEscritos = (n_sala, fecha) => `
    SELECT 
    a.x_desc_acto_procesal AS '00_Tipo',
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 1 THEN e.f_ingreso_acto END) AS "01_Enero",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 2 THEN e.f_ingreso_acto END) AS "02_Febrero",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 3 THEN e.f_ingreso_acto END) AS "03_Marzo",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 4 THEN e.f_ingreso_acto END) AS "04_Abril",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 5 THEN e.f_ingreso_acto END) AS "05_Mayo",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 6 THEN e.f_ingreso_acto END) AS "06_Junio",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 7 THEN e.f_ingreso_acto END) AS "07_Julio",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 8 THEN e.f_ingreso_acto END) AS "08_Agosto",	   	   
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 9 THEN e.f_ingreso_acto END) AS "09_Setiembre",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 10 THEN e.f_ingreso_acto END) AS "10_Octubre",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 11 THEN e.f_ingreso_acto END) AS "11_Noviembre",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 12 THEN e.f_ingreso_acto END) AS "12_Diciembre"
    FROM escrito e
	JOIN instancia i
    ON i.c_distrito = e.c_distrito AND
    i.c_provincia = e.c_provincia AND
    i.c_instancia = e.c_instancia
	JOIN acto_procesal a
    ON a.c_acto_procesal = e.c_acto_procesal
    WHERE 
    e.c_distrito = '50'
	AND e.c_provincia = '01'
	AND e.c_instancia =  '${n_sala}'
	AND e.f_ingreso_acto BETWEEN ${fecha}
	AND IsNull(e.l_estado, '') <> 'A'
	AND a.l_parte = 'S'
	AND a.l_redistribucion = 'N'
    GROUP BY  a.x_desc_acto_procesal
`;

const ListadoEscritosPendienteAtendido = (n_sala, fecha) => `
    SELECT 
    (CASE WHEN e.f_respuesta IS NULL THEN 'PENDIENTES'  
    WHEN e.f_respuesta IS NOT NULL THEN 'ATENDIDOS' 
    WHEN isnull(e.l_estado,'X') = 'A' THEN 'ANULADOS'
    END ) AS  '00_Estados',
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 1 THEN e.f_ingreso_acto END) AS "01_Enero",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 2 THEN e.f_ingreso_acto END) AS "02_Febrero",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 3 THEN e.f_ingreso_acto END) AS "03_Marzo",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 4 THEN e.f_ingreso_acto END) AS "04_Abril",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 5 THEN e.f_ingreso_acto END) AS "05_Mayo",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 6 THEN e.f_ingreso_acto END) AS "06_Junio",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 7 THEN e.f_ingreso_acto END) AS "07_Julio",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 8 THEN e.f_ingreso_acto END) AS "08_Agosto",	   	   
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 9 THEN e.f_ingreso_acto END) AS "09_Setiembre",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 10 THEN e.f_ingreso_acto END) AS "10_Octubre",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 11 THEN e.f_ingreso_acto END) AS "11_Noviembre",
    count(CASE datepart(month,e.f_ingreso_acto) WHEN 12 THEN e.f_ingreso_acto END) AS "12_Diciembre"
    FROM escrito e
    JOIN instancia i
    ON i.c_distrito = e.c_distrito AND
    i.c_provincia = e.c_provincia AND
    i.c_instancia = e.c_instancia
    JOIN acto_procesal a
    ON a.c_acto_procesal = e.c_acto_procesal
    WHERE 
    e.c_distrito = '50'
    AND e.c_provincia = '01'
    AND e.c_instancia =  '${n_sala}'
    AND e.f_ingreso_acto BETWEEN ${fecha}
    AND IsNull(e.l_estado, '') <> 'A'
    AND a.l_parte = 'S'
    AND a.l_redistribucion = 'N'
    GROUP BY  (CASE WHEN e.f_respuesta IS NULL THEN 'PENDIENTES'  
    WHEN e.f_respuesta IS NOT NULL THEN 'ATENDIDOS' 
    WHEN isnull(e.l_estado,'X') = 'A' THEN 'ANULADOS'
    END )  
`;

export const scripts = {
    ListadoExpIngresos,
    ListadoIngresoMensualxTipRecurso,
    ListadoIngresoMensualxCorteProced,
    ListadoProgramaciones,
    ListadoProgramacionesPonente,
    ListadoProgramacionesFirmadoPonente,
    ListadoProgramacionesPonenteRecurso,
    ListadoEscritosAnual,
    ListaTipoEscritos,
    ListadoEscritosPendienteAtendido
};