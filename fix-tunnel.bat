@echo off
REM Solución para Expo Tunnel en Windows

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║        REPARAR: Expo Tunnel en Windows (Metro Error)          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo 🔧 Paso 1: Actualizar Expo CLI
echo.
npm install -g expo-cli@latest
echo ✓ Expo CLI actualizado
echo.

echo 🔧 Paso 2: Limpiar caché del proyecto
cd quickcalc-mobile
if exist ".expo" rmdir /s /q ".expo"
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.expo" rmdir /s /q "node_modules\.expo"
del /q .watchmanconfig 2>nul
echo ✓ Caché limpiado
echo.

echo 🔧 Paso 3: Verificar node_modules
npm install
echo ✓ Dependencias verificadas
echo.

echo.
echo ════════════════════════════════════════════════════════════════
echo.
echo ⚡ AVISO: "npx expo start --tunnel" da error en Windows
echo    (Error de cross-spawn: El sistema no puede encontrar ruta)
echo.
echo ✅ SOLUCIÓN: Usar "npm start" e luego presionar 't'
echo.
echo ════════════════════════════════════════════════════════════════
echo.

echo 📱 Iniciando Expo en Modo Interactivo...
echo.
echo Cuando veas el menú, presiona 't' para Tunnel
echo.

npm start

if errorlevel 0 (
    goto done
) else (
    goto error
)

:error
echo.

:done
echo ✅ Expo iniciado correctamente
pause
exit /b 0

:error
echo.
echo ❌ Error iniciando Expo
echo.
echo Soluciones adicionales:
echo 1. npm cache clean --force
echo 2. Borrar node_modules: rmdir /s /q node_modules
echo 3. Reinstalar: npm install
echo 4. Intentar de nuevo: npm start
echo.
pause
exit /b 1
