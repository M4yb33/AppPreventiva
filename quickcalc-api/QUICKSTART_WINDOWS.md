# 🚀 INICIO RÁPIDO - Windows

Guía paso a paso para iniciar el proyecto en Windows.

## ✅ Pre-requisitos

Antes de comenzar, verifica que tengas instalado:

```bash
# Verificar Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar: 9.x.x o superior

# Verificar PostgreSQL
psql --version
# Debe mostrar: psql (PostgreSQL) 14.x o superior
```

Si falta alguno:
- **Node.js**: https://nodejs.org/ (descarga la versión LTS)
- **PostgreSQL**: https://www.postgresql.org/download/windows/

---

## 📋 PASOS PARA INICIAR

### 1️⃣ Iniciar PostgreSQL

**Método 1: Desde Servicios de Windows**
```
1. Presiona Win + R
2. Escribe: services.msc
3. Busca "postgresql-x64-14" (o la versión que instalaste)
4. Click derecho → Iniciar
```

**Método 2: Desde línea de comandos (como Administrador)**
```bash
# Abre PowerShell o CMD como administrador
net start postgresql-x64-14
```

**Verificar que está corriendo:**
```bash
# Intenta conectar
psql -U postgres -h localhost

# Si pide contraseña, ingresa la que configuraste durante la instalación
# Si conecta correctamente, escribe \q para salir
```

### 2️⃣ Crear la Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Verás algo como:
# postgres=#

# Crear la base de datos
CREATE DATABASE quickcalc_db;

# Deberías ver: CREATE DATABASE

# Verificar que se creó
\l

# Salir
\q
```

### 3️⃣ Configurar Variables de Entorno

El archivo `.env` ya está creado con estos valores:

```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/quickcalc_db?schema=public"
JWT_SECRET="quickcalc_super_secret_key_change_in_production"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
```

**⚠️ IMPORTANTE:** Si tu contraseña de PostgreSQL NO es `admin123`, debes cambiarla en el archivo `.env`:

```bash
# Abre el archivo .env y cambia 'admin123' por tu contraseña
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/quickcalc_db?schema=public"
```

### 4️⃣ Navegar al Proyecto

```bash
cd "d:\SEPTIMO\DESARROLLO ASISTIDO POR SOFTWARE\1p\deberes\AppPreventiva\quickcalc-api"
```

### 5️⃣ Verificar Dependencias

```bash
# Las dependencias ya están instaladas, pero si necesitas reinstalar:
npm install
```

### 6️⃣ Generar Cliente de Prisma

```bash
npm run prisma:generate
```

Deberías ver:
```
✔ Generated Prisma Client to .\node_modules\@prisma\client
```

### 7️⃣ Ejecutar Migraciones

```bash
npm run prisma:migrate
```

Te preguntará el nombre de la migración, escribe: `init`

Deberías ver:
```
Your database is now in sync with your schema.
✔ Generated Prisma Client
```

### 8️⃣ Poblar Datos Iniciales

```bash
npm run prisma:seed
```

Deberías ver:
```
🌱 Seeding database...
✅ Admin operator created: { email: 'admin@lv.com', role: 'ADMIN' }
✅ Test operator created: { email: 'operator@lv.com', role: 'OPERATOR' }
🎉 Seeding completed!

📝 Default credentials:
   Admin:
   - Email: admin@lv.com
   - Password: Admin123!

   Operator:
   - Email: operator@lv.com
   - Password: Operator123!
```

### 9️⃣ Iniciar el Servidor

```bash
npm run start:dev
```

Deberías ver:
```
==================================================
🚀 QuickCalc API Server
==================================================
📍 Server running on: http://localhost:3000
🔗 API Base URL: http://localhost:3000/api
🌍 Environment: development
==================================================
✅ Database connected successfully
```

---

## 🧪 PROBAR QUE FUNCIONA

### Test 1: Health Check (con navegador)

Abre tu navegador y ve a:
```
http://localhost:3000/api/auth/login
```

Deberías ver un mensaje de error (porque no enviaste datos), pero confirma que el servidor está corriendo.

### Test 2: Login (con cURL en Git Bash o PowerShell)

**En PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@lv.com","password":"Admin123!"}'
```

**En Git Bash:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@lv.com\",\"password\":\"Admin123!\"}"
```

Deberías recibir:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "operator": {
      "id": 1,
      "fullName": "Administrator",
      "email": "admin@lv.com",
      "role": "ADMIN"
    }
  }
}
```

### Test 3: Registrar Dispositivo

```bash
curl -X POST http://localhost:3000/api/devices/register \
  -H "Content-Type: application/json" \
  -d "{\"deviceUuid\":\"test-device-windows\",\"platform\":\"android\"}"
```

Deberías recibir:
```json
{
  "success": true,
  "message": "Device registered successfully",
  "data": {
    "deviceId": 1,
    "deviceUuid": "test-device-windows",
    "isConfigured": false
  }
}
```

