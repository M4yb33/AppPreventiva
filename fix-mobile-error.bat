@echo off
echo ========================================
echo Solucion para error PlatformConstants
echo ========================================
echo.

cd quickcalc-mobile

echo [1/6] Deteniendo Metro Bundler...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo [2/6] Limpiando cache de Expo y Metro...
npx expo start --clear
rd /s /q .expo 2>nul
rd /s /q node_modules\.cache 2>nul

echo [3/6] Borrando node_modules y locks...
rd /s /q node_modules
del package-lock.json 2>nul
del yarn.lock 2>nul

echo [4/6] Limpiando cache de npm...
npm cache clean --force

echo [5/6] Instalando dependencias limpias...
npm install

echo [6/6] Iniciando Expo (presiona 't' para tunnel)...
echo.
echo IMPORTANTE: Una vez que inicie, presiona 't' para activar Tunnel
echo.
timeout /t 3
npm start

echo.
echo ========================================
echo Si el error persiste, escanea el QR
echo nuevamente con Expo Go
echo ========================================
