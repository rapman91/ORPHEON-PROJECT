@echo off
echo === ORPHEON ENJAMBRE TOTAL ===

cd /d %~dp0

echo 🔁 Instalando dependencias...
call npm install

echo 🚀 Ejecutando enjambre completo...
start cmd /k "npm run orpheon"

echo 🌐 Iniciando visor en vivo...
cd visor
start http://localhost:8080/visor.html
start cmd /k "http-server -p 8080"
