# 📦 .gitignore - Configuración Actualizada

## ✅ Qué Se Ignora Ahora

### Mobile (Expo) Específicamente
```
.expo/                    # Caché de Expo
.expo-shared/            # Datos compartidos de Expo
.metro-health-check*     # Metro bundler
.watchmanconfig          # Watchman cache
.gradle/                 # Gradle cache
*.eas.json              # EAS config local
quickcalc-mobile/.env   # Variables de entorno del mobile
```

### Nota Importante
✅ Se mantiene: `quickcalc-mobile/.env.example` (para que otros vean cómo configurarlo)

### General (Todo el Proyecto)
- `node_modules/` (en cualquier carpeta)
- `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- `.next/`, `dist/`, `build/` (compilados)
- `.env`, `.env.local` (variables de entorno/secretos)
- `.vscode/*` (excepto settings.json, tasks.json, launch.json, extensions.json)
- Cache, logs, archivos temporales

---

## 📋 Estructura de Archivos NO Commiteados

```
AppPreventiva/
├── quickcalc-api/
│   ├── node_modules/          ❌ IGNORADO
│   ├── dist/                  ❌ IGNORADO (compilado)
│   └── .env                   ❌ IGNORADO (secretos)
│
├── quickcalc-dashboard/
│   ├── node_modules/          ❌ IGNORADO
│   ├── .next/                 ❌ IGNORADO (compilado)
│   └── .env.local             ❌ IGNORADO (secretos)
│
├── quickcalc-mobile/
│   ├── node_modules/          ❌ IGNORADO
│   ├── .expo/                 ❌ IGNORADO (caché de Expo)
│   ├── .expo-shared/          ❌ IGNORADO
│   ├── .env                   ❌ IGNORADO (secretos)
│   └── .env.example           ✅ INCLUIDO (plantilla)
│
└── .gitignore                 ✅ INCLUIDO (versionado)
```

---

## 🚀 Lo que Otros Recibirán

Cuando alguien clona el proyecto:

```
AppPreventiva/
├── quickcalc-api/src/         ✅ Código fuente
├── quickcalc-dashboard/src/   ✅ Código fuente
├── quickcalc-mobile/src/      ✅ Código fuente
├── package.json (todos)       ✅ Dependencias listadas
├── app.json                   ✅ Config de Expo
├── .env.example               ✅ Plantilla de variables
├── .gitignore                 ✅ Configuración
└── README.md, SETUP.md, etc   ✅ Documentación
```

Van a tener que hacer:
```bash
# En cada carpeta:
npm install

# Crear .env local con sus valores:
cp .env.example .env
```

---

## ✅ Cambios Realizados

1. ✅ Agregada sección especial para **Expo & Mobile**
2. ✅ Ignorar `.expo/` (caché de Expo)
3. ✅ Ignorar `quickcalc-mobile/.env` pero mantener `.env.example`
4. ✅ Ignorar caché de Metro, Watchman, Gradle
5. ✅ Mantener estructura limpia sin archivos generados

---

## 🎯 Resultado Final

Cuando ejecutes:
```bash
git status
```

Solo verás archivos que realmente importan (código fuente, config, documentación).

¡El proyecto está 100% limpio! 🎉
