1. Requerimientos:
    - instalar nodejs
    - instalar redis desde la carpeta raiz del proyecto, redis se iniciar justo con windows.
    - instalar Nginx, descomprimir .rar en el disco C://, buscar el archivo nginx.exe dar click para iniciar.
    - instalar pm2 con comando (debe tener nodejs y acceso a internet): npm install pm2 -g 
    - instalar pm2 sin internet ingresar a la carpeta de instaldores del proyecto con cmd y ejecutar: pm2 install pm2-2.9.1.tgz

2. Despliegue comandos:
    - npm run dev => comando para correr el proyecto en modo desarrollo
    - npm run build => comando para desplegar el proyecto a produccion
    - npm run server => comando para correr el proyecto en produccion

NOTA: Para usar pm2 y nginx el proyecto debe estart desplegado en produccion
      con el comando npm run build.

3. Comandos pm2 para desplegar el proyecto
    # C:\Users\PJUDICIAL\Desktop\ServiceRestGraphicPj> pm2 start ecosystem.config.js
    - iniciar cmd en la ruta del proyecto:
        - pm2 start ecosystem.config.js
    - ver la lista de los proyecto deplegados con pm2:
        - pm2 list
    - ver el monitorio de los cluster del proyecto:
        - pm2 monit
    - reiniciar todos los cluster del proyecto:
        - pm2 restart all
    - detener todos los cluster del proyecto:
        - pm2 stop all
    - eliminar todos los cluster del proyecto:
        - pm2 delete all
    - ver los logs de los cluster del proyecto:
        - pm2 logs
    -limpiar los logs:
        - pm2 flush
        - pm2 reloadLogs

4. Comandos nginx
    # ingresar al cmd en la ruta C:\Nginx
    - Para iniciar dar click en el nginx.exe
        nginx -s stop	    Rapid shutdown
        nginx -s quit	    Graceful shutdown
        nginx -s reload	    Changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
        nginx -s reopen	    Reopening log files
