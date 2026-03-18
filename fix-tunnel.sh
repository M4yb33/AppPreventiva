#!/bin/bash
# Guía de troubleshooting para Expo Tunnel

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║              SOLUCIÓN: Expo Tunnel no Funciona                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "🔧 Paso 1: Limpiar caché de Expo"
cd quickcalc-mobile
rm -rf node_modules/.expo
rm -rf .expo
npx expo prebuild --clean
echo "✓ Caché limpiado"
echo ""

echo "🔧 Paso 2: Reinstalar dependencias"
npm install
echo "✓ Dependencias instaladas"
echo ""

echo "🔧 Paso 3: Iniciar Expo con Tunnel explícitamente"
echo ""
echo "Ejecuta uno de estos comandos:"
echo ""
echo "Opción A (Recomendado - Tunnel directo):"
echo "  npx expo start --tunnel"
echo ""
echo "Opción B (Tunnel con metro):"
echo "  npx expo start --clear --tunnel"
echo ""
echo "Opción C (Modo interactivo - presiona 't' después):"
echo "  npx expo start"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "💡 Tips:"
echo ""
echo "1. Si ves 'Tunnel is not connected':"
echo "   - Verifica tu conexión a internet"
echo "   - Reinicia Expo (Ctrl+C y vuelve a ejecutar)"
echo ""
echo "2. Si ves 'TypeError: Cannot read properties':"
echo "   - Ejecuta: npm install -g expo-cli@latest"
echo "   - Luego: npx expo start --tunnel"
echo ""
echo "3. Si la app dice 'Cannot reach API':"
echo "   - El backend está corriendo? npm run start:dev"
echo "   - CORS habilitado? Ya está en main.ts"
echo "   - Verifica .env tiene: EXPO_PUBLIC_API_URL=http://localhost:3000/api"
echo ""
echo "4. Si aún no funciona:"
echo "   - Usa ngrok: https://ngrok.com"
echo "   - O vuelve a misma WiFi (sin tunnel)"
echo ""
