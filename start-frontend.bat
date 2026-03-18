@echo off
REM Inicio Simple del Frontend - AppPreventiva

echo.
echo ============================================================
echo  Iniciando Frontend Dashboard - QuickCalc
echo ============================================================
echo.

cd /d "%~dp0quickcalc-dashboard"

echo Iniciando servidor en http://localhost:3001
echo Presiona Ctrl+C para detener el servidor
echo.

call npm run dev -- -p 3001

pause
