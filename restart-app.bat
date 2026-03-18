@echo off
echo ========================================
echo REINICIANDO APP - Solucion codigo 0000
echo ========================================

echo.
echo [1/3] Deteniendo procesos...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo [2/3] Limpiando cache mobile...
cd quickcalc-mobile
rmdir /S /Q .expo 2>nul
cd ..

echo.
echo [3/3] Iniciando backend...
start "QuickCalc API" cmd /k "cd quickcalc-api && npm run start:dev"

timeout /t 5 >nul

echo.
echo ========================================
echo BACKEND INICIADO
echo ========================================
echo.
echo AHORA EJECUTA EN OTRA TERMINAL:
echo    cd quickcalc-mobile
echo    npm start
echo.
echo Luego presiona 't' para Tunnel
echo ========================================
pause
