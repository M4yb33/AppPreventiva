# QuickCalc API - Arquitectura del Sistema

## 📐 Visión General

QuickCalc es un sistema de alertas de emergencia que permite a víctimas de violencia activar una alerta silenciosa mediante un código oculto en una calculadora.

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                     QUICKCALC ECOSYSTEM                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Mobile App │───▶│  Backend API │◀──│  Dashboard   │ │
│  │  (Victim)    │    │   (NestJS)   │    │   (Next.js)  │ │
│  └──────────────┘    └──────┬───────┘    └──────────────┘ │
│                              │                               │
│                              ▼                               │
│                      ┌──────────────┐                       │
│                      │  PostgreSQL  │                       │
│                      │   (Prisma)   │                       │
│                      └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Arquitectura del Backend

### Estructura de Módulos

```
src/
├── modules/              # Módulos funcionales
│   ├── auth/            # Autenticación JWT
│   ├── devices/         # Gestión de dispositivos
│   ├── alerts/          # Sistema de alertas (CORE)
│   ├── operators/       # Gestión de operadores LV
│   └── dashboard/       # Endpoints para panel web
│
├── common/              # Recursos compartidos
│   ├── decorators/      # @CurrentUser, @Roles
│   ├── guards/          # JwtAuthGuard, RolesGuard
│   ├── filters/         # AllExceptionsFilter
│   ├── interceptors/    # TransformInterceptor
│   ├── dto/            # DTOs base
│   └── enums/          # Enums compartidos
│
├── prisma/             # ORM
│   ├── prisma.service.ts
│   └── prisma.module.ts
│
├── config/             # Configuración
│   └── env.config.ts
│
├── app.module.ts       # Módulo raíz
└── main.ts            # Bootstrap
```

## 🗄️ Arquitectura de Base de Datos

### Nomenclatura de 3 Letras

Todas las tablas usan prefijos de 3 letras para mejor organización:

| Prefijo | Tabla                  | Descripción                    |
|---------|------------------------|--------------------------------|
| `dev_`  | dev_devices            | Dispositivos móviles           |
| `tct_`  | tct_trusted_contacts   | Contactos de confianza         |
| `alt_`  | alt_alerts             | Alertas de emergencia          |
| `alc_`  | alc_alert_locations    | Ubicaciones de alertas         |
| `alg_`  | alg_alert_logs         | Logs de acciones en alertas    |
| `opr_`  | opr_operators          | Operadores del sistema LV      |

### Modelo de Datos

```
dev_devices (Dispositivos)
├── dev_id (PK)
├── dev_uuid (UUID único del dispositivo)
├── dev_alias (Nombre personalizado)
├── dev_platform (android/ios)
├── dev_is_configured (bool)
├── dev_panic_code_hash (bcrypt)
├── dev_settings_code_hash (bcrypt)
└── timestamps

tct_trusted_contacts (Contactos)
├── tct_id (PK)
├── tct_device_id (FK → dev_devices)
├── tct_name
├── tct_phone
├── tct_relationship
├── tct_priority
└── tct_created_at

alt_alerts (Alertas) ⭐ CORE
├── alt_id (PK)
├── alt_device_id (FK → dev_devices)
├── alt_status (enum: NEW, IN_REVIEW, etc.)
├── alt_trigger_type (PANIC_CODE, TEST_MODE)
├── alt_triggered_at
├── alt_last_known_latitude
├── alt_last_known_longitude
├── alt_internet_attempted
├── alt_internet_delivered
├── alt_sms_attempted
├── alt_sms_delivered
├── alt_assigned_to
├── alt_notes
└── timestamps

alc_alert_locations (Ubicaciones)
├── alc_id (PK)
├── alc_alert_id (FK → alt_alerts)
├── alc_latitude
├── alc_longitude
├── alc_accuracy
└── alc_captured_at

alg_alert_logs (Logs)
├── alg_id (PK)
├── alg_alert_id (FK → alt_alerts)
├── alg_action (enum)
├── alg_performed_by
├── alg_details
└── alg_created_at

opr_operators (Operadores)
├── opr_id (PK)
├── opr_full_name
├── opr_email (unique)
├── opr_password_hash (bcrypt)
├── opr_role (ADMIN, OPERATOR, VIEWER)
├── opr_is_active
└── timestamps
```

