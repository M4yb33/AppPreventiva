# 🌐 Soluciones para Conectar sin Misma Red WiFi

Si el móvil y la PC **NO están en la misma red**, aquí hay **3 opciones**:

---

## ✅ Opción 1: Expo Tunnel (Recomendado - Más Fácil)

Expo proporciona un túnel gratuito que expone tu backend públicamente.

### Paso 1: Usar Tunneling en Expo

```bash
cd quickcalc-mobile
npm start
```

En el menú de Expo, presiona:
- **`w`** para web
- O presiona **`t`** para usar Tunnel (si está disponible)

### Paso 2: Actualizar el .env

En `quickcalc-mobile/.env`, deja la URL como placeholder:

```env
# Expo utilizará el tunnel automáticamente
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

### Paso 3: En tu Backend, permite Origen desde Expo Tunnel

El CORS ya está configurado con `origin: '*'`, así que debería funcionar automáticamente.

**Ventajas:**
- ✅ No requiere instalación adicional
- ✅ Funciona automáticamente
- ✅ Excelente para desarrollo

**Desventajas:**
- ⚠️ Requiere internet estable
- ⚠️ Un poco más lento

---

## ✅ Opción 2: ngrok (Alternativa Potente)

ngrok crea un túnel seguro desde tu PC al internet.

### Paso 1: Descargar ngrok

```bash
# En Windows (o descarga desde ngrok.com)
choco install ngrok

# En Mac
brew install ngrok

# En Linux
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip
unzip ngrok-v3-stable-linux-amd64.zip
```

### Paso 2: Crear Cuenta ngrok (Gratis)

1. Ve a https://ngrok.com
2. Crea una cuenta gratuita
3. Copia tu **Auth Token**

### Paso 3: Configurar ngrok

```bash
ngrok config add-authtoken TU_AUTH_TOKEN_AQUI
```

### Paso 4: Exponer tu Backend

```bash
# En una terminal, corre ngrok
ngrok http 3000
```

Verás algo como:
```
Forwarding                    https://abc123def456.ngrok.io -> http://localhost:3000
```

### Paso 5: Actualizar .env del Mobile

```env
EXPO_PUBLIC_API_URL=https://abc123def456.ngrok.io/api
```

(Reemplaza `abc123def456` con tu URL de ngrok)

### Paso 6: Iniciar todo

```bash
# Terminal 1: Backend
cd quickcalc-api
npm run start:dev

# Terminal 2: Mobile
cd quickcalc-mobile
npm start
```

**Ventajas:**
- ✅ Funciona desde internet público
- ✅ URL permanente durante la sesión
- ✅ Muy confiable

**Desventajas:**
- ⚠️ Requiere instalación
- ⚠️ URL cambia cada vez que reinicia (sin pro)

---

## ✅ Opción 3: SSH Tunnel (Para Servidores Remotos)

Si tu backend está en un servidor remoto:

```bash
# Crear túnel SSH
ssh -L 3000:localhost:3000 usuario@servidor.com
```

Luego usa:
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🚀 Resumen Rápido

| Opción | Requisito | Facilidad | Velocidad | Recomendación |
|--------|-----------|-----------|-----------|---------------|
| **Misma WiFi** | Misma red | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Mejor opción |
| **Expo Tunnel** | Internet | ⭐⭐⭐⭐ | ⭐⭐⭐ | Desarrollo rápido |
| **ngrok** | Internet + Cuenta | ⭐⭐⭐ | ⭐⭐⭐⭐ | Producción/Testing |
| **SSH Tunnel** | Servidor remoto | ⭐⭐ | ⭐⭐⭐ | Servidores |

---

## 🛠️ Método Automático para Cambiar Configuración

Si quieres cambiar rápidamente, edita `quickcalc-mobile/.env`:

```bash
# Opción 1: Misma WiFi
EXPO_PUBLIC_API_URL=http://192.168.18.9:3000/api

# Opción 2: Expo Tunnel
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# Opción 3: ngrok
EXPO_PUBLIC_API_URL=https://abc123.ngrok.io/api
```

---

## ⚠️ Troubleshooting

### "Cannot reach API"
1. Verifica que el backend esté corriendo
2. Comprueba la URL en `.env`
3. Verifica CORS en el backend

### "SSL Certificate Error" (con ngrok)
- ngrok usa HTTPS automáticamente
- El backend debe permitir HTTPS
- Ya está permitido en el CORS actual

### "Timeout"
- Aumenta el timeout en `src/lib/constants.ts`
- Verifica la velocidad de internet

---

## 🎯 Recomendación Final

**Para desarrollo sin misma red:**
1. Intenta **Expo Tunnel** primero (más fácil)
2. Si no funciona, usa **ngrok** (más confiable)

¡Eso es! Ahora puedes conectar desde cualquier lugar. 🚀
