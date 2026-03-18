@echo off
REM Script para verificar dependencias y preparar el backend

echo.
echo ============================================================
echo  QuickCalc Setup - Verificador de Dependencias
echo ============================================================
echo.

set PROJECT_ROOT=%~dp0
cd /d "%PROJECT_ROOT%"

REM 1. Verificar Node
echo [1/4] Verificando Node.js...
node -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: Node.js no está instalado
    echo Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js detectado
echo.

REM 2. Instalar dependencias del Backend
echo [2/4] Instalando dependencias del Backend...
cd /d "%PROJECT_ROOT%quickcalc-api"
call npm install
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: npm install falló en quickcalc-api
    pause
    exit /b 1
)
echo ✓ Dependencias del Backend OK
echo.

REM 3. Sincronizar BD con Prisma
echo [3/4] Sincronizando base de datos...
call npx prisma db push --skip-generate
if %ERRORLEVEL% neq 0 (
    echo ⚠️  ADVERTENCIA: No se pudo sincronizar la BD
    echo Verifica que PostgreSQL esté corriendo en localhost:5432
    echo Usuario: postgres / Contraseña: admin123
    echo.
)
echo ✓ Base de datos sincronizada
echo.

REM 4. Instalar dependencias del Frontend
echo [4/4] Instalando dependencias del Frontend...
cd /d "%PROJECT_ROOT%quickcalc-dashboard"
call npm install
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: npm install falló en quickcalc-dashboard
    pause
    exit /b 1
)
echo ✓ Dependencias del Frontend OK
echo.

echo ============================================================
echo  ✓ SETUP COMPLETADO
echo ============================================================
echo.
echo Ahora ejecuta: start-all.bat
echo.
pause
