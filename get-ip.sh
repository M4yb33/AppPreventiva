#!/bin/bash
# Script para obtener IP local en macOS/Linux

echo ""
echo "========================================"
echo "  Obteniendo tu IP local..."
echo "========================================"
echo ""

# Obtener IP
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -z "$IP" ]; then
    IP=$(ip addr | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d'/' -f1 | head -1)
fi

echo "Tu IP es: $IP"
echo ""
echo "========================================"
echo "PRÓXIMOS PASOS:"
echo "========================================"
echo ""
echo "1. Abre quickcalc-mobile/.env"
echo ""
echo "2. Reemplaza la URL con:"
echo "   EXPO_PUBLIC_API_URL=http://$IP:3000/api"
echo ""
echo "3. Inicia el backend:"
echo "   cd quickcalc-api"
echo "   npm run start:dev"
echo ""
echo "4. En otra terminal, inicia el mobile:"
echo "   cd quickcalc-mobile"
echo "   npm start"
echo ""
echo "========================================"
