@echo off
REM Script interactivo para configurar conexión al API

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         CONFIGURADOR DE CONEXIÓN - QuickCalc Mobile          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Selecciona tu método de conexión:
echo.
echo [1] Misma WiFi (Recomendado si están juntos)
echo [2] Expo Tunnel (Internet - Más fácil)
echo [3] ngrok (Internet - Más potente)
echo [4] Ver tu IP local
echo.

set /p opcion="Elige una opción (1-4): "

if "%opcion%"=="1" goto sameNetwork
if "%opcion%"=="2" goto expoTunnel
if "%opcion%"=="3" goto ngrok
if "%opcion%"=="4" goto getIp

:sameNetwork
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo               CONFIGURACIÓN: MISMA WIFI
echo ════════════════════════════════════════════════════════════════
echo.

echo Obteniendo tu IP local...
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /C:"IPv4"') do (
    set "IP=%%A"
    set "IP=!IP:~1!"
    echo.
    echo Tu IP es: !IP!
    echo.
)

echo.
echo 📝 Actualiza quickcalc-mobile\.env con:
echo.
echo    EXPO_PUBLIC_API_URL=http://!IP!:3000/api
echo.
echo ✓ Guarda el archivo
echo ✓ Reinicia Expo Go
echo.
pause
exit /b

:expoTunnel
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo               CONFIGURACIÓN: EXPO TUNNEL
echo ════════════════════════════════════════════════════════════════
echo.
echo Expo utiliza un túnel automático. Sigue estos pasos:
echo.
echo 1. Abre quickcalc-mobile\.env
echo.
echo 2. Cambia la línea a:
echo    EXPO_PUBLIC_API_URL=http://localhost:3000/api
echo.
echo 3. Inicia Expo:
echo    cd quickcalc-mobile
echo    npm start
echo.
echo 4. En el menú de Expo, busca "Tunnel" o presiona 't'
echo.
echo 5. Escanea el QR con Expo Go
echo.
echo 📚 Más info: https://docs.expo.dev/build-reference/tunneling/
echo.
pause
exit /b

:ngrok
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo                  CONFIGURACIÓN: NGROK
echo ════════════════════════════════════════════════════════════════
echo.
echo ngrok crea un túnel a tu PC desde internet.
echo.
echo Sigue estos pasos:
echo.
echo 1. Descarga ngrok desde: https://ngrok.com
echo.
echo 2. Crea una cuenta gratuita y obtén tu Auth Token
echo.
echo 3. En una terminal, configura ngrok:
echo    ngrok config add-authtoken TU_TOKEN_AQUI
echo.
echo 4. Expone tu backend:
echo    ngrok http 3000
echo.
echo 5. Verás algo como:
echo    Forwarding  https://abc123def.ngrok.io -^> http://localhost:3000
echo.
echo 6. Copia esa URL (abc123def.ngrok.io) y actualiza .env:
echo    EXPO_PUBLIC_API_URL=https://abc123def.ngrok.io/api
echo.
echo 7. Reinicia Expo y escanea el QR
echo.
echo 📚 Documentación: https://ngrok.com
echo.
pause
exit /b

:getIp
cls
echo.
echo ════════════════════════════════════════════════════════════════
echo                     TU IP LOCAL
echo ════════════════════════════════════════════════════════════════
echo.
ipconfig | findstr /C:"IPv4"
echo.
pause
goto start
