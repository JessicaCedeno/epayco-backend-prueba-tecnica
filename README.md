**Prueba Técnica - Documentación**

Este repositorio contiene la implementación de dos servicios principales:

**Servicios SOAP :** Desarrollados en Laravel.

**Servicios REST :** Desarrollados en Node.js con Express.


A continuación, se describen los detalles de cada servicio, las dependencias necesarias y los pasos para ejecutar el proyecto.


Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente en tu máquina:

PHP.
Composer.
Node.js y npm .
Redis (requerido para el manejo de OTP y caché).

**Configuración del Proyecto
  Servicios SOAP (Laravel)**
  
**1. Instalación**
- Clonar este repositorio en tu máquina local
- Instala las dependencias de Laravel usando Composer: (composer install)
  
**2. Configuración de Redis**
- Configura las credenciales de Redis en el archivo .env del proyecto.

**3. Ejecución del Servidor Laravel**
- Inicia el servidor de Laravel en el puerto 8000 => (php artisan serve --port=8000)
- Los servicios SOAP estarán disponibles en: (http://localhost:800/soap)
- El WSDL estara disponible en http://localhost:8000/wsdl


**Servicios REST (Node.js- express)**

**1. Instalación**

- Clonar este repositorio en tu máquina local.
- Instala las dependencias del proyecto con npm

**2. Ejecución del Servidor Node.js**
- Inicia el servidor de desarrollo en el puerto 3000  => (npm run start:dev)
- Los servicios REST estarán disponibles en: (http://localhost:3000/api)

**Implementaciones Personalizadas**

Manejo de Tokens OTP en Redis
Se implementó una solución personalizada para el manejo de tokens OTP (One-Time Password) utilizando Redis. Las características clave son:

**Almacenamiento Seguro :** Los OTP se almacenan en Redis de forma hasheada para garantizar la seguridad.
**Expiración Automática :** Cada OTP tiene una duración máxima de 15 minutos . Después de este tiempo, el OTP se invalida automáticamente.
**Inhabilitación tras Uso : ** Una vez que un OTP es utilizado, se marca como inválido en Redis para evitar su reutilización.
Para que esta funcionalidad funcione correctamente, es necesario que Redis esté corriendo en tu máquina.


     
