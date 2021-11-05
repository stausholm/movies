export type ToastTheme = 'default' | 'warning' | 'danger' | 'success';

export interface Toast {
  content: string;
  duration?: number; // amount of ms to show notification
  theme?: ToastTheme;
  action?: 'TODO a func or null or undefined' | null;
  label?: string;
  dismissable?: boolean;
}

export interface ToastState {
  toast: Toast;
}
