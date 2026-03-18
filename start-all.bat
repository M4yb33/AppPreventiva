@echo off
REM Script para iniciar todos los servicios de AppPreventiva
REM Abre 3 terminales separadas para cada servicio

echo.
echo ============================================================
echo  QuickCalc AppPreventiva - Iniciador de Servicios
echo ============================================================
echo.

REM Variables
set PROJECT_ROOT=%~dp0
cd /d "%PROJECT_ROOT%"

REM Verificar si node está instalado
node -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js no está instalado o no está en el PATH
    echo Instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detectado
echo.

REM 1. Backend API
echo [1/3] Iniciando Backend API en puerto 3000...
start cmd /k "cd /d \"%PROJECT_ROOT%quickcalc-api\" && npm run start:dev"
timeout /t 3 /nobreak

REM 2. Frontend Dashboard
echo [2/3] Iniciando Frontend Dashboard en puerto 3001...
start cmd /k "cd /d \"%PROJECT_ROOT%quickcalc-dashboard\" && npm run dev -- -p 3001"
timeout /t 2 /nobreak

REM 3. Mobile App
echo [3/3] Iniciando Mobile App (Expo)...
start cmd /k "cd /d \"%PROJECT_ROOT%quickcalc-mobile\" && npm start"

echo.
echo ============================================================
echo  SERVICIOS INICIADOS
echo ============================================================
echo.
echo 1. Backend:  http://localhost:3000/api
echo 2. Frontend: http://localhost:3001
echo 3. Mobile:   Expo (presiona 't' para Tunnel)
echo.
echo Cierra cualquiera de estas ventanas para detener ese servicio.
echo ============================================================
echo.
pause
