# 🔧 Solución Rápida de Errores

## Error: "Cannot GET /api"

Este error es **NORMAL** porque la ruta `/api` sin endpoint específico no existe.

### ✅ Rutas que SÍ funcionan:

#### 1. Health Check (Sin base de datos)
```bash
# Raíz de la API
http://localhost:3000/api

# Health check
http://localhost:3000/api/health
```

Abre tu navegador y ve a: `http://localhost:3000/api`

Deberías ver:
```json
{
  "success": true,
  "message": "QuickCalc API is running",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth/login",
    "devices": "/api/devices",
    "alerts": "/api/alerts",
    "dashboard": "/api/dashboard",
    "operators": "/api/operators"
  }
}
```

#### 2. Test de Login (Requiere base de datos)
```bash
# Con cURL (Git Bash)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@lv.com\",\"password\":\"Admin123!\"}"

# Con PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@lv.com","password":"Admin123!"}'
```

## 🚨 Checklist de Problemas Comunes

### 1. Servidor no está corriendo
```bash
# ❌ Error: Connection refused
# ✅ Solución: Iniciar el servidor

cd quickcalc-api
npm run start:dev
```

### 2. Base de datos no conectada
```bash
# ❌ Error: P1001: Can't reach database server
# ✅ Solución: Iniciar PostgreSQL

# Windows
net start postgresql-x64-14

# O desde servicios
Win + R → services.msc → PostgreSQL → Start
```

### 3. Base de datos no existe
```bash
# ❌ Error: P1003: Database does not exist
# ✅ Solución: Crear la base de datos

psql -U postgres
CREATE DATABASE quickcalc_db;
\q

# Luego ejecutar migraciones
npm run prisma:migrate
```

### 4. Prisma Client no generado
```bash
# ❌ Error: Cannot find module '@prisma/client'
# ✅ Solución: Generar cliente

npm run prisma:generate
```

### 5. Archivos no compilados
```bash
# Si ves errores de compilación
# ✅ Solución: Build y reiniciar

npm run build
npm run start:dev
```

### 6. Puerto en uso
```bash
# ❌ Error: Port 3000 is already in use
# ✅ Solución: Matar proceso

# Windows (PowerShell como admin)
netstat -ano | findstr :3000
taskkill /PID [número] /F

# O cambiar puerto en .env
PORT=3001
```

## 🎯 Pasos para Probar AHORA

### Paso 1: Reiniciar el servidor
```bash
# En la terminal donde está corriendo
Ctrl + C

# Iniciar de nuevo
npm run start:dev
```

### Paso 2: Ver en el navegador
```
http://localhost:3000/api
```

Deberías ver el JSON con información de la API.

### Paso 3: Si aún NO funciona

#### Opción A: Ver los logs
En la terminal donde ejecutaste `npm run start:dev`, verifica si hay errores.

**Errores comunes:**
- `Cannot find module` → Ejecutar `npm install`
- `P1001: Can't reach database` → PostgreSQL no está corriendo
- `EADDRINUSE` → Puerto ya en uso

#### Opción B: Verificar archivos
```bash
# ¿Existe el archivo?
ls src/app.controller.ts

# ¿Compiló correctamente?
npm run build
```

## 🧪 Tests Rápidos (Sin base de datos)

### 1. Raíz de la API
```bash
curl http://localhost:3000/api
```

**Esperado:** JSON con información de endpoints

### 2. Health check
```bash
curl http://localhost:3000/api/health
```

**Esperado:**
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T12:30:00.000Z",
  "uptime": 123.456
}
```

## 🧪 Tests que Requieren Base de Datos

### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'
```

**Si funciona:** Verás un token JWT

**Si NO funciona:**
- `400 Bad Request` → Datos incorrectos
- `401 Unauthorized` → Email/password incorrecto
- `500 Internal Error` → Base de datos no conectada

## 📊 Estado del Sistema

### Verificar TODO está OK:

```bash
# 1. Servidor corriendo
curl http://localhost:3000/api/health
# ✓ Debe responder JSON

# 2. PostgreSQL corriendo
psql -U postgres -c "SELECT 1;"
# ✓ Debe mostrar "1"

# 3. Base de datos existe
psql -U postgres -l | grep quickcalc_db
# ✓ Debe mostrar quickcalc_db

# 4. Tablas creadas
npm run prisma:studio
# ✓ Debe abrir el navegador con Prisma Studio

# 5. Prisma Client generado
ls node_modules/@prisma/client
# ✓ Debe listar archivos
```

## 🎯 Solución RÁPIDA en 3 pasos

```bash
# 1. Detener servidor (Ctrl+C si está corriendo)

# 2. Iniciar PostgreSQL
net start postgresql-x64-14

# 3. Iniciar servidor
npm run start:dev
```

**Luego ve a:** `http://localhost:3000/api`

## 💡 Tips

1. **La ruta `/api` sin nada más SÍ funciona ahora** (agregué un endpoint raíz)
2. **Siempre usa `/api/` como prefijo** para todos los endpoints
3. **Si ves "Cannot GET /api"** asegúrate que el servidor está corriendo
4. **Si ves errores de Prisma** verifica PostgreSQL
5. **Usa Postman** en lugar de cURL para probar más fácil

## 🔍 Debugging

### Ver logs en tiempo real
```bash
# Los logs aparecen automáticamente en la terminal donde ejecutaste:
npm run start:dev

# Busca estos mensajes:
# ✓ "Server running on: http://localhost:3000"
# ✓ "Environment: development"
# ✗ Si ves errores en rojo, léelos
```

### Prisma Studio (GUI de BD)
```bash
npm run prisma:studio
```

Abre `http://localhost:5555` y verifica:
- ¿Existen las tablas?
- ¿Hay operadores en opr_operators?
- ¿Puedes ver los datos?

## 📞 Si Nada Funciona

1. **Reinstalar todo:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
npm run start:dev
```

2. **Resetear base de datos:**
```bash
npx prisma migrate reset
npm run prisma:seed
```

3. **Ver el README:**
```bash
cat QUICKSTART_WINDOWS.md
```

## ✅ Confirmación de que TODO funciona

Cuando veas esto, TODO está OK:

```bash
curl http://localhost:3000/api
# {"success":true,"message":"QuickCalc API is running"...}

curl http://localhost:3000/api/health
# {"success":true,"message":"Server is healthy"...}

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'
# {"success":true,"message":"Login successful","data":{"accessToken":"eyJ..."}}
```

---

**¿Sigue sin funcionar?**

Ejecuta esto y mándame la salida:
```bash
npm run start:dev 2>&1 | tee server-log.txt
```

Esto guardará los logs en `server-log.txt` para debuggear.
