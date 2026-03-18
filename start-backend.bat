@echo off
REM Inicio Simple del Backend - AppPreventiva

echo.
echo ============================================================
echo  Iniciando Backend API - QuickCalc
echo ============================================================
echo.

cd /d "%~dp0quickcalc-api"

echo Compil ando proyecto...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build falló
    pause
    exit /b 1
)

echo.
echo ✓ Build exitoso
echo.
echo Iniciando servidor en http://localhost:3000/api
echo Presiona Ctrl+C para detener el servidor
echo.

call npm start

pause
