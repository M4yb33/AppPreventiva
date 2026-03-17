'use client';

import { useState } from 'react';
import { Sidebar, SidebarToggle } from './Sidebar';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className={styles.main}>
          {/* Top bar */}
          <div className={styles.topbar}>
            <div className={styles.topbarContent}>
              <SidebarToggle onClick={() => setSidebarOpen(!sidebarOpen)} />
              {pageTitle && <h1 className={styles.pageTitle}>{pageTitle}</h1>}
            </div>
          </div>

          {/* Content */}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
