@echo off
REM Inicio Simple del Mobile - AppPreventiva

echo.
echo ============================================================
echo  Iniciando Mobile App - QuickCalc
echo ============================================================
echo.

cd /d "%~dp0quickcalc-mobile"

echo.
echo Iniciando App con npm start
echo Presiona 't' en el menu para TUNNEL (recomendado)
echo Presiona Ctrl+C para salir
echo.

call npm start

pause
