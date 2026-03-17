'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    label: 'Alertas',
    href: '/alerts',
    icon: AlertCircle,
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!mounted) return null;

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.branding}>
            <div className={styles.logo}>SP</div>
            <div>
              <h1 className={styles.brand}>Sistema Preventivo</h1>
              <p className={styles.subtitle}>Dashboard</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navItem}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className={styles.spacer} />

        {/* User Info */}
        {user && (
          <div className={styles.userInfo}>
            <div className={styles.avatar} title={user.email}>
              {user.operatorName ? user.operatorName[0].toUpperCase() : 'O'}
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user.operatorName}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={styles.logoutBtn}
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
      {/* Mobile overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </div>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={styles.toggleBtn}
      aria-label="Abrir menú"
    >
      <Menu size={20} />
    </button>
  );
}
