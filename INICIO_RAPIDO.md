# 🚀 INICIO SIMPLE - AppPreventiva

Abre **3 terminales separadas** y ejecuta en ESTE ORDEN:

---

## 1️⃣ TERMINAL 1 - Backend API (Puerto 3000)

```bash
cd quickcalc-api
npm run start:dev
```

✅ **Espera a ver:**
```
🚀 NestJS app successfully started
```

---

## 2️⃣ TERMINAL 2 - Frontend Dashboard (Puerto 3001)

```bash
cd quickcalc-dashboard
npm run dev -- -p 3001
```

✅ **Espera a ver:**
```
▲ Next.js x.x.x
- Local: http://localhost:3001
```

Abre tu navegador en **http://localhost:3001**

---

## 3️⃣ TERMINAL 3 - Mobile App (Expo)

```bash
cd quickcalc-mobile
npm start
```

✅ **En el menu que aparece:**
- Presiona `'t'` para **Tunnel** (recomendado)
- Escanea el código QR conExpo Go

---

## 📝 Credenciales para el Login

Email: `operador@linevioleta.com`
Password: `123456`

---

## 🔑 Códigos Ocultos en Mobile

- **2580** → Alerta de pánico silenciosa
- **0000** → Abre pantalla de configuración

---

## ⚠️ IMPORTANTE

Si en el Backend ves este error:
```
Error: listen EADDRINUSE: address already in use :::3000
```

Ejecuta esto en PowerShell **como Administrador**:
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

Luego reinicia el backend.

---

## 🖱️ Scripts Rápidos de Windows

En la raíz del proyecto tienes:
- `start-backend.bat` - Inicia solo el backend
- `start-frontend.bat` - Inicia solo el frontend
- `start-mobile.bat` - Inicia solo el móvil

Haz doble clic para ejecutar.
