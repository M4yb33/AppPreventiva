# QuickCalc API - Backend Sistema de Alertas de Emergencia

Sistema backend completo para QuickCalc, una aplicación de alertas de pánico que permite a víctimas de violencia activar alertas silenciosas mediante un código oculto en una calculadora.

---

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#-stack-tecnológico)
- [Características](#-características)
- [Instalación Rápida](#-instalación-rápida)
- [Configuración](#-configuración)
- [Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Pruebas con Postman](#-pruebas-con-postman)
- [Comandos Útiles](#-comandos-útiles)
- [Arquitectura](#-arquitectura)
- [Base de Datos](#-base-de-datos)
- [Seguridad](#-seguridad)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Stack Tecnológico

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript 5.x
- **Base de Datos**: PostgreSQL 14+
- **ORM**: Prisma 5.x
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator + class-transformer
- **Encriptación**: bcrypt

---

## ✨ Características

### Sistema de Alertas
- ✅ Creación de alertas de pánico en tiempo real
- ✅ Tracking de ubicación GPS múltiple
- ✅ Estados configurables de alertas
- ✅ Logs automáticos de todas las acciones
- ✅ Asignación de alertas a operadores

### Gestión de Dispositivos
- ✅ Registro de dispositivos móviles
- ✅ Configuración de códigos secretos (hasheados)
- ✅ Gestión de contactos de confianza
- ✅ Soporte para múltiples plataformas (Android/iOS)

### Sistema de Operadores
- ✅ Autenticación JWT segura
- ✅ Roles: Admin, Operator, Viewer
- ✅ Control de acceso basado en roles (RBAC)
- ✅ Panel de dashboard con métricas

### Seguridad
- ✅ Passwords hasheados con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación estricta de inputs
- ✅ Guards de autenticación y autorización
- ✅ Logs de auditoría completos

---

## 🔧 Instalación Rápida

### Pre-requisitos

Asegúrate de tener instalado:
- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **PostgreSQL** 14+ ([Descargar](https://www.postgresql.org/download/))
- **npm** 9+ (viene con Node.js)
- **Git** (opcional, para clonar)

### Paso 1: Clonar o Navegar al Proyecto

```bash
cd quickcalc-api
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Iniciar PostgreSQL

**Windows:**
```bash
# Opción 1: Desde servicios
Win + R → services.msc → Buscar "postgresql" → Iniciar

# Opción 2: Desde línea de comandos (como admin)
net start postgresql-x64-14
```

**Linux/Mac:**
```bash
sudo systemctl start postgresql
# o
brew services start postgresql
```

### Paso 4: Crear Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# En la consola psql:
CREATE DATABASE quickcalc_db;

# Verificar
\l

# Salir
\q
```

### Paso 5: Configurar Variables de Entorno

El archivo `.env` ya está configurado. **Si tu contraseña de PostgreSQL es diferente a `admin123`**, edítala:

```env
# .env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@localhost:5432/quickcalc_db?schema=public"
JWT_SECRET="quickcalc_super_secret_key_change_in_production"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
```

### Paso 6: Generar Cliente de Prisma

```bash
npx prisma generate
```

### Paso 7: Ejecutar Migraciones (Crear Tablas)

```bash
npx prisma migrate dev --name init
```

### Paso 8: Poblar Datos Iniciales

```bash
npx ts-node prisma/seed.ts
```

**Salida esperada:**
```
🌱 Seeding database...
✅ Admin operator created: { email: 'admin@lv.com', role: 'ADMIN' }
✅ Test operator created: { email: 'operator@lv.com', role: 'OPERATOR' }
🎉 Seeding completed!
```

### Paso 9: Iniciar el Servidor

```bash
npm run start:dev
```

**Deberías ver:**
```
==================================================
🚀 QuickCalc API Server
==================================================
📍 Server running on: http://localhost:3000
🔗 API Base URL: http://localhost:3000/api
🌍 Environment: development
==================================================
```

### Paso 10: Verificar que Funciona

Abre tu navegador en: **http://localhost:3000/api**

Deberías ver:
```json
{
  "success": true,
  "message": "QuickCalc API is running",
  "version": "1.0.0",
  "endpoints": {...}
}
```

---

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `DATABASE_URL` | URL de conexión a PostgreSQL | `postgresql://postgres:admin123@localhost:5432/quickcalc_db` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | `quickcalc_super_secret_key_change_in_production` |
| `JWT_EXPIRES_IN` | Duración de tokens JWT | `7d` |
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |

⚠️ **IMPORTANTE:** En producción, cambia `JWT_SECRET` a un valor aleatorio seguro:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Credenciales por Defecto

Después de ejecutar el seed:

**Admin:**
- Email: `admin@lv.com`
- Password: `Admin123!`

**Operator:**
- Email: `operator@lv.com`
- Password: `Operator123!`

⚠️ **¡Cambiar antes de producción!**

---

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo (con hot-reload)
```bash
npm run start:dev
```

### Modo Producción
```bash
npm run build
npm run start:prod
```

### Otros Comandos
```bash
# Modo debug
npm run start:debug

# Ejecución normal
npm start
```

---

## 📡 Endpoints de la API

Base URL: `http://localhost:3000/api`

### 🔐 Autenticación

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@lv.com",
  "password": "Admin123!"
}
```

**Respuesta:**
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

#### Obtener Perfil (Requiere Token)
```http
GET /api/auth/me
Authorization: Bearer {token}
```

---

### 📱 Dispositivos

#### Registrar Dispositivo
```http
POST /api/devices/register
Content-Type: application/json

{
  "deviceUuid": "test-device-001",
  "platform": "android"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Device registered successfully",
  "data": {
    "deviceId": 1,
    "deviceUuid": "test-device-001",
    "isConfigured": false
  }
}
```

#### Configurar Dispositivo
```http
PATCH /api/devices/:id/configuration
Content-Type: application/json

{
  "alias": "Mi teléfono",
  "panicCode": "9999",
  "settingsCode": "8888"
}
```

#### Agregar Contacto de Confianza
```http
POST /api/devices/:id/contacts
Content-Type: application/json

{
  "name": "María García",
  "phone": "+593987654321",
  "relationship": "Hermana",
  "priority": 1
}
```

#### Listar Contactos
```http
GET /api/devices/:id/contacts
```

---

### 🚨 Alertas (CORE)

#### Crear Alerta de Pánico
```http
POST /api/alerts
Content-Type: application/json

{
  "deviceUuid": "test-device-001",
  "triggerType": "PANIC_CODE",
  "latitude": -0.1807,
  "longitude": -78.4678,
  "accuracy": 15
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Alert created successfully",
  "data": {
    "alertId": 1,
    "status": "NEW",
    "triggeredAt": "2026-03-17T17:00:00.000Z"
  }
}
```

#### Listar Todas las Alertas
```http
GET /api/alerts
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Alerts retrieved successfully",
  "data": [
    {
      "alertId": 1,
      "deviceId": 1,
      "deviceAlias": "Mi teléfono",
      "status": "NEW",
      "triggerType": "PANIC_CODE",
      "triggeredAt": "2026-03-17T17:00:00.000Z",
      "latitude": -0.1807,
      "longitude": -78.4678,
      "internetDelivered": true
    }
  ]
}
```

#### Ver Detalle de Alerta
```http
GET /api/alerts/:id
```

#### Actualizar Estado de Alerta (Requiere Token)
```http
PATCH /api/alerts/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "note": "Operador contactando a la víctima",
  "performedBy": "Administrator"
}
```

**Estados válidos:**
- `NEW` - Alerta nueva
- `IN_REVIEW` - En revisión
- `IN_PROGRESS` - En progreso
- `ESCALATED` - Escalada
- `CLOSED` - Cerrada
- `TEST` - Prueba

#### Agregar Ubicación a Alerta
```http
POST /api/alerts/:id/location
Content-Type: application/json

{
  "latitude": -0.1810,
  "longitude": -78.4680,
  "accuracy": 12
}
```

#### Ver Historial de Alerta
```http
GET /api/alerts/:id/logs
```

---

### 📊 Dashboard (Requiere Token)

#### Resumen Estadístico
```http
GET /api/dashboard/summary
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "totalAlerts": 5,
    "newAlerts": 2,
    "inProgressAlerts": 2,
    "escalatedAlerts": 0,
    "closedAlerts": 1,
    "totalDevices": 3,
    "configuredDevices": 2,
    "activeOperators": 2
  }
}
```

#### Alertas Recientes
```http
GET /api/dashboard/recent-alerts
Authorization: Bearer {token}
```

---

### 👥 Operadores (Solo Admin)

#### Crear Operador
```http
POST /api/operators
Authorization: Bearer {token}
Content-Type: application/json

{
  "fullName": "Juan Pérez",
  "email": "juan@lv.com",
  "password": "SecurePass123!",
  "role": "OPERATOR"
}
```

#### Listar Operadores
```http
GET /api/operators
Authorization: Bearer {token}
```

#### Ver Operador Específico
```http
GET /api/operators/:id
Authorization: Bearer {token}
```

---

## 🧪 Pruebas con Postman

### Flujo de Prueba Completo

#### 1. Registrar Dispositivo
```
POST http://localhost:3000/api/devices/register
Body: {"deviceUuid":"test-device-001","platform":"android"}
```

#### 2. Configurar Dispositivo
```
PATCH http://localhost:3000/api/devices/1/configuration
Body: {"alias":"Mi teléfono","panicCode":"9999","settingsCode":"8888"}
```

#### 3. Agregar Contacto
```
POST http://localhost:3000/api/devices/1/contacts
Body: {"name":"María García","phone":"+593987654321","relationship":"Hermana","priority":1}
```

#### 4. Crear Alerta
```
POST http://localhost:3000/api/alerts
Body: {"deviceUuid":"test-device-001","triggerType":"PANIC_CODE","latitude":-0.1807,"longitude":-78.4678,"accuracy":15}
```

#### 5. Login
```
POST http://localhost:3000/api/auth/login
Body: {"email":"admin@lv.com","password":"Admin123!"}
→ Copiar el accessToken
```

#### 6. Ver Alertas (con token)
```
GET http://localhost:3000/api/alerts
Headers: Authorization: Bearer {token}
```

#### 7. Cambiar Estado (con token)
```
PATCH http://localhost:3000/api/alerts/1/status
Headers: Authorization: Bearer {token}
Body: {"status":"IN_PROGRESS","note":"Revisando caso","performedBy":"Administrator"}
```

#### 8. Agregar Nueva Ubicación
```
POST http://localhost:3000/api/alerts/1/location
Body: {"latitude":-0.1810,"longitude":-78.4680,"accuracy":12}
```

#### 9. Ver Historial
```
GET http://localhost:3000/api/alerts/1/logs
```

#### 10. Dashboard
```
GET http://localhost:3000/api/dashboard/summary
Headers: Authorization: Bearer {token}
```

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Iniciar en modo desarrollo
npm run start:dev

# Build para producción
npm run build

# Ejecutar en producción
npm run start:prod

# Modo debug
npm run start:debug
```

### Prisma / Base de Datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Crear migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (GUI)
npx prisma studio

# Ejecutar seed
npx ts-node prisma/seed.ts

# Reset completo de BD (¡CUIDADO!)
npx prisma migrate reset
```

### Testing
```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:cov

# Tests E2E
npm run test:e2e
```

### Linting y Formato
```bash
# Lint
npm run lint

# Formatear código
npm run format
```

---

## 🏗️ Arquitectura

### Estructura del Proyecto

```
quickcalc-api/
├── src/
│   ├── modules/              # Módulos funcionales
│   │   ├── auth/            # Autenticación JWT
│   │   ├── devices/         # Gestión de dispositivos
│   │   ├── alerts/          # Sistema de alertas (CORE)
│   │   ├── operators/       # Gestión de operadores
│   │   └── dashboard/       # Panel de métricas
│   ├── common/              # Recursos compartidos
│   │   ├── decorators/      # @CurrentUser, @Roles
│   │   ├── guards/          # JwtAuthGuard, RolesGuard
│   │   ├── filters/         # Exception filters
│   │   ├── interceptors/    # Response interceptors
│   │   ├── dto/            # DTOs base
│   │   └── enums/          # Enums compartidos
│   ├── prisma/             # Servicio de Prisma
│   ├── config/             # Configuración
│   ├── app.module.ts       # Módulo raíz
│   ├── app.controller.ts   # Controller raíz
│   └── main.ts            # Bootstrap
├── prisma/
│   ├── schema.prisma      # Schema de BD
│   └── seed.ts           # Datos iniciales
├── .env                  # Variables de entorno
└── package.json         # Dependencias
```

### Principios de Diseño

- **Modular**: Cada módulo tiene responsabilidad única
- **SOLID**: Inyección de dependencias
- **DRY**: Código reutilizable en /common
- **Security First**: Validación en todas las capas
- **API First**: Diseñado para múltiples clientes

---

## 🗄️ Base de Datos

### Nomenclatura de 3 Letras

Todas las tablas usan prefijos de 3 letras:

| Prefijo | Tabla | Descripción |
|---------|-------|-------------|
| `dev_` | dev_devices | Dispositivos móviles |
| `tct_` | tct_trusted_contacts | Contactos de confianza |
| `alt_` | alt_alerts | Alertas de emergencia |
| `alc_` | alc_alert_locations | Ubicaciones GPS |
| `alg_` | alg_alert_logs | Historial de acciones |
| `opr_` | opr_operators | Operadores del sistema |

### Diagrama de Relaciones

```
dev_devices (1) ──< (N) tct_trusted_contacts
dev_devices (1) ──< (N) alt_alerts
alt_alerts (1)  ──< (N) alc_alert_locations
alt_alerts (1)  ──< (N) alg_alert_logs
```

### Ver Base de Datos

```bash
# Abrir Prisma Studio (GUI)
npx prisma studio
```

Abre: `http://localhost:5555`

---

## 🔒 Seguridad

### Autenticación
- JWT con expiración configurable
- Tokens en header: `Authorization: Bearer {token}`
- Strategy pattern con Passport

### Passwords
- Hasheados con bcrypt (10 rounds)
- Nunca almacenados en texto plano
- Códigos de pánico también hasheados

### Validación
- DTOs con class-validator
- Whitelist activado (rechaza campos extra)
- Transform activado (conversión automática de tipos)

### CORS
- Habilitado para desarrollo
- En producción: restringir orígenes específicos

### Headers de Seguridad
- Exception filter global
- Response interceptor
- Error handling consistente

---

## 🐛 Troubleshooting

### Error: "Cannot GET /api/auth/login"
**Causa:** Estás usando GET en lugar de POST
**Solución:** Usa POST en Postman/Thunder Client

### Error: "Invalid credentials"
**Causa:** Datos no poblados en la BD
**Solución:**
```bash
npx ts-node prisma/seed.ts
```

### Error: "Device not found"
**Causa:** Intentas crear alerta sin registrar dispositivo
**Solución:** Primero registra el dispositivo con `/api/devices/register`

### Error: "Can't reach database server"
**Causa:** PostgreSQL no está corriendo
**Solución:**
```bash
# Windows
net start postgresql-x64-14

# Linux/Mac
sudo systemctl start postgresql
```

### Error: Puerto 3000 en uso
**Solución:**
```bash
# Windows (PowerShell como admin)
netstat -ano | findstr :3000
taskkill /PID [número] /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: "Cannot find module '@prisma/client'"
**Solución:**
```bash
npx prisma generate
```

### Error: Migración fallida
**Solución:**
```bash
npx prisma migrate reset
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

### Reinstalación Completa
```bash
# Limpiar todo
rm -rf node_modules package-lock.json

# Reinstalar
npm install
npx prisma generate

# Resetear BD
npx prisma migrate reset

# Seed
npx ts-node prisma/seed.ts

# Iniciar
npm run start:dev
```

---

## 📊 Verificación del Sistema

### Checklist de Estado

```bash
# 1. PostgreSQL corriendo?
psql -U postgres -c "SELECT 1;"
# ✓ Debe mostrar "1"

# 2. Base de datos existe?
psql -U postgres -l | grep quickcalc_db
# ✓ Debe mostrar quickcalc_db

# 3. Tablas creadas?
npx prisma studio
# ✓ Debe mostrar 6 tablas

# 4. Datos poblados?
# En Prisma Studio → opr_operators
# ✓ Debe mostrar 2 operadores

# 5. Servidor corriendo?
curl http://localhost:3000/api
# ✓ Debe responder JSON

# 6. Login funciona?
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'
# ✓ Debe devolver token
```

---

## 📝 Notas Adicionales

### Logs
Los logs aparecen en la consola donde ejecutaste `npm run start:dev`

### VS Code Extensions Recomendadas
- Prisma (syntax highlighting)
- Thunder Client (testing API)
- REST Client

### Herramientas Recomendadas
- **Postman** - Testing de API ([Descargar](https://www.postman.com/downloads/))
- **DBeaver** - Cliente de BD ([Descargar](https://dbeaver.io/download/))
- **Prisma Studio** - GUI de Prisma (incluido)

---

## 📞 Soporte

### Documentación Oficial
- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Recursos del Proyecto
- Ver estructura de base de datos: `npx prisma studio`
- Ver todos los comandos: `npm run`
- Logs del servidor: Consola donde corre `npm run start:dev`

---

## 🎯 Próximos Pasos

Una vez que el backend funcione correctamente:

1. **Testing**: Probar todos los endpoints en Postman
2. **Mobile App**: Desarrollar app React Native
3. **Dashboard Web**: Desarrollar panel con Next.js
4. **Deploy**: Desplegar en servidor de producción

---

## 📄 Licencia

MIT License

---

## 👥 Créditos

**Proyecto:** QuickCalc - Sistema de Alertas de Emergencia
**Curso:** Desarrollo Asistido por Software
**Tecnologías:** NestJS + Prisma + PostgreSQL + TypeScript

---

## ✅ Estado del Proyecto

| Componente | Estado |
|------------|--------|
| Backend API | ✅ 100% Completo |
| Base de Datos | ✅ 100% Completo |
| Autenticación | ✅ 100% Completo |
| Sistema de Alertas | ✅ 100% Completo |
| Documentación | ✅ 100% Completo |
| Testing Manual | ✅ Funcional |
| Testing Automatizado | ⏳ Pendiente |
| Mobile App | ⏳ Pendiente |
| Dashboard Web | ⏳ Pendiente |

**Última actualización:** 2026-03-17

---

**¡El backend está completamente funcional y listo para usar! 🚀**

Para preguntas o problemas, revisa la sección de [Troubleshooting](#-troubleshooting) o verifica que seguiste todos los pasos de [Instalación](#-instalación-rápida).
