@echo off
REM Reiniciar Expo con Clean State

echo.
echo ============================================================
echo  Reiniciando Expo Mobile - Clean
echo ============================================================
echo.

cd /d "%~dp0quickcalc-mobile"

echo Iniciando Metro bundler...
echo.
echo Si ves errores:
echo 1. Presiona Ctrl+C
echo 2. Ejecuta: clean-expo-cache.bat
echo 3. Vuelve a ejecutar este script
echo.
echo Presiona 't' en el menu para TUNNEL
echo.

call npm start -- --clear

pause
