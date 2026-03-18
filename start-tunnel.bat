@echo off
REM Script para iniciar Expo con Tunnel automáticamente (Windows)
REM Workaround para error "El sistema no puede encontrar la ruta especificada"

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     Iniciando QuickCalc Mobile con Expo Tunnel (Reparado)     ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

cd quickcalc-mobile

echo 🔧 Paso 1: Limpiar caché de Metro...
echo.
rmdir /s /q .next 2>nul
del .watchmanconfig 2>nul
echo ✅ Caché limpiado
echo.

echo 📦 Paso 2: Verificar que expo-cli esté actualizado...
echo.
npm list -g expo-cli > nul 2>&1
if errorlevel 1 (
    echo Instalando expo-cli globalmente...
    npm install -g expo-cli
) else (
    echo ✅ expo-cli ya está instalado
)
echo.

echo 🚀 Paso 3: Iniciando Expo...
echo.
echo OPCIÓN A: Presiona 't' en el menú para Tunnel
echo OPCIÓN B: O corre directamente: npx expo start --tunnel
echo.
echo ════════════════════════════════════════════════════════════════
echo.

REM Usar npm start en lugar de npx expo start --tunnel directamente
REM Esto evita el error de cross-spawn en Windows
npm start

if errorlevel 1 (
    echo.
    echo ❌ Error iniciando Expo
    echo.
    echo Intenta lo siguiente:
    echo 1. Presiona 'npm start' en otra terminal
    echo 2. Espera a que salga el menú
    echo 3. Presiona 't' para Tunnel
    echo.
    pause
)
