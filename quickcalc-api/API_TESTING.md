# QuickCalc API - Testing Guide

Este documento contiene ejemplos de prueba para todos los endpoints de la API.

**Base URL**: `http://localhost:3000/api`

## 1. Authentication Endpoints

### 1.1 Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@lv.com",
  "password": "Admin123!"
}

# Response
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "operator": {
      "id": 1,
      "fullName": "Administrator",
      "email": "admin@lv.com",
      "role": "ADMIN"
    }
  }
}
```

### 1.2 Get Current Profile
```bash
GET /api/auth/me
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "fullName": "Administrator",
    "email": "admin@lv.com",
    "role": "ADMIN",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 2. Devices Endpoints

### 2.1 Register Device
```bash
POST /api/devices/register
Content-Type: application/json

{
  "deviceUuid": "device-android-12345",
  "platform": "android"
}

# Response
{
  "success": true,
  "message": "Device registered successfully",
  "data": {
    "deviceId": 1,
    "deviceUuid": "device-android-12345",
    "isConfigured": false
  }
}
```

### 2.2 Configure Device
```bash
PATCH /api/devices/1/configuration
Content-Type: application/json

{
  "alias": "Ana's Phone",
  "panicCode": "9999",
  "settingsCode": "1234"
}

# Response
{
  "success": true,
  "message": "Device configured successfully",
  "data": {
    "deviceId": 1,
    "alias": "Ana's Phone",
    "isConfigured": true
  }
}
```

### 2.3 Add Trusted Contact
```bash
POST /api/devices/1/contacts
Content-Type: application/json

{
  "name": "María López",
  "phone": "+593987654321",
  "relationship": "Sister",
  "priority": 1
}

# Response
{
  "success": true,
  "message": "Trusted contact added successfully",
  "data": {
    "contactId": 1,
    "name": "María López",
    "phone": "+593987654321",
    "relationship": "Sister",
    "priority": 1
  }
}
```

### 2.4 Get Device Contacts
```bash
GET /api/devices/1/contacts

# Response
{
  "success": true,
  "message": "Trusted contacts retrieved successfully",
  "data": [
    {
      "contactId": 1,
      "name": "María López",
      "phone": "+593987654321",
      "relationship": "Sister",
      "priority": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 3. Alerts Endpoints

### 3.1 Create Alert (PANIC!)
```bash
POST /api/alerts
Content-Type: application/json

{
  "deviceUuid": "device-android-12345",
  "triggerType": "PANIC_CODE",
  "latitude": -0.1807,
  "longitude": -78.4678,
  "accuracy": 15
}

# Response
{
  "success": true,
  "message": "Alert created successfully",
  "data": {
    "alertId": 1,
    "status": "NEW",
    "triggeredAt": "2024-01-01T12:30:00.000Z"
  }
}
```

### 3.2 Get All Alerts
```bash
GET /api/alerts

# Response
{
  "success": true,
  "message": "Alerts retrieved successfully",
  "data": [
    {
      "alertId": 1,
      "deviceId": 1,
      "deviceAlias": "Ana's Phone",
      "devicePlatform": "android",
      "status": "NEW",
      "triggerType": "PANIC_CODE",
      "triggeredAt": "2024-01-01T12:30:00.000Z",
      "latitude": -0.1807,
      "longitude": -78.4678,
      "assignedTo": null,
      "internetDelivered": true,
      "smsDelivered": false
    }
  ]
}
```

### 3.3 Get Alert by ID
```bash
GET /api/alerts/1

# Response (includes full details, locations, logs)
{
  "success": true,
  "message": "Alert retrieved successfully",
  "data": {
    "alertId": 1,
    "device": {
      "deviceId": 1,
      "deviceUuid": "device-android-12345",
      "alias": "Ana's Phone",
      "platform": "android"
    },
    "status": "NEW",
    "triggerType": "PANIC_CODE",
    "triggeredAt": "2024-01-01T12:30:00.000Z",
    "assignedTo": null,
    "notes": null,
    "internetAttempted": true,
    "internetDelivered": true,
    "smsAttempted": false,
    "smsDelivered": false,
    "locations": [
      {
        "locationId": 1,
        "latitude": -0.1807,
        "longitude": -78.4678,
        "accuracy": 15,
        "capturedAt": "2024-01-01T12:30:00.000Z"
      }
    ],
    "logs": [
      {
        "logId": 1,
        "action": "ALERT_CREATED",
        "performedBy": null,
        "details": "Alert created via PANIC_CODE",
        "createdAt": "2024-01-01T12:30:00.000Z"
      }
    ]
  }
}
```

### 3.4 Update Alert Status
```bash
PATCH /api/alerts/1/status
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "note": "Operadora contactando a la víctima",
  "performedBy": "Operator María"
}

# Response
{
  "success": true,
  "message": "Alert status updated successfully",
  "data": {
    "alertId": 1,
    "status": "IN_PROGRESS",
    "notes": "Operadora contactando a la víctima"
  }
}
```

### 3.5 Add Location Update
```bash
POST /api/alerts/1/location
Content-Type: application/json

