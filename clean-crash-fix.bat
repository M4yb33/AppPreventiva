@echo off
echo ========================================
echo LIMPIEZA TOTAL - Solucion del CRASH
echo ========================================

cd quickcalc-mobile

echo.
echo [1/6] Deteniendo procesos...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo [2/6] Borrando node_modules completo...
rmdir /S /Q node_modules 2>nul
del /F /Q package-lock.json 2>nul

echo.
echo [3/6] Limpiando cache Expo...
rmdir /S /Q .expo 2>nul
rmdir /S /Q %USERPROFILE%\.expo 2>nul

echo.
echo [4/6] Limpiando cache Metro...
for /d %%x in (%LOCALAPPDATA%\Temp\metro-*) do rmdir /S /Q "%%x" 2>nul
for /d %%x in (%LOCALAPPDATA%\Temp\haste-map-*) do rmdir /S /Q "%%x" 2>nul

echo.
echo [5/6] Limpiando cache npm...
call npm cache clean --force

echo.
echo [6/6] Reinstalando dependencias...
call npm install --legacy-peer-deps

echo.
echo ========================================
echo LIMPIEZA COMPLETADA
echo ========================================
echo.
echo AHORA EJECUTA:
echo    npm start
echo LUEGO PRESIONA 't' para Tunnel
echo ========================================
pause
