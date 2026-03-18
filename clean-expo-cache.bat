@echo off
REM Limpiar caché de Expo y reiniciar
echo.
echo ============================================================
echo  Limpiador de Caché - Expo Mobile
echo ============================================================
echo.

cd /d "%~dp0quickcalc-mobile"

echo [1/4] Limpiando caché de Expo...
call npx expo-cli@latest cache clear 2>nul || echo "⚠️  Expo CLI no está disponible (OK)"

echo [2/4] Limpiando caché de Metro...
call npx expo cache clean 2>nul || echo "⚠️  OK"

echo [3/4] Eliminando node_modules...
rmdir /s /q node_modules >nul 2>&1
echo ✓ Eliminado

echo [4/4] Reinstalando dependencias...
call npm install

echo.
echo ============================================================
echo  ✓ LIMPIEZA COMPLETADA
echo ============================================================
echo.
echo Ahora ejecuta: npm start
echo.
pause
