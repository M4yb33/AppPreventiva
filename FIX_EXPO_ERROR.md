# 🔧 ARREGLO - Expo "Something went wrong"

## Problemas Encontrados y Solucionados

### 1. Error en App.tsx - Navigation Options
**Problema**: Las opciones `cardStyle`, `animationEnabled` y `animationTypeForReplace: 'fade'` no existen en el tipo `NativeStackNavigationOptions`

**Solución**: Removidas opciones no válidas, dejando solo `headerShown: false`

### 2. Error en api.ts - Función con parámetros inválidos
**Problema**: `silentError('API Error', error.message)` llamaba con 2 argumentos cuando la función espera solo 1

**Solución**: Cambiar a `silentError('API Error: ' + error.message)`

### 3. Error en location.service.ts - LocationOptions
**Problema**: Opción `timeout` no existe en `LocationOptions` de expo-location

**Solución**: Remover `timeout`, el timeout ya está manejado por `getLocationWithTimeout()`

---

## ✅ Archivos Arreglados

✓ `App.tsx` - Navegación simplificada
✓ `src/services/api.ts` - Error handler correcto
✓ `src/services/location.service.ts` - LocationOptions válidas
✓ **TypeScript compilation: OK** - Sin errores

---

## 🚀 Ahora Para Ejecutar Mobile

### Opción A: Con Limpieza (Recomendado si aún ves errores)
```bash
double-click: clean-expo-cache.bat
# Espera a que termine
# Luego:
double-click: start-mobile-clean.bat
```

### Opción B: Solo Reiniciar
```bash
cd quickcalc-mobile
npm start -- --clear
# Presiona 't' para TUNNEL
```

### Opción C: Normal (Si todo funciona)
```bash
cd quickcalc-mobile
npm start
```

---

## 📝 Qué significa "something went wrong" en Expo

Es un error genérico que significa que hubo un problema compilando el JavaScript o en runtime. Las causas más comunes son:

1. **Error de TypeScript** ← YA ARREGLADO ✅
2. **Error de import/módulo** ← Verificado ✅
3. **Caché corrupto** ← Usa `clean-expo-cache.bat`
4. **Puerto ocupado** ← Verifica `netstat -ano | find ":19000"`

---

## Si Sigue Sin Funcionar

1. Ejecuta `clean-expo-cache.bat`
2. Abre el error log en: `~/.expo/logs/`
3. Usa `npx expo doctor` para diagnóstico
