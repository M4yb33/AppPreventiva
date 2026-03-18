#!/bin/bash
# Script para iniciar Expo Tunnel correctamente (Mac/Linux)

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     Iniciando QuickCalc Mobile con Expo Tunnel (Reparado)     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")/quickcalc-mobile"

# Verificar que @expo/ngrok esté instalado
if ! npm list @expo/ngrok > /dev/null 2>&1; then
    echo "📦 Instalando @expo/ngrok (requerido para Tunnel)..."
    npm install --save-dev @expo/ngrok@^4.1.0
    echo ""
fi

echo "✅ @expo/ngrok instalado correctamente"
echo ""
echo "📱 Iniciando Expo en modo Tunnel..."
echo ""
echo "La próxima pantalla mostrará:"
echo "  • URLs de conexión"
echo "  • QR para escanear"
echo "  • Opciones de modo (t para tunnel, w para web, etc)"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""

npx expo start --tunnel
