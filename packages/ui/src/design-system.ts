// resQ Design System - Mission Control + Medical Technology
// Professional emergency response platform design tokens

export const colors = {
  // Primary background - deep navy
  background: {
    primary: '#0a0e17',
    secondary: '#111827',
    tertiary: '#1a2332',
    elevated: '#1f2937'
  },

  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#9ca3af',
    tertiary: '#6b7280',
    muted: '#4b5563'
  },

  // Emergency colors
  emergency: {
    red: '#dc2626',
    redLight: '#fca5a5',
    redDark: '#991b1b',
    amber: '#f59e0b',
    amberLight: '#fcd34d',
    amberDark: '#b45309',
    green: '#10b981',
    greenLight: '#6ee7b7',
    greenDark: '#059669',
    blue: '#3b82f6',
    blueLight: '#93c5fd',
    blueDark: '#2563eb'
  },

  // Border colors
  border: {
    primary: '#1f2937',
    secondary: '#374151',
    tertiary: '#4b5563',
    accent: '#dc2626'
  },

  // Surface colors
  surface: {
    primary: '#111827',
    secondary: '#1a2332',
    accent: '#1f2937'
  }
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
  },
  fontSize: {
    display: ['2.5rem', { lineHeight: '1.1', fontWeight: '800' }],
    heading: ['1.5rem', { lineHeight: '1.2', fontWeight: '700' }],
    sectionHeading: ['1.125rem', { lineHeight: '1.3', fontWeight: '600' }],
    body: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
    metadata: ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
    status: ['0.6875rem', { lineHeight: '1.2', fontWeight: '600' }]
  }
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem'
};

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem'
};

export const animation = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '250ms'
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)'
  }
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6)'
};

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 50,
  notification: 100
};
