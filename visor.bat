@echo off
echo === VISOR ORPHEON EN VIVO ===
echo Iniciando servidor local en visor/...

cd visor
http-server -p 8080
start http://localhost:8080/visor.html
