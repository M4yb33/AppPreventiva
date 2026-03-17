# QuickCalc API - Quick Commands

Comandos rápidos para trabajar con el proyecto.

## 📦 Instalación

```bash
# Navegar al proyecto
cd quickcalc-api

# Instalar dependencias
npm install

# Generar cliente de Prisma
npm run prisma:generate

# Crear y ejecutar migración
npm run prisma:migrate

# Crear operador inicial
npm run prisma:seed
```

## 🚀 Desarrollo

```bash
# Iniciar en modo desarrollo (con hot-reload)
npm run start:dev

# Iniciar en modo normal
npm start

# Iniciar en modo debug
npm run start:debug
```

## 🗄️ Base de Datos

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Crear migración
npm run prisma:migrate

# Abrir Prisma Studio (GUI)
npm run prisma:studio

# Ejecutar seed (datos iniciales)
npm run prisma:seed

# Reset completo de la base de datos
npx prisma migrate reset
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:cov
```

## 🏗️ Build y Producción

```bash
# Build del proyecto
npm run build

# Ejecutar versión de producción
npm run start:prod
```

## 🔧 Utilidades

```bash
# Formatear código
npm run format

# Lint
npm run lint

# Fix lint issues
npm run lint -- --fix
```

## 📊 Monitoreo

```bash
# Ver logs en desarrollo
npm run start:dev

# Ver estructura de la base de datos
npm run prisma:studio
```

## 🧹 Limpieza

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpiar dist
rm -rf dist

# Limpiar todo y empezar de cero
rm -rf node_modules dist package-lock.json
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## 🐳 Docker (Opcional)

```bash
# Construir imagen
docker build -t quickcalc-api .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env quickcalc-api

# Docker Compose
docker-compose up -d
docker-compose down
```

## 📝 Credenciales por Defecto

Después de ejecutar `npm run prisma:seed`:

**Admin:**
- Email: `admin@lv.com`
- Password: `Admin123!`

**Operator:**
- Email: `operator@lv.com`
- Password: `Operator123!`

## 🔗 URLs Útiles

- API Base: `http://localhost:3000/api`
- Prisma Studio: `http://localhost:5555` (después de `npm run prisma:studio`)
- Documentación API: Ver `API_TESTING.md`

## 🚨 Troubleshooting

### Error: Puerto ya en uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: Prisma Client no generado
```bash
npm run prisma:generate
```

### Error: Migración fallida
```bash
npx prisma migrate reset
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Error: Base de datos no conecta
1. Verificar que PostgreSQL esté corriendo
2. Verificar credenciales en `.env`
3. Verificar que la base de datos `quickcalc_db` exista

```bash
# Crear base de datos manualmente (si no existe)
psql -U postgres
CREATE DATABASE quickcalc_db;
\q
```

## 📖 Comandos de PostgreSQL

```bash
# Conectar a PostgreSQL
psql -U postgres -h localhost

# Listar bases de datos
\l

# Conectar a quickcalc_db
\c quickcalc_db

# Listar tablas
\dt

# Ver estructura de tabla
\d dev_devices

# Salir
\q
```

## 🎯 Testing Rápido

```bash
# 1. Registrar dispositivo
curl -X POST http://localhost:3000/api/devices/register \
  -H "Content-Type: application/json" \
  -d '{"deviceUuid":"test-device-001","platform":"android"}'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'

# 3. Crear alerta
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"deviceUuid":"test-device-001","triggerType":"PANIC_CODE","latitude":-0.1807,"longitude":-78.4678}'
```
