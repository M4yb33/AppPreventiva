# AppPreventiva - QuickCalc Emergency Alert System

Sistema integral de alertas de emergencia para víctimas de violencia, que incluye una aplicación móvil con calculadora oculta y un panel de gestión para operadores.

## 🎯 Visión General

**AppPreventiva** es un sistema de alertas de pánico diseñado para ayudar a víctimas de violencia de género. El sistema permite activar alertas silenciosas mediante un código oculto en una calculadora funcional, sin levantar sospechas.

### Componentes del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    AppPreventiva System                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Mobile App │───▶│  Backend API │◀──│  Dashboard   │ │
│  │  (Calculadora)│    │   (NestJS)   │    │   (Next.js)  │ │
│  │  React Native │    │  PostgreSQL  │    │    Panel LV  │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│        ✅                    ✅                    ⏳        │
│     PENDIENTE           COMPLETADO              PENDIENTE    │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Estructura del Proyecto

```
AppPreventiva/
├── quickcalc-api/           ✅ COMPLETADO
│   ├── Backend con NestJS
│   ├── Base de datos PostgreSQL
│   ├── API REST completa
│   └── Documentación completa
│
├── quickcalc-mobile/        ⏳ PENDIENTE
│   ├── React Native + Expo
│   ├── Calculadora funcional
│   ├── Detección de código oculto
│   └── Captura de ubicación
│
└── quickcalc-dashboard/     ⏳ PENDIENTE
    ├── Next.js + TypeScript
    ├── Panel de operadores
    ├── Gestión de alertas
    └── Mapas y ubicaciones
```

## 🚀 Estado del Proyecto

### ✅ Backend API (100% Completo)

El backend está **completamente funcional** y listo para usar.

**Ubicación:** `quickcalc-api/`

**Características:**
- ✅ API REST con 17 endpoints
- ✅ Base de datos PostgreSQL con 6 tablas
- ✅ Autenticación JWT
- ✅ Sistema de roles (Admin, Operator, Viewer)
- ✅ Sistema de alertas completo
- ✅ Tracking de ubicación
- ✅ Logs de auditoría
- ✅ Documentación completa

**Tecnologías:**
- NestJS + TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt

**Documentación disponible:**
```
quickcalc-api/
├── README.md                    - Introducción general
├── QUICKSTART_WINDOWS.md        - Inicio rápido paso a paso
├── COMPLETE_SUMMARY.md          - Resumen completo del proyecto
├── PROJECT_STATUS.md            - Estado actual y próximos pasos
├── COMMANDS.md                  - Comandos útiles
├── API_TESTING.md               - Guía de testing de API
├── ARCHITECTURE.md              - Arquitectura del sistema
└── DEPLOYMENT.md                - Guía de deployment
```

**Para iniciar el backend:**
```bash
cd quickcalc-api

# Ver la guía de inicio rápido
cat QUICKSTART_WINDOWS.md

# O directamente:
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

### ⏳ Mobile App (Pendiente)

**Ubicación prevista:** `quickcalc-mobile/`

**Funcionalidades planeadas:**
- Calculadora completamente funcional
- Detección de código de pánico oculto (ej: 9999)
- Captura automática de ubicación GPS
- Envío silencioso de alerta al backend
- Modo de prueba
- Configuración de códigos personalizados
- Gestión de contactos de confianza

**Stack tecnológico propuesto:**
- React Native
- Expo
- TypeScript
- React Navigation
- Expo Location
- Axios

### ⏳ Dashboard Web (Pendiente)

**Ubicación prevista:** `quickcalc-dashboard/`

**Funcionalidades planeadas:**
- Login de operadores
- Vista de alertas en tiempo real
- Mapa con ubicaciones
- Gestión de estados de alertas
- Historial de acciones
- Estadísticas y métricas
- Gestión de operadores (admin)

**Stack tecnológico propuesto:**
- Next.js 14
- TypeScript
- TailwindCSS
- Mapbox/Google Maps
- SWR o React Query
- Chart.js

## 🎯 Flujo del Sistema

### 1. Activación de Alerta (Móvil)

```
Usuario ingresa código oculto (9999)
        ↓
App captura ubicación GPS
        ↓
Envía alerta al backend
        ↓