### Test 4: Crear Alerta de Pánico

```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d "{\"deviceUuid\":\"test-device-windows\",\"triggerType\":\"PANIC_CODE\",\"latitude\":-0.1807,\"longitude\":-78.4678,\"accuracy\":15}"
```

Deberías recibir:
```json
{
  "success": true,
  "message": "Alert created successfully",
  "data": {
    "alertId": 1,
    "status": "NEW",
    "triggeredAt": "2024-01-01T12:30:00.000Z"
  }
}
```

---

## 🎉 ¡LISTO!

Si llegaste hasta aquí sin errores, tu backend está **100% funcional**.

---

## 🛠️ Herramientas Recomendadas para Windows

### 1. Postman (Recomendado)
- Descargar: https://www.postman.com/downloads/
- Más fácil para probar APIs que cURL

**Cómo usar Postman:**
```
1. Abre Postman
2. Crea un nuevo Request
3. Selecciona POST
4. URL: http://localhost:3000/api/auth/login
5. En "Body" → "raw" → "JSON"
6. Pega:
   {
     "email": "admin@lv.com",
     "password": "Admin123!"
   }
7. Click "Send"
```

### 2. Prisma Studio (Ya incluido)
- Interfaz gráfica para ver/editar la base de datos

```bash
npm run prisma:studio
```

Se abrirá en tu navegador: `http://localhost:5555`

Aquí puedes:
- Ver todas las tablas
- Ver todos los registros
- Editar datos
- Agregar registros manualmente

### 3. VS Code Extensions (Opcional)
Si usas VS Code, instala:
- Prisma (para syntax highlighting del schema)
- REST Client (para hacer requests sin salir de VS Code)
- Thunder Client (alternativa a Postman dentro de VS Code)

---

## 🚨 Problemas Comunes en Windows

### Error: "psql no se reconoce como comando"

**Solución:** Agregar PostgreSQL al PATH

```
1. Busca la carpeta de instalación de PostgreSQL:
   Ej: C:\Program Files\PostgreSQL\14\bin

2. Win + R → sysdm.cpl → Advanced → Environment Variables

3. En "System Variables" busca "Path" → Edit

4. Agrega: C:\Program Files\PostgreSQL\14\bin

5. Click OK y reinicia la terminal
```

### Error: "Puerto 3000 en uso"

```powershell
# PowerShell (como administrador)
netstat -ano | findstr :3000
# Anota el PID (último número)

taskkill /PID [número] /F
```

### Error: "Cannot connect to database"

**Opciones:**
1. Verifica que PostgreSQL esté corriendo (Paso 1)
2. Verifica la contraseña en `.env`
3. Verifica que la base de datos exista:
   ```bash
   psql -U postgres -l
   # Deberías ver "quickcalc_db" en la lista
   ```

### Error: "Module not found"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
```

---

## 📊 Verificación de Estado

Puedes verificar el estado completo con este checklist:

```bash
# PostgreSQL corriendo?
psql -U postgres -c "\l"
# ✓ Deberías ver la lista de bases de datos

# Base de datos existe?
psql -U postgres -c "\l" | findstr quickcalc_db
# ✓ Deberías ver quickcalc_db

# Tablas creadas?
npm run prisma:studio
# ✓ Deberías ver 6 tablas en Prisma Studio

# Server corriendo?
# ✓ Deberías ver el mensaje de inicio en la terminal

# API responde?
curl http://localhost:3000/api/alerts
# ✓ Deberías recibir JSON con lista de alertas (vacía si no hay)
```

---

## 🎯 Comandos Rápidos para el Día a Día

```bash
# Iniciar servidor
npm run start:dev

# Ver base de datos
npm run prisma:studio

# Reiniciar base de datos (CUIDADO: borra todo)
npx prisma migrate reset

# Ver logs en tiempo real
# Los logs aparecen automáticamente en la terminal donde ejecutaste start:dev
```

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Revisa los logs** en la terminal donde ejecutaste `npm run start:dev`
2. **Verifica la conexión** a PostgreSQL con `psql -U postgres`
3. **Revisa el archivo `.env`** que tenga la contraseña correcta
4. **Reinicia el servidor** (Ctrl+C y luego `npm run start:dev`)

---

## ✅ Checklist Final

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos `quickcalc_db` creada
- [ ] Dependencias de npm instaladas
- [ ] Prisma Client generado
- [ ] Migraciones ejecutadas
- [ ] Datos iniciales poblados
- [ ] Servidor iniciado en puerto 3000
- [ ] Login probado exitosamente
- [ ] Al menos un dispositivo registrado
- [ ] Al menos una alerta creada

Si todos los puntos están marcados: **¡FELICITACIONES! 🎉**

Tu backend está completamente funcional y listo para desarrollar el frontend.