{
  "latitude": -0.1810,
  "longitude": -78.4680,
  "accuracy": 10
}

# Response
{
  "success": true,
  "message": "Location added successfully",
  "data": {
    "locationId": 2,
    "latitude": -0.1810,
    "longitude": -78.4680,
    "accuracy": 10,
    "capturedAt": "2024-01-01T12:35:00.000Z"
  }
}
```

### 3.6 Get Alert Logs
```bash
GET /api/alerts/1/logs

# Response
{
  "success": true,
  "message": "Alert logs retrieved successfully",
  "data": [
    {
      "logId": 2,
      "action": "STATUS_CHANGED",
      "performedBy": "Operator María",
      "details": "Status changed from NEW to IN_PROGRESS. Note: Operadora contactando a la víctima",
      "createdAt": "2024-01-01T12:32:00.000Z"
    },
    {
      "logId": 1,
      "action": "ALERT_CREATED",
      "performedBy": null,
      "details": "Alert created via PANIC_CODE",
      "createdAt": "2024-01-01T12:30:00.000Z"
    }
  ]
}
```

---

## 4. Dashboard Endpoints (Protected)

### 4.1 Get Dashboard Summary
```bash
GET /api/dashboard/summary
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Dashboard summary retrieved successfully",
  "data": {
    "alerts": {
      "new": 5,
      "inReview": 2,
      "inProgress": 3,
      "escalated": 1,
      "closed": 20,
      "test": 0,
      "total": 31
    },
    "devices": {
      "total": 10,
      "configured": 8,
      "notConfigured": 2
    },
    "operators": {
      "total": 3,
      "active": 3,
      "inactive": 0
    }
  }
}
```

### 4.2 Get Recent Alerts
```bash
GET /api/dashboard/recent-alerts?limit=5
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Recent alerts retrieved successfully",
  "data": [
    {
      "alertId": 1,
      "deviceId": 1,
      "deviceAlias": "Ana's Phone",
      "devicePlatform": "android",
      "status": "IN_PROGRESS",
      "triggerType": "PANIC_CODE",
      "triggeredAt": "2024-01-01T12:30:00.000Z",
      "latitude": -0.1810,
      "longitude": -78.4680,
      "assignedTo": "Operator María"
    }
  ]
}
```

---

## 5. Operators Endpoints (Admin Only)

### 5.1 Create Operator
```bash
POST /api/operators
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "fullName": "Carmen Rodríguez",
  "email": "carmen@lv.com",
  "password": "Carmen123!",
  "role": "OPERATOR"
}

# Response
{
  "success": true,
  "message": "Operator created successfully",
  "data": {
    "operatorId": 3,
    "fullName": "Carmen Rodríguez",
    "email": "carmen@lv.com",
    "role": "OPERATOR"
  }
}
```

### 5.2 Get All Operators
```bash
GET /api/operators
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Operators retrieved successfully",
  "data": [
    {
      "operatorId": 1,
      "fullName": "Administrator",
      "email": "admin@lv.com",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 5.3 Get Operator by ID
```bash
GET /api/operators/1
Authorization: Bearer {token}

# Response
{
  "success": true,
  "message": "Operator retrieved successfully",
  "data": {
    "operatorId": 1,
    "fullName": "Administrator",
    "email": "admin@lv.com",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Testing with cURL

### Example: Full Flow

```bash
# 1. Register device
curl -X POST http://localhost:3000/api/devices/register \
  -H "Content-Type: application/json" \
  -d '{"deviceUuid":"device-test-001","platform":"android"}'

# 2. Configure device
curl -X PATCH http://localhost:3000/api/devices/1/configuration \
  -H "Content-Type: application/json" \
  -d '{"alias":"Test Device","panicCode":"9999","settingsCode":"1234"}'

# 3. Create alert
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"deviceUuid":"device-test-001","triggerType":"PANIC_CODE","latitude":-0.1807,"longitude":-78.4678,"accuracy":15}'

# 4. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lv.com","password":"Admin123!"}'

# 5. Get alerts (with token)
curl -X GET http://localhost:3000/api/alerts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Testing with Postman

1. Import this collection
2. Set environment variable `BASE_URL` = `http://localhost:3000/api`
3. After login, save the `accessToken` to a variable
4. Use `{{accessToken}}` in Authorization header

---

## Status Values

### Alert Status
- `NEW` - Alert just created
- `IN_REVIEW` - Being reviewed by operator
- `IN_PROGRESS` - Operator is taking action
- `ESCALATED` - Escalated to authorities
- `CLOSED` - Alert resolved
- `TEST` - Test alert

### Trigger Type
- `PANIC_CODE` - Real panic alert
- `TEST_MODE` - Test/practice alert

### Operator Role
- `ADMIN` - Full access
- `OPERATOR` - Standard operator
- `VIEWER` - Read-only access