Backend guarda alerta (estado: NEW)
        ↓
App continúa funcionando normalmente
(No da señales de que se activó)
```

### 2. Gestión de Alerta (Dashboard)

```
Operador ve alerta nueva
        ↓
Revisa ubicación en mapa
        ↓
Cambia estado a IN_PROGRESS
        ↓
Contacta a víctima o autoridades
        ↓
Actualiza notas y estado
        ↓
Cierra alerta cuando se resuelve
```

## 📊 Base de Datos

### Nomenclatura de 3 Letras

| Prefijo | Tabla | Descripción |
|---------|-------|-------------|
| `dev_` | devices | Dispositivos móviles registrados |
| `tct_` | trusted_contacts | Contactos de confianza de la víctima |
| `alt_` | alerts | Alertas de emergencia (CORE) |
| `alc_` | alert_locations | Ubicaciones GPS de las alertas |
| `alg_` | alert_logs | Historial de acciones en alertas |
| `opr_` | operators | Operadores del sistema LV |

### Estados de Alerta

- **NEW**: Alerta recién creada
- **IN_REVIEW**: Siendo revisada por operador
- **IN_PROGRESS**: Operador tomando acción
- **ESCALATED**: Escalada a autoridades
- **CLOSED**: Resuelta
- **TEST**: Alerta de prueba

## 🔐 Seguridad

### Backend
- ✅ Passwords hasheados con bcrypt
- ✅ Códigos de pánico hasheados
- ✅ JWT con expiración
- ✅ Validación de inputs
- ✅ Guards de autenticación
- ✅ RBAC (Control de acceso por roles)

### Mobile (Planeado)
- 🔄 Almacenamiento seguro de tokens
- 🔄 Comunicación HTTPS
- 🔄 Validación local de códigos
- 🔄 No guardar ubicaciones localmente

### Dashboard (Planeado)
- 🔄 Login seguro
- 🔄 Sesiones con timeout
- 🔄 Logs de auditoría
- 🔄 Acceso según rol

## 🚀 Desarrollo

### Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm o pnpm
- Git

### Backend (Ya disponible)

```bash
# Navegar al backend
cd quickcalc-api

# Instalar dependencias (ya hecho)
npm install

# Configurar .env (ya hecho)
# DATABASE_URL="postgresql://postgres:admin123@localhost:5432/quickcalc_db"

# Iniciar PostgreSQL (tu acción)
# Ver QUICKSTART_WINDOWS.md

# Migrar base de datos
npm run prisma:migrate

# Poblar datos iniciales
npm run prisma:seed

# Iniciar servidor
npm run start:dev

# Servidor corriendo en http://localhost:3000
```

### Mobile (Próximamente)

```bash
# Crear proyecto
cd ..
npx create-expo-app quickcalc-mobile --template

# Instalar dependencias
cd quickcalc-mobile
npm install

# Iniciar
npm start
```

### Dashboard (Próximamente)

```bash
# Crear proyecto
cd ..
npx create-next-app@latest quickcalc-dashboard --typescript --tailwind

# Instalar dependencias
cd quickcalc-dashboard
npm install

# Iniciar
npm run dev
```

## 📖 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login de operadores
- `GET /api/auth/me` - Perfil del operador

### Dispositivos
- `POST /api/devices/register` - Registrar dispositivo
- `PATCH /api/devices/:id/configuration` - Configurar códigos
- `POST /api/devices/:id/contacts` - Agregar contacto
- `GET /api/devices/:id/contacts` - Listar contactos

### Alertas ⭐
- `POST /api/alerts` - Crear alerta (PÁNICO)
- `GET /api/alerts` - Listar alertas
- `GET /api/alerts/:id` - Ver detalle de alerta
- `PATCH /api/alerts/:id/status` - Cambiar estado
- `POST /api/alerts/:id/location` - Agregar ubicación
- `GET /api/alerts/:id/logs` - Ver historial

### Dashboard
- `GET /api/dashboard/summary` - Resumen estadístico
- `GET /api/dashboard/recent-alerts` - Alertas recientes

### Operadores (Admin)
- `POST /api/operators` - Crear operador
- `GET /api/operators` - Listar operadores

## 🧪 Testing

### Backend

```bash
cd quickcalc-api

