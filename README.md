# Proyecto: 'RigoPlant' Parte I
<br><h4>
Estudiantes de la Universidad Valle del Momboy
Facultad de Ingeniería
Carrera Ingeniería en Computación
Asignatura Frontend II
</h4>
<br>
<h3>Colaboradores
</h3>
<ul>
<li>Rosimar Barrios  <i>C.I: 30.976.217</i></li>
<li>Cristian Rangel  <i>C.I: 31.898.075</i></li>
<li>Javier Olivar  <i>C.I: 30.737.648</i></li>
<li>José Marquéz  <i>C.I: 28.206.881</i></li>
</ul>


<h2>Descripción</h2>
<b>Link del video explicativo: https://youtu.be/hr67dl9tamg</b><br>
<b>Link del Diseño en Figma:</b> https://www.figma.com/file/CRu8yikZ3KNg9qNZNKk3cF/Proyecto-4.1-Frontend-II?type=design&node-id=0-1&mode=design&t=IBsO1naxaMBavOnV-0<br>
<b>Link de Herramienta para Gestionar el Proyecto:</b> https://buttercup-squirrel-32a.notion.site/Proyecto-RigoPlant-52ea4ea49374451a95ab58ec6d66a86e?pvs=4<br>

RigoPlant es una PWA que consiste en un Simulador de Riego que ayudará a sus usuarios a gestionar el riego de sus cultivos, además de los cuidados básicos que conlleva dando al usuario recordatorios diarios de las actividades que debe cumplir para ello.

Para le realización de proyecto empleamos el servidor de desarrollo Vite, librerías como Flowbite, React-Icons, y frameworks CSS como Tailwind. Para backend Nodejs, BD MongoDB. También su uso una API del clima que puedes conseguir en: <i>https://open-meteo.com/</i>.


<h2>Instalación y Arranque del Sistema</h2>
Todos estos procesos los realizaremos por "Símbolos de Sistema", es decir, el <b>terminal cmd</b>.

<h3>Paso 1 - Clonar Repositorio</h3>
<ol>
	<li>Luego de abrir el terminal, nos ubicamos en la ruta en donde deseamos clonar el repositorio, para ello usamos el comando <b>cd</b> junto con la dirección:
	```
	$ cd C:\ruta\Github\ruta
	```</li>
	<li>En el momento que nos encontremos en el lugar deseado, ahora ejecutaremos el comando de git <b>clone</b> junto con la ruta URL del repositorio en la web.
	```
	$ git clone https://github.com/rossjbm/Actividad4.1-FrontendII
	```</li> 
	<li>Y con esto el repositorio habrá sido clonado. Ahora si puedes ingresar a al por Visual Studio Code.</li>
</ol>
<h3>Paso 2 - Iniciar el Sistema (backend)</h3>
<ol>
	<li>Suponiendo que ya importaste la database de MongoDB <b>rigoplant</b>; y que a su vez ya abriste el servidor de MongoDB</li>
	<li>Abrimos en un editor de código la carpeta <b>BACKEND</b>.</li>
	<li>Abrir el terminal de nuestro editor de código o desde el terminal (ten en cuenta que debes estar ubicado en la carpeta indicada), e instalar npm (importante que tengas instalado nodemon también) con el siguiente comando:
	```
	$ npm i
	```</li> 
	<li>Al instalarse completamente el npm, podemos arrancar el Sistema del Cliente con:
	```
	$ npm run server
	```</li> 
	<li>Y con esto tenemos funcionando el Sistema del Servidor en la ruta <b>http://localhost:3000</b>.</li>
</ol>
<h3>Paso 3 - Iniciar el Sistema (frontend)</h3>
<ol>
	<li>Abrimos en un editor de código la carpeta <b>FRONTEND</b>.</li>
	<li>Abrir el terminal de nuestro editor de código o desde el terminal (ten en cuenta que debes estar ubicado en la carpeta indicada), e instalar npm con el siguiente comando:
	```
	$ npm i
	```</li> 
	<li>Al instalarse completamente el npm, podemos arrancar el Sistema del Cliente con:
	```
	$ npm run dev
	```</li> 
	<li>Y con esto tenemos funcionando el Sistema del Cliente, de forma automática este abrirá nuestro navegador predeterminado con la ruta <b>http://localhost:5000</b>.</li>
</ol>

<h2>Detalles Importantes</h2>
Como se trata de la primera parte de nuestro proyecto, este cuenta con las siguientes funcionalidades:
<ul>
<li>Estructura Base (Navegador funcional y footer)</li>
<li>Modo Oscuro</li>
<li>Landing Page</li>
<li>Ver cultivos y sus detalles</li>
<li>Agregar Cultivos</li>
<li>Formulario saber si es ideal sembrar</li>
<li>Calendario Mensual</li>
<li>Tareas diarias de riego</li>
</ul>

Proximamente añadiremos las nuevas actualizaciones y toda la funcionalidad completa.


<h2>FIN</h2>
