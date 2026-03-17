# Deployment Guide - QuickCalc API

Guía para desplegar la API de QuickCalc en diferentes entornos.

## 📋 Pre-requisitos

- Node.js 18+ instalado
- PostgreSQL 14+ instalado y corriendo
- npm o pnpm instalado
- Git (para clonar el proyecto)

## 🚀 Deployment en Local (Desarrollo)

### 1. Clonar o navegar al proyecto

```bash
cd quickcalc-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```env
# Database
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/quickcalc_db?schema=public"

# JWT
JWT_SECRET="quickcalc_super_secret_key_change_in_production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# App
APP_NAME="QuickCalc API"
APP_VERSION="1.0.0"
```

### 4. Crear base de datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE quickcalc_db;

# Salir
\q
```

### 5. Ejecutar migraciones

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Crear tablas
npm run prisma:migrate

# Poblar datos iniciales
npm run prisma:seed
```

### 6. Iniciar servidor

```bash
# Modo desarrollo
npm run start:dev

# O modo normal
npm start
```

### 7. Verificar instalación

```bash
# Test básico
curl http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'
```

## 🐳 Deployment con Docker

### Crear Dockerfile

```dockerfile
# quickcalc-api/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build
RUN npm run prisma:generate

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Crear docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    container_name: quickcalc-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: quickcalc_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - quickcalc-network

  api:
    build: .
    container_name: quickcalc-api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "postgresql://postgres:admin123@postgres:5432/quickcalc_db?schema=public"
      JWT_SECRET: "quickcalc_super_secret_key_change_in_production"
      JWT_EXPIRES_IN: "7d"
      PORT: 3000
      NODE_ENV: "production"
    depends_on:
      - postgres
    networks:
      - quickcalc-network
    command: sh -c "npx prisma migrate deploy && npx ts-node prisma/seed.ts && npm run start:prod"

volumes:
  postgres_data:

networks:
  quickcalc-network:
    driver: bridge
```

### Ejecutar con Docker Compose

```bash
# Build y start
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Stop
docker-compose down

# Stop y eliminar volúmenes
docker-compose down -v
```

## ☁️ Deployment en la Nube

### 1. Heroku

#### Preparación

```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Crear app
heroku create quickcalc-api

# Agregar PostgreSQL
heroku addons:create heroku-postgresql:mini
```

#### Crear Procfile

```
web: npm run start:prod
release: npx prisma migrate deploy
```

#### Deploy

```bash
# Push a Heroku
git push heroku main

# Ejecutar seed
heroku run npm run prisma:seed

# Ver logs
heroku logs --tail

# Abrir app
heroku open
```

### 2. Railway

1. Ir a [railway.app](https://railway.app)
2. Conectar repositorio de GitHub
3. Agregar PostgreSQL como servicio
4. Configurar variables de entorno:
   - `DATABASE_URL`: (automático)
   - `JWT_SECRET`: tu-secret-key
   - `JWT_EXPIRES_IN`: 7d
   - `PORT`: 3000
   - `NODE_ENV`: production

5. Deploy automático en cada push

### 3. Render

1. Ir a [render.com](https://render.com)
2. Crear nuevo Web Service
3. Conectar repositorio
4. Configuración:
   - Build Command: `npm install && npm run build && npx prisma generate`
   - Start Command: `npm run start:prod`
   - Environment Variables:
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `NODE_ENV=production`

5. Crear PostgreSQL database
6. Conectar database al servicio

### 4. AWS EC2

#### Preparación del servidor

```bash
# Conectar a EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Configurar PostgreSQL
sudo -u postgres psql
CREATE DATABASE quickcalc_db;
CREATE USER quickcalc_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE quickcalc_db TO quickcalc_user;
\q

# Instalar PM2
sudo npm install -g pm2
```

#### Deploy

```bash
# Clonar proyecto
git clone https://github.com/your-repo/quickcalc-api.git
cd quickcalc-api

# Instalar dependencias
npm install

# Configurar .env
nano .env
# (Pegar configuración de producción)

# Build
npm run build

# Migrar DB
npm run prisma:migrate
npm run prisma:seed

# Iniciar con PM2
pm2 start dist/main.js --name quickcalc-api

# Configurar para auto-inicio
pm2 startup
pm2 save

# Ver logs
pm2 logs quickcalc-api
```

#### Configurar Nginx (Recomendado)

```bash
# Instalar Nginx
sudo apt install nginx -y

# Configurar reverse proxy
sudo nano /etc/nginx/sites-available/quickcalc
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activar configuración
sudo ln -s /etc/nginx/sites-available/quickcalc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Configurar SSL con Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## 🔒 Seguridad en Producción

### Variables de Entorno

**NUNCA** uses estos valores en producción:

❌ `JWT_SECRET="quickcalc_super_secret_key_change_in_production"`
❌ `DATABASE_URL="postgresql://postgres:admin123@localhost:5432/quickcalc_db"`

**Genera valores seguros:**

```bash
# Generar JWT secret seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# O usar uuidgen
uuidgen
```

### Checklist de Seguridad

- [ ] Cambiar JWT_SECRET a valor aleatorio largo
- [ ] Cambiar contraseña de base de datos
- [ ] Cambiar credenciales de admin por defecto
- [ ] Configurar CORS para dominios específicos
- [ ] Habilitar HTTPS
- [ ] Configurar rate limiting
- [ ] Configurar helmet.js
- [ ] Habilitar logs de auditoría
- [ ] Configurar backup de base de datos
- [ ] Configurar monitoring (Sentry, New Relic, etc.)

### Rate Limiting

```typescript
// Agregar en main.ts
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Too many requests from this IP',
});

app.use(limiter);
```

### Helmet.js

```bash
npm install helmet
```

```typescript
// main.ts
import helmet from 'helmet';

app.use(helmet());
```

## 📊 Monitoring y Logs

### PM2 Logs

```bash
# Ver logs en tiempo real
pm2 logs quickcalc-api

# Logs históricos
pm2 logs quickcalc-api --lines 100

# Limpiar logs
pm2 flush
```

### Sentry (Error Tracking)

```bash
npm install @sentry/node
```

```typescript
// main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## 🔄 CI/CD con GitHub Actions

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "quickcalc-api"
          heroku_email: "your@email.com"
```

## 📈 Scaling

### Horizontal Scaling

Con PM2 cluster mode:

```bash
pm2 start dist/main.js -i max --name quickcalc-api
```

### Vertical Scaling

Aumentar recursos de servidor (RAM, CPU)

### Database Scaling

- Connection pooling con Prisma
- Read replicas para queries
- Índices optimizados

## 🔧 Troubleshooting

### Error: Cannot connect to database

```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar conexión
psql -U postgres -h localhost -d quickcalc_db
```

### Error: Port already in use

```bash
# Encontrar proceso en puerto 3000
lsof -ti:3000

# Matar proceso
kill -9 $(lsof -ti:3000)
```

### Error: Prisma migrations failed

```bash
# Reset y recrear
npx prisma migrate reset
npx prisma migrate deploy
npm run prisma:seed
```

## 📞 Soporte

Para problemas con el deployment:
1. Revisar logs: `pm2 logs` o `docker-compose logs`
2. Verificar variables de entorno
3. Verificar conexión a base de datos
4. Revisar documentación de Prisma
5. Contactar al equipo de desarrollo

---

**Última actualización**: 2024-01-01
**Versión**: 1.0.0