# Verificar que el servidor está corriendo
curl http://localhost:3000/api/auth/login

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'

# Ver guía completa de testing
cat API_TESTING.md
```

## 📞 Credenciales por Defecto

Después de ejecutar `npm run prisma:seed`:

**Admin:**
- Email: `admin@lv.com`
- Password: `Admin123!`

**Operator:**
- Email: `operator@lv.com`
- Password: `Operator123!`

**⚠️ Cambiar en producción!**

## 🗺️ Roadmap

### Fase 1: Backend ✅ COMPLETADO
- [x] Diseño de base de datos
- [x] API REST completa
- [x] Autenticación JWT
- [x] Sistema de alertas
- [x] Tracking de ubicación
- [x] Logs de auditoría
- [x] Documentación

### Fase 2: Mobile App 🔄 EN PROGRESO
- [ ] Calculadora funcional
- [ ] Detección de código oculto
- [ ] Integración con API
- [ ] Captura de ubicación
- [ ] Modo offline
- [ ] Testing

### Fase 3: Dashboard 📋 PLANEADO
- [ ] Login y autenticación
- [ ] Vista de alertas
- [ ] Mapa de ubicaciones
- [ ] Gestión de estados
- [ ] Estadísticas
- [ ] Gestión de operadores

### Fase 4: Mejoras 🔮 FUTURO
- [ ] Notificaciones push
- [ ] WebSockets para tiempo real
- [ ] Integración SMS
- [ ] Geofencing
- [ ] App iOS
- [ ] Reportes avanzados

## 🤝 Contribuir

Este es un proyecto académico para el curso de Desarrollo Asistido por Software.

### Estructura de Commits

```
type(scope): message

Tipos:
- feat: Nueva característica
- fix: Corrección de bug
- docs: Documentación
- refactor: Refactorización
- test: Tests
```

## 📄 Licencia

MIT License - Ver LICENSE para más detalles

## 👥 Equipo

**Desarrollo:**
- Backend: ✅ Completado
- Mobile: 📋 Pendiente
- Dashboard: 📋 Pendiente

**Institución:**
- Universidad: [Tu Universidad]
- Curso: Desarrollo Asistido por Software
- Profesor: [Nombre del profesor]

## 📚 Recursos

### Documentación del Backend
- [Inicio Rápido](./quickcalc-api/QUICKSTART_WINDOWS.md)
- [Resumen Completo](./quickcalc-api/COMPLETE_SUMMARY.md)
- [API Testing](./quickcalc-api/API_TESTING.md)
- [Arquitectura](./quickcalc-api/ARCHITECTURE.md)
- [Deployment](./quickcalc-api/DEPLOYMENT.md)

### Tecnologías
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Native Documentation](https://reactnative.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🎯 Próximos Pasos

1. **Iniciar PostgreSQL y probar el backend**
   ```bash
   cd quickcalc-api
   # Seguir QUICKSTART_WINDOWS.md
   ```

2. **Desarrollar la app móvil**
   - Crear proyecto con Expo
   - Implementar calculadora
   - Conectar con API

3. **Desarrollar el dashboard**
   - Crear proyecto con Next.js
   - Implementar vistas
   - Integrar mapas

## 📞 Soporte

Para problemas con:
- **Backend**: Ver `quickcalc-api/QUICKSTART_WINDOWS.md`
- **API**: Ver `quickcalc-api/API_TESTING.md`
- **General**: Revisar documentación en cada carpeta

---

## ✨ Estado Actual

**Última actualización:** 2024-01-01

| Componente | Estado | Progreso |
|------------|--------|----------|
| Backend API | ✅ Completo | 100% |
| Base de Datos | ✅ Completo | 100% |
| Documentación | ✅ Completo | 100% |
| Mobile App | ⏳ Pendiente | 0% |
| Dashboard | ⏳ Pendiente | 0% |
| Testing E2E | ⏳ Pendiente | 0% |

**Progreso general:** 33% (1 de 3 componentes principales)

---

**¡Gracias por tu interés en AppPreventiva!**

Este proyecto tiene como objetivo ayudar a personas en situaciones de vulnerabilidad mediante tecnología accesible y efectiva.
