@echo off
echo ========================================
echo LIMPIEZA TOTAL SDK 54 - SOLUCION FINAL
echo ========================================

cd quickcalc-mobile

echo.
echo [1/7] Deteniendo procesos Metro/Expo...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo [2/7] Limpiando cache Expo...
rmdir /S /Q .expo 2>nul
rmdir /S /Q %USERPROFILE%\.expo 2>nul
rmdir /S /Q %LOCALAPPDATA%\Expo 2>nul

echo.
echo [3/7] Limpiando cache Metro...
rmdir /S /Q %LOCALAPPDATA%\Temp\metro-* 2>nul
rmdir /S /Q %LOCALAPPDATA%\Temp\haste-map-* 2>nul

echo.
echo [4/7] Borrando node_modules...
rmdir /S /Q node_modules

echo.
echo [5/7] Borrando package-lock.json...
del /F /Q package-lock.json 2>nul

echo.
echo [6/7] Limpiando cache npm...
call npm cache clean --force

echo.
echo [7/7] Instalando dependencias SDK 54...
call npm install

echo.
echo ========================================
echo LIMPIEZA COMPLETA - AHORA EJECUTA:
echo    cd quickcalc-mobile
echo    npm start
echo Luego presiona 't' para Tunnel
echo ========================================
pause