## 🔐 Seguridad

### Autenticación y Autorización

```typescript
// JWT Strategy
POST /auth/login → Token
  ↓
Bearer Token en headers
  ↓
JwtStrategy valida token
  ↓
Request.user = operator data
  ↓
RolesGuard verifica permisos
```

### Hashing

- **Passwords**: bcrypt con salt rounds = 10
- **Panic Codes**: bcrypt con salt rounds = 10
- **Settings Codes**: bcrypt con salt rounds = 10

### Validación

```typescript
// Todas las DTOs usan class-validator
class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  deviceUuid: string;

  @IsEnum(TriggerType)
  triggerType: TriggerType;

  @IsNumber()
  latitude: number;
  // ...
}
```

## 🔄 Flujo de Alertas

### 1. Creación de Alerta

```
Mobile App
    │
    │ 1. Usuario ingresa código oculto en calculadora
    │
    ▼
POST /api/alerts
    │
    │ 2. Backend busca dispositivo por UUID
    │
    ▼
Crear alt_alerts
    │
    │ 3. Estado = NEW
    │    Internet = true
    │
    ▼
Crear alc_alert_locations
    │
    │ 4. Guardar ubicación inicial
    │
    ▼
Crear alg_alert_logs
    │
    │ 5. Log: ALERT_CREATED
    │
    ▼
Response 200
    │
    │ 6. Mobile recibe confirmación
    │
    ▼
Dashboard actualiza
```

### 2. Gestión de Alerta

```
Dashboard (LV Operator)
    │
    │ 1. Ver alerta nueva
    │
    ▼
PATCH /api/alerts/:id/status
    │
    │ 2. Cambiar estado a IN_PROGRESS
    │    Asignar operador
    │    Agregar nota
    │
    ▼
Actualizar alt_alerts
    │
    │ 3. alt_status = IN_PROGRESS
    │    alt_assigned_to = "Operator Name"
    │    alt_notes = "Contactando..."
    │
    ▼
Crear alg_alert_logs
    │
    │ 4. Log: STATUS_CHANGED
    │
    ▼
Response 200
```

## 📡 API Design

### RESTful Endpoints

```
Authentication
├── POST   /api/auth/login
└── GET    /api/auth/me

Devices
├── POST   /api/devices/register
├── PATCH  /api/devices/:id/configuration
├── POST   /api/devices/:id/contacts
└── GET    /api/devices/:id/contacts

Alerts (CORE)
├── POST   /api/alerts
├── GET    /api/alerts
├── GET    /api/alerts/:id
├── PATCH  /api/alerts/:id/status
├── POST   /api/alerts/:id/location
└── GET    /api/alerts/:id/logs

Dashboard (Protected)
├── GET    /api/dashboard/summary
└── GET    /api/dashboard/recent-alerts

Operators (Admin)
├── POST   /api/operators
├── GET    /api/operators
└── GET    /api/operators/:id
```

### Response Format

Todas las respuestas siguen este formato:

```typescript
// Success
{
  "success": true,
  "message": "Operation successful",
  "data": { /* ... */ }
}

// Error
{
  "success": false,
  "message": "Error description",
  "error": "ErrorType"
}
```

## 🎯 Estados del Sistema

### Alert Status

```
NEW ────────────▶ IN_REVIEW ────────▶ IN_PROGRESS
                      │                     │
                      │                     ▼
                      │                  ESCALATED
                      │                     │
                      └──────┬──────────────┘
                             │
                             ▼
                          CLOSED

                          TEST (branch independiente)
```

### Trigger Types

- **PANIC_CODE**: Alerta real de emergencia
- **TEST_MODE**: Alerta de prueba

### Operator Roles

