# Quick Start - Iniciar Servicios

## 📋 Orden Correcto para Ejecutar Todo

### Terminal 1: Backend API (Puerto 3000)
```bash
cd quickcalc-api
npm run start:dev
```

✅ Espera ver:
```
🚀 QuickCalc API Server
📍 Server running on: http://0.0.0.0:3000
🔗 API Base URL: http://0.0.0.0:3000/api
```

---

### Terminal 2: Frontend Dashboard (Puerto 3001)
```bash
cd quickcalc-dashboard
npm run dev -- -p 3001
```

✅ Espera ver:
```
▲ Next.js (version)
- Local: http://localhost:3001
```

Luego accede a **http://localhost:3001** en tu navegador.

---

### Terminal 3: Mobile App (Expo)
```bash
cd quickcalc-mobile
npm start
```

Presiona **'t'** para Tunnel Mode (si quieres probar en Expo Go).

---

## 🔑 Credenciales de Prueba

Para el login del frontend, usa:
- **Email**: `operador@linevioleta.com`
- **Password**: `123456`

---

## 📱 Codes Ocultos en Mobile

- **2580** → Activa alerta de pánico
- **0000** → Abre pantalla de configuración oculta

---

## ✅ Requisitos antes de Iniciar

- ✓ Node.js 18+
- ✓ npm/yarn
- ✓ Base de datos inicializada (Prisma)
- ✓ `.env` configurados en:
  - `quickcalc-api/.env`
  - `quickcalc-dashboard/.env.local`

Si necesitas inicializar la DB:
```bash
cd quickcalc-api
npx prisma db push
```
