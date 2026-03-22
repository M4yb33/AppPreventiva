-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('NEW', 'IN_REVIEW', 'IN_PROGRESS', 'ESCALATED', 'CLOSED', 'TEST');

-- CreateEnum
CREATE TYPE "TriggerType" AS ENUM ('PANIC_CODE', 'TEST_MODE');

-- CreateEnum
CREATE TYPE "OperatorRole" AS ENUM ('ADMIN', 'OPERATOR', 'VIEWER');

-- CreateTable
CREATE TABLE "dev_devices" (
    "dev_id" SERIAL NOT NULL,
    "dev_uuid" VARCHAR(255) NOT NULL,
    "dev_alias" VARCHAR(100),
    "dev_platform" VARCHAR(50) NOT NULL,
    "dev_is_configured" BOOLEAN NOT NULL DEFAULT false,
    "dev_panic_code_hash" VARCHAR(255),
    "dev_settings_code_hash" VARCHAR(255),
    "dev_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dev_updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "dev_devices_pkey" PRIMARY KEY ("dev_id")
);

-- CreateTable
CREATE TABLE "tct_trusted_contacts" (
    "tct_id" SERIAL NOT NULL,
    "tct_device_id" INTEGER NOT NULL,
    "tct_name" VARCHAR(100) NOT NULL,
    "tct_phone" VARCHAR(20) NOT NULL,
    "tct_relationship" VARCHAR(50),
    "tct_priority" INTEGER NOT NULL DEFAULT 1,
    "tct_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tct_trusted_contacts_pkey" PRIMARY KEY ("tct_id")
);

-- CreateTable
CREATE TABLE "alt_alerts" (
    "alt_id" SERIAL NOT NULL,
    "alt_device_id" INTEGER NOT NULL,
    "alt_status" "AlertStatus" NOT NULL DEFAULT 'NEW',
    "alt_trigger_type" "TriggerType" NOT NULL,
    "alt_triggered_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt_last_known_latitude" DOUBLE PRECISION NOT NULL,
    "alt_last_known_longitude" DOUBLE PRECISION NOT NULL,
    "alt_internet_attempted" BOOLEAN NOT NULL DEFAULT false,
    "alt_internet_delivered" BOOLEAN NOT NULL DEFAULT false,
    "alt_sms_attempted" BOOLEAN NOT NULL DEFAULT false,
    "alt_sms_delivered" BOOLEAN NOT NULL DEFAULT false,
    "alt_assigned_to" VARCHAR(100),
    "alt_notes" TEXT,
    "alt_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alt_updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alt_alerts_pkey" PRIMARY KEY ("alt_id")
);

-- CreateTable
CREATE TABLE "alc_alert_locations" (
    "alc_id" SERIAL NOT NULL,
    "alc_alert_id" INTEGER NOT NULL,
    "alc_latitude" DOUBLE PRECISION NOT NULL,
    "alc_longitude" DOUBLE PRECISION NOT NULL,
    "alc_accuracy" DOUBLE PRECISION,
    "alc_captured_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alc_alert_locations_pkey" PRIMARY KEY ("alc_id")
);

-- CreateTable
CREATE TABLE "alg_alert_logs" (
    "alg_id" SERIAL NOT NULL,
    "alg_alert_id" INTEGER NOT NULL,
    "alg_action" VARCHAR(100) NOT NULL,
    "alg_performed_by" VARCHAR(100),
    "alg_details" TEXT,
    "alg_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alg_alert_logs_pkey" PRIMARY KEY ("alg_id")
);

-- CreateTable
CREATE TABLE "opr_operators" (
    "opr_id" SERIAL NOT NULL,
    "opr_full_name" VARCHAR(100) NOT NULL,
    "opr_email" VARCHAR(150) NOT NULL,
    "opr_password_hash" VARCHAR(255) NOT NULL,
    "opr_role" "OperatorRole" NOT NULL DEFAULT 'OPERATOR',
    "opr_is_active" BOOLEAN NOT NULL DEFAULT true,
    "opr_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opr_updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "opr_operators_pkey" PRIMARY KEY ("opr_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dev_devices_dev_uuid_key" ON "dev_devices"("dev_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "opr_operators_opr_email_key" ON "opr_operators"("opr_email");

-- AddForeignKey
ALTER TABLE "tct_trusted_contacts" ADD CONSTRAINT "tct_trusted_contacts_tct_device_id_fkey" FOREIGN KEY ("tct_device_id") REFERENCES "dev_devices"("dev_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alt_alerts" ADD CONSTRAINT "alt_alerts_alt_device_id_fkey" FOREIGN KEY ("alt_device_id") REFERENCES "dev_devices"("dev_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alc_alert_locations" ADD CONSTRAINT "alc_alert_locations_alc_alert_id_fkey" FOREIGN KEY ("alc_alert_id") REFERENCES "alt_alerts"("alt_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alg_alert_logs" ADD CONSTRAINT "alg_alert_logs_alg_alert_id_fkey" FOREIGN KEY ("alg_alert_id") REFERENCES "alt_alerts"("alt_id") ON DELETE CASCADE ON UPDATE CASCADE;
