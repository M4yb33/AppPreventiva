# 🚀 GUÍA RÁPIDA: Conectar Mobile sin Misma Red

## El Problema
El móvil no puede conectar a `localhost` o a `192.168.x.x` si no está en la misma WiFi.

## Las 3 Soluciones (en Orden de Facilidad)

### ✅ SOLUCIÓN 1: Expo Tunnel (Recomendado - MÁS FÁCIL)

**Lo que necesitas:**
- Solo Expo Go (ya tienes)
- Conexión a internet

**Pasos:**

1. Abre `quickcalc-mobile/.env`

2. Asegúrate que dice:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

3. Inicia el backend:
   ```bash
   cd quickcalc-api
   npm run start:dev
   ```

4. En otra terminal, inicia Expo:
   ```bash
   cd quickcalc-mobile
   npm start
   ```

5. **En la terminal de Expo**, presiona:
   - **`t`** para activar Tunnel
   - **O** presiona **`w`** para web

6. Escanea el QR con **Expo Go** en tu móvil

**¡Listo!** Funciona desde cualquier red. 🎉

---

### ✅ SOLUCIÓN 2: ngrok (MÁS POTENTE)

**Lo que necesitas:**
- Descargar ngrok (5 minutos)
- Crear cuenta gratuita (2 minutos)

**Pasos:**

1. **Descargar ngrok:**
   - Ve a: https://ngrok.com/download
   - Descarga para Windows/Mac/Linux

2. **Crear cuenta gratuita:**
   - https://ngrok.com
   - Copia tu **Auth Token**

3. **Configurar ngrok:**
   ```bash
   ngrok config add-authtoken tu_token_aqui
   ```

4. **En una terminal, exponer tu backend:**
   ```bash
   ngrok http 3000
   ```

   Verás algo como:
   ```
   Forwarding    https://abc123def456.ngrok.io -> http://localhost:3000
   ```

5. **Copia esa URL** (sin el `->`, solo la primera parte)

6. **Actualiza** `quickcalc-mobile/.env`:
   ```env
   EXPO_PUBLIC_API_URL=https://abc123def456.ngrok.io/api
   ```

7. **Inicia Expo:**
   ```bash
   cd quickcalc-mobile
   npm start
   ```

8. Escanea con **Expo Go**

**¡Funciona!** Desde cualquier lugar del mundo. 🌍

---

### ✅ SOLUCIÓN 3: Script Interactivo (AUTOMÁTICO)

Windows:
```bash
setup-connection.bat
```

Te pedirá elegir opción y te guía paso a paso.

---

## Comparación Rápida

| Solución | Instalación | Facilidad | Recomendado |
|----------|-------------|-----------|------------|
| **Expo Tunnel** | 0 min | ⭐⭐⭐⭐⭐ | ✅ MEJOR |
| **ngrok** | 5 min | ⭐⭐⭐⭐ | ✅ Producción |
| **Script** | 0 min | ⭐⭐⭐⭐⭐ | ✅ Fácil |

---

## 🆘 Si Algo No Funciona

**"Cannot reach API"**
→ Verifica que el backend esté corriendo en `npm run start:dev`

**"QR no funciona"**
→ Presiona `s` en Expo para recargar

**"Timeout"**
→ Tu internet es lento, aumenta el timeout en `src/lib/constants.ts`

---

## 📚 Documentación Completa

Lee `NETWORK_SOLUTIONS.md` para más detalles y opciones avanzadas.

---

## ⚡ TL;DR (Muy Rápido)

```bash
# Terminal 1: Backend
cd quickcalc-api && npm run start:dev

# Terminal 2: Mobile con Tunnel
cd quickcalc-mobile
echo "EXPO_PUBLIC_API_URL=http://localhost:3000/api" > .env
npm start
# Presiona 't' cuando aparezca el menú
```

**¡Eso es todo!** 🚀
