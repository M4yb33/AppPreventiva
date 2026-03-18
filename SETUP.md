# 🚀 Aquí está TODO lo que necesitas saber para correr el proyecto

## 1️⃣ Obtén tu IP local

### Windows
```bash
ipconfig | findstr "IPv4"
```
Busca la IP que dice algo como `192.168.x.x` o `10.0.x.x`

### macOS / Linux
```bash
ifconfig | grep "inet "
```

---

## 2️⃣ Configura el .env del móvil

Ve a `quickcalc-mobile/.env` y actualiza:

```env
EXPO_PUBLIC_API_URL=http://TU_IP:3000/api
```

**Ejemplo:**
```env
EXPO_PUBLIC_API_URL=http://192.168.18.9:3000/api
```

---

## 3️⃣ Inicia el Backend

```bash
cd quickcalc-api
npm run start:dev
```

Deberías ver:
```
🚀 QuickCalc API Server
📍 Server running on: http://0.0.0.0:3000
📱 Mobile access: http://192.168.18.9:3000/api
```

---

## 4️⃣ Inicia el Frontend (Dashboard)

En otra terminal:
```bash
cd quickcalc-dashboard
npm run dev
```

Luego abre: `http://localhost:3002`

---

## 5️⃣ Inicia el Mobile con Expo

En otra terminal:
```bash
cd quickcalc-mobile
npm start
```

Deberías ver un QR. Abre **Expo Go** en tu móvil y:
- **Android**: Escanea el QR
- **iOS**: Presiona + en Expo Go y selecciona el proyecto

---

## ⚠️ Si no funciona:

### Error: "Network request failed"
1. ✓ Verifica que la IP en `.env` sea correcta
2. ✓ Asegúrate que el móvil y PC están en **la misma WiFi**
3. ✓ Verifica que el backend esté corriendo en `http://0.0.0.0:3000`

### Error: "Cannot GET /api/..."
- El backend no se inició correctamente
- Verifica que el puerto 3000 esté disponible

### Error: "CORS"
- Ya está habilitado en el backend, pero si hay problemas:
  - Reinicia el backend
  - Limpia la caché de Expo: `expo-cli rm -rf .expo`

---

## 📱 Cómo usar la app móvil

### Calculadora Normal
- Abre la app
- Usa como una calculadora normal

### Código de Emergencia
- Digita: `2580`
- Presiona: `=`
- **Resultado**: Envía alerta silenciosamente con ubicación

### Código de Configuración
- Digita: `0000`
- Presiona: `=`
- **Resultado**: Abre configuración oculta para cambiar códigos

---

## 🔍 Verificar que todo funciona

1. **Backend**: Abre en el navegador → `http://192.168.18.9:3000/api/health`
2. **Frontend**: Debe estar en → `http://localhost:3002`
3. **Mobile**: Debe conectar vía Expo Go

---

## 🛠️ Comandos útiles

```bash
# Backend
cd quickcalc-api
npm run start:dev        # Modo desarrollo
npm run build            # Compilar

# Frontend
cd quickcalc-dashboard
npm run dev             # Modo desarrollo
npm run build           # Compilar

# Mobile
cd quickcalc-mobile
npm start               # Iniciar Expo
npx expo-cli reset      # Limpiar caché si hay problemas
```

---

## 📊 Estructura Final

```
AppPreventiva/
├── quickcalc-api/          ← Backend (puerto 3000)
├── quickcalc-dashboard/    ← Frontend Web (puerto 3002)
├── quickcalc-mobile/       ← Mobile Expo Go
├── .gitignore
└── README.md
```

---

**¡Listo!** Ahora deberías poder correr todo sin problemas. 🎉
