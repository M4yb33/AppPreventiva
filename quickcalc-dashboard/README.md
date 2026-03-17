# QuickCalc Dashboard - Panel Web de Gestión

Panel web profesional para gestión de alertas de emergencia del sistema QuickCalc.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

## ⚙️ Configuración

Configura las variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # Rutas de Next.js
│   ├── login/             # Página de login
│   ├── dashboard/         # Dashboard principal
│   ├── alerts/            # Lista y detalle de alertas
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globales
│
├── components/            # Componentes reutilizables
│   ├── layout/           # Sidebar, Topbar, Layout privado
│   ├── ui/               # Button, Card, Badge, Modal, etc
│   ├── auth/             # LoginForm
│   ├── dashboard/        # Widgets del dashboard
│   ├── alerts/           # Componentes de alertas
│   └── common/           # Componentes compartidos
│
├── services/             # Capa de servicios (API)
│   ├── api.ts           # Instancia de Axios
│   ├── auth.service.ts  # Servicios de autenticación
│   ├── alerts.service.ts # Servicios de alertas
│   └── dashboard.service.ts # Servicios del dashboard
│
├── hooks/                # Custom hooks
│   ├── useAuth.ts       # Hook de autenticación
│   ├── useAlerts.ts     # Hook de alertas
│   └── useDashboard.ts  # Hook del dashboard
│
├── context/              # Context API
│   └── AuthContext.tsx  # Contexto de autenticación
│
├── types/                # Tipos TypeScript
│   ├── auth.ts          # Tipos de autenticación
│   ├── alert.ts         # Tipos de alertas
│   ├── dashboard.ts     # Tipos del dashboard
│   └── api.ts           # Tipos genéricos de API
│
└── lib/                  # Utilidades
    ├── auth.ts          # Utilidades de auth
    ├── constants.ts     # Constantes de la app
    ├── utils.ts         # Funciones auxiliares
    └── maps.ts          # Utilidades de mapas
```

## 🔐 Autenticación

El sistema usa JWT almacenado en `localStorage`.

**Credenciales por defecto:**
- Email: `admin@lv.com`
- Password: `Admin123!`

## 📱 Características

### Dashboard
- ✅ Resumen estadístico de alertas
- ✅ Gráficos y métricas clave
- ✅ Lista de alertas recientes
- ✅ Acceso rápido a funciones

### Gestión de Alertas
- ✅ Lista completa de alertas
- ✅ Filtrado por estado
- ✅ Búsqueda por ID o dispositivo
- ✅ Badges de estado visual
- ✅ Detalles completos de cada alerta

### Detalle de Alerta
- ✅ Información del dispositivo
- ✅ Ubicación GPS con link a Google Maps
- ✅ Historial de acciones (logs)
- ✅ Cambio de estado
- ✅ Agregado de notas
- ✅ Asignación de operador

### Estados de Alerta
- `NEW` - Nueva
- `IN_REVIEW` - En revisión
- `IN_PROGRESS` - En progreso
- `ESCALATED` - Escalada
- `CLOSED` - Cerrada
- `TEST` - Prueba

## 🎨 Diseño

El diseño sigue principios corporativos profesionales:
- Paleta de colores institucional
- Tipografía limpia y legible
- Espaciado consistente
- Responsive design
- Animaciones sutiles
- Feedback visual claro

## 📊 Flujo de Uso

1. **Login** → Autenticación con backend
2. **Dashboard** → Vista general del sistema
3. **Alertas** → Listado completo
4. **Detalle** → Información y acciones
5. **Gestión** → Cambio de estado y notas

## 🔗 Integración con Backend

El dashboard consume la API REST del backend QuickCalc:

- `POST /auth/login` - Autenticación
- `GET /auth/me` - Perfil del usuario
- `GET /dashboard/summary` - Resumen estadístico
- `GET /dashboard/recent-alerts` - Alertas recientes
- `GET /alerts` - Lista de alertas
- `GET /alerts/:id` - Detalle de alerta
- `PATCH /alerts/:id/status` - Actualizar estado
- `GET /alerts/:id/logs` - Historial

## 🛠️ Desarrollo

### Comandos útiles

```bash
# Desarrollo
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

### Agregar nuevos componentes

```bash
# Crear componente UI
src/components/ui/NuevoComponente.tsx

# Crear servicio
src/services/nuevo.service.ts

# Crear tipo
src/types/nuevo.ts
```

## 📝 Convenciones de Código

- Componentes en PascalCase: `AlertCard.tsx`
- Archivos de servicio: `alerts.service.ts`
- Hooks: `useAlerts.ts`
- Tipos: Interfaces con prefijo `I` o tipos directos
- Constantes: UPPER_SNAKE_CASE

## 🚀 Deploy

```bash
# Build
npm run build

# Iniciar
npm start
```

## 📄 Licencia

MIT License

---

**Proyecto:** QuickCalc - Sistema de Alertas de Emergencia
**Módulo:** Dashboard Web
**Tecnologías:** Next.js + TypeScript + Tailwind + Axios
**Versión:** 1.0.0
