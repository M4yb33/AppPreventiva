import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with test data...');

  // Clean existing data to avoid constraint violations
  console.log('🧹 Cleaning existing data...');
  await prisma.alg_alert_logs.deleteMany({});
  await prisma.alc_alert_locations.deleteMany({});
  await prisma.alt_alerts.deleteMany({});
  await prisma.dev_devices.deleteMany({});
  await prisma.opr_operators.deleteMany({});
  console.log('✨ Database cleaned');

  // 0. Create test operators
  console.log('👤 Creating test operators...');

  const hashedPassword1 = await bcrypt.hash('Admin123!', 10);
  const hashedPassword2 = await bcrypt.hash('Operator123!', 10);

  const operator1 = await prisma.opr_operators.create({
    data: {
      opr_email: 'admin@lv.com',
      opr_full_name: 'Administrator',
      opr_password_hash: hashedPassword1,
      opr_role: 'ADMIN',
      opr_is_active: true,
    },
  });

  const operator2 = await prisma.opr_operators.create({
    data: {
      opr_email: 'operator@lv.com',
      opr_full_name: 'Test Operator',
      opr_password_hash: hashedPassword2,
      opr_role: 'OPERATOR',
      opr_is_active: true,
    },
  });

  console.log('✅ Operators created:');
  console.log('   Email: admin@lv.com | Password: Admin123! | Role: ADMIN');
  console.log('   Email: operator@lv.com | Password: Operator123! | Role: OPERATOR');

  // 1. Create test devices
  console.log('📱 Creating test devices...');

  const device1 = await prisma.dev_devices.create({
    data: {
      dev_uuid: 'device-001-uuid',
      dev_alias: 'iPhone 13 - Juan',
      dev_platform: 'iOS',
      dev_is_configured: true,
    },
  });

  const device2 = await prisma.dev_devices.create({
    data: {
      dev_uuid: 'device-002-uuid',
      dev_alias: 'Samsung Galaxy - María',
      dev_platform: 'Android',
      dev_is_configured: true,
    },
  });

  const device3 = await prisma.dev_devices.create({
    data: {
      dev_uuid: 'device-003-uuid',
      dev_alias: 'Pixel 6 - Carlos',
      dev_platform: 'Android',
      dev_is_configured: true,
    },
  });

  // 2. Create test alerts with different statuses
  console.log('🚨 Creating test alerts...');

  const alert1 = await prisma.alt_alerts.create({
    data: {
      alt_device_id: device1.dev_id,
      alt_status: 'NEW',
      alt_trigger_type: 'PANIC_CODE',
      alt_triggered_at: new Date(Date.now() - 5 * 60000),
      alt_last_known_latitude: -34.6037,
      alt_last_known_longitude: -58.3816,
      alt_internet_attempted: true,
      alt_internet_delivered: true,
      alt_sms_attempted: true,
      alt_sms_delivered: false,
      alt_notes: 'Usuario reporta situación de riesgo en zona céntrica',
    },
  });

  const alert2 = await prisma.alt_alerts.create({
    data: {
      alt_device_id: device2.dev_id,
      alt_status: 'IN_REVIEW',
      alt_trigger_type: 'PANIC_CODE',
      alt_triggered_at: new Date(Date.now() - 15 * 60000),
      alt_last_known_latitude: -34.6126,
      alt_last_known_longitude: -58.4005,
      alt_internet_attempted: true,
      alt_internet_delivered: true,
      alt_sms_attempted: true,
      alt_sms_delivered: true,
      alt_assigned_to: 'Operador_01',
      alt_notes: 'Se confirma contacto con persona reportante',
    },
  });

  const alert3 = await prisma.alt_alerts.create({
    data: {
      alt_device_id: device3.dev_id,
      alt_status: 'IN_PROGRESS',
      alt_trigger_type: 'PANIC_CODE',
      alt_triggered_at: new Date(Date.now() - 30 * 60000),
      alt_last_known_latitude: -34.5895,
      alt_last_known_longitude: -58.3708,
      alt_internet_attempted: true,
      alt_internet_delivered: true,
      alt_sms_attempted: true,
      alt_sms_delivered: true,
      alt_assigned_to: 'Operador_02',
      alt_notes: 'En contacto con autoridades. Dispositivo rastreado.',
    },
  });

  const alert4 = await prisma.alt_alerts.create({
    data: {
      alt_device_id: device1.dev_id,
      alt_status: 'ESCALATED',
      alt_trigger_type: 'TEST_MODE',
      alt_triggered_at: new Date(Date.now() - 60 * 60000),
      alt_last_known_latitude: -34.6234,
      alt_last_known_longitude: -58.453,
      alt_internet_attempted: true,
      alt_internet_delivered: true,
      alt_sms_attempted: true,
      alt_sms_delivered: true,
      alt_assigned_to: 'Supervisor',
      alt_notes: 'Situación requiere escalamiento a nivel superior',
    },
  });

  const alert5 = await prisma.alt_alerts.create({
    data: {
      alt_device_id: device2.dev_id,
      alt_status: 'CLOSED',
      alt_trigger_type: 'PANIC_CODE',
      alt_triggered_at: new Date(Date.now() - 120 * 60000),
      alt_last_known_latitude: -34.6089,
      alt_last_known_longitude: -58.2823,
      alt_internet_attempted: true,
      alt_internet_delivered: true,
      alt_sms_attempted: true,
      alt_sms_delivered: true,
      alt_assigned_to: 'Operador_01',
      alt_notes: 'Caso resuelto. Persona asistida correctamente.',
    },
  });

  // 3. Create locations
  console.log('📍 Creating alert locations...');

  await prisma.alc_alert_locations.createMany({
    data: [
      { alc_alert_id: alert1.alt_id, alc_latitude: -34.6037, alc_longitude: -58.3816, alc_accuracy: 25.5 },
      { alc_alert_id: alert2.alt_id, alc_latitude: -34.6126, alc_longitude: -58.4005, alc_accuracy: 32.1 },
      { alc_alert_id: alert2.alt_id, alc_latitude: -34.6120, alc_longitude: -58.3995, alc_accuracy: 28.3, alc_captured_at: new Date(Date.now() - 5 * 60000) },
      { alc_alert_id: alert3.alt_id, alc_latitude: -34.5895, alc_longitude: -58.3708, alc_accuracy: 15.8 },
      { alc_alert_id: alert4.alt_id, alc_latitude: -34.6234, alc_longitude: -58.453, alc_accuracy: 42.5 },
      { alc_alert_id: alert5.alt_id, alc_latitude: -34.6089, alc_longitude: -58.2823, alc_accuracy: 18.2 },
    ],
  });

  // 4. Create logs
  console.log('📋 Creating alert logs...');

  await prisma.alg_alert_logs.createMany({
    data: [
      { alg_alert_id: alert1.alt_id, alg_action: 'ALERT_CREATED', alg_details: 'Alerta creada automáticamente via PANIC_CODE' },
      { alg_alert_id: alert2.alt_id, alg_action: 'ALERT_CREATED', alg_details: 'Alerta creada automáticamente via PANIC_CODE' },
      { alg_alert_id: alert2.alt_id, alg_action: 'STATUS_CHANGED', alg_performed_by: 'Operador_01', alg_details: 'Estado cambiado de NEW a IN_REVIEW' },
      { alg_alert_id: alert3.alt_id, alg_action: 'ALERT_CREATED', alg_details: 'Alerta creada automáticamente via PANIC_CODE' },
      { alg_alert_id: alert3.alt_id, alg_action: 'STATUS_CHANGED', alg_performed_by: 'Operador_02', alg_details: 'Estado cambiado de NEW a IN_REVIEW' },
      { alg_alert_id: alert3.alt_id, alg_action: 'STATUS_CHANGED', alg_performed_by: 'Operador_02', alg_details: 'Estado cambiado de IN_REVIEW a IN_PROGRESS' },
      { alg_alert_id: alert4.alt_id, alg_action: 'ALERT_CREATED', alg_details: 'Alerta creada en modo TEST_MODE' },
      { alg_alert_id: alert4.alt_id, alg_action: 'STATUS_CHANGED', alg_performed_by: 'Supervisor', alg_details: 'Estado cambiado a ESCALATED' },
      { alg_alert_id: alert5.alt_id, alg_action: 'ALERT_CREATED', alg_details: 'Alerta creada automáticamente via PANIC_CODE' },
      { alg_alert_id: alert5.alt_id, alg_action: 'STATUS_CHANGED', alg_performed_by: 'Operador_01', alg_details: 'Estado cambiado a CLOSED' },
    ],
  });

  console.log('✅ Seeding completed!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