- **ADMIN**: Acceso completo
- **OPERATOR**: Gestión de alertas
- **VIEWER**: Solo lectura

## 🚀 Performance Considerations

### Indexing Strategy

```sql
-- Prisma genera estos índices automáticamente
CREATE UNIQUE INDEX dev_devices_dev_uuid_key ON dev_devices(dev_uuid);
CREATE UNIQUE INDEX opr_operators_opr_email_key ON opr_operators(opr_email);
CREATE INDEX idx_alerts_status ON alt_alerts(alt_status);
CREATE INDEX idx_alerts_device ON alt_alerts(alt_device_id);
CREATE INDEX idx_locations_alert ON alc_alert_locations(alc_alert_id);
```

### Caching Strategy (Futuro)

```typescript
// Redis cache para:
- Dashboard summary (TTL: 30s)
- Recent alerts (TTL: 10s)
- Operator profile (TTL: 5m)
```

## 📊 Monitoring y Logs

### Log Actions

```typescript
enum AlertLogAction {
  ALERT_CREATED,
  STATUS_CHANGED,
  LOCATION_UPDATED,
  ASSIGNED,
  NOTE_ADDED,
  INTERNET_DELIVERY_ATTEMPTED,
  INTERNET_DELIVERY_CONFIRMED,
  SMS_DELIVERY_ATTEMPTED,
  SMS_DELIVERY_CONFIRMED,
}
```

### Auditabilidad

Todos los cambios en alertas se registran en `alg_alert_logs`:
- Qué acción se realizó
- Quién la realizó
- Cuándo se realizó
- Detalles adicionales

## 🔮 Futuras Mejoras

### Fase 2
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Integración SMS real
- [ ] Geofencing
- [ ] Notificaciones push

### Fase 3
- [ ] Machine Learning para detección de patrones
- [ ] Integración con autoridades
- [ ] App móvil iOS
- [ ] Sistema de reportes avanzados

## 📱 Mobile Integration

### Flow Chart

```
User → Calculator App
         │
         │ Ingresa código oculto (ej: 9999)
         ├───────────────┐
         │               │
         ▼               ▼
      Código        Código
      correcto      normal
         │               │
         │               ▼
         │         Cálculo normal
         │
         ▼
   Capturar ubicación
         │
         ▼
   POST /api/alerts
         │
         ▼
   Mostrar calculadora normal
   (Sin indicar que se activó)
```

## 🌐 CORS y Security Headers

```typescript
// CORS Config
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

// Future: Helmet para security headers
```

## 📝 Nomenclatura y Convenciones

### Código TypeScript
- **Clases**: PascalCase (`DevicesService`)
- **Métodos**: camelCase (`createAlert()`)
- **Constantes**: UPPER_SNAKE_CASE (`JWT_SECRET`)
- **Interfaces**: PascalCase con prefijo I (`IDevice`)

### Base de Datos
- **Tablas**: 3_letter_prefix_snake_case (`dev_devices`)
- **Columnas**: prefix_snake_case (`dev_uuid`)
- **Índices**: idx_table_column (`idx_alerts_status`)

### API Endpoints
- **Recursos**: plural en minúsculas (`/devices`, `/alerts`)
- **IDs**: `:id` como parámetro de ruta
- **Query params**: camelCase (`?limit=10`)

## 🎓 Principios de Diseño

1. **Separación de Responsabilidades**: Cada módulo tiene una responsabilidad clara
2. **DRY**: Common utilities compartidos entre módulos
3. **SOLID**: Inyección de dependencias con NestJS
4. **Security First**: Validación, autenticación, autorización en todas las capas
5. **API First**: Backend diseñado para múltiples clientes (móvil, web, futuro)
6. **Auditabilidad**: Todos los cambios críticos se registran
7. **Fail-Safe**: Sistema debe fallar de manera segura, nunca comprometer la seguridad de la víctima

---

**Versión**: 1.0.0
**Última actualización**: 2024-01-01
**Mantenido por**: Equipo LV
