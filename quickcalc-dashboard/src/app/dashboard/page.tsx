'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { alertsService } from '@/services/alerts.service';
import { Alert } from '@/types/alert';
import { AlertsTable } from '@/components/alerts/AlertsTable';
import { AlertTriangle, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('🔵 Fetching alerts from:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api');
        const alerts = await alertsService.getAlerts();
        console.log('✅ Alerts received:', alerts);
        setRecentAlerts(alerts.slice(0, 5));

        // Calculate stats
        setStats({
          total: alerts.length,
          new: alerts.filter((a) => a.status === 'NEW').length,
          inProgress: alerts.filter((a) => a.status === 'IN_PROGRESS').length,
          closed: alerts.filter((a) => a.status === 'CLOSED').length,
        });
      } catch (err: any) {
        console.error('❌ Error fetching data:', err);
        setError(err.message || 'Error al cargar datos');
        setStats({ total: 0, new: 0, inProgress: 0, closed: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className={styles.container}>
        {error && (
          <div className={styles.errorBanner}>
            ⚠️ {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <StatCard
            label="Total de Alertas"
            value={stats.total}
            icon={<AlertTriangle size={24} />}
            color="primary"
          />
          <StatCard
            label="Nuevas"
            value={stats.new}
            icon={<TrendingUp size={24} />}
            color="info"
          />
          <StatCard
            label="En Progreso"
            value={stats.inProgress}
            icon={<Clock size={24} />}
            color="warning"
          />
          <StatCard
            label="Cerradas"
            value={stats.closed}
            icon={<CheckCircle size={24} />}
            color="success"
          />
        </div>

        {/* Recent Alerts */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Alertas Recientes</h2>
            <Link href="/alerts" className={styles.seeAll}>
              Ver todas →
            </Link>
          </div>
          <AlertsTable
            alerts={recentAlerts}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'primary' | 'info' | 'warning' | 'success';
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  const colorClasses = {
    primary: styles.colorPrimary,
    info: styles.colorInfo,
    warning: styles.colorWarning,
    success: styles.colorSuccess,
  };

  return (
    <div className={`${styles.statCard} ${colorClasses[color]}`}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value}</p>
      </div>
    </div>
  );
}
