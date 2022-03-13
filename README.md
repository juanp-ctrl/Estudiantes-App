# Estudiantes-App

<p align="center">
  <img src="https://github.com/juanp-ctrl/App-movil-en-web/blob/main/img/iconoapp_v3.png?raw=true" alt="Icono de la App"/>
</p>

## Objetivo del proyecto
Crear una aplicación de Android a partir de una aplicación web ya existente, esto haciendo uso de Capacitor JS

## Pasos de ejecución
1. Creamos los archivos base, es decir
  - El index.html con la estructura basica de html 5 
  - La carpeta assets en donde ira todas las carpetas y archivos de nuestra aplicación web ya creada 
  - El package.json que es generado una vez iniciemos nuestro paquete con npm
2. Instalamos los paquetes de capacitor necesarios
  - npm install @capacitor/core
  - npm install @capacitor/android
  - npm install @capacitor/cli --save-dev
3. Ejecutamos Capacitor con npx
  - npx cap init (Colocamos nombre de la app y ruta de los archivos del sitio web)
4. Ejecutamos Capacitor para crear la aplicación de Android
  - npx cap add android
5. Abrimos Android Studio
  - npx cap open android

## Modificar archivos
Si necesitamos modificar algun html, hoja de estilo o JavaScript usamos
1. Realizamos los cambios
2. npx cap copy android
3. Le damos a build en Android Studio
