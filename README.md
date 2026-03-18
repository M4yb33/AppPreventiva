# AppPreventiva - Sistema Integral de Alertas de Emergencia

Sistema completo de alertas de pánico para víctimas de violencia que combina una **aplicación móvil** (calculadora oculta), **backend API** y **dashboard de gestión** para operadores.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Flujo de Uso](#flujo-de-uso)
- [MVP - Características Incluidas](#mvp---características-incluidas)
- [Proximamente](#próximas-características)
- [APIs y Endpoints](#apis-y-endpoints)

---

## 📱 Descripción del Proyecto

**AppPreventiva** es un sistema moderno de alertas de pánico diseñado para proteger a víctimas de violencia de género. El sistema funciona de manera invisible:

1. **Calculadora Móvil**: Aplicación completamente funcional que sirve como aplicación normal
2. **Código Oculto**: Ingresando un código especial (2580 = pánico, 0000 = configuración) se activan alertas silenciosas
3. **Auto-localización**: Captura automática de ubicación GPS (con timeout)
4. **Alias Personalizado**: Identificación con nombre o apodo (sincronizado con el backend)
5. **Dashboard**: Panel de operadores con vista en tiempo real de alerta

**Importante**: Las alertas se envían **sin notificaciones visibles** en el teléfono.

---

## 🛠️ Tecnologías

### Backend API
- **NestJS 10** - Framework TypeScript/Node.js
- **PostgreSQL 14+** - Base de datos relacional
- **Prisma ORM** - Gestor de ORM
- **JWT** - Autenticación y autorización
- **Bcrypt** - Hash de contraseñas

### Frontend Web (Dashboard)
- **Next.js 14** - Framework React con SSR
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utilities
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

### App Móvil
- **Expo 54.0.0** - Herramientas React Native
- **React Native 0.81.5** - Framework móvil
- **React 19.1.0** - DOM virtual
- **expo-location** - Geolocalización
- **expo-secure-store** - Almacenamiento seguro
- **React Navigation** - Navegación entre pantallas

---

## 📁 Estructura del Proyecto

```
AppPreventiva/
├── quickcalc-api/           ✅ Backend NestJS
│   ├── src/
│   │   ├── modules/         → Módulos funcionales
│   │   ├── guards/          → Guards de autenticación
│   │   ├── pipes/           → Validación
│   │   └── prisma/          → Esquema DB
│   ├── package.json
│   ├── .env.example
│   └── prisma/
│       ├── schema.prisma    → Esquema DB
│       └── migrations/      → Historial de cambios
│
├── quickcalc-dashboard/     ✅ Frontend Next.js
│   ├── src/
│   │   ├── app/             → Rutas de Next.js
│   │   ├── components/      → Componentes React
│   │   ├── hooks/           → Custom hooks
│   │   ├── services/        → Llamadas a API
│   │   ├── context/         → Context API
│   │   └── types/           → Tipos TypeScript
│   ├── package.json
│   └── .env.example
│
├── quickcalc-mobile/        ✅ App Expo
│   ├── src/
│   │   ├── screens/         → Pantallas principales
│   │   ├── hooks/           → Custom hooks
│   │   ├── services/        → APIs y servicios
│   │   ├── storage/         → Almacenamiento seguro
│   │   ├── types/           → Tipos TypeScript
│   │   └── lib/             → Utilidades
│   ├── App.tsx              → Componente raíz
│   ├── package.json
│   └── .env.example
│
├── package.json             → Scripts root
└── README.md                → Este archivo
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Node.js 18+** - [Descargar](https://nodejs.org/)
- **PostgreSQL 14+** - [Descargar](https://www.postgresql.org/)
- **Git** - Control de versiones
- **npm** - Gestor de paquetes (incluido en Node.js)

Verifica las versiones:
```bash
node --version     # v18.0.0 o superior
npm --version      # 9.0.0 o superior
```

---

### 1️⃣ Configurar Backend API

#### Paso 1: Instalar dependencias
```bash
cd quickcalc-api
npm install
```

#### Paso 2: Configurar base de datos
Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` y configura:
```env
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/quickcalc_db"
JWT_SECRET="tu_secreto_aleatorio_seguro_aqui"
JWT_EXPIRATION="24h"
```

**Crear la base de datos:**
```bash
# Opción 1: Con pgAdmin (GUI)
# Crear nueva base de datos llamada "quickcalc_db"

# Opción 2: Con comando psql
psql -U postgres
CREATE DATABASE quickcalc_db;
```

#### Paso 3: Migrar y popular base de datos
```bash
# Ejecutar migraciones
npm run prisma:migrate

# Poblar datos iniciales (usuarios por defecto)
npm run prisma:seed
```

**Usuarios creados por defecto:**
- Admin: `admin@lv.com` / `Admin123!`
- Operator: `operator@lv.com` / `Operator123!`

#### Paso 4: Iniciar el servidor
```bash
npm run start:dev
```

Verifica que está corriendo en `http://localhost:3000`:
```bash
curl http://localhost:3000/api/auth/login
```

---

### 2️⃣ Configurar Frontend Web (Dashboard)

#### Paso 1: Instalar dependencias
```bash
cd quickcalc-dashboard
npm install
```

#### Paso 2: Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

#### Paso 3: Iniciar servidor de desarrollo
```bash
npm run dev
```

Accede en **`http://localhost:3001`** (Next.js usa puerto 3001 por defecto)

#### Login en Dashboard
```
Email: operator@lv.com
Password: Operator123!
```

El dashboard mostrará:
- Alertas recientes (tarjetas estadísticas)
- Estado de alertas en tiempo real
- Auto-refresh cada 5 segundos (sin parpadeos)

---

### 3️⃣ Configurar App Móvil

#### Paso 1: Instalar dependencias
```bash
cd quickcalc-mobile
npm install
```

#### Paso 2: Configurar variables de entorno
```bash
cp .env.example .env
```

Edita `.env`:
```env
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

#### Paso 3: Iniciar Expo
```bash
npm start
```

Verás un menú interactivo:
```
Press 'a' to open Android Emulator
Press 'i' to open iOS Simulator
Press 't' to enable Tunnel mode    ← RECOMENDADO
Press 'q' to exit
```

**Opción Recomendada: Tunnel**
```
Presiona 't' para activar Tunnel
```

Esto generará un QR que puedes escanear con **Expo Go**:
- [iOS App Store](https://apps.apple.com/es/app/expo-go/id982107779)
- [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

#### Paso 4: Usar la App Móvil

**Flujo base:**
1. **Calculadora**: Usa como calculadora normal
2. **Código 2580**: Activa pánico (envía alerta)
3. **Código 0000**: Accede a configuración (establece alias y códigos)

**En la pantalla de configuración:**
- Alias: Tu nombre (aparecerá en la alerta)
- Panic Code: Código para activar pánico (por defecto 2580)
- Settings Code: Código para acceder a configuración (por defecto 0000)

**Registrar dispositivo:**
- Al first launch, la app genera UUID única
- Se guarda en **almacenamiento seguro** (expo-secure-store)
- UUID se envía con cada alerta

---

## 🔄 Flujo de Uso

### Escenario: Usuario activa alerta

```
1. USUARIO (Móvil)
   └─→ Toca calculadora
   └─→ Ingresa código 2580 (pánico)
   └─→ App captura ubicación (GPS)
   └─→ App envía alerta: {uuid, alias, latitude, longitude}
   └─→ App continúa funcionando normalmente (sin notificación)

2. BACKEND (NestJS)
   └─→ Recibe POST /api/alerts/create
   └─→ Valida alias opcional
   └─→ Guarda en BD: alerts (status: NEW)
   └─→ Actualiza device.dev_alias con nuevo nombre
   └─→ Retorna: {success: true, alertId: 123}

3. DASHBOARD (Operador)
   └─→ Auto-refresh cada 5 segundos (hook useAutoRefreshAlerts)
   └─→ Detecta nueva alerta automáticamente
   └─→ Muestra:
       - Total de Alertas: +1
       - Nuevas: +1
       - Tabla con última alerta
   └─→ Operador verifica ubicación en mapa
   └─→ Cambia estado a IN_PROGRESS
   └─→ Contacta autoridades / víctima
   └─→ Cierra alerta cuando se resuelve
```

---

## ✅ MVP - Características Incluidas

### Backend API ✅ **COMPLETADO**
- [x] Base de datos PostgreSQL con 6 tablas
- [x] API REST completa (17 endpoints)
- [x] Autenticación JWT
- [x] Sistema de roles (Admin, Operator, Viewer)
- [x] Crear/listar/actualizar alertas
- [x] Tracking de ubicación GPS
- [x] Logs de auditoría
- [x] Validación de inputs
- [x] Hash seguro de contraseñas (bcrypt)

### App Móvil ✅ **COMPLETADO**
- [x] Calculadora funcional (iOS-style)
- [x] Detección de código 2580 (pánico)
- [x] Detección de código 0000 (configuración)
- [x] Pantalla de configuración
- [x] Auto-localización con timeout (5 segundos)
- [x] Envío silencioso de alertas
- [x] Alias personalizado
- [x] Almacenamiento seguro (SecureStore)
- [x] UUID único por dispositivo
- [x] Manejo de errores silencioso
- [x] Sincronización de alias (DEVICE_INFO + APP_CONFIG)

### Dashboard Web ✅ **COMPLETADO**
- [x] Login de operadores
- [x] Vista de alertas recientes (5 últimas)
- [x] Estadísticas en tiempo real:
  - Total de alertas
  - Nuevas (status: NEW)
  - En progreso (status: IN_PROGRESS)
  - Cerradas (status: CLOSED)
- [x] Auto-refresh inteligente (5 segundos)
- [x] Cambio de detección: solo actualiza si hay cambios reales
- [x] Sin parpadeos (isLoading solo en primera carga)
- [x] Manejo de errores

---

## 🔮 Próximas Características

### Backend
- [ ] WebSockets para tiempo real (en lugar de polling)
- [ ] Notificaciones push
- [ ] Integración SMS
- [ ] Reportes avanzados
- [ ] Geofencing (alertas por zona)

### App Móvil
- [ ] App para iOS (actualmente solo Android via Expo)
- [ ] Notificaciones push
- [ ] Historial de alertas
- [ ] Contactos de emergencia

### Dashboard
- [ ] Mapa interactivo con ubicaciones
- [ ] Filtros avanzados de alertas
- [ ] Reportes y búsqueda
- [ ] Gestión de operadores (crear/editar/eliminar)
- [ ] Exportar reportes (PDF/CSV)
- [ ] Análisis de patrones

---

## 📡 APIs y Endpoints

### Autenticación
```
POST   /api/auth/login              Login de operadores
GET    /api/auth/me                 Perfil del usuario autenticado
```

### Dispositivos
```
POST   /api/devices/register        Registrar nuevo dispositivo
PATCH  /api/devices/:id/configuration  Actualizar códigos de pánico
GET    /api/devices/:id             Ver detalles del dispositivo
```

### Alertas (Core)
```
POST   /api/alerts/create           Crear alerta (desde móvil)
GET    /api/alerts                  Listar todas las alertas
GET    /api/alerts/:id              Ver detalle de una alerta
PATCH  /api/alerts/:id/status       Cambiar estado de alerta
GET    /api/alerts/:id/logs         Ver historial de acciones
```

### Dashboard
```
GET    /api/dashboard/summary       Resumen estadístico
GET    /api/dashboard/recent-alerts Alertas recientes (últimas 5)
```

### Operadores (Admin)
```
POST   /api/operators               Crear nuevo operador
GET    /api/operators               Listar operadores
```

---

## 🧪 Testing de la API

### Probar Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'
```

Respuesta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@lv.com",
    "role": "ADMIN"
  }
}
```

### Probar Crear Alerta
```bash
curl -X POST http://localhost:3000/api/alerts/create \
  -H "Content-Type: application/json" \
  -d '{
    "deviceUuid": "550e8400-e29b-41d4-a716-446655440000",
    "alias": "María",
    "triggerType": "PANIC_CODE",
    "latitude": -0.123456,
    "longitude": -78.123456,
    "accuracy": 15.5
  }'
```

---

## 🔐 Seguridad

### Backend
- ✅ Passwords hasheados con bcrypt
- ✅ JWT con expiración de 24h
- ✅ Validación de inputs con class-validator
- ✅ Guards de autenticación en endpoints
- ✅ RBAC (Control de acceso por rol)

### App Móvil
- ✅ Almacenamiento seguro con expo-secure-store
- ✅ UUID único por dispositivo
- ✅ Alias sin exposición de identidad real
- ✅ No guarda ubicaciones localmente
- ✅ Comunicación HTTPS

### Dashboard
- ✅ Login obligatorio
- ✅ Tokens JWT verificados
- ✅ Logout automático
- ✅ Acceso basado en rol

---

## 📊 Base de Datos

### Tablas (Nomenclatura 3 letras)

| Tabla | Prefijo | Descripción |
|-------|---------|-------------|
| `dev_devices` | `dev_` | Dispositivos móviles registrados |
| `alt_alerts` | `alt_` | Alertas de emergencia |
| `alc_alert_locations` | `alc_` | Ubicaciones GPS de alertas |
| `alg_alert_logs` | `alg_` | Historial de acciones |
| `opr_operators` | `opr_` | Operadores del sistema |
| `tct_trusted_contacts` | `tct_` | Contactos de confianza (futuro) |

### Estados de Alerta
- `NEW` - Recién creada
- `IN_REVIEW` - Revisión por operador
- `IN_PROGRESS` - Acción en curso
- `ESCALATED` - Escalada a autoridades
- `CLOSED` - Resuelta
- `TEST` - Alerta de prueba

---

## 🔧 Credenciales por Defecto

Después de ejecutar `npm run prisma:seed`:

**Admin:**
- Email: `admin@lv.com`
- Password: `Admin123!`

**Operator:**
- Email: `operator@lv.com`
- Password: `Operator123!`

⚠️ **Cambiar en producción**

---

## 🗺️ Futuros Pasos

### Si quieres extender el proyecto:

1. **Agregar WebSockets**
   ```bash
   npm install @nestjs/websockets ws
   ```
   Reemplazar polling en dashboard con tiempo real

2. **Agregar MapBox**
   ```bash
   npm install react-map-gl mapbox-gl
   ```
   Mostrar ubicaciones en mapa interactivo

3. **Agregar notificaciones push**
   ```bash
   npm install expo-notifications
   ```
   Alertas visibles en dispositivo operador

4. **Agregar SMS**
   ```bash
   npm install twilio
   ```
   Notificaciones por SMS a contactos

---

## ⚠️ Troubleshooting

### Backend no inicia
```bash
# Puerto 3000 ocupado?
lsof -i :3000
kill -9 PID

# Base de datos no existe?
psql -U postgres -c "CREATE DATABASE quickcalc_db;"

# Usar nueva .env
rm .env
cp .env.example .env
# Editar DATABASE_URL correctamente
```

### Dashboard no se conecta al backend
```bash
# Verificar que backend está en http://localhost:3000
curl http://localhost:3000/api/auth/me

# Verificar NEXT_PUBLIC_API_URL en .env.local
cat .env.local

# Limpiar cache
rm -rf .next
npm run dev
```

### App móvil no se conecta a backend
```bash
# Con Tunnel habilitado, la app puede acceder a localhost:3000
# Sin Tunnel, necesitas IP local:
# Cambiar en .env: EXPO_PUBLIC_API_URL="http://192.168.X.X:3000"

# Verificar conexión desde móvil
# Abre la URL en navegador del teléfono
```

---

## 📚 Recursos Adicionales

- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## 📄 Licencia

MIT License - Este es un proyecto académico para el curso **Desarrollo Asistido por Software**

---

## 👥 Contribuciones

Este proyecto fue desarrollado como parte de un trabajo académico.

**Stack usado:**
- Backend: NestJS + Prisma + PostgreSQL ✅
- Frontend: Next.js + TypeScript ✅
- Mobile: Expo + React Native ✅

---

## 📞 Estado del Proyecto

| Componente | Estado | Detalles |
|-----------|--------|---------|
| Backend API | ✅ Completo | REST API funcional, JWT, DB |
| App Móvil | ✅ Completo | Calculadora, detección códigos, alertas |
| Dashboard | ✅ Completo | Login, alertas en tiempo real, auto-refresh |
| PostgreSQL | ✅ Completo | 6 tablas, migraciones, seed data |
| Seguridad | ✅ Completo | Bcrypt, JWT, secure storage |
| Testing E2E | ⏳ Futuro | Herramientas: Cypress, Playwright |

**Progreso general:** ✅ **100% MVP Completo**

---

## 🎯 Para Comenzar Rápidamente

```bash
# Terminal 1: Backend
cd quickcalc-api
npm install
npm run prisma:migrate
npm run prisma:seed
npm run start:dev

# Terminal 2: Dashboard
cd quickcalc-dashboard
npm install
npm run dev

# Terminal 3: Mobile
cd quickcalc-mobile
npm install
npm start
# Presiona 't' para Tunnel
```

Accede:
- Dashboard: http://localhost:3001
- Backend API: http://localhost:3000
- Mobile: Escanea QR con Expo Go

---

**¡El sistema está listo para usar! 🚀**

Este proyecto demuestra un workflow completo: base de datos relacional, backend seguro, frontend responsivo y app móvil nativa.
