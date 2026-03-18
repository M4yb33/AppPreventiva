# 🪟 SOLUCIÓN: Error de Metro Bundler en Windows

## El Problema

Cuando intentas ejecutar `npx expo start --tunnel` en Windows, obtienes:

```
Error: El sistema no puede encontrar la ruta especificada.
    at notFoundError (cross-spawn/lib/enoent.js:6:26)
```

Este error ocurre en el módulo `cross-spawn`, que es lo que Metro Bundler usa para iniciar procesos en Windows.

---

## La Solución ✅

### Opción 1: Usar `npm start` (RECOMENDADO)

En lugar de:
```bash
npx expo start --tunnel
```

Usa:
```bash
npm start
```

Luego:
1. Espera a que salga el menú interactivo
2. Presiona **`t`** para activar Tunnel
3. ¡Listo!

**Por qué funciona**: `npm start` evita el error de cross-spawn y deja que Expo inicie Metro bundler correctamente.

---

### Opción 2: Usar el Script Batch (Windows)

Double-click en:
```
fix-tunnel.bat
```

O en una terminal (desde la raíz del proyecto):
```batch
fix-tunnel.bat
```

El script hace:
1. ✅ Actualiza expo-cli globalmente
2. ✅ Limpia caché de Metro
3. ✅ Verifica node_modules
4. ✅ Ejecuta `npm start` automáticamente
5. ✅ Instrucciones para presionar 't'

---

### Opción 3: Script Bash (Mac/Linux)

Si estás en Mac/Linux:
```bash
bash fix-tunnel.sh
```

---

## Checklist Rápido

Si aún tienes problemas:

```bash
# 1. Entrar en el directorio mobile
cd quickcalc-mobile

# 2. Limpiar todo
rm -rf node_modules .expo .next .watchmanconfig
npm cache clean --force

# 3. Reinstalar
npm install

# 4. Iniciar (método que funciona en Windows)
npm start

# 5. En el menú, presiona 't' para Tunnel
```

---

## Por Qué Este Error Ocurre en Windows

- **Windows PATH**: Metro bundler intenta spawnar procesos usando una ruta que no existe en el environment
- **cross-spawn**: El módulo que usa exo para crear procesos falla en ciertas configuraciones de Windows
- **Workaround**: `npm start` inicia sin necesidad de spawnar procesos adicionales, evitando el error

---

## Alternativa: Usar ngrok

Si `npm start` aún falla, puedes usar ngrok:

```bash
# 1. Descargar de https://ngrok.com

# 2. Configurar token:
ngrok config add-authtoken TU_TOKEN

# 3. En otra terminal:
cd quickcalc-api
npm run start:dev

# 4. Exponer:
ngrok http 3000

# 5. Copiar URL (ej: https://abc123.ngrok.io)

# 6. En quickcalc-mobile/.env:
EXPO_PUBLIC_API_URL=https://abc123.ngrok.io/api

# 7. Iniciar Expo:
npm start
```

---

## ✅ Confirmación de Éxito

Cuando todo funcione correctamente, verás en la terminal:

```
✨  Expo is ready!

Local:        http://localhost:8081
Tunnel:       expo+demo://example.exp.direct

> Press t │ toggle tunnel
> Press a │ open Android
> Press i │ open iOS
> Press w │ open web
> ...
```

Si ves el **Tunnel URL** (hay que usar `expo+` y no `http://`), significa que el Tunnel está activo.

---

## 📱 Próximos Pasos

1. ✅ Abre Expo Go en tu móvil
2. ✅ Escanea el QR o pega el Tunnel URL
3. ✅ ¡La aplicación debería cargar!

---

## 🆘 Si Nada Funciona

1. Verifica que tienes conexión a internet
2. Verifica que Node.js está instalado: `node --version`
3. Verifica que npm está actualizado: `npm -v`
4. Intenta desde una terminal fresca (cierra y reabre)
5. Si persiste, usa ngrok como alternativa

¡Éxito! 🚀
