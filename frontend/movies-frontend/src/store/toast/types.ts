export type ToastTheme = 'default' | 'warning' | 'danger' | 'success';

export interface Toast {
  content: string;
  duration?: number; // amount of ms to show notification
  theme?: ToastTheme;
  action?: null | undefined | (() => void);
  actionLabel?: string;
  dismissable?: boolean;
}

export interface ToastState {
  toast: Toast;
}
