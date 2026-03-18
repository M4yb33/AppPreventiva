@echo off
REM Script para obtener IP local en Windows

echo.
echo ========================================
echo   Obteniendo tu IP local...
echo ========================================
echo.

REM Obtener IP IPv4
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /C:"IPv4"') do (
    set "IP=%%A"
    set "IP=!IP:~1!"
    echo Tu IP es: !IP!
)

echo.
echo ========================================
echo PRÓXIMOS PASOS:
echo ========================================
echo.
echo 1. Abre quickcalc-mobile\.env
echo.
echo 2. Reemplaza la URL con:
echo    EXPO_PUBLIC_API_URL=http://!IP!:3000/api
echo.
echo 3. Inicia el backend:
echo    cd quickcalc-api
echo    npm run start:dev
echo.
echo 4. En otra terminal, inicia el mobile:
echo    cd quickcalc-mobile
echo    npm start
echo.
echo ========================================
