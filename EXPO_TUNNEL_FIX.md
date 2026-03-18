# 🔧 GUÍA COMPLETA: Hacer que Expo Tunnel Funcione

## El Problema
Expo Tunnel no se conecta o da errores al iniciar.

## Solución Paso a Paso

### ✅ Paso 1: Actualizar Expo CLI

```bash
npm install -g expo-cli@latest
```

Esto asegura que tienes la última versión.

### ✅ Paso 2: Limpiar Todo

```bash
cd quickcalc-mobile

# Windows
rmdir /s /q node_modules\.expo 2>nul
rmdir /s /q .expo 2>nul

# Mac/Linux
rm -rf node_modules/.expo .expo
```

### ✅ Paso 3: Reinstalar Dependencias

```bash
npm install
```

### ✅ Paso 4: Verificar Configuración

Abre `quickcalc-mobile/.env` y verifica:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

(Nota: NO uses la IP, usa `localhost` con Tunnel)

### ✅ Paso 5: Iniciar Backend PRIMERO

**En una terminal:**

```bash
cd quickcalc-api
npm run start:dev
```

Debes ver:
```
🚀 QuickCalc API Server
📍 Server running on: http://0.0.0.0:3000
```

### ✅ Paso 6: Iniciar Expo con Tunnel

**En otra terminal:**

```bash
cd quickcalc-mobile

# Opción A: Tunnel directo (más directo)
npx expo start --tunnel

# Opción B: Tunnel con info extra (si A no funciona)
npx expo start --clear --tunnel

# Opción C: Interactivo (presiona 't' cuando veas el menú)
npm start
```

### ✅ Paso 7: Scannear QR

Cuando veas el QR en la terminal:

- **Android**: Abre Expo Go → escanea QR
- **iOS**: Abre Expo Go → presiona + → escanea QR

---

## 🆘 Si Aún No Funciona

### Error 1: "Tunnel is not connected"

```bash
# Solución:
npm install -g expo-cli@latest
npx expo start --tunnel
```

### Error 2: "Cannot reach API"

**Verifica:**
1. Backend corriendo: `http://localhost:3000/api` (en tu PC)
2. `.env` del mobile tiene: `EXPO_PUBLIC_API_URL=http://localhost:3000/api`
3. CORS habilitado en backend (ya está)

```bash
# Reinicia el backend
cd quickcalc-api
npm run start:dev
```

### Error 3: "Socket timeout" / "ECONNREFUSED"

Tunnel está lento o hay problema de red:

```bash
# Intenta con estos pasos:
1. Cierra todo (Ctrl+C)
2. npm cache clean --force
3. npm install
4. npx expo start --tunnel --verbose

# El --verbose te mostrará qué está pasando
```

### Error 4: "Metro server not responding"

```bash
# Solución completa:
cd quickcalc-mobile
rm -rf .expo node_modules/.cache
npx expo start --clear --tunnel
```

---

## 🎯 Scripts Automáticos

### Windows

```bash
# Script que lo hace por ti:
fix-tunnel.bat

# O simplemente:
start-tunnel.bat
```

### Mac/Linux

```bash
# Script que lo hace por ti:
bash fix-tunnel.sh

# O simplemente:
bash start-tunnel.sh
```

---

## 📋 Checklist de Inicio Rápido

- [ ] Backend corriendo: `cd quickcalc-api && npm run start:dev`
- [ ] Visto "🚀 QuickCalc API Server" en terminal del backend
- [ ] `.env` del mobile tiene `localhost` (no IP)
- [ ] Terminal del mobile: `npm start` o `npx expo start --tunnel`
- [ ] Visto el QR en terminal
- [ ] Expo Go abierto en móvil
- [ ] Escanear el QR
- [ ] ¡Debería funcionar!

---

## 🚨 Plan B: Si Tunnel Sigue Sin Funcionar

Si después de todo esto Tunnel aún no funciona:

**USA NGROK:**

```bash
# 1. Descargar ngrok: https://ngrok.com
# 2. Configurar:
ngrok config add-authtoken TU_TOKEN

# 3. Exponer backend:
ngrok http 3000

# 4. Ver URL como:
# Forwarding    https://abc123.ngrok.io -> http://localhost:3000

# 5. Actualizar .env:
EXPO_PUBLIC_API_URL=https://abc123.ngrok.io/api

# 6. Iniciar Expo normal:
npm start
```

---

## 💡 Pro Tips

1. **Usa `--verbose` para ver logs:**
   ```bash
   npx expo start --tunnel --verbose
   ```

2. **Si cambias IP o red, limpiar todo:**
   ```bash
   npx expo start --clear --tunnel
   ```

3. **Para una experiencia mejor, usa ngrok** (más confiable que Tunnel para redes complejas)

4. **Si el móvil se desconecta, presiona `r` en Expo** para recargar

---

## 📞 Si Nada Funciona

1. Usa **ngrok** (alternativa comprobada)
2. Vuelve a **misma WiFi** (solución más simple)
3. Abre una issue con el error exacto que ves

¡Éxito! 🚀
