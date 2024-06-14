export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  create: {
    appointment: '/create/appointment',
    customer: '/create/customer',
    payment: '/create/payment',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
