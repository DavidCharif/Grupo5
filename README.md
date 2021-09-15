# Grupo5
# Estudiantes Mision TIC 2022


Para añadir el remoto del grupo
$*git remote add origin https://github.com/DavidCharif/Grupo5*



Para confirmar que si es
$ *git remote -v*


**Debe imprimir**
> origin  https://github.com/DavidCharif/Grupo5 (fetch)
> origin  https://github.com/DavidCharif/Grupo5 (push) 



**Para actualizar el repositorio del equipo en caso de que se hayan hecho cambio en los archivos**

Recibir actualizaciones de repositorios remotos, git fetch y git pull
Se pueden emplear dos comandos para actualizar un repositorio:

* **git fetch** sincroniza el proyecto local con el remoto, recibe los datos que no se tienen localmente y señala donde estaba cada rama en ese repositorio cuando se ha sincronizado. Estas ramas remotas son iguales que las ramas locales pero no se pueden eliminar, aunque puedes unirlas (merge), ver los cambios (diff), ver históritos (log)... Lo ideal es hacer las acciones necesarias antes de sincronizar.
* **git pull** es como git fetch seguido de git merge en la rama a la que ese remoto está ligado con la actual. Es un comando más rápido que utilizar fetch y merge, aunque a veces puede dar algún problema.
Por ejemplo si quieres actualizar tu repositorio actual con el remoto, primero se haría git fetch [alias] para recibir los datos que no tienes actualizados, y después git merge [alias]/[branch] para unirlos a la rama actual.
