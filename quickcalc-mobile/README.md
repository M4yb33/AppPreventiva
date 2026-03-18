# QuickCalc Mobile

App móvil que funciona como calculadora normal en la capa visible, pero contiene funcionalidades ocultas de seguridad.

## Requisitos Previos

- Node.js y npm
- Expo CLI
- Un dispositivo o emulador con Android/iOS

## Instalación

```bash
cd quickcalc-mobile
npm install
```

## Configuración

Crear archivo `.env` en la raíz del proyecto:

```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

## Ejecución

```bash
# Iniciar Expo
npm start

# En Expo Go (escanear QR en tu teléfono)
```

## Estructura del Proyecto

```
src/
├── screens/             # Pantallas principales
├── components/          # Componentes reutilizables
├── services/           # Servicios (API, ubicación, etc)
├── hooks/              # Hooks personalizados
├── storage/            # Almacenamiento seguro
├── types/              # Tipos TypeScript
└── lib/                # Utilidades y constantes
```

## Códigos Ocultos

### Código de Emergencia (Pánico)
Por defecto: `2580=`

Activa el envío de alerta al backend con ubicación.

### Código de Configuración
Por defecto: `0000=`

Abre la pantalla oculta para cambiar códigos y configuración.

## Flujo de uso

1. **Primer arranque**: La app se registra automáticamente con el backend
2. **Uso normal**: Funciona como calculadora estándar
3. **Emergencia**: Digitar código + = para activar alerta silenciosa
4. **Configuración**: Digitar código + = para acceder a ajustes

## Seguridad

- Los códigos se guardan en Secure Store
- Los UUIDs se generan y almacenan de forma segura
- Las alertas se envían silenciosamente sin feedback visible
- Los logs se occultan en producción

## Base de datos y API

Se conecta a:
- Backend: `http://localhost:3000/api`
- Endpoints:
  - `POST /devices/register` - Registrar dispositivo
  - `POST /alerts/create` - Enviar alerta
