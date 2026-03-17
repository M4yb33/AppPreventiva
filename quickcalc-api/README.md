# QuickCalc API

Backend API for QuickCalc - Emergency Alert System

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT

## Project Structure

```
quickcalc-api/
├── src/
│   ├── modules/           # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── devices/      # Device management
│   │   ├── alerts/       # Alert system
│   │   ├── operators/    # Operator management
│   │   └── dashboard/    # Dashboard endpoints
│   ├── common/           # Shared utilities
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   ├── dto/
│   │   └── enums/
│   ├── prisma/           # Prisma service
│   ├── config/           # Configuration
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts          # Database seeder
└── package.json
```

## Database Nomenclature

Tables use 3-letter prefixes with underscore:
- `dev_` - Devices
- `tct_` - Trusted Contacts
- `alt_` - Alerts
- `alc_` - Alert Locations
- `alg_` - Alert Logs
- `opr_` - Operators

## Installation

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (create initial operator)
npm run prisma:seed
```

## Running the app

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Prisma Commands

```bash
# Open Prisma Studio
npm run prisma:studio

# Create migration
npm run prisma:migrate

# Generate client
npm run prisma:generate
```

## API Endpoints

### Authentication
- `POST /auth/login` - Login operator
- `GET /auth/me` - Get current operator

### Devices
- `POST /devices/register` - Register device
- `PATCH /devices/:id/configuration` - Configure device
- `POST /devices/:id/contacts` - Add trusted contact
- `GET /devices/:id/contacts` - Get device contacts

### Alerts
- `POST /alerts` - Create alert
- `GET /alerts` - Get all alerts
- `GET /alerts/:id` - Get alert by ID
- `PATCH /alerts/:id/status` - Update alert status
- `POST /alerts/:id/location` - Add location to alert
- `GET /alerts/:id/logs` - Get alert logs

### Dashboard
- `GET /dashboard/summary` - Get dashboard summary
- `GET /dashboard/recent-alerts` - Get recent alerts

### Operators
- `POST /operators` - Create operator (admin only)
- `GET /operators` - Get all operators

## Default Credentials

After seeding the database:
- Email: `admin@lv.com`
- Password: `Admin123!`

**⚠️ Change these credentials in production!**
