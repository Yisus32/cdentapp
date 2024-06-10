import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'dashboard', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'users', title: 'Usuarios', href: paths.dashboard.customers, icon: 'users' },
  { key: 'appointments', title: 'Citas', href: paths.dashboard.integrations, icon: 'calendar-dots' },
  { key: 'payments', title: 'Pagos', href: paths.dashboard.settings, icon: 'credit-card' },
  { key: 'account', title: 'Perfil', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
